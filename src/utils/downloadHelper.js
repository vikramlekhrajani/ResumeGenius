// Utility function to download resume as text file
export const downloadResume = (content, filename = 'ATS-Friendly-Resume.txt') => {
  try {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  } catch (error) {
    console.error('Error downloading text file:', error);
    alert('Error downloading file. Please try again.');
  }
};

// Utility function to download resume as PDF using HTML to PDF conversion
export const downloadResumePDF = async (content, filename = 'ATS-Friendly-Resume.pdf') => {
  try {
    // Dynamic import of html2pdf
    const html2pdf = (await import('html2pdf.js')).default;

    // Create HTML content for PDF
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.fontSize = '11px';
    element.style.lineHeight = '1.5';
    element.style.whiteSpace = 'pre-wrap';
    element.style.wordWrap = 'break-word';
    
    element.textContent = content;

    // PDF options
    const opt = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // Generate and download PDF
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: Download as text
    downloadResume(content, filename.replace('.pdf', '.txt'));
    alert('PDF generation failed. Downloaded as text file instead.');
  }
};

// Utility function to copy resume to clipboard
export const copyToClipboard = (content) => {
  try {
    navigator.clipboard.writeText(content);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

