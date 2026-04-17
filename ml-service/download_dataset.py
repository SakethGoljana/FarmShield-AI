"""One-shot Kaggle dataset downloader using API credentials from .env"""
import os
import zipfile
from dotenv import load_dotenv
load_dotenv()

username = os.environ.get("KAGGLE_USERNAME")
key = os.environ.get("KAGGLE_KEY")
if not username or not key:
    print("ERROR: KAGGLE_USERNAME or KAGGLE_KEY not found in .env!")
    exit(1)

# Set credentials for kaggle library
os.environ["KAGGLE_USERNAME"] = username
os.environ["KAGGLE_KEY"] = key

from kaggle.api.kaggle_api_extended import KaggleApi
api = KaggleApi()
api.authenticate()

print("Authenticated with Kaggle successfully!")
print("Downloading plant-leaf-diseases-training-dataset... (This may take a few minutes)")
os.makedirs("dataset", exist_ok=True)
api.dataset_download_files("nirmalsankalana/plant-diseases-training-dataset", path="dataset/", unzip=True)
print("Done! Dataset is ready in ml-service/dataset/")
