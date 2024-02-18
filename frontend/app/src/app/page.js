'use client'
import React from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = React.useState(0);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function send(){
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      let result = fetch('http://127.0.0.1:5000', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        mode: 'cors', 
        body: formData,
      })
      alert(result)
    }
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <form>
        <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileInputChange}/>
        <button onClick={send}>Enviar</button>
      </form>
    </div>
  );
}
