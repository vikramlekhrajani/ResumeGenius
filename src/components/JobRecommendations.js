import React, { useState, useEffect } from 'react';
import '../styles/JobRecommendations.css';

const JobRecommendations = ({ linkedInProfile }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Mock job database - in production, connect to actual job APIs
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120k - $150k',
      description: 'Build scalable web applications with React',
      skills: ['React', 'JavaScript', 'CSS', 'API Design'],
      matchPercentage: 85
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartUp Inc',
      location: 'San Francisco, CA',
      salary: '$100k - $130k',
      description: 'Develop and maintain full stack applications',
      skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
      matchPercentage: 72
    },
    {
      id: 3,
      title: 'UI/UX Developer',
      company: 'Design Studios',
      location: 'New York, NY',
      salary: '$90k - $120k',
      description: 'Create beautiful and responsive user interfaces',
      skills: ['React', 'CSS', 'Design Systems', 'JavaScript'],
      matchPercentage: 68
    },
    {
      id: 4,
      title: 'JavaScript Developer',
      company: 'Web Solutions',
      location: 'Remote',
      salary: '$85k - $110k',
      description: 'Write clean, maintainable JavaScript code',
      skills: ['JavaScript', 'Testing', 'Git', 'APIs'],
      matchPercentage: 65
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Austin, TX',
      salary: '$110k - $140k',
      description: 'Manage cloud infrastructure and deployment',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
      matchPercentage: 55
    }
  ];

  useEffect(() => {
    if (linkedInProfile) {
      generateRecommendations();
    }
  }, [linkedInProfile]);

  const generateRecommendations = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (linkedInProfile && linkedInProfile.skills) {
        // Calculate match percentage based on skill overlap
        const userSkills = linkedInProfile.skills.map(s => s.toLowerCase());
        
        const scoredJobs = mockJobs.map(job => {
          const matchingSkills = job.skills.filter(skill =>
            userSkills.some(userSkill =>
              userSkill.includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(userSkill)
            )
          );
          
          const matchPercentage = Math.round(
            (matchingSkills.length / job.skills.length) * 100
          );
          
          return {
            ...job,
            matchPercentage: Math.max(matchPercentage, 45),
            matchingSkills
          };
        });

        // Sort by match percentage
        const sorted = scoredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setRecommendations(sorted);
      }
      setLoading(false);
    }, 1000);
  };

  const handleApplyJob = (job) => {
    alert(`Applied for: ${job.title} at ${job.company}\n\nIn production, this would redirect to the job application.`);
  };

  const handleShareJob = (job) => {
    const shareText = `Check out this ${job.title} position at ${job.company}!`;
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      alert('Share this job: ' + shareText);
    }
  };

  return (
    <div className="job-recommendations-container">
      <div className="recommendations-header">
        <h3>🎯 Job Recommendations</h3>
        <p>Based on your LinkedIn profile and skills</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding the best job matches for you...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="recommendations-view">
          <div className="jobs-list">
            {recommendations.map(job => (
              <div
                key={job.id}
                className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="job-header">
                  <div className="job-title-section">
                    <h4>{job.title}</h4>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <div className="match-badge">
                    <span className="match-percentage">{job.matchPercentage}%</span>
                    <span className="match-label">Match</span>
                  </div>
                </div>

                <div className="job-meta">
                  <span className="location">📍 {job.location}</span>
                  <span className="salary">💰 {job.salary}</span>
                </div>

                {job.matchingSkills && job.matchingSkills.length > 0 && (
                  <div className="matching-skills">
                    <small>Your skills: {job.matchingSkills.join(', ')}</small>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedJob && (
            <div className="job-detail">
              <h4>{selectedJob.title}</h4>
              <div className="detail-info">
                <p><strong>Company:</strong> {selectedJob.company}</p>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Salary Range:</strong> {selectedJob.salary}</p>
                <p><strong>Match Score:</strong> {selectedJob.matchPercentage}%</p>
              </div>

              <div className="description">
                <h5>Job Description</h5>
                <p>{selectedJob.description}</p>
              </div>

              <div className="required-skills">
                <h5>Required Skills</h5>
                <div className="skills-container">
                  {selectedJob.skills.map((skill, idx) => {
                    const isMatching = selectedJob.matchingSkills.includes(skill);
                    return (
                      <span key={idx} className={`skill ${isMatching ? 'matched' : ''}`}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="apply-btn"
                  onClick={() => handleApplyJob(selectedJob)}
                >
                  Apply Now
                </button>
                <button
                  className="share-btn"
                  onClick={() => handleShareJob(selectedJob)}
                >
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>No job recommendations available. Connect your LinkedIn profile first.</p>
        </div>
      )}

      <div className="recommendations-footer">
        <button
          className="refresh-btn"
          onClick={generateRecommendations}
          disabled={loading}
        >
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  );
};

export default JobRecommendations;
