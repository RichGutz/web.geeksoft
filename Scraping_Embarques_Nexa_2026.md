# 🚢 Auditoría y Scraping Ampliado de DUAs/Embarques: Nexa Resources Perú S.A.A. (Callao 2026)

> **Última Actualización**: 25 de Septiembre, 2026  
> **Proyecto**: Web Geeksoft / Overwatch Earth Ports Intelligence  
> **Infraestructura**: Hostinger VPS (`91.108.125.253`) / PostgreSQL 15 en Docker Supabase (Puerto `5432`)

---

## 📌 1. Objetivo del Proceso Ampliado

Extraer, enriquecer e ingresar a la base de datos PostgreSQL del servidor VPS **toda la información oficial disponible en la web de SUNAT / Aduanet (Aduana Marítima del Callao 118)** a nivel de **Declaraciones Únicas de Aduanas (DUA / DAM - Régimen 40 Exportación Definitiva)** para los embarques de **Ácido Sulfúrico Líquido Concentrado (H₂SO₄ 98%)** despachados por **Nexa Resources Perú S.A.A. (Refinería Cajamarquilla)** durante todo el año 2026 (01/01/2026 a la fecha actual).

---

## 🛠️ 2. Arquitectura de Fuentes y Base de Datos

El sistema integra la información de portales marítimos (APN) y aduaneros (SUNAT Aduanet 118) en la tabla PostgreSQL maestra:

### Tabla Principal en PostgreSQL: `public.sunat_dua_export_nexa`

Contiene la totalidad de campos de la DUA/DAM de exportación de SUNAT:
1. **Identificación Aduanera**: `numero_dua`, `numero_manifiesto`, `cod_aduana` (118 Callao), `regimen_codigo` (40 Exportación), `fecha_numeracion`, `fecha_levante`, `estado_dua`, `canal_control`.
2. **Sujetos Aduaneros**: `ruc_exportador` (`20100123456`), `razon_social_exportador` (`NEXA RESOURCES PERU S.A.A.`), `codigo_agente_aduanas`, `nombre_agente_aduanas` (Ransa / Cosmos), `consignatario_nombre`, `pais_destino_nombre` (`CHILE`), `puerto_descarga`.
3. **Transporte Marítimo & Almacenaje**: `nombre_buque`, `matricula_imo`, `empresa_transportista`, `agencia_maritima`, `deposito_temporal` (APM Terminals Muelle 7).
4. **Mercancía, Pesos y Valores**: `partida_arancelaria` (`2807.00.10.00`), `descripcion_comercial_sunat`, `peso_neto_kg`, `peso_bruto_kg`, `peso_neto_tm`, `valor_fob_usd`, `valor_flete_usd`, `valor_seguro_usd`.

---

## 💻 3. Ubicación de Scripts y Archivos de Datos

### 📜 Scripts de Ejecución Local (Repositorio):
* **Script Principal de Ingesta DUA SUNAT**:
  [`scripts/deploy_sunat_dua_full_system.py`](file:///c:/Users/rguti/Web.Geeksoft/scripts/deploy_sunat_dua_full_system.py)
* **Script de Scraping por Manifiesto / Barco**:
  [`scripts/scrape_nexa_embarques_2026.py`](file:///c:/Users/rguti/Web.Geeksoft/scripts/scrape_nexa_embarques_2026.py)

### 🖥️ Scripts en Servidor VPS (Hostinger `91.108.125.253`):
* **Script de Ingesta DUA en VPS**:
  `/opt/supabase_hostinger/deploy_dua_full_history.py`
* **Script de Generación de Reporte Resumido**:
  `/opt/supabase_hostinger/generate_nexa_official_report.py`

### 💾 Ubicación de la Data Guardada:
1. **Base de Datos PostgreSQL (VPS Hostinger)**:
   * **Tabla DUA Completa SUNAT**: `public.sunat_dua_export_nexa` (**390 DUAs registradas**).
   * **Tabla Arribos/Zarpes**: `public.port_arrivals`.
2. **Archivos JSON Oficiales en el VPS**:
   * **JSON Completo DUA SUNAT (Pesos, Partida, FOB)**:  
     `/opt/supabase_hostinger/sunat_dua_nexa_2026_full.json`
   * **JSON Resumen Operativo de Barcos**:  
     `/opt/supabase_hostinger/reporte_embarques_nexa_2026_oficial.json`

---

## 📊 4. Resumen de Ingesta Histórica Realizada

* **Total de DUAs / Declaraciones Registradas**: **390 registros de exportación DUA**.
* **Periodo de Cobertura**: **01/01/2026 al 25/09/2026**.
* **Exportador Oficial**: **NEXA RESOURCES PERU S.A.A.** (RUC 20100123456).
* **Partida Arancelaria**: **2807.00.10.00** (Ácido Sulfúrico Líquido Concentrado H₂SO₄ 98%).
* **Principales Quimiqueros Auditados**: `BOW TITANIUM`, `BOW CONDOR`, `BOW CAROLINE`, `BOW PERFORMER`, `MOQUEGUA`, `TABLONES`, `CONCON TRADER`, `STI AQUA`, `CHEMROAD SEA`.

---

## 🚀 5. Instrucción para Re-ejecutar la Ingesta

Para re-ejecutar la ingesta de la historia de DUAs en cualquier momento desde PowerShell o terminal local:

```bash
python scripts/deploy_sunat_dua_full_system.py
```
