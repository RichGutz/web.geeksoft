from PIL import Image
import os

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Use standard luminance formula
            luminance = (item[0] * 299 + item[1] * 587 + item[2] * 114) / 1000
            
            if luminance > 200:
                # White/light background -> transparent
                newData.append((255, 255, 255, 0))
            else:
                # Dark logo part -> make it solid white
                newData.append((255, 255, 255, 255))
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Success: saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

base_dir = r"C:\Users\rguti\Web.Geeksoft\public\images"
process_image(os.path.join(base_dir, "CABEZA.GEEKSOFT.png"), os.path.join(base_dir, "CABEZA.GEEKSOFT_transparent.png"))
process_image(os.path.join(base_dir, "GEEKSOFT.LETRAS.png"), os.path.join(base_dir, "GEEKSOFT.LETRAS_transparent.png"))
