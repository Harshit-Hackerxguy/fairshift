// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Digital Skill Passport (Feature 4)
// Portable, verifiable worker identity card
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Award, QrCode, Download, Share2, CheckCircle, XCircle, Star, Zap, Clock, TrendingUp, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import type { WorkerSkill } from '../../context/AppContext';

const LEVEL_LABELS: Record<string, string[]> = {
  en: ['Beginner', 'Intermediate', 'Expert'],
  ta: ['தொடக்கநிலை', 'இடைநிலை', 'நிபுணர்'],
  hi: ['शुरुआती', 'मध्यम', 'विशेषज्ञ'],
};

export default function SkillPassport() {
  const { language, currentWorker } = useApp();
  const [qrModal, setQrModal]       = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const workerName = language === 'ta' ? currentWorker.nameTA : language === 'hi' ? currentWorker.nameHI : currentWorker.name;
  const workerRole = language === 'ta' ? currentWorker.roleTA : language === 'hi' ? currentWorker.roleHI : currentWorker.role;
  const workerDept = language === 'ta' ? currentWorker.departmentTA : language === 'hi' ? currentWorker.departmentHI : currentWorker.department;

  const certifiedCount = currentWorker.skills.filter((s) => s.certified).length;
  const levelLabels    = LEVEL_LABELS[language] ?? LEVEL_LABELS['en'];

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `FairShift Skill Passport — ${currentWorker.name}`, text: `Verified Worker Passport ID: ${currentWorker.passportId}`, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(`FairShift Passport: ${currentWorker.passportId}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  }

  function isCertExpired(expiry: string) {
    return new Date(expiry) < new Date();
  }

  return (
    <section className="card" aria-labelledby="passport-heading">
      {/* Header */}
      <div className="card-header">
        <div className="card-header-left">
          <Award className="card-icon card-icon--purple" aria-hidden="true" />
          <h2 id="passport-heading" className="card-title">{t(language, 'skillPassport')}</h2>
        </div>
        <span className="govt-badge" aria-label={t(language, 'verifiedBadge')}>
          <CheckCircle className="w-3 h-3" aria-hidden="true" />
          {t(language, 'verifiedBadge')}
        </span>
      </div>

      {/* ── Passport ID Card ─────────────────────────────────────────────── */}
      <div className="passport-card" aria-label="Digital worker identity card">
        {/* Holographic shimmer bar */}
        <div className="passport-shimmer" aria-hidden="true" />

        <div className="passport-card-body">
          <div className="passport-avatar-col">
            <div className="passport-avatar" aria-hidden="true">{currentWorker.avatar}</div>
            <div className="passport-avatar-badge" aria-label="Verified">✔</div>
          </div>

          <div className="passport-info">
            <h3 className="passport-name">{workerName}</h3>
            <p className="passport-role">{workerRole}</p>
            <p className="passport-dept">{workerDept}</p>
            <p className="passport-id">{t(language, 'passportId')}: <span>{currentWorker.passportId}</span></p>
            <p className="passport-emp">{t(language, 'employeeId')}: <span>{currentWorker.employeeId}</span></p>
          </div>

          <button
            id="verify-qr-btn"
            className="passport-qr-btn"
            onClick={() => setQrModal(true)}
            aria-label={t(language, 'verifyQR')}
          >
            <QrCode className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs">{t(language, 'verifyQR')}</span>
          </button>
        </div>

        {/* Stats strip */}
        <div className="passport-stats" aria-label="Passport summary statistics">
          <div className="passport-stat" aria-label={`${t(language, 'verifiedSkills')}: ${certifiedCount}`}>
            <span className="passport-stat-value">{certifiedCount}</span>
            <span className="passport-stat-label">{t(language, 'verifiedSkills')}</span>
          </div>
          <div className="passport-stat-divider" aria-hidden="true" />
          <div className="passport-stat" aria-label={`${t(language, 'totalHoursLogged')}: ${currentWorker.totalSiteHours}`}>
            <span className="passport-stat-value">{currentWorker.totalSiteHours.toLocaleString()}</span>
            <span className="passport-stat-label">{t(language, 'hoursAcrossSites')}</span>
          </div>
          <div className="passport-stat-divider" aria-hidden="true" />
          <div className="passport-stat" aria-label={`${t(language, 'safetyStreak')}: ${currentWorker.safetyStreak} ${t(language, 'days')}`}>
            <span className="passport-stat-value text-green-400">
              <Zap className="w-4 h-4 inline" aria-hidden="true" />
              {currentWorker.safetyStreak}
            </span>
            <span className="passport-stat-label">{t(language, 'consecutiveDays')}</span>
          </div>
        </div>
      </div>

      {/* ── Skills Grid ───────────────────────────────────────────────────── */}
      <div className="skills-section">
        <h3 className="skills-heading">
          <Star className="w-4 h-4 text-amber-400" aria-hidden="true" />
          {t(language, 'verifiedSkills')}
        </h3>

        <ul className="skills-list" aria-label={t(language, 'verifiedSkills')}>
          {currentWorker.skills.map((skill: WorkerSkill) => {
            const expired    = isCertExpired(skill.certExpiry);
            const levelLabel = levelLabels[skill.level - 1] ?? `L${skill.level}`;
            return (
              <li key={skill.id} className={`skill-item ${expired ? 'skill-item--expired' : ''}`}>
                <div className="skill-item-header">
                  <div className="skill-name-col">
                    <span className="skill-name">
                      {language === 'ta' ? skill.nameTA : language === 'hi' ? skill.nameHI : skill.name}
                    </span>
                    {skill.certified ? (
                      <span className="skill-cert skill-cert--active" aria-label={t(language, 'certified')}>
                        <CheckCircle className="w-3 h-3" aria-hidden="true" />
                        {expired ? t(language, 'expired') : t(language, 'certified')}
                      </span>
                    ) : (
                      <span className="skill-cert skill-cert--none" aria-label="Not certified">
                        <XCircle className="w-3 h-3" aria-hidden="true" />
                        {t(language, 'expired')}
                      </span>
                    )}
                  </div>

                  <div className="skill-meta-col">
                    <span className={`skill-level-badge level-${skill.level}`} aria-label={`${t(language, 'level')} ${skill.level}: ${levelLabel}`}>
                      {levelLabel}
                    </span>
                    <div className="skill-hours" aria-label={`${skill.hours} ${t(language, 'hours')}`}>
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {skill.hours.toLocaleString()} {t(language, 'hours_short')}
                    </div>
                  </div>
                </div>

                {/* Level progress dots */}
                <div className="skill-level-dots" aria-label={`Level ${skill.level} of ${skill.maxLevel}`}>
                  {Array.from({ length: skill.maxLevel }).map((_, i) => (
                    <span key={i} className={`level-dot ${i < skill.level ? 'level-dot--filled' : ''}`} aria-hidden="true" />
                  ))}
                  <span className="level-text">{t(language, 'level')} {skill.level}/{skill.maxLevel}</span>
                  {expired && (
                    <span className="expiry-note" aria-label={`Expired ${skill.certExpiry}`}>
                      ⚠ {t(language, 'expired')} {skill.certExpiry}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Safety Streak Visualization */}
      <div className="streak-card" aria-label={`${t(language, 'safetyStreak')}: ${currentWorker.safetyStreak} ${t(language, 'consecutiveDays')}`}>
        <div className="streak-header">
          <TrendingUp className="w-5 h-5 text-green-400" aria-hidden="true" />
          <span className="streak-title">{t(language, 'safetyStreak')}</span>
          <span className="streak-count">{currentWorker.safetyStreak} {t(language, 'consecutiveDays')}</span>
        </div>
        <div className="streak-bar-track" role="progressbar" aria-valuenow={Math.min(currentWorker.safetyStreak, 365)} aria-valuemin={0} aria-valuemax={365}>
          <div className="streak-bar-fill" style={{ width: `${Math.min((currentWorker.safetyStreak / 365) * 100, 100)}%` }} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="passport-actions">
        <button
          id="share-passport-btn"
          className="btn btn--primary"
          onClick={handleShare}
          aria-label={t(language, 'sharePassport')}
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          {t(language, 'sharePassport')}
        </button>
        <button
          id="download-passport-btn"
          className="btn btn--outline"
          aria-label={t(language, 'downloadPassport')}
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          {t(language, 'downloadPassport')}
        </button>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="toast" role="status" aria-live="polite">
          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
          Passport ID copied to clipboard!
        </div>
      )}

      {/* QR Modal */}
      {qrModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-verify-title"
          onClick={(e) => { if (e.target === e.currentTarget) setQrModal(false); }}
        >
          <div className="modal-box modal-box--sm">
            <div className="modal-header">
              <h3 id="qr-verify-title" className="modal-title">{t(language, 'verifyQR')}</h3>
              <button className="modal-close-btn" onClick={() => setQrModal(false)} aria-label={t(language, 'close')}>
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            {/* Simulated QR */}
            <div className="qr-display" aria-label={`QR code for passport ${currentWorker.passportId}`}>
              <div className="qr-grid" aria-hidden="true">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`qr-cell ${Math.random() > 0.45 ? 'qr-cell--dark' : ''}`} />
                ))}
              </div>
              <div className="qr-overlay-logo" aria-hidden="true">🛡️</div>
            </div>
            <div className="qr-passport-id">
              <span>{currentWorker.passportId}</span>
              <span className="text-xs text-zinc-500">{t(language, 'verifiedBadge')}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
