# Reglas de Proyecto: Web Geeksoft

## Backups por Hitos (Control de Daños)
Cada vez que el usuario indique que se ha llegado a una "versión estable" o un "hito", DEBO guardar inmediatamente una copia de seguridad de los archivos críticos (scripts, componentes principales) involucrados.
- El formato del nombre del archivo debe tener un sufijo de versión, ejemplo: `Radar_V1.tsx`, `globals_V1.css`.
- Esto garantiza que siempre podamos retroceder si una experimentación futura falla, rompiendo el círculo vicioso de perder código funcional.

## Despliegue a Producción (VPS)
Para realizar un despliegue de la aplicación a producción (geeksoft.tech), se debe utilizar siempre el script automatizado:
- Comando: `python scripts/deploy_geeksoft.py` (ejecutado desde la raíz del proyecto).
- Este script se encarga de: asegurar commit/push a GitHub, sincronizar el VPS, instalar dependencias de Node.js, compilar Next.js (`npm run build`), reiniciar el servidor mediante `pm2` en el puerto interno 3050, y recargar la configuración de Nginx / Certbot.
- **Lecciones Aprendidas de la Terminal (Crash Unicode)**: Next.js imprime caracteres especiales en su salida (como el triángulo `▲`). Al capturar el `stdout` por SSH (Paramiko) y mandarlo a la consola de Windows, Python arroja un `UnicodeEncodeError` crasheando a la mitad del despliegue. El script fue corregido aplicando `.encode('ascii', 'replace')`. ¡Cualquier futuro script que orqueste servidores remotos desde Windows debe implementar este filtro para no morir por caracteres extraños!

## Restricción de Navegador
Queda estrictamente prohibido utilizar la herramienta de navegación web (`browser_subagent`) o intentar abrir y controlar el navegador del usuario de manera automática bajo ninguna circunstancia, salvo que exista una solicitud directa, explícita e inequívoca del usuario en el chat.
