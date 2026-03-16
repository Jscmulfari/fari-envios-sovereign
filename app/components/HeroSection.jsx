"use client";
import { useState } from "react";
import PhoneMockup from "./PhoneMockup";

const DESTINATIONS = [
  { id: "ve", flag: "🇻🇪", name: "Venezuela", currency: "Bs.D", rate: 56.4,  method: "Pago Móvil" },
  { id: "co", flag: "🇨🇴", name: "Colombia",  currency: "COP",  rate: 4180,  method: "Nequi · Bancolombia" },
  { id: "eu", flag: "🇪🇺", name: "Europa",    currency: "EUR",  rate: 0.92,  method: "SEPA · Bizum" },
];

const WA_MSGS = [
  { from: "user", text: "Quiero enviar **$100** a Venezuela 🇻🇪", time: "10:41" },
  { from: "bot",  text: "Tasa hoy: **56.4 Bs.D** / USD.", time: "10:41" },
  { from: "bot",  type: "receipt", amount: "$100 USD", receives: "5,640 Bs.D", dest: "Venezuela 🇻🇪", method: "Pago Móvil", time: "10:41" },
  { from: "bot",  text: "Sin comisión 🎉 ¿Confirmamos?", time: "10:42" },
  { from: "user", text: "Sí, confirmar.", time: "10:42" },
  { from: "bot",  text: "✅ ¡Listo! Llega en **< 60 min**. 🚀", time: "10:42" },
];

const fmt = (n) => Number(n).toLocaleString("es-VE", { maximumFractionDigits: 0 });

const WaIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.56 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.82 11.82 0 0 0 5.75 1.47h.01c6.54 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.46-8.45ZM12.1 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.25c0-5.45 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.86-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.17-.24-.57-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.2 2.06 3.14 4.98 4.4.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z" />
  </svg>
);

const HeroSection = () => {
  const [amount, setAmount] = useState("100");
  const [destId, setDestId] = useState("ve");

  const dest   = DESTINATIONS.find((d) => d.id === destId);
  const numAmt = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const result = numAmt * dest.rate;

  return (
    <section id="inicio" className="ref-hero">
      <div className="hero-3d-elements" aria-hidden="true">
        <div className="hero-3d-shape hero-3d-shape--1" />
        <div className="hero-3d-shape hero-3d-shape--2" />
        <div className="hero-3d-shape hero-3d-shape--3" />
        <div className="hero-3d-line hero-3d-line--1" />
        <div className="hero-3d-line hero-3d-line--2" />
      </div>

      <div className="ref-hero-content">
        <div className="hero-stage">

          {/* ── FILA PRINCIPAL: título + calculadora ── */}
          <div className="hero-stage-row">

            <div className="hero-stage-left">
              <div className="hero-stage-head">
                <h1 className="ref-hero-title">
                  Envía dinero <span>desde WhatsApp.</span>
                </h1>
              </div>
              <p className="hero-stage-desc">
                Envía a 3 destinos: Venezuela, Colombia y Europa. Sin apps, sin filas. Solo escríbenos por WhatsApp y listo.
              </p>
              <ul className="hero-stage-perks" aria-label="Ventajas">
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">⚡</span>
                  Entrega en menos de <strong>60 minutos</strong>
                </li>
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">🎁</span>
                  <strong>$0 comisión</strong> en tu primer envío
                </li>
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">🛡️</span>
                  Transacciones <strong>100% seguras</strong>
                </li>
              </ul>


            </div>
            {/* ── / izquierda ── */}

            {/* ── DERECHA: calculadora ── */}
            <div className="hero-stage-right">

              <div className="hcalc">

                <div className="hcalc-tabs" role="group" aria-label="Destino">
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`hcalc-tab${destId === d.id ? " hcalc-tab--on" : ""}`}
                      onClick={() => setDestId(d.id)}
                      aria-pressed={destId === d.id}
                    >
                      <span className="hcalc-tab-flag">{d.flag}</span>
                      <span className="hcalc-tab-name">{d.name}</span>
                    </button>
                  ))}
                </div>

                <div className="hcalc-body">
                  <div className="hcalc-row">
                    <div className="hcalc-field">
                      <span className="hcalc-label">Tú envías</span>
                      <div className="hcalc-input-box">
                        <span className="hcalc-sym">$</span>
                        <input
                          className="hcalc-input"
                          type="text"
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                          placeholder="100"
                          aria-label="Monto en USD"
                        />
                        <span className="hcalc-unit">USD</span>
                      </div>
                    </div>

                    <div className="hcalc-arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                      <span className="hcalc-rate">1 USD = {dest.rate} {dest.currency}</span>
                    </div>

                    <div className="hcalc-field hcalc-field--out">
                      <span className="hcalc-label">Tu familia recibe</span>
                      <div className="hcalc-output-box">
                        <span className="hcalc-result">{numAmt > 0 ? fmt(result) : "—"}</span>
                        <span className="hcalc-result-cur">{dest.currency}</span>
                      </div>
                    </div>
                  </div>

                  <span className="hcalc-method">{dest.flag} {dest.name} · {dest.method}</span>
                </div>

                <div className="hcalc-footer">
                  <a
                    href="https://wa.me/726567607"
                    target="_blank"
                    rel="noreferrer"
                    className="hcalc-cta"
                    aria-label="Enviar por WhatsApp"
                  >
                    <WaIcon size={17} />
                    Enviar por WhatsApp
                  </a>
                  <p className="hcalc-disclaimer">✓ Sin comisión en tu primer envío</p>
                </div>

              </div>

            </div>
            {/* ── / derecha ── */}

          </div>
          {/* ── / fila principal ── */}

          <div className="hero-stage-phone-block">
            <PhoneMockup messages={WA_MSGS} />
          </div>

          {/* ── STATS ──────────────────────── */}
          <div className="hero-stage-stats" aria-label="Indicadores">
            <div className="hero-split-stat"><strong>&lt; 60 min</strong><span>Entrega</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>$0</strong><span>1er envío</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>24 / 7</strong><span>Soporte</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>3 países</strong><span>Cobertura</span></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
