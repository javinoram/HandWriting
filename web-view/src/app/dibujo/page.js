'use client'
import React from "react";

export default function Dibujo() {
  const [selectedLanguage, setLanguage] = React.useState("japanese");

  function send(event){
    event.preventDefault();
    const canvas = canvasRef.current;
    canvas.toBlob( (blob) => {
      if (blob) {

        //Take the canvas and transform it into a .png image
        const file = new File([blob], 'dibujo.png', { type: 'image/png' }); 
        const formData = new FormData();
        formData.append('image', file);

        //Send the form to the API
        const url = 'http://127.0.0.1:5000/' + selectedLanguage;
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

  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [prevX, setPrevX] = React.useState(0);
  const [prevY, setPrevY] = React.useState(0);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const clean = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5; 
    ctx.fillStyle = 'white';
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
            style={{ border: '2px solid black' }}
            onMouseDown={startDrawing} onMouseMove={draw}
            onMouseUp={stopDrawing} onMouseOut={stopDrawing}
          />
        </div>

        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button className="btn btn-outline-primary" onClick={clean}>Clean canvas</button>
          <button className="btn btn-outline-primary" onClick={send}>Send</button>
        </div>
      </form>

      <div className="mb-3" id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}