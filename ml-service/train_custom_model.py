import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import ReduceLROnPlateau, EarlyStopping
import json, os

# ============================================================
#  HIGH-ACCURACY TRAINING CONFIG
#  Target: 90%+ validation accuracy on 71 plant disease classes
# ============================================================

BATCH_SIZE    = 32
IMG_SIZE      = (160, 160)   # Sweet spot: much better features than 96, faster than 224
PHASE1_EPOCHS = 8            # Phase 1: Train head only (fast warmup)
PHASE2_EPOCHS = 12           # Phase 2: Fine-tune top layers (accuracy boost)
DATASET_DIR   = "dataset/data"

if not os.path.exists(DATASET_DIR):
    print(f"ERROR: Could not find '{DATASET_DIR}'!")
    print(f"Please extract disease image folders into: {os.path.abspath(DATASET_DIR)}")
    exit(1)

# ---- Load Dataset with augmentation ----
print("Loading dataset...")
train_dataset = image_dataset_from_directory(
    DATASET_DIR, validation_split=0.2, subset="training",
    seed=42, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)
val_dataset = image_dataset_from_directory(
    DATASET_DIR, validation_split=0.2, subset="validation",
    seed=42, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)

class_names = train_dataset.class_names
num_classes = len(class_names)
print(f"Detected {num_classes} classes")

os.makedirs('models', exist_ok=True)
with open('models/class_names.json', 'w') as f:
    json.dump(class_names, f)

# ---- Data augmentation layer (built into the model graph) ----
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.15),
    tf.keras.layers.RandomZoom(0.15),
    tf.keras.layers.RandomContrast(0.1),
])

# ---- Prefetch for performance ----
AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
val_dataset   = val_dataset.prefetch(buffer_size=AUTOTUNE)

# ============================================================
#  BUILD MODEL
# ============================================================
print("Building MobileNetV2 with augmentation...")

base_model = MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False   # Freeze for Phase 1

# Model architecture
inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
x = data_augmentation(inputs)
x = tf.keras.applications.mobilenet_v2.preprocess_input(x)  # Proper [-1, 1] scaling
x = base_model(x, training=False)
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.2)(x)
outputs = Dense(num_classes, activation='softmax')(x)

model = Model(inputs, outputs)

# ============================================================
#  PHASE 1: Train the classification head only (fast)
# ============================================================
print(f"\n🚀 PHASE 1: Training head only for {PHASE1_EPOCHS} epochs...")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

callbacks_p1 = [
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, verbose=1),
]

model.fit(
    train_dataset, validation_data=val_dataset,
    epochs=PHASE1_EPOCHS, callbacks=callbacks_p1
)

# ============================================================
#  PHASE 2: Fine-tune top layers of MobileNetV2
# ============================================================
print(f"\n🔥 PHASE 2: Fine-tuning top 50 layers for {PHASE2_EPOCHS} more epochs...")

base_model.trainable = True
# Freeze everything except the top 50 layers
for layer in base_model.layers[:-50]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),  # Lower LR for fine-tuning
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

callbacks_p2 = [
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, verbose=1),
    EarlyStopping(monitor='val_accuracy', patience=4, restore_best_weights=True, verbose=1),
]

model.fit(
    train_dataset, validation_data=val_dataset,
    epochs=PHASE1_EPOCHS + PHASE2_EPOCHS,
    initial_epoch=PHASE1_EPOCHS,
    callbacks=callbacks_p2
)

# ============================================================
#  SAVE
# ============================================================
model.save('models/plant_disease_model.keras')
print(f"\n✅ Training Complete!")
print(f"Model saved to: {os.path.abspath('models/plant_disease_model.keras')}")
print(f"Classes: {num_classes}")

# Also evaluate final accuracy
loss, acc = model.evaluate(val_dataset)
print(f"\n📊 Final Validation Accuracy: {acc*100:.1f}%")
print(f"📊 Final Validation Loss: {loss:.4f}")
