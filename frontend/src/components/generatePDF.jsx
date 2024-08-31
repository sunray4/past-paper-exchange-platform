import jsPDF from 'jspdf';

export const generatePDF = async (images) => {
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        
        // Create an image element and wait for it to load
        const image = new Image();
        image.src = img;
        await new Promise((resolve) => {
            image.onload = resolve;
        });

        // Convert image to canvas
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        // Convert canvas to image data URL
        const imgData = canvas.toDataURL('image/jpeg');

        // Add image to PDF
        if (i > 0) {
            pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 size in mm

        // Optional: Add a delay if needed
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const pdfBlob = pdf.output('blob');
    return pdfBlob;
};
