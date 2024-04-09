'use client'
import React from "react";

export default function Dibujo() {
  const [selectedLanguage, setLanguage] = React.useState("japanese");

  function send(event){
    event.preventDefault();
    const canvas = canvasRef.current;
    canvas.toBlob( (blob) => {
      if (blob) {
        const file = new File([blob], 'dibujo.png', { type: 'image/png' }); 
        const formData = new FormData();
        formData.append('image', file);

        const url = 'http://127.0.0.1:5000/' + selectedLanguage;
        fetch(url, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
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
    <div>
      <form>
        <div className="form-group">
          <select className="form-select" name="languages" id="lang" onChange={setLanguage}>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="russian">Russian</option>
          </select>
        </div>

        <div className="form-group">
          <canvas ref={canvasRef} width={300} height={300}
            style={{ border: '3px solid black' }}
            onMouseDown={startDrawing} onMouseMove={draw}
            onMouseUp={stopDrawing} onMouseOut={stopDrawing}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-secondary" onClick={clean}>Clean canvas</button>
          <button className="btn btn-secondary" onClick={send}>Send</button>
        </div>
      </form>

      <div id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}
