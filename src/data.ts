// Screenshots must be redacted before upload: hide IPs, names and patient data.
// Image optimization guideline: Use WEBP format — keep hero images under 200 KB and gallery images under 150 KB each.
import { Project, TimelineItem, StoryItem } from './types';
import mubinAvatar from './assets/images/mubin_avatar_1780675936140.png';
import sentinelGuardIcon from './assets/images/sentinel_guard_icon_1780675958553.png';
import healthDataIcon from './assets/images/health_data_icon_1780675975403.png';
import cryptographyIcon from './assets/images/cryptography_icon_1780675992838.png';

// Let's grab the actual generated asset paths from our image generation calls
export const AVATAR_URL = mubinAvatar;
export const SENTINEL_GUARD_URL = sentinelGuardIcon;
export const HEALTH_DATA_URL = healthDataIcon;
export const CRYPTOGRAPHY_URL = cryptographyIcon;

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
    image: '',
    heroImage: '',
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
      { label: 'Tickets Processed', value: '[placeholder]' },
      { label: 'Avg. First Response Time', value: '[placeholder]' },
      { label: 'Departments Onboarded', value: '[placeholder]' },
      { label: 'SLA Compliance Rate', value: '[placeholder]' }
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
        'The platform has processed [placeholder] tickets across [placeholder] departments, achieving an average first response time of [placeholder] and an SLA compliance rate of [placeholder].'
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
    image: '',
    heroImage: '',
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
  },
  {
    id: 'sentinel-guard',
    slug: 'sentinel-guard',
    title: 'Sentinel EHR Guard',
    category: 'Cybersecurity Endpoint Protection',
    filterCategories: ['cyber', 'healthcare-it'],
    featured: false,
    tagline: 'Active endpoint telemetry scanner defending clinical HL7 networks and medical IoT hardware from zero-day threats.',
    description: 'Active endpoint telemetry scanner defending clinical HL7 networks and medical IoT hardware from zero-day threats.',
    longDescription: 'Developed and deployed at Yanbu National Hospital, Sentinel EHR Guard analyzes real-time clinical system logs. It monitors active telemedicine links, DICOM imaging devices, and Electronic Health Record (EHR) queries, using trained security signature matching algorithms to isolate anomalies. It provides fully compliant logging matching the Saudi National Cybersecurity Authority (NCA ECC) directives.',
    year: '2025-now',
    image: SENTINEL_GUARD_URL,
    heroImage: SENTINEL_GUARD_URL,
    tags: ['Cybersecurity', 'HL7 Protocols', 'Endpoint Security', 'NCA ECC Compliance', 'React'],
    badge: 'RELEASE',
    demoUrl: '#',
    githubUrl: '#',
    quickFacts: {
      role: 'Cybersecurity Analyst & Developer',
      duration: '2025 – Present',
      platform: 'Clinical SOC Web Console',
      status: 'Production Release'
    },
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
    impact: 'Successfully isolated over 14 network threat scans/malicious probes, ensured 100% cybersecurity adherence during MOH compliance reviews, and protected active clinical networks for 450+ hospital endpoints.',
    story: {
      problem: [
        'Legacy medical equipment—such as hemodialysis terminals, infusion pumps, and imaging modalities—often runs on specialized firmware that cannot support traditional endpoint antivirus agents. Yet these devices continuously exchange critical HL7 and DICOM traffic across hospital networks.',
        'Inspecting these multi-gigabyte clinical streams in real time required passive, non-intrusive telemetry analysis that would never delay vital imaging transfers or EHR lookups during patient care.'
      ],
      idea: [
        'Sentinel EHR Guard was conceived as a passive clinical telemetry scanner and SOC dashboard that inspects HL7 and DICOM protocol metadata without interrupting medical traffic.',
        'By combining rule-based IDS signatures with anomaly scoring and NCA ECC-compliant audit logging, the platform alerts security analysts to suspicious lateral movement or unauthorized queries in milliseconds.'
      ],
      buildTimeline: [
        {
          title: 'Passive Protocol Mirroring & Parsing',
          description: 'Configured passive traffic inspection for HL7 and DICOM communication channels with zero packet delay.',
          date: 'Phase 1'
        },
        {
          title: 'Signature & Anomaly Detection Engine',
          description: 'Trained anomaly rules and Snort IDS signatures tailored to clinical workstation and IoT behavior.',
          date: 'Phase 2'
        },
        {
          title: 'SOC Visualization &NCA ECC Audit Logging',
          description: 'Built the real-time analyst dashboard and automated compliance log archival.',
          date: 'Phase 3'
        }
      ],
      features: [
        {
          icon: 'ShieldCheck',
          title: 'Passive HL7/DICOM Inspection',
          description: 'Monitors medical protocol traffic without installing agents on sensitive clinical hardware.'
        },
        {
          icon: 'Activity',
          title: 'Real-Time Anomaly Scoring',
          description: 'Flags unusual query volumes or lateral port scans across hospital segments in under 250ms.'
        },
        {
          icon: 'FileSpreadsheet',
          title: 'NCA ECC Compliance Logs',
          description: 'Generates structured security audit trails aligned with national cybersecurity directives.'
        }
      ],
      architectureSummary: [
        'Sentinel EHR Guard operates on mirrored clinical traffic streams, feeding parsed protocol metadata into an isolated analysis engine before surfacing alerts on the SOC web console.',
        'No raw patient records are modified in transit, ensuring 100% clinical availability alongside continuous threat visibility.'
      ],
      architectureNodes: [
        { label: 'Clinical Network Mirror', sublabel: 'Passive Telemetry Tap' },
        { label: 'Protocol Parser & IDS', sublabel: 'HL7/DICOM Signature Engine' },
        { label: 'Anomaly & Alert Service', sublabel: 'Threat Scoring & Audit Logger' },
        { label: 'Sentinel SOC Dashboard', sublabel: 'Analyst Triage Interface' }
      ],
      security: [
        'Strictly passive tap architecture prevents any single point of failure in clinical network communications.',
        'Role-restricted SOC console with tamper-evident logging aligned with NCA ECC-1:2018 controls.'
      ],
      impactNarrative: [
        'Successfully isolated over 14 network threat scans and anomalous probes, ensured 100% cybersecurity adherence during compliance reviews, and protected active clinical networks for 450+ hospital endpoints.'
      ],
      learnedAndNext: [
        'Protecting medical IoT requires deep respect for clinical uptime—passive network visibility combined with strict VLAN segmentation offers the safest defense posture.'
      ]
    },
    gallery: [
      { alt: 'Sentinel EHR Guard telemetry overview slot', caption: 'Telemetry Overview Console (Redacted screenshot slot)' },
      { alt: 'HL7 anomaly detection log slot', caption: 'HL7 Protocol Anomaly Monitor (Redacted screenshot slot)' },
      { alt: 'Medical IoT segment health view slot', caption: 'Medical IoT Segment Health View (Redacted screenshot slot)' },
      { alt: 'NCA ECC compliance audit report slot', caption: 'NCA ECC Compliance Audit View (Redacted screenshot slot)' },
      { alt: 'Threat isolation workflow slot', caption: 'Automated Threat Isolation Log (Redacted screenshot slot)' },
      { alt: 'Endpoint signature rule manager slot', caption: 'Signature Rule Configuration Panel (Redacted screenshot slot)' }
    ]
  },
  {
    id: 'ynh-analytics',
    slug: 'ynh-analytics',
    title: 'EMR Bed Tracking Pipeline',
    category: 'Healthcare Data Analytics',
    filterCategories: ['analytics', 'healthcare-it'],
    featured: false,
    tagline: 'End-to-end hospital bed capacity forecasting and telemetry platform utilizing Python streams and interactive dashboards.',
    description: 'End-to-end hospital bed capacity forecasting and telemetry platform utilizing Python streams and interactive dashboards.',
    longDescription: 'A production data analytics framework processing daily Emergency Department (ED) and ICU admissions. Crafted using SQL, Python (Pandas/numpy), and visualized via Tableau pipelines, this system predicts bottlenecks, forecasts surge beds 24 hours in advance, and provides critical analytics that help medical chiefs allocate staffing resources during high influxes.',
    year: '2024-2025',
    image: HEALTH_DATA_URL,
    heroImage: HEALTH_DATA_URL,
    tags: ['Data Analysis', 'Python Stream', 'SQL Server', 'Tableau', 'Bed Management'],
    badge: 'PRODUCTION',
    demoUrl: '#',
    githubUrl: '#',
    quickFacts: {
      role: 'Healthcare Data Analyst',
      duration: '2024 – 2025',
      platform: 'SQL / Python / Tableau Pipeline',
      status: 'In Production'
    },
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
    impact: 'Reduced patient transfer wait times in the recovery wards by 15%, empowered senior chiefs with 24-hr advance scheduling alerts, and raised total ward coordination efficiency by 23% across multiple departments.',
    story: {
      problem: [
        'Emergency Department and ICU admissions experience sharp seasonal and daily waves. Without advance forecasting, sudden influxes create bed allocation bottlenecks and delay patient transfers from recovery wards.',
        'At the same time, querying production hospital databases directly during peak clinical hours risked slowing down front-line EMR operations.'
      ],
      idea: [
        'I designed an off-peak ETL and time-series forecasting pipeline using read-optimized SQL queries, Python statistical modeling, and clear Tableau executive dashboards.',
        'The goal was to translate complex seasonal admission trends into a 5-second visual capacity forecast that medical chiefs and nursing supervisors can act on 24 hours in advance.'
      ],
      buildTimeline: [
        {
          title: 'Read-Optimized SQL Extraction & Cleaning',
          description: 'Built T-SQL CTE pipelines and Python Pandas cleaning routines to handle incomplete intake records safely.',
          date: 'Phase 1'
        },
        {
          title: 'Time-Series Surge Forecasting Model',
          description: 'Developed seasonal autoregressive models predicting 24-hour ward occupancy and ICU bed demand.',
          date: 'Phase 2'
        },
        {
          title: 'Executive Tableau Capacity Dashboards',
          description: 'Published interactive ward occupancy and staffing allocation views for hospital leadership.',
          date: 'Phase 3'
        }
      ],
      features: [
        {
          icon: 'Database',
          title: 'Non-Blocking ETL Pipeline',
          description: 'Extracts and cleans admission logs without impacting live production EMR performance.'
        },
        {
          icon: 'BarChart3',
          title: '24-Hour Surge Forecasting',
          description: 'Predicts ED and ICU bed demand with 94.2% precision using historical seasonal patterns.'
        },
        {
          icon: 'Activity',
          title: 'Ward Bottleneck Alerts',
          description: 'Highlights recovery transfer delays so supervisors can rebalance nursing resources.'
        }
      ],
      architectureSummary: [
        'De-identified admission counts are extracted via scheduled ETL jobs into an analytical staging store, processed by Python forecasting scripts, and rendered in Tableau dashboards.'
      ],
      architectureNodes: [
        { label: 'EMR Read Replica', sublabel: 'De-identified Admission Logs' },
        { label: 'Airflow & Python ETL', sublabel: 'Data Cleaning & Imputation' },
        { label: 'Forecasting Engine', sublabel: 'Time-Series Occupancy Model' },
        { label: 'Tableau Dashboards', sublabel: 'Ward Capacity Visualizations' }
      ],
      security: [
        'Operates strictly on aggregated, de-identified occupancy metrics with no patient names or medical record numbers exposed in analytical views.',
        'Read-replica isolation ensures zero impact on live clinical database availability.'
      ],
      impactNarrative: [
        'Reduced patient transfer wait times in the recovery wards by 15%, empowered senior chiefs with 24-hour advance scheduling alerts, and raised total ward coordination efficiency by 23% across multiple departments.'
      ],
      learnedAndNext: [
        'Clinical leaders value clarity over statistical complexity—presenting forecasts as simple bed-reserve recommendations drove immediate operational adoption.'
      ]
    },
    gallery: [
      { alt: 'Ward capacity forecast dashboard slot', caption: '24-Hour Ward Occupancy Forecast (Redacted screenshot slot)' },
      { alt: 'ICU surge prediction trendline slot', caption: 'ICU Surge Prediction Trendline (Redacted screenshot slot)' },
      { alt: 'Recovery transfer wait-time analytics slot', caption: 'Transfer Wait-Time Bottleneck View (Redacted screenshot slot)' },
      { alt: 'ETL pipeline health monitor slot', caption: 'Automated ETL Pipeline Status (Redacted screenshot slot)' },
      { alt: 'Seasonal admission heatmap slot', caption: 'Seasonal Admission Volume Heatmap (Redacted screenshot slot)' },
      { alt: 'Staffing allocation planner slot', caption: 'Shift Resource Allocation Guide (Redacted screenshot slot)' }
    ]
  },
  {
    id: 'aegis-encrypt',
    slug: 'aegis-encrypt',
    title: 'Aegis Cryptographic Labs',
    category: 'Medical Access Encryption',
    filterCategories: ['cyber', 'healthcare-it'],
    featured: false,
    tagline: 'A multi-factor biometric secure access link for rapid clinical lab telemetry exchange and decapsulation.',
    description: 'A multi-factor glassmorphic biometric secure access link for secure lab telemetry exchange and decapsulation.',
    longDescription: 'An experimental, zero-knowledge clinical cryptography system engineered to securely bridge Lab Information Systems (LIS) with doctor stations. Employing custom webauthn public keys, public-private keypairs, and AES-GCM-256 wrapping layer, it ensures patient labs cannot be snooped or tampered with by lateral threat actors in transit.',
    year: '2026',
    image: CRYPTOGRAPHY_URL,
    heroImage: CRYPTOGRAPHY_URL,
    tags: ['Cryptography', 'Cybersecurity', 'WebAuthn', 'AES-256', 'Patient Privacy'],
    badge: 'BETA',
    demoUrl: '#',
    githubUrl: '#',
    quickFacts: {
      role: 'Security Researcher & Developer',
      duration: '2026',
      platform: 'WebAuthn / WebCrypto Browser Client',
      status: 'Beta Prototype'
    },
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
    impact: 'Exhibited 0 instances of credential sharing during dry-runs, reduced lateral laboratory network snooping hazards to zero, and dropped unauthorized lab queries to a flawless 0.00%.',
    story: {
      problem: [
        'Clinicians reviewing sensitive Laboratory Information System (LIS) results need strong cryptographic protection against lateral network snooping and shared-password risks, yet emergency workflows cannot tolerate slow multi-step logins.',
        'Traditional password-only sessions on shared ward terminals leave lab telemetry vulnerable if a session is left unattended.'
      ],
      idea: [
        'Aegis Cryptographic Labs pairs FIDO2/WebAuthn hardware-backed authentication with client-side AES-GCM-256 payload decapsulation via the browser WebCrypto API.',
        'Clinicians authenticate in just 1.2 seconds while ensuring lab payloads remain encrypted in transit and can only be unwrapped at the verified workstation.'
      ],
      buildTimeline: [
        {
          title: 'FIDO2 / WebAuthn Key Handshake',
          description: 'Implemented sub-1.5-second passwordless authentication using standard WebAuthn credentials.',
          date: 'Phase 1'
        },
        {
          title: 'AES-GCM-256 Payload Wrapping',
          description: 'Built zero-knowledge browser decapsulation using native WebCrypto APIs.',
          date: 'Phase 2'
        },
        {
          title: 'Thin-Client Compatibility & Session Hardening',
          description: 'Optimized memory cleanup and automatic session lock for shared clinical terminals.',
          date: 'Phase 3'
        }
      ],
      features: [
        {
          icon: 'ShieldCheck',
          title: 'WebAuthn Biometric Handshake',
          description: 'Eliminates shared passwords with 1.2-second hardware-backed clinician verification.'
        },
        {
          icon: 'Lock',
          title: 'AES-GCM-256 Wrapping',
          description: 'Protects laboratory telemetry in transit with authenticated encryption.'
        },
        {
          icon: 'Clock',
          title: '40ms Client Decryption',
          description: 'Delivers near-instant lab report rendering inside hardened browser memory.'
        }
      ],
      architectureSummary: [
        'Aegis establishes an authenticated WebAuthn session before deriving ephemeral session keys via the browser WebCrypto API to unwrap encrypted lab payloads locally.'
      ],
      architectureNodes: [
        { label: 'Clinician Workstation', sublabel: 'FIDO2 / WebAuthn Authenticator' },
        { label: 'Aegis Client Sandbox', sublabel: 'WebCrypto AES-GCM-256 Engine' },
        { label: 'Encrypted LIS Gateway', sublabel: 'Signed Payload Delivery' },
        { label: 'Audit Verifier', sublabel: 'Zero-Knowledge Access Log' }
      ],
      security: [
        'Cryptographic keys reside strictly in non-exportable WebCrypto memory structures to mitigate script extraction risks.',
        'Automatic session expiration prevents unauthorized viewing on unattended ward terminals.'
      ],
      impactNarrative: [
        'Exhibited zero instances of credential sharing during dry-runs, reduced lateral laboratory network snooping hazards to zero, and dropped unauthorized lab queries to 0.00%.'
      ],
      learnedAndNext: [
        'Strong security and clinical speed can coexist when modern browser cryptography replaces legacy password prompts.'
      ]
    },
    gallery: [
      { alt: 'Aegis biometric authentication prompt slot', caption: 'WebAuthn Clinician Handshake View (Redacted screenshot slot)' },
      { alt: 'Encrypted lab payload exchange monitor slot', caption: 'AES-GCM-256 Payload Verification View (Redacted screenshot slot)' },
      { alt: 'Zero-knowledge session status panel slot', caption: 'Ephemeral Key & Session Monitor (Redacted screenshot slot)' },
      { alt: 'Thin-client compatibility mode slot', caption: 'Ward Terminal Fast-Switch Interface (Redacted screenshot slot)' },
      { alt: 'Cryptographic latency benchmark slot', caption: 'Decryption Latency Telemetry (Redacted screenshot slot)' },
      { alt: 'Access audit verification log slot', caption: 'Cryptographic Access Audit Log (Redacted screenshot slot)' }
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
