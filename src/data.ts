// Screenshots must be redacted before upload: hide IPs, names and patient data.
// Image optimization guideline: Use WEBP format — keep hero images under 200 KB and gallery images under 150 KB each.
import { Project, TimelineItem, StoryItem } from './types';
import mubinAvatar from './assets/images/mubin_avatar_1780675936140.png';
import ynhItsmCard from './assets/images/ynh_itsm_card_1794207344897.jpg';
export const AVATAR_URL = mubinAvatar;
export const YNH_ITSM_URL = ynhItsmCard;
export const YAMS_ASSET_URL = '/Disconnected Office Network Illustration.png';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ynh-itsm',
    slug: 'ynh-itsm',
    title: 'YNH ITSM: Hospital IT Service Management',
    category: 'Healthcare IT Service Management',
    filterCategories: ['healthcare-it', 'analytics'],
    featured: true,
    tagline: 'A purpose-built hospital ticketing and SLA management platform replacing scattered phone calls and paper logs across clinical departments.',
    description: 'Centralized IT service management and incident routing system designed for hospital departments, technicians, and clinical support teams.',
    longDescription: 'Built for Yanbu National Hospital, YNH ITSM replaces fragmented phone calls, chat messages, and paper maintenance slips with a structured, auditable hospital IT ticketing platform. It gives clinical staff a fast way to report workstation, printer, EMR, or network issues while equipping IT leadership with real-time SLA tracking and recurring-issue analytics.',
    year: '2025-now',
    image: YNH_ITSM_URL,
    heroImage: YNH_ITSM_URL,
    tags: ['Healthcare IT', 'ITSM', 'SLA Tracking', 'Workflow Automation', 'Data Analysis'],
    badge: 'FEATURED',
    demoUrl: '#',
    githubUrl: '#',
    quickFacts: {
      role: 'Lead System Designer & Developer',
      duration: '2025 – Present',
      platform: 'Internal Hospital Web Application',
      status: 'Active in Hospital Operations'
    },
    metrics: [
      { label: 'Tickets Processed', value: '936' },
      { label: 'Avg. First Response Time', value: '1.2 minutes' },
      { label: 'Departments Onboarded', value: '26' },
      { label: 'SLA Compliance Rate', value: '9.2' }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'SQL Database', 'Role-Based Access Control', 'REST APIs'],
    challenges: [
      'Hospital staff work under urgent clinical time constraints and needed a ticket submission flow that takes seconds rather than complex multi-page forms.',
      'Critical clinical incidents (such as emergency room or ICU workstation disruptions) required automatic priority elevation over routine administrative requests.',
      'Establishing complete accountability and handoff history across rotating technician shifts without losing ticket context.'
    ],
    impact: 'Standardized IT support intake across hospital wings, eliminated lost support requests, and gave management clear visibility into response times and recurring infrastructure bottlenecks.',
    story: {
      problem: [
        'In a busy hospital environment, every minute of IT downtime directly affects clinical flow. Previously, support requests arrived through phone calls, walk-ins, messaging apps, and paper notes—making it difficult to track which requests were urgent, who was assigned, or whether an issue had actually been resolved.',
        'Technicians spent valuable time fielding duplicate calls and searching for context, while nursing stations and administrative offices had no visibility into ticket progress. IT leadership also lacked structured historical data to identify recurring hardware or software bottlenecks across departments.'
      ],
      idea: [
        'I set out to design and build YNH ITSM—a clean, hospital-tailored IT Service Management platform engineered specifically around clinical workflows. Instead of bloated enterprise software, the goal was a fast, intuitive portal where any staff member can log an issue in seconds and track its status live.',
        'For the IT support team, the system introduces structured categorization, clinical impact priority rules, automated technician routing, and live SLA countdown timers so critical patient-care areas always receive immediate attention.'
      ],
      buildTimeline: [
        {
          title: 'Clinical Workflow Discovery & Taxonomy Design',
          description: 'Mapped common support requests across hospital departments and defined standardized categories, priority tiers, and SLA targets.',
          date: 'Phase 1'
        },
        {
          title: 'Core Ticketing Portal & Routing Engine',
          description: 'Built the staff submission portal, technician queue views, assignment workflows, and status lifecycle tracking.',
          date: 'Phase 2'
        },
        {
          title: 'SLA Timers & Escalation Alerts',
          description: 'Added automated response and resolution timers with visual breach warnings for high-priority clinical tickets.',
          date: 'Phase 3'
        },
        {
          title: 'Self-Service Knowledge Base & Trend Reporting',
          description: 'Integrated quick-fix guides for common issues alongside management dashboards showing ticket volume and resolution trends.',
          date: 'Phase 4'
        }
      ],
      features: [
        {
          icon: 'Ticket',
          title: 'Ticket Portal',
          description: 'Streamlined request intake with instant status tracking for hospital staff.'
        },
        {
          icon: 'Layers',
          title: 'Categorization & Priority',
          description: 'Structured clinical urgency levels separating critical care issues from routine tasks.'
        },
        {
          icon: 'GitBranch',
          title: 'Routing & Assignment',
          description: 'Clear ownership queues, shift handoff notes, and specialist escalation paths.'
        },
        {
          icon: 'Clock',
          title: 'SLA Tracker',
          description: 'Real-time response and resolution targets with proactive breach indicators.'
        },
        {
          icon: 'BookOpen',
          title: 'Knowledge Base',
          description: 'Searchable troubleshooting articles for recurring printer, login, and workstation fixes.'
        },
        {
          icon: 'BarChart3',
          title: 'Reports & Trends',
          description: 'Departmental breakdowns and recurring incident analytics for IT planning.'
        }
      ],
      architectureSummary: [
        'YNH ITSM follows a clean, layered web architecture designed for reliability and maintainability on internal hospital infrastructure. Staff and technicians interact through role-tailored browser interfaces that communicate with a central application layer.',
        'All ticket state transitions, SLA calculations, and audit logs are validated at the application service layer before persisting to the relational database, ensuring consistent records across shifts.'
      ],
      architectureNodes: [
        { label: 'Hospital Staff & Technicians', sublabel: 'Role-Based Browser Portal' },
        { label: 'YNH ITSM Web UI', sublabel: 'Ticket Intake, Queues & Dashboards' },
        { label: 'Service & SLA Engine', sublabel: 'Validation, Routing & Audit Rules' },
        { label: 'Ticket & Knowledge Store', sublabel: 'Structured Relational Database' }
      ],
      security: [
        'Role-based access control (RBAC) strictly separates standard staff requesters, support technicians, and system administrators so users only view and act on authorized records.',
        'All form inputs and attachments pass through strict server-side validation and sanitization, paired with immutable audit logging of every ticket assignment and status change.',
        'Designed around least-privilege principles with no patient health information (PHI) stored inside technical support tickets, backed by scheduled database backups.'
      ],
      impactNarrative: [
        'By replacing ad-hoc phone calls with a single source of truth, YNH ITSM brought immediate order to daily hospital IT operations. Requesters can now see exactly when their issue is picked up, and technicians work from a prioritized queue rather than constant interruptions.',
        'The platform has processed 936 tickets across 26 departments, achieving an average first response time of 1.2 minutes and an SLA compliance rate of 9.2.'
      ],
      learnedAndNext: [
        'Building YNH ITSM reinforced that adoption in healthcare depends on speed and clarity—reducing a ticket form by even two fields noticeably improves staff participation during busy shifts.',
        'Next steps include deeper integration with asset records so technicians can immediately view a workstation or printer maintenance history directly inside the ticket view.'
      ]
    },
    gallery: [
      { alt: 'YNH ITSM staff ticket submission portal placeholder', caption: 'Staff Ticket Submission Portal (Redacted screenshot slot)' },
      { alt: 'Technician queue and priority triage board placeholder', caption: 'Technician Triage & Assignment Queue (Redacted screenshot slot)' },
      { alt: 'Live SLA timer and escalation monitor placeholder', caption: 'SLA Countdown & Breach Monitor (Redacted screenshot slot)' },
      { alt: 'Ticket lifecycle and audit timeline view placeholder', caption: 'Ticket Resolution & Audit Timeline (Redacted screenshot slot)' },
      { alt: 'Internal IT self-service knowledge base placeholder', caption: 'Self-Service Troubleshooting Knowledge Base (Redacted screenshot slot)' },
      { alt: 'Departmental ticket volume and trend analytics placeholder', caption: 'Management Analytics & Recurring Issue Trends (Redacted screenshot slot)' }
    ]
  },
  {
    id: 'yams',
    slug: 'yams',
    title: 'YAMS: YNH Asset Management System',
    category: 'Healthcare IT & Asset Intelligence',
    filterCategories: ['healthcare-it', 'cyber', 'analytics'],
    featured: true,
    tagline: 'End-to-end hospital hardware inventory, lifecycle tracking, and live endpoint status visibility built to eliminate spreadsheet drift.',
    description: 'Centralized hospital IT asset registry tracking device lifecycles, custody history, maintenance warranties, and operational status.',
    longDescription: 'Engineered for Yanbu National Hospital, YAMS (YNH Asset Management System) replaces scattered spreadsheets with a unified hardware and clinical IT asset intelligence platform. It tracks workstations, printers, scanners, and network gear from procurement to retirement—complete with check-in/check-out custody logs, warranty alerts, and audit-ready compliance exports.',
    year: '2025-now',
    image: YAMS_ASSET_URL,
    heroImage: YAMS_ASSET_URL,
    tags: ['Healthcare IT', 'Asset Management', 'Cybersecurity', 'NCA ECC Compliance', 'Data Analysis'],
    badge: 'FEATURED',
    demoUrl: '#',
    githubUrl: '#',
    hasLiveStatusDemo: true,
    quickFacts: {
      role: 'Lead System Architect & Developer',
      duration: '2025 – Present',
      platform: 'Internal Hospital Web Platform',
      status: 'Active in Hospital Operations'
    },
    metrics: [
      { label: 'Total Assets Tracked', value: '[placeholder]' },
      { label: 'Departments Covered', value: '[placeholder]' },
      { label: 'Audit Prep Time Saved', value: '[placeholder]' },
      { label: 'Inventory Accuracy Rate', value: '[placeholder]' }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'SQL Database', 'Asset Tagging Workflows', 'CSV/PDF Audit Exporter', 'RBAC'],
    challenges: [
      'Hospital hardware frequently moves between wards, clinics, and repair benches, causing static spreadsheets to become outdated within days.',
      'Cybersecurity governance (such as NCA ECC asset inventory controls) requires accurate, up-to-date records of every hardware endpoint and its assigned custodian.',
      'Tracking expiring vendor warranties and preventive maintenance schedules across hundreds of mixed-model devices without manual calendar checks.'
    ],
    impact: 'Created a single authoritative hardware registry across hospital departments, streamlined cybersecurity compliance audits, and prevented unrecorded device relocations.',
    story: {
      problem: [
        'Managing hundreds of computers, thermal printers, barcode scanners, and networking devices across a multi-department hospital is a constant moving target. When inventory lived in separate spreadsheets, devices reassigned during urgent shift needs quickly drifted out of sync with official records.',
        'During compliance reviews and routine maintenance cycles, verifying which devices were active, which were in repair, and when warranties expired required hours of manual floor walks and cross-checking.'
      ],
      idea: [
        'I created YAMS (YNH Asset Management System) to serve as the single authoritative source of truth for hospital IT assets. Every device receives a structured profile linking its hardware specifications, physical location, assigned department, operational status, and full maintenance history.',
        'Beyond static record-keeping, YAMS incorporates live operational status monitoring, warranty expiration alerts, and one-click audit exports aligned with hospital governance requirements.'
      ],
      buildTimeline: [
        {
          title: 'Asset Data Model & Tagging Standard',
          description: 'Designed a unified schema covering workstations, peripherals, network gear, locations, and lifecycle states.',
          date: 'Phase 1'
        },
        {
          title: 'Central Asset Registry & Search Engine',
          description: 'Built fast multi-attribute filtering by asset tag, serial number, department, and operational status.',
          date: 'Phase 2'
        },
        {
          title: 'Custody Check-in/Check-out & Maintenance Logs',
          description: 'Implemented full chain-of-custody tracking for device handoffs, repairs, and warranty reminders.',
          date: 'Phase 3'
        },
        {
          title: 'Live Status Telemetry & Compliance Exports',
          description: 'Added status monitoring views and structured audit reports for management and cybersecurity reviews.',
          date: 'Phase 4'
        }
      ],
      features: [
        {
          icon: 'Database',
          title: 'Asset Registry',
          description: 'Complete hardware profiles with serials, specs, department assignments, and lifecycle stages.'
        },
        {
          icon: 'Activity',
          title: 'Live Status Monitor',
          description: 'At-a-glance operational visibility showing online, idle, and offline endpoints.'
        },
        {
          icon: 'Bell',
          title: 'Maintenance & Warranty Alerts',
          description: 'Automated reminders for upcoming preventive maintenance and expiring vendor coverage.'
        },
        {
          icon: 'ArrowLeftRight',
          title: 'Check-in / Check-out & History',
          description: 'Full custody timeline recording every deployment, relocation, and repair event.'
        },
        {
          icon: 'FileSpreadsheet',
          title: 'Audit & Export',
          description: 'Instant compliance-ready inventory reports filtered by ward, category, or status.'
        },
        {
          icon: 'ShieldCheck',
          title: 'Role-based Views',
          description: 'Tailored permissions for technicians, inventory auditors, and IT leadership.'
        }
      ],
      architectureSummary: [
        'YAMS is architected around a centralized relational asset store accessed through a responsive web interface. Technicians and auditors query and update asset records through validated workflow actions that automatically append to an immutable history log.',
        'The status monitoring and reporting modules aggregate asset health and lifecycle metrics without exposing sensitive network configurations.'
      ],
      architectureNodes: [
        { label: 'IT Auditors & Technicians', sublabel: 'Authenticated Browser Session' },
        { label: 'YAMS Web Interface', sublabel: 'Registry, Status & Custody Views' },
        { label: 'Asset & Audit Service', sublabel: 'Lifecycle Rules & Export Engine' },
        { label: 'Central Asset Database', sublabel: 'Inventory & Custody History Store' }
      ],
      security: [
        'Enforces role-based permissions so only authorized asset administrators can modify hardware assignments or retire equipment, while auditors receive read-only export access.',
        'Every custody transfer, status change, and specification edit is recorded in an append-only audit trail showing timestamp and action context.',
        'Follows strict data minimization—storing only hardware management metadata with zero patient data or exposed internal network credentials.'
      ],
      impactNarrative: [
        'YAMS transformed hospital hardware tracking from periodic spreadsheet cleanups into a continuous, reliable workflow. Technicians can locate any device and review its full repair history in seconds, and compliance audits that once took days of preparation can now be exported immediately.',
        'Today, the system tracks [placeholder] assets across [placeholder] departments, reducing audit preparation time by [placeholder] and maintaining an inventory accuracy rate of [placeholder].'
      ],
      learnedAndNext: [
        'Designing YAMS showed that an asset system is only as accurate as its daily check-in/check-out friction—making custody transfers fast for technicians kept the database accurate in real time.',
        'Future enhancements focus on barcode/QR scan workflows for rapid ward audits and direct linking between YAMS asset profiles and YNH ITSM support tickets.'
      ]
    },
    gallery: [
      { alt: 'YAMS central asset registry and filter dashboard placeholder', caption: 'Central Asset Registry & Multi-Filter View (Redacted screenshot slot)' },
      { alt: 'YAMS live endpoint status monitor placeholder', caption: 'Endpoint Operational Status Monitor (Redacted screenshot slot)' },
      { alt: 'Hardware lifecycle and custody timeline placeholder', caption: 'Device Check-in / Check-out Custody History (Redacted screenshot slot)' },
      { alt: 'Warranty and preventive maintenance alert panel placeholder', caption: 'Warranty & Maintenance Alert Schedule (Redacted screenshot slot)' },
      { alt: 'Compliance audit export generator placeholder', caption: 'NCA ECC Asset Audit & Report Exporter (Redacted screenshot slot)' },
      { alt: 'Departmental hardware distribution breakdown placeholder', caption: 'Departmental Hardware Allocation Overview (Redacted screenshot slot)' }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'time-palo_alto_xsiam',
    date: 'Jun 25, 2026',
    category: 'certification',
    tags: [
      'paloaltonetworks',
      'xsiam',
      'cortex',
      'securityoperations',
      'soc',
      'threatdetection',
      'incidentresponse',
      'cybersecurity'
    ],
    title: 'Palo Alto Networks Certified XSIAM Analyst',
    description: 'Earned the Palo Alto Networks Certified XSIAM Analyst credential, validating the practical skills and core knowledge required to centralize, automate, and scale security operations. This certification recognizes proficiency in leveraging Cortex XSIAM to engineer modern threat detection, accelerate incident response, and manage comprehensive security data analytics within an enterprise Security Operations Center (SOC).',
    imageUrl: '/Palo_Alto_Certificate.png'
  },
  {
    id: 'time-tryhackme_pt1',
    date: 'June 20, 2026',
    category: 'certification',
    tags: [
      'tryhackme',
      'pt1',
      'penetrationtesting',
      'ethicalhacking',
      'cybersecurity',
      'redteam',
      'vulnerabilityassessment'
    ],
    title: 'TryHackMe Certified Junior Penetration Tester (PT1)',
    description: 'Obtained the TryHackMe Certified Junior Penetration Tester (PT1) certification, demonstrating practical skills in penetration testing, vulnerability assessment, web application security, network reconnaissance, privilege escalation, and cybersecurity methodologies. Validates the ability to identify, analyze, and report security vulnerabilities using industry-standard tools and techniques while following ethical hacking best practices.',
    imageUrl: '/Tryhackme_Certificate.png'
  },
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
    id: 'time-ecc_ceh',
    date: 'Aug 13, 2024',
    category: 'certification',
    tags: [
      'eccouncil',
      'ceh',
      'ethicalhacking',
      'penetrationtesting',
      'cybersecurity',
      'vulnerabilityassessment',
      'networksecurity'
    ],
    title: 'EC-Council Certified Ethical Hacker (CEH)',
    description: 'Attained the Certified Ethical Hacker (CEH) credential from EC-Council, demonstrating mastery in advanced infrastructure hacking methodologies. This certification validates practical expertise in deploying tools and techniques to identify vulnerabilities, counter malicious system penetrations, and reinforce enterprise network architecture against sophisticated cyber threats using a vendor-neutral approach.',
    imageUrl: '/ECC_CEH_Certificate.jpg'
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
    id: 'time-cisco_ceh',
    date: 'Oct 23, 2023',
    category: 'certification',
    tags: ['cisco', 'security', 'hacking', 'credential'],
    title: 'Cisco Certified Ethical Hacker',
    description: 'Obtained the Cisco Certified Ethical Hacker certification, validating skillsets in defensive network architecture, advanced vulnerability assessments, and penetration testing methodologies to protect vital infrastructures.',
    details: [
      'Mastered threat vector identification, perimeter defense controls, and continuous system logging inspection protocols.',
      'Completed rigorous training on scanning, enumeration, system hacking, and mitigating lateral network attacks.',
      'Validated hands-on capacity to construct zero-trust configurations surrounding sensitive healthcare servers.'
    ],
    imageUrl: '/cisco_cert.png'
  },
  {
    id: 'time-iso27001',
    date: 'Oct 21, 2023',
    category: 'certification',
    tags: [
      'iso27001',
      'iso270012022',
      'informationsecurity',
      'cybersecurity',
      'isms',
      'riskmanagement',
      'compliance'
    ],
    title: 'ISO/IEC 27001:2022 Information Security Associate™',
    description: 'Successfully earned the ISO/IEC 27001:2022 Information Security Associate™ certification from SkillFront, demonstrating foundational knowledge of Information Security Management Systems (ISMS), information security governance, risk assessment, risk treatment, compliance requirements, security controls, and the implementation of ISO/IEC 27001:2022 standards. This certification validates the ability to support organizational information security initiatives and contribute to maintaining confidentiality, integrity, and availability of information assets.',
    imageUrl: '/SkillFront ISO 27001 Certification-1.png'
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
    likes: 523,
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
    likes: 654,
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
    likes: 853,
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
