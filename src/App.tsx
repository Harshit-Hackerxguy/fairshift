// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Application Shell
// Session 2: Worker Interface
// ─────────────────────────────────────────────────────────────────────────────
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import AttendanceCard from './components/worker/AttendanceCard';
import TransparentPayslip from './components/worker/TransparentPayslip';
import SafetyGrievancePanel from './components/worker/SafetyGrievancePanel';
import SkillPassport from './components/worker/SkillPassport';
import { t } from './i18n/translations';

// ── Placeholder for Employer / Playbook views ──────────────────────────────
function EmployerPlaceholder() {
  const { language } = useApp();
  return (
    <main className="main-content">
      <div className="placeholder-view">
        <div className="placeholder-icon" aria-hidden="true">📊</div>
        <h1 className="placeholder-title">{t(language, 'employerDashboard')}</h1>
        <p className="placeholder-sub">
          The Employer Command Center — featuring AI-powered compliance alerts,
          workforce analytics, payroll audit trails, and regulatory dashboards — 
          is coming in Session 3.
        </p>
      </div>
    </main>
  );
}

function PlaybookPlaceholder() {
  const { language } = useApp();
  return (
    <main className="main-content">
      <div className="placeholder-view">
        <div className="placeholder-icon" aria-hidden="true">🌐</div>
        <h1 className="placeholder-title">{t(language, 'multiIndustryPlaybook')}</h1>
        <p className="placeholder-sub">
          The Multi-Industry Playbook — comparing labour compliance across Construction,
          University, Garment, and Gig Economy sectors — is coming in Session 4.
        </p>
      </div>
    </main>
  );
}

// ── Worker Portal ──────────────────────────────────────────────────────────
function WorkerPortal() {
  const { language, currentWorker } = useApp();
  const workerName = language === 'ta' ? currentWorker.nameTA
    : language === 'hi' ? currentWorker.nameHI
    : currentWorker.name;

  return (
    <main className="main-content" id="main-content" aria-label={`${t(language, 'workerPortal')} — ${workerName}`}>
      {/* Visually hidden skip link for screen readers */}
      <a href="#main-content" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
        Skip to main content
      </a>

      <div className="worker-grid">
        {/* Feature 1: Attendance */}
        <AttendanceCard />

        {/* Feature 2: Payslip */}
        <TransparentPayslip />

        {/* Feature 3: Safety Grievance — spans full width on large screens */}
        <div className="card--full">
          <SafetyGrievancePanel />
        </div>

        {/* Feature 4: Skill Passport */}
        <SkillPassport />
      </div>

      <div className="session-badge" aria-hidden="true">
        <span>SESSION 2 — WORKER INTERFACE COMPLETE</span>
      </div>
    </main>
  );
}

// ── Router ──────────────────────────────────────────────────────────────────
function AppRouter() {
  const { role } = useApp();
  if (role === 'employer') return <EmployerPlaceholder />;
  if (role === 'playbook') return <PlaybookPlaceholder />;
  return <WorkerPortal />;
}

// ── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Navbar />
        <AppRouter />
      </div>
    </AppProvider>
  );
}
