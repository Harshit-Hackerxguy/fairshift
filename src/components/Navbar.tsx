// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Global Navigation Bar
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Shield, Globe, ChevronDown, HardHat, GraduationCap, Briefcase, BarChart3, BookOpen, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t, LANGUAGES } from '../i18n/translations';
import type { Industry, Role } from '../context/AppContext';

export default function Navbar() {
  const { language, setLanguage, industry, setIndustry, role, setRole, selectedWorkerId, setSelectedWorkerId, workers, currentWorker } = useApp();
  const [workerDropOpen, setWorkerDropOpen] = useState(false);
  const [langDropOpen, setLangDropOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  const industries: { id: Industry; label: string; icon: React.ReactNode }[] = [
    { id: 'construction', label: t(language, 'constructionSite'), icon: <HardHat className="w-4 h-4" /> },
    { id: 'university',   label: t(language, 'universityCampus'), icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
    { id: 'worker',    label: t(language, 'workerPortal'),           icon: <User className="w-4 h-4" /> },
    { id: 'employer',  label: t(language, 'employerDashboard'),      icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'playbook',  label: t(language, 'multiIndustryPlaybook'),  icon: <BookOpen className="w-4 h-4" /> },
  ];

  const filteredWorkers = workers.filter((w) => w.industry === industry);

  return (
    <nav
      className="navbar"
      aria-label="FairShift global navigation"
    >
      {/* ── Brand ─────────────────────────────────────────────────────────── */}
      <div className="navbar-brand">
        <Shield className="brand-icon" aria-hidden="true" />
        <div>
          <span className="brand-name">{t(language, 'appName')}</span>
          <span className="brand-tagline">SDG 8</span>
        </div>
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="navbar-controls">

        {/* Industry Switcher */}
        <div className="pill-group" role="group" aria-label={t(language, 'industryLabel')}>
          {industries.map((ind) => (
            <button
              key={ind.id}
              className={`pill-btn ${industry === ind.id ? 'pill-btn--active' : ''}`}
              onClick={() => setIndustry(ind.id)}
              aria-pressed={industry === ind.id}
              aria-label={`${t(language, 'industryLabel')}: ${ind.label}`}
            >
              {ind.icon}
              <span className="pill-label">{ind.label}</span>
            </button>
          ))}
        </div>

        {/* Role Switcher */}
        <div className="pill-group" role="group" aria-label={t(language, 'roleLabel')}>
          {roles.map((r) => (
            <button
              key={r.id}
              className={`pill-btn ${role === r.id ? 'pill-btn--active role-pill--active' : ''}`}
              onClick={() => setRole(r.id)}
              aria-pressed={role === r.id}
              aria-label={r.label}
            >
              {r.icon}
              <span className="pill-label">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Worker Persona Selector (only in worker mode) */}
        {role === 'worker' && (
          <div className="dropdown-wrapper">
            <button
              id="worker-selector-btn"
              className="dropdown-trigger"
              onClick={() => setWorkerDropOpen((p) => !p)}
              aria-haspopup="listbox"
              aria-expanded={workerDropOpen}
              aria-label={t(language, 'selectWorker')}
            >
              <span className="worker-avatar">{currentWorker.avatar}</span>
              <span className="dropdown-trigger-text">
                {language === 'ta' ? currentWorker.nameTA : language === 'hi' ? currentWorker.nameHI : currentWorker.name}
              </span>
              {currentWorker.fatigueFlagged && (
                <span className="fatigue-badge" aria-label={t(language, 'fatigueFlagged')}>⚠</span>
              )}
              <ChevronDown className={`dropdown-chevron ${workerDropOpen ? 'rotated' : ''}`} aria-hidden="true" />
            </button>

            {workerDropOpen && (
              <ul
                className="dropdown-menu"
                role="listbox"
                aria-label={t(language, 'selectWorker')}
              >
                {filteredWorkers.map((w) => (
                  <li key={w.id} role="option" aria-selected={w.id === selectedWorkerId}>
                    <button
                      className={`dropdown-item ${w.id === selectedWorkerId ? 'dropdown-item--active' : ''}`}
                      onClick={() => { setSelectedWorkerId(w.id); setWorkerDropOpen(false); }}
                    >
                      <span className="worker-avatar">{w.avatar}</span>
                      <div className="dropdown-item-info">
                        <span className="dropdown-item-name">
                          {language === 'ta' ? w.nameTA : language === 'hi' ? w.nameHI : w.name}
                        </span>
                        <span className="dropdown-item-role">
                          {language === 'ta' ? w.roleTA : language === 'hi' ? w.roleHI : w.role}
                        </span>
                      </div>
                      {w.fatigueFlagged && (
                        <span className="fatigue-badge" aria-label={t(language, 'fatigueFlagged')}>⚠</span>
                      )}
                      {w.onDuty ? (
                        <span className="status-dot status-dot--on" aria-label={t(language, 'onDuty')} />
                      ) : (
                        <span className="status-dot status-dot--off" aria-label={t(language, 'offDuty')} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Language Switcher */}
        <div className="dropdown-wrapper">
          <button
            id="lang-switcher-btn"
            className="dropdown-trigger lang-trigger"
            onClick={() => setLangDropOpen((p) => !p)}
            aria-haspopup="listbox"
            aria-expanded={langDropOpen}
            aria-label={t(language, 'selectLanguage')}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span>{currentLang.nativeLabel}</span>
            <ChevronDown className={`dropdown-chevron ${langDropOpen ? 'rotated' : ''}`} aria-hidden="true" />
          </button>

          {langDropOpen && (
            <ul className="dropdown-menu" role="listbox" aria-label={t(language, 'selectLanguage')}>
              {LANGUAGES.map((lang) => (
                <li key={lang.code} role="option" aria-selected={language === lang.code}>
                  <button
                    className={`dropdown-item ${language === lang.code ? 'dropdown-item--active' : ''}`}
                    onClick={() => { setLanguage(lang.code); setLangDropOpen(false); }}
                    aria-label={`${lang.label} — ${lang.nativeLabel}`}
                  >
                    <span className="lang-native">{lang.nativeLabel}</span>
                    <span className="lang-english">{lang.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
}
