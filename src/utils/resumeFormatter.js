// Utility to convert resume to ATS-friendly format
export const convertToATSFriendly = (resume) => {
  if (!resume || typeof resume !== 'string') return '';

  // Replace smart quotes and non-printable characters
  let text = resume.replace(/[\u2018\u2019\u201C\u201D]/g, "'");
  text = text.replace(/[^\x20-\x7E\n]/g, ''); // keep printable ASCII and newlines

  // Preserve emails, urls, phone-ish patterns; remove unusual punctuation
  // remove sequences of repeated non-alphanumeric characters
  text = text.replace(/\s+$/gm, '');

  // Normalize spacing and trim each line
  const lines = text
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line.length > 0);

  // Collapse multiple heading separators (e.g., ---- or ****)
  const cleaned = lines.map(line => line.replace(/[-*_]{3,}/g, '') ).join('\n');

  // Final sanitization: ensure email/URLs and basic punctuation remain
  const atsResume = cleaned.replace(/[^\w\d\s\-.,@:\/()\[\]#%&+;"'<>?=]/g, '');

  return atsResume;
};

// Sample ATS-friendly resume
export const SAMPLE_ATS_RESUME = `JOHN DOE
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of delivering scalable applications and leading cross-functional teams. Skilled in React, Node.js, and cloud technologies.

TECHNICAL SKILLS
Languages: JavaScript, Python, Java, SQL
Frontend: React, HTML5, CSS3, Redux
Backend: Node.js, Express, Django
Databases: PostgreSQL, MongoDB, MySQL
Tools: Git, Docker, AWS, Jenkins
Other: REST APIs, Agile, Scrum

PROFESSIONAL EXPERIENCE

Senior Software Developer
Tech Company Inc. | New York, NY | Jan 2022 - Present
- Led development of React-based dashboard, improving user engagement by 40%
- Architected microservices using Node.js and Docker, reducing deployment time by 50%
- Mentored junior developers and conducted code reviews for 8+ team members
- Implemented CI/CD pipelines using Jenkins, reducing bug releases by 35%

Software Developer
Digital Solutions LLC | Boston, MA | Jun 2019 - Dec 2021
- Developed and maintained 15+ web applications using React and Node.js
- Built RESTful APIs serving 100k+ daily active users
- Optimized database queries, reducing application load time by 45%
- Collaborated with product managers and designers in agile environment

Junior Developer
StartUp Tech | San Francisco, CA | Jul 2018 - May 2019
- Built responsive web interfaces using React and CSS3
- Contributed to backend API development using Node.js
- Participated in daily stand-ups and sprint planning sessions

EDUCATION

Bachelor of Science in Computer Science
State University | Graduation: May 2018

CERTIFICATIONS
- AWS Certified Solutions Architect Associate
- React Developer Certification

PROJECTS
Resume Builder Application
- Developed full-stack resume application using React and Node.js
- Implemented PDF export functionality
- Deployed on AWS with Docker containerization

Task Management System
- Built collaborative task management tool using React and Firebase
- Real-time database synchronization
- 5000+ downloads on launch

ADDITIONAL
- Languages: English (fluent), Spanish (intermediate)
- Open Source Contributions: Active contributor to popular JavaScript libraries`;

export const SAMPLE_RESUME_JSON = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe'
  },
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of delivering scalable applications and leading cross-functional teams. Skilled in React, Node.js, and cloud technologies.',
  skills: [
    { category: 'Languages', items: 'JavaScript, Python, Java, SQL' },
    { category: 'Frontend', items: 'React, HTML5, CSS3, Redux' },
    { category: 'Backend', items: 'Node.js, Express, Django' },
    { category: 'Databases', items: 'PostgreSQL, MongoDB, MySQL' },
    { category: 'Tools', items: 'Git, Docker, AWS, Jenkins' }
  ],
  experience: [
    {
      jobTitle: 'Senior Software Developer',
      company: 'Tech Company Inc.',
      location: 'New York, NY',
      startDate: 'Jan 2022',
      endDate: 'Present',
      responsibilities: [
        'Led development of React-based dashboard, improving user engagement by 40%',
        'Architected microservices using Node.js and Docker, reducing deployment time by 50%',
        'Mentored junior developers and conducted code reviews for 8+ team members',
        'Implemented CI/CD pipelines using Jenkins, reducing bug releases by 35%'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'State University',
      graduationDate: 'May 2018'
    }
  ]
};
