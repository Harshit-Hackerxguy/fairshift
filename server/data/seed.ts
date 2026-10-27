// ═══════════════════════════════════════════════════════════════
// FairShift — Multi-Industry Seed Data Engine
// In-memory + JSON-backed store for two industries
// ═══════════════════════════════════════════════════════════════

import type {
  Organization,
  Worker,
  AttendanceLog,
  Grievance,
  PulseFeedback,
  TransparentPayslip,
  IndustryType,
} from '../types/index.js';

// ─── Organizations ───────────────────────────────────────────

const organizations: Organization[] = [
  {
    id: 'org-construction-001',
    industry: 'construction',
    name: 'Apex Metro Rail Construction - Site B',
    siteCode: 'AMRC-B',
    location: 'Sector 12, Metro Corridor East',
    roles: ['Structural Welder', 'Crane Operator', 'Masonry Technician', 'Site Safety Marshal'],
    hazards: ['Scaffolding harness shortage', 'Sector 4 dust ventilation failure', 'Crane load limit sensor malfunction'],
    activeGrievanceTopics: ['Scaffolding harness shortage', 'Sector 4 dust ventilation', 'Delayed overtime payout'],
  },
  {
    id: 'org-college-001',
    industry: 'college',
    name: 'KTR University Campus - Estates & Lab Maintenance',
    siteCode: 'KTR-ELM',
    location: 'KTR University Main Campus, Block C',
    roles: ['Electrical Grid Technician', 'Lab Safety Attendant', 'Campus Sanitation Lead', 'Night Security Officer'],
    hazards: ['High-voltage lab panel earthing defect', 'Chemical storage ventilation inadequacy', 'Emergency exit signage failure'],
    activeGrievanceTopics: ['High-voltage lab panel earthing', 'Night-shift transport shuttle delay', 'Chemical storage ventilation'],
  },
];

// ─── Construction Workers ────────────────────────────────────

const constructionWorkers: Worker[] = [
  {
    id: 'wkr-c-001',
    orgId: 'org-construction-001',
    industry: 'construction',
    name: 'Rajesh Kumar Meena',
    role: 'Structural Welder',
    email: 'rajesh.meena@apex.work',
    phone: '+91-9XXXXXXX01',
    joinDate: '2024-03-15',
    hourlyBaseRate: 450,
    overtimeMultiplier: 1.5,
    fatigueScore: 72,
    attritionRiskLevel: 'High',
    attritionRiskScore: 68,
    totalRegularHours: 192,
    totalOvertimeHours: 38,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-c-001',
        name: 'AWS D1.1 Structural Welding Certification',
        issuingBody: 'American Welding Society',
        dateIssued: '2023-06-10',
        expiryDate: '2026-06-10',
        verified: true,
        verifiedBy: 'Site Safety Marshal',
        verifiedAt: '2024-03-16',
      },
      {
        id: 'cert-c-002',
        name: 'Working at Heights Safety Certificate',
        issuingBody: 'National Safety Council India',
        dateIssued: '2024-01-20',
        expiryDate: '2025-01-20',
        verified: true,
        verifiedBy: 'Site Safety Marshal',
        verifiedAt: '2024-03-16',
      },
    ],
  },
  {
    id: 'wkr-c-002',
    orgId: 'org-construction-001',
    industry: 'construction',
    name: 'Suresh Bahadur Thapa',
    role: 'Crane Operator',
    email: 'suresh.thapa@apex.work',
    phone: '+91-9XXXXXXX02',
    joinDate: '2023-11-01',
    hourlyBaseRate: 520,
    overtimeMultiplier: 2.0,
    fatigueScore: 85,
    attritionRiskLevel: 'Critical',
    attritionRiskScore: 82,
    totalRegularHours: 200,
    totalOvertimeHours: 52,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-c-003',
        name: 'Mobile Crane Operator License (Class III)',
        issuingBody: 'Directorate General of Mines Safety',
        dateIssued: '2022-09-05',
        expiryDate: '2025-09-05',
        verified: true,
        verifiedBy: 'Site Safety Marshal',
        verifiedAt: '2023-11-02',
      },
      {
        id: 'cert-c-004',
        name: 'Rigging and Signal Person Certification',
        issuingBody: 'NCCCO',
        dateIssued: '2023-02-14',
        expiryDate: '2026-02-14',
        verified: true,
        verifiedBy: 'Site Safety Marshal',
        verifiedAt: '2023-11-02',
      },
    ],
  },
  {
    id: 'wkr-c-003',
    orgId: 'org-construction-001',
    industry: 'construction',
    name: 'Mohammad Irfan Sheikh',
    role: 'Masonry Technician',
    email: 'irfan.sheikh@apex.work',
    phone: '+91-9XXXXXXX03',
    joinDate: '2024-06-01',
    hourlyBaseRate: 380,
    overtimeMultiplier: 1.5,
    fatigueScore: 45,
    attritionRiskLevel: 'Low',
    attritionRiskScore: 22,
    totalRegularHours: 176,
    totalOvertimeHours: 12,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-c-005',
        name: 'Masonry NVQ Level 3',
        issuingBody: 'Construction Skills Certification Scheme',
        dateIssued: '2024-04-18',
        expiryDate: null,
        verified: true,
        verifiedBy: 'HR Admin',
        verifiedAt: '2024-06-02',
      },
    ],
  },
  {
    id: 'wkr-c-004',
    orgId: 'org-construction-001',
    industry: 'construction',
    name: 'Priya Devi Kumari',
    role: 'Site Safety Marshal',
    email: 'priya.kumari@apex.work',
    phone: '+91-9XXXXXXX04',
    joinDate: '2023-08-20',
    hourlyBaseRate: 600,
    overtimeMultiplier: 1.5,
    fatigueScore: 58,
    attritionRiskLevel: 'Moderate',
    attritionRiskScore: 45,
    totalRegularHours: 184,
    totalOvertimeHours: 24,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-c-006',
        name: 'NEBOSH International General Certificate',
        issuingBody: 'NEBOSH',
        dateIssued: '2023-03-10',
        expiryDate: '2028-03-10',
        verified: true,
        verifiedBy: 'HR Admin',
        verifiedAt: '2023-08-21',
      },
      {
        id: 'cert-c-007',
        name: 'First Aid & Emergency Response',
        issuingBody: 'Indian Red Cross Society',
        dateIssued: '2024-01-05',
        expiryDate: '2026-01-05',
        verified: true,
        verifiedBy: 'HR Admin',
        verifiedAt: '2024-01-06',
      },
    ],
  },
];

// ─── College Workers ─────────────────────────────────────────

const collegeWorkers: Worker[] = [
  {
    id: 'wkr-u-001',
    orgId: 'org-college-001',
    industry: 'college',
    name: 'Venkatesh Raman Iyer',
    role: 'Electrical Grid Technician',
    email: 'venkatesh.iyer@ktr.edu',
    phone: '+91-9XXXXXXX11',
    joinDate: '2022-07-01',
    hourlyBaseRate: 480,
    overtimeMultiplier: 1.5,
    fatigueScore: 62,
    attritionRiskLevel: 'Moderate',
    attritionRiskScore: 48,
    totalRegularHours: 180,
    totalOvertimeHours: 28,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-u-001',
        name: 'Electrical Supervisor License (Class-II)',
        issuingBody: 'Central Electricity Authority',
        dateIssued: '2021-11-15',
        expiryDate: '2026-11-15',
        verified: true,
        verifiedBy: 'Estates Director',
        verifiedAt: '2022-07-02',
      },
      {
        id: 'cert-u-002',
        name: 'High Voltage Safety Training',
        issuingBody: 'National Power Training Institute',
        dateIssued: '2023-05-20',
        expiryDate: '2025-05-20',
        verified: true,
        verifiedBy: 'Estates Director',
        verifiedAt: '2023-05-21',
      },
    ],
  },
  {
    id: 'wkr-u-002',
    orgId: 'org-college-001',
    industry: 'college',
    name: 'Anitha Lakshmi Reddy',
    role: 'Lab Safety Attendant',
    email: 'anitha.reddy@ktr.edu',
    phone: '+91-9XXXXXXX12',
    joinDate: '2023-09-01',
    hourlyBaseRate: 350,
    overtimeMultiplier: 1.5,
    fatigueScore: 38,
    attritionRiskLevel: 'Low',
    attritionRiskScore: 18,
    totalRegularHours: 168,
    totalOvertimeHours: 8,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-u-003',
        name: 'Chemical Handling & HAZMAT Certificate',
        issuingBody: 'National Safety Council India',
        dateIssued: '2023-07-10',
        expiryDate: '2025-07-10',
        verified: true,
        verifiedBy: 'Lab Director',
        verifiedAt: '2023-09-02',
      },
    ],
  },
  {
    id: 'wkr-u-003',
    orgId: 'org-college-001',
    industry: 'college',
    name: 'Dhananjay Prakash Yadav',
    role: 'Campus Sanitation Lead',
    email: 'dhananjay.yadav@ktr.edu',
    phone: '+91-9XXXXXXX13',
    joinDate: '2024-01-15',
    hourlyBaseRate: 320,
    overtimeMultiplier: 1.5,
    fatigueScore: 55,
    attritionRiskLevel: 'Moderate',
    attritionRiskScore: 42,
    totalRegularHours: 192,
    totalOvertimeHours: 20,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-u-004',
        name: 'Waste Management & Segregation Training',
        issuingBody: 'Swachh Bharat Mission',
        dateIssued: '2023-12-01',
        expiryDate: null,
        verified: true,
        verifiedBy: 'Estates Director',
        verifiedAt: '2024-01-16',
      },
    ],
  },
  {
    id: 'wkr-u-004',
    orgId: 'org-college-001',
    industry: 'college',
    name: 'Balwinder Singh Gill',
    role: 'Night Security Officer',
    email: 'balwinder.gill@ktr.edu',
    phone: '+91-9XXXXXXX14',
    joinDate: '2023-04-10',
    hourlyBaseRate: 400,
    overtimeMultiplier: 2.0,
    fatigueScore: 78,
    attritionRiskLevel: 'High',
    attritionRiskScore: 71,
    totalRegularHours: 200,
    totalOvertimeHours: 44,
    isActive: true,
    skillPassport: [
      {
        id: 'cert-u-005',
        name: 'Private Security Guard License',
        issuingBody: 'PSARA (Private Security Agencies Regulation Act)',
        dateIssued: '2023-02-01',
        expiryDate: '2028-02-01',
        verified: true,
        verifiedBy: 'Estates Director',
        verifiedAt: '2023-04-11',
      },
      {
        id: 'cert-u-006',
        name: 'Fire Safety & Evacuation Training',
        issuingBody: 'National Disaster Management Authority',
        dateIssued: '2024-03-15',
        expiryDate: '2026-03-15',
        verified: true,
        verifiedBy: 'Estates Director',
        verifiedAt: '2024-03-16',
      },
    ],
  },
];

// ─── Attendance Logs ─────────────────────────────────────────

function makeDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function makeTime(date: string, hour: number, min: number): string {
  return `${date}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00.000Z`;
}

const constructionAttendance: AttendanceLog[] = [
  // Rajesh — 3 days, including a long shift
  {
    id: 'att-c-001', workerId: 'wkr-c-001', orgId: 'org-construction-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 7, 0), checkOutTime: makeTime(makeDate(1), 18, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3.5, totalHours: 11.5,
    status: 'checked_out', verified: true, location: 'Site B - Sector 3', notes: 'Extended shift for pillar casting',
  },
  {
    id: 'att-c-002', workerId: 'wkr-c-001', orgId: 'org-construction-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 6, 45), checkOutTime: makeTime(makeDate(2), 16, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 1.25, totalHours: 9.25,
    status: 'checked_out', verified: true, location: 'Site B - Sector 3', notes: '',
  },
  {
    id: 'att-c-003', workerId: 'wkr-c-001', orgId: 'org-construction-001',
    date: makeDate(3), checkInTime: makeTime(makeDate(3), 7, 0), checkOutTime: makeTime(makeDate(3), 15, 0),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 0, totalHours: 8,
    status: 'checked_out', verified: true, location: 'Site B - Sector 3', notes: '',
  },
  // Suresh — crane op, dangerous long shifts
  {
    id: 'att-c-004', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 5, 30), checkOutTime: makeTime(makeDate(1), 18, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 4.5, totalHours: 12.5,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: 'Emergency girder lift',
  },
  {
    id: 'att-c-005', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 6, 0), checkOutTime: makeTime(makeDate(2), 17, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3.5, totalHours: 11.5,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: '',
  },
  {
    id: 'att-c-006', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(3), checkInTime: makeTime(makeDate(3), 5, 45), checkOutTime: makeTime(makeDate(3), 17, 45),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 4, totalHours: 12,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: 'Night crane rotation',
  },
  {
    id: 'att-c-007', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(4), checkInTime: makeTime(makeDate(4), 6, 0), checkOutTime: makeTime(makeDate(4), 18, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 4, totalHours: 12,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: '',
  },
  {
    id: 'att-c-008', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(5), checkInTime: makeTime(makeDate(5), 6, 0), checkOutTime: makeTime(makeDate(5), 17, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3, totalHours: 11,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: '',
  },
  {
    id: 'att-c-009', workerId: 'wkr-c-002', orgId: 'org-construction-001',
    date: makeDate(6), checkInTime: makeTime(makeDate(6), 6, 0), checkOutTime: makeTime(makeDate(6), 16, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 2.5, totalHours: 10.5,
    status: 'checked_out', verified: true, location: 'Site B - Crane Bay 2', notes: '',
  },
  // Irfan — masonry, normal shifts
  {
    id: 'att-c-010', workerId: 'wkr-c-003', orgId: 'org-construction-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 8, 0), checkOutTime: makeTime(makeDate(1), 16, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 0.5, totalHours: 8.5,
    status: 'checked_out', verified: true, location: 'Site B - Block D', notes: '',
  },
  {
    id: 'att-c-011', workerId: 'wkr-c-003', orgId: 'org-construction-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 8, 0), checkOutTime: makeTime(makeDate(2), 16, 0),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 0, totalHours: 8,
    status: 'checked_out', verified: true, location: 'Site B - Block D', notes: '',
  },
  // Priya — safety marshal
  {
    id: 'att-c-012', workerId: 'wkr-c-004', orgId: 'org-construction-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 7, 30), checkOutTime: makeTime(makeDate(1), 17, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 1.5, totalHours: 9.5,
    status: 'checked_out', verified: true, location: 'Site B - Main Office', notes: 'Safety audit round',
  },
  {
    id: 'att-c-013', workerId: 'wkr-c-004', orgId: 'org-construction-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 7, 0), checkOutTime: makeTime(makeDate(2), 18, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3, totalHours: 11,
    status: 'checked_out', verified: true, location: 'Site B - All Sectors', notes: 'Incident investigation Sector 4',
  },
];

const collegeAttendance: AttendanceLog[] = [
  // Venkatesh — electrician
  {
    id: 'att-u-001', workerId: 'wkr-u-001', orgId: 'org-college-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 8, 0), checkOutTime: makeTime(makeDate(1), 17, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 1.5, totalHours: 9.5,
    status: 'checked_out', verified: true, location: 'Campus - Electrical Substation', notes: 'Panel maintenance',
  },
  {
    id: 'att-u-002', workerId: 'wkr-u-001', orgId: 'org-college-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 7, 30), checkOutTime: makeTime(makeDate(2), 18, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 2.5, totalHours: 10.5,
    status: 'checked_out', verified: true, location: 'Campus - Lab Block C', notes: 'Emergency HV panel repair',
  },
  {
    id: 'att-u-003', workerId: 'wkr-u-001', orgId: 'org-college-001',
    date: makeDate(3), checkInTime: makeTime(makeDate(3), 8, 0), checkOutTime: makeTime(makeDate(3), 16, 0),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 0, totalHours: 8,
    status: 'checked_out', verified: true, location: 'Campus - Main Grid Room', notes: '',
  },
  // Anitha — lab safety
  {
    id: 'att-u-004', workerId: 'wkr-u-002', orgId: 'org-college-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 9, 0), checkOutTime: makeTime(makeDate(1), 17, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 0, totalHours: 8,
    status: 'checked_out', verified: true, location: 'Chemistry Lab - Block C', notes: '',
  },
  {
    id: 'att-u-005', workerId: 'wkr-u-002', orgId: 'org-college-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 9, 0), checkOutTime: makeTime(makeDate(2), 17, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 0.5, totalHours: 8.5,
    status: 'checked_out', verified: true, location: 'Chemistry Lab - Block C', notes: 'Chemical inventory audit',
  },
  // Dhananjay — sanitation
  {
    id: 'att-u-006', workerId: 'wkr-u-003', orgId: 'org-college-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 6, 0), checkOutTime: makeTime(makeDate(1), 14, 30),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 0.5, totalHours: 8.5,
    status: 'checked_out', verified: true, location: 'Campus - Zone A', notes: '',
  },
  {
    id: 'att-u-007', workerId: 'wkr-u-003', orgId: 'org-college-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 6, 0), checkOutTime: makeTime(makeDate(2), 15, 0),
    checkInMethod: 'geofence', regularHours: 8, overtimeHours: 1, totalHours: 9,
    status: 'checked_out', verified: true, location: 'Campus - Zone B', notes: 'Event cleanup',
  },
  // Balwinder — night security, long night shifts
  {
    id: 'att-u-008', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(1), checkInTime: makeTime(makeDate(1), 20, 0), checkOutTime: makeTime(makeDate(1 - 1), 8, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 4, totalHours: 12,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: 'Night patrol extended',
  },
  {
    id: 'att-u-009', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(2), checkInTime: makeTime(makeDate(2), 20, 0), checkOutTime: makeTime(makeDate(2 - 1), 7, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3, totalHours: 11,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: '',
  },
  {
    id: 'att-u-010', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(3), checkInTime: makeTime(makeDate(3), 20, 0), checkOutTime: makeTime(makeDate(3 - 1), 7, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3.5, totalHours: 11.5,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: '',
  },
  {
    id: 'att-u-011', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(4), checkInTime: makeTime(makeDate(4), 20, 0), checkOutTime: makeTime(makeDate(4 - 1), 7, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3, totalHours: 11,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: '',
  },
  {
    id: 'att-u-012', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(5), checkInTime: makeTime(makeDate(5), 20, 0), checkOutTime: makeTime(makeDate(5 - 1), 8, 0),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 4, totalHours: 12,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: 'VIP event security',
  },
  {
    id: 'att-u-013', workerId: 'wkr-u-004', orgId: 'org-college-001',
    date: makeDate(6), checkInTime: makeTime(makeDate(6), 20, 0), checkOutTime: makeTime(makeDate(6 - 1), 7, 30),
    checkInMethod: 'qr_code', regularHours: 8, overtimeHours: 3.5, totalHours: 11.5,
    status: 'checked_out', verified: true, location: 'Campus - Main Gate', notes: '',
  },
];

// ─── Grievances ──────────────────────────────────────────────

const grievances: Grievance[] = [
  // Construction grievances
  {
    id: 'grv-c-001',
    orgId: 'org-construction-001',
    workerId: 'wkr-c-001',
    trackingToken: 'GRV-7291',
    isAnonymous: false,
    category: 'Safety Hazard',
    severity: 'Critical',
    title: 'Scaffolding harness shortage in Sector 3',
    description: 'Only 4 harnesses available for 8 workers on the 7th-floor scaffolding. Workers are sharing harnesses between shifts, creating a critical fall risk. Two near-miss incidents reported this week.',
    voiceTranscript: null,
    status: 'Under Review',
    resolutionNotes: null,
    reportedAt: makeTime(makeDate(3), 14, 30),
    updatedAt: makeTime(makeDate(2), 10, 0),
    resolvedAt: null,
  },
  {
    id: 'grv-c-002',
    orgId: 'org-construction-001',
    workerId: null,
    trackingToken: 'ANON-4812',
    isAnonymous: true,
    category: 'Wage Dispute',
    severity: 'High',
    title: 'Delayed overtime payout for October cycle',
    description: 'Overtime pay for the first half of October has not been credited to bank accounts. Multiple workers affected. Payslips show the overtime was calculated but the amount is missing from final credit.',
    voiceTranscript: 'I have been working extra hours for two weeks and my salary does not show overtime. Other workers also face the same problem. Please resolve this urgently.',
    status: 'Reported',
    resolutionNotes: null,
    reportedAt: makeTime(makeDate(1), 9, 15),
    updatedAt: makeTime(makeDate(1), 9, 15),
    resolvedAt: null,
  },
  {
    id: 'grv-c-003',
    orgId: 'org-construction-001',
    workerId: 'wkr-c-004',
    trackingToken: 'GRV-5034',
    isAnonymous: false,
    category: 'Equipment',
    severity: 'High',
    title: 'Sector 4 dust ventilation system non-functional',
    description: 'The industrial dust extraction unit in Sector 4 has been non-functional for 5 days. Workers in masonry and concrete cutting are exposed to silica dust without adequate PPE-level ventilation. Respiratory risk is escalating.',
    voiceTranscript: null,
    status: 'Action Taken',
    resolutionNotes: 'Temporary portable ventilation units deployed. Permanent repair scheduled for next Monday. PPE masks distributed to all Sector 4 workers.',
    reportedAt: makeTime(makeDate(5), 11, 0),
    updatedAt: makeTime(makeDate(1), 16, 30),
    resolvedAt: null,
  },
  // College grievances
  {
    id: 'grv-u-001',
    orgId: 'org-college-001',
    workerId: 'wkr-u-001',
    trackingToken: 'GRV-8103',
    isAnonymous: false,
    category: 'Safety Hazard',
    severity: 'Critical',
    title: 'High-voltage lab panel earthing defect in Block C',
    description: 'The main distribution panel in Chemistry Lab Block C shows earthing resistance above safe limits (measured 12 ohms vs required <1 ohm). Risk of electrocution during wet conditions. Panel handles show burn marks from arcing.',
    voiceTranscript: null,
    status: 'Under Review',
    resolutionNotes: null,
    reportedAt: makeTime(makeDate(2), 10, 45),
    updatedAt: makeTime(makeDate(1), 14, 0),
    resolvedAt: null,
  },
  {
    id: 'grv-u-002',
    orgId: 'org-college-001',
    workerId: null,
    trackingToken: 'ANON-6247',
    isAnonymous: true,
    category: 'Equipment',
    severity: 'Medium',
    title: 'Night-shift transport shuttle consistently delayed',
    description: 'The 10:30 PM shuttle for night-shift workers has been arriving 30-45 minutes late for the past 3 weeks. Night security and maintenance staff are forced to wait in poorly lit areas. Female staff feel unsafe.',
    voiceTranscript: 'The shuttle is always late. We stand in the dark near the back gate. It is not safe, especially for women colleagues. Please fix the shuttle timing.',
    status: 'Reported',
    resolutionNotes: null,
    reportedAt: makeTime(makeDate(1), 22, 30),
    updatedAt: makeTime(makeDate(1), 22, 30),
    resolvedAt: null,
  },
  {
    id: 'grv-u-003',
    orgId: 'org-college-001',
    workerId: 'wkr-u-002',
    trackingToken: 'GRV-9455',
    isAnonymous: false,
    category: 'Safety Hazard',
    severity: 'High',
    title: 'Chemical storage ventilation inadequate in Lab Block C',
    description: 'The fume hood exhaust in the chemical storage room is running at 40% capacity. Strong chemical odors persist even with doors open. MSDS protocols require continuous negative pressure ventilation for stored reagents.',
    voiceTranscript: null,
    status: 'Resolved',
    resolutionNotes: 'Exhaust fan motor replaced. Ventilation restored to full capacity. HVAC contractor conducted airflow certification. Results within safe limits.',
    reportedAt: makeTime(makeDate(10), 9, 0),
    updatedAt: makeTime(makeDate(2), 11, 0),
    resolvedAt: makeTime(makeDate(2), 11, 0),
  },
];

// ─── Pulse Feedback ──────────────────────────────────────────

const pulseFeedback: PulseFeedback[] = [
  {
    id: 'fb-001', orgId: 'org-construction-001', trackingHash: 'ANON-PF01',
    supervisorFairnessRating: 4, shiftErgonomicsRating: 2, safetyGearRating: 2,
    freeTextComment: 'Supervisor is fair with assignments but safety gear is insufficient. Need more harnesses and better dust masks.',
    submittedAt: makeTime(makeDate(1), 12, 0),
  },
  {
    id: 'fb-002', orgId: 'org-construction-001', trackingHash: 'ANON-PF02',
    supervisorFairnessRating: 3, shiftErgonomicsRating: 3, safetyGearRating: 3,
    freeTextComment: 'Shift timings are reasonable but overtime calculation needs to be more transparent.',
    submittedAt: makeTime(makeDate(2), 18, 0),
  },
  {
    id: 'fb-003', orgId: 'org-construction-001', trackingHash: 'ANON-PF03',
    supervisorFairnessRating: 2, shiftErgonomicsRating: 1, safetyGearRating: 2,
    freeTextComment: 'Too many consecutive shifts without rest days. Feeling exhausted and unsafe operating heavy machinery.',
    submittedAt: makeTime(makeDate(1), 20, 0),
  },
  {
    id: 'fb-004', orgId: 'org-college-001', trackingHash: 'ANON-PF04',
    supervisorFairnessRating: 5, shiftErgonomicsRating: 4, safetyGearRating: 3,
    freeTextComment: 'Good working environment overall. Night shift transport needs improvement.',
    submittedAt: makeTime(makeDate(1), 15, 0),
  },
  {
    id: 'fb-005', orgId: 'org-college-001', trackingHash: 'ANON-PF05',
    supervisorFairnessRating: 4, shiftErgonomicsRating: 3, safetyGearRating: 2,
    freeTextComment: 'Lab safety equipment is outdated. Chemical handling gloves need replacement. Otherwise management is supportive.',
    submittedAt: makeTime(makeDate(3), 10, 30),
  },
];

// ═══════════════════════════════════════════════════════════════
// Data Store — In-Memory with accessor methods
// ═══════════════════════════════════════════════════════════════

export interface DataStore {
  organizations: Organization[];
  workers: Worker[];
  attendanceLogs: AttendanceLog[];
  grievances: Grievance[];
  pulseFeedback: PulseFeedback[];
  payslips: TransparentPayslip[];
}

const store: DataStore = {
  organizations: [...organizations],
  workers: [...constructionWorkers, ...collegeWorkers],
  attendanceLogs: [...constructionAttendance, ...collegeAttendance],
  grievances: [...grievances],
  pulseFeedback: [...pulseFeedback],
  payslips: [], // Generated dynamically by the engine
};

// ─── Accessor Functions ──────────────────────────────────────

export function getStore(): DataStore {
  return store;
}

export function getOrganizationsByIndustry(industry: IndustryType): Organization[] {
  return store.organizations.filter((o) => o.industry === industry);
}

export function getWorkersByOrg(orgId: string): Worker[] {
  return store.workers.filter((w) => w.orgId === orgId);
}

export function getWorkersByIndustry(industry: IndustryType): Worker[] {
  return store.workers.filter((w) => w.industry === industry);
}

export function getWorkerById(workerId: string): Worker | undefined {
  return store.workers.find((w) => w.id === workerId);
}

export function getAttendanceByWorker(workerId: string): AttendanceLog[] {
  return store.attendanceLogs.filter((a) => a.workerId === workerId);
}

export function getAttendanceByOrg(orgId: string): AttendanceLog[] {
  return store.attendanceLogs.filter((a) => a.orgId === orgId);
}

export function getGrievancesByOrg(orgId: string): Grievance[] {
  return store.grievances.filter((g) => g.orgId === orgId);
}

export function getGrievanceById(grievanceId: string): Grievance | undefined {
  return store.grievances.find((g) => g.id === grievanceId);
}

export function getGrievanceByToken(token: string): Grievance | undefined {
  return store.grievances.find((g) => g.trackingToken === token);
}

export function getFeedbackByOrg(orgId: string): PulseFeedback[] {
  return store.pulseFeedback.filter((f) => f.orgId === orgId);
}

// ─── Mutators ────────────────────────────────────────────────

export function addAttendanceLog(log: AttendanceLog): void {
  store.attendanceLogs.push(log);
}

export function updateAttendanceLog(logId: string, updates: Partial<AttendanceLog>): AttendanceLog | undefined {
  const idx = store.attendanceLogs.findIndex((a) => a.id === logId);
  if (idx === -1) return undefined;
  store.attendanceLogs[idx] = { ...store.attendanceLogs[idx], ...updates };
  return store.attendanceLogs[idx];
}

export function addGrievance(grievance: Grievance): void {
  store.grievances.push(grievance);
}

export function updateGrievance(grievanceId: string, updates: Partial<Grievance>): Grievance | undefined {
  const idx = store.grievances.findIndex((g) => g.id === grievanceId);
  if (idx === -1) return undefined;
  store.grievances[idx] = { ...store.grievances[idx], ...updates };
  return store.grievances[idx];
}

export function addFeedback(feedback: PulseFeedback): void {
  store.pulseFeedback.push(feedback);
}

export function addPayslip(payslip: TransparentPayslip): void {
  store.payslips.push(payslip);
}

export function getPayslipsByWorker(workerId: string): TransparentPayslip[] {
  return store.payslips.filter((p) => p.workerId === workerId);
}

export function updateWorker(workerId: string, updates: Partial<Worker>): Worker | undefined {
  const idx = store.workers.findIndex((w) => w.id === workerId);
  if (idx === -1) return undefined;
  store.workers[idx] = { ...store.workers[idx], ...updates };
  return store.workers[idx];
}

export function generateId(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${rand}`;
}

export function generateTrackingToken(isAnonymous: boolean): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return isAnonymous ? `ANON-${rand}` : `GRV-${rand}`;
}
