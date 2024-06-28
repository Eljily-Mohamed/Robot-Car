import React, { useEffect, useRef, useState } from 'react';

const MapEditorView = () => {
  const canvasRef=useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [recordedDraws, setRecordedDraws] = useState([]);


  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width=window.innerWidth/1.4;
    canvas.height=window.innerHeight;
    canvas.style.width='${window.innerWidth}px';
    canvas.style.height='${window.innerHeight}px';

    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.linecap= 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    contextRef.current = context;
  }, []);

  const startDrawing=({nativeEvent}) => {
    const {offsetX,offsetY}=nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const stopDrawing=() => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw=({nativeEvent}) => {
    if (!isDrawing) return;
    const {offsetX,offsetY}=nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const addRecordedDraw = (offsetX, offsetY) => {
    const currentTime = Date.now();
    const duration = recordStartTime ? currentTime - recordStartTime : 0;
    setRecordedDraws(prevDraws => [
        ...prevDraws,
        { offsetX,offsetY, timestamp: new Date().toISOString(), duration }
    ]);
    setRecordStartTime(currentTime);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setIsDrawing(false);
  };

  return (
    <div>
      <button
        onClick={clearCanvas}
        className={`px-4 py-2 w-50 text-lg bg-green-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-700`}
      >
        Clear Drawing
      </button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>

  );
};

export default MapEditorView;
