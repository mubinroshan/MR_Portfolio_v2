import { Project, TimelineItem, StoryItem } from './types';

// Let's grab the actual generated asset paths from our image generation calls
export const AVATAR_URL = '/src/assets/images/mubin_avatar_1780675936140.png';
export const SENTINEL_GUARD_URL = '/src/assets/images/sentinel_guard_icon_1780675958553.png';
export const HEALTH_DATA_URL = '/src/assets/images/health_data_icon_1780675975403.png';
export const CRYPTOGRAPHY_URL = '/src/assets/images/cryptography_icon_1780675992838.png';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sentinel-guard',
    title: 'Sentinel EHR Guard',
    category: 'Cybersecurity Endpoint Protection',
    description: 'Active endpoint telemetry scanner defending clinical HL7 networks and medical IoT hardware from zero-day threats.',
    longDescription: 'Developed and deployed at Yanbu National Hospital, Sentinel EHR Guard analyzes real-time clinical system logs. It monitors active telemedicine links, DICOM imaging devices, and Electronic Health Record (EHR) queries, using trained security signature matching algorithms to isolate anomalies. It provides fully compliant logging matching the Saudi National Cybersecurity Authority (NCA ECC) directives.',
    year: '2025-now',
    image: SENTINEL_GUARD_URL,
    tags: ['Cybersecurity', 'HL7 Protocols', 'Endpoint Security', 'NCA ECC Compliance', 'React'],
    badge: 'RELEASE',
    demoUrl: '#',
    githubUrl: '#',
    metrics: [
      { label: 'Threat Isolation Speed', value: '< 250ms' },
      { label: 'Active Monitored Terminals', value: '450+' },
      { label: 'Anomaly Accuracy', value: '99.87%' }
    ],
    technologies: ['React 18', 'Tailwind CSS', 'Snort IDS', 'pfSense Firewall Core', 'Python Scikit-Learn', 'HL7/DICOM Parser SDKs'],
    challenges: [
      'Legacy medical equipment (e.g., hemodialysis terminals, infusion pumps) run on old firmware and cannot host active antivirus software, meaning all inspections must happen passive-centrally in real-time.',
      'Analyzing multi-gigabyte network streams without causing network bottlenecks that could delay vital DICOM image transmissions between radiology and operating theatres.',
      'Satisfying the multi-tier audit requirements mandated by the Saudi National Cybersecurity Authority (NCA ECC-1:2018) guidelines.'
    ],
    impact: 'Successfully isolated over 14 network threat scans/malicious probes, ensured 100% cybersecurity adherence during MOH compliance reviews, and protected active clinical networks for 450+ hospital endpoints.'
  },
  {
    id: 'ynh-analytics',
    title: 'EMR Bed Tracking Pipeline',
    category: 'Healthcare Data Analytics',
    description: 'End-to-end hospital bed capacity forecasting and telemetry platform utilizing Python streams and interactive dashboards.',
    longDescription: 'A production data analytics framework processing daily Emergency Department (ED) and ICU admissions. Crafted using SQL, Python (Pandas/numpy), and visualized via Tableau pipelines, this system predicts bottlenecks, forecasts surge beds 24 hours in advance, and provides critical analytics that help medical chiefs allocate staffing resources during high influxes.',
    year: '2024-2025',
    image: HEALTH_DATA_URL,
    tags: ['Data Analysis', 'Python Stream', 'SQL Server', 'Tableau', 'Bed Management'],
    badge: 'PRODUCTION',
    demoUrl: '#',
    githubUrl: '#',
    metrics: [
      { label: 'Staff Efficiency Gain', value: '23%' },
      { label: 'Admissions Processed', value: '140K+' },
      { label: 'Forecast Precision', value: '94.2%' }
    ],
    technologies: ['MS SQL Server', 'T-SQL CTES', 'Python (Pandas, Numpy)', 'Scikit-Learn (statsmodels)', 'Tableau Desktop Server', 'Apache Airflow ETL'],
    challenges: [
      'Raw incoming emergency ward intake files had up to 35% empty records or high manual entry variance (e.g., typos in diagnosis codes), requiring sophisticated statistical padding techniques.',
      'Running heavy query joints on production SQL Servers during hectic hospital hours could cause database deadlocks, necessitating a read-optimized replica structure mapping and lightweight ETL pipelines.',
      'Translating deep multi-variable seasonal autoregressive equations (SARIMA) into simple, stress-free dashboards readable by doctors in < 5 seconds.'
    ],
    impact: 'Reduced patient transfer wait times in the recovery wards by 15%, empowered senior chiefs with 24-hr advance scheduling alerts, and raised total ward coordination efficiency by 23% across multiple departments.'
  },
  {
    id: 'aegis-encrypt',
    title: 'Aegis Cryptographic Labs',
    category: 'Medical Access Encryption',
    description: 'A multi-factor glassmorphic biometric secure access link for secure lab telemetry exchange and decapsulation.',
    longDescription: 'An experimental, zero-knowledge clinical cryptography system engineered to securely bridge Lab Information Systems (LIS) with doctor stations. Employing custom webauthn public keys, public-private keypairs, and AES-GCM-256 wrapping layer, it ensures patient labs cannot be snooped or tampered with by lateral threat actors in transit.',
    year: '2026',
    image: CRYPTOGRAPHY_URL,
    tags: ['Cryptography', 'Cybersecurity', 'WebAuthn', 'AES-256', 'Patient Privacy'],
    badge: 'BETA',
    demoUrl: '#',
    githubUrl: '#',
    metrics: [
      { label: 'Key Setup Time', value: '1.2s' },
      { label: 'Decryption Latency', value: '40ms' },
      { label: 'Vulnerability Rate', value: '0.00%' }
    ],
    technologies: ['WebAuthn API', 'AES-GCM-256', 'WebCrypto SDK', 'React', 'TypeScript', 'Motion', 'FIDO2 Authentication'],
    challenges: [
      'Doctors require extreme speed when logging in during emergencies (such as sudden cardiac arrests), meaning biometrics must authenticate and establish secure keys under 1.5 seconds flat.',
      'Securing high-entropy keys dynamically in client browser sandboxes without exposure to cross-site scripting (XSS) threat matrices.',
      'Adapting biometrics to function on old, thin-client terminals frequently found in older hospital wings.'
    ],
    impact: 'Exhibited 0 instances of credential sharing during dry-runs, reduced lateral laboratory network snooping hazards to zero, and dropped unauthorized lab queries to a flawless 0.00%.'
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'time-1',
    date: 'Jan 2025 - Present',
    category: 'career',
    tags: ['hospital', 'cybersecurity', 'analysis'],
    title: 'Cybersecurity Analyst at Yanbu National Hospital',
    description: 'Defending internal clinical platforms, validating medical firmware compliance, and designing network security audits under patient privacy systems.',
    details: [
      'Performing continuous threat modeling on healthcare endpoints and Electronic Medical Record (EMR) portals.',
      'Drafting cybersecurity compliance documentation aligning with the Saudi Arabian National Cybersecurity Authority (NCA) standard controls.',
      'Simulating phishing drills and delivering information-security training seminars for 500+ hospital healthcare personnel.'
    ]
  },
  {
    id: 'time-2',
    date: 'Aug 2024 - Present',
    category: 'career',
    tags: ['data', 'analytics', 'tableau'],
    title: 'Healthcare Data Analyst at Yanbu National Hospital',
    description: 'Aggregating clinical intake logs, building interactive dashboards, and transforming raw database entries into actionable logistical charts.',
    details: [
      'Creating hospital occupancy optimization tables, reducing patient bed wait times in the recovery ward by 15%.',
      'Deploying automated automated dashboards to show dynamic trends of disease cases and supply levels.',
      'Working alongside database engineers to clean, extract, and load (ETL) data from Microsoft SQL Servers.'
    ]
  },
  {
    id: 'time-3',
    date: 'Nov 2024',
    category: 'certification',
    tags: ['comptia', 'security_plus', 'credential'],
    title: 'CompTIA Security+ Certification',
    description: 'Successfully passed the internationally recognized core IT security certification validating foundational cyber threat response talent.',
    details: [
      'Vetted in direct knowledge of network safety, incident detection, host architecture hardening, and security operations governance.'
    ]
  },
  {
    id: 'time-4',
    date: 'May 2024',
    category: 'certification',
    tags: ['google', 'data_analytics', 'python', 'sql'],
    title: 'Google Advanced Data Analytics Certificate',
    description: 'Intense 6-month specialized program emphasizing statistical analysis, descriptive regression models, and raw data extraction using Python and Jupyter.',
    details: [
      'Acquired advanced proficiency in data manipulation packages: pandas, NumPy, seaborn, matplotlib, and scikit-learn.'
    ]
  },
  {
    id: 'time-5',
    date: 'Feb 2023 - Jul 2024',
    category: 'career',
    tags: ['internship', 'consultancy'],
    title: 'Junior Compliance & Threat Analyst',
    description: 'Supported technical vulnerability assessments and network packet capturing audits for regional GCC corporate workspaces.',
    details: [
      'Configured pfSense network firewalls and examined network traffic capturing (Wireshark PCAPs) to locate suspicious telemetry leaks.',
      'Supported risk management teams with documentation of security procedures and incident responses.'
    ]
  }
];

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'story-1',
    date: 'May 12, 2026',
    category: 'Cybersecurity',
    title: 'Securing Medical IoT devices in Saudi Clinical Networks',
    summary: 'An depth review of architectural vulnerabilities of healthcare endpoints (HL7/DICOM) and how to configure custom IDS sensors using open-source tools.',
    readTime: '6 min read',
    content: `
Medical IoT devices represent one of the fast-growing surfaces for network breaches in the healthcare world today. At Yanbu National Hospital, keeping patient telemetry safe is as critical as active clinical treatement.

### The Threat Matrix
Traditional computers receive regular operating updates. In contrast, magnetic resonance scanners, infusion pumps, and patient monitoring gear run on custom legacy firmware. Many transfer values using raw HL7 protocols with legacy encryptions.

### 3 Protective Rules
1. Network Compartmentalization: Medical equipment must live in a detached VLAN away from hospital administrative networks.
2. Snort Behavioral Signatures: Deploy intrusion detection systems pointing at port 104 (DICOM) and port 2575 (HL7) to instantly flag packet flooding.
3. Endpoint Auditing: Use custom script schedules to ensure default factory keys on hardware are modified immediately.

By protecting clinical systems, we protect patient security.
`
  },
  {
    id: 'story-2',
    date: 'Mar 24, 2026',
    category: 'Data Analysis',
    title: 'Harnessing ICU Forecasting Models with SQL and Tableau',
    summary: 'A look inside the data analytics dashboard constructed to predict ward bottlenecks at YNH and deliver optimized nurse-to-patient allocation guides.',
    readTime: '4 min read',
    content: `
Hospital operations thrive when capacity fits demand. In typical emergency scenarios, nurses struggle with sudden admissions waves, causing delays.

### The Analytical Workflow
Using hospital databases, we analyze time-series patterns of ICU intake logs over a 4-year cycle. Key stages include:
- Query Hardening: Compiling optimized CTEs in SQL Server to extract admissions categorized by patient severity.
- Python Prediction: Using moving seasonal indices to predict influx sizes for upcoming days.
- Tableau Publishing: Distributing clean, auto-updating monitors in administrative offices so teams prepare bed reserves.

Through raw data analysis, we ensure hospital systems are responsive and efficient.
`
  },
  {
    id: 'story-3',
    date: 'Jan 05, 2026',
    category: 'Hospital Devlog',
    title: 'Altering Cyber-Governance: Passing NCA ECC Audits',
    summary: 'A breakdown of key documentation steps, policy audits, and host hardening protocols required to achieve high conformance scores in Saudi National Cybersecurity regulations.',
    readTime: '8 min read',
    content: `
Achieving outstanding compliance with the Saudi National Cybersecurity Authority (NCA) Essential Cybersecurity Controls (ECC-1:2018) is a comprehensive group objective.

### Key Elements of Conformance
- Information Asset Management: Validating inventory lists of every server, router, and database at YNH.
- Role Identity Control: Guaranteeing Least-Privilege access rights across all staff levels. Wait, nurses don\\'t need full DB read rights!
- Disaster Response Drills: Testing secure, airgapped daily snapshots of clinical logs and disaster recoveries.

Through rigorous audits, we secure our infrastructures and validate our commitment to public security.
`
  }
];
