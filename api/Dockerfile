FROM python:3.10

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

#copiar todos los archivos e instalar librerias
COPY . /code/
RUN pip3 install --no-cache-dir --upgrade -r /code/requirements.txt

EXPOSE 8080

#CMD [ "flask", "--app", "api", "run", "--host=127.0.0.1", "--port=8080"]
CMD [ "python3", "waitress_server.py"]