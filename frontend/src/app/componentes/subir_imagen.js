'use client'
import React from "react";

export default function SubirDibujo( { handleFileChange } ) {

  function onFileChange(event) {
    const file = event.target.files[0];
    handleFileChange(file);
  }

  return (
    <div>
      <label htmlFor="images" className="drop-container" id="dropcontainer">
        <span className="drop-title"></span>
        <input type="file" accept=".jpg,.png,.jpeg" onChange={onFileChange}/>
      </label>
    </div>
  );
}
