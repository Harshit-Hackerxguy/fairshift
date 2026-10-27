// ═══════════════════════════════════════════════════════════════
// FairShift Engine — Core Calculation & Business Logic
// Pure, deterministic, well-typed functions for unit testing
// ═══════════════════════════════════════════════════════════════

import type {
  Worker,
  AttendanceLog,
  TransparentPayslip,
  PayslipDeduction,
  FatigueAlert,
  FatigueAlertType,
  AttritionRiskLevel,
  GrievanceSubmission,
  Grievance,
  FeedbackSubmission,
  PulseFeedback,
} from '../types/index.js';
import { generateId, getGrievancesByOrg } from '../data/seed.js';

// ─── Constants ───────────────────────────────────────────────

const REGULAR_HOURS_PER_DAY = 8;
const REGULAR_HOURS_PER_WEEK = 48;
const FATIGUE_SINGLE_SHIFT_THRESHOLD = 10;   // hours
const FATIGUE_WEEKLY_THRESHOLD = 54;          // hours
const CONSECUTIVE_SHIFT_THRESHOLD = 6;        // days without rest
const PF_RATE = 0.12;                         // 12% Provident Fund
const ESI_RATE = 0.0075;                      // 0.75% ESI
const PROFESSIONAL_TAX = 200;                 // flat per period
const ATTENDANCE_BONUS_THRESHOLD = 0.95;      // 95% attendance
const ATTENDANCE_BONUS_AMOUNT = 500;          // flat bonus

// ═══════════════════════════════════════════════════════════════
// 1. Transparent Payslip Calculation
// ═══════════════════════════════════════════════════════════════

export function calculateTransparentPayslip(
  worker: Worker,
  attendanceLogs: AttendanceLog[],
  periodStart?: string,
  periodEnd?: string,
): TransparentPayslip {
  const now = new Date();
  const pStart = periodStart || new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const pEnd = periodEnd || now.toISOString().split('T')[0];

  // Filter logs for this period
  const periodLogs = attendanceLogs.filter(
    (log) => log.workerId === worker.id && log.date >= pStart && log.date <= pEnd,
  );

  // Calculate hours from logs
  let totalRegularHours = 0;
  let totalOvertimeHours = 0;

  for (const log of periodLogs) {
    if (log.totalHours <= 0) continue;
    const regular = Math.min(log.totalHours, REGULAR_HOURS_PER_DAY);
    const overtime = Math.max(0, log.totalHours - REGULAR_HOURS_PER_DAY);
    totalRegularHours += regular;
    totalOvertimeHours += overtime;
  }

  // Round to 2 decimal places
  totalRegularHours = Math.round(totalRegularHours * 100) / 100;
  totalOvertimeHours = Math.round(totalOvertimeHours * 100) / 100;

  // Weekly overtime check: if total hours exceed weekly threshold, redistribute
  const totalWeeks = Math.max(1, Math.ceil(periodLogs.length / 6)); // approximate working weeks
  const weeklyTotal = (totalRegularHours + totalOvertimeHours) / totalWeeks;
  if (weeklyTotal > REGULAR_HOURS_PER_WEEK) {
    const weeklyOvertime = weeklyTotal - REGULAR_HOURS_PER_WEEK;
    const additionalOvertime = weeklyOvertime * totalWeeks - totalOvertimeHours;
    if (additionalOvertime > 0) {
      totalOvertimeHours += additionalOvertime;
      totalRegularHours -= additionalOvertime;
      totalOvertimeHours = Math.round(totalOvertimeHours * 100) / 100;
      totalRegularHours = Math.round(Math.max(0, totalRegularHours) * 100) / 100;
    }
  }

  // Pay calculations
  const basePay = Math.round(totalRegularHours * worker.hourlyBaseRate * 100) / 100;
  const overtimePay = Math.round(totalOvertimeHours * worker.hourlyBaseRate * worker.overtimeMultiplier * 100) / 100;

  // Attendance bonus: if worked >= 95% of expected days
  const expectedDays = Math.ceil(
    (new Date(pEnd).getTime() - new Date(pStart).getTime()) / (1000 * 60 * 60 * 24) * (6 / 7),
  );
  const attendanceRate = expectedDays > 0 ? periodLogs.length / expectedDays : 0;
  const attendanceBonus = attendanceRate >= ATTENDANCE_BONUS_THRESHOLD ? ATTENDANCE_BONUS_AMOUNT : 0;

  const grossPay = basePay + overtimePay + attendanceBonus;

  // Statutory deductions
  const deductions: PayslipDeduction[] = [
    {
      label: 'Provident Fund (PF)',
      amount: Math.round(grossPay * PF_RATE * 100) / 100,
      description: `12% of gross pay (₹${grossPay.toFixed(2)} × 0.12)`,
    },
    {
      label: 'Employee State Insurance (ESI)',
      amount: Math.round(grossPay * ESI_RATE * 100) / 100,
      description: `0.75% of gross pay (₹${grossPay.toFixed(2)} × 0.0075)`,
    },
    {
      label: 'Professional Tax',
      amount: PROFESSIONAL_TAX,
      description: 'Flat statutory deduction per pay period',
    },
  ];

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const netPay = Math.round((grossPay - totalDeductions) * 100) / 100;

  // Formula breakdown string
  const formulaBreakdown = [
    `Base Pay = ${totalRegularHours} regular hrs × ₹${worker.hourlyBaseRate}/hr = ₹${basePay.toFixed(2)}`,
    `Overtime Pay = ${totalOvertimeHours} OT hrs × ₹${worker.hourlyBaseRate}/hr × ${worker.overtimeMultiplier}x = ₹${overtimePay.toFixed(2)}`,
    attendanceBonus > 0
      ? `Attendance Bonus = ₹${attendanceBonus.toFixed(2)} (${(attendanceRate * 100).toFixed(0)}% attendance ≥ 95% threshold)`
      : `Attendance Bonus = ₹0.00 (${(attendanceRate * 100).toFixed(0)}% attendance < 95% threshold)`,
    `Gross Pay = ₹${basePay.toFixed(2)} + ₹${overtimePay.toFixed(2)} + ₹${attendanceBonus.toFixed(2)} = ₹${grossPay.toFixed(2)}`,
    `─── Deductions ───`,
    ...deductions.map((d) => `${d.label} = ₹${d.amount.toFixed(2)} — ${d.description}`),
    `Total Deductions = ₹${totalDeductions.toFixed(2)}`,
    `─── Net Pay ───`,
    `Net Payable = ₹${grossPay.toFixed(2)} − ₹${totalDeductions.toFixed(2)} = ₹${netPay.toFixed(2)}`,
  ].join('\n');

  // Plain language explanation
  const plainLanguageExplanation =
    `You worked ${totalRegularHours} regular hours and ${totalOvertimeHours} overtime hours this period. ` +
    `Your base pay is ₹${basePay.toFixed(2)} (${totalRegularHours} hrs × ₹${worker.hourlyBaseRate}/hr). ` +
    `Overtime is paid at ${worker.overtimeMultiplier}× your hourly rate, giving you ₹${overtimePay.toFixed(2)} extra. ` +
    (attendanceBonus > 0 ? `You earned a ₹${attendanceBonus} attendance bonus for excellent attendance. ` : '') +
    `After statutory deductions (PF ₹${deductions[0].amount.toFixed(2)}, ESI ₹${deductions[1].amount.toFixed(2)}, ` +
    `Professional Tax ₹${PROFESSIONAL_TAX}), your take-home pay is ₹${netPay.toFixed(2)}.`;

  return {
    id: generateId('pay'),
    workerId: worker.id,
    workerName: worker.name,
    role: worker.role,
    orgName: '',  // Set by caller
    periodStart: pStart,
    periodEnd: pEnd,
    generatedAt: now.toISOString(),
    regularHours: totalRegularHours,
    overtimeHours: totalOvertimeHours,
    hourlyBaseRate: worker.hourlyBaseRate,
    overtimeMultiplier: worker.overtimeMultiplier,
    basePay,
    overtimePay,
    attendanceBonus,
    grossPay,
    deductions,
    totalDeductions,
    netPay,
    formulaBreakdown,
    plainLanguageExplanation,
  };
}

// ═══════════════════════════════════════════════════════════════
// 2. Fatigue & Attrition Risk Evaluation
// ═══════════════════════════════════════════════════════════════

export function evaluateWorkerFatigueAndRisk(
  worker: Worker,
  logs: AttendanceLog[],
): { fatigueAlerts: FatigueAlert[]; attritionRiskScore: number; attritionRiskLevel: AttritionRiskLevel } {
  const workerLogs = logs
    .filter((l) => l.workerId === worker.id && l.status === 'checked_out')
    .sort((a, b) => a.date.localeCompare(b.date));

  const alerts: FatigueAlert[] = [];
  const now = new Date().toISOString();

  // ── Check 1: Excessive single shift (>10 hours) ──
  for (const log of workerLogs) {
    if (log.totalHours > FATIGUE_SINGLE_SHIFT_THRESHOLD) {
      alerts.push({
        workerId: worker.id,
        workerName: worker.name,
        role: worker.role,
        alertType: 'excessive_single_shift' as FatigueAlertType,
        message: `Worked ${log.totalHours} hours on ${log.date} (threshold: ${FATIGUE_SINGLE_SHIFT_THRESHOLD} hrs). Risk of fatigue-related accidents.`,
        severity: log.totalHours > 12 ? 'Critical' : 'Warning',
        triggeredAt: now,
        value: log.totalHours,
        threshold: FATIGUE_SINGLE_SHIFT_THRESHOLD,
      });
    }
  }

  // ── Check 2: Excessive weekly hours (>54 hours/week) ──
  const weekMap = new Map<string, number>();
  for (const log of workerLogs) {
    const d = new Date(log.date);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + log.totalHours);
  }
  for (const [weekKey, totalHours] of weekMap) {
    if (totalHours > FATIGUE_WEEKLY_THRESHOLD) {
      alerts.push({
        workerId: worker.id,
        workerName: worker.name,
        role: worker.role,
        alertType: 'excessive_weekly_hours' as FatigueAlertType,
        message: `Worked ${totalHours.toFixed(1)} hours in week of ${weekKey} (threshold: ${FATIGUE_WEEKLY_THRESHOLD} hrs). Mandatory rest period recommended.`,
        severity: totalHours > 60 ? 'Critical' : 'Warning',
        triggeredAt: now,
        value: totalHours,
        threshold: FATIGUE_WEEKLY_THRESHOLD,
      });
    }
  }

  // ── Check 3: Consecutive shifts without rest (>=6 days) ──
  if (workerLogs.length >= CONSECUTIVE_SHIFT_THRESHOLD) {
    let consecutiveCount = 1;
    let maxConsecutive = 1;
    for (let i = 1; i < workerLogs.length; i++) {
      const prevDate = new Date(workerLogs[i - 1].date);
      const currDate = new Date(workerLogs[i].date);
      const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        consecutiveCount++;
        maxConsecutive = Math.max(maxConsecutive, consecutiveCount);
      } else {
        consecutiveCount = 1;
      }
    }
    if (maxConsecutive >= CONSECUTIVE_SHIFT_THRESHOLD) {
      alerts.push({
        workerId: worker.id,
        workerName: worker.name,
        role: worker.role,
        alertType: 'consecutive_shifts_no_rest' as FatigueAlertType,
        message: `Worked ${maxConsecutive} consecutive days without a rest day (threshold: ${CONSECUTIVE_SHIFT_THRESHOLD} days). Burnout and safety risk.`,
        severity: maxConsecutive >= 7 ? 'Critical' : 'Warning',
        triggeredAt: now,
        value: maxConsecutive,
        threshold: CONSECUTIVE_SHIFT_THRESHOLD,
      });
    }
  }

  // ── Attrition Risk Score (0-100) ──
  let riskScore = 0;

  // Factor 1: Unpaid/excessive overtime (0-30 pts)
  const totalOT = workerLogs.reduce((sum, l) => sum + l.overtimeHours, 0);
  const avgOTPerShift = workerLogs.length > 0 ? totalOT / workerLogs.length : 0;
  riskScore += Math.min(30, avgOTPerShift * 8); // 3.75+ hrs avg OT = max 30

  // Factor 2: Fatigue alerts (0-30 pts)
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical').length;
  const warningAlerts = alerts.filter((a) => a.severity === 'Warning').length;
  riskScore += Math.min(30, criticalAlerts * 15 + warningAlerts * 5);

  // Factor 3: Unresolved grievances (0-25 pts)
  const orgGrievances = getGrievancesByOrg(worker.orgId);
  const unresolvedWorkerGrievances = orgGrievances.filter(
    (g) => g.workerId === worker.id && g.status !== 'Resolved',
  ).length;
  const unresolvedOrgGrievances = orgGrievances.filter((g) => g.status !== 'Resolved').length;
  riskScore += Math.min(25, unresolvedWorkerGrievances * 10 + unresolvedOrgGrievances * 2);

  // Factor 4: Base fatigue (0-15 pts)
  riskScore += Math.min(15, (worker.fatigueScore / 100) * 15);

  riskScore = Math.min(100, Math.round(riskScore));

  const attritionRiskLevel: AttritionRiskLevel =
    riskScore >= 75 ? 'Critical' : riskScore >= 50 ? 'High' : riskScore >= 30 ? 'Moderate' : 'Low';

  return { fatigueAlerts: alerts, attritionRiskScore: riskScore, attritionRiskLevel };
}

// ═══════════════════════════════════════════════════════════════
// 3. Anonymous Submission Sanitizer
// ═══════════════════════════════════════════════════════════════

/**
 * Strips worker-identifying information from anonymous submissions,
 * generating a zero-knowledge tracking hash (ANON-XXXX) for status checks.
 */
export function sanitizeAnonymousSubmission(
  payload: GrievanceSubmission,
): Omit<GrievanceSubmission, 'workerId'> & { trackingToken: string } {
  if (!payload.isAnonymous) {
    return {
      ...payload,
      trackingToken: `GRV-${Math.floor(1000 + Math.random() * 9000)}`,
    };
  }

  // Strip all identifying information
  const sanitized = { ...payload };
  delete sanitized.workerId;

  // Strip any accidental PII from description and voice transcript
  let cleanDescription = sanitized.description;
  let cleanVoiceTranscript = sanitized.voiceTranscript || undefined;

  // Remove phone number patterns
  const phonePattern = /(\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
  // Remove email patterns
  const emailPattern = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
  // Remove worker ID patterns
  const workerIdPattern = /wkr-[a-z]-\d{3}/gi;

  cleanDescription = cleanDescription
    .replace(phonePattern, '[REDACTED-PHONE]')
    .replace(emailPattern, '[REDACTED-EMAIL]')
    .replace(workerIdPattern, '[REDACTED-ID]');

  if (cleanVoiceTranscript) {
    cleanVoiceTranscript = cleanVoiceTranscript
      .replace(phonePattern, '[REDACTED-PHONE]')
      .replace(emailPattern, '[REDACTED-EMAIL]')
      .replace(workerIdPattern, '[REDACTED-ID]');
  }

  // Generate zero-knowledge tracking hash
  const trackingToken = `ANON-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    orgId: sanitized.orgId,
    isAnonymous: true,
    category: sanitized.category,
    severity: sanitized.severity,
    title: sanitized.title,
    description: cleanDescription,
    voiceTranscript: cleanVoiceTranscript,
    trackingToken,
  };
}

/**
 * Sanitize anonymous feedback submission — strips any worker ID / PII
 */
export function sanitizeAnonymousFeedback(
  payload: FeedbackSubmission,
): Omit<FeedbackSubmission, 'workerId'> & { trackingHash: string } {
  const trackingHash = `ANON-PF${Math.floor(10 + Math.random() * 90)}`;

  // Strip any PII from free text
  let cleanComment = payload.freeTextComment || '';
  const phonePattern = /(\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
  const emailPattern = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
  const workerIdPattern = /wkr-[a-z]-\d{3}/gi;

  cleanComment = cleanComment
    .replace(phonePattern, '[REDACTED]')
    .replace(emailPattern, '[REDACTED]')
    .replace(workerIdPattern, '[REDACTED]');

  return {
    orgId: payload.orgId,
    supervisorFairnessRating: Math.min(5, Math.max(1, Math.round(payload.supervisorFairnessRating))),
    shiftErgonomicsRating: Math.min(5, Math.max(1, Math.round(payload.shiftErgonomicsRating))),
    safetyGearRating: Math.min(5, Math.max(1, Math.round(payload.safetyGearRating))),
    freeTextComment: cleanComment,
    trackingHash,
  };
}
