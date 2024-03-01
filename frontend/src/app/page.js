'use client'
import React from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = React.useState(0);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function send(event){
    event.preventDefault();

    if (selectedFile) {
      const data = new FormData();
      data.append('image', selectedFile);

      const url = 'http://127.0.0.1:5000';

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

  return (
    <div>
      <div id="titular">
        <h1>Bienvenido</h1>
      </div>

      <div id="formulario">
        <form>
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
