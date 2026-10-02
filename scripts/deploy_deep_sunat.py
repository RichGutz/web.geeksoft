import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('91.108.125.253', port=22, username='root', password='Thiagutz061121@', timeout=15)

# Scraping SUNAT Maritime Manifest search for Callao (code 118) and Odfjell agency (Agental)
py_script = """import urllib.request
import urllib.parse
import json
import re
import psycopg2

conn = psycopg2.connect(
    host="127.0.0.1",
    port=5432,
    user="postgres",
    password="VivaLaVida2026$",
    dbname="postgres"
)
cur = conn.cursor()

print("=== DEEP EXTRACTION SUNAT ADUANET CALLAO 2026 FOR ODFJELL ===")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded'
}

# SUNAT Aduanet Callao Manifest Query
url = "https://www.aduanet.gob.pe/cl-ad-itmanifiesto/manifiestoS01Alias"

# We query manifests for maritime Callao 118 from Jan 2026
bow_ships = ["BOW CONDOR", "BOW TITANIUM", "BOW PRECISION", "BOW CAROLINE", "BOW PERSISTENT", "BOW HECTOR", "BOW PERFORMER"]

extracted_count = 0
for ship in bow_ships:
    form_data = {
        'accion': 'consultarManifiesto',
        'codAduana': '118',
        'anio': '2026',
        'nomNave': ship
    }
    encoded_data = urllib.parse.urlencode(form_data).encode('utf-8')
    try:
        req = urllib.request.Request(url, data=encoded_data, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find manifest numbers and arrival dates
            manifests = re.findall(r'(\d{4}-\d+)', html)
            for m in manifests:
                num_manifiesto = f"CLL-2026-{m}"
                cur.execute(\"\"\"
                    INSERT INTO public.port_arrivals 
                    (ship_name, ship_due, snapshot_date, movement_type, terminal, agency, port_name)
                    VALUES (%s, %s, CURRENT_DATE, 'IMPORT/EXPORT', 'APM Terminals Callao', 'AGENTAL PERU S.A. (ODFJELL)', 'Callao')
                    ON CONFLICT DO NOTHING;
                \"\"\", (ship, num_manifiesto))
                extracted_count += 1
            conn.commit()
            print(f"Buque {ship}: Procesados {len(manifests)} manifiestos aduaneros.")
    except Exception as e:
        print(f"Consulta SUNAT {ship}: {e}")

print(f"EXTRACTION COMPLETED: Ingestados/verificados {extracted_count} manifiestos aduaneros en la DB.")
conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/deep_sunat_odfjell.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/deep_sunat_odfjell.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
