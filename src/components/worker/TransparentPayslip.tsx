// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Transparent Payslip (Feature 2)
// Crystal-clear receipt-style payslip with TTS readout
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Volume2, VolumeX, AlertCircle, CheckCircle, IndianRupee, Minus, Plus, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t, LANGUAGES } from '../../i18n/translations';

// ── TTS helpers ───────────────────────────────────────────────────────────────

function buildPayslipScript(language: 'en' | 'ta' | 'hi', worker: { name: string; nameTA: string; nameHI: string }, pay: { base: number; overtime: number; bonus: number; deductions: number; net: number; otHours: number }) {
  const name = language === 'ta' ? worker.nameTA : language === 'hi' ? worker.nameHI : worker.name;
  const rupee = '₹';
  if (language === 'hi') {
    return `${name} की वेतन पर्ची। आधार वेतन ${rupee}${pay.base.toLocaleString('hi-IN')}। ओवरटाइम ${pay.otHours} घंटे, ओवरटाइम वेतन ${rupee}${pay.overtime.toLocaleString('hi-IN')}। कुल बोनस ${rupee}${pay.bonus.toLocaleString('hi-IN')}। कुल कटौती ${rupee}${pay.deductions.toLocaleString('hi-IN')}। आपका शुद्ध टेक-होम वेतन ${rupee}${pay.net.toLocaleString('hi-IN')} रुपये है।`;
  }
  if (language === 'ta') {
    return `${name} அவர்களின் சம்பள சீட்டு. அடிப்படை ஊதியம் ${rupee}${pay.base.toLocaleString()}. மேலூழிய மணிகள் ${pay.otHours}, மேலூழிய ஊதியம் ${rupee}${pay.overtime.toLocaleString()}. மொத்த போனஸ் ${rupee}${pay.bonus.toLocaleString()}. மொத்த கழிவுகள் ${rupee}${pay.deductions.toLocaleString()}. உங்கள் நிகர ஊதியம் ${rupee}${pay.net.toLocaleString()} ரூபாய்.`;
  }
  return `Payslip for ${name}. Base pay ${rupee}${pay.base.toLocaleString()}. Overtime hours ${pay.otHours}, overtime pay ${rupee}${pay.overtime.toLocaleString()}. Total bonuses ${rupee}${pay.bonus.toLocaleString()}. Total deductions ${rupee}${pay.deductions.toLocaleString()}. Your net take-home pay is ${rupee}${pay.net.toLocaleString()} rupees.`;
}

export default function TransparentPayslip() {
  const { language, currentWorker } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [waveActive, setWaveActive] = useState(false);
  const [disputeOpen, setDisputeOpen] = useState(false);

  const basePay       = currentWorker.baseHours * currentWorker.baseRate;
  const overtimePay   = currentWorker.overtimeHours * currentWorker.baseRate * 1.5;
  const totalBonus    = currentWorker.safetyBonus + currentWorker.attendanceBonus;
  const pfDeduction   = Math.round(basePay * 0.12);
  const esiDeduction  = Math.round(basePay * 0.0075);
  const totalDeductions = pfDeduction + esiDeduction;
  const netPay        = basePay + overtimePay + totalBonus - totalDeductions;

  useEffect(() => {
    return () => { if (voiceSupported) window.speechSynthesis.cancel(); };
  }, [voiceSupported]);

  function readPayslip() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setWaveActive(false);
      return;
    }

    const script = buildPayslipScript(language, currentWorker, {
      base: basePay, overtime: overtimePay, bonus: totalBonus,
      deductions: totalDeductions, net: netPay, otHours: currentWorker.overtimeHours,
    });

    const lang = LANGUAGES.find((l) => l.code === language);
    const utter = new SpeechSynthesisUtterance(script);
    utter.lang = lang?.speechCode ?? 'en-IN';
    utter.rate = 0.9;
    utter.onstart = () => { setIsSpeaking(true); setWaveActive(true); };
    utter.onend = () => { setIsSpeaking(false); setWaveActive(false); };
    utter.onerror = () => { setIsSpeaking(false); setWaveActive(false); };
    window.speechSynthesis.speak(utter);
  }

  const workerName = language === 'ta' ? currentWorker.nameTA : language === 'hi' ? currentWorker.nameHI : currentWorker.name;
  const workerDept = language === 'ta' ? currentWorker.departmentTA : language === 'hi' ? currentWorker.departmentHI : currentWorker.department;

  return (
    <section className="card" aria-labelledby="payslip-heading">
      {/* Header */}
      <div className="card-header">
        <div className="card-header-left">
          <IndianRupee className="card-icon card-icon--green" aria-hidden="true" />
          <h2 id="payslip-heading" className="card-title">{t(language, 'payslip')}</h2>
        </div>
        <span className="status-badge status-badge--green">
          <CheckCircle className="w-3 h-3" aria-hidden="true" />
          {t(language, 'approved')}
        </span>
      </div>

      {/* Worker meta */}
      <div className="payslip-meta">
        <div>
          <p className="payslip-worker-name">{workerName}</p>
          <p className="payslip-worker-sub">{currentWorker.employeeId} · {workerDept}</p>
        </div>
        <div className="payslip-meta-right">
          <p className="payslip-period-label">{t(language, 'payslipMonth')}</p>
          <p className="payslip-period">{currentWorker.payPeriod}</p>
        </div>
      </div>

      {/* ── Formula Breakdown ─────────────────────────────────────────────── */}
      <div className="payslip-receipt" aria-label="Payslip formula breakdown">

        {/* Base Pay */}
        <div className="receipt-row receipt-row--earning">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'basePay')}</span>
            <span className="receipt-calc">
              {currentWorker.baseHours}h × {t(language, 'rupee')}{currentWorker.baseRate}{t(language, 'perHour')}
            </span>
          </div>
          <span className="receipt-amount receipt-amount--earning">
            <Plus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{basePay.toLocaleString()}
          </span>
        </div>

        {/* Overtime */}
        <div className="receipt-row receipt-row--earning">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'overtimePay')}</span>
            <span className="receipt-calc">
              {currentWorker.overtimeHours}h × {t(language, 'rupee')}{currentWorker.baseRate} × 1.5×
            </span>
          </div>
          <span className="receipt-amount receipt-amount--overtime">
            <Plus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{overtimePay.toLocaleString()}
          </span>
        </div>

        {/* Safety Bonus */}
        <div className="receipt-row receipt-row--bonus">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'safetyBonus')}</span>
            <span className="receipt-calc">Site Safety Compliance</span>
          </div>
          <span className="receipt-amount receipt-amount--bonus">
            <Plus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{currentWorker.safetyBonus.toLocaleString()}
          </span>
        </div>

        {/* Attendance Bonus */}
        <div className="receipt-row receipt-row--bonus">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'attendanceBonus')}</span>
            <span className="receipt-calc">Full Month Attendance</span>
          </div>
          <span className="receipt-amount receipt-amount--bonus">
            <Plus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{currentWorker.attendanceBonus.toLocaleString()}
          </span>
        </div>

        <div className="receipt-divider" aria-hidden="true" />

        {/* PF */}
        <div className="receipt-row receipt-row--deduction">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'pfDeduction')}</span>
            <span className="receipt-calc">Statutory — Employees' Provident Fund</span>
          </div>
          <span className="receipt-amount receipt-amount--deduction">
            <Minus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{pfDeduction.toLocaleString()}
          </span>
        </div>

        {/* ESI */}
        <div className="receipt-row receipt-row--deduction">
          <div className="receipt-formula">
            <span className="receipt-label">{t(language, 'esiDeduction')}</span>
            <span className="receipt-calc">Statutory — Employee State Insurance</span>
          </div>
          <span className="receipt-amount receipt-amount--deduction">
            <Minus className="w-3 h-3" aria-hidden="true" />
            {t(language, 'rupee')}{esiDeduction.toLocaleString()}
          </span>
        </div>

        <div className="receipt-divider" aria-hidden="true" />

        {/* Net Pay */}
        <div className="receipt-net" aria-label={`${t(language, 'netTakeHome')}: ₹${netPay.toLocaleString()}`}>
          <span className="receipt-net-label">{t(language, 'netTakeHome')}</span>
          <span className="receipt-net-amount">₹{netPay.toLocaleString()}</span>
        </div>
      </div>

      {/* Voice Wave Animation */}
      {waveActive && (
        <div className="voice-wave" aria-live="polite" aria-label={t(language, 'readingPayslip')}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.08}s` }} aria-hidden="true" />
          ))}
          <span className="voice-wave-label">{t(language, 'readingPayslip')}</span>
        </div>
      )}

      {/* Actions */}
      <div className="payslip-actions">
        <button
          id="read-payslip-btn"
          className={`btn ${isSpeaking ? 'btn--speaking' : 'btn--voice'}`}
          onClick={voiceSupported ? readPayslip : undefined}
          aria-label={t(language, 'listenPayslip')}
          aria-pressed={isSpeaking}
          title={!voiceSupported ? t(language, 'voiceNotSupported') : undefined}
        >
          {isSpeaking ? (
            <VolumeX className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          )}
          {isSpeaking ? t(language, 'stopVoiceInput') : t(language, 'listenPayslip')}
        </button>

        {!voiceSupported && (
          <p className="voice-unsupported" role="note">{t(language, 'voiceNotSupported')}</p>
        )}

        <button
          id="dispute-overtime-btn"
          className="btn btn--outline"
          onClick={() => setDisputeOpen(true)}
          aria-label={t(language, 'disputeOvertime')}
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          {t(language, 'disputeOvertime')}
        </button>
      </div>

      {/* Dispute Modal */}
      {disputeOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dispute-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setDisputeOpen(false); }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h3 id="dispute-modal-title" className="modal-title">{t(language, 'disputeOvertime')}</h3>
              <button className="modal-close-btn" onClick={() => setDisputeOpen(false)} aria-label={t(language, 'close')}>✕</button>
            </div>
            <div className="dispute-info">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-zinc-300 leading-relaxed">
                Your overtime dispute for <strong>{currentWorker.overtimeHours}h</strong> ({t(language, 'overtimeRate')}) has been pre-filled. Your employer will receive this along with your verified attendance logs. A Labour Welfare Officer will review within 48 hours.
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn btn--primary" onClick={() => setDisputeOpen(false)}>{t(language, 'submit')}</button>
              <button className="btn btn--ghost" onClick={() => setDisputeOpen(false)}>{t(language, 'cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
