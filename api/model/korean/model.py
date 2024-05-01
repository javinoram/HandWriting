import numpy as np
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Input, Dense, Conv2D, MaxPooling2D, Flatten
from sklearn.model_selection import train_test_split

#Lectura de los datasets
images = np.load('datos/korean_images.npz')['arr_0']
labels = np.load('datos/korean_labels.npz')['arr_0']

Train_img, Test_img, Train_labels, Test_labels = train_test_split(images, labels, test_size=0.1)
Train_img = (Train_img.astype('float32')/255)
Train_labels = (Train_labels.astype('float32'))
Test_img = (Test_img.astype('float32')/255)
Test_labels = (Test_labels.astype('float32'))

#Definicion del modelo
model = Sequential()
model.add(Input(shape=(64, 64, 1)))
model.add(Conv2D(32, kernel_size=(3, 3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, kernel_size=(3, 3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
#Layer with the different number of available combinations
model.add(Dense(2350, activation="softmax"))

#Entrenar modelo
model.compile("adam", loss=tf.keras.losses.SparseCategoricalCrossentropy(), metrics="accuracy")
history = model.fit(Train_img, Train_labels, epochs=10, validation_split=0.2)

#Guardar modelo
model.save('model.keras')
print('Model saved!')