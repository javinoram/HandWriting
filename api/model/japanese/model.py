import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Input, Dense, Conv2D, MaxPooling2D, Flatten, Dropout

#Lectura de los datasets
Train_img = np.load('datos/k49-train-imgs.npz')['arr_0']
Train_labels = np.load('datos/k49-train-labels.npz')['arr_0']
Test_img = np.load('datos/k49-test-imgs.npz')['arr_0']
Test_labels = np.load('datos/k49-test-labels.npz')['arr_0']


#Definicion del modelo
model = Sequential()
model.add(Input(shape=(28, 28, 1)))

model.add(Conv2D(32, kernel_size=(3, 3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, kernel_size=(3, 3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(49, activation="softmax"))

#Entrenar modelo
model.compile("adam", loss=tf.keras.losses.SparseCategoricalCrossentropy(), metrics=["accuracy"])
history = model.fit(Train_img, Train_labels, epochs=10, validation_split=0.2)

#Guardar modelo
model.save('model.keras')
print('Model saved!')