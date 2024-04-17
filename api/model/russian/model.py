import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Input, Dense, Conv2D, MaxPooling2D, Flatten, Dropout, Convolution2D
from sklearn.model_selection import train_test_split

#Lectura de los datasets
img = np.load('datos/russian_images.npz')['arr_0']
labels = np.load('datos/russian_labels.npz')['arr_0']
Train_img, Test_img, Train_labels, Test_labels = train_test_split(img, labels, test_size=0.1)

Train_img = (Train_img.astype('float32')/255).to_numpy()
Train_labels = (Train_labels.astype('float32')).to_numpy()
Test_img = (Test_img.astype('float32')/255).to_numpy()
Test_labels = (Test_labels.astype('float32')).to_numpy()

Train_img = Train_img.reshape(Train_img.shape[0], 64, 64, 1).astype('float32')
Test_img = Test_img.reshape(Test_img.shape[0], 64, 64, 1).astype('float32')

#Definicion del modelo
model = Sequential()

model.add(Convolution2D(32, (3,3), padding='valid', input_shape=(64, 64, 1), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Convolution2D(128, (3,3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(34))

#Entrenar modelo
model.compile("adam", loss=tf.keras.losses.SparseCategoricalCrossentropy(), metrics="accuracy")
history = model.fit(Train_img, Train_labels, epochs=10, validation_split=0.2)

#Guardar modelo
model.save('model.keras')
print('Model saved!')