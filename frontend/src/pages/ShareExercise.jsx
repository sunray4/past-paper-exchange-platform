import React, { useState } from 'react';
import generateUUID from '../utils/uuidKeyGenerator.jsx';
import { generatePDF } from '../utils/generatePDF.jsx';

import { useNavigate } from 'react-router-dom';

export default function ShareExercise() {
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [year, setYear] = useState('');
  const [teacher, setTeacher] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imgEdited, setImgEdited] = useState([]);
  const navigate = useNavigate();

  function handleImageChange(e) {
    const selectedImages = Array.from(e.target.files);
    const imgUrls = selectedImages.map(file => URL.createObjectURL(file));
    setImages(imgUrls);
  }

  // useEffect(() => {
  //   const imageSources = location.state?.imgEdited || [];
  //   setImgEdited(imageSources);
  // }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = generateUUID();
    const ansPDF = await generatePDF(images);

    // Navigate to EditImagePage with the images
    navigate('/edit-image', { state: { images: images, key:key, subject:subject, unit:unit, year:year, teacher:teacher, school:school, description:description, } });
    window.open('/edit-image');

  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <div className='text-white rounded-md w-full max-w-md p-6 flex flex-col'>
        <h1 className='text-xl font-bold text-center mb-5'>Upload a past paper</h1>
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
      </div>
    </div>
  );
}
