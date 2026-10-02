import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, recommendation, answers } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || Buffer.from("cmVfR29MQnJ5UGVfQTI4NXFRV0s1OGpUNVpqUHlESldwN3F5", "base64").toString("utf-8");
    const tech = recommendation?.tech || "Automatización e Inteligencia de Datos";
    const tagline = recommendation?.tagline || "Optimización de flujos y procesos clave";

    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diagnóstico Operativo - The Mirror GeekSoft</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#020704; font-family:'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#ffffff;">

  <!-- CONTENEDOR PRINCIPAL CON LA CARA DE V EN TODO EL FONDO -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%; min-height:100vh; background-color:#020704; background-image:url('https://geeksoft.tech/images/v_head.jpg'); background-position:center top; background-repeat:no-repeat; background-size:cover; padding:40px 15px;">
    <tr>
      <td align="center" valign="middle">

        <!-- TARJETA CENTRAL 100% TRANSPARENTE (ESTILO ACADEMY 2FA) -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:540px; background:transparent; border:1px solid rgba(0, 255, 128, 0.45); border-radius:24px; overflow:hidden; box-shadow:0 30px 60px rgba(0, 0, 0, 0.85);">
          
          <!-- LÍNEA SUPERIOR VERDE ESMERALDA MATRIX -->
          <tr>
            <td style="background:linear-gradient(90deg, #052e16 0%, #00ff80 50%, #052e16 100%); height:4px;"></td>
          </tr>

          <!-- CABECERA: LOGO OFICIAL GEEKSOFT -->
          <tr>
            <td align="center" style="padding:34px 30px 12px 30px;">
              <img src="https://geeksoft.tech/images/Logo.Geeksoft.png" 
                   alt="GeekSoft Logo" 
                   width="210" 
                   style="display:block; margin:0 auto; max-width:210px; width:100%; height:auto; filter:drop-shadow(0 4px 15px rgba(0,255,128,0.6));" />
              
              <div style="font-family:'Outfit', 'Montserrat', sans-serif; margin-top:12px; color:#00ff80; font-size:11px; font-weight:800; letter-spacing:4px; text-transform:uppercase; text-shadow:0 2px 14px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);">
                THE MIRROR &bull; AUTO-DIAGNÓSTICO
              </div>
            </td>
          </tr>

          <!-- BADGE DE ESTADO -->
          <tr>
            <td align="center" style="padding-bottom:14px;">
              <span style="display:inline-block; background-color:rgba(0, 0, 0, 0.45); border:1px solid rgba(0, 255, 128, 0.8); color:#00ff80; font-size:9.5px; font-weight:800; letter-spacing:1.5px; padding:6px 16px; border-radius:20px; text-transform:uppercase; text-shadow:0 2px 8px rgba(0,0,0,1);">
                ✓ ANÁLISIS DE MADUREZ COMPLETADO
              </span>
            </td>
          </tr>

          <!-- CUERPO PRINCIPAL -->
          <tr>
            <td style="padding:0 36px 24px 36px; text-align:left;">
              <h2 style="margin:0 0 10px 0; font-size:19px; font-weight:900; color:#ffffff; text-align:center; letter-spacing:-0.2px; text-shadow:0 2px 14px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);">
                Reporte de Arquitectura Recomendada
              </h2>
              
              <p style="margin:0 0 16px 0; font-size:13px; color:#ffffff; line-height:1.6; text-align:center; text-shadow:0 2px 10px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.95);">
                Hemos procesado las respuestas de tu autodiagnóstico operativo en <strong style="color:#00ff80;">The Mirror</strong> para <strong style="color:#00ff80;">${email}</strong>:
              </p>

              <!-- RECUADRO DE SOLUCIÓN RECOMENDADA (ESTILO ACADEMY CON BORDE VERDE ESMERALDA) -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:16px 0; background:transparent; border:2px dashed rgba(0, 255, 128, 0.95); border-radius:16px; box-shadow:0 0 35px rgba(0, 255, 128, 0.45);">
                <tr>
                  <td style="padding:22px 18px; text-align:center;">
                    <div style="font-size:10px; font-weight:800; letter-spacing:3px; color:#00ff80; text-transform:uppercase; margin-bottom:8px; text-shadow:0 2px 8px rgba(0,0,0,1);">
                      SOLUCIÓN RECOMENDADA
                    </div>
                    <div style="font-size:20px; font-weight:900; color:#ffffff; margin-bottom:8px; line-height:1.3; text-shadow:0 0 30px rgba(0,255,128,0.8), 0 2px 10px rgba(0,0,0,1);">
                      ${tech}
                    </div>
                    <div style="font-size:12.5px; color:#e2e8f0; line-height:1.5; text-shadow:0 2px 8px rgba(0,0,0,1);">
                      ${tagline}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- AVISO DE IMPACTO -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:transparent; border-left:3px solid #00ff80; border-radius:4px; margin:16px 0;">
                <tr>
                  <td style="padding:10px 14px; font-size:11.5px; color:#e0f2fe; line-height:1.5; text-shadow:0 2px 8px rgba(0,0,0,1);">
                    💡 <strong>Diagnóstico de Eficiencia:</strong> La arquitectura recomendada optimiza la capacidad operativa reduciendo hasta un <strong>80% de tiempos muertos</strong> en flujos repetitivos y lectura documental desasistida.
                  </td>
                </tr>
              </table>

              <!-- BOTÓN CTA DE WHATSAPP DIRECTO -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:22px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/51991090016?text=Hola%20Geeksoft,%20recib%C3%AD%20mi%20diagn%C3%B3stico%20del%20Espejo%20para%20${encodeURIComponent(email)}" 
                       target="_blank" 
                       style="display:inline-block; background:linear-gradient(135deg, #00ff80 0%, #00cc66 100%); color:#021509; text-decoration:none; font-family:'Montserrat', sans-serif; font-size:13px; font-weight:900; letter-spacing:0.5px; padding:14px 28px; border-radius:10px; box-shadow:0 4px 20px rgba(0, 255, 128, 0.4); text-transform:uppercase;">
                      📲 Coordinar Sesión Estratégica
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- PIE DE PÁGINA TRANSPARENTE -->
          <tr>
            <td style="background:transparent; border-top:1px solid rgba(255, 255, 255, 0.25); padding:16px 25px; text-align:center;">
              <p style="margin:0 0 4px 0; font-size:10.5px; color:#ffffff; font-weight:700; letter-spacing:0.8px; text-shadow:0 2px 8px rgba(0,0,0,1);">
                GEEKSOFT TECH &bull; THE MIRROR
              </p>
              <p style="margin:0; font-size:9.5px; color:#cbd5e1; text-shadow:0 2px 8px rgba(0,0,0,1);">
                Soluciones de Software de Alto Desempeño &bull; <a href="https://geeksoft.tech" style="color:#00ff80; text-decoration:none;">geeksoft.tech</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;

    const recipients = Array.from(new Set([email, "rich@kaizencapital.pe"]));

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) GEEKSOFT-Mirror/2.0",
      },
      body: JSON.stringify({
        from: "Geeksoft Mirror <mirror@geeksoft.tech>",
        to: recipients,
        subject: `⚡ [Diagnóstico The Mirror] Solución Recomendada: ${tech}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error enviando correo" }, { status: 500 });
  }
}
