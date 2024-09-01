// ImageContext.js
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [imgEdited, setImgEdited] = useState([]);

    const getNewImgUrl = (newImgUrl) => {
        setImgEdited((prevImgUrls) => [...prevImgUrls, newImgUrl]);
    };

    return (
        <ImageContext.Provider value={{ imgEdited, getNewImgUrl }}>
        {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = () => useContext(ImageContext);
