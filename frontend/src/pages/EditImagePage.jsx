import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import EditImage from '../components/EditImage';
import { generatePDF } from '../utils/generatePDF';
import { UploadExercise } from '../utils/uploadExercise.jsx';

const EditImagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imgEdited, setImgEdited] = useState([]);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [year, setYear] = useState('');
  const [teacher, setTeacher] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    const imageSources = location.state?.images || [];   
    setImages(imageSources);
    setKey(location.state?.key || '');
    setSubject(location.state?.subject || '');
    setUnit(location.state?.unit || '');
    setYear(location.state?.year || '');
    setTeacher(location.state?.teacher || '');
    setSchool(location.state?.school || '');
    setDescription(location.state?.description || '');

  }, [location.state]);

  useEffect(() => {
    const processPDFs = async () => {
      if (index >= images.length) {
        try {
          const ansPDF = await generatePDF(images);
          const exPDF = await generatePDF(imgEdited);

          await UploadExercise(key, subject, unit, year, teacher, school, description, exPDF, ansPDF);
          navigate('/'); // Redirect after successful upload
        } catch (error) {
          console.log("Error running upload exercise", error);
        }
      }
    };

    processPDFs();
  }, [index, images, imgEdited, key, subject, unit, year, teacher, school, description, navigate]);

  const getNewImgUrl = (newImgUrl) => {
    setImgEdited(prevImgUrls => ([...prevImgUrls, newImgUrl]));
  }

  const trackIndex = (newIndex) => {
    setIndex(newIndex);
  }

  return (
    <div>
      <EditImage imageSources={images} getNewImgUrl={getNewImgUrl} trackIndex={trackIndex} />
    </div>
  );
};

export default EditImagePage;
