# 🌐 Web.Geeksoft — Plan Maestro de Desarrollo UI

> **Contexto para el próximo agente de IA:**
> Este documento es el blueprint completo del sitio web de Geeksoft. Cada sección es una fuente de verdad. **No improvises. Lee todo antes de tocar código.**

---

## Stack Técnico
- **Framework**: Next.js 16 (App Router, Turbopack)
- **WebGL**: React Three Fiber (`@react-three/fiber`) + Drei
- **CSS**: Vanilla CSS en `globals.css` (sin Tailwind)
- **Rutas activas**:
  - `/` → **NUEVA HOME (Radar 3D Híbrido)**: Radar HTML (`750px`) sobre el fondo 3D (terrain, gems, fog verde).
  - `/inframundo` → **Sección Inferno**: Terreno 3D volcánico naranja fuego (`#ff4400`) y niebla con las tarjetas de villanos PRE-IA en Lottie.
  - `/sandbox` → Terreno 3D original experimental.
  - `/sandbox-gems` → Fondo 3D solo (terrain + gems + fog verde).
  - `/sandbox-radar` → Ruta duplicada de prueba de la home híbrida.

---

## Componentes WebGL Estables (NO TOCAR sin respaldo)

| Componente | Ruta | Descripción |
|---|---|---|
| `ContourTerrain.tsx` | `src/components/webgl/` | Terreno de curvas de nivel con shader parabólico. **Backup**: `ContourTerrain_V4_STABLE.tsx` |
| `StarField.tsx` | `src/components/webgl/` | Estrellas verdes neón (Drei PointMaterial). **Backup**: `StarField_V2_STABLE.tsx` |
| `GreenGems.tsx` | `src/components/webgl/` | Gemas icosaédricas verdes translúcidas. **Backup**: `GreenGems_V3_STABLE.tsx` |
| `GreenFogCamera.tsx` | `src/components/webgl/` | Cámara + niebla verde `#001408` con scroll 3D. **Backup**: `GreenFogCamera_V2_STABLE.tsx` |
| `GreenFogVolume.tsx` | `src/components/webgl/` | Niebla volumétrica de partículas gigantes. **Backup**: `GreenFogVolume_V2_STABLE.tsx` |
| `StaticFogCamera.tsx` | `src/components/webgl/` | Cámara fija + niebla verde (sin ScrollControls, para el híbrido) |
| `InfernoTerrain.tsx` | `src/components/webgl/` | Terreno de curvas de nivel de color naranja fuego (`#ff4400`) para `/inframundo`. |
| `InfernoFogCamera.tsx` | `src/components/webgl/` | Cámara fija + niebla volcánica oscura (`#1a0500`) para `/inframundo`. |

### ⚠️ Reglas Críticas para Shaders GLSL
- **NUNCA** combinar declaración manual de `vViewPosition` con `#include <fog_pars_vertex>` — genera doble declaración y crash silencioso de GPU.
- **NUNCA** poner `fog={true}` en un `ShaderMaterial` personalizado sin implementar TODOS los includes de niebla correctamente.
- **SIEMPRE** verificar uniforms en `useFrame` de forma defensiva: `if (mat && mat.uniforms && mat.uniforms.uTime?.value !== undefined)`.

---

## Features Implementadas (Sprint Completado)

### Feature 1: Agrandar y Centrar el Radar en Pantalla ✅ COMPLETADO
- El Radar aumentó su diámetro de `600px` a `750px` en `src/app/globals.css`.
- Los radios de los nodos de categorías en `Radar.tsx` fueron recalculados proporcionalmente (`saas: 260`, `dashboards: 190`, `ai: 300`, `scrappers: 230`).
- El centro de posicionamiento en el plano polar de `Radar.tsx` se actualizó a `375px`.
- El título **GEEKSOFT** se colocó de forma estática y absoluta en el viewport (arriba a la izquierda) en `page.tsx` para no moverse con el radar. Su color cambia dinámicamente con `onColorChange`.

### Feature 2: Red Pill & Blue Pill en las Esquinas ✅ COMPLETADO
- **RED PILL**: Se colocó de manera absoluta en la esquina inferior izquierda. Ahora es un `<Link>` que viaja a `/inframundo`.
- **BLUE PILL**: Se colocó en la esquina inferior derecha. Abre la conversación con WhatsApp directo al número `+51 991010016` con `window.open`.
- Se liberó el centro de la pantalla para permitir al radar crecer al máximo.

### Feature 3: Interacción Click en Nodos del Radar → Panel Lateral ✅ COMPLETADO
- Al hacer click en un nodo (SaaS / Dashboards / AI / Scrappers), el radar se traslada a la izquierda con animación suave `cubic-bezier`.
- El Panel Lateral de contenido aparece desde la derecha mostrando información de servicios, cards con efectos de hover, y CTA.
- Se puede cerrar pulsando la **✕** o volviendo a hacer click en el nodo.

---

## Paleta de Colores Activa

```css
--bg-base: #030303;           /* Negro base */
--bg-3d: #001408;             /* Verde oscuro profundo (fondo 3D) */
--color-default: #E71D36;     /* Rojo Marciano Geeksoft */
--color-saas: #00e3fd;        /* Cyan */
--color-dashboards: #fa02ea;  /* Pink */
--color-ai: #b0ff00;          /* Neon Green */
--color-scrappers: #ff8c00;   /* Orange */
--neon-terrain: #00ff80;      /* Verde neón del terreno 3D */
--curvas-infierno: #ff4400;    /* Naranja fuego del inframundo */
--niebla-infierno: #1a0500;    /* Niebla volcánica */
```

---

## Reglas para el Agente de IA

1. **Backups por hitos**: Antes de cualquier cambio significativo, copia el archivo con sufijo `_VN` o `_VN_STABLE`.
2. **No refactorizar código funcional**: Solo tocar lo necesario para la tarea.
3. **Verificar con tsc**: Después de cada cambio, correr `npx tsc --noEmit` desde `C:\Users\rguti\Web.Geeksoft`.
4. **No usar browser_subagent**: Prohibido en este proyecto (ver `.agents/AGENTS.md`).
5. **Idioma**: Siempre responder en español.
6. **Despliegues a producción**: Siempre correr `python scripts/deploy_geeksoft.py` desde la raíz. No hacer git push manual a production.

---

## Estado al Último Checkpoint (2026-07-14)

- ✅ **La home principal (`/`) ahora tiene el Radar Gigante de 750px sobre el fondo 3D**.
- ✅ **Sección `/inframundo` totalmente operativa con tema 3D volcánico**.
- ✅ **Pills en esquinas inferiores e integración de WhatsApp/Inframundo en onClick**.
- ✅ **Panel lateral animado para categorías interactivo**.
- ✅ **Todo compilado y desplegado con éxito en el VPS (`geeksoft.tech`)**.

---

## 🎯 Próximo Sprint: Ajustes Matrix, Favicon & Sección de Clientes

### 1. Favicon Oficial ✅ COMPLETADO
- [x] Configurar `public/FAVICON.GEEKSOFT.png` en `src/app/layout.tsx` (metadata `icons`).

### 2. Corrección de Analogía Matrix (Red Pill vs. Blue Pill) ✅ COMPLETADO
- [x] 🔵 **Blue Pill (Seguir Dormido)**: Redirigir a `/inframundo` (pesadilla de tareas manuales PRE-IA).
- [x] 🔴 **Red Pill (Despertar a la Realidad)**: Abrir WhatsApp/Contacto con Geeksoft (transformación con IA).
- [x] Sincronizar tooltips y estilos en `src/app/page.tsx` y `src/app/sandbox-radar/page.tsx`.

### 3. Clientes: "THE AWAKENED" ✅ COMPLETADO
- [x] Burbuja holográfica emergente al hacer hover sobre la **Red Pill** sin apretarla.
- [x] Fichas temáticas de clientes/proyectos:
  - **NEO**: Empresa financiera de factoring (ERP a medida).
  - **MORPHEUS**: Empresa naviera (CRM Inteligente *Delfos*).
  - **TRINITY**: Asociación patrimonial (Gemelo Digital de activos reales).
- [x] Click en la Red Pill mantiene la llamada a la acción hacia WhatsApp (`+51 991010016`).
