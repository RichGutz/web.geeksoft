"use client";

import { useState } from "react";

interface QuizOption {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

interface Step {
  stepNumber: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

const QUIZ_STEPS: Step[] = [
  {
    stepNumber: 1,
    title: "¿Qué área de tu empresa te gustaría potenciar primero?",
    subtitle: "Identifiquemos el epicentro donde un cambio generará mayor impacto.",
    options: [
      {
        id: "ops",
        icon: "📦",
        label: "Operaciones & Logística",
        desc: "Coordinación de despachos, inventarios y seguimiento de flujos.",
      },
      {
        id: "fin",
        icon: "💼",
        label: "Finanzas & Facturación",
        desc: "Conciliación, cobranzas, procesamiento de facturas y reportes contables.",
      },
      {
        id: "sales",
        icon: "🎯",
        label: "Ventas & Clientes",
        desc: "Calificación de leads, cotizaciones rápidas y atención omnicanal 24/7.",
      },
      {
        id: "docs",
        icon: "📄",
        label: "Documentos & Datos",
        desc: "Extracción de datos desde PDFs, contratos físicos y reportes dispersos.",
      },
      {
        id: "market",
        icon: "🌐",
        label: "Inteligencia de Mercado",
        desc: "Monitoreo de precios de la competencia y extracción de datos web.",
      },
    ],
  },
  {
    stepNumber: 2,
    title: "¿Cuál es el principal reto u obstáculo que enfrentas hoy?",
    subtitle: "El verdadero cuello de botella que frena la velocidad de tu equipo.",
    options: [
      {
        id: "manual",
        icon: "⏳",
        label: "Horas quemadas en tareas repetitivas",
        desc: "El equipo pasa el día copiando, pegando y formateando datos a mano.",
      },
      {
        id: "silos",
        icon: "🧩",
        label: "Información fragmentada y desordenada",
        desc: "Archivos en múltiples Excels, correos y chats sin una fuente central.",
      },
      {
        id: "slow",
        icon: "📈",
        label: "Decisiones lentas por falta de visibilidad",
        desc: "Obtener un reporte consolidado toma días en lugar de segundos.",
      },
      {
        id: "scale",
        icon: "👥",
        label: "Imposible crecer sin contratar más gente",
        desc: "Cada nuevo cliente o pedido satura la capacidad operativa actual.",
      },
    ],
  },
  {
    stepNumber: 3,
    title: "¿Cómo describirías tu ecosistema tecnológico actual?",
    subtitle: "Entender el punto de partida permite trazar la ruta más limpia.",
    options: [
      {
        id: "excel",
        icon: "📊",
        label: "Excels, WhatsApp y Correo",
        desc: "Todo funciona sobre hojas de cálculo y comunicaciones descentralizadas.",
      },
      {
        id: "erp_rigid",
        icon: "🏢",
        label: "ERP o CRM tradicional rígido",
        desc: "Tenemos un sistema pero es complejo de adaptar y no cubre nuestros flujos clave.",
      },
      {
        id: "multi_apps",
        icon: "⚙️",
        label: "Múltiples apps en la nube sin conectar",
        desc: "Usamos varias herramientas SaaS pero no se comunican entre sí.",
      },
      {
        id: "ai_testing",
        icon: "🤖",
        label: "Experimentando con IA básica",
        desc: "El equipo usa ChatGPT o herramientas públicas, pero sin integración a la empresa.",
      },
    ],
  },
  {
    stepNumber: 4,
    title: "¿Cuál sería el resultado más valioso para tu organización?",
    subtitle: "La meta concreta que definirá el éxito de esta evolución.",
    options: [
      {
        id: "time_saved",
        icon: "⚡",
        label: "Ahorrar 15+ horas semanales por persona",
        desc: "Liberar al equipo del trabajo mecánico para tareas de alto valor.",
      },
      {
        id: "zero_errors",
        icon: "🛡️",
        label: "Cero errores y trazabilidad absoluta",
        desc: "Auditoría en tiempo real y eliminación de fallos humanos en datos.",
      },
      {
        id: "fast_response",
        icon: "🚀",
        label: "Atención y cotizaciones en segundos",
        desc: "Ganar velocidad frente a la competencia y cerrar negocios al instante.",
      },
      {
        id: "live_control",
        icon: "📊",
        label: "Panel de control gerencial en tiempo real",
        desc: "Ver la salud del negocio y KPIs clave desde cualquier dispositivo.",
      },
    ],
  },
];

export default function MirrorQuiz() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = QUIZ_STEPS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_STEPS.length - 1;
  const isLeadCapture = currentStepIndex === QUIZ_STEPS.length;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentStepIndex]: optionId }));
    if (currentStepIndex < QUIZ_STEPS.length) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    // Simulación elegante de procesamiento y envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 900);
  };

  // Veredicto personalizado según respuestas
  const getRecommendation = () => {
    const area = answers[0] || "ops";
    const pain = answers[1] || "manual";

    if (area === "docs" || pain === "manual") {
      return {
        tech: "Agente de IA & Extracción Documental",
        tagline: "Automatización de lectura de PDFs y flujos desasistidos",
        radarPillar: "ai",
        color: "var(--color-ai)",
      };
    }
    if (area === "market") {
      return {
        tech: "Web Scrapers Inteligentes",
        tagline: "Extracción y monitoreo de precios en tiempo real",
        radarPillar: "scrappers",
        color: "var(--color-scrappers)",
      };
    }
    if (pain === "slow" || answers[3] === "live_control") {
      return {
        tech: "Dashboards & Business Intelligence",
        tagline: "Control gerencial con datos consolidados en vivo",
        radarPillar: "dashboards",
        color: "var(--color-dashboards)",
      };
    }
    return {
      tech: "SaaS & ERP a Medida",
      tagline: "Plataforma centralizada diseñada exclusivamente para tu flujo",
      radarPillar: "saas",
      color: "var(--color-saas)",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="mirror-quiz-container">
      {/* Barra de progreso */}
      {!isCompleted && (
        <div className="quiz-progress-bar-wrapper">
          <div className="quiz-progress-text">
            <span>PASO {Math.min(currentStepIndex + 1, QUIZ_STEPS.length + 1)} DE {QUIZ_STEPS.length + 1}</span>
            <span>{Math.round(((currentStepIndex + 1) / (QUIZ_STEPS.length + 1)) * 100)}% COMPLETADO</span>
          </div>
          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentStepIndex + 1) / (QUIZ_STEPS.length + 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Pantallas de Preguntas */}
      {!isLeadCapture && !isCompleted && currentStep && (
        <div className="quiz-step-card animate-fade-in">
          <div className="quiz-header">
            <h3 className="quiz-question-title">{currentStep.title}</h3>
            <p className="quiz-question-subtitle">{currentStep.subtitle}</p>
          </div>

          <div className="quiz-options-grid">
            {currentStep.options.map((option) => {
              const isSelected = answers[currentStepIndex] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option.id)}
                  className={`quiz-option-btn ${isSelected ? "selected" : ""}`}
                >
                  <span className="quiz-option-icon">{option.icon}</span>
                  <div className="quiz-option-text">
                    <span className="quiz-option-label">{option.label}</span>
                    <span className="quiz-option-desc">{option.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {currentStepIndex > 0 && (
            <div className="quiz-footer-actions">
              <button onClick={handleBack} className="quiz-back-btn">
                ← Anterior
              </button>
            </div>
          )}
        </div>
      )}

      {/* Paso Final: Captura de Correo */}
      {isLeadCapture && !isCompleted && (
        <div className="quiz-step-card animate-fade-in">
          <div className="quiz-header">
            <div className="quiz-badge-ready">● ANÁLISIS PRELIMINAR COMPLETADO</div>
            <h3 className="quiz-question-title">Tu diagnóstico de madurez operativa está listo</h3>
            <p className="quiz-question-subtitle">
              Hemos mapeado tu arquitectura ideal: <strong style={{ color: "#00ff80" }}>{recommendation.tech}</strong>.
              Ingresa tu correo para enviarte el reporte detallado con estimación de horas y arquitectura propuesta.
            </p>
          </div>

          <form onSubmit={handleSubmitEmail} className="quiz-email-form">
            <div className="quiz-input-group">
              <input
                type="email"
                placeholder="tu.nombre@tuempresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="quiz-email-input"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="quiz-submit-btn"
              >
                {isSubmitting ? "Generando Reporte..." : "Enviar mi Diagnóstico →"}
              </button>
            </div>
            <p className="quiz-privacy-note">
              🔒 Cero spam. Tu información se utiliza exclusivamente para elaborar la recomendación técnica de Geeksoft.
            </p>
          </form>

          <div className="quiz-footer-actions">
            <button onClick={handleBack} className="quiz-back-btn">
              ← Revisar respuestas
            </button>
          </div>
        </div>
      )}

      {/* Pantalla de Éxito / Confirmación */}
      {isCompleted && (
        <div className="quiz-step-card animate-fade-in quiz-success-card">
          <div className="quiz-success-icon">✨</div>
          <div className="quiz-badge-ready" style={{ color: "#00ff80", borderColor: "rgba(0, 255, 128, 0.4)" }}>
            ● DIAGNÓSTICO DESPACHADO
          </div>
          <h3 className="quiz-question-title" style={{ fontSize: "1.6rem" }}>
            El informe ha sido enviado a <span style={{ color: "#00ff80" }}>{email}</span>
          </h3>

          <div className="quiz-verdict-box" style={{ borderColor: recommendation.color }}>
            <div className="quiz-verdict-pill">SOLUCIÓN RECOMENDADA</div>
            <div className="quiz-verdict-title">{recommendation.tech}</div>
            <div className="quiz-verdict-desc">{recommendation.tagline}</div>
          </div>

          <p className="quiz-question-subtitle" style={{ marginTop: "1.5rem" }}>
            ¿Quieres acelerar la implementación o revisar los requerimientos con un especialista de Geeksoft?
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <a
              href={`https://wa.me/51991090016?text=${encodeURIComponent(`Hola Geeksoft, completé el autodiagnóstico del Espejo con el correo ${email}. Mi solución recomendada es ${recommendation.tech}. Quiero coordinar una sesión.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="quiz-whatsapp-cta"
            >
              Hablar con Geeksoft por WhatsApp ⚡
            </a>
            <a href="/" className="quiz-home-cta">
              Volver al Radar Principal
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
