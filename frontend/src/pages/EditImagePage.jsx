import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import EditImage from '../components/EditImage';


const EditImagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imgEdited, setImgEdited] = useState([]);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    // Retrieve the state from location
    const imageSources = location.state?.images || [];
    setImages(imageSources)

    const processData = async () => {

      while (index < images.length) {
        await new Promise(resolve => setTimeout(resolve, 100)); 
      }

      // Notify Page A and navigate back
      navigate('/share-exercise', { state: { imgEdited : imgEdited } });
    };
    processData();
  }, [index, images, navigate, imgEdited, location.state]);

  // Handle completion of editing and redirect
  useEffect(() => {
    if (index === images.length) {
      localStorage.setItem('editingComplete', 'true');
      navigate('/'); // Redirect to a different route after editing is complete
    }
    
  }, [index]);

  const getNewImgUrl = (newImgUrl) => {
    setImgEdited((prevImgUrls) => ([...prevImgUrls, newImgUrl]));
  }

  const trackIndex = (index) => (setIndex(index));

  return (
    <div>
      <EditImage imageSources={images} getNewImgUrl={getNewImgUrl} trackIndex={trackIndex} />
      {/* <button onClick={handleEditingComplete}>Complete Editing</button> */}
    </div>
  );
};

export default EditImagePage;
