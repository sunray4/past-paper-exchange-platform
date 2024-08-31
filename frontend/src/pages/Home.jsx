import React, { useEffect, useState } from 'react';
import ExerciseCards from '../components/ExerciseCards';

export default function Home() {
    // const [papers, setPapers] = useState([]);
    // const [selectedFile, setSelectedFile] = useState(null);

    // useEffect(() => {
    //     const fetchPapers = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/get_papers');
    //             const data = await response.json();
    //             setPapers(data);
    //         } catch (error) {
    //             console.error('Error fetching papers:', error);
    //         }
    //     };

    //     fetchPapers();
    // }, []);

    // const handleFileClick = async (filename) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/get_file/${filename}`);
    //         if (response.ok) {
    //             const blob = await response.blob();
    //             const url = URL.createObjectURL(blob);
    //             window.open(url, '_blank');
    //         } else {
    //             console.error('File not found');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching file:', error);
    //     }
    // };


    // return (
    //     papers.map((paper) => {
    //         return <ExerciseCards key={paper.key} subject={paper.subject} unit={paper.unit} year={paper.year} teacher={paper.teacher} school={paper.school} viewEx={handleFileClick(paper.exercise)} viewAns={handleFileClick(paper.ans)} />
    //     })
        
    // );
}