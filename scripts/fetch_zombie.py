import urllib.request
import json
import ssl

def fetch_zombie():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    print("Buscando un Lottie de Zombie en repositorios Open Source...")
    # Buscamos archivos json con la palabra zombie en repositorios públicos
    url = 'https://api.github.com/search/code?q=zombie+animation+extension:json'
    req = urllib.request.Request(url, headers={'User-Agent': 'Geeksoft-Vibe-Coder'})
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            data = json.loads(response.read().decode())
            if data.get('items') and len(data['items']) > 0:
                # Tomamos el primer resultado válido
                item = data['items'][0]
                raw_url = item['html_url'].replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
                print(f"Encontrado! Descargando desde: {raw_url}")
                
                req_dl = urllib.request.Request(raw_url, headers={'User-Agent': 'Geeksoft-Vibe-Coder'})
                with urllib.request.urlopen(req_dl, context=ctx) as dl_res:
                    with open('public/zombie.json', 'wb') as f:
                        f.write(dl_res.read())
                print("¡Zombie descargado exitosamente en public/zombie.json!")
            else:
                print("No se encontró un zombie open-source. Usa LottieFiles directamente.")
    except Exception as e:
        print(f"Error al buscar el zombie: {e}")

if __name__ == '__main__':
    fetch_zombie()
