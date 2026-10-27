// ─────────────────────────────────────────────────────────────────────────────
// FairShift — i18n Translation Dictionary
// Supports: English (en), Tamil (ta - தமிழ்), Hindi (hi - हिन्दी)
// ─────────────────────────────────────────────────────────────────────────────

export type Language = 'en' | 'ta' | 'hi';

export interface TranslationDictionary {
  // ── Global / Nav ──────────────────────────────────────────────────────────
  appName: string;
  tagline: string;
  workerPortal: string;
  employerDashboard: string;
  multiIndustryPlaybook: string;
  constructionSite: string;
  universityCampus: string;
  language: string;
  selectLanguage: string;

  // ── Industry / Context ────────────────────────────────────────────────────
  industryLabel: string;
  roleLabel: string;
  workerLabel: string;

  // ── Attendance ────────────────────────────────────────────────────────────
  attendance: string;
  checkIn: string;
  checkOut: string;
  checkedIn: string;
  checkedOut: string;
  scanQRCode: string;
  gpsVerified: string;
  gpsVerifiedDesc: string;
  gpsNotVerified: string;
  regularShift: string;
  overtime: string;
  overtimeRate: string;
  hoursToday: string;
  hoursThisWeek: string;
  ofTarget: string;
  shiftProgress: string;
  wellbeingAlert: string;
  wellbeingAlertDesc: string;
  mandatoryRest: string;
  restBreakDue: string;
  closeQR: string;
  qrModalTitle: string;
  qrModalDesc: string;
  simulateScan: string;
  scanSuccess: string;
  fatigueWarning: string;
  fatigueWarningDesc: string;

  // ── Payslip ───────────────────────────────────────────────────────────────
  payslip: string;
  payslipFor: string;
  baseHours: string;
  baseRate: string;
  basePay: string;
  overtimeHours: string;
  overtimePay: string;
  safetyBonus: string;
  attendanceBonus: string;
  pfDeduction: string;
  esiDeduction: string;
  totalDeductions: string;
  netTakeHome: string;
  listenPayslip: string;
  disputeOvertime: string;
  payslipMonth: string;
  employeeId: string;
  department: string;
  worksite: string;
  readingPayslip: string;
  payslipReadComplete: string;
  voiceNotSupported: string;
  perHour: string;
  multiplier: string;
  bonus: string;
  deduction: string;
  formula: string;
  total: string;
  approved: string;
  pending: string;

  // ── Grievance & Safety ────────────────────────────────────────────────────
  safetyGrievance: string;
  reportHazard: string;
  missingSafetyGear: string;
  electricalHazard: string;
  wagingIssue: string;
  supervisorIssue: string;
  voiceInput: string;
  startVoiceInput: string;
  stopVoiceInput: string;
  simulateVoiceNote: string;
  typeYourConcern: string;
  severity: string;
  low: string;
  medium: string;
  high: string;
  critical: string;
  anonymousMode: string;
  anonymousModeDesc: string;
  submitReport: string;
  reportSubmitted: string;
  trackingId: string;
  activeReports: string;
  reported: string;
  underReview: string;
  actionTaken: string;
  resolved: string;
  selectCategory: string;
  categoryRequired: string;
  descriptionPlaceholder: string;
  identityStripped: string;
  voiceListening: string;
  voiceTranscribed: string;
  noActiveReports: string;
  daysAgo: string;
  hoursAgo: string;

  // ── Skill Passport ────────────────────────────────────────────────────────
  skillPassport: string;
  verifiedSkills: string;
  totalHoursLogged: string;
  safetyStreak: string;
  sharePassport: string;
  verifyQR: string;
  passportId: string;
  issuedBy: string;
  validUntil: string;
  skill: string;
  certified: string;
  hours: string;
  days: string;
  consecutiveDays: string;
  hoursAcrossSites: string;
  downloadPassport: string;
  verifiedBadge: string;
  experienceLevel: string;
  level: string;
  active: string;
  expired: string;

  // ── Workers ───────────────────────────────────────────────────────────────
  selectWorker: string;
  fatigueFlagged: string;
  onDuty: string;
  offDuty: string;

  // ── Common ────────────────────────────────────────────────────────────────
  close: string;
  submit: string;
  cancel: string;
  confirm: string;
  loading: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  rupee: string;
  hours_short: string;
  mins_short: string;
  today: string;
  thisWeek: string;
  viewAll: string;
  refresh: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────────────────────
const en: TranslationDictionary = {
  // Global / Nav
  appName: 'FairShift',
  tagline: 'Decent Work & Economic Growth — SDG 8',
  workerPortal: 'Worker Portal',
  employerDashboard: 'Employer Command Center',
  multiIndustryPlaybook: 'Multi-Industry Playbook',
  constructionSite: '🏗️ Construction Site (Apex Metro)',
  universityCampus: '🎓 University Campus (KTR Estates)',
  language: 'Language',
  selectLanguage: 'Select Language',

  // Industry / Context
  industryLabel: 'Industry',
  roleLabel: 'Role',
  workerLabel: 'Worker',

  // Attendance
  attendance: 'Attendance & Live Shift Tracker',
  checkIn: 'Check In',
  checkOut: 'Check Out',
  checkedIn: 'Checked In',
  checkedOut: 'Shift Ended',
  scanQRCode: 'Scan QR Code',
  gpsVerified: '✔ GPS Verified',
  gpsVerifiedDesc: 'Within 50m of Site Zone',
  gpsNotVerified: 'GPS Not Verified',
  regularShift: 'Regular Shift (8h)',
  overtime: 'Overtime',
  overtimeRate: '1.5× Rate',
  hoursToday: 'Hours Today',
  hoursThisWeek: 'Hours This Week',
  ofTarget: 'of target',
  shiftProgress: 'Shift Progress',
  wellbeingAlert: '⚠️ Worker Well-being Alert',
  wellbeingAlertDesc: 'You have exceeded 10 hours today. Labour law entitles you to a mandatory 30-minute rest break.',
  mandatoryRest: 'Take Mandatory Rest',
  restBreakDue: 'Rest Break Due',
  closeQR: 'Close Scanner',
  qrModalTitle: 'QR Code Attendance',
  qrModalDesc: 'Position QR code within the frame. GPS location will be verified automatically.',
  simulateScan: 'Simulate QR Scan (Demo)',
  scanSuccess: 'QR Scan Successful!',
  fatigueWarning: '🔴 HIGH FATIGUE RISK',
  fatigueWarningDesc: 'This worker has logged 62+ hours this week. Mandatory rest period recommended per Schedule I — Factories Act.',

  // Payslip
  payslip: 'Transparent Payslip',
  payslipFor: 'Payslip for',
  baseHours: 'Base Hours',
  baseRate: 'Base Rate',
  basePay: 'Base Pay',
  overtimeHours: 'Overtime Hours',
  overtimePay: 'Overtime Pay',
  safetyBonus: 'Site Safety Bonus',
  attendanceBonus: 'Attendance Bonus',
  pfDeduction: 'PF Contribution (12%)',
  esiDeduction: 'ESI Contribution (0.75%)',
  totalDeductions: 'Total Deductions',
  netTakeHome: 'Net Take-Home Pay',
  listenPayslip: '🔊 Read Payslip Aloud',
  disputeOvertime: 'Dispute / Ask About Overtime',
  payslipMonth: 'Pay Period',
  employeeId: 'Employee ID',
  department: 'Department',
  worksite: 'Work Site',
  readingPayslip: 'Reading your payslip...',
  payslipReadComplete: 'Payslip read complete.',
  voiceNotSupported: 'Voice not supported on this browser. See summary below.',
  perHour: '/hr',
  multiplier: 'multiplier',
  bonus: 'Bonus',
  deduction: 'Deduction',
  formula: 'Formula',
  total: 'Total',
  approved: 'Approved',
  pending: 'Pending',

  // Grievance & Safety
  safetyGrievance: 'Safety & Grievance Reporter',
  reportHazard: 'Report a Hazard or Issue',
  missingSafetyGear: '⚠️ Missing Safety Gear',
  electricalHazard: '⚡ Electrical / Machine Hazard',
  wagingIssue: '💰 Overtime / Wage Issue',
  supervisorIssue: '🗣️ Supervisor / Shift Issue',
  voiceInput: 'Voice Input',
  startVoiceInput: 'Start Voice Input',
  stopVoiceInput: 'Stop Listening',
  simulateVoiceNote: '🎙️ Simulate Voice Note (Demo)',
  typeYourConcern: 'Type or dictate your concern here...',
  severity: 'Severity',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  anonymousMode: 'Anonymous Mode',
  anonymousModeDesc: 'Your name & device ID are stripped. Only a random tracking ID is stored.',
  submitReport: 'Submit Report Anonymously',
  reportSubmitted: 'Report Submitted',
  trackingId: 'Tracking ID',
  activeReports: 'Your Active Reports',
  reported: 'Reported',
  underReview: 'Under Review',
  actionTaken: 'Action Taken',
  resolved: 'Resolved',
  selectCategory: 'Select a category above',
  categoryRequired: 'Please select a hazard category',
  descriptionPlaceholder: 'Describe what you observed...',
  identityStripped: '🔒 Identity Stripped — Anonymous',
  voiceListening: '🎙️ Listening... Speak now',
  voiceTranscribed: 'Voice note transcribed',
  noActiveReports: 'No active reports. Stay safe!',
  daysAgo: 'days ago',
  hoursAgo: 'hours ago',

  // Skill Passport
  skillPassport: 'Digital Skill Passport',
  verifiedSkills: 'Verified Skills',
  totalHoursLogged: 'Total Hours Logged',
  safetyStreak: 'Safety Compliance Streak',
  sharePassport: 'Share Passport',
  verifyQR: 'Verify via QR',
  passportId: 'Passport ID',
  issuedBy: 'Issued By',
  validUntil: 'Valid Until',
  skill: 'Skill',
  certified: 'Certified',
  hours: 'hours',
  days: 'days',
  consecutiveDays: 'consecutive days',
  hoursAcrossSites: 'hours across sites',
  downloadPassport: 'Download PDF Passport',
  verifiedBadge: '✔ Govt. Verified',
  experienceLevel: 'Experience Level',
  level: 'Level',
  active: 'Active',
  expired: 'Expired',

  // Workers
  selectWorker: 'Select Worker',
  fatigueFlagged: 'Fatigue Flagged',
  onDuty: 'On Duty',
  offDuty: 'Off Duty',

  // Common
  close: 'Close',
  submit: 'Submit',
  cancel: 'Cancel',
  confirm: 'Confirm',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Info',
  rupee: '₹',
  hours_short: 'h',
  mins_short: 'm',
  today: 'Today',
  thisWeek: 'This Week',
  viewAll: 'View All',
  refresh: 'Refresh',
};

// ─────────────────────────────────────────────────────────────────────────────
// TAMIL — தமிழ்
// ─────────────────────────────────────────────────────────────────────────────
const ta: TranslationDictionary = {
  // Global / Nav
  appName: 'ஃபேர்ஷிஃப்ட்',
  tagline: 'நேர்மையான வேலை & பொருளாதார வளர்ச்சி — SDG 8',
  workerPortal: 'தொழிலாளர் போர்டல்',
  employerDashboard: 'முதலாளி கட்டளை மையம்',
  multiIndustryPlaybook: 'பல தொழில் வழிகாட்டி',
  constructionSite: '🏗️ கட்டுமான தளம் (Apex Metro)',
  universityCampus: '🎓 பல்கலைக்கழக வளாகம் (KTR Estates)',
  language: 'மொழி',
  selectLanguage: 'மொழியை தேர்வு செய்க',

  // Industry / Context
  industryLabel: 'தொழில்துறை',
  roleLabel: 'பணி',
  workerLabel: 'தொழிலாளர்',

  // Attendance
  attendance: 'வருகை & நேரடி ஷிஃப்ட் கண்காணிப்பு',
  checkIn: 'நுழைவு',
  checkOut: 'வெளியேற்றம்',
  checkedIn: 'நுழைந்தீர்கள்',
  checkedOut: 'ஷிஃப்ட் முடிந்தது',
  scanQRCode: 'QR குறியீட்டை ஸ்கேன் செய்க',
  gpsVerified: '✔ GPS சரிபார்க்கப்பட்டது',
  gpsVerifiedDesc: 'தளத்திலிருந்து 50 மீட்டருக்குள்',
  gpsNotVerified: 'GPS சரிபார்க்கப்படவில்லை',
  regularShift: 'வழக்கமான ஷிஃப்ட் (8 மணி)',
  overtime: 'கூடுதல் நேரம்',
  overtimeRate: '1.5× கட்டணம்',
  hoursToday: 'இன்றைய மணிநேரம்',
  hoursThisWeek: 'இந்த வாரம் மணிநேரம்',
  ofTarget: 'இலக்கிலிருந்து',
  shiftProgress: 'ஷிஃப்ட் முன்னேற்றம்',
  wellbeingAlert: '⚠️ தொழிலாளர் நலன் எச்சரிக்கை',
  wellbeingAlertDesc: 'நீங்கள் இன்று 10 மணிநேரத்திற்கும் மேல் வேலை செய்தீர்கள். தொழிலாளர் சட்டப்படி 30 நிமிட கட்டாய ஓய்வு உங்கள் உரிமை.',
  mandatoryRest: 'கட்டாய ஓய்வு எடுங்கள்',
  restBreakDue: 'ஓய்வு நேரம் வந்துவிட்டது',
  closeQR: 'ஸ்கேனரை மூடு',
  qrModalTitle: 'QR குறியீட்டு வருகை',
  qrModalDesc: 'QR குறியீட்டை சட்டத்திற்குள் வையுங்கள். GPS இடம் தானாக சரிபார்க்கப்படும்.',
  simulateScan: 'QR ஸ்கேன் சிமுலேட் செய் (டெமோ)',
  scanSuccess: 'QR ஸ்கேன் வெற்றிகரமாக!',
  fatigueWarning: '🔴 அதிக சோர்வு அபாயம்',
  fatigueWarningDesc: 'இந்த தொழிலாளர் இந்த வாரம் 62+ மணிநேரம் வேலை செய்தார். தொழிற்சாலைகள் சட்டம் — அட்டவணை I படி கட்டாய ஓய்வு தேவை.',

  // Payslip
  payslip: 'வெளிப்படையான சம்பள சீட்டு',
  payslipFor: 'சம்பள சீட்டு —',
  baseHours: 'அடிப்படை மணிநேரம்',
  baseRate: 'அடிப்படை கட்டணம்',
  basePay: 'அடிப்படை ஊதியம்',
  overtimeHours: 'கூடுதல் நேர மணிகள்',
  overtimePay: 'கூடுதல் நேர ஊதியம்',
  safetyBonus: 'பாதுகாப்பு போனஸ்',
  attendanceBonus: 'வருகை போனஸ்',
  pfDeduction: 'PF பங்களிப்பு (12%)',
  esiDeduction: 'ESI பங்களிப்பு (0.75%)',
  totalDeductions: 'மொத்த கழிவுகள்',
  netTakeHome: 'நிகர கை வருமானம்',
  listenPayslip: '🔊 சம்பள சீட்டை கேளுங்கள்',
  disputeOvertime: 'கூடுதல் நேரம் பற்றி கேள்வி / சர்ச்சை',
  payslipMonth: 'ஊதிய காலம்',
  employeeId: 'ஊழியர் ID',
  department: 'துறை',
  worksite: 'பணியிடம்',
  readingPayslip: 'உங்கள் சம்பள சீட்டை படிக்கிறேன்...',
  payslipReadComplete: 'சம்பள சீட்டு வாசிப்பு முடிந்தது.',
  voiceNotSupported: 'இந்த உலாவியில் குரல் ஆதரவு இல்லை. கீழே சுருக்கம் காணவும்.',
  perHour: '/மணி',
  multiplier: 'பெருக்கி',
  bonus: 'போனஸ்',
  deduction: 'கழிவு',
  formula: 'சூத்திரம்',
  total: 'மொத்தம்',
  approved: 'அங்கீகரிக்கப்பட்டது',
  pending: 'நிலுவையில்',

  // Grievance & Safety
  safetyGrievance: 'பாதுகாப்பு & புகார் அறிக்கையாளர்',
  reportHazard: 'ஆபத்து அல்லது சிக்கலை அறிவிக்கவும்',
  missingSafetyGear: '⚠️ பாதுகாப்பு உபகரணம் இல்லை',
  electricalHazard: '⚡ மின்சார / இயந்திர ஆபத்து',
  wagingIssue: '💰 கூடுதல் நேரம் / ஊதிய சிக்கல்',
  supervisorIssue: '🗣️ மேற்பார்வையாளர் / ஷிஃப்ட் சிக்கல்',
  voiceInput: 'குரல் உள்ளீடு',
  startVoiceInput: 'குரல் உள்ளீட்டை தொடங்கு',
  stopVoiceInput: 'கேட்பதை நிறுத்து',
  simulateVoiceNote: '🎙️ குரல் குறிப்பை சிமுலேட் செய் (டெமோ)',
  typeYourConcern: 'உங்கள் கவலையை இங்கே தட்டச்சு அல்லது கூறுங்கள்...',
  severity: 'தீவிரம்',
  low: 'குறைவு',
  medium: 'நடுத்தரம்',
  high: 'அதிகம்',
  critical: 'மிக தீவிரம்',
  anonymousMode: 'அநாமதேய முறை',
  anonymousModeDesc: 'உங்கள் பெயர் & சாதன ID நீக்கப்படும். ஒரு சீரற்ற கண்காணிப்பு ID மட்டும் சேமிக்கப்படும்.',
  submitReport: 'அநாமதேயமாக அறிக்கை சமர்ப்பி',
  reportSubmitted: 'அறிக்கை சமர்ப்பிக்கப்பட்டது',
  trackingId: 'கண்காணிப்பு ID',
  activeReports: 'உங்கள் செயலில் உள்ள அறிக்கைகள்',
  reported: 'அறிவிக்கப்பட்டது',
  underReview: 'மதிப்பாய்வில்',
  actionTaken: 'நடவடிக்கை எடுக்கப்பட்டது',
  resolved: 'தீர்க்கப்பட்டது',
  selectCategory: 'மேலே ஒரு வகையை தேர்வு செய்க',
  categoryRequired: 'ஒரு ஆபத்து வகையை தேர்வு செய்யவும்',
  descriptionPlaceholder: 'நீங்கள் கண்டதை விவரிக்கவும்...',
  identityStripped: '🔒 அடையாளம் நீக்கப்பட்டது — அநாமதேயம்',
  voiceListening: '🎙️ கேட்கிறேன்... இப்போது பேசுங்கள்',
  voiceTranscribed: 'குரல் குறிப்பு எழுத்தாக்கப்பட்டது',
  noActiveReports: 'செயலில் அறிக்கைகள் இல்லை. பத்திரமாக இருங்கள்!',
  daysAgo: 'நாட்களுக்கு முன்',
  hoursAgo: 'மணிநேரங்களுக்கு முன்',

  // Skill Passport
  skillPassport: 'டிஜிட்டல் திறன் பாஸ்போர்ட்',
  verifiedSkills: 'சரிபார்க்கப்பட்ட திறன்கள்',
  totalHoursLogged: 'மொத்த பதிவு மணிநேரம்',
  safetyStreak: 'பாதுகாப்பு இணக்க தொடர்',
  sharePassport: 'பாஸ்போர்ட்டை பகிர்',
  verifyQR: 'QR மூலம் சரிபார்',
  passportId: 'பாஸ்போர்ட் ID',
  issuedBy: 'வழங்கியவர்',
  validUntil: 'செல்லுபடியாகும் வரை',
  skill: 'திறன்',
  certified: 'சான்றிதழ் பெற்றது',
  hours: 'மணிகள்',
  days: 'நாட்கள்',
  consecutiveDays: 'தொடர்ச்சியான நாட்கள்',
  hoursAcrossSites: 'தளங்கள் முழுவதும் மணிகள்',
  downloadPassport: 'PDF பாஸ்போர்ட் பதிவிறக்கம்',
  verifiedBadge: '✔ அரசு சரிபார்க்கப்பட்டது',
  experienceLevel: 'அனுபவ நிலை',
  level: 'நிலை',
  active: 'செயலில்',
  expired: 'காலாவதியானது',

  // Workers
  selectWorker: 'தொழிலாளரை தேர்வு செய்க',
  fatigueFlagged: 'சோர்வு கொடியிடப்பட்டது',
  onDuty: 'பணியில்',
  offDuty: 'பணியில் இல்லை',

  // Common
  close: 'மூடு',
  submit: 'சமர்ப்பி',
  cancel: 'ரத்து செய்',
  confirm: 'உறுதிப்படுத்து',
  loading: 'ஏற்றுகிறது...',
  error: 'பிழை',
  success: 'வெற்றி',
  warning: 'எச்சரிக்கை',
  info: 'தகவல்',
  rupee: '₹',
  hours_short: 'மணி',
  mins_short: 'நி',
  today: 'இன்று',
  thisWeek: 'இந்த வாரம்',
  viewAll: 'அனைத்தையும் காண்',
  refresh: 'புதுப்பி',
};

// ─────────────────────────────────────────────────────────────────────────────
// HINDI — हिन्दी
// ─────────────────────────────────────────────────────────────────────────────
const hi: TranslationDictionary = {
  // Global / Nav
  appName: 'फेयरशिफ्ट',
  tagline: 'सभ्य काम और आर्थिक विकास — SDG 8',
  workerPortal: 'श्रमिक पोर्टल',
  employerDashboard: 'नियोक्ता कमांड सेंटर',
  multiIndustryPlaybook: 'बहु-उद्योग गाइडबुक',
  constructionSite: '🏗️ निर्माण स्थल (Apex Metro)',
  universityCampus: '🎓 विश्वविद्यालय परिसर (KTR Estates)',
  language: 'भाषा',
  selectLanguage: 'भाषा चुनें',

  // Industry / Context
  industryLabel: 'उद्योग',
  roleLabel: 'भूमिका',
  workerLabel: 'श्रमिक',

  // Attendance
  attendance: 'उपस्थिति और लाइव शिफ्ट ट्रैकर',
  checkIn: 'चेक इन',
  checkOut: 'चेक आउट',
  checkedIn: 'चेक इन हो गया',
  checkedOut: 'शिफ्ट समाप्त',
  scanQRCode: 'QR कोड स्कैन करें',
  gpsVerified: '✔ GPS सत्यापित',
  gpsVerifiedDesc: 'साइट क्षेत्र से 50 मीटर के भीतर',
  gpsNotVerified: 'GPS सत्यापित नहीं',
  regularShift: 'नियमित शिफ्ट (8 घंटे)',
  overtime: 'ओवरटाइम',
  overtimeRate: '1.5× दर',
  hoursToday: 'आज के घंटे',
  hoursThisWeek: 'इस सप्ताह के घंटे',
  ofTarget: 'लक्ष्य से',
  shiftProgress: 'शिफ्ट प्रगति',
  wellbeingAlert: '⚠️ श्रमिक कल्याण चेतावनी',
  wellbeingAlertDesc: 'आपने आज 10 घंटे से अधिक काम किया है। श्रम कानून के अनुसार आप 30 मिनट के अनिवार्य आराम के हकदार हैं।',
  mandatoryRest: 'अनिवार्य आराम लें',
  restBreakDue: 'आराम का समय हो गया',
  closeQR: 'स्कैनर बंद करें',
  qrModalTitle: 'QR कोड उपस्थिति',
  qrModalDesc: 'QR कोड को फ्रेम के भीतर रखें। GPS स्थान स्वचालित रूप से सत्यापित होगा।',
  simulateScan: 'QR स्कैन सिम्युलेट करें (डेमो)',
  scanSuccess: 'QR स्कैन सफल!',
  fatigueWarning: '🔴 उच्च थकान जोखिम',
  fatigueWarningDesc: 'इस श्रमिक ने इस सप्ताह 62+ घंटे काम किया है। कारखाना अधिनियम — अनुसूची I के अनुसार अनिवार्य आराम आवश्यक है।',

  // Payslip
  payslip: 'पारदर्शी वेतन पर्ची',
  payslipFor: 'वेतन पर्ची —',
  baseHours: 'आधार घंटे',
  baseRate: 'आधार दर',
  basePay: 'आधार वेतन',
  overtimeHours: 'ओवरटाइम घंटे',
  overtimePay: 'ओवरटाइम वेतन',
  safetyBonus: 'साइट सुरक्षा बोनस',
  attendanceBonus: 'उपस्थिति बोनस',
  pfDeduction: 'PF योगदान (12%)',
  esiDeduction: 'ESI योगदान (0.75%)',
  totalDeductions: 'कुल कटौती',
  netTakeHome: 'शुद्ध टेक-होम वेतन',
  listenPayslip: '🔊 वेतन पर्ची सुनें',
  disputeOvertime: 'ओवरटाइम पर विवाद / प्रश्न',
  payslipMonth: 'वेतन अवधि',
  employeeId: 'कर्मचारी ID',
  department: 'विभाग',
  worksite: 'कार्यस्थल',
  readingPayslip: 'आपकी वेतन पर्ची पढ़ रहा हूं...',
  payslipReadComplete: 'वेतन पर्ची पठन पूर्ण।',
  voiceNotSupported: 'इस ब्राउज़र में आवाज़ समर्थित नहीं। नीचे सारांश देखें।',
  perHour: '/घंटा',
  multiplier: 'गुणक',
  bonus: 'बोनस',
  deduction: 'कटौती',
  formula: 'सूत्र',
  total: 'कुल',
  approved: 'अनुमोदित',
  pending: 'लंबित',

  // Grievance & Safety
  safetyGrievance: 'सुरक्षा और शिकायत रिपोर्टर',
  reportHazard: 'खतरा या समस्या रिपोर्ट करें',
  missingSafetyGear: '⚠️ सुरक्षा उपकरण अनुपस्थित',
  electricalHazard: '⚡ विद्युत / मशीन खतरा',
  wagingIssue: '💰 ओवरटाइम / मजदूरी समस्या',
  supervisorIssue: '🗣️ सुपरवाइज़र / शिफ्ट समस्या',
  voiceInput: 'आवाज़ इनपुट',
  startVoiceInput: 'आवाज़ इनपुट शुरू करें',
  stopVoiceInput: 'सुनना बंद करें',
  simulateVoiceNote: '🎙️ आवाज़ नोट सिम्युलेट करें (डेमो)',
  typeYourConcern: 'अपनी चिंता यहाँ टाइप करें या बोलें...',
  severity: 'गंभीरता',
  low: 'कम',
  medium: 'मध्यम',
  high: 'उच्च',
  critical: 'अत्यधिक गंभीर',
  anonymousMode: 'गुमनाम मोड',
  anonymousModeDesc: 'आपका नाम और डिवाइस ID हटा दिया जाता है। केवल एक यादृच्छिक ट्रैकिंग ID संग्रहीत की जाती है।',
  submitReport: 'गुमनाम रूप से रिपोर्ट जमा करें',
  reportSubmitted: 'रिपोर्ट जमा हो गई',
  trackingId: 'ट्रैकिंग ID',
  activeReports: 'आपकी सक्रिय रिपोर्टें',
  reported: 'रिपोर्ट किया गया',
  underReview: 'समीक्षा में',
  actionTaken: 'कार्रवाई की गई',
  resolved: 'हल किया गया',
  selectCategory: 'ऊपर एक श्रेणी चुनें',
  categoryRequired: 'कृपया एक खतरा श्रेणी चुनें',
  descriptionPlaceholder: 'आपने जो देखा उसका वर्णन करें...',
  identityStripped: '🔒 पहचान हटाई गई — गुमनाम',
  voiceListening: '🎙️ सुन रहा हूं... अभी बोलें',
  voiceTranscribed: 'आवाज़ नोट लिखित हो गया',
  noActiveReports: 'कोई सक्रिय रिपोर्ट नहीं। सुरक्षित रहें!',
  daysAgo: 'दिन पहले',
  hoursAgo: 'घंटे पहले',

  // Skill Passport
  skillPassport: 'डिजिटल कौशल पासपोर्ट',
  verifiedSkills: 'सत्यापित कौशल',
  totalHoursLogged: 'कुल दर्ज घंटे',
  safetyStreak: 'सुरक्षा अनुपालन स्ट्रीक',
  sharePassport: 'पासपोर्ट साझा करें',
  verifyQR: 'QR से सत्यापित करें',
  passportId: 'पासपोर्ट ID',
  issuedBy: 'जारीकर्ता',
  validUntil: 'तक वैध',
  skill: 'कौशल',
  certified: 'प्रमाणित',
  hours: 'घंटे',
  days: 'दिन',
  consecutiveDays: 'लगातार दिन',
  hoursAcrossSites: 'साइटों पर घंटे',
  downloadPassport: 'PDF पासपोर्ट डाउनलोड करें',
  verifiedBadge: '✔ सरकारी सत्यापित',
  experienceLevel: 'अनुभव स्तर',
  level: 'स्तर',
  active: 'सक्रिय',
  expired: 'समाप्त',

  // Workers
  selectWorker: 'श्रमिक चुनें',
  fatigueFlagged: 'थकान चिह्नित',
  onDuty: 'ड्यूटी पर',
  offDuty: 'ड्यूटी से बाहर',

  // Common
  close: 'बंद करें',
  submit: 'जमा करें',
  cancel: 'रद्द करें',
  confirm: 'पुष्टि करें',
  loading: 'लोड हो रहा है...',
  error: 'त्रुटि',
  success: 'सफल',
  warning: 'चेतावनी',
  info: 'जानकारी',
  rupee: '₹',
  hours_short: 'घ',
  mins_short: 'मि',
  today: 'आज',
  thisWeek: 'इस सप्ताह',
  viewAll: 'सभी देखें',
  refresh: 'ताज़ा करें',
};

export const translations: Record<Language, TranslationDictionary> = { en, ta, hi };

export function t(lang: Language, key: keyof TranslationDictionary): string {
  return translations[lang][key] ?? translations['en'][key] ?? key;
}

export const LANGUAGES: { code: Language; label: string; nativeLabel: string; speechCode: string }[] = [
  { code: 'en', label: 'English',  nativeLabel: 'English',  speechCode: 'en-IN' },
  { code: 'ta', label: 'Tamil',    nativeLabel: 'தமிழ்',    speechCode: 'ta-IN' },
  { code: 'hi', label: 'Hindi',    nativeLabel: 'हिन्दी',   speechCode: 'hi-IN' },
];
