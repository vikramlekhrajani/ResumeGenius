// Template preview generator
// This utility creates visual previews of resume templates

export const generateTemplatePreview = (templateName) => {
  const previews = {
    default: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: white; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="margin: 0 0 5px 0; font-size: 24px;">JOHN DOE</h2>
      <p style="margin: 0 0 15px 0; font-size: 12px;">john.doe@email.com | (555) 123-4567</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; border-bottom: 2px solid #667eea; padding-bottom: 4px;">PROFESSIONAL SUMMARY</h3>
      <p style="margin: 0 0 15px 0; font-size: 12px;">Experienced software engineer with 5+ years expertise in full-stack development.</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; border-bottom: 2px solid #667eea; padding-bottom: 4px;">TECHNICAL SKILLS</h3>
      <p style="margin: 0 0 15px 0; font-size: 12px;">Languages: JavaScript, Python, Java, SQL. Frontend: React, HTML5, CSS3.</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; border-bottom: 2px solid #667eea; padding-bottom: 4px;">EXPERIENCE</h3>
      <p style="margin: 0 0 3px 0; font-size: 12px; font-weight: 600;">Senior Software Developer - Tech Company</p>
      <p style="margin: 0 0 8px 0; font-size: 11px; color: #666;">Jan 2022 - Present</p>
      <ul style="margin: 0 0 15px 0; padding-left: 20px; font-size: 12px;">
        <li>Led development of React dashboard</li>
        <li>Architected microservices using Node.js</li>
      </ul>
    </div>
  `,
    technical: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: white; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="margin: 0 0 5px 0; font-size: 24px; color: #1a1a1a;">JOHN DOE</h2>
      <p style="margin: 0 0 15px 0; font-size: 12px;">john.doe@email.com | GitHub: github.com/johndoe</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; border-bottom: 3px solid #333; padding-bottom: 4px; font-weight: 700;">TECHNICAL STACK</h3>
      <table style="width: 100%; font-size: 12px;">
        <tr>
          <td style="margin-bottom: 8px; padding: 0 10px 8px 0;"><strong>Languages:</strong> JavaScript, Python, Java</td>
          <td style="margin-bottom: 8px;"><strong>Cloud:</strong> AWS, Docker</td>
        </tr>
        <tr>
          <td style="margin-bottom: 8px; padding: 0 10px 8px 0;"><strong>Frontend:</strong> React, TypeScript</td>
          <td><strong>DevOps:</strong> CI/CD, Kubernetes</td>
        </tr>
      </table>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; border-bottom: 3px solid #333; padding-bottom: 4px; font-weight: 700;">PROJECTS</h3>
      <p style="margin: 0 0 3px 0; font-size: 12px; font-weight: 600;">✓ Microservices Architecture (Node.js, Docker)</p>
      <p style="margin: 0 0 12px 0; font-size: 11px; color: #666;">Built scalable backend serving 1M+ requests/day</p>
    </div>
  `,
    creative: `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0 0 8px 0; font-size: 26px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">JANE SMITH</h2>
        <p style="margin: 0; font-size: 12px; color: #667eea;"><strong>Product Designer</strong></p>
      </div>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; color: #667eea; font-weight: 700;">DESIGN EXPERTISE</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
        <span style="background: #667eea; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px;">UI/UX Design</span>
        <span style="background: #764ba2; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px;">Figma</span>
        <span style="background: #667eea; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px;">Prototyping</span>
      </div>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 13px; color: #667eea; font-weight: 700;">SELECTED WORK</h3>
      <p style="margin: 0 0 8px 0; font-size: 12px;">🎨 Mobile App Redesign - Improved usability by 45%</p>
    </div>
  `,
    executive: `
    <div style="font-family: Georgia, serif; padding: 25px; background: #f5f5f5; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="margin: 0 0 8px 0; font-size: 26px; text-align: center;">MICHAEL JOHNSON</h2>
      <p style="margin: 0 0 20px 0; font-size: 13px; text-align: center; color: #666; font-style: italic;">Operations Director | Executive Leadership</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #333; padding-bottom: 4px;">EXECUTIVE PROFILE</h3>
      <p style="margin: 0 0 15px 0; font-size: 12px; line-height: 1.6;">Strategic leader with 15+ years driving organizational growth and operational excellence across Fortune 500 companies.</p>
      
      <h3 style="margin: 15px 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #333; padding-bottom: 4px;">CORE COMPETENCIES</h3>
      <p style="margin: 0 0 15px 0; font-size: 12px;">Strategic Planning • P&L Management • Change Leadership • Team Development</p>
    </div>
  `
  };

  return previews[templateName] || previews.default;
};

export const getTemplateInfo = (templateName) => {
  const templates = {
    default: {
      name: 'Professional',
      description: 'Clean professional template',
      icon: '📋',
      features: ['ATS-optimized', 'Clean layout', 'Easy to read']
    },
    technical: {
      name: 'Technical',
      description: 'Designed for tech professionals',
      icon: '💻',
      features: ['Skills matrix', 'Tech stack', 'Project highlights']
    },
    creative: {
      name: 'Creative',
      description: 'For designers and creatives',
      icon: '🎨',
      features: ['Visual design', 'Color-coded', 'Portfolio-ready']
    },
    executive: {
      name: 'Executive',
      description: 'For leadership positions',
      icon: '🎯',
      features: ['Professional tone', 'Impact-focused', 'Executive summary']
    }
  };

  return templates[templateName] || templates.default;
};
