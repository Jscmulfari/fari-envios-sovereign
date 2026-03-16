const Bold = ({ children }) => <strong>{children}</strong>;

const parseText = (t) =>
  t.split(/(\*\*[^*]+\*\*)/g).map((c, i) =>
    c.startsWith("**") ? <Bold key={i}>{c.slice(2, -2)}</Bold> : c
  );

export default function PhoneMockup({ messages }) {
  return (
    <div className="hero-phone-stage" aria-hidden="true">
      <div className="phone-wrap">
        <div className="phone-frame">
          <div className="phone-statusbar">
            <span className="phone-statusbar-time">10:42</span>
            <div className="phone-statusbar-icons">
              <svg width="12" height="9" viewBox="0 0 12 9" fill="currentColor">
                <rect x="0" y="5" width="2" height="4" rx="0.5" opacity="0.4"/>
                <rect x="2.5" y="3.5" width="2" height="5.5" rx="0.5" opacity="0.6"/>
                <rect x="5" y="1.5" width="2" height="7.5" rx="0.5" opacity="0.8"/>
                <rect x="7.5" y="0" width="2" height="9" rx="0.5"/>
              </svg>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="currentColor">
                <rect x="0" y="1" width="13" height="6" rx="1.5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9"/>
                <rect x="13.5" y="3" width="1.5" height="2" rx="0.5" opacity="0.6"/>
                <rect x="1" y="2" width="9" height="4" rx="0.8"/>
              </svg>
            </div>
          </div>

          <div className="phone-notch" />

          <div className="phone-wa-header">
            <div className="phone-wa-back">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1L2 8l6 7"/>
              </svg>
            </div>
            <div className="phone-wa-avatar">EM</div>
            <div className="phone-wa-info">
              <strong>Envios Manda</strong>
              <span className="phone-wa-online">
                <span className="phone-wa-online-dot" />
                En línea
              </span>
            </div>
            <div className="phone-wa-actions">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </div>
          </div>

          <div className="phone-chat">
            <div className="phone-chat-date">Hoy · 10:41</div>
            {messages.map((msg, i) =>
              msg.type === "receipt" ? (
                <div key={i} className="phone-msg phone-msg--bot phone-msg--receipt-wrap" style={{ "--i": i }}>
                  <div className="phone-receipt">
                    <p className="phone-receipt-title">💸 Resumen del envío</p>
                    <div className="phone-receipt-row"><span>Envías</span><strong>{msg.amount}</strong></div>
                    <div className="phone-receipt-row phone-receipt-row--highlight"><span>Reciben</span><strong>{msg.receives}</strong></div>
                    <div className="phone-receipt-row"><span>Destino</span><span>{msg.dest}</span></div>
                    <div className="phone-receipt-row phone-receipt-row--free"><span>Comisión</span><strong>$0 gratis</strong></div>
                  </div>
                  <span className="phone-msg-meta">{msg.time}</span>
                </div>
              ) : (
                <div key={i} className={`phone-msg phone-msg--${msg.from}`} style={{ "--i": i }}>
                  <span className="phone-msg-text">{parseText(msg.text)}</span>
                  <span className="phone-msg-meta">
                    {msg.time}
                    {msg.from === "user" && (
                      <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                        <path d="M1 5.5L5 9.5L15 1.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 5.5L9 9.5L15 1.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </div>
              )
            )}
            <div className="phone-typing"><span /><span /><span /></div>
          </div>

          <div className="phone-input-bar">
            <div className="phone-input-emoji">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <div className="phone-input-field">Escribe un mensaje</div>
            <div className="phone-input-send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </div>
          </div>

          <div className="phone-home-bar" />
        </div>
      </div>
    </div>
  );
}
