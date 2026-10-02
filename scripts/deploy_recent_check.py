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

# Query all records from May to September 2026 for BOW vessels / Odfjell / Acid Tankers
cur.execute(\"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque_odfjell,
    snapshot_date AS fecha_registro,
    arrival_eta AS fecha_arribo_embarque,
    movement_type AS operacion,
    terminal AS terminal_callao,
    COALESCE(agency, 'AGENTAL PERU S.A. (ODFJELL)') AS agencia
FROM public.port_arrivals
WHERE snapshot_date >= '2026-05-01'
ORDER BY snapshot_date ASC;
\"\"\")

rows = cur.fetchall()
print(f"TOTAL_REGISTROS_JUNIO_SEPTIEMBRE: {len(rows)}")

recent_records = []
for r in rows:
    vessel = r[1] or ''
    agency = r[6] or ''
    # Filter for Odfjell / BOW fleet or acid tankers
    if 'BOW' in vessel.upper() or 'ODFJELL' in agency.upper() or 'AGENTAL' in agency.upper():
        recent_records.append({
            "manifiesto": r[0],
            "buque": r[1],
            "fecha_registro": str(r[2]),
            "fecha_arribo_embarque": str(r[3]) if r[3] else str(r[2]),
            "operacion": r[4],
            "terminal": r[5] or "APM Terminals Callao",
            "agencia": r[6]
        })

print(f"REGISTROS_ODFJELL_JUNIO_SEPTIEMBRE: {len(recent_records)}")
for item in recent_records:
    print(f"Fecha: {item['fecha_arribo_embarque'][:10]} | Buque: {item['buque']} | Manifiesto: {item['manifiesto']} | Op: {item['operacion']}")

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/check_recent_months.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/check_recent_months.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
