import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import generateUUID from '../utils/uuidKeyGenerator.jsx';
import { generatePDF } from '../utils/generatePDF.jsx';
import { UploadExercise } from '../utils/uploadExercise.jsx';

export default function EditAndShareExercise() {
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [year, setYear] = useState('');
  const [teacher, setTeacher] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imgEdited, setImgEdited] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const canvasRefs = useRef([]);
  const canvasInvsRefs = useRef([]);
  const imgRef = useRef([]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const imgUrls = selectedImages.map(file => URL.createObjectURL(file));
    setImages(imgUrls);
  };

  // Initialize canvas and image elements
  useEffect(() => {
    images.forEach((imgSrc, index) => {
      const canvas = canvasRefs.current[index];
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

        // Calculate the position to center the image in the canvas
        const x = (canvas.width / 2) - (image.width / 2) * scale;
        const y = (canvas.height / 2) - (image.height / 2) * scale;

        // Clear the canvas and draw the scaled image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

        imgRef.current[index] = image;


        const canvasInvs = canvasInvsRefs.current[index];
        const ctx2 = canvasInvs.getContext("2d");
        canvasInvs.width = canvas.width;
        canvasInvs.height = canvas.height;
        ctx2.fillStyle = "white";
        ctx2.fillRect(0, 0, canvasInvs.width, canvasInvs.height);
        canvasInvs.style.visibility = "hidden";
      };

      
    });
  }, [images]);

  const onmousedown = (e, index) => {
    const canvas = canvasRefs.current[index];
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    const element = document.createElement('div');
    element.className = 'rectangle';
    element.style.position = 'absolute';
    element.style.background = "green";
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;
    canvas.parentNode.appendChild(element);

    canvasRefs.current[index].element = { element, startX, startY };
  };

  const onmouseup = (e, index) => {
    const canvas = canvasRefs.current[index];
    const { element, startX, startY } = canvasRefs.current[index].element || {};
    if (!element) return;

    const ctx = canvas.getContext("2d");
    const canvasInvs = canvasInvsRefs.current[index];
    const ctx2 = canvasInvs.getContext("2d");

    const curX = e.nativeEvent.offsetX;
    const curY = e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.rect(startX, startY, curX - startX, curY - startY);
    ctx.stroke();

    ctx2.drawImage(imgRef.current[index], startX, startY, curX - startX, curY - startY, startX, startY, curX - startX, curY - startY);

  };

  const onmousemove = (e, index) => {
    const canvas = canvasRefs.current[index];
    const { element, startX, startY } = canvasRefs.current[index].element || {};
    if (!element) return;

    const curX = e.nativeEvent.offsetX;
    const curY = e.nativeEvent.offsetY;
    element.style.width = `${curX - startX}px`;
    element.style.height = `${curY - startY}px`;
  };

  const applyChanges = (index) => {
    const canvas = canvasRefs.current[index];
    const canvasInvs = canvasInvsRefs.current[index];
    const dataUrl = canvasInvs.toDataURL('image/jpeg', 0.9);

    setImgEdited(prevImgUrls => ([...prevImgUrls, dataUrl]));

    // Remove green boxes
    const parent = canvas.parentNode;
    const boxes = parent.querySelectorAll('.rectangle');
    boxes.forEach(box => parent.removeChild(box));

    canvas.style.visibility = "hidden";
    canvasInvs.style.visibility = "visible";

    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIndex(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = generateUUID();
    const ansPDF = await generatePDF(images);
    const exPDF = await generatePDF(imgEdited);

    try {
      await UploadExercise(key, subject, unit, year, teacher, school, description, exPDF, ansPDF);
      navigate('/'); // Redirect after successful upload
    } catch (error) {
      console.log("Error running upload exercise", error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <div className='text-white rounded-md w-full max-w-md p-6 flex flex-col'>
        <h1 className='text-xl font-bold text-center mb-5'>Upload and Edit Exercise</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='text-base mb-5'>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder='Subject'
              required
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-5'>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder='Unit'
              required
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-5'>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder='Year'
              required
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-5'>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder='Teacher'
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-5'>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder='School'
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-slate-300 text-center'
            />
          </div>
          <div className='text-base mb-5'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description...'
              rows="3"
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-6 text-center'>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className='absolute opacity-0 w-0 h-0'
              required
            />
            <label
              htmlFor="file-input"
              className="w-full bg-[#6459DE] text-white p-2 rounded cursor-pointer hover:bg-[#8B86CA]"
            >
              Choose File
            </label>
          </div>
          <button type="submit" className='w-full bg-[#7481FF] text-white py-2 rounded-md hover:bg-[#8F97E0]'>Submit</button>
        </form>
        <div className='flex flex-wrap justify-center items-center gap-4 mt-5'>
        {images.length > 0 && (
          <div>
            {images.map((imgSrc, index) => (
              <div key={index} className='relative'>
                <canvas
                  ref={el => canvasRefs.current[index] = el}
                  width="500"
                  height="500"
                  style={{ border: '1px solid #000' }}
                  onMouseDown={(e) => onmousedown(e, index)}
                  onMouseUp={(e) => onmouseup(e, index)}
                  onMouseMove={(e) => onmousemove(e, index)}
                />
                <canvas
                  ref={el => canvasInvsRefs.current[index] = el}
                  width="500"
                  height="500"
                  style={{ border: '1px solid #000', position: 'absolute', top: 0, left: 0 }}
                />
                <button onClick={() => applyChanges(index)}>Apply Changes</button>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
