"use client";

import { useState, useRef, useEffect } from "react";

const OPTIONS = [
  {
    id: "venezuela",
    flagSrc: "https://flagcdn.com/64x48/ve.png",
    title: "Venezuela",
    metodos: ["Pago Móvil", "Transferencia bancaria", "Efectivo"],
    description:
      "Liquidación inmediata vía Pago Móvil y transferencias directas a todos los bancos.",
  },
  {
    id: "colombia",
    flagSrc: "https://flagcdn.com/64x48/co.png",
    title: "Colombia",
    metodos: ["Nequi", "Daviplata", "Bancolombia", "Efectivo"],
    description:
      "Conexión directa con Bancolombia, Nequi y Daviplata. Tasa real garantizada.",
  },
  {
    id: "europa",
    flagSrc: "https://flagcdn.com/64x48/eu.png",
    title: "Europa",
    metodos: ["SEPA", "Transferencia bancaria"],
    description:
      "Transferencias SEPA a España, Portugal y principales países de la Unión Europea.",
  },
];

const ROLE_COPY = {
  envia: {
    eyebrow: "Tú envías desde USD",
    title: "Selecciona a dónde vas a enviar",
    placeholder: "Elegir destino de entrega",
    methodLabel: "Cómo recibe tu familiar",
    amountLabel: "Monto que deseas enviar",
  },
  recibe: {
    eyebrow: "Tu familiar recibe",
    title: "Confirma dónde recibe el dinero",
    placeholder: "Elegir destino de recepción",
    methodLabel: "Método de entrega disponible",
    amountLabel: "Cotización final por WhatsApp",
  },
};

const CoverageCard = ({
  selected,
  onSelect,
  metodo,
  onMetodoChange,
  cantidad,
  onCantidadChange,
  rol = "envia",
  excludeId = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const option = OPTIONS.find((o) => o.id === selected);
  const metodos = option?.metodos ?? [];
  const currentMetodo = metodo && metodos.includes(metodo) ? metodo : "";
  const showMetodo = !!selected;
  const showCantidad = showMetodo && !!currentMetodo;
  const availableOptions = OPTIONS.filter((opt) => opt.id !== excludeId);
  const copy = ROLE_COPY[rol];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleOptionClick = (id) => {
    onSelect(id);
    onMetodoChange("");
    setIsOpen(false);
  };

  return (
    <article
      ref={cardRef}
      className={`ref-coverage-card ref-coverage-card-${rol} ${isOpen ? "ref-coverage-card-open" : ""}`}
    >
      <div className="ref-coverage-card-top">
        <p className="ref-coverage-eyebrow">{copy.eyebrow}</p>
        <h3 className="ref-coverage-card-title">{copy.title}</h3>
      </div>

      {option ? (
        <div className="ref-coverage-content ref-coverage-steps">
          <div className="ref-coverage-step ref-coverage-step-pais">
            <span className="ref-coverage-step-num">1</span>
            <div className="ref-coverage-step-pais-inner">
              <div className="ref-route-head ref-route-head-inline">
                <h4>{option.title}</h4>
                <img
                  src={option.flagSrc}
                  alt=""
                  className="ref-flag-img"
                  width={48}
                  height={36}
                />
              </div>
              <button
                type="button"
                className="ref-coverage-change"
                onClick={() => setIsOpen(true)}
              >
                Cambiar
              </button>
            </div>
          </div>

          {showMetodo && (
            <div className="ref-coverage-step">
              <span className="ref-coverage-step-num">2</span>
              <div className="ref-coverage-field">
                <label htmlFor={`metodo-${rol}-${selected}`} className="ref-coverage-label">
                  {copy.methodLabel}
                </label>
                <select
                  id={`metodo-${rol}-${selected}`}
                  value={currentMetodo}
                  onChange={(e) => onMetodoChange(e.target.value)}
                  className="ref-coverage-select"
                  aria-label={copy.methodLabel}
                >
                  <option value="">Seleccionar método...</option>
                  {metodos.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {showCantidad && (
            <div className="ref-coverage-step">
              <span className="ref-coverage-step-num">3</span>
              <div className="ref-coverage-field ref-coverage-field-cantidad">
                <label htmlFor={rol === "envia" ? `cantidad-${selected}` : undefined} className="ref-coverage-label">
                  {copy.amountLabel}
                </label>
                {rol === "envia" ? (
                  <div className="ref-coverage-cantidad-wrap">
                    <span className="ref-coverage-divisa-label">USD</span>
                    <input
                      id={`cantidad-${selected}`}
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      value={cantidad}
                      onChange={(e) => onCantidadChange(e.target.value)}
                      className="ref-coverage-input"
                      aria-label="Ingresar monto"
                    />
                  </div>
                ) : (
                  <a
                    href="https://wa.me/726567607"
                    target="_blank"
                    rel="noreferrer"
                    className="ref-coverage-whatsapp-link"
                  >
                    Consultar tasa y monto por WhatsApp →
                  </a>
                )}
              </div>
            </div>
          )}

          <p className="ref-coverage-desc">{option.description}</p>
        </div>
      ) : (
        <button
          type="button"
          className="ref-coverage-trigger"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={copy.placeholder}
        >
          <p className="ref-coverage-placeholder">
            {isOpen ? "Elige un destino" : copy.placeholder}
          </p>
        </button>
      )}

      {isOpen && (
        <ul
          className="ref-coverage-dropdown"
          role="listbox"
          aria-label="Destinos disponibles"
        >
          {availableOptions.map((opt) => (
            <li key={opt.id} role="option">
              <button
                type="button"
                className="ref-coverage-option"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOptionClick(opt.id);
                }}
              >
                <img
                  src={opt.flagSrc}
                  alt=""
                  className="ref-coverage-option-flag"
                  width={40}
                  height={30}
                />
                <span>{opt.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default function CoverageSelector() {
  const [left, setLeft] = useState("");
  const [leftMetodo, setLeftMetodo] = useState("");
  const [leftCantidad, setLeftCantidad] = useState("");
  const [right, setRight] = useState("");
  const [rightMetodo, setRightMetodo] = useState("");
  const [rightCantidad, setRightCantidad] = useState("");

  const handleSwap = () => {
    setLeft(right);
    setRight(left);
    setLeftMetodo("");
    setRightMetodo("");
    setLeftCantidad(rightCantidad);
    setRightCantidad(leftCantidad);
  };

  const handleLeftSelect = (id) => {
    setLeft(id);
    if (id === right) {
      setRight("");
      setRightMetodo("");
    }
  };

  const handleRightSelect = (id) => {
    setRight(id);
    if (id === left) {
      setLeft("");
      setLeftMetodo("");
    }
  };

  const canSwap = left || right;

  return (
    <div className="ref-coverage-flow">
      <div className="ref-coverage-flow-head">
        <p className="ref-coverage-flow-eyebrow">Todo empieza por WhatsApp</p>
        <p className="ref-coverage-flow-copy">
          Primero eliges el país y el método de entrega. La cotización final y la confirmación del envío se completan por WhatsApp.
        </p>
      </div>

      <div className="ref-coverage-compare" role="region" aria-label="Comparar cobertura y tasas">
        <CoverageCard
          selected={left}
          onSelect={handleLeftSelect}
          metodo={leftMetodo}
          onMetodoChange={setLeftMetodo}
          cantidad={leftCantidad}
          onCantidadChange={setLeftCantidad}
          rol="envia"
          excludeId={right}
        />
        <div className="ref-coverage-swap-wrap">
          <button
            type="button"
            className="ref-coverage-swap"
            onClick={handleSwap}
            disabled={!canSwap}
            aria-label="Intercambiar destinos"
            title="Intercambiar destinos"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M16 7H4M4 7l4-4M4 7l4 4" />
              <path d="M8 17h12M20 17l-4 4M20 17l-4-4" />
            </svg>
          </button>
        </div>
        <CoverageCard
          selected={right}
          onSelect={handleRightSelect}
          metodo={rightMetodo}
          onMetodoChange={setRightMetodo}
          cantidad={rightCantidad}
          onCantidadChange={setRightCantidad}
          rol="recibe"
          excludeId={left}
        />
      </div>
    </div>
  );
}
