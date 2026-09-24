import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, recommendation, answers } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || Buffer.from("cmVfR29MQnJ5UGVfQTI4NXFRV0s1OGpUNVpqUHlESldwN3F5", "base64").toString("utf-8");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #04120a; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #00ff80;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #00ff80; font-size: 24px; letter-spacing: 2px; margin: 0;">GEEKSOFT // THE MIRROR</h1>
          <p style="color: #888888; font-size: 13px; text-transform: uppercase;">Reporte Personalizado de Madurez Operativa</p>
        </div>

        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border-left: 4px solid #00ff80; margin-bottom: 25px;">
          <span style="color: #00ff80; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">SOLUCIÓN RECOMENDADA</span>
          <h2 style="color: #ffffff; margin: 8px 0 4px 0; font-size: 20px;">${recommendation?.tech || "Automatización e Inteligencia de Datos"}</h2>
          <p style="color: #cccccc; margin: 0; font-size: 14px;">${recommendation?.tagline || "Optimización de flujos y procesos clave"}</p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #dddddd;">
          Hola, hemos recibido y analizado las respuestas de tu autodiagnóstico. Tu perfil operativo indica que el mayor apalancamiento de crecimiento para tu empresa se logrará mediante la implementación de soluciones de alta velocidad.
        </p>

        <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
          <a href="https://wa.me/51991090016?text=Hola%20Geeksoft,%20recib%C3%AD%20mi%20diagn%C3%B3stico%20del%20Espejo%20para%20${encodeURIComponent(email)}" style="background-color: #00ff80; color: #001a08; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 6px; display: inline-block; font-size: 14px;">
            Coordinar Sesión Estratégica en WhatsApp →
          </a>
        </div>

        <p style="color: #666666; font-size: 11px; text-align: center; margin-top: 25px;">
          Geeksoft Engineering & Architectural Solutions • geeksoft.tech
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Geeksoft Mirror <onboarding@resend.dev>",
        to: [email, "contacto@geeksoft.pe"],
        subject: `[Diagnóstico Geeksoft] Solución Recomendada: ${recommendation?.tech || "Autodiagnóstico Operativo"}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error enviando correo" }, { status: 500 });
  }
}
