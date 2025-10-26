from cairosvg import svg2png
from PIL import Image
import sys

svg = r"c:\Users\HP\Desktop\kwanpa-health-hub\public\placeholder.svg"
tmp_png = r"c:\Users\HP\Desktop\kwanpa-health-hub\public\favicon_src.png"
out_ico = r"c:\Users\HP\Desktop\kwanpa-health-hub\public\favicon.ico"

# Render a large PNG from SVG
svg2png(url=svg, write_to=tmp_png, output_width=512, output_height=512)

# Use Pillow to create multi-size ICO
img = Image.open(tmp_png)
img.save(out_ico, format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64)])
print('WROTE', out_ico)
