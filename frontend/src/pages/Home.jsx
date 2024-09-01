import React, { useEffect, useState } from 'react';
import ExerciseCards from '../components/ExerciseCards';

export default function Home() {
    // const [papers, setPapers] = useState([]);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [filteredPapers, setFilteredPapers] = useState([]);

    // useEffect(() => {
    //     const fetchPapers = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/get_papers');
    //             const data = await response.json();
    //             setPapers(data);
    //             setFilteredPapers(papers)
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

    // function handleSearch(searchTerm) {
    //     const searchWords = searchTerm.toLowerCase().split(' ').filter(Boolean);
    //     const filtered = papers.filter(paper => {
    //         const allDescription = `${paper.subject} ${paper.unit} ${paper.year} ${paper.teacher} ${paper.school} ${paper.description}`
    //         return searchWords.every(word => (allDescription.includes(word)))
    //     })

    //     setFilteredPapers(filtered);
    // }

    // useEffect(() => {
    //     if (searchQuery === '') {
    //         setFilteredPapers(papers);
    //     }
    //     else {
    //         handleSearch(searchQuery);
    //     }
    // }, [searchQuery, papers])


    // return (
    //     <div className='flex justify-center'>
    //     <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Search for a past paper from any subject/unit/school/...' value={searchQuery} className='bg-[#ffffff] bg-opacity-20 text-white rounded-xl p-4 m-60 mt-10 mb-10 w-full max-w-[800px]'></input>
    //     {filteredPapers.map((filteredPaper) => {
    //         return <ExerciseCards key={filteredPaper.key} subject={filteredPaper.subject} unit={filteredPaper.unit} year={filteredPaper.year} teacher={filteredPaper.teacher} school={filteredPaper.school} viewEx={handleFileClick(filteredPaper.exercise)} viewAns={handleFileClick(filteredPaper.ans)} />
    //     })}
    //     </div>
    // );
}