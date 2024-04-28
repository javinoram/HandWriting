'use client'
import React from "react";

export default function Dibujo() {
  const [selectedLanguage, setLanguage] = React.useState("japanese");

  //Canvas variables
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [prevX, setPrevX] = React.useState(0);
  const [prevY, setPrevY] = React.useState(0);

  /*Function to make the background of the image white.
  Solution from https://stackoverflow.com/questions/36736829/how-can-i-set-the-canvas-background-before-downloading*/
  function whiteBrackground (canvas) {
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /*Function to download the canvas as a .png image */
  function Download (event){
    event.preventDefault();
    const canvas = canvasRef.current;
    whiteBrackground(canvas);

    canvas.toBlob( (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.png';
        a.click();
      }
    })
  };

  /*Function to send the canvas as a .png image 
  this is done creating a blob and File object*/
  function send(event){
    event.preventDefault();
    const canvas = canvasRef.current;
    whiteBrackground(canvas);

    canvas.toBlob( (blob) => {
      if (blob) {

        //Take the canvas and transform it into a .png image
        const file = new File([blob], 'dibujo.png', { type: 'image/png' }); 
        const formData = new FormData();
        formData.append('image', file);
        formData.append('language', selectedLanguage);

        //Send the form to the API
        const url = 'http://127.0.0.1:5000/predict';
        fetch(url, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          //Take the response and show it in the page
          document.getElementById("respuesta").innerText = data['result'];
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
      }
    }, 'image/png');
  };
  
  const startDrawing = (e) => {
    setIsDrawing(true);
    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const clean = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="container-sm px-3 text-center">
      <form>
      <div className="mb-3">
          <select className="form-select" name="languages" id="lang" onChange={setLanguage}>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="russian">Russian</option>
          </select>
        </div>

        <div className="mb-3">
          <canvas id="responsive-canvas" ref={canvasRef} width={600} height={300}
            style={{ border: '2px solid black', backgroundColor: 'white'}}
            onMouseDown={startDrawing} onMouseMove={draw}
            onMouseUp={stopDrawing} onMouseOut={stopDrawing} onBlur={stopDrawing}
          />
        </div>

        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button className="btn btn-outline-primary" onClick={clean}>Clean canvas</button>
          <button className="btn btn-outline-primary" onClick={send}>Send</button>
          <button className="btn btn-outline-primary" onClick={Download}>Descargar</button>
        </div>
      </form>

      <div className="mb-3" id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}