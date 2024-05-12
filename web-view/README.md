## Main details
The application was done using the Next.js framework with React.

An important detail that I discover when I try to create the web interface is how to link the different components in the navbar. Into the app folder, for each component I need to create a new folder for each component and inside of it create a new javascript file called page. With this, I can link each component without errors.

### Execute in dev enviroment
To execute the web inteface in a dev enviroment, just execute the below command.

```bash
npm run dev
```
This one, will run the interface in the [http://localhost:3000](http://localhost:3000) port.

### Execute in production enviroment
To construct the docker image you can use (you can se the detail in the Dockerfile):
```bash
docker build -t web .
```

After that, you can run the web interface (the docker container) with:
```bash
docker run -p 8080:80 web
```
The nginx server is set up in the port 80 inside the docker, so, after running the container, you should be able to see it in  [http://localhost:8080](http://localhost:8080).

You can find more comments in each file.

