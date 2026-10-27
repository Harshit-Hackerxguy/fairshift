// ─────────────────────────────────────────────────────────────────────────────
// FairShift — App Context & Global State
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useState, ReactNode } from 'react';
import type { Language } from '../i18n/translations';

// ── Types ────────────────────────────────────────────────────────────────────

export type Industry = 'construction' | 'university';
export type Role = 'worker' | 'employer' | 'playbook';

export interface WorkerSkill {
  id: string;
  name: string;
  nameTA: string;
  nameHI: string;
  level: number;
  maxLevel: number;
  certified: boolean;
  certExpiry: string;
  hours: number;
}

export interface GrievanceReport {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'underReview' | 'actionTaken' | 'resolved';
  submittedAt: string;
  anonymous: boolean;
  trackingId: string;
}

export interface Worker {
  id: string;
  name: string;
  nameTA: string;
  nameHI: string;
  role: string;
  roleTA: string;
  roleHI: string;
  industry: Industry;
  employeeId: string;
  department: string;
  departmentTA: string;
  departmentHI: string;
  worksite: string;
  avatar: string;
  fatigueFlagged: boolean;
  onDuty: boolean;
  checkInTime: string | null;
  hoursToday: number;
  hoursThisWeek: number;
  overtimeToday: number;
  overtimeThisWeek: number;
  // Payslip
  baseHours: number;
  baseRate: number;
  overtimeHours: number;
  safetyBonus: number;
  attendanceBonus: number;
  payPeriod: string;
  // Skills
  skills: WorkerSkill[];
  totalSiteHours: number;
  safetyStreak: number;
  passportId: string;
  // Grievances
  grievances: GrievanceReport[];
}

// ── Seed Data ────────────────────────────────────────────────────────────────

export const SEED_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Rajan Selvam',
    nameTA: 'ராஜன் செல்வம்',
    nameHI: 'राजन सेल्वम',
    role: 'Senior Welder',
    roleTA: 'மூத்த வெல்டர்',
    roleHI: 'वरिष्ठ वेल्डर',
    industry: 'construction',
    employeeId: 'APX-W-0042',
    department: 'Steel Fabrication',
    departmentTA: 'எஃகு தயாரிப்பு',
    departmentHI: 'इस्पात निर्माण',
    worksite: 'Apex Metro — Block C, Tower 3',
    avatar: '👷',
    fatigueFlagged: true,
    onDuty: true,
    checkInTime: '07:15',
    hoursToday: 11.5,
    hoursThisWeek: 62,
    overtimeToday: 3.5,
    overtimeThisWeek: 22,
    baseHours: 176,
    baseRate: 85,
    overtimeHours: 22,
    safetyBonus: 800,
    attendanceBonus: 500,
    payPeriod: 'October 2026',
    skills: [
      { id: 's1', name: 'High-Altitude Scaffolding Safety', nameTA: 'உயர்-உயர கட்டமைப்பு பாதுகாப்பு', nameHI: 'ऊंचाई स्कैफोल्डिंग सुरक्षा', level: 2, maxLevel: 3, certified: true, certExpiry: '2027-06-30', hours: 1240 },
      { id: 's2', name: 'Advanced Arc Welding (MIG/TIG)', nameTA: 'மேம்பட்ட ஆர்க் வெல்டிங்', nameHI: 'उन्नत आर्क वेल्डिंग', level: 3, maxLevel: 3, certified: true, certExpiry: '2027-12-31', hours: 3100 },
      { id: 's3', name: 'First Aid Responder', nameTA: 'முதலுதவி பதிலளிப்பாளர்', nameHI: 'प्राथमिक चिकित्सा प्रतिसाददाता', level: 1, maxLevel: 2, certified: true, certExpiry: '2026-12-15', hours: 80 },
      { id: 's4', name: 'Fire Safety & Evacuation', nameTA: 'தீ பாதுகாப்பு & வெளியேற்றம்', nameHI: 'अग्नि सुरक्षा और निकासी', level: 2, maxLevel: 3, certified: false, certExpiry: '2025-03-01', hours: 240 },
    ],
    totalSiteHours: 4660,
    safetyStreak: 127,
    passportId: 'FSP-2026-TN-0042',
    grievances: [
      { id: 'g1', category: 'missingSafetyGear', description: 'Harness clips missing from Level 8 scaffolding rack.', severity: 'high', status: 'underReview', submittedAt: '2026-10-25T09:30:00Z', anonymous: true, trackingId: 'ANON-7841' },
      { id: 'g2', category: 'wagingIssue', description: 'Overtime hours for Oct 15-18 not reflected in last payslip.', severity: 'medium', status: 'actionTaken', submittedAt: '2026-10-18T14:00:00Z', anonymous: false, trackingId: 'ANON-3392' },
    ],
  },
  {
    id: 'w2',
    name: 'Priya Murugan',
    nameTA: 'பிரியா முருகன்',
    nameHI: 'प्रिया मुरुगन',
    role: 'Safety Supervisor',
    roleTA: 'பாதுகாப்பு மேற்பார்வையாளர்',
    roleHI: 'सुरक्षा पर्यवेक्षक',
    industry: 'construction',
    employeeId: 'APX-S-0018',
    department: 'Site Safety',
    departmentTA: 'தளம் பாதுகாப்பு',
    departmentHI: 'साइट सुरक्षा',
    worksite: 'Apex Metro — Block A, Site Office',
    avatar: '👩‍🏭',
    fatigueFlagged: false,
    onDuty: true,
    checkInTime: '08:00',
    hoursToday: 8,
    hoursThisWeek: 40,
    overtimeToday: 0,
    overtimeThisWeek: 0,
    baseHours: 160,
    baseRate: 110,
    overtimeHours: 0,
    safetyBonus: 1200,
    attendanceBonus: 500,
    payPeriod: 'October 2026',
    skills: [
      { id: 's5', name: 'NEBOSH Construction Safety', nameTA: 'NEBOSH கட்டுமான பாதுகாப்பு', nameHI: 'NEBOSH निर्माण सुरक्षा', level: 3, maxLevel: 3, certified: true, certExpiry: '2028-01-01', hours: 920 },
      { id: 's6', name: 'Emergency Response Coordinator', nameTA: 'அவசர நிலை ஒருங்கிணைப்பாளர்', nameHI: 'आपातकालीन प्रतिक्रिया समन्वयक', level: 2, maxLevel: 3, certified: true, certExpiry: '2027-09-01', hours: 450 },
    ],
    totalSiteHours: 1370,
    safetyStreak: 365,
    passportId: 'FSP-2026-TN-0018',
    grievances: [],
  },
  {
    id: 'w3',
    name: 'Arun Krishnamurthy',
    nameTA: 'அருண் கிருஷ்ணமூர்த்தி',
    nameHI: 'अरुण कृष्णमूर्ति',
    role: 'Electrical Technician',
    roleTA: 'மின் தொழில்நுட்பவியலாளர்',
    roleHI: 'विद्युत तकनीशियन',
    industry: 'university',
    employeeId: 'KTR-E-0091',
    department: 'Campus Electrical Dept.',
    departmentTA: 'வளாக மின் துறை',
    departmentHI: 'परिसर विद्युत विभाग',
    worksite: 'KTR Estates — Engineering Block',
    avatar: '👨‍🔧',
    fatigueFlagged: false,
    onDuty: false,
    checkInTime: null,
    hoursToday: 0,
    hoursThisWeek: 38,
    overtimeToday: 0,
    overtimeThisWeek: 6,
    baseHours: 160,
    baseRate: 95,
    overtimeHours: 6,
    safetyBonus: 600,
    attendanceBonus: 500,
    payPeriod: 'October 2026',
    skills: [
      { id: 's7', name: '3-Phase Industrial Wiring', nameTA: '3-கட்ட தொழில்துறை வயரிங்', nameHI: '3-फेज औद्योगिक वायरिंग', level: 3, maxLevel: 3, certified: true, certExpiry: '2027-06-01', hours: 2400 },
      { id: 's8', name: 'HT/LT Substation Operation', nameTA: 'HT/LT சப்ஸ்டேஷன் செயல்பாடு', nameHI: 'HT/LT सबस्टेशन संचालन', level: 2, maxLevel: 3, certified: true, certExpiry: '2027-11-30', hours: 880 },
      { id: 's9', name: 'Solar PV Installation', nameTA: 'சோலார் PV நிறுவல்', nameHI: 'सोलर PV इंस्टॉलेशन', level: 1, maxLevel: 3, certified: false, certExpiry: '2026-05-01', hours: 120 },
    ],
    totalSiteHours: 3400,
    safetyStreak: 89,
    passportId: 'FSP-2026-TN-0091',
    grievances: [
      { id: 'g3', category: 'electricalHazard', description: 'Exposed live wire near Lab Block 2 staircase.', severity: 'critical', status: 'actionTaken', submittedAt: '2026-10-24T11:00:00Z', anonymous: true, trackingId: 'ANON-5517' },
    ],
  },
  {
    id: 'w4',
    name: 'Sumitra Devi',
    nameTA: 'சுமித்ரா தேவி',
    nameHI: 'सुमित्रा देवी',
    role: 'Civil Works Helper',
    roleTA: 'சிவில் பணி உதவியாளர்',
    roleHI: 'सिविल वर्क्स हेल्पर',
    industry: 'construction',
    employeeId: 'APX-C-0203',
    department: 'Civil Construction',
    departmentTA: 'சிவில் கட்டுமானம்',
    departmentHI: 'सिविल निर्माण',
    worksite: 'Apex Metro — Block D, Foundation',
    avatar: '👩‍🔨',
    fatigueFlagged: false,
    onDuty: true,
    checkInTime: '06:30',
    hoursToday: 7.5,
    hoursThisWeek: 44,
    overtimeToday: 0,
    overtimeThisWeek: 4,
    baseHours: 176,
    baseRate: 60,
    overtimeHours: 4,
    safetyBonus: 300,
    attendanceBonus: 500,
    payPeriod: 'October 2026',
    skills: [
      { id: 's10', name: 'Reinforced Concrete Basics', nameTA: 'வலுவூட்டிய கான்கிரீட் அடிப்படைகள்', nameHI: 'प्रबलित कंक्रीट मूल बातें', level: 1, maxLevel: 3, certified: true, certExpiry: '2027-03-01', hours: 340 },
      { id: 's11', name: 'First Aid Responder', nameTA: 'முதலுதவி பதிலளிப்பாளர்', nameHI: 'प्राथमिक चिकित्सा प्रतिसाददाता', level: 1, maxLevel: 2, certified: true, certExpiry: '2027-01-15', hours: 40 },
    ],
    totalSiteHours: 380,
    safetyStreak: 44,
    passportId: 'FSP-2026-TN-0203',
    grievances: [],
  },
];

// ── Context ───────────────────────────────────────────────────────────────────

interface AppContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  industry: Industry;
  setIndustry: (i: Industry) => void;
  role: Role;
  setRole: (r: Role) => void;
  selectedWorkerId: string;
  setSelectedWorkerId: (id: string) => void;
  currentWorker: Worker;
  workers: Worker[];
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [industry, setIndustry] = useState<Industry>('construction');
  const [role, setRole] = useState<Role>('worker');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('w1');

  const workers = SEED_WORKERS;
  const currentWorker = workers.find((w) => w.id === selectedWorkerId) ?? workers[0];

  return (
    <AppContext.Provider
      value={{ language, setLanguage, industry, setIndustry, role, setRole, selectedWorkerId, setSelectedWorkerId, currentWorker, workers }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
