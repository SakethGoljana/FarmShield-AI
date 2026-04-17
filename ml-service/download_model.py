"""Download the rishitdagli TensorFlow2 plant disease model from Kaggle and save it as plant_disease_model.h5"""
import os
import shutil
from dotenv import load_dotenv
load_dotenv()

os.environ["KAGGLE_USERNAME"] = os.environ.get("KAGGLE_USERNAME", "")
os.environ["KAGGLE_KEY"] = os.environ.get("KAGGLE_KEY", "")

import kagglehub

print("Downloading rishitdagli/plant-disease TensorFlow2 model from Kaggle...")
path = kagglehub.model_download("rishitdagli/plant-disease/tensorFlow2/plant-disease")
print(f"Model downloaded to: {path}")

# List what's inside
import glob
files = glob.glob(f"{path}/**/*", recursive=True)
print("Files inside downloaded model:")
for f in files:
    print(" ", f)
    
# Find the SavedModel or .h5 file and copy it to our models/ folder
os.makedirs("models", exist_ok=True)
for f in files:
    if f.endswith('.h5') or f.endswith('.keras'):
        dest = f"models/plant_disease_model.h5"
        shutil.copy2(f, dest)
        print(f"\n✅ Copied model to: {dest}")
        break
else:
    # If it's a SavedModel directory (no single .h5), convert it
    import tensorflow as tf
    saved_model_dirs = [f for f in files if os.path.isdir(f) and 'saved_model.pb' in os.listdir(f)]
    if not saved_model_dirs:
        # Try the root path itself as a SavedModel
        try:
            model = tf.saved_model.load(path)
            print("Loaded as SavedModel. Converting to Keras...")
        except:
            # Could be the path directly
            model = tf.keras.models.load_model(path)
        model.save("models/plant_disease_model.h5")
        print("✅ Converted and saved to models/plant_disease_model.h5")
    else:
        model = tf.keras.models.load_model(saved_model_dirs[0])
        model.save("models/plant_disease_model.h5")
        print(f"✅ Converted SavedModel to: models/plant_disease_model.h5")
