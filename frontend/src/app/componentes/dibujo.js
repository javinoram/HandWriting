'use client'
import React from "react";

export default function Dibujo( { handleFileChange } ) {

  const [DrawFile, setDraw] = React.useState(0);

  const save_image = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png'); // Convierte el contenido del canvas en una imagen PNG
    // Guarda la imagen en la variable de estado
    setDraw(dataURL);
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
        <div>
            <canvas
                ref={canvasRef}
                width={300}
                height={500}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />
        </div>
        <div>
        <button className="btn btn-secondary" onClick={clean}>Clean canvas</button>
        <button className="btn btn-secondary" onClick={save_image}>Save image</button>
        </div>
    </div>
  );
}
