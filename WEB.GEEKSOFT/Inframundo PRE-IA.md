# 🔴 El Inframundo PRE-IA — Especificación Visual

**Enlace desde**: Red Pill en `/sandbox-radar`
**Ruta**: `/inframundo`

---

## Concepto

Una versión infernal del fondo 3D verde que ya tenemos. El mismo terreno de curvas de nivel pero en **rojo/naranja fuego** — como un volcán activo visto desde arriba. La niebla es **naranja oscura volcánica** en vez de verde oscuro.

Sobre este infierno flotan los 3 villanos de la realidad PRE-IA, animados con Lottie.

---

## Paleta de Colores

```css
--bg-infierno: #0d0200;        /* Negro casi rojo — fondo base */
--niebla-infierno: #1a0500;    /* Niebla naranja oscura volcánica */
--curvas-infierno: #ff4400;    /* Naranja fuego para las líneas del terreno */
--curvas-glow: #ff8800;        /* Glow naranja brillante */
```

---

## Componentes Necesarios

| Componente | Basado en | Cambios |
|---|---|---|
| `InfernoTerrain.tsx` | `ContourTerrain.tsx` | Color `#ff4400`, fondo naranja oscuro |
| `InfernoFogCamera.tsx` | `StaticFogCamera.tsx` | Niebla `#1a0500`, densidad `0.009` |
| `InfernoFogVolume.tsx` | `GreenFogVolume.tsx` | Color `#ff2200`, opacidad `0.12` |
| `VillainCards.tsx` | Nuevo | 3 tarjetas con Lottie + título + texto |

---

## Los 3 Villanos (Tarjetas flotantes)

### 1. El "Excel Zombie"
- **Lottie**: `/excel-zombie.json` (ya existe en `/public`)
- **Texto**: "¿Sigues usando Excel para gestionar tu empresa? No eres contador, eres un domador de celdas."

### 2. El "Data-Entry Ghost"
- **Lottie**: `/lottie-surprise.json` (provisional — buscar uno de fantasma/robot)
- **Texto**: "¿Tus empleados pasan horas copiando PDFs? Eso no es trabajo, es tortura de datos."

### 3. El "Email Hole"
- **Lottie**: `/lottie-surprise.json` (provisional — buscar uno de email/agujero negro)
- **Texto**: "Si la mitad de tu día es responder lo mismo, no necesitas más tiempo, necesitas un bot."

---

## Layout de la Página `/inframundo`

```
┌─────────────────────────────────────────┐
│  ← VOLVER (link a /sandbox-radar)       │
│                                         │
│     [ VILLANO 1 ]  [ VILLANO 2 ]        │
│          [ VILLANO 3 ]                  │
│                                         │
│  ════════════════════════════════════   │
│  Fondo: InfernoTerrain (curvas naranja) │
│  + InfernoFogVolume (niebla volcánica)  │
└─────────────────────────────────────────┘
```

---

## Estado: ⏳ POR IMPLEMENTAR

- [ ] Crear `InfernoTerrain.tsx` (copia de ContourTerrain con colores naranja)
- [ ] Crear `InfernoFogCamera.tsx` (copia de StaticFogCamera con niebla volcánica)
- [ ] Crear `InfernoFogVolume.tsx` (copia de GreenFogVolume con color naranja)
- [ ] Crear `VillainCards.tsx` (tarjetas con Lottie)
- [ ] Crear `/app/inframundo/page.tsx`
- [ ] Actualizar Red Pill en `sandbox-radar/page.tsx` para navegar a `/inframundo`
