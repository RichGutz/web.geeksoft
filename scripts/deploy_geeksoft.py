import paramiko
import os
import sys
import time

# Credenciales del VPS (Hostinger)
VPS_HOST = "91.108.125.253"
VPS_PORT = 22
VPS_USER = "root"
VPS_PASS = "doHtFib1poV+f0F7"

# Configuracion del Proyecto
REPO_URL     = "https://github.com/RichGutz/web.geeksoft.git"
BRANCH       = "main"
APP_DIR      = "/opt/web_geeksoft"
DOMAIN       = "geeksoft.tech"
SERVICE_NAME = "geeksoft"
PORT         = 3050 # Puerto interno para Next.js

def ssh_run(client, cmd, desc=""):
    print(f"\n[{desc}]")
    print(f"Ejecutando: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    # Next.js build y npm install pueden tardar mucho, leemos en tiempo real
    out_lines = []
    while not stdout.channel.exit_status_ready():
        if stdout.channel.recv_ready():
            line = stdout.channel.recv(1024).decode('utf-8', errors='replace')
            sys.stdout.write(line)
            out_lines.append(line)
            sys.stdout.flush()
        if stderr.channel.recv_stderr_ready():
            line = stderr.channel.recv_stderr(1024).decode('utf-8', errors='replace')
            sys.stdout.write(line)
            sys.stdout.flush()
        time.sleep(0.1)
    
    out = "".join(out_lines)
    return out

def local_push():
    print("\n[Fase 1: Sincronizando Cambios Locales con GitHub]")
    os.system("git add .")
    os.system('git commit -m "Auto-deploy: Preparando para producción en VPS"')
    os.system("git push origin main")

def deploy():
    print(f"\n[INICIANDO DESPLIEGUE A GEEKSOFT.TECH]")
    
    # 1. Empujar código local a main
    local_push()

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        print(f"\n[Fase 2: Conectando SSH a {VPS_HOST} as {VPS_USER}...] ")
        client.connect(hostname=VPS_HOST, port=VPS_PORT, username=VPS_USER, password=VPS_PASS, timeout=15)
        print("Conexión SSH exitosa.")

        # 2. Requerimientos del Sistema (Node, npm, PM2)
        ssh_run(client, "apt-get update && apt-get install -y nodejs npm && npm install -g pm2", "Fase 3: Validando Node.js y PM2 en el servidor")
        
        # 3. Descargar/Actualizar el código
        git_cmd = f"if [ -d '{APP_DIR}/.git' ]; then cd {APP_DIR} && git reset --hard HEAD && git pull origin {BRANCH}; else rm -rf {APP_DIR} && git clone -b {BRANCH} {REPO_URL} {APP_DIR}; fi"
        ssh_run(client, git_cmd, "Fase 4: Sincronizando Repositorio Git en el VPS")
        
        # 4. Instalar dependencias y Build de Next.js
        build_cmd = f"cd {APP_DIR} && npm install && npm run build"
        ssh_run(client, build_cmd, "Fase 5: Instalando NPM y Compilando Next.js (Esto puede tomar minutos)")
        
        # 5. Levantar el servicio con PM2
        pm2_cmd = f"cd {APP_DIR} && pm2 delete {SERVICE_NAME} || true && PORT={PORT} pm2 start npm --name '{SERVICE_NAME}' -- start && pm2 save"
        ssh_run(client, pm2_cmd, "Fase 6: Levantando Aplicación con PM2")
        
        # 6. Configurar Proxy Nginx
        nginx_cfg = f"""
server {{
    listen 80;
    server_name {DOMAIN} www.{DOMAIN};

    location / {{
        proxy_pass http://localhost:{PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }}
}}
"""
        ssh_run(client, f"echo \"{nginx_cfg}\" > /etc/nginx/sites-available/{SERVICE_NAME}", "Fase 7: Creando Bloque Nginx Reverse Proxy")
        ssh_run(client, f"ln -sf /etc/nginx/sites-available/{SERVICE_NAME} /etc/nginx/sites-enabled/{SERVICE_NAME} && nginx -t && systemctl reload nginx", "Fase 8: Activando Sitio en Nginx")
        
        # 7. Certificados SSL (Certbot)
        print("\n[Fase 9: Ejecutando Certbot SSL...]")
        # Redirigimos el input al terminal interactivo para evitar traba de Paramiko si falta un agree-tos previo, 
        # pero usamos flags para automatizar lo máximo posible.
        ssh_run(client, f"certbot --nginx -d {DOMAIN} -d www.{DOMAIN} --non-interactive --agree-tos -m contacto@geeksoft.pe --redirect", "Asegurando el sitio con HTTPS (Let's Encrypt)")
        
        print(f"\n{'='*60}")
        print(f" [ÉXITO] GEEKSOFT DESPLEGADO EN: https://{DOMAIN}")
        print(f"{'='*60}\n")

    except Exception as e:
        print(f"\n[ERROR CRÍTICO] {e}")
    finally:
        client.close()

if __name__ == "__main__":
    deploy()
