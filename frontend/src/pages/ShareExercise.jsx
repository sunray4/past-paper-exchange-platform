import React, { useState } from 'react';
import generateUUID from '../components/uuidKeyGenerator';

export default function ShareExercise() {
  
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [year, setYear] = useState('');
  const [teacher, setTeacher] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const key = generateUUID();
    const formData = { key, subject, unit, year, teacher, school, description };
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data sent successfully');
      } else {
        console.error('Failed to send form data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error in submitting your response. Please try again.")
    }

    setSubject('');
    setUnit("");
    setYear("");
    setTeacher("");
    setSchool("");
    setDescription("");
    setFile([]);
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
              placeholder='Year'
              onChange={(e) => setYear(e.target.value)}
              required
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>

          <div className='text-base mb-5'>
            <input
              type="text"
              value={teacher}
              placeholder='Teacher'
              onChange={(e) => setTeacher(e.target.value)}
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>

          <div className='text-base mb-5'>
            <input
              type="text"
              value={school}
              placeholder='School'
              onChange={(e) => setSchool(e.target.value)}
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-slate-300 text-center'
            />
          </div>

          <div className='text-base mb-5'>
            <textarea
              value={description}
              placeholder='Description...'
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
            />
          </div>
          <div className='text-base mb-6 text-center'>
            <input
              type="file"
              id="file-input"
              onChange={(e) => setFile(Array.from(e.target.files))}
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
