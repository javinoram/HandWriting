'use client'
import React from 'react';
import Dibujo from "./dibujo.js";
import SubirDibujo from "./subir_imagen.js";

const TabComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedLanguage, setLanguage] = React.useState("japanese");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const tabComponents = [Dibujo, SubirDibujo];

  const changeTab = (index) => {
    setActiveTab(index);
  };
  function handleLanguageInputChange(event) {
    setLanguage(event.target.value);
  };
  function handleFileChange(file) { // Función para actualizar el archivo seleccionado
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
  }

  return (
    <div>
      <div id="titular">
        <h1>Bienvenido</h1>
      </div>
      <div className="d-flex gap-2 justify-content-center py-5">
        <button className={`btn btn-primary d-inline-flex align-items-center ${activeTab === 0 && 'active'}`} 
          onClick={() => changeTab(0)}>Draw word</button>
        <button className={`btn btn-primary d-inline-flex align-items-center ${activeTab === 1 && 'active'}`} 
          onClick={() => changeTab(1)}>Upload a image</button>
      </div>

      <form>
        <div className="form-group">
          <select className="form-select" name="languages" id="lang" onChange={handleLanguageInputChange}>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="russian">Russian</option>
          </select>
        </div>

        <div>
          {React.createElement(tabComponents[activeTab], {handleFileChange})}
        </div>

        <div className="form-group">
          <button className="btn btn-secondary" onClick={send} disabled={activeTab === 0}>Enviar</button>
        </div>
      </form>

      <div id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
};

export default TabComponent;
