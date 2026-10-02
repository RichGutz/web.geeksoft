import paramiko, json

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('91.108.125.253', username='root', password='Thiagutz061121@')

remote_code = """import psycopg2, json

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="supabase_hostinger_secret_password",
    host="127.0.0.1",
    port=5432
)
cur = conn.cursor()

query = \"\"\"
SELECT 
    id, vessel_name, arrival_date, etd, terminal, n_manifiesto, n_numera, 
    agencia, consignatario, carga_tipo, observaciones, created_at
FROM public.port_arrivals
WHERE (
    LOWER(vessel_name) LIKE '%bow%' 
    OR LOWER(agencia) LIKE '%odfjell%' 
    OR LOWER(consignatario) LIKE '%nexa%' 
    OR LOWER(observaciones) LIKE '%nexa%' 
    OR LOWER(observaciones) LIKE '%odfjell%'
    OR LOWER(observaciones) LIKE '%acido%'
)
AND arrival_date >= '2026-01-01'
ORDER BY arrival_date ASC;
\"\"\"

cur.execute(query)
rows = cur.fetchall()

results = []
for r in rows:
    results.append({
        'id': r[0],
        'vessel_name': r[1],
        'arrival_date': str(r[2]),
        'etd': str(r[3]) if r[3] else None,
        'terminal': r[4],
        'n_manifiesto': r[5],
        'n_numera': r[6],
        'agencia': r[7],
        'consignatario': r[8],
        'carga_tipo': r[9],
        'observaciones': r[10]
    })

print(f'TOTAL_FOUND: {len(results)}')

with open('/opt/supabase_hostinger/query_nexa_odfjell_2026_full.json', 'w') as f:
    json.dump(results, f, indent=2)

with open('/opt/supabase_hostinger/query_nexa_odfjell_2026.sql', 'w') as f:
    f.write(query)

by_month = {}
for item in results:
    m = item['arrival_date'][:7] if item['arrival_date'] else 'UNKNOWN'
    by_month[m] = by_month.get(m, 0) + 1

print('MONTHLY_BREAKDOWN:', json.dumps(by_month))
vessels = sorted(list(set(item['vessel_name'] for item in results)))
print('VESSELS_FOUND:', json.dumps(vessels))

conn.close()
"""

sftp = ssh.open_sftp()
with sftp.open('/tmp/run_audit_2026.py', 'w') as f:
    f.write(remote_code)

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/run_audit_2026.py')
print('STDOUT:', stdout.read().decode('utf-8', errors='ignore'))
print('STDERR:', stderr.read().decode('utf-8', errors='ignore'))
ssh.close()
