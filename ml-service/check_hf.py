import requests

def get_hf_files(repo_id):
    url = f"https://huggingface.co/api/models/{repo_id}/tree/main"
    try:
        r = requests.get(url)
        print(f"\n--- {repo_id} ---")
        if r.status_code == 200:
            for item in r.json():
                print(item['path'], "-", item.get('size', 'unknown'), "bytes")
        else:
            print("Failed:", r.status_code)
    except Exception as e:
        print("Error:", e)

get_hf_files("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")
get_hf_files("ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease")
