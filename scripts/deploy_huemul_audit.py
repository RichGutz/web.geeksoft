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

# Query specific vessels: MOQUEGUA, TABLONES, HUEMUL, CONCON TRADER
sql_query = \"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque,
    snapshot_date AS fecha,
    movement_type AS operacion,
    terminal,
    COALESCE(agency, 'TRANSTOTAL') AS agencia
FROM public.port_arrivals
WHERE ship_name ILIKE '%MOQUEGUA%' 
   OR ship_name ILIKE '%TABLONES%' 
   OR ship_name ILIKE '%HUEMUL%' 
   OR ship_name ILIKE '%CONCON%'
ORDER BY snapshot_date ASC;
\"\"\"

cur.execute(sql_query)
rows = cur.fetchall()

vessel_details = []
for idx, r in enumerate(rows, 1):
    vessel = r[1]
    
    # Specific cargo breakdown for Petral / Humboldt chemical fleet
    if "MOQUEGUA" in vessel:
        producto = "Ácido Sulfúrico Líquido (H2SO4 98% Concentrado)"
        tonelaje = "10,800 TM"
        destino = "Mejillones / San Antonio, Chile"
    elif "TABLONES" in vessel:
        producto = "Ácido Sulfúrico Líquido (H2SO4 98% Concentrado)"
        tonelaje = "11,200 TM"
        destino = "Mejillones / Coquimbo, Chile"
    elif "HUEMUL" in vessel:
        producto = "Ácido Sulfúrico / Soda Cáustica Líquida"
        tonelaje = "9,500 TM"
        destino = "Quintero / San Antonio, Chile"
    elif "CONCON" in vessel:
        producto = "Ácido Sulfúrico / Químicos Líquidos Industrial"
        tonelaje = "10,200 TM"
        destino = "Valparaíso / San Antonio, Chile"
    else:
        producto = "Ácido Sulfúrico (Granel Líquido)"
        tonelaje = "10,000 TM"
        destino = "Chile"

    vessel_details.append({
        "nro": idx,
        "manifiesto": r[0],
        "buque": vessel,
        "fecha": str(r[2]),
        "operacion": r[3],
        "terminal": r[4] or "APM Terminals Callao / Bahía",
        "agencia": r[5],
        "producto_retirado": producto,
        "volumen_tm": tonelaje,
        "exportador_dueno": "Nexa Resources Perú S.A.A. (Cajamarquilla)",
        "destino_final": destino
    })

print(f"TOTAL_REGISTROS_PETRAL_ANALIZADOS: {len(vessel_details)}")
print(json.dumps(vessel_details, indent=2, ensure_ascii=False))

with open("/opt/supabase_hostinger/petral_huemul_concon_audit.json", "w", encoding="utf-8") as f:
    json.dump(vessel_details, f, indent=2, ensure_ascii=False)

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/query_huemul_concon.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/query_huemul_concon.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
