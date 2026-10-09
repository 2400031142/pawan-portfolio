/**
 * Portfolio Data & Content Store - Narala Pawan
 * Grounded, authentic project data with genuine hardware and software specifications.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: 'Narala Pawan',
    title: 'Freelance Web Developer | Full Stack Developer',
    location: 'Rajahmundry, Andhra Pradesh, India',
    bio: 'Web developer based in Rajahmundry with a strong focus on practical full-stack web applications and hardware-integrated software projects. I build custom, responsive websites for local businesses and develop reliable software for college engineering assignments.',
    terminalIntro: [
      'Welcome to Narala Pawan\'s Interactive Terminal v2.4',
      'Type "help" or click any shortcut button below to explore.'
    ],
    interests: [
      'Custom website development for local Rajahmundry businesses',
      'Frontend web applications with React & modern CSS',
      'Full-stack Java & Spring Boot application architecture',
      'Hardware-integrated software & IoT prototypes',
      'Relational database design (MySQL & PostgreSQL)'
    ]
  },

  skills: [
    {
      category: 'Frontend Development',
      icon: '🎨',
      items: [
        { name: 'HTML5', level: 'Advanced' },
        { name: 'CSS3 / Flexbox / Grid', level: 'Advanced' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'React', level: 'Intermediate' }
      ]
    },
    {
      category: 'Backend Development',
      icon: '⚙️',
      items: [
        { name: 'Java', level: 'Intermediate' },
        { name: 'Spring Boot', level: 'Intermediate' },
        { name: 'RESTful API Design', level: 'Intermediate' }
      ]
    },
    {
      category: 'Databases & Storage',
      icon: '🗄️',
      items: [
        { name: 'SQL', level: 'Advanced' },
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Intermediate' }
      ]
    },
    {
      category: 'Tools & Workflows',
      icon: '🛠️',
      items: [
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Figma (UI Layouts)', level: 'Intermediate' },
        { name: 'Vite / NPM', level: 'Intermediate' },
        { name: 'VS Code', level: 'Advanced' }
      ]
    },
    {
      category: 'Certifications & Coursework',
      icon: '📜',
      items: [
        { name: 'AWS Foundational Certification', level: 'Certified' },
        { name: 'Coursera Programming Coursework', level: 'Completed' },
        { name: 'Cisco IT Fundamentals Coursework', level: 'Completed' }
      ]
    }
  ],

  projects: [
    {
      id: 'rfid-door-lock',
      title: 'RFID Door Lock Using NFC Card',
      category: 'hardware',
      categoryLabel: 'IoT & Hardware',
      badgeColor: '#ec4899',
      icon: '🚪',
      shortDesc: 'Wireless door lock security system utilizing NFC/RFID card UID validation and solenoid relay actuation.',
      fullDesc: 'A hardware access-control system designed to replace traditional keys with wireless NFC/RFID cards. The system reads 13.56MHz RFID cards using an MFRC522 module interfaced with an Arduino microcontroller. Authorized UID tags trigger a 12V solenoid lock via a relay driver circuit.',
      techStack: ['Arduino / C++', 'MFRC522 RFID Module', '12V Solenoid Lock', 'Relay Module', '16x2 LCD Display'],
      features: [
        'Instant UID tag scanning via SPI protocol',
        'Master card mode to add or revoke authorized UIDs on EEPROM',
        'Visual status messages on 16x2 LCD display',
        'Audio feedback using piezoelectric buzzer'
      ],
      hardwareSpecs: 'MFRC522 Reader (13.56 MHz), 12V 1A DC Power Supply, 1-Channel Relay Module, Solenoid Bolt Lock.',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'pothole-detection',
      title: 'Pothole Detection System',
      category: 'python',
      categoryLabel: 'Road Safety & Python',
      badgeColor: '#3b82f6',
      icon: '🛣️',
      shortDesc: 'Automated road hazard monitoring system analyzing dashcam video feeds for real-time pothole identification.',
      fullDesc: 'A computer-vision road monitoring concept intended for vehicle dashcams. It processes live or recorded camera frames to identify road surface anomalies and structural potholes, cataloging potential road hazards for municipal maintenance teams.',
      techStack: ['Python 3', 'OpenCV', 'Image Processing', 'CSV Geotagging'],
      features: [
        'Frame-by-frame grayscale conversion & Gaussian blur filtering',
        'Canny edge detection and contour area thresholding',
        'Bounding box overlay on detected road surface depressions',
        'Automated logging of timestamp and GPS coordinates'
      ],
      hardwareSpecs: 'Standard 1080p Dashcam / Webcam, USB Video Class Receiver, Python Runtime Environment.',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'counterfeit-detection',
      title: 'Counterfeit Detection Using Blockchain',
      category: 'blockchain',
      categoryLabel: 'Blockchain & Web3',
      badgeColor: '#8b5cf6',
      icon: '🔗',
      shortDesc: 'Supply-chain item verification platform leveraging immutable smart contracts to eliminate fake goods.',
      fullDesc: 'A decentralized application concept exploring how product authenticity can be verified from manufacturer to consumer. Products are tagged with unique cryptographic hashes stored on a blockchain ledger, preventing tamper attempts.',
      techStack: ['Solidity', 'Ethereum Testnet', 'Web3.js', 'JavaScript UI', 'QR Code Engine'],
      features: [
        'Smart contract minting of unique product serial hashes',
        'QR code generator for physical product packaging',
        'Instant consumer QR scan lookup for provenance verification',
        'Immutable history tracking manufacturer, distributor, and retailer handoffs'
      ],
      hardwareSpecs: 'Ethereum Testnet Nodes, Web3 Browser Extension (MetaMask), QR Code Scanner.',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'helmet-power-lensed',
      title: 'Helmet with Power-Lensed Visor',
      category: 'engineering',
      categoryLabel: 'Engineering Concept',
      badgeColor: '#10b981',
      icon: '🪖',
      shortDesc: 'Ergonomic helmet design incorporating corrective power-lensed visor optics for enhanced rider vision.',
      fullDesc: 'An innovative protective headgear concept addressing optical clarity for motorcycle riders with refractive vision errors. Integrates custom power-lensed optics directly into the helmet visor, reducing the need for spectacles while riding.',
      techStack: ['Optical Engineering', 'Polycarbonate Lens Optics', 'UV400 Coating', '3D CAD Modeling'],
      features: [
        'Custom refractive power curvature integrated into high-impact polycarbonate',
        'Anti-reflective & UV400 protective surface coating',
        'Quick-release visor hinge mechanism for interchangeable lenses',
        'Anti-fog ventilation airflow channels'
      ],
      hardwareSpecs: 'Polycarbonate Optical Grade Resin, Anti-scratch Hydrophobic Coating, DOT-certified Shell Interface.',
      githubUrl: null,
      liveUrl: null
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
