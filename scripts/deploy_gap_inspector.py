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

# Query all chemical / liquid tankers that entered Callao between May 1 and September 23, 2026
sql_query = \"\"\"
SELECT 
    ship_due AS manifiesto,
    ship_name AS buque,
    snapshot_date AS fecha_registro,
    arrival_eta AS fecha_arribo,
    movement_type AS operacion,
    terminal AS terminal_callao,
    agency AS agencia
FROM public.port_arrivals
WHERE snapshot_date >= '2026-05-01' 
  AND snapshot_date < '2026-09-24'
ORDER BY snapshot_date ASC;
\"\"\"

cur.execute(sql_query)
rows = cur.fetchall()

print(f"TOTAL_REGISTROS_PAGINA_WEB_JUNIO_SEPTIEMBRE: {len(rows)}")

vessels_seen = set()
for r in rows:
    vessels_seen.add(r[1])

print("BUQUES_QUE_INGRESARON_JUNIO_SEPTIEMBRE:")
print(sorted(list(vessels_seen)))

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/inspect_gap_months.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/inspect_gap_months.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
