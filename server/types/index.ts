// ═══════════════════════════════════════════════════════════════
// FairShift — Domain Types
// SDG 8: Decent Work and Economic Growth
// ═══════════════════════════════════════════════════════════════

// ─── Industry & Organization ─────────────────────────────────

export type IndustryType = 'construction' | 'college';

export interface Organization {
  id: string;
  industry: IndustryType;
  name: string;
  siteCode: string;
  location: string;
  roles: string[];
  hazards: string[];
  activeGrievanceTopics: string[];
}

// ─── Worker ──────────────────────────────────────────────────

export interface SkillCertification {
  id: string;
  name: string;
  issuingBody: string;
  dateIssued: string;       // ISO date
  expiryDate: string | null;
  verified: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
}

export type AttritionRiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface Worker {
  id: string;
  orgId: string;
  industry: IndustryType;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  hourlyBaseRate: number;
  overtimeMultiplier: number;  // 1.5 or 2.0
  fatigueScore: number;       // 0–100
  attritionRiskLevel: AttritionRiskLevel;
  attritionRiskScore: number;  // 0–100
  skillPassport: SkillCertification[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  isActive: boolean;
}

// ─── Attendance & Shifts ─────────────────────────────────────

export type CheckInMethod = 'qr_code' | 'geofence' | 'manual';
export type AttendanceStatus = 'checked_in' | 'checked_out' | 'absent' | 'on_leave';

export interface AttendanceLog {
  id: string;
  workerId: string;
  orgId: string;
  date: string;              // ISO date (YYYY-MM-DD)
  checkInTime: string | null;       // ISO datetime
  checkOutTime: string | null;      // ISO datetime
  checkInMethod: CheckInMethod;
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  status: AttendanceStatus;
  verified: boolean;
  location: string;
  notes: string;
}

// ─── Payslip ─────────────────────────────────────────────────

export interface PayslipDeduction {
  label: string;
  amount: number;
  description: string;
}

export interface TransparentPayslip {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  orgName: string;
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  regularHours: number;
  overtimeHours: number;
  hourlyBaseRate: number;
  overtimeMultiplier: number;
  basePay: number;
  overtimePay: number;
  attendanceBonus: number;
  grossPay: number;
  deductions: PayslipDeduction[];
  totalDeductions: number;
  netPay: number;
  formulaBreakdown: string;
  plainLanguageExplanation: string;
}

// ─── Grievance & Safety ──────────────────────────────────────

export type GrievanceSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type GrievanceCategory = 'Safety Hazard' | 'Wage Dispute' | 'Harassment' | 'Equipment';
export type GrievanceStatus = 'Reported' | 'Under Review' | 'Action Taken' | 'Resolved';

export interface Grievance {
  id: string;
  orgId: string;
  workerId: string | null;      // null if anonymous
  trackingToken: string;         // e.g. "GRV-XXXX" or "ANON-XXXX"
  isAnonymous: boolean;
  category: GrievanceCategory;
  severity: GrievanceSeverity;
  title: string;
  description: string;
  voiceTranscript: string | null;
  status: GrievanceStatus;
  resolutionNotes: string | null;
  reportedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}

// ─── Anonymous Pulse Feedback ────────────────────────────────

export interface PulseFeedback {
  id: string;
  orgId: string;
  trackingHash: string;     // ANON-XXXX
  supervisorFairnessRating: number;   // 1–5
  shiftErgonomicsRating: number;      // 1–5
  safetyGearRating: number;           // 1–5
  freeTextComment: string;
  submittedAt: string;
}

// ─── Fatigue Alert ───────────────────────────────────────────

export type FatigueAlertType =
  | 'excessive_single_shift'
  | 'excessive_weekly_hours'
  | 'consecutive_shifts_no_rest';

export interface FatigueAlert {
  workerId: string;
  workerName: string;
  role: string;
  alertType: FatigueAlertType;
  message: string;
  severity: 'Warning' | 'Critical';
  triggeredAt: string;
  value: number;
  threshold: number;
}

// ─── API Request / Response DTOs ─────────────────────────────

export interface CheckInRequest {
  workerId: string;
  orgId: string;
  method: CheckInMethod;
  location: string;
  notes?: string;
}

export interface CheckOutRequest {
  attendanceLogId: string;
  notes?: string;
}

export interface GrievanceSubmission {
  orgId: string;
  workerId?: string;
  isAnonymous: boolean;
  category: GrievanceCategory;
  severity: GrievanceSeverity;
  title: string;
  description: string;
  voiceTranscript?: string;
}

export interface GrievanceStatusUpdate {
  status: GrievanceStatus;
  resolutionNotes?: string;
}

export interface FeedbackSubmission {
  orgId: string;
  workerId?: string;
  isAnonymous?: boolean;
  supervisorFairnessRating: number;
  shiftErgonomicsRating: number;
  safetyGearRating: number;
  freeTextComment?: string;
}

export interface SkillVerificationRequest {
  name: string;
  issuingBody: string;
  dateIssued: string;
  expiryDate?: string;
  verifiedBy: string;
}

export interface IndustryContextResponse {
  organization: Organization;
  workers: Worker[];
  attendanceLogs: AttendanceLog[];
  payslips: TransparentPayslip[];
  grievances: Grievance[];
  feedback: PulseFeedback[];
  fatigueAlerts: FatigueAlert[];
  summaryMetrics: SummaryMetrics;
}

export interface SummaryMetrics {
  totalWorkers: number;
  activeWorkers: number;
  averageFatigueScore: number;
  highRiskWorkers: number;
  openGrievances: number;
  resolvedGrievances: number;
  totalPayrollThisPeriod: number;
  averageOvertimeHours: number;
  criticalAlerts: number;
}
