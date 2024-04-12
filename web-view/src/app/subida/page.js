'use client'
import React from "react";
export default function SubirDibujo() {
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
      data.append('language', selectedLanguage);
      console.log(data)
      const url = 'http://127.0.0.1:5000/predict';
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
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    }
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
          <label htmlFor="images" className="form-label" id="dropcontainer">The image must be .jpg, .png or .jpeg</label>
          <input className="form-control" type="file" accept=".jpg,.png,.jpeg" onChange={onFileChange}/>
        </div>

        <div className="mb-3">
          <button className="btn btn-outline-primary" onClick={send}>Send</button>
        </div>
      </form>

      <div className="mb-3" id="response">
        <h1 id="respuesta"></h1>
      </div>
    </div>
  );
}
