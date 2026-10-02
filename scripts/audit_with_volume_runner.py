import paramiko

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

sql_query = \"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque_odfjell,
    MIN(snapshot_date) AS fecha_deteccion,
    MIN(arrival_eta) AS fecha_arribo,
    movement_type AS operacion,
    terminal AS terminal_callao,
    COALESCE(agency, 'Agental (Odfjell)') AS agencia
FROM public.port_arrivals
WHERE (ship_name ILIKE '%BOW%' OR agency ILIKE '%Agental%' OR agency ILIKE '%Odfjell%')
  AND (port_name ILIKE '%Callao%' OR port_name IS NULL)
  AND snapshot_date >= '2026-01-01'
GROUP BY ship_due, ship_name, movement_type, terminal, agency
ORDER BY fecha_deteccion ASC;
\"\"\"

cur.execute(sql_query)
rows = cur.fetchall()

results = []
for r in rows:
    results.append({
        "manifiesto": r[0],
        "buque": r[1],
        "fecha_arribo": str(r[3]) if r[3] else str(r[2]),
        "operacion": r[4],
        "terminal": r[5] or "APM Terminals Callao",
        "agencia": r[6]
    })

print(f"TOTAL_RECORDS_2026: {len(results)}")

with open("/opt/supabase_hostinger/query_nexa_odfjell_2026_full.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

for item in results:
    print(f"Manifiesto: {item['manifiesto']} | Buque: {item['buque']} | Fecha: {item['fecha_arribo']} | Op: {item['operacion']}")

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/audit_with_volume.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/audit_with_volume.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
