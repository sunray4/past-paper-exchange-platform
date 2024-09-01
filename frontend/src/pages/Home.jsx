import React, { useEffect, useState } from 'react';
import ExerciseCards from '../components/ExerciseCards';

export default function Home() {
    const [papers, setPapers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPapers, setFilteredPapers] = useState([]);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get-papers');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                setPapers(data);
                setFilteredPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, []);

    const handleExFileClick = async (key) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/download/${key}/ex`);
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };
    const handleAnsFileClick = async (key) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/download/${key}/ans`);
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };
    

    function handleSearch(searchTerm) {
        const searchWords = searchTerm.toLowerCase().split(' ').filter(Boolean);
        const filtered = papers.filter(paper => {
            const allDescription = `${paper.subject} ${paper.unit} ${paper.year} ${paper.teacher} ${paper.school} ${paper.description}`
            return searchWords.every(word => (allDescription.includes(word)))
        })

        setFilteredPapers(filtered);
    }

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredPapers(papers);
        }
        else {
            handleSearch(searchQuery);
        }
    }, [searchQuery, papers])


    return (
        <div className='flex flex-col justify-center'>
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Search for a past paper from any subject/unit/school/...' value={searchQuery} className='bg-[#ffffff] bg-opacity-20 text-white rounded-xl p-4 mt-10 mb-10 w-2/3 max-w-[800px] mx-auto'></input>
        {filteredPapers.map((filteredPaper) => {
            return <ExerciseCards key={filteredPaper.key} subject={filteredPaper.subject} unit={filteredPaper.unit} year={filteredPaper.year} teacher={filteredPaper.teacher} school={filteredPaper.school} description={filteredPaper.description} viewEx={() => handleExFileClick(filteredPaper.key)} viewAns={() => handleAnsFileClick(filteredPaper.key)} />
        })}
        </div>
    );
}