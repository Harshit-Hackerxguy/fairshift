// ─────────────────────────────────────────────────────────────────────────────
// FairShift — Safety & Grievance Panel (Feature 3)
// Anonymous Voice/Text Hazard Reporter with Live Status Tracker
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Lock, Send, Shield, Clock, CheckCircle2, AlertOctagon, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import type { GrievanceReport } from '../../context/AppContext';

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = ['missingSafetyGear', 'electricalHazard', 'wagingIssue', 'supervisorIssue'] as const;
type Category = typeof CATEGORIES[number];
type Severity = 'low' | 'medium' | 'high' | 'critical';

const SEVERITY_COLORS: Record<Severity, string> = {
  low: 'severity--low',
  medium: 'severity--medium',
  high: 'severity--high',
  critical: 'severity--critical',
};

const STATUS_STEPS = ['reported', 'underReview', 'actionTaken', 'resolved'] as const;
type StatusStep = typeof STATUS_STEPS[number];

function generateAnonId() {
  return 'ANON-' + Math.floor(1000 + Math.random() * 9000);
}

// Simulated voice notes per language
const SIM_VOICE_NOTES: Record<string, string> = {
  en: 'Workers on Level 7 do not have safety harnesses. The supervisor said equipment is on order but it has been 3 weeks.',
  ta: 'நிலை 7-ல் உள்ள தொழிலாளர்களுக்கு பாதுகாப்பு உபகரணம் இல்லை. மூன்று வாரமாக ஆயிற்று.',
  hi: 'स्तर 7 पर श्रमिकों के पास सुरक्षा हार्नेस नहीं है। तीन सप्ताह से उपकरण का इंतजार है।',
};

export default function SafetyGrievancePanel() {
  const { language, currentWorker } = useApp();
  const [category, setCategory]     = useState<Category | null>(null);
  const [description, setDescription] = useState('');
  const [severity, setSeverity]     = useState<Severity>('medium');
  const [anonymous, setAnonymous]   = useState(true);
  const [listening, setListening]   = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [reports, setReports]       = useState<GrievanceReport[]>(currentWorker.grievances);
  const [voiceSupported]            = useState(() => typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window));
  const recognitionRef              = useRef<any>(null);

  // Re-sync reports when worker changes
  useEffect(() => {
    setReports(currentWorker.grievances);
    setCategory(null); setDescription(''); setSeverity('medium');
    setSubmitted(false); setTrackingId('');
  }, [currentWorker.id]);

  function startVoiceInput() {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setDescription((d) => d + (d ? ' ' : '') + transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend   = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function stopVoiceInput() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function simulateVoice() {
    setListening(true);
    setTimeout(() => {
      setDescription(SIM_VOICE_NOTES[language] ?? SIM_VOICE_NOTES['en']);
      setListening(false);
    }, 1500);
  }

  function handleSubmit() {
    if (!category) return;
    const id = generateAnonId();
    const newReport: GrievanceReport = {
      id: 'gr-' + Date.now(),
      category,
      description,
      severity,
      status: 'reported',
      submittedAt: new Date().toISOString(),
      anonymous,
      trackingId: id,
    };
    setReports((prev) => [newReport, ...prev]);
    setTrackingId(id);
    setSubmitted(true);
    setDescription('');
    setCategory(null);
  }

  function resetForm() {
    setSubmitted(false);
    setTrackingId('');
  }

  function getStatusIndex(status: StatusStep) {
    return STATUS_STEPS.indexOf(status);
  }

  const categoryIcons: Record<Category, string> = {
    missingSafetyGear: '⚠️',
    electricalHazard:  '⚡',
    wagingIssue:       '💰',
    supervisorIssue:   '🗣️',
  };

  return (
    <section className="card" aria-labelledby="grievance-heading">
      {/* Header */}
      <div className="card-header">
        <div className="card-header-left">
          <Shield className="card-icon card-icon--amber" aria-hidden="true" />
          <h2 id="grievance-heading" className="card-title">{t(language, 'safetyGrievance')}</h2>
        </div>
        {anonymous && (
          <span className="anon-badge" aria-label={t(language, 'anonymousModeDesc')}>
            <Lock className="w-3 h-3" aria-hidden="true" />
            {t(language, 'identityStripped')}
          </span>
        )}
      </div>

      {submitted ? (
        /* ── Success State ────────────────────────────────────────────────── */
        <div className="submission-success" role="status" aria-live="polite">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" aria-hidden="true" />
          <h3 className="text-lg font-bold text-green-400">{t(language, 'reportSubmitted')}</h3>
          <div className="tracking-box">
            <Lock className="w-4 h-4 text-zinc-400" aria-hidden="true" />
            <span className="tracking-label">{t(language, 'trackingId')}:</span>
            <span className="tracking-id">{trackingId}</span>
          </div>
          <p className="text-sm text-zinc-400 text-center mt-2">{t(language, 'identityStripped')}</p>
          <button className="btn btn--outline mt-4" onClick={resetForm} aria-label="Report another issue">
            + {t(language, 'reportHazard')}
          </button>
        </div>
      ) : (
        <>
          {/* ── Category Icon Grid ──────────────────────────────────────────── */}
          <div className="category-grid" role="group" aria-label={t(language, 'selectCategory')}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`cat-btn-${cat}`}
                className={`category-btn ${category === cat ? 'category-btn--active' : ''}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                aria-label={t(language, cat)}
              >
                <span className="category-emoji" aria-hidden="true">{categoryIcons[cat]}</span>
                <span className="category-text">{t(language, cat)}</span>
              </button>
            ))}
          </div>

          {/* ── Description ──────────────────────────────────────────────────── */}
          <div className="input-group">
            <label htmlFor="grievance-desc" className="input-label">
              {t(language, 'typeYourConcern')}
            </label>

            {/* Voice buttons */}
            <div className="voice-controls">
              {voiceSupported ? (
                <button
                  id="voice-record-btn"
                  className={`voice-btn ${listening ? 'voice-btn--listening' : ''}`}
                  onClick={listening ? stopVoiceInput : startVoiceInput}
                  aria-label={listening ? t(language, 'stopVoiceInput') : t(language, 'startVoiceInput')}
                  aria-pressed={listening}
                >
                  {listening ? (
                    <><MicOff className="w-4 h-4" aria-hidden="true" /> {t(language, 'stopVoiceInput')}</>
                  ) : (
                    <><Mic className="w-4 h-4" aria-hidden="true" /> {t(language, 'startVoiceInput')}</>
                  )}
                </button>
              ) : null}

              {/* Always show simulate button for demo/desktop evaluators */}
              <button
                id="simulate-voice-btn"
                className="voice-btn voice-btn--sim"
                onClick={simulateVoice}
                disabled={listening}
                aria-label={t(language, 'simulateVoiceNote')}
              >
                {t(language, 'simulateVoiceNote')}
              </button>
            </div>

            {listening && (
              <div className="listening-indicator" role="status" aria-live="polite">
                <span className="listening-dot" aria-hidden="true" />
                {t(language, 'voiceListening')}
              </div>
            )}

            <textarea
              id="grievance-desc"
              className="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(language, 'descriptionPlaceholder')}
              aria-label={t(language, 'typeYourConcern')}
            />
          </div>

          {/* ── Severity & Anonymous Row ──────────────────────────────────── */}
          <div className="form-row">
            <div className="input-group flex-1">
              <label className="input-label">{t(language, 'severity')}</label>
              <div className="severity-group" role="group" aria-label={t(language, 'severity')}>
                {(['low', 'medium', 'high', 'critical'] as Severity[]).map((sev) => (
                  <button
                    key={sev}
                    className={`severity-btn ${SEVERITY_COLORS[sev]} ${severity === sev ? 'severity-btn--active' : ''}`}
                    onClick={() => setSeverity(sev)}
                    aria-pressed={severity === sev}
                    aria-label={`${t(language, 'severity')}: ${t(language, sev)}`}
                  >
                    {t(language, sev)}
                  </button>
                ))}
              </div>
            </div>

            <div className="anon-toggle">
              <button
                id="anon-toggle-btn"
                className={`toggle-switch ${anonymous ? 'toggle-switch--on' : ''}`}
                onClick={() => setAnonymous((a) => !a)}
                role="switch"
                aria-checked={anonymous}
                aria-label={t(language, 'anonymousMode')}
              >
                <span className="toggle-thumb" aria-hidden="true" />
              </button>
              <div>
                <p className="toggle-label">
                  <Lock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {t(language, 'anonymousMode')}
                </p>
                <p className="toggle-desc">{t(language, 'anonymousModeDesc')}</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            id="submit-report-btn"
            className="btn btn--primary btn--full"
            onClick={handleSubmit}
            disabled={!category}
            aria-label={t(language, 'submitReport')}
            aria-disabled={!category}
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            {t(language, 'submitReport')}
          </button>
          {!category && (
            <p className="input-hint" role="note">{t(language, 'categoryRequired')}</p>
          )}
        </>
      )}

      {/* ── Live Status Tracker ───────────────────────────────────────────── */}
      {reports.length > 0 && (
        <div className="reports-section" aria-label={t(language, 'activeReports')}>
          <h3 className="reports-title">
            <AlertOctagon className="w-4 h-4" aria-hidden="true" />
            {t(language, 'activeReports')} ({reports.length})
          </h3>

          <ul className="reports-list">
            {reports.map((report) => {
              const statusIdx = getStatusIndex(report.status as StatusStep);
              return (
                <li key={report.id} className="report-card" aria-label={`Report ${report.trackingId}: ${t(language, report.category as any)}`}>
                  <div className="report-card-header">
                    <span className="report-category">{categoryIcons[report.category as Category]} {t(language, report.category as any)}</span>
                    <span className={`severity-pill ${SEVERITY_COLORS[report.severity]}`}>
                      {t(language, report.severity as any)}
                    </span>
                  </div>
                  {report.description && (
                    <p className="report-desc">{report.description}</p>
                  )}
                  {/* 4-Step Status Timeline */}
                  <div className="timeline" aria-label="Report status timeline">
                    {STATUS_STEPS.map((step, idx) => (
                      <div key={step} className={`timeline-step ${idx <= statusIdx ? 'timeline-step--done' : ''} ${idx === statusIdx ? 'timeline-step--current' : ''}`}>
                        <div className="timeline-dot" aria-hidden="true">
                          {idx < statusIdx ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> : idx === statusIdx ? <Clock className="w-3 h-3" aria-hidden="true" /> : null}
                        </div>
                        <span className="timeline-label">{t(language, step as any)}</span>
                        {idx < STATUS_STEPS.length - 1 && (
                          <ChevronRight className="timeline-arrow" aria-hidden="true" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="report-footer">
                    <Lock className="w-3 h-3 text-zinc-500" aria-hidden="true" />
                    <span className="report-tracking">{report.trackingId}</span>
                    <span className="report-time">
                      {Math.round((Date.now() - new Date(report.submittedAt).getTime()) / 86400000)} {t(language, 'daysAgo')}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {reports.length === 0 && (
        <p className="no-reports" role="status">{t(language, 'noActiveReports')}</p>
      )}
    </section>
  );
}
