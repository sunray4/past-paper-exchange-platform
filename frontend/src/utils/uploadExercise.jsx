export const UploadExercise = async (key, subject, unit, year, teacher, school, description, exPDF, ansPDF) => {
    const formData = new FormData();
    // formData.append('file', pdfBlob, 'doc.pdf'); //`${key}.pdf`

    formData.append('key', key);
    formData.append('subject', subject);
    formData.append('unit', unit);
    formData.append('year', year);
    formData.append('teacher', teacher);
    formData.append('school', school);
    formData.append('description', description);
    try {
        formData.append('exPDF', exPDF, `${key}-Ex.pdf`);
    } catch {
        console.log('Invalid exPDF');
        return;
    }
    try {
        formData.append('ansPDF', ansPDF, `${key}-Ans.pdf`);
    } catch {
        console.log('Invalid ansPDF');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            body: formData 
        });

        if (response.ok) {
            console.log('Form data sent successfully');
        } else {
            console.error('Failed to send form data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error in submitting your response. Please try again.");
    }
};
