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

# Query specific vessels: TABLONES, MOQUEGUA, or PETRAL agency/fleet in Callao or Peru ports
sql_query = \"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque,
    snapshot_date AS fecha_registro,
    arrival_eta AS fecha_arribo_embarque,
    movement_type AS operacion,
    terminal AS terminal,
    COALESCE(agency, 'NAVAPETRAL / PETRAL') AS agencia,
    port_name
FROM public.port_arrivals
WHERE ship_name ILIKE '%TABLONES%' 
   OR ship_name ILIKE '%MOQUEGUA%' 
   OR agency ILIKE '%PETRAL%'
   OR agency ILIKE '%NAVAPETRAL%'
ORDER BY snapshot_date ASC;
\"\"\"

cur.execute(sql_query)
rows = cur.fetchall()

petral_vessels = []
for idx, r in enumerate(rows, 1):
    petral_vessels.append({
        "nro": idx,
        "manifiesto": r[0],
        "buque": r[1],
        "fecha_registro": str(r[2]),
        "fecha_arribo": str(r[3]) if r[3] else str(r[2]),
        "operacion": r[4],
        "terminal": r[5],
        "agencia": r[6],
        "puerto": r[7]
    })

print(f"TOTAL_REGISTROS_PETRAL_TABLONES_MOQUEGUA: {len(petral_vessels)}")
print(json.dumps(petral_vessels, indent=2, ensure_ascii=False))

with open("/opt/supabase_hostinger/petral_tablones_moquegua_audit.json", "w", encoding="utf-8") as f:
    json.dump(petral_vessels, f, indent=2, ensure_ascii=False)

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/query_petral_vessels.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/query_petral_vessels.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
