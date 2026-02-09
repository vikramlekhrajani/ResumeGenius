import React, { useState, useRef } from 'react';
import { convertToATSFriendly, computeATSScore } from '../utils/resumeFormatter';
import { downloadResume, downloadResumePDF } from '../utils/downloadHelper';
import { generateResumeVisualPreview } from '../utils/templatePreviewGenerator';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ onATSGenerated }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewPages, setPreviewPages] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [atsContent, setAtsContent] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('professional');
  const [selectedTab, setSelectedTab] = useState('preview');
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const canvasRef = useRef(null);

  const formats = [
    { id: 'professional', name: 'Professional', icon: '📋' },
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'executive', name: 'Executive', icon: '🎯' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowed = ['application/pdf', 'text/plain'];
      if (allowed.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
        setPreviewMode(false);
      } else {
        setError('Please upload a PDF or TXT file');
        setFile(null);
      }
    }
  };

  const renderPDFPreviews = async (arrayBuffer) => {
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await Promise.race([
        loadingTask.promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('PDF rendering timeout')), 10000)
        )
      ]);
      
      const pages = [];
      // Only render first 3 pages for performance
      const pagesToRender = Math.min(3, pdf.numPages);

      for (let i = 1; i <= pagesToRender; i++) {
        try {
          const page = await pdf.getPage(i);
          const scale = 1.2;
          const viewport = page.getViewport({ scale });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;
          pages.push(canvas.toDataURL('image/png'));
        } catch (pageErr) {
          console.warn(`Failed to render page ${i}`, pageErr);
        }
      }

      if (pages.length > 0) {
        setPreviewPages(pages);
      }
    } catch (err) {
      console.warn('PDF preview rendering skipped:', err.message);
      // Don't throw - this is a non-critical feature
    }
  };

  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await Promise.race([
        loadingTask.promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('PDF text extraction timeout')), 15000)
        )
      ]);

      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + '\n';
        } catch (pageErr) {
          console.warn(`Failed to extract text from page ${i}`, pageErr);
          // Continue with next page
        }
      }
      
      if (!fullText.trim()) {
        throw new Error('No text could be extracted from PDF');
      }
      
      return fullText;
    } catch (err) {
      console.error('PDF text extraction failed', err);
      throw err;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        
        // Extract text first
        const text = await extractTextFromPDF(arrayBuffer);
        setExtractedText(text);
        
        // Convert to ATS format
        const ats = convertToATSFriendly(text);
        setAtsContent(ats);
        
        // Render PDF previews in background (async)
        renderPDFPreviews(arrayBuffer).catch((err) => {
          console.warn('PDF preview rendering failed, proceeding without previews', err);
        });
        
        setPreviewMode(true);
      } else {
        // text/plain
        const text = await file.text();
        setExtractedText(text);
        const ats = convertToATSFriendly(text);
        setAtsContent(ats);
        setPreviewMode(true);
      }
    } catch (err) {
      setError('Error processing file: ' + (err.message || err));
      setPreviewMode(false);
    } finally {
      setUploading(false);
    }
  };

  const getFilename = (format) => {
    if (!file) return 'resume';
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    return format === 'text' 
      ? `${baseName}_ATS-Friendly.txt`
      : `${baseName}_ATS-Friendly.pdf`;
  };

  const handleDownloadText = () => {
    if (atsContent) {
      downloadResume(atsContent, getFilename('text'));
      // Reset form after download
      setTimeout(() => {
        setFile(null);
        setPreviewMode(false);
        setPreviewPages([]);
        setExtractedText('');
        setAtsContent('');
      }, 500);
    }
  };

  const handleDownloadPDF = () => {
    if (atsContent) {
      downloadResumePDF(atsContent, getFilename('pdf'));
      // Reset form after download
      setTimeout(() => {
        setFile(null);
        setPreviewMode(false);
        setPreviewPages([]);
        setExtractedText('');
        setAtsContent('');
      }, 500);
    }
  };

  const handleEdit = () => {
    if (atsContent) {
      onATSGenerated(atsContent, file.name);
    }
  };

  const handleBackToUpload = () => {
    setPreviewMode(false);
    setPreviewPages([]);
    setExtractedText('');
    setAtsContent('');
    setFile(null);
  };

  if (previewMode) {
    const atsResult = computeATSScore(atsContent || extractedText || '');

    return (
      <div className="resume-upload">
        <div className="preview-container">
          <div className="preview-top-bar">
            <button className="back-top-btn" onClick={handleBackToUpload} aria-label="Back to upload">
              ← Back to Upload
            </button>
            <div className="preview-top-controls">
              {selectedTab === 'ats' && (
                <div className="ats-score-badge">ATS Score: {atsResult.score}%</div>
              )}
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${selectedTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('preview')}
                >
                  Preview
                </button>
                <button
                  className={`tab-btn ${selectedTab === 'ats' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('ats')}
                >
                  ATS Score
                </button>
              </div>
            </div>
          </div>
          <h2>Resume Preview</h2>
          <p>Review your resume before converting to ATS format</p>

          {selectedTab === 'preview' && (
            <>
              {previewPages.length > 0 && (
                <div className="pdf-preview-section">
                  <h3>Original Document Preview</h3>
                  <div className="pdf-main-image">
                    <img src={previewPages[selectedPreviewIndex]} alt={`Page ${selectedPreviewIndex + 1}`} className="main-pdf-image" />
                  </div>
                  <div className="thumbnail-row">
                    {previewPages.map((page, idx) => (
                      <img
                        key={idx}
                        src={page}
                        alt={`Page ${idx + 1}`}
                        className={`thumbnail-img ${selectedPreviewIndex === idx ? 'thumbnail-selected' : ''}`}
                        onClick={() => setSelectedPreviewIndex(idx)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="ats-preview-section">
                <div className="format-selector">
                  <h3>Select Resume Format</h3>
                  <div className="format-buttons">
                    {formats.map((format) => (
                      <button
                        key={format.id}
                        className={`format-btn ${selectedFormat === format.id ? 'active' : ''}`}
                        onClick={() => setSelectedFormat(format.id)}
                        title={format.name}
                      >
                        <span className="format-icon">{format.icon}</span>
                        <span className="format-name">{format.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="visual-preview">
                  <h3>Resume Preview</h3>
                  <iframe
                    title="Resume preview"
                    srcDoc={generateResumeVisualPreview(atsContent, selectedFormat)}
                    className="resume-preview-iframe"
                    sandbox="allow-same-origin"
                  />
                </div>

                <div className="edit-text-section">
                  <details>
                    <summary>View/Edit Raw Text</summary>
                    <textarea
                      className="ats-preview-text"
                      value={atsContent}
                      onChange={(e) => setAtsContent(e.target.value)}
                      placeholder="ATS formatted resume"
                    />
                  </details>
                </div>
              </div>
            </>
          )}

          {selectedTab === 'ats' && (
            <div className="ats-score-panel">
              <h3>ATS Analysis</h3>
              <div className="ats-score-large">{atsResult.score}%</div>

              <div className="before-after-grid">
                <div className="before-panel">
                  <h4>Original (Before)</h4>
                  {previewPages.length > 0 ? (
                    <img src={previewPages[selectedPreviewIndex]} alt={`Original page ${selectedPreviewIndex + 1}`} className="compare-image" />
                  ) : (
                    <div className="compare-text-block">
                      <pre className="compare-text">{extractedText || 'No original text available'}</pre>
                    </div>
                  )}
                </div>
                <div className="after-panel">
                  <h4>ATS Result (After)</h4>
                  <div className="compare-visual">
                    <iframe
                      title="ATS visual"
                      srcDoc={generateResumeVisualPreview(atsContent, selectedFormat)}
                      className="compare-iframe"
                      sandbox="allow-same-origin"
                    />
                  </div>
                </div>
              </div>

              <div className="comparison-textareas">
                <div className="comp-col">
                  <h5>Before (extracted)</h5>
                  <textarea readOnly value={extractedText} className="comp-textarea" />
                </div>
                <div className="comp-col">
                  <h5>After (ATS)</h5>
                  <textarea readOnly value={atsContent} className="comp-textarea" />
                </div>
              </div>

              <div className="ats-suggestions">
                <h4>Suggestions</h4>
                <ul>
                  {atsResult.suggestions && atsResult.suggestions.length > 0 ? (
                    atsResult.suggestions.map((s, i) => <li key={i}>{s}</li>)
                  ) : (
                    <li>No suggestions — this looks good.</li>
                  )}
                </ul>
              </div>

              <div className="ats-details">
                <h4>Details</h4>
                <ul>
                  <li>Email Found: {atsResult.details.hasEmail ? 'Yes' : 'No'}</li>
                  <li>Phone Found: {atsResult.details.hasPhone ? 'Yes' : 'No'}</li>
                  <li>LinkedIn Found: {atsResult.details.hasLinkedIn ? 'Yes' : 'No'}</li>
                  <li>Skills Count: {atsResult.details.skillsCount}</li>
                  <li>Experience Entries: {atsResult.details.experienceCount}</li>
                </ul>
              </div>
            </div>
          )}

          <div className="preview-actions">
            <button
              className="download-btn text-download"
              onClick={handleDownloadText}
            >
              📥 Download as TXT
            </button>
            <button
              className="download-btn pdf-download"
              onClick={handleDownloadPDF}
            >
              📄 Download as PDF
            </button>
            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              Edit in Editor
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <p>Upload your existing resume to convert it to ATS-friendly format</p>

      <div className="upload-area">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept=".pdf,.txt"
          disabled={uploading}
        />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Choose PDF or TXT file'}
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Processing...' : 'Convert to ATS Format'}
      </button>
    </div>
  );
};

export default ResumeUpload;
