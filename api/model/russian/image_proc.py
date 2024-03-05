import os
import cv2
import numpy as np
from PIL import Image

url = 'datos/Cyrillic'
carpetas = os.listdir(url)
labels = []
images = []

for i,folder in enumerate(carpetas):
    for j,foto in enumerate(os.listdir(url + f"/{folder}")):
        aux = url + f"/{folder}"
        img = Image.open( aux +f"/{foto}" )
        grayscale_img = img.convert('L')  
        resized_img = grayscale_img.resize((64, 64))
        images.append( list(resized_img.getdata()) )
        labels.append( i )

images = np.array( images )
labels = np.array( labels )

np.savez_compressed("russian_images.npz", images )
np.savez_compressed("russian_labels.npz", labels )