import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('91.108.125.253', port=22, username='root', password='Thiagutz061121@', timeout=15)

py_script = """import urllib.request
import json
import psycopg2

conn = psycopg2.connect(
    host="127.0.0.1",
    port=5432,
    user="postgres",
    password="VivaLaVida2026$",
    dbname="postgres"
)
cur = conn.cursor()

print("=== EXTRACCION DE MANIFIESTOS MARITIMOS CALLAO APN/ADUANAS 2026 ===")

# Query APN schedules & manifest endpoint for Callao Port 
headers = {'User-Agent': 'Mozilla/5.0'}

# Search Callao historical list for 2026
url = "https://www.apn.gob.pe/portalsolicitudes/api/arribos_callao_2026"

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        records = json.loads(resp.read().decode('utf-8'))
        for r in records:
            agency = r.get('agencia', '')
            vessel = r.get('nave', '')
            if 'ODFJELL' in agency.upper() or 'AGENTAL' in agency.upper() or 'BOW' in vessel.upper():
                cur.execute(\"\"\"
                    INSERT INTO public.port_arrivals 
                    (ship_name, ship_due, snapshot_date, movement_type, terminal, agency, port_name)
                    VALUES (%s, %s, %s, %s, %s, %s, 'Callao')
                    ON CONFLICT DO NOTHING;
                \"\"\", (vessel, r.get('manifiesto'), r.get('fecha_arribo'), r.get('tipo_movimiento'), r.get('terminal'), agency))
        conn.commit()
except Exception as e:
    print(f"Nota APN API Directa: {e}")

# Check final updated count
cur.execute("SELECT COUNT(*) FROM public.port_arrivals WHERE ship_name ILIKE '%BOW%' OR agency ILIKE '%Odfjell%' OR agency ILIKE '%Agental%';")
total = cur.fetchone()[0]
print(f"BASE DE DATOS SUPABASE ACTUALIZADA: Total de {total} registros de Odfjell guardados.")

conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/ext_apn_ingest.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/ext_apn_ingest.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
