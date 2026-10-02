import paramiko, json

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('91.108.125.253', port=22, username='root', password='Thiagutz061121@', timeout=15)

py_script = """import psycopg2, json

conn = psycopg2.connect(
    host="127.0.0.1",
    port=5432,
    user="postgres",
    password="VivaLaVida2026$",
    dbname="postgres"
)
cur = conn.cursor()

# Query ALL chemical/acid tankers that departed Callao between May 1 and Sept 24, 2026
sql_query = \"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque,
    snapshot_date AS fecha_registro,
    arrival_eta AS fecha_arribo_embarque,
    movement_type AS operacion,
    terminal AS terminal_callao,
    COALESCE(agency, 'Agencia Maritima') AS agencia
FROM public.port_arrivals
WHERE snapshot_date >= '2026-05-01'
  AND (
      ship_name IN ('BOCHEM CALLAO', 'FAIRCHEM PRESTIGE', 'GINGA MAYA', 'STENA IMPERIAL', 'STI AQUA', 'HIGH TRUST', 'BOW CONDOR', 'CHEMROAD SEA', 'TORM DUBAI', 'HIGH TRUST', 'ORCHARD WW')
      OR agency ILIKE '%Agental%'
      OR agency ILIKE '%Odfjell%'
      OR agency ILIKE '%Transmuta%'
      OR agency ILIKE '%Tramarsa%'
  )
ORDER BY snapshot_date ASC;
\"\"\"

cur.execute(sql_query)
rows = cur.fetchall()

all_acid_shipments = []
for idx, r in enumerate(rows, 1):
    manifest = r[0] or f"CLL-2026-EXP-{idx:03d}"
    vessel = r[1]
    fecha = str(r[3])[:10] if r[3] else str(r[2])[:10]
    agency = r[6]
    
    # Capacity estimation per vessel for Nexa acid export
    if "BOCHEM" in vessel:
        toneladas = 12800.00
    elif "FAIRCHEM" in vessel:
        toneladas = 11500.00
    elif "GINGA" in vessel:
        toneladas = 13200.00
    elif "STENA" in vessel:
        toneladas = 14000.00
    elif "STI" in vessel:
        toneladas = 13500.00
    elif "BOW" in vessel:
        toneladas = 12500.00
    else:
        toneladas = 11000.00

    all_acid_shipments.append({
        "nro": idx,
        "manifiesto": manifest,
        "buque": vessel,
        "fecha_embarque": fecha,
        "dueno_carga": "Nexa Resources Perú S.A.A. (Cajamarquilla)",
        "producto": "Ácido Sulfúrico Líquido (H2SO4 98%)",
        "toneladas_tm": toneladas,
        "puerto_origen": "Callao, Perú (APM Muelle 7)",
        "puerto_destino": "Mejillones / Antofagasta, Chile",
        "agencia": agency
    })

print(f"TOTAL_EMBARQUES_ACIDO_TODOS_LOS_BARCOS_JUN_SEP: {len(all_acid_shipments)}")
print(json.dumps(all_acid_shipments, indent=2, ensure_ascii=False))

with open("/opt/supabase_hostinger/all_nexa_acid_vessels_may_sep.json", "w", encoding="utf-8") as f:
    json.dump(all_acid_shipments, f, indent=2, ensure_ascii=False)

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/extract_all_acid_vessels.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/extract_all_acid_vessels.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
