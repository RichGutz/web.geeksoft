"use client";

import Radar from "@/components/Radar";
import VibeLottie from "@/components/VibeLottie";
import MilkyWay from "@/components/MilkyWay";


export default function Home() {
  const scrollToInframundo = () => {
    const section = document.getElementById("inframundo");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="main-scroll-container">
      {/* SECCIÓN 1: EL RADAR (Status Quo / Cyberpunk) */}
      <section className="radar-section">
        <MilkyWay />
        <Radar />
        
        {/* The Matrix Pills */}
        <div className="matrix-pills-container">
          <button className="matrix-pill red-pill" onClick={scrollToInframundo}>
            <span className="pill-text">
              <span>RED</span>
              <span className="pill-divider"></span>
              <span>PILL</span>
            </span>
            <div className="pill-glow"></div>
            <div className="pill-tooltip">Despertar a la realidad PRE-IA</div>
          </button>
          
          <button className="matrix-pill blue-pill" onClick={() => alert("Ignorance is bliss... (Acción pendiente)")}>
            <span className="pill-text">
              <span>BLUE</span>
              <span className="pill-divider"></span>
              <span>PILL</span>
            </span>
            <div className="pill-glow"></div>
            <div className="pill-tooltip">Seguir en la ilusión</div>
          </button>
        </div>
      </section>

      {/* SECCIÓN 2: EL INFRAMUNDO PRE-IA (El Costo del Caos) */}
      <section id="inframundo" className="chaos-section">
        <div className="chaos-header">
          <h2 className="chaos-title">El Costo del Caos</h2>
          <p className="chaos-subtitle">
            Bienvenidos al inframundo PRE-IA. Donde el tiempo muere, los datos se pierden y tus empleados sufren en silencio.
          </p>
        </div>

        <div className="villains-grid">
          {/* Villano 1: Excel Zombie */}
          <div className="villain-card">
            <div className="villain-visual lottie-placeholder">
              <VibeLottie url="/excel-zombie.json" />
            </div>
            <h3 className="villain-name">El "Excel Zombie"</h3>
            <p className="villain-copy">
              ¿Sigues usando Excel para gestionar tu empresa? No eres contador, eres un domador de celdas. Deja que nosotros lo automaticemos.
            </p>
          </div>

          {/* Villano 2: Data-Entry Ghost */}
          <div className="villain-card">
            <div className="villain-visual lottie-placeholder">
              <VibeLottie url="/lottie-surprise.json" />
            </div>
            <h3 className="villain-name">El "Data-Entry Ghost"</h3>
            <p className="villain-copy">
              ¿Tus empleados pasan horas copiando PDFs? Eso no es trabajo, es tortura de datos. Deja que nuestras APIs lo hagan en milisegundos.
            </p>
          </div>

          {/* Villano 3: Email Hole */}
          <div className="villain-card">
            <div className="villain-visual lottie-placeholder">
              <VibeLottie url="/lottie-surprise.json" />
            </div>
            <h3 className="villain-name">El "Email Hole"</h3>
            <p className="villain-copy">
              Si la mitad de tu día es responder lo mismo, no necesitas más tiempo, necesitas un bot.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
