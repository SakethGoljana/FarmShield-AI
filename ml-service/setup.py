import os, json

def setup_kaggle_credentials():
    """Write kaggle.json from environment variables"""
    kaggle_dir = os.path.expanduser("~/.kaggle")
    os.makedirs(kaggle_dir, exist_ok=True)
    if "KAGGLE_USERNAME" in os.environ and "KAGGLE_KEY" in os.environ:
        creds = {
            "username": os.environ["KAGGLE_USERNAME"],
            "key": os.environ["KAGGLE_KEY"]
        }
        with open(f"{kaggle_dir}/kaggle.json", "w") as f:
            json.dump(creds, f)
        try:
            os.chmod(f"{kaggle_dir}/kaggle.json", 0o600)
        except:
            pass # Windows chmod might fail or not be needed

def download_datasets():
    """Download datasets only if not already present"""
    os.makedirs("./data", exist_ok=True)
    os.makedirs("./models", exist_ok=True)

    if not os.path.exists("./data/plantvillage"):
        print("Skipping PlantVillage dataset download to avoid Windows zip extraction limits. (Only needed for training anyway)")
        # os.system("kaggle datasets download -d emmarex/plantdisease -p ./data/plantvillage --unzip")

    if not os.path.exists("./data/crop_recommendation.csv"):
        print("Downloading Crop Recommendation dataset...")
        os.system("kaggle datasets download -d atharvaingle/crop-recommendation-dataset -p ./data --unzip")
        print("Crop dataset ready")

def download_models():
    """Download trained models from HuggingFace Hub"""
    repo_id_plant = "YOUR_HF_USERNAME/plant-disease-model"
    
    if "YOUR_HF_USERNAME" in repo_id_plant:
        print("\nSkipping HuggingFace model downloads because 'YOUR_HF_USERNAME' is still in setup.py.")
        print("The ML service will gracefully fall back to 'mock data' for UI testing until you provide real models.\n")
        return

    if not os.path.exists("./models/plant_disease_model.h5"):
        print("Downloading plant disease model...")
        try:
            from huggingface_hub import hf_hub_download
            hf_hub_download(
                repo_id="YOUR_HF_USERNAME/plant-disease-model",
                filename="plant_disease_model.h5",
                local_dir="./models",
                token=os.environ.get("HUGGINGFACE_TOKEN")
            )
            print("Plant disease model ready")
        except Exception as e:
            print(f"Failed to download plant disease model: {str(e)}")

    if not os.path.exists("./models/crop_model.pkl"):
        print("Downloading crop model...")
        try:
            from huggingface_hub import hf_hub_download
            hf_hub_download(
                repo_id="YOUR_HF_USERNAME/crop-recommendation-model",
                filename="crop_model.pkl",
                local_dir="./models",
                token=os.environ.get("HUGGINGFACE_TOKEN")
            )
            print("Crop model ready")
        except Exception as e:
            print(f"Failed to download crop model: {str(e)}")

def run():
    setup_kaggle_credentials()
    download_datasets()
    download_models()
    print("All dependencies ready.")

if __name__ == "__main__":
    run()
