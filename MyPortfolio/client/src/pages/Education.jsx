import React from 'react';

export default function Education() {
  const educationData = [
    {
      school: "Centennial College",
      degree: "Software Engineering Technology Advanced Diploma",
      period: "2024 - Present"
    }
  ];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1>Education & Qualifications</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        {educationData.map((item, idx) => (
          <div key={idx} style={{ borderLeft: '4px solid #4A90E2', paddingLeft: '1rem', background: '#f8f9fa', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.degree}</h3>
            <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{item.school}</p>
            <p style={{ margin: 0, color: '#666' }}>{item.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}