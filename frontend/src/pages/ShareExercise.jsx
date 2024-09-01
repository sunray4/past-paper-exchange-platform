import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import generateUUID from '../utils/uuidKeyGenerator.jsx';
import { generatePDF } from '../utils/generatePDF.jsx';
import { UploadExercise } from '../utils/uploadExercise.jsx';
import { FormInput } from '../components/FormInput.jsx';

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
  const submitButtonRef = useRef(null);

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
        // Get device pixel ratio for high-DPI screens
        const ratio = window.devicePixelRatio || 1;
        const proportion = image.width / image.height;
  
        // // Set canvas dimensions considering device pixel ratio
        canvas.width = 500 * ratio;
        canvas.height = (canvas.width / proportion);
  
        const scaleWidth = canvas.width / image.width;
        const scaleHeight = canvas.height / image.height;
        const scale = Math.min(scaleWidth, scaleHeight);

        // Calculate the position to center the image in the canvas
        const x = (canvas.width / 2) - (image.width / 2) * scale;
        const y = (canvas.height / 2) - (image.height / 2) * scale;

        // Clear the canvas and draw the scaled image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
  
        // Draw the image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height );
  
        imgRef.current[index] = image;
  
        const canvasInvs = canvasInvsRefs.current[index];
        const ctx2 = canvasInvs.getContext("2d");
        canvasRefs.current[index].start = true;
        // Set dimensions and clear the invisible canvas
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
    const canvasInvs = canvasInvsRefs.current[index];
    const ctx = canvas.getContext("2d");
    const ctx2 = canvasInvs.getContext("2d");

    const curX = e.nativeEvent.offsetX;
    const curY = e.nativeEvent.offsetY;
    const element = document.createElement('div');
    element.className = 'rectangle';
    element.style.position = 'absolute';
    element.style.background = "rgba(0, 128, 0, 0.5)";
    element.style.left = `${curX}px`;
    element.style.top = `${curY}px`;
    canvas.parentNode.appendChild(element);
    
    canvasRefs.current[index].start = !canvasRefs.current[index].start;

    if (canvasRefs.current[index].start) {
      const { element:element, curX:startX, curY:startY } = canvasRefs.current[index].elementBool;
      console.log('Start Coordinates:', startX, startY);
      console.log('Current Coordinates:', curX, curY);

      ctx.beginPath();
      ctx.rect(startX, startY, curX - startX, curY - startY);
      ctx.stroke();

      try {
        // Retrieve image data and put it on the invisible canvas
        const imageData = ctx.getImageData(startX, startY, curX - startX, curY - startY);
        ctx2.putImageData(imageData, startX < curX ? startX : curX, startY < curY ? startY : curY);
      } catch (error) {
          console.error('Error retrieving image data:', error);
      }

      }
      else {
        canvasRefs.current[index].elementBool = { element, curX, curY };
      }
      canvasRefs.current[index].element = { element, curX, curY };
    };

    const onmouseup = async (e, index) => {
      const canvas = canvasRefs.current[index];
      // const canvasInvs = canvasInvsRefs.current[index];
      
      // // Declare startX and startY outside the block
      // let startX, startY;
  
      //     // Assign startX and startY from the element
      const {element, curX:startX, curY:startY} = canvasRefs.current[index].element;
  
  
      if (!canvas) return;
  
      const ctx = canvas.getContext("2d");
      // const ctx2 = canvasInvs.getContext("2d");
  
      const curX = e.nativeEvent.offsetX;
      const curY = e.nativeEvent.offsetY;
      
      console.log('MouseUp Start Coordinates:', startX, startY);
      console.log('MouseUp Current Coordinates:', curX, curY);
  
      // setPassCoordinates((prevC) => ([...prevC, {x:curX, y:curY}]));
  
      // if (passCoordinates.length % 2 == 0 && passCoordinates.length > 1) {
      //   const width = Math.abs(curX - passCoordinates[passCoordinates.length - 2].x);
      //   const height = Math.abs(curY - passCoordinates[passCoordinates.length - 2].y);
  
      //   // Check if the dimensions are valid
      //   if (width <= 0 || height <= 0) {
      //       console.error('Invalid width or height for getImageData.');
      //       return;
      //   }
  
        ctx.beginPath();
        ctx.rect(startX, startY, curX - startX, curY - startY);
        ctx.stroke();
  
      //   try {
      //       // Retrieve image data and put it on the invisible canvas
      //       const imageData = ctx.getImageData(passCoordinates[passCoordinates.length - 2].x, passCoordinates[passCoordinates.length - 2].y, width, height);
      //       ctx2.putImageData(imageData, passCoordinates[passCoordinates.length - 2].x, passCoordinates[passCoordinates.length - 2].y);
      //   } catch (error) {
      //       console.error('Error retrieving image data:', error);
      //   }
      // }
  
      
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
      // const parent = canvas.parentNode;
      // const boxes = parent.querySelectorAll('.rectangle');
      // boxes.forEach(box => parent.removeChild(box));
  
      canvas.style.visibility = "hidden";
      canvasInvs.style.visibility = "visible";
  
      // const ctx = canvas.getContext('2d');
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIndex(index + 1);
    };
     

    const handleSubmitButtonClick = () => {
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    };
  //   const savePDFToRepo = async (pdfBlob) => {
  //     const fileName = 'yourPDFName.pdf';
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(pdfBlob);
  //     link.download = fileName;
  //     link.click();
  //     URL.revokeObjectURL(link.href);
  // };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const key = generateUUID();
      console.log(images);
      console.log(imgEdited);
      const ansPDF = await generatePDF(images);
      const exPDF = await generatePDF(imgEdited);
  
      console.log(ansPDF);
      console.log(exPDF);
      // savePDFToRepo(exPDF);
  
      try {
        await UploadExercise(key, subject, unit, year, teacher, school, description, exPDF, ansPDF);
        alert("Your exercise has been successfully uploaded. Thank you for your submission!")
        navigate('/'); // Redirect after successful upload
      } catch (error) {
        console.log("Error running upload exercise", error);
      }
    };


  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <div className='text-white rounded-md w-full max-w-md p-6 flex flex-col'>
        <h1 className='text-xl font-bold text-center mb-5'>Upload A Past Paper</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
        <FormInput value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
          <FormInput value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" required />
          <FormInput value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
          <FormInput value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="Teacher" />
          <FormInput value={school} onChange={(e) => setSchool(e.target.value)} placeholder="School" />
          <div className='text-base mb-5'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description...'
              rows="3"
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center shadow-lg shadow-black-500/40'
            />
          </div>
          <div className='text-base text-center'>
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
              className="w-full bg-[#6459DE] text-white p-2 rounded cursor-pointer hover:bg-[#8B86CA] shadow-lg shadow-black-500/40"
            >
              Choose File
            </label>
          </div>
          <button ref={submitButtonRef} type="submit" className='hidden'>Submit</button>
        </form>
        <div className='flex flex-wrap justify-center items-center gap-4 mt-5'>
          
        {images.length > 0 && (         
          <div className=' mt-5 mb-5'>
            <p className='w-full text-white w-full m-4 text-center mt-0'>Please <span className='font-semibold text-[#FDF99F]'>select all questions and supplementary figures</span> in each image by <span className='font-semibold text-[#FDD29F]'>right-clicking on the top left corner & bottom right corner </span>  consecutively. Select <span className='font-bold text-[#FD9F9F]'>Apply Changes</span> after selecting all questions on the image. <span className='font-bold text-[#FD9FF9]'>Submit</span> after applying changes to all images.</p>
            {images.map((imgSrc, index) => (
              <div key={index} className='relative mt-5'>
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
                 <button onClick={() => applyChanges(index)} className="w-full bg-[#6459DE] text-white p-2 rounded cursor-pointer hover:bg-[#8B86CA] mt-5">Apply Changes</button>
              </div>
            ))}
          </div>
        )}
        </div>
        <button onClick={handleSubmitButtonClick} type="submit" className='w-full bg-[#7481FF] text-white py-2 rounded-md hover:bg-[#8F97E0] shadow-lg shadow-black-500/40'>Submit</button>
      </div>
      
    </div>
  );
}
