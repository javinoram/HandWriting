import os
import cv2
import numpy as np
from PIL import Image

url = 'datos'
carpetas = os.listdir(url)
labels = []
images = []
dic={'a':0,'ae':1,'b':2,'bb':3, 'ch':4, 'd':5, 'e':6, 'eo':7, 'eu':8,
    'g':9, 'gg':10, 'h':11, 'i':12, 'j':13, 'k':14, 'm':15, 'n':16, 
    'ng':17, 'o':18, 'p':19, 'r':20, 's':21, 'ss':22, 't':23, 'u':24, 
    'ya':25, 'yae':26, 'ye':27, 'yo':28, 'yu':29}

for i,filename in enumerate(carpetas):
    if filename.endswith(".jpg"):
        img = Image.open( url + f"/{filename}" )
        grayscale_img = img.convert('L') 
        resized_img = grayscale_img.resize((64, 64))
        images.append( list(resized_img.getdata()) )
        labels.append( dic[ filename.split('_')[0] ] )


images = np.array( images )
labels = np.array( labels )

np.savez_compressed("korean_images.npz", images )
np.savez_compressed("korean_labels.npz", labels )