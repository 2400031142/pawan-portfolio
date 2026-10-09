/**
 * Personal Portfolio Data - Narala Pawan
 * Grounded, believable developer content and project specifications.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: 'Narala Pawan',
    title: 'Freelance Web Developer | Full Stack Developer',
    location: 'Rajahmundry, Andhra Pradesh, India',
    bio: 'Web developer based in Rajahmundry, Andhra Pradesh. I build responsive, functional web applications for local businesses and develop software prototypes for academic and engineering projects.',
    interests: [
      'Website development for local Rajahmundry businesses',
      'Full-stack web applications using React, Java, and Spring Boot',
      'Hardware-integrated software & IoT prototypes',
      'Relational database design (MySQL & PostgreSQL)'
    ]
  },

  skills: [
    {
      category: 'Frontend Development',
      items: [
        { name: 'HTML5', level: 'Advanced' },
        { name: 'CSS3 / Flexbox / Grid', level: 'Advanced' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'React', level: 'Intermediate' }
      ]
    },
    {
      category: 'Backend Development',
      items: [
        { name: 'Java', level: 'Intermediate' },
        { name: 'Spring Boot', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Intermediate' }
      ]
    },
    {
      category: 'Databases',
      items: [
        { name: 'SQL', level: 'Advanced' },
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Intermediate' }
      ]
    },
    {
      category: 'Developer Tools',
      items: [
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Figma', level: 'Intermediate' },
        { name: 'Vite / NPM', level: 'Intermediate' },
        { name: 'VS Code', level: 'Advanced' }
      ]
    }
  ],

  qualifications: [
    { title: 'AWS Foundational Certification', issuer: 'Amazon Web Services', status: 'Certified' },
    { title: 'Programming & Technology Coursework', issuer: 'Coursera', status: 'Completed' },
    { title: 'Networking & IT Fundamentals', issuer: 'Cisco', status: 'Completed' }
  ],

  projects: [
    {
      id: 'rfid-door-lock',
      title: 'RFID Door Lock Using NFC Card',
      category: 'hardware',
      categoryLabel: 'IoT Project',
      shortDesc: 'A hardware access-control system using RFID/NFC card UID validation to trigger a 12V solenoid lock mechanism.',
      problem: 'Traditional mechanical keys can be duplicated or lost, making security management difficult for restricted areas.',
      solution: 'Built an embedded controller using an MFRC522 RFID module connected to an Arduino. The controller checks scanned 13.56MHz card UIDs against stored EEPROM records and actuates a 12V solenoid lock via a relay driver.',
      contribution: 'Designed microcontroller logic, implemented EEPROM whitelist storage, wired relay driver circuitry, and added status display outputs.',
      techStack: ['Arduino C++', 'MFRC522 RFID Module', '12V Solenoid Lock', 'Relay Circuit', '16x2 LCD Display'],
      status: 'Academic Hardware Prototype',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'pothole-detection',
      title: 'Pothole Detection System',
      category: 'python',
      categoryLabel: 'Road Safety / Python',
      shortDesc: 'A road surface monitoring system analyzing camera video frames to identify potholes and log GPS coordinates.',
      problem: 'Unmarked road potholes cause vehicle damage and road accidents, making early detection and municipal reporting critical.',
      solution: 'Developed a Python computer-vision script using OpenCV. The algorithm processes video frames using grayscale conversion, Gaussian blur, and contour area analysis to detect surface depressions and record geotagged logs.',
      contribution: 'Written image preprocessing pipeline, configured contour detection parameters, and implemented CSV geotag logging.',
      techStack: ['Python 3', 'OpenCV', 'Image Processing', 'CSV Geotagging'],
      status: 'Software Prototype',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'counterfeit-detection',
      title: 'Counterfeit Detection Using Blockchain',
      category: 'blockchain',
      categoryLabel: 'Blockchain Project',
      shortDesc: 'A supply-chain item verification platform leveraging immutable smart contracts to verify product authenticity.',
      problem: 'Counterfeit consumer products enter supply chains easily when serial numbers can be forged on central databases.',
      solution: 'Explored a decentralized verification workflow where manufacturers register product cryptographic hashes on an Ethereum testnet. Consumers scan product QR codes to verify authenticity directly against the immutable ledger.',
      contribution: 'Constructed Solidity smart contracts for serial hash registration, created Web3 verification functions, and designed frontend verification interface.',
      techStack: ['Solidity', 'Ethereum Testnet', 'Web3.js', 'JavaScript UI', 'QR Code Generator'],
      status: 'Concept & Prototype',
      githubUrl: null,
      liveUrl: null
    },
    {
      id: 'helmet-power-lensed',
      title: 'Helmet with Power-Lensed Visor',
      category: 'engineering',
      categoryLabel: 'Engineering Concept',
      badgeColor: '#10b981',
      shortDesc: 'An optical safety helmet concept integrating corrective power-lensed visor optics for riders with vision errors.',
      problem: 'Riders wearing corrective prescription glasses beneath motorcycle helmets experience discomfort, fogging, and restricted peripheral vision.',
      solution: 'Proposed integrating custom optical power curvature into high-impact polycarbonate helmet visors with UV400 anti-glare coating and quick-release hinges.',
      contribution: 'Researched optical lens integration parameters, visor housing specs, and ergonomic air-flow ventilation channels.',
      techStack: ['Optical Engineering Specs', 'Polycarbonate Optics', 'UV400 Coating', '3D Design Model'],
      status: 'Engineering Concept',
      githubUrl: null,
      liveUrl: null
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
