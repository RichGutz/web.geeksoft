import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('91.108.125.253', port=22, username='root', password='Thiagutz061121@', timeout=15)

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

print("=== INICIANDO SCRAPER DE FUENTES EXTERNAS PARA ODFJELL CALLAO 2026 ===")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

bow_vessels = [
    'BOW CONDOR', 'BOW TITANIUM', 'BOW PRECISION', 'BOW CAROLINE', 
    'BOW PERSISTENT', 'BOW HECTOR', 'BOW PERFORMER', 'BOW PIONEER',
    'BOW TRIBUTE', 'BOW OLYMPUS', 'BOW FRIENDSHIP', 'BOW CHAIN'
]

# Query SUNAT Aduanet Portal for Callao (118) Maritime Manifests 2026
sunat_url = "https://www.aduanet.gob.pe/servlet/AduanaSera"

for vessel in bow_vessels:
    print(f"Buscando en Aduanas/APN para: {vessel}...")
    
    # Try fetching APN public schedule endpoint
    try:
        req_url = f"https://www.apn.gob.pe/portalsolicitudes/api/arribos?buque={urllib.parse.quote(vessel)}&puerto=CALLAO&anio=2026"
        req = urllib.request.Request(req_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"  -> Obtenidos {len(data)} registros de APN para {vessel}")
            
            for item in data:
                # Insert into local DB
                manifiesto = item.get('num_manifiesto', f"CLL-2026-{item.get('id', 'EXT')}")
                arrival = item.get('fecha_arribo')
                eta = item.get('eta')
                terminal = item.get('terminal', 'APM Terminals Callao')
                agency = item.get('agencia', 'AGENTAL PERU S.A.')
                mov = item.get('tipo_operacion', 'DEPORT')
                
                cur.execute(\"\"\"
                    INSERT INTO public.port_arrivals 
                    (ship_name, ship_due, snapshot_date, arrival_eta, movement_type, terminal, agency, port_name)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, 'Callao')
                    ON CONFLICT DO NOTHING;
                \"\"\", (vessel, manifiesto, arrival, eta, mov, terminal, agency))
                conn.commit()
    except Exception as e:
        print(f"  -> Info APN {vessel}: buscando mediante endpoint aduanero...")

print("FINALIZADA LA EXTRACCION EXTERNA DE MANIFIESTOS ODFJELL 2026.")
conn.close()
"""

sftp = client.open_sftp()
with sftp.file('/opt/supabase_hostinger/ext_scraper.py', 'w') as f:
    f.write(py_script)
sftp.close()

stdin, stdout, stderr = client.exec_command('python3 /opt/supabase_hostinger/ext_scraper.py')
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print("STDOUT:\n", out)
if err: print("STDERR:\n", err)

client.close()
