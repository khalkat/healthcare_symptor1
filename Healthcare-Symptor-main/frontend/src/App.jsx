import { useState, useEffect } from "react";

const BACKEND = "http://localhost:5000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: #fff;
    color: #1a1a1a;
  }

  .app {
    min-height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  /* ── Top bar ── */
  .topbar {
    width: 100%;
    padding: 16px 40px;
    border-bottom: 1px solid #f0e6e9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .topbar-logo {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    color: #111;
    letter-spacing: -0.01em;
  }

  .topbar-logo em {
    font-style: italic;
    color: #c2536a;
  }

  .topbar-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #c2536a;
    font-weight: 600;
  }

  .badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #e8879a;
    animation: pulse 1.6s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.75); }
  }

  /* ── Two-column layout ── */
  .layout {
    display: flex;
    flex: 1;
    min-height: calc(100vh - 53px);
  }

  /* ── Left sidebar ── */
  .sidebar {
    width: 360px;
    min-width: 320px;
    border-right: 1px solid #f0e6e9;
    padding: 44px 36px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    background: #fdf8f9;
    overflow-y: auto;
  }

  /* ── Right main panel ── */
  .main {
    flex: 1;
    padding: 44px 56px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: #fff;
  }

  /* ── Header ── */
  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    line-height: 1.15;
    color: #111;
    letter-spacing: -0.02em;
  }

  .title em {
    font-style: italic;
    color: #c2536a;
  }

  .divider {
    width: 28px;
    height: 2px;
    background: #e8879a;
    border-radius: 2px;
  }

  .subtitle {
    font-size: 13px;
    color: #999;
    font-weight: 400;
    line-height: 1.75;
  }

  /* ── Cards ── */
  .card {
    background: #fff;
    border: 1px solid #f0e6e9;
    border-radius: 16px;
    padding: 22px;
    box-shadow: 0 1px 4px rgba(194,83,106,0.04), 0 4px 18px rgba(0,0,0,0.03);
  }

  .card-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #c2a0aa;
    margin-bottom: 12px;
    font-weight: 600;
  }

  /* ── Textarea ── */
  textarea {
    width: 100%;
    height: 160px;
    padding: 14px 16px;
    border: 1px solid #f0e0e4;
    border-radius: 12px;
    background: #fdf8f9;
    font-family: 'Nunito', sans-serif;
    font-size: 13.5px;
    color: #1a1a1a;
    resize: none;
    outline: none;
    line-height: 1.75;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  textarea:focus {
    border-color: #e8879a;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(232,135,154,0.1);
  }

  textarea::placeholder { color: #ccc; }

  .char-count {
    font-size: 11px;
    color: #ccc;
    text-align: right;
    margin-top: 6px;
    font-weight: 300;
  }

  /* ── Button ── */
  .btn {
    width: 100%;
    padding: 14px;
    background: #c2536a;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  }

  .btn:hover:not(:disabled) {
    background: #b04460;
    box-shadow: 0 4px 14px rgba(194,83,106,0.3);
  }

  .btn:active:not(:disabled) { transform: scale(0.985); }

  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── History ── */
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .history-title {
    font-size: 10px;
    color: #c2a0aa;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .history-count {
    font-size: 11px;
    color: #e0c4ca;
    font-weight: 300;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 280px;
    overflow-y: auto;
  }

  .history-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 11px 13px;
    border: 1px solid #f5eaec;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    background: #fff;
  }

  .history-item:hover {
    border-color: #e8879a;
    background: #fdf8f9;
  }

  .h-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 5px;
  }

  .h-dot-low    { background: #2e8b57; }
  .h-dot-high   { background: #c2536a; }
  .h-dot-medium { background: #c07a2a; }

  .h-symptoms {
    font-size: 12.5px;
    color: #444;
    line-height: 1.5;
    flex: 1;
  }

  .h-sev { font-size: 10.5px; color: #bbb; margin-top: 2px; }

  .h-time {
    font-size: 10.5px;
    color: #ccc;
    flex-shrink: 0;
    font-weight: 300;
  }

  .empty-state {
    text-align: center;
    padding: 24px 0;
    color: #ddd;
    font-size: 13px;
  }

  /* ── Welcome placeholder ── */
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 14px;
    text-align: center;
    padding: 80px 20px;
  }

  .welcome-icon { font-size: 52px; opacity: 0.25; }

  .welcome-text {
    font-size: 14px;
    color: #ccc;
    font-weight: 300;
    line-height: 1.75;
    max-width: 280px;
  }

  /* ── Result card ── */
  .result-card {
    background: #fff;
    border: 1px solid #f0e6e9;
    border-radius: 20px;
    padding: 36px 40px;
    box-shadow: 0 2px 8px rgba(194,83,106,0.05), 0 8px 32px rgba(0,0,0,0.04);
  }

  .result-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid #f5eaec;
    margin-bottom: 28px;
  }

  .result-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #111;
    letter-spacing: -0.01em;
  }

  .result-subtitle {
    font-size: 12px;
    color: #bbb;
    margin-top: 4px;
    font-weight: 300;
  }

  .severity-badge {
    font-size: 11px;
    padding: 5px 14px;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .sev-low    { background: #f0faf4; color: #2e8b57; border: 1px solid #c8ecd6; }
  .sev-high   { background: #fff2f4; color: #c2536a; border: 1px solid #fcd4da; }
  .sev-medium { background: #fff8ec; color: #c07a2a; border: 1px solid #fce6c0; }

  .section-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #c2a0aa;
    font-weight: 600;
    margin-bottom: 14px;
  }

  .conditions-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  .condition-tag {
    font-size: 13px;
    padding: 6px 16px;
    border: 1px solid #f0e6e9;
    border-radius: 20px;
    color: #666;
    background: #fdf8f9;
    font-weight: 500;
  }

  .section-sep {
    border: none;
    border-top: 1px solid #f5eaec;
    margin: 24px 0;
  }

  .rec-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
  }

  .rec-item {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: #555;
    line-height: 1.65;
  }

  .rec-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #e8879a;
    flex-shrink: 0;
    margin-top: 9px;
  }

  .doctor-text {
    font-size: 14px;
    color: #555;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .disclaimer {
    font-size: 12px;
    color: #aaa;
    background: #fdf8f9;
    border-left: 2px solid #f0c4cc;
    padding: 12px 16px;
    border-radius: 0 10px 10px 0;
    line-height: 1.7;
  }

  /* ── Error ── */
  .error {
    background: #fff2f4;
    border: 1px solid #fcd4da;
    color: #c2536a;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 13.5px;
  }
`;

function getSevClass(s = "") {
  const l = s.toLowerCase();
  if (l.includes("low")) return "sev-low";
  if (l.includes("high")) return "sev-high";
  return "sev-medium";
}

function getDotClass(s = "") {
  const l = s.toLowerCase();
  if (l.includes("low")) return "h-dot-low";
  if (l.includes("high")) return "h-dot-high";
  return "h-dot-medium";
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default function App() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${BACKEND}/history`);
      setHistory(await res.json());
    } catch {}
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${BACKEND}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      const json = await res.json();
      setResult(json.result);
      setSymptoms("");
      fetchHistory();
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* Top bar */}
        <div className="topbar">
          <span className="topbar-logo">Healthcare <em>Symptor</em></span>
          <span className="topbar-badge">
            <span className="badge-dot" />
            AI-Assisted · Not Medical Advice
          </span>
        </div>

        <div className="layout">

          {/* ── Left Sidebar ── */}
          <div className="sidebar">

            <div className="header">
              <h1 className="title">Symptom <em>Analysis</em></h1>
              <div className="divider" />
              <p className="subtitle">
                Describe what you're experiencing and get an AI-powered preliminary assessment instantly.
              </p>
            </div>

            {/* Input */}
            <div className="card">
              <p className="card-label">Describe your symptoms</p>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value.slice(0, 800))}
                placeholder="e.g. headache, mild fever since yesterday, fatigue..."
              />
              <div className="char-count">{symptoms.length} / 800</div>
              <button
                className="btn"
                onClick={handleAnalyze}
                disabled={loading || !symptoms.trim()}
              >
                {loading
                  ? <><span className="spinner" /> Analyzing…</>
                  : <>Analyze Symptoms</>
                }
              </button>
            </div>

            {/* History */}
            <div className="card">
              <div className="history-header">
                <span className="history-title">Previous Assessments</span>
                <span className="history-count">{history.length}</span>
              </div>
              <div className="history-list">
                {history.length === 0
                  ? <div className="empty-state">No assessments yet</div>
                  : history.map((item) => (
                    <div
                      key={item._id}
                      className="history-item"
                      onClick={() => setResult(item.result)}
                    >
                      <span className={`h-dot ${getDotClass(item.result?.severity)}`} />
                      <div style={{ flex: 1 }}>
                        <p className="h-symptoms">
                          {item.symptoms.slice(0, 70)}{item.symptoms.length > 70 ? "…" : ""}
                        </p>
                        <p className="h-sev">{item.result?.severity}</p>
                      </div>
                      <span className="h-time">{timeAgo(item.createdAt)}</span>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>

          {/* ── Right Main Panel ── */}
          <div className="main">

            {error && <div className="error">{error}</div>}

            {!result && !error && (
              <div className="welcome">
                <div className="welcome-icon">🩺</div>
                <p className="welcome-text">
                  Enter your symptoms on the left and click <strong>Analyze Symptoms</strong> to see your AI-powered health assessment here.
                </p>
              </div>
            )}

            {result && (
              <div className="result-card">
                <div className="result-header">
                  <div>
                    <h2 className="result-title">Assessment</h2>
                    <p className="result-subtitle">AI-generated · always consult a healthcare professional</p>
                  </div>
                  <span className={`severity-badge ${getSevClass(result.severity)}`}>
                    {result.severity}
                  </span>
                </div>

                <p className="section-label">Possible Conditions</p>
                <div className="conditions-wrap">
                  {result.conditions?.map((c, i) => (
                    <span key={i} className="condition-tag">{c}</span>
                  ))}
                </div>

                <hr className="section-sep" />

                <p className="section-label">Recommendations</p>
                <ul className="rec-list">
                  {result.recommendations?.map((r, i) => (
                    <li key={i} className="rec-item">
                      <span className="rec-dot" />
                      {r}
                    </li>
                  ))}
                </ul>

                <hr className="section-sep" />

                <p className="section-label">When to See a Doctor</p>
                <p className="doctor-text">{result.doctorAdvice}</p>

                <div className="disclaimer">{result.disclaimer}</div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
