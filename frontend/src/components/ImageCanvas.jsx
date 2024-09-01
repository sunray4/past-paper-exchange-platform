import React, { useRef, useEffect } from 'react';

export function ImageCanvas({ imgSrc, index, onmousedown, onmouseup, onmousemove, applyChanges }) {
  const canvasRef = useRef(null);
  const canvasInvsRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      const proportion = image.width / image.height;
      canvas.width = 500;
      canvas.height = 500 / proportion;
      const scaleWidth = canvas.width / image.width;
      const scaleHeight = canvas.height / image.height;
      const scale = Math.min(scaleWidth, scaleHeight);

      const x = (canvas.width / 2) - (image.width / 2) * scale;
      const y = (canvas.height / 2) - (image.height / 2) * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      imgRef.current = image;

      const canvasInvs = canvasInvsRef.current;
      const ctx2 = canvasInvs.getContext("2d");
      canvasInvs.width = canvas.width;
      canvasInvs.height = canvas.height;
      ctx2.fillStyle = "white";
      ctx2.fillRect(0, 0, canvasInvs.width, canvasInvs.height);
      canvasInvs.style.visibility = "hidden";
    };
  }, [imgSrc]);

  return (
    <div className='relative mt-5'>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: '1px solid #000' }}
        onMouseDown={(e) => onmousedown(e, index)}
        onMouseUp={(e) => onmouseup(e, index)}
        onMouseMove={(e) => onmousemove(e, index)}
      />
      <canvas
        ref={canvasInvsRef}
        width="500"
        height="500"
        style={{ border: '1px solid #000', position: 'absolute', top: 0, left: 0 }}
      />
      <button onClick={() => applyChanges(index)} className="w-full bg-[#6459DE] text-white p-2 rounded cursor-pointer hover:bg-[#8B86CA] mt-5">
        Apply Changes
      </button>
    </div>
  );
}
