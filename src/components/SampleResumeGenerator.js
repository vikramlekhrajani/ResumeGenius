import React, { useState } from 'react';
import { SAMPLE_ATS_RESUME } from '../utils/resumeFormatter';
import '../styles/SampleResumeGenerator.css';

const SampleResumeGenerator = ({ onSampleGenerated }) => {
  const [showSample, setShowSample] = useState(false);

  const handleGenerateSample = () => {
    setShowSample(true);
    onSampleGenerated(SAMPLE_ATS_RESUME);
  };

  return (
    <div className="sample-generator">
      <h2>Create New Resume</h2>
      <p>Generate a sample ATS-friendly resume that you can modify</p>
      
      {!showSample ? (
        <button className="generate-btn" onClick={handleGenerateSample}>
          Generate Sample Resume
        </button>
      ) : (
        <div className="sample-preview">
          <p className="success-message">Sample resume generated! You can now edit it below.</p>
        </div>
      )}
    </div>
  );
};

export default SampleResumeGenerator;
