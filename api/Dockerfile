FROM tensorflow/tensorflow:latest
WORKDIR /code

#copiar todos los archivos e instalar librerias
COPY . /code/
RUN pip install --upgrade pip setuptools wheel
RUN pip3 install --no-cache-dir -r /code/requirements.txt

EXPOSE 8081
CMD [ "python3", "waitress_server.py"]
