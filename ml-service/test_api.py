import requests
import io
from PIL import Image

print("Generating dummy green image...")
img = Image.new('RGB', (100, 100), color = 'green')
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_byte_arr.seek(0)

print("Sending pure green image to predict-disease endpoint...")
try:
    r = requests.post('http://127.0.0.1:5001/predict-disease', files={'image': ('dummy.jpg', img_byte_arr, 'image/jpeg')})
    print("STATUS:", r.status_code)
    print("RESPONSE:", r.text)
except Exception as e:
    print("Could not connect to server:", e)
