// Template preview generator
// This utility creates visual previews of resume templates

export const generateResumeVisualPreview = (resumeContent, format = 'professional') => {
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const getFormatStyles = (format) => {
    const baseStyles = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-size: 10pt;
        line-height: 1.4;
        color: #333;
        background: white;
      }
      .resume-container {
        max-width: 8.5in;
        height: 11in;
        margin: 0 auto;
        padding: 0.5in;
        background: white;
        box-shadow: 0 0 0 1px #ddd;
      }
    `;

    const formatStyles = {
      professional: `
        ${baseStyles}
        .name {
          font-size: 18pt;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.15in;
          text-transform: uppercase;
          letter-spacing: 0.5pt;
        }
        .contact-info {
          font-size: 8.5pt;
          text-align: center;
          margin-bottom: 0.25in;
          color: #555;
          border-bottom: 1px solid #667eea;
          padding-bottom: 0.15in;
        }
        .section {
          margin-bottom: 0.2in;
        }
        .section-header {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 2px solid #667eea;
          padding-bottom: 0.08in;
          margin-bottom: 0.1in;
          letter-spacing: 0.3pt;
          color: #333;
        }
        .job, .item {
          margin-bottom: 0.1in;
        }
        .job-title {
          font-weight: 700;
          font-size: 10pt;
          margin-bottom: 0.02in;
        }
        .job-meta {
          font-size: 9pt;
          color: #666;
          font-style: italic;
          margin-bottom: 0.05in;
        }
        .description {
          font-size: 9pt;
          margin-left: 0.2in;
          margin-bottom: 0.05in;
        }
        ul {
          list-style: none;
          margin-left: 0.2in;
        }
        li {
          margin-bottom: 0.05in;
          font-size: 9pt;
        }
        li:before {
          content: "▪ ";
          margin-right: 0.1in;
          color: #667eea;
        }
        p {
          font-size: 9.5pt;
          margin-bottom: 0.07in;
          line-height: 1.3;
        }
      `,
      technical: `
        ${baseStyles}
        .resume-container {
          background: #f9f9f9;
          border: 1px solid #ccc;
          padding: 0.4in;
        }
        .name {
          font-size: 16pt;
          font-weight: 700;
          text-align: left;
          margin-bottom: 0.05in;
          font-family: 'Courier New', monospace;
          color: #1a1a1a;
        }
        .contact-info {
          font-size: 8pt;
          text-align: left;
          margin-bottom: 0.2in;
          color: #555;
          font-family: 'Courier New', monospace;
          border-left: 2px solid #333;
          padding-left: 0.1in;
        }
        .section {
          margin-bottom: 0.15in;
        }
        .section-header {
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 1px solid #333;
          padding-bottom: 0.05in;
          margin-bottom: 0.08in;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.1pt;
          background: #eee;
          padding: 0.05in 0.08in;
        }
        .job, .item {
          margin-bottom: 0.08in;
        }
        .job-title {
          font-weight: 700;
          font-size: 9pt;
          font-family: 'Courier New', monospace;
        }
        .job-meta {
          font-size: 8pt;
          color: #555;
          font-family: 'Courier New', monospace;
        }
        .description {
          font-size: 8.5pt;
          margin-left: 0.15in;
          font-family: 'Courier New', monospace;
        }
        ul {
          list-style: none;
          margin-left: 0.15in;
        }
        li {
          margin-bottom: 0.04in;
          font-size: 8.5pt;
          font-family: 'Courier New', monospace;
        }
        li:before {
          content: "→ ";
          margin-right: 0.08in;
          color: #333;
        }
        p {
          font-size: 8.5pt;
          margin-bottom: 0.05in;
          line-height: 1.25;
          font-family: 'Courier New', monospace;
        }
      `,
      creative: `
        ${baseStyles}
        .resume-container {
          background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
          padding: 0.6in;
        }
        .name {
          font-size: 20pt;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.05in;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          letter-spacing: 0.5pt;
        }
        .contact-info {
          font-size: 9pt;
          text-align: center;
          margin-bottom: 0.3in;
          color: #667eea;
          border-bottom: 2px dashed #667eea;
          padding-bottom: 0.15in;
          font-weight: 500;
        }
        .section {
          margin-bottom: 0.25in;
        }
        .section-header {
          font-size: 11pt;
          font-weight: 700;
          color: #667eea;
          text-transform: uppercase;
          border-bottom: 2px solid #667eea;
          padding-bottom: 0.1in;
          margin-bottom: 0.12in;
          letter-spacing: 0.4pt;
        }
        .job, .item {
          margin-bottom: 0.12in;
        }
        .job-title {
          font-weight: 700;
          font-size: 10.5pt;
          color: #333;
        }
        .job-meta {
          font-size: 9pt;
          color: #667eea;
          font-weight: 500;
        }
        .description {
          font-size: 9pt;
          margin-left: 0.2in;
          color: #666;
          margin-bottom: 0.08in;
        }
        ul {
          list-style: none;
          margin-left: 0.2in;
        }
        li {
          margin-bottom: 0.06in;
          font-size: 9pt;
          color: #555;
        }
        li:before {
          content: "✦ ";
          margin-right: 0.1in;
          color: #764ba2;
        }
        p {
          font-size: 9.5pt;
          margin-bottom: 0.08in;
          line-height: 1.4;
          color: #555;
        }
      `,
      executive: `
        ${baseStyles}
        .resume-container {
          background: linear-gradient(to bottom, #f5f5f0 0%, #fafaf8 100%);
          padding: 0.7in;
          font-family: Georgia, serif;
        }
        .name {
          font-size: 20pt;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.08in;
          font-family: Georgia, serif;
          color: #1a1a1a;
          letter-spacing: 0.2pt;
        }
        .contact-info {
          font-size: 9pt;
          text-align: center;
          margin-bottom: 0.3in;
          color: #666;
          border-top: 2px solid #333;
          border-bottom: 2px solid #333;
          padding: 0.1in 0;
          font-family: Georgia, serif;
          font-style: italic;
        }
        .section {
          margin-bottom: 0.25in;
        }
        .section-header {
          font-size: 10.5pt;
          font-weight: 700;
          text-transform: uppercase;
          text-align: left;
          border-top: 2px solid #333;
          border-bottom: 1px solid #333;
          padding: 0.08in 0;
          margin-bottom: 0.12in;
          letter-spacing: 0.3pt;
          font-family: Georgia, serif;
          color: #333;
        }
        .job, .item {
          margin-bottom: 0.12in;
        }
        .job-title {
          font-weight: 700;
          font-size: 10pt;
          font-family: Georgia, serif;
          color: #1a1a1a;
        }
        .job-meta {
          font-size: 9pt;
          color: #555;
          font-family: Georgia, serif;
          font-style: italic;
        }
        .description {
          font-size: 9pt;
          margin-left: 0.2in;
          font-family: Georgia, serif;
          color: #666;
          margin-bottom: 0.08in;
        }
        ul {
          list-style: none;
          margin-left: 0.2in;
        }
        li {
          margin-bottom: 0.06in;
          font-size: 9pt;
          font-family: Georgia, serif;
          color: #555;
        }
        li:before {
          content: "• ";
          margin-right: 0.1in;
          color: #333;
        }
        p {
          font-size: 9.5pt;
          margin-bottom: 0.1in;
          line-height: 1.45;
          font-family: Georgia, serif;
          color: #555;
        }
      `
    };

    return formatStyles[format] || formatStyles.professional;
  };

  const parseResume = (content) => {
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    const sections = [];
    let currentSection = { title: 'Summary', items: [] };
    let name = '';
    let contactInfo = '';

    const headingKeywords = /(skills|technical skills|key skills|experience|employment history|employment|professional profile|professional summary|education|projects|certifications|interests|contact|objective)/i;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // detect name (first line or an uppercase line)
      if (!name && (i === 0 || (line === line.toUpperCase() && line.length > 3))) {
        name = line;
        continue;
      }

      // contact info heuristics
      if (!contactInfo && (line.includes('@') || line.match(/\bwww\.|linkedin\.com|http/i) || line.match(/\+?\d{6,}/))) {
        contactInfo = line;
        continue;
      }

      // heading detection by keywords
      const headingMatch = line.match(headingKeywords);
      if (headingMatch) {
        const title = line.toUpperCase();
        currentSection = { title, items: [] };
        sections.push(currentSection);
        continue;
      }

      // if no explicit section yet, push into summary
      if (!sections.length) {
        currentSection.items.push(line);
      } else {
        sections[sections.length - 1].items.push(line);
      }
    }

    if (sections.length === 0 && currentSection.items.length > 0) {
      sections.push(currentSection);
    }

    return { name, contactInfo, sections };
  };

  const parsed = parseResume(resumeContent);

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        ${getFormatStyles(format)}
      </style>
    </head>
    <body>
      <div class="resume-container">
  `;

  if (parsed.name) {
    html += `<div class="name">${escapeHtml(parsed.name)}</div>`;
  }

  if (parsed.contactInfo) {
    html += `<div class="contact-info">${escapeHtml(parsed.contactInfo)}</div>`;
  }

  parsed.sections.forEach((section) => {
    const stitle = section.title || '';
    html += `<div class="section">`;
    html += `<div class="section-header">${escapeHtml(stitle)}</div>`;

    // Skills section - render as list
    if (/skills/i.test(stitle)) {
      const joined = section.items.join(' | ');
      const parts = joined.split(/[,|•\-\u2022]+/).map(p => p.trim()).filter(Boolean);
      html += `<div class="item"><ul>`;
      parts.forEach((p) => { html += `<li>${escapeHtml(p)}</li>`; });
      html += `</ul></div>`;
      html += `</div>`;
      return;
    }

    // Experience / Employment - group into jobs
    if (/experience|employment/i.test(stitle)) {
      const jobs = [];
      let currentJob = null;
      const dateRegex = /\b(\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/i;

      section.items.forEach((line) => {
        if (/Company\s*Name\s*[:|-]/i.test(line) || /Company[:|-]/i.test(line)) {
          if (currentJob) jobs.push(currentJob);
          currentJob = { title: '', company: line.replace(/Company\s*Name\s*[:|-]?/i, '').replace(/Company[:|-]?/i, '').trim(), meta: '', bullets: [] };
          return;
        }

        if (/Designation\s*[:|-]/i.test(line) || /Role\s*[:|-]/i.test(line)) {
          if (!currentJob) currentJob = { title: '', company: '', meta: '', bullets: [] };
          currentJob.title = line.replace(/Designation\s*[:|-]?/i, '').replace(/Role[:|-]?/i, '').trim();
          return;
        }

        if (dateRegex.test(line) || /\bPresent\b|\bto\b|–|-/i.test(line)) {
          if (!currentJob) currentJob = { title: '', company: '', meta: line, bullets: [] };
          else currentJob.meta = currentJob.meta ? `${currentJob.meta} | ${line}` : line;
          return;
        }

        if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
          if (!currentJob) currentJob = { title: '', company: '', meta: '', bullets: [] };
          currentJob.bullets.push(line.replace(/^[-•*]\s?/, '').trim());
          return;
        }

        if (line.length < 80 && /[A-Z][a-z]+/.test(line) && line.split(' ').length < 8 && !line.includes('@')) {
          if (!currentJob) currentJob = { title: line, company: '', meta: '', bullets: [] };
          else if (!currentJob.title) currentJob.title = line;
          else if (!currentJob.company) currentJob.company = line;
          else currentJob.bullets.push(line);
          return;
        }

        if (!currentJob) currentJob = { title: '', company: '', meta: '', bullets: [] };
        currentJob.bullets.push(line);
      });

      if (currentJob) jobs.push(currentJob);

      jobs.forEach((job) => {
        if (job.title) html += `<div class="job-title">${escapeHtml(job.title)}</div>`;
        if (job.company || job.meta) html += `<div class="job-meta">${escapeHtml([job.company, job.meta].filter(Boolean).join(' | '))}</div>`;
        if (job.bullets && job.bullets.length) {
          html += `<div class="description"><ul>`;
          job.bullets.forEach((b) => html += `<li>${escapeHtml(b)}</li>`);
          html += `</ul></div>`;
        }
      });

      html += `</div>`;
      return;
    }

    // Default rendering
    section.items.forEach((item) => {
      if (item.startsWith('-') || item.startsWith('•') || item.startsWith('*')) {
        html += `<div class="description"><li>${escapeHtml(item.substring(1).trim())}</li></div>`;
      } else if (item.match(/^\d{4}/) || item.includes('–') || item.includes('-')) {
        html += `<div class="job-meta">${escapeHtml(item)}</div>`;
      } else if (item.length > 50 || item.includes('•') || item.includes(',')) {
        html += `<div class="description">${escapeHtml(item)}</div>`;
      } else {
        html += `<div class="job-title">${escapeHtml(item)}</div>`;
      }
    });

    html += `</div>`;
  });

  html += `
      </div>
    </body>
    </html>
  `;

  return html;
};

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
