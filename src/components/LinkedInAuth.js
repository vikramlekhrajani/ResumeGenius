import React, { useState } from 'react';
import '../styles/LinkedInAuth.css';

const LinkedInAuth = ({ onProfileFetch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [linkedInProfile, setLinkedInProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLinkedInLogin = () => {
    setLoading(true);
    setError(null);

    // Simulated LinkedIn OAuth flow
    // In production, you would use LinkedIn's OAuth 2.0 API
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/in.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.IN && window.IN.User) {
        window.IN.User.authorize(() => {
          window.IN.API.Raw.me((data) => {
            const profile = {
              firstName: data.firstName.localized.en_US || data.firstName,
              lastName: data.lastName.localized.en_US || data.lastName,
              email: data.email,
              headline: data.headline?.localized?.en_US || data.headline || '',
              skills: data.skills?.values?.map(s => s.skill.name) || [],
              experience: data.experience?.values || [],
              id: data.id
            };
            
            setLinkedInProfile(profile);
            setIsLoggedIn(true);
            onProfileFetch(profile);
            setLoading(false);
          });
        });
      }
    };
    script.onerror = () => {
      setError('Failed to load LinkedIn SDK. Please check your internet connection.');
      setLoading(false);
    };

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script);
    }
  };

  const handleLogout = () => {
    if (window.IN && window.IN.User) {
      window.IN.User.logout(() => {
        setIsLoggedIn(false);
        setLinkedInProfile(null);
      });
    } else {
      setIsLoggedIn(false);
      setLinkedInProfile(null);
    }
  };

  const handleUseProfile = () => {
    if (linkedInProfile) {
      onProfileFetch(linkedInProfile);
    }
  };

  return (
    <div className="linkedin-auth-container">
      <div className="linkedin-card">
        <div className="linkedin-header">
          <h3>🔗 LinkedIn Integration</h3>
          <p>Connect your LinkedIn account to auto-populate your resume</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!isLoggedIn ? (
          <div className="login-section">
            <button
              className="linkedin-login-btn"
              onClick={handleLinkedInLogin}
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Connect LinkedIn Account'}
            </button>
            <p className="info-text">
              Your data is secure. We only access basic profile information.
            </p>
          </div>
        ) : linkedInProfile ? (
          <div className="profile-section">
            <div className="profile-info">
              <h4>Profile Connected</h4>
              <p className="profile-name">
                {linkedInProfile.firstName} {linkedInProfile.lastName}
              </p>
              <p className="profile-headline">{linkedInProfile.headline}</p>
              {linkedInProfile.email && (
                <p className="profile-email">{linkedInProfile.email}</p>
              )}
            </div>

            <div className="profile-data">
              {linkedInProfile.skills && linkedInProfile.skills.length > 0 && (
                <div className="data-section">
                  <h5>Skills ({linkedInProfile.skills.length})</h5>
                  <ul className="skills-list">
                    {linkedInProfile.skills.slice(0, 5).map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                    {linkedInProfile.skills.length > 5 && (
                      <li className="more-skills">
                        +{linkedInProfile.skills.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {linkedInProfile.experience && linkedInProfile.experience.length > 0 && (
                <div className="data-section">
                  <h5>Experience ({linkedInProfile.experience.length})</h5>
                  <ul className="experience-list">
                    {linkedInProfile.experience.slice(0, 3).map((exp, idx) => (
                      <li key={idx}>
                        {exp.title || 'Position'} at {exp.company || 'Company'}
                      </li>
                    ))}
                    {linkedInProfile.experience.length > 3 && (
                      <li className="more-items">
                        +{linkedInProfile.experience.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="button-group">
              <button className="primary-btn" onClick={handleUseProfile}>
                Use This Profile
              </button>
              <button className="secondary-btn" onClick={handleLogout}>
                Disconnect
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LinkedInAuth;
