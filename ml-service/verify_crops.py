import joblib
import numpy as np

# Load model
m = joblib.load('models/crop_model.pkl')
classes = list(m.classes_)

# Shimla Inputs
data = {'N':300, 'P':50, 'K':220, 'temperature':15, 'humidity':70, 'pH':5.8, 'rainfall':1700}
features = [[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['pH'], data['rainfall']]]

# 1. Get raw ML probabilities
probs = m.predict_proba(features)[0]
print(f"Raw Top Match: {classes[np.argmax(probs)]} ({np.max(probs)*100:.1f}%)")

# 2. Apply Heuristics
TROPICAL_CROPS = ['tobacco', 'sugarcane', 'rice', 'banana', 'coconut', 'coffee', 'papaya', 'cotton']
HILL_CROPS = ['apple', 'potato', 'barley', 'pea', 'cabbage', 'cauliflower', 'plum']

temp = data['temperature']
if temp < 18:
    print(f"--- Applying Cold Filter (Temp={temp}) ---")
    for crop in TROPICAL_CROPS:
        if crop in classes:
            idx = classes.index(crop)
            # print(f"Erasing {crop} at index {idx}")
            probs[idx] = 0.00001

if temp < 20:
    print(f"--- Applying Hill Boost ---")
    for crop in HILL_CROPS:
        if crop in classes:
            idx = classes.index(crop)
            probs[idx] *= 10.0

# Normalize
probs = probs / np.sum(probs)
top_idx = np.argsort(probs)[-3:][::-1]

print("\n--- Final Hybrid Recommendations ---")
for idx in top_idx:
    print(f"{classes[idx]}: {probs[idx]*100:.1f}%")
