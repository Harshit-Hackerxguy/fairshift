// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Attendance Card (Feature 1)
// 1-Tap QR / Geo Attendance & Live Overtime Meter
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Zap, QrCode, X, AlertTriangle, CheckCircle, Coffee, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

export default function AttendanceCard() {
  const { language, currentWorker } = useApp();
  const [checkedIn, setCheckedIn]   = useState(currentWorker.onDuty);
  const [showQR, setShowQR]         = useState(false);
  const [gpsVerified, setGpsVerified] = useState(currentWorker.onDuty);
  const [scanDone, setScanDone]     = useState(false);
  const [scanAnim, setScanAnim]     = useState(false);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Live tick when on duty
  useEffect(() => {
    if (checkedIn) {
      timerRef.current = window.setInterval(() => setLiveSeconds((s) => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [checkedIn]);

  const hoursToday    = currentWorker.hoursToday + liveSeconds / 3600;
  const regularHours  = Math.min(hoursToday, 8);
  const overtimeHours = Math.max(0, hoursToday - 8);
  const regularPct    = (regularHours / 8) * 100;
  const overtimePct   = Math.min((overtimeHours / 4) * 100, 100); // max display 4h OT

  const weekHours     = currentWorker.hoursThisWeek + liveSeconds / 3600;
  const weekTarget    = 48;
  const weekPct       = Math.min((weekHours / weekTarget) * 100, 100);

  function simulateScan() {
    setScanAnim(true);
    setTimeout(() => {
      setScanAnim(false);
      setScanDone(true);
      setGpsVerified(true);
    }, 1800);
  }

  function handleCheckAction() {
    if (!checkedIn) {
      setShowQR(true);
    } else {
      setCheckedIn(false);
      setGpsVerified(false);
    }
  }

  function confirmCheckIn() {
    setCheckedIn(true);
    setShowQR(false);
    setScanDone(false);
  }

  const isOvertime  = hoursToday > 8;
  const isFatigue   = currentWorker.fatigueFlagged || hoursToday >= 10;

  return (
    <section className="card" aria-labelledby="attendance-heading">
      {/* Header */}
      <div className="card-header">
        <div className="card-header-left">
          <Clock className="card-icon card-icon--blue" aria-hidden="true" />
          <h2 id="attendance-heading" className="card-title">{t(language, 'attendance')}</h2>
        </div>
        {gpsVerified && (
          <span className="gps-badge" aria-label={t(language, 'gpsVerifiedDesc')}>
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {t(language, 'gpsVerified')}
          </span>
        )}
      </div>

      {/* Fatigue / Well-being Banner */}
      {isFatigue && (
        <div className="wellbeing-banner" role="alert" aria-live="assertive">
          <AlertTriangle className="w-5 h-5 wellbeing-icon" aria-hidden="true" />
          <div>
            <p className="wellbeing-title">{t(language, 'wellbeingAlert')}</p>
            <p className="wellbeing-desc">{t(language, 'wellbeingAlertDesc')}</p>
          </div>
          <button className="rest-btn" aria-label={t(language, 'mandatoryRest')}>
            <Coffee className="w-4 h-4" aria-hidden="true" />
            {t(language, 'mandatoryRest')}
          </button>
        </div>
      )}

      {/* Fatigue risk flag (when extreme) */}
      {currentWorker.fatigueFlagged && (
        <div className="fatigue-risk-bar" role="alert">
          <Zap className="w-4 h-4" aria-hidden="true" />
          <span className="font-semibold">{t(language, 'fatigueWarning')}</span>
          <span className="text-xs opacity-80 ml-2">{t(language, 'fatigueWarningDesc')}</span>
        </div>
      )}

      {/* Giant Check-In / Check-Out Button */}
      <div className="checkin-area">
        <button
          id="checkin-btn"
          className={`checkin-btn ${checkedIn ? 'checkin-btn--out' : 'checkin-btn--in'}`}
          onClick={handleCheckAction}
          aria-label={checkedIn ? t(language, 'checkOut') : t(language, 'checkIn')}
          aria-pressed={checkedIn}
        >
          <div className={`checkin-pulse ${checkedIn ? 'pulse--red' : 'pulse--green'}`} aria-hidden="true" />
          <div className="checkin-btn-inner">
            {checkedIn ? (
              <>
                <div className="checkin-time">{currentWorker.checkInTime}</div>
                <CheckCircle className="w-10 h-10 mb-1" aria-hidden="true" />
                <span className="checkin-label">{t(language, 'checkedIn')}</span>
                <span className="checkin-sub">{t(language, 'checkOut')} →</span>
              </>
            ) : (
              <>
                <QrCode className="w-10 h-10 mb-1" aria-hidden="true" />
                <span className="checkin-label">{t(language, 'checkIn')}</span>
                <span className="checkin-sub">{t(language, 'scanQRCode')}</span>
              </>
            )}
          </div>
        </button>

        {/* GPS status */}
        {gpsVerified ? (
          <div className="geo-badge geo-badge--ok" aria-label={t(language, 'gpsVerifiedDesc')}>
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            <span>{t(language, 'gpsVerifiedDesc')}</span>
          </div>
        ) : (
          <div className="geo-badge geo-badge--warn">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{t(language, 'gpsNotVerified')}</span>
          </div>
        )}
      </div>

      {/* Hours Progress Bars */}
      <div className="hours-grid">
        {/* Today */}
        <div className="hours-card">
          <div className="hours-card-header">
            <span className="hours-label">{t(language, 'hoursToday')}</span>
            <span className="hours-value">{hoursToday.toFixed(1)}{t(language, 'hours_short')}</span>
          </div>

          {/* Regular shift bar */}
          <div className="progress-track" role="progressbar" aria-valuenow={regularHours} aria-valuemin={0} aria-valuemax={8} aria-label={t(language, 'regularShift')}>
            <div className="progress-fill progress-fill--regular" style={{ width: `${regularPct}%` }} />
          </div>
          <div className="progress-meta">
            <span>{t(language, 'regularShift')}</span>
            <span>{regularHours.toFixed(1)} / 8{t(language, 'hours_short')}</span>
          </div>

          {/* Overtime bar */}
          {isOvertime && (
            <>
              <div className="progress-track mt-2" role="progressbar" aria-valuenow={overtimeHours} aria-valuemin={0} aria-valuemax={4} aria-label={t(language, 'overtime')}>
                <div className="progress-fill progress-fill--overtime" style={{ width: `${overtimePct}%` }} />
              </div>
              <div className="progress-meta">
                <span className="text-amber-400 font-semibold">
                  <TrendingUp className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {t(language, 'overtime')} ({t(language, 'overtimeRate')})
                </span>
                <span className="text-amber-400">{overtimeHours.toFixed(1)}{t(language, 'hours_short')}</span>
              </div>
            </>
          )}
        </div>

        {/* This Week */}
        <div className="hours-card">
          <div className="hours-card-header">
            <span className="hours-label">{t(language, 'hoursThisWeek')}</span>
            <span className={`hours-value ${weekHours > 48 ? 'text-red-400' : ''}`}>{weekHours.toFixed(0)}{t(language, 'hours_short')}</span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={weekHours} aria-valuemin={0} aria-valuemax={weekTarget} aria-label={t(language, 'hoursThisWeek')}>
            <div
              className={`progress-fill ${weekHours > 48 ? 'progress-fill--danger' : 'progress-fill--regular'}`}
              style={{ width: `${weekPct}%` }}
            />
          </div>
          <div className="progress-meta">
            <span>{t(language, 'thisWeek')}</span>
            <span>{weekHours.toFixed(0)} / {weekTarget}{t(language, 'hours_short')}</span>
          </div>
          {currentWorker.overtimeThisWeek > 0 && (
            <div className="progress-meta mt-1">
              <span className="text-amber-400">{t(language, 'overtime')}</span>
              <span className="text-amber-400">{currentWorker.overtimeThisWeek}{t(language, 'hours_short')}</span>
            </div>
          )}
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQR && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setShowQR(false); }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h3 id="qr-modal-title" className="modal-title">{t(language, 'qrModalTitle')}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowQR(false)}
                aria-label={t(language, 'closeQR')}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* QR Viewfinder */}
            <div className="qr-viewfinder" aria-label="QR code scanning frame">
              <div className={`qr-scanner-line ${scanAnim ? 'qr-scanner-line--anim' : ''}`} aria-hidden="true" />
              <div className="qr-corner qr-corner--tl" aria-hidden="true" />
              <div className="qr-corner qr-corner--tr" aria-hidden="true" />
              <div className="qr-corner qr-corner--bl" aria-hidden="true" />
              <div className="qr-corner qr-corner--br" aria-hidden="true" />
              {scanDone && (
                <div className="qr-success" aria-live="assertive">
                  <CheckCircle className="w-12 h-12 text-green-400" aria-hidden="true" />
                  <p className="text-green-400 font-bold mt-2">{t(language, 'scanSuccess')}</p>
                </div>
              )}
            </div>

            <p className="modal-desc">{t(language, 'qrModalDesc')}</p>

            <div className="modal-actions">
              {!scanDone ? (
                <button
                  className="btn btn--primary"
                  onClick={simulateScan}
                  disabled={scanAnim}
                  aria-label={t(language, 'simulateScan')}
                >
                  <QrCode className="w-4 h-4" aria-hidden="true" />
                  {scanAnim ? t(language, 'loading') : t(language, 'simulateScan')}
                </button>
              ) : (
                <button
                  className="btn btn--green"
                  onClick={confirmCheckIn}
                  aria-label={t(language, 'checkIn')}
                >
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  {t(language, 'checkIn')} ✓
                </button>
              )}
              <button
                className="btn btn--ghost"
                onClick={() => setShowQR(false)}
                aria-label={t(language, 'cancel')}
              >
                {t(language, 'cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
