'use client'
import React from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = React.useState(0);
  const [selectedLanguage, setLanguage] = React.useState(0);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleLanguageInputChange(event) {
    setLanguage(event.target.value);
  }

  function send(event){
    event.preventDefault();


    if (selectedFile && selectedLanguage!="none") {
      const data = new FormData();
      data.append('image', selectedFile);

      const url = 'http://127.0.0.1:5000/'+selectedLanguage;
      let result = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        mode: 'cors',
        body: data
      }).then(response => response.json())
      .then(data => {
        document.getElementById("respuesta").innerText = data['result'];
      });
    }
  }


  //Dibujar en pantalla
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [prevX, setPrevX] = React.useState(0);
  const [prevY, setPrevY] = React.useState(0);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

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
      <div id="titular">
        <h1>Bienvenido</h1>
      </div>

      <div id="formulario">
        <form>
        <div class="form-group">
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            style={{ border: '1px solid black' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
        <div class="form-group">
        <select name="languages" id="lang" onChange={handleLanguageInputChange}>
          <option value="none">None</option>
          <option value="japanese">Japanese</option>
          <option value="korean">Korean</option>
          <option value="russian">Russian</option>
        </select>
        </div>
        <div class="form-group">
          <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title"></span>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileInputChange}/>
          </label>
        </div>
        <div class="form-group">
          <button onClick={send}>Enviar</button>
        </div>
        </form>
      </div>

      <div id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}