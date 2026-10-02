import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('91.108.125.253', port=22, username='root', password='Thiagutz061121@', timeout=15)

stdin, stdout, stderr = client.exec_command('''python3 -c "
import psycopg2
conn = psycopg2.connect(host='127.0.0.1', port=5432, user='postgres', password='VivaLaVida2026$', dbname='postgres')
cur = conn.cursor()
cur.execute(\\"SELECT COUNT(*) FROM public.port_arrivals WHERE ship_name ILIKE '%BOW%' OR agency ILIKE '%Odfjell%' OR agency ILIKE '%Agental%';\\")
count = cur.fetchone()[0]
print('TOTAL_ODFJELL_RECORDS_DB:', count)
conn.close()
"''')

out = stdout.read().decode('utf-8')
print("STDOUT:\n", out)
client.close()
