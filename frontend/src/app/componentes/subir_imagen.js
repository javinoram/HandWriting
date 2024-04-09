'use client'
import React from "react";
export default function SubirDibujo( { handleFileChange } ) {
  const [selectedLanguage, setLanguage] = React.useState("japanese");
  const [selectedFile, setSelectedFile] = React.useState(null);

  function onFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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
          <label htmlFor="images" className="drop-container" id="dropcontainer">
            <span className="drop-title"></span>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={onFileChange}/>
          </label>
        </div>

        <div className="form-group">
          <button className="btn btn-secondary" onClick={send}>Enviar</button>
        </div>
      </form>

      <div id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}
