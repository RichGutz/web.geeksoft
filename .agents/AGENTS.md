# Reglas de Proyecto: Web Geeksoft

## Backups por Hitos (Control de Daños)
Cada vez que el usuario indique que se ha llegado a una "versión estable" o un "hito", DEBO guardar inmediatamente una copia de seguridad de los archivos críticos (scripts, componentes principales) involucrados.
- El formato del nombre del archivo debe tener un sufijo de versión, ejemplo: `Radar_V1.tsx`, `globals_V1.css`.
- Esto garantiza que siempre podamos retroceder si una experimentación futura falla, rompiendo el círculo vicioso de perder código funcional.
