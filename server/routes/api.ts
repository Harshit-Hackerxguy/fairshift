// ═══════════════════════════════════════════════════════════════
// FairShift — REST API Routes
// All /api/* endpoints
// ═══════════════════════════════════════════════════════════════

import { Router } from 'express';
import type { Request, Response } from 'express';
import type {
  IndustryType,
  CheckInRequest,
  GrievanceSubmission,
  GrievanceStatusUpdate,
  FeedbackSubmission,
  SkillVerificationRequest,
  SummaryMetrics,
  AttendanceLog,
  Grievance,
  PulseFeedback,
} from '../types/index.js';
import {
  getOrganizationsByIndustry,
  getWorkersByIndustry,
  getWorkerById,
  getAttendanceByWorker,
  getAttendanceByOrg,
  getGrievancesByOrg,
  getGrievanceById,
  getFeedbackByOrg,
  addAttendanceLog,
  updateAttendanceLog,
  addGrievance,
  updateGrievance,
  addFeedback,
  getPayslipsByWorker,
  addPayslip,
  updateWorker,
  generateId,
  generateTrackingToken,
  getStore,
} from '../data/seed.js';
import {
  calculateTransparentPayslip,
  evaluateWorkerFatigueAndRisk,
  sanitizeAnonymousSubmission,
  sanitizeAnonymousFeedback,
} from '../services/fairshiftEngine.js';
import { validateRequiredFields, sanitizeString } from '../middleware/security.js';

const router = Router();
const startTime = Date.now();

// ═══════════════════════════════════════════════════════════════
// GET /api/health — Health check + uptime
// ═══════════════════════════════════════════════════════════════

router.get('/health', (_req: Request, res: Response) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const hours = Math.floor(uptimeSec / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const seconds = uptimeSec % 60;

  res.json({
    status: 'healthy',
    service: 'FairShift API',
    version: '1.0.0',
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    uptimeMs,
    timestamp: new Date().toISOString(),
    sdg: 'SDG 8: Decent Work and Economic Growth',
  });
});

// ═══════════════════════════════════════════════════════════════
// GET /api/context?industry=construction|college
// Returns full industry dataset with metrics and alerts
// ═══════════════════════════════════════════════════════════════

router.get('/context', (req: Request, res: Response) => {
  const industry = req.query.industry as string;

  if (!industry || !['construction', 'college'].includes(industry)) {
    res.status(400).json({
      error: 'Invalid or missing industry parameter',
      validValues: ['construction', 'college'],
    });
    return;
  }

  const industryType = industry as IndustryType;
  const orgs = getOrganizationsByIndustry(industryType);
  if (orgs.length === 0) {
    res.status(404).json({ error: `No organizations found for industry: ${industry}` });
    return;
  }

  const org = orgs[0];
  const workers = getWorkersByIndustry(industryType);
  const store = getStore();
  const attendanceLogs = store.attendanceLogs.filter((a) => a.orgId === org.id);
  const grievances = getGrievancesByOrg(org.id);
  const feedback = getFeedbackByOrg(org.id);

  // Evaluate fatigue for all workers
  const allAlerts = workers.flatMap((w) => {
    const { fatigueAlerts } = evaluateWorkerFatigueAndRisk(w, store.attendanceLogs);
    return fatigueAlerts;
  });

  // Generate payslips
  const payslips = workers.map((w) => {
    const payslip = calculateTransparentPayslip(w, store.attendanceLogs);
    payslip.orgName = org.name;
    return payslip;
  });

  // Summary metrics
  const metrics: SummaryMetrics = {
    totalWorkers: workers.length,
    activeWorkers: workers.filter((w) => w.isActive).length,
    averageFatigueScore:
      workers.length > 0
        ? Math.round(workers.reduce((s, w) => s + w.fatigueScore, 0) / workers.length)
        : 0,
    highRiskWorkers: workers.filter((w) => {
      const { attritionRiskLevel } = evaluateWorkerFatigueAndRisk(w, store.attendanceLogs);
      return attritionRiskLevel === 'High' || attritionRiskLevel === 'Critical';
    }).length,
    openGrievances: grievances.filter((g) => g.status !== 'Resolved').length,
    resolvedGrievances: grievances.filter((g) => g.status === 'Resolved').length,
    totalPayrollThisPeriod: payslips.reduce((s, p) => s + p.netPay, 0),
    averageOvertimeHours:
      workers.length > 0
        ? Math.round((workers.reduce((s, w) => s + w.totalOvertimeHours, 0) / workers.length) * 100) / 100
        : 0,
    criticalAlerts: allAlerts.filter((a) => a.severity === 'Critical').length,
  };

  res.json({
    organization: org,
    workers: workers.map((w) => {
      const { attritionRiskScore, attritionRiskLevel } = evaluateWorkerFatigueAndRisk(w, store.attendanceLogs);
      return { ...w, attritionRiskScore, attritionRiskLevel };
    }),
    attendanceLogs,
    payslips,
    grievances,
    feedback,
    fatigueAlerts: allAlerts,
    summaryMetrics: metrics,
  });
});

// ═══════════════════════════════════════════════════════════════
// POST /api/attendance/checkin — QR / Geofence shift check-in/out
// ═══════════════════════════════════════════════════════════════

router.post('/attendance/checkin', (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;

  // Validate input
  const { valid, missing } = validateRequiredFields(body, ['workerId', 'orgId', 'method', 'location']);
  if (!valid) {
    res.status(400).json({ error: 'Missing required fields', missing });
    return;
  }

  const { workerId, orgId, method, location, notes } = body as unknown as CheckInRequest;

  const worker = getWorkerById(workerId);
  if (!worker) {
    res.status(404).json({ error: `Worker not found: ${workerId}` });
    return;
  }

  // Check if worker already has an open check-in today
  const today = new Date().toISOString().split('T')[0];
  const store = getStore();
  const existingLog = store.attendanceLogs.find(
    (a) => a.workerId === workerId && a.date === today && a.status === 'checked_in',
  );

  if (existingLog) {
    // This is a check-OUT
    const checkOutTime = new Date().toISOString();
    const checkInTime = new Date(existingLog.checkInTime!);
    const totalHoursRaw = (new Date(checkOutTime).getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
    const totalHours = Math.round(totalHoursRaw * 100) / 100;
    const regularHours = Math.min(totalHours, 8);
    const overtimeHours = Math.max(0, Math.round((totalHours - 8) * 100) / 100);

    const updated = updateAttendanceLog(existingLog.id, {
      checkOutTime,
      totalHours,
      regularHours,
      overtimeHours,
      status: 'checked_out',
      notes: notes || existingLog.notes,
    });

    // Recalculate fatigue
    const { fatigueAlerts, attritionRiskScore, attritionRiskLevel } = evaluateWorkerFatigueAndRisk(
      worker,
      store.attendanceLogs,
    );

    // Update worker risk
    updateWorker(workerId, { attritionRiskScore, attritionRiskLevel });

    res.json({
      action: 'checked_out',
      attendanceLog: updated,
      fatigueAlerts,
      attritionRisk: { score: attritionRiskScore, level: attritionRiskLevel },
    });
    return;
  }

  // This is a check-IN
  const newLog: AttendanceLog = {
    id: generateId('att'),
    workerId,
    orgId,
    date: today,
    checkInTime: new Date().toISOString(),
    checkOutTime: null,
    checkInMethod: method,
    regularHours: 0,
    overtimeHours: 0,
    totalHours: 0,
    status: 'checked_in',
    verified: true,
    location: sanitizeString(location, 200),
    notes: notes ? sanitizeString(notes, 500) : '',
  };

  addAttendanceLog(newLog);

  res.status(201).json({
    action: 'checked_in',
    attendanceLog: newLog,
    message: `${worker.name} checked in at ${newLog.checkInTime}`,
  });
});

// ═══════════════════════════════════════════════════════════════
// GET /api/payslip/:workerId — Transparent payslip
// ═══════════════════════════════════════════════════════════════

router.get('/payslip/:workerId', (req: Request, res: Response) => {
  const workerId = req.params.workerId as string;
  const worker = getWorkerById(workerId);
  if (!worker) {
    res.status(404).json({ error: `Worker not found: ${workerId}` });
    return;
  }

  const store = getStore();
  const org = store.organizations.find((o) => o.id === worker.orgId);
  const payslip = calculateTransparentPayslip(worker, store.attendanceLogs);
  payslip.orgName = org?.name || '';

  // Cache the generated payslip
  addPayslip(payslip);

  res.json({ payslip });
});

// ═══════════════════════════════════════════════════════════════
// POST /api/grievances — Submit grievance (with optional anonymity)
// ═══════════════════════════════════════════════════════════════

router.post('/grievances', (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;

  const { valid, missing } = validateRequiredFields(body, ['orgId', 'category', 'severity', 'title', 'description']);
  if (!valid) {
    res.status(400).json({ error: 'Missing required fields', missing });
    return;
  }

  const submission = body as unknown as GrievanceSubmission;

  // Validate enums
  const validCategories = ['Safety Hazard', 'Wage Dispute', 'Harassment', 'Equipment'];
  const validSeverities = ['Low', 'Medium', 'High', 'Critical'];
  if (!validCategories.includes(submission.category)) {
    res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
    return;
  }
  if (!validSeverities.includes(submission.severity)) {
    res.status(400).json({ error: `Invalid severity. Must be one of: ${validSeverities.join(', ')}` });
    return;
  }

  // Sanitize anonymous submission
  const isAnonymous = submission.isAnonymous ?? false;
  const sanitized = sanitizeAnonymousSubmission({ ...submission, isAnonymous });

  const now = new Date().toISOString();
  const grievance: Grievance = {
    id: generateId('grv'),
    orgId: sanitized.orgId,
    workerId: isAnonymous ? null : (submission.workerId || null),
    trackingToken: sanitized.trackingToken,
    isAnonymous,
    category: sanitized.category,
    severity: sanitized.severity,
    title: sanitizeString(sanitized.title, 200),
    description: sanitizeString(sanitized.description),
    voiceTranscript: sanitized.voiceTranscript ? sanitizeString(sanitized.voiceTranscript) : null,
    status: 'Reported',
    resolutionNotes: null,
    reportedAt: now,
    updatedAt: now,
    resolvedAt: null,
  };

  addGrievance(grievance);

  res.status(201).json({
    message: 'Grievance submitted successfully',
    trackingToken: grievance.trackingToken,
    id: grievance.id,
    isAnonymous: grievance.isAnonymous,
    status: grievance.status,
  });
});

// ═══════════════════════════════════════════════════════════════
// PATCH /api/grievances/:id/status — Update grievance status
// ═══════════════════════════════════════════════════════════════

router.patch('/grievances/:id/status', (req: Request, res: Response) => {
  const id = req.params.id as string;
  const body = req.body as Record<string, unknown>;

  const grievance = getGrievanceById(id);
  if (!grievance) {
    res.status(404).json({ error: `Grievance not found: ${id}` });
    return;
  }

  const { valid, missing } = validateRequiredFields(body, ['status']);
  if (!valid) {
    res.status(400).json({ error: 'Missing required fields', missing });
    return;
  }

  const update = body as unknown as GrievanceStatusUpdate;
  const validStatuses = ['Reported', 'Under Review', 'Action Taken', 'Resolved'];
  if (!validStatuses.includes(update.status)) {
    res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    return;
  }

  const now = new Date().toISOString();
  const updated = updateGrievance(id as string, {
    status: update.status,
    resolutionNotes: update.resolutionNotes
      ? sanitizeString(update.resolutionNotes)
      : grievance.resolutionNotes,
    updatedAt: now,
    resolvedAt: update.status === 'Resolved' ? now : grievance.resolvedAt,
  });

  res.json({
    message: `Grievance ${id} status updated to ${update.status}`,
    grievance: updated,
  });
});

// ═══════════════════════════════════════════════════════════════
// POST /api/feedback — Anonymous workplace feedback
// ═══════════════════════════════════════════════════════════════

router.post('/feedback', (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;

  const { valid, missing } = validateRequiredFields(body, [
    'orgId',
    'supervisorFairnessRating',
    'shiftErgonomicsRating',
    'safetyGearRating',
  ]);
  if (!valid) {
    res.status(400).json({ error: 'Missing required fields', missing });
    return;
  }

  const submission = body as unknown as FeedbackSubmission;

  // Validate ratings range
  const ratings = [submission.supervisorFairnessRating, submission.shiftErgonomicsRating, submission.safetyGearRating];
  for (const r of ratings) {
    if (typeof r !== 'number' || r < 1 || r > 5) {
      res.status(400).json({ error: 'Ratings must be numbers between 1 and 5' });
      return;
    }
  }

  const sanitized = sanitizeAnonymousFeedback(submission);

  const feedback: PulseFeedback = {
    id: generateId('fb'),
    orgId: sanitized.orgId,
    trackingHash: sanitized.trackingHash,
    supervisorFairnessRating: sanitized.supervisorFairnessRating,
    shiftErgonomicsRating: sanitized.shiftErgonomicsRating,
    safetyGearRating: sanitized.safetyGearRating,
    freeTextComment: sanitized.freeTextComment || '',
    submittedAt: new Date().toISOString(),
  };

  addFeedback(feedback);

  res.status(201).json({
    message: 'Feedback submitted anonymously',
    trackingHash: feedback.trackingHash,
  });
});

// ═══════════════════════════════════════════════════════════════
// POST /api/skills/:workerId/verify — Add/verify skill certification
// ═══════════════════════════════════════════════════════════════

router.post('/skills/:workerId/verify', (req: Request, res: Response) => {
  const workerId = req.params.workerId as string;
  const body = req.body as Record<string, unknown>;

  const worker = getWorkerById(workerId);
  if (!worker) {
    res.status(404).json({ error: `Worker not found: ${workerId}` });
    return;
  }

  const { valid, missing } = validateRequiredFields(body, ['name', 'issuingBody', 'dateIssued', 'verifiedBy']);
  if (!valid) {
    res.status(400).json({ error: 'Missing required fields', missing });
    return;
  }

  const certReq = body as unknown as SkillVerificationRequest;

  const newCert = {
    id: generateId('cert'),
    name: sanitizeString(certReq.name, 200),
    issuingBody: sanitizeString(certReq.issuingBody, 200),
    dateIssued: certReq.dateIssued,
    expiryDate: certReq.expiryDate || null,
    verified: true,
    verifiedBy: sanitizeString(certReq.verifiedBy, 100),
    verifiedAt: new Date().toISOString(),
  };

  const updatedPassport = [...worker.skillPassport, newCert];
  updateWorker(workerId as string, { skillPassport: updatedPassport });

  res.status(201).json({
    message: `Certification "${newCert.name}" verified and added to ${worker.name}'s Skill Passport`,
    certification: newCert,
    totalCertifications: updatedPassport.length,
  });
});

export default router;
