import React from 'react';
import proj1 from '../assets/project1.jpg';
import proj2 from '../assets/project2.jpg';
import proj3 from '../assets/project3.jpg';

export default function Projects() {
  const projects = [
    {
      title: "Real Estate Web Application",
      image: proj1,
      role: "Front-End Developer",
      outcome: "Designed interactive listings pages featuring search filtering, dynamic displays, and custom layout components."
    },
    {
      title: "Pacific Trails Resort Portal",
      image: proj2,
      role: "UI/UX Designer & Web Developer",
      outcome: "Created mobile-responsive user interfaces and styled multi-page layouts focused on resort branding."
    },
    {
      title: "Linux XAMPP Web Stack",
      image: proj3,
      role: "Systems Developer",
      outcome: "Configured Apache and MySQL services inside a Linux virtual machine environment to manage local web form validation."
    }
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
            <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ marginTop: '1rem' }}>{proj.title}</h3>
            <p><strong>Role:</strong> {proj.role}</p>
            <p>{proj.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}