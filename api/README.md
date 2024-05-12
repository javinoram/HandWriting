## Main details
The API just have one route, this route get two items, the image of the word and the tag to see which model choose.

### Routes
The api, just have one route ```/predict```, where the image with the language is send to be predicted.

### Execute in dev enviroment
To run the api, just execute the ```api.py```, or the ```waitress_server.py```.

### Execute in production enviroment
To construct the docker image you can use (you can se the detail in the Dockerfile):
```bash
docker build -t api-ml .
```

After that, you can run the api (the docker container) with:
```bash
docker run -p 8080:8080 api-ml
```

You can find more comments in each file.
