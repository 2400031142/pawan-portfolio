/**
 * Portfolio Data File - Narala Pawan
 * Centralized data store for personal profile, skills, certifications, and featured projects.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: 'Narala Pawan',
    title: 'Freelance Web Developer | Full Stack Developer',
    location: 'Rajahmundry, Andhra Pradesh, India',
    bio: 'Passionate and practical web developer dedicated to building responsive, user-friendly frontend interfaces and robust full-stack applications for local businesses and academic projects.',
    interests: [
      'Website development',
      'Frontend development',
      'Full-stack development',
      'Building practical web applications',
      'Freelance website development for local businesses'
    ]
  },

  skills: [
    {
      category: 'Frontend Development',
      icon: '🎨',
      items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React']
    },
    {
      category: 'Backend Development',
      icon: '⚙️',
      items: ['Java', 'Spring Boot']
    },
    {
      category: 'Databases & Storage',
      icon: '🗄️',
      items: ['SQL', 'MySQL', 'PostgreSQL']
    },
    {
      category: 'Tools & Workflow',
      icon: '🛠️',
      items: ['Git', 'GitHub', 'Figma', 'Vite', 'VS Code']
    },
    {
      category: 'Additional Learning & Certifications',
      icon: '📜',
      items: [
        'AWS Foundational Certification',
        'Coursera Coursework (Programming & Technology)',
        'Cisco Coursework (Networking & IT Fundamentals)'
      ]
    }
  ],

  projects: [
    {
      id: 'rfid-door-lock',
      title: 'RFID Door Lock Using NFC Card',
      category: 'IoT Project',
      badgeColor: '#ec4899',
      icon: '🚪',
      description: 'A hardware-integrated security system implementing wireless NFC card access control for electronic door lock mechanisms.',
      details: 'Designed logic for reading NFC card UID tags, processing validation logic, and triggering electromagnetic relays.',
      githubUrl: null, // Editable: set to repository link when available
      liveUrl: null
    },
    {
      id: 'pothole-detection',
      title: 'Pothole Detection System',
      category: 'Python / Road-Safety',
      badgeColor: '#3b82f6',
      icon: '🛣️',
      description: 'A road monitoring system designed for dashcam integration to identify road potholes and safety hazards in real-time.',
      details: 'Explores image processing techniques to detect surface anomalies and catalog geographic locations for municipal repair.',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'counterfeit-detection',
      title: 'Counterfeit Detection Using Blockchain',
      category: 'Blockchain Project',
      badgeColor: '#8b5cf6',
      icon: '🔗',
      description: 'A supply-chain verification system exploring blockchain immutability to prevent product counterfeiting.',
      details: 'Tracks item provenance using unique cryptographic signatures recorded on a decentralized ledger.',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'helmet-power-lensed',
      title: 'Helmet with Power-Lensed Visor',
      category: 'Engineering Concept',
      badgeColor: '#10b981',
      icon: '🪖',
      description: 'An innovative helmet concept integrating custom power-lensed visor optics for enhanced rider vision and protection.',
      details: 'Combines ergonomic optical lens design with protective headgear specifications for improved contrast and clarity.',
      githubUrl: null,
      liveUrl: null
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
