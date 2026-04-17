import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

print("Loading expanded dataset...")
data = pd.read_csv('./data/Crop_recommendation_expanded.csv')

X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = data['label']

print("Training Random Forest Classifier on 2200 samples...")
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X, y)

os.makedirs('models', exist_ok=True)
joblib.dump(rf, 'models/crop_model.pkl')
print(f"Model saved successfully to models/crop_model.pkl! It classified {len(rf.classes_)} different crops.")
