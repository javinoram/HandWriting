from flask import Flask
from flask import request
import pandas as pd
import numpy as np
import tensorflow as tf
from PIL import Image

#Caracteres del hiragana y informacion extra
caracteres = pd.read_csv('model/k49_classmap.csv')
size = (28,28)

#Function to modify the image to be used for the neural network
def pre_processing_images(img, size):
    image = Image.open(img).convert("L")
    image = Image.eval(image, lambda x: 255 - x)
    image = image.resize(size)
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

#Function to evaluate the image
def evaluate(img, model):
    global caracteres, size
    post_image = pre_processing_images(img, size)
    print("uwu")
    y = model.predict( post_image )
    return caracteres['char'][ y.argmax(axis=1)[0] ]



#Base de la aplicacion
app = Flask(__name__)

#ruta base
@app.route("/", methods=['GET'])
def prediccion():
    if request.method == 'GET':
        try:
            img = request.files['image']
            model = tf.keras.models.load_model('model/charactermodels.h5')
            pred = evaluate(img, model)
            return {'result': pred, 'error': ''}
        except:
            return {'result': None, 'error': 'Error in the process'}
        