import pandas as pd
import numpy as np
import os

# New crops to add with their mean NPK/Environmental values
# Source: General agricultural standards for Indian conditions
NEW_CROP_PROFILES = {
    'wheat':     {'N': 100, 'P': 45, 'K': 35, 'temp': 22, 'hum': 45, 'ph': 6.5, 'rain': 80,  'std': 10},
    'barley':    {'N': 60,  'P': 30, 'K': 30, 'temp': 18, 'hum': 40, 'ph': 7.0, 'rain': 50,  'std': 8},
    'potato':    {'N': 80,  'P': 60, 'K': 150, 'temp': 20, 'hum': 60, 'ph': 5.8, 'rain': 110, 'std': 12},
    'sugarcane': {'N': 140, 'P': 60, 'K': 80, 'temp': 28, 'hum': 75, 'ph': 6.5, 'rain': 250, 'std': 15},
    'sunflower': {'N': 60,  'P': 50, 'K': 40, 'temp': 25, 'hum': 60, 'ph': 6.8, 'rain': 70,  'std': 10},
    'soybean':   {'N': 30,  'P': 60, 'K': 50, 'temp': 26, 'hum': 70, 'ph': 6.5, 'rain': 90,  'std': 10},
    'mustard':   {'N': 50,  'P': 40, 'K': 30, 'temp': 15, 'hum': 50, 'ph': 6.5, 'rain': 40,  'std': 7},
    'tobacco':   {'N': 100, 'P': 30, 'K': 120, 'temp': 25, 'hum': 65, 'ph': 5.5, 'rain': 100, 'std': 12},
    'turmeric':  {'N': 60,  'P': 50, 'K': 100, 'temp': 28, 'hum': 85, 'ph': 6.0, 'rain': 180, 'std': 15},
    'ginger':    {'N': 50,  'P': 40, 'K': 80, 'temp': 26, 'hum': 85, 'ph': 6.0, 'rain': 170, 'std': 15},
    'pea':         {'N': 30, 'P': 60, 'K': 30, 'temp': 15, 'hum': 65, 'ph': 6.8, 'rain': 50, 'std': 10},
    'cabbage':     {'N': 120, 'P': 60, 'K': 60, 'temp': 18, 'hum': 75, 'ph': 6.5, 'rain': 65, 'std': 12},
    'cauliflower': {'N': 100, 'P': 50, 'K': 50, 'temp': 18, 'hum': 75, 'ph': 6.5, 'rain': 65, 'std': 12},
    'plum':        {'N': 40, 'P': 30, 'K': 60, 'temp': 20, 'hum': 68, 'ph': 6.0, 'rain': 100, 'std': 15},
    'tomato':      {'N': 100, 'P': 80, 'K': 80, 'temp': 24, 'hum': 70, 'ph': 6.5, 'rain': 100, 'std': 12},
    'onion':       {'N': 120, 'P': 50, 'K': 50, 'temp': 20, 'hum': 60, 'ph': 6.8, 'rain': 80, 'std': 12},
    'chilli':      {'N': 100, 'P': 60, 'K': 60, 'temp': 25, 'hum': 65, 'ph': 6.5, 'rain': 80, 'std': 12},
    'okra':        {'N': 80, 'P': 50, 'K': 50, 'temp': 28, 'hum': 70, 'ph': 6.5, 'rain': 100, 'std': 10},
    'brinjal':     {'N': 100, 'P': 60, 'K': 60, 'temp': 25, 'hum': 65, 'ph': 6.5, 'rain': 100, 'std': 12},
    'bajra':       {'N': 50, 'P': 30, 'K': 20, 'temp': 30, 'hum': 45, 'ph': 7.5, 'rain': 40, 'std': 8},
    'jowar':       {'N': 60, 'P': 40, 'K': 30, 'temp': 30, 'hum': 50, 'ph': 7.0, 'rain': 50, 'std': 8},
    'ragi':        {'N': 40, 'P': 40, 'K': 30, 'temp': 25, 'hum': 65, 'ph': 6.5, 'rain': 70, 'std': 10},
    'spinach':     {'N': 100, 'P': 30, 'K': 30, 'temp': 15, 'hum': 60, 'ph': 6.5, 'rain': 50, 'std': 10},
    'carrot':      {'N': 50, 'P': 80, 'K': 100, 'temp': 18, 'hum': 65, 'ph': 6.5, 'rain': 70, 'std': 12},
    'radish':      {'N': 40, 'P': 60, 'K': 80, 'temp': 15, 'hum': 60, 'ph': 6.5, 'rain': 60, 'std': 10},
    'coriander':   {'N': 60, 'P': 40, 'K': 30, 'temp': 20, 'hum': 65, 'ph': 6.5, 'rain': 50, 'std': 8},
    'bitter_gourd': {'N': 80, 'P': 60, 'K': 60, 'temp': 28, 'hum': 75, 'ph': 6.5, 'rain': 120, 'std': 12},
    'garlic':      {'N': 100, 'P': 60, 'K': 60, 'temp': 18, 'hum': 60, 'ph': 6.5, 'rain': 70, 'std': 12},
    'guava':       {'N': 60,  'P': 60, 'K': 40, 'temp': 26, 'hum': 70, 'ph': 6.5, 'rain': 120, 'std': 15},
    'mentha':      {'N': 180, 'P': 80, 'K': 80, 'temp': 28, 'hum': 70, 'ph': 6.5, 'rain': 150, 'std': 15},
    'poplar':      {'N': 300, 'P': 100, 'K': 150, 'temp': 25, 'hum': 60, 'ph': 7.0, 'rain': 120, 'std': 20},
    'hybrid_maize':{'N': 220, 'P': 80, 'K': 80, 'temp': 28, 'hum': 65, 'ph': 6.5, 'rain': 100, 'std': 15},
    'berseem':     {'N': 40,  'P': 100, 'K': 40, 'temp': 18, 'hum': 60, 'ph': 7.2, 'rain': 80, 'std': 12},
}

def generate_samples(count_per_crop=100):
    all_data = []
    for crop, p in NEW_CROP_PROFILES.items():
        # Generate random samples using Normal distribution around the mean
        n = np.random.normal(p['N'], p['std'], count_per_crop).clip(0, 200)
        p_val = np.random.normal(p['P'], p['std'], count_per_crop).clip(0, 200)
        k = np.random.normal(p['K'], p['std'], count_per_crop).clip(0, 200)
        t = np.random.normal(p['temp'], 3, count_per_crop)
        h = np.random.normal(p['hum'], 5, count_per_crop).clip(0, 100)
        ph = np.random.normal(p['ph'], 0.5, count_per_crop).clip(3, 10)
        r = np.random.normal(p['rain'], 20, count_per_crop).clip(0, 400)
        
        for i in range(count_per_crop):
            all_data.append([n[i], p_val[i], k[i], t[i], h[i], ph[i], r[i], crop])
            
    df_new = pd.DataFrame(all_data, columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label'])
    return df_new

# Load original data
original_path = 'd:/CAPSTONE_KisaanMitra/ml-service/data/Crop_recommendation.csv'
df_orig = pd.read_csv(original_path)

# Generate new data
df_new = generate_samples(100)

# Merge
df_merged = pd.concat([df_orig, df_new], ignore_index=True)

# Save
output_path = 'd:/CAPSTONE_KisaanMitra/ml-service/data/Crop_recommendation_expanded.csv'
df_merged.to_csv(output_path, index=False)

print(f"Dataset successfully expanded!")
print(f"Original crops: {len(df_orig['label'].unique())}")
print(f"New crops added: {list(NEW_CROP_PROFILES.keys())}")
print(f"Total crops now: {len(df_merged['label'].unique())}")
print(f"Total samples: {len(df_merged)}")
