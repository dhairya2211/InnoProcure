// Initial seed mock data for InnoProcure (Indian Public Sector Innovation & Procurement Platform)

export const initialUsers = [
  {
    id: "usr_gov_1",
    name: "Rajesh V. Sharma",
    email: "r.sharma@mohua.gov.in",
    role: "government",
    department: "Ministry of Housing & Urban Affairs (MoHUA)",
    designation: "Joint Secretary (Smart Cities)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr_eval_1",
    name: "Dr. Ananya Sen",
    email: "ananya.sen@iitd.ac.in",
    role: "evaluator",
    department: "Department of Water Resources / IIT Delhi",
    designation: "Senior Domain Technical Evaluator",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr_start_1",
    name: "Vikramaditya Kulkarni",
    email: "vikram@aquasensing.in",
    role: "startup",
    companyName: "AquaSensing Tech Pvt Ltd",
    dpiitId: "DPIIT-89241",
    designation: "Co-Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr_admin_1",
    name: "Suresh Ramanathan",
    email: "admin@innoprocure.gov.in",
    role: "admin",
    department: "National Informatics Centre (NIC)",
    designation: "Platform System Administrator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
];

export const initialStartups = [
  {
    id: "start_1",
    userId: "usr_start_1",
    companyName: "AquaSensing Tech Pvt Ltd",
    dpiitNumber: "DPIIT-89241",
    foundingYear: "2021",
    headquarters: "Bengaluru, Karnataka",
    shortDescription: "AI & IoT-driven real-time acoustic pipeline leak detection and pressure optimization system for urban water grids.",
    capabilities: ["IoT Sensors", "Acoustic Signal Processing", "Predictive Analytics", "GIS Mapping"],
    technologyAreas: ["Smart Water Management", "Urban Infrastructure", "Deep Tech"],
    pastExperience: "Successfully deployed pilot in Mysuru Municipal Corporation detecting 340+ underground distribution leaks.",
    teamSize: 18,
    keyMembers: ["Vikramaditya Kulkarni (CEO)", "Dr. Priya Nair (CTO - PhD Signal Processing)"],
    website: "https://aquasensing.in",
    contactEmail: "contact@aquasensing.in",
    contactPhone: "+91 98450 12345"
  },
  {
    id: "start_2",
    userId: "usr_start_2",
    companyName: "SwachhTech Solutions",
    dpiitNumber: "DPIIT-67123",
    foundingYear: "2020",
    headquarters: "Pune, Maharashtra",
    shortDescription: "Automated optical waste classification and secondary material recovery robotics for Municipal Solid Waste plants.",
    capabilities: ["Computer Vision", "Robotics", "Solid Waste Management", "Edge Computing"],
    technologyAreas: ["CleanTech", "Circular Economy", "AI Robotics"],
    pastExperience: "Partnered with Pune Municipal Corporation for 20 TPD automated dry waste segregation processing.",
    teamSize: 24,
    keyMembers: ["Rohan Deshmukh (Founder)", "Aarti Joshi (Head of AI)"],
    website: "https://swachhtech.co.in",
    contactEmail: "info@swachhtech.co.in",
    contactPhone: "+91 97640 56789"
  },
  {
    id: "start_3",
    userId: "usr_start_3",
    companyName: "RuralHealth AI Labs",
    dpiitNumber: "DPIIT-45109",
    foundingYear: "2022",
    headquarters: "Hyderabad, Telangana",
    shortDescription: "Portable non-invasive diagnostic kit integrated with tele-consultation cloud for Primary Health Centres in remote tribal belts.",
    capabilities: ["Medical Devices", "Telemedicine", "Offline-first Sync", "Diagnostic AI"],
    technologyAreas: ["HealthTech", "Rural Innovation", "MedTech"],
    pastExperience: "Piloted across 12 PHCs in Adilabad district screening over 15,000 rural patients.",
    teamSize: 15,
    keyMembers: ["Dr. Srinivas Rao (Co-Founder)", "Kavitha Reddy (Product Lead)"],
    website: "https://ruralhealth.ai",
    contactEmail: "support@ruralhealth.ai",
    contactPhone: "+91 94400 88990"
  }
];

export const initialChallenges = [
  {
    id: "ch_1",
    title: "AI-Assisted Urban Water Leakage Detection & Non-Revenue Water Reduction Pilot",
    department: "Bengaluru Water Supply and Sewerage Board (BWSSB) / MoHUA",
    category: "Smart Water & Sanitation",
    problemStatement: "Urban distribution networks suffer over 38% Non-Revenue Water (NRW) loss due to unmapped underground pipe ruptures and non-revenue leakages, leading to severe city water scarcity.",
    desiredOutcome: "Deploy continuous acoustic/pressure monitoring solutions across a designated pilot ward to pinpoint leaks within 5-meter accuracy and reduce NRW losses by at least 25%.",
    measurableOutcomeTarget: "Reduce Ward NRW loss from 38% to under 15% within 90 days of deployment.",
    budget: "45,00,000", // ₹ 45 Lakhs
    timelineDays: 120,
    applicationDeadline: "2026-09-30",
    dataSensitivity: "MEDIUM",
    requiredCapabilities: ["IoT Sensors", "Acoustic Signal Processing", "GIS Mapping", "Predictive Analytics"],
    status: "PILOT_IN_PROGRESS", // DRAFT, OPEN, IN_EVALUATION, PILOT_IN_PROGRESS, COMPLETED, SCALED, REJECTED
    createdDate: "2026-07-15",
    createdBy: "Rajesh V. Sharma",
    evaluatorId: "usr_eval_1",
    applicationsCount: 4,
    shortlistedStartupId: "start_1"
  },
  {
    id: "ch_2",
    title: "Automated Municipal Solid Waste Segregation & Audit at Transfer Stations",
    department: "Brihanmumbai Municipal Corporation (BMC)",
    category: "Waste Management & CleanTech",
    problemStatement: "Manual sorting at municipal waste transfer stations is hazardous, low throughput, and yields low-grade recyclable feedstock.",
    desiredOutcome: "Automate high-speed sorting of dry plastics, paper, and glass with over 90% purity using optical robotics.",
    measurableOutcomeTarget: "Process 15 Tons Per Day (TPD) with >92% sorting accuracy.",
    budget: "60,00,000", // ₹ 60 Lakhs
    timelineDays: 150,
    applicationDeadline: "2026-10-15",
    dataSensitivity: "LOW",
    requiredCapabilities: ["Computer Vision", "Robotics", "Solid Waste Management"],
    status: "IN_EVALUATION",
    createdDate: "2026-08-01",
    createdBy: "Rajesh V. Sharma",
    evaluatorId: "usr_eval_1",
    applicationsCount: 3,
    shortlistedStartupId: null
  },
  {
    id: "ch_3",
    title: "Solar-Powered Cold Chain Monitoring & Spoilage Alert for Rural Primary Health Centres",
    department: "National Health Mission (NHM) - Telangana",
    category: "Healthcare & MedTech",
    problemStatement: "Vaccine heat exposure in remote PHCs during grid outages leads to vaccine wastage and compromised immunization drives.",
    desiredOutcome: "Smart solar-assisted vaccine temperature logger with satellite/cellular fallback alert mechanism.",
    measurableOutcomeTarget: "Zero vaccine spoilage across 25 pilot PHC cold storage units over 6 months.",
    budget: "35,00,000", // ₹ 35 Lakhs
    timelineDays: 90,
    applicationDeadline: "2026-11-01",
    dataSensitivity: "HIGH",
    requiredCapabilities: ["Medical Devices", "Telemedicine", "Offline-first Sync"],
    status: "OPEN",
    createdDate: "2026-08-10",
    createdBy: "Rajesh V. Sharma",
    evaluatorId: "usr_eval_1",
    applicationsCount: 1,
    shortlistedStartupId: null
  }
];

export const initialApplications = [
  {
    id: "app_1",
    challengeId: "ch_1",
    startupId: "start_1",
    startupName: "AquaSensing Tech Pvt Ltd",
    submissionDate: "2026-07-28",
    proposedSolution: "AquaGrid Guardian: Non-invasive clamp-on acoustic sensor network coupled with pressure transient machine learning analysis.",
    implementationApproach: "Phase 1: Deployment of 50 node sensors across Ward 42 feeder pipeline. Phase 2: AI calibration and leak triangulating dashboard setup. Phase 3: Validation and repair coordination.",
    expectedOutcome: "Identify all major pipeline breaches within 72 hours of installation and reduce NRW loss from 38% to 14.5%.",
    timelineDays: 90,
    requestedBudget: "42,50,000",
    relevantExperience: "Deployed similar acoustic mesh in Mysuru municipal distribution line reducing losses by 28%.",
    status: "SHORTLISTED", // SUBMITTED, UNDER_EVALUATION, SHORTLISTED, REJECTED, PILOT
    score: 92,
    evaluationComments: "Exceptional technical depth and past validation in Mysuru. Solution fits BWSSB operational parameters with clear return on investment.",
    scoredDate: "2026-08-05",
    scoredBy: "Dr. Ananya Sen"
  },
  {
    id: "app_2",
    challengeId: "ch_2",
    startupId: "start_2",
    startupName: "SwachhTech Solutions",
    submissionDate: "2026-08-12",
    proposedSolution: "RoboSort-X: High-speed conveyor belt computer vision system with pneumatic sorting nozzles.",
    implementationApproach: "Install dual-lane sorter module at Kurla transfer station. Real-time mass flow optical telemetry.",
    expectedOutcome: "Achieve 94% plastic purity at 18 TPD capacity.",
    timelineDays: 120,
    requestedBudget: "58,00,000",
    relevantExperience: "PMC pilot operational for 8 months with 20 TPD processing capacity.",
    status: "UNDER_EVALUATION",
    score: null,
    evaluationComments: "",
    scoredDate: null,
    scoredBy: null
  },
  {
    id: "app_3",
    challengeId: "ch_3",
    startupId: "start_3",
    startupName: "RuralHealth AI Labs",
    submissionDate: "2026-08-20",
    proposedSolution: "ColdShield Solar Mesh: Low-power IoT thermal telemetry node with battery backup and SMS failover.",
    implementationApproach: "Equip 25 PHC Ice-Lined Refrigerators with ColdShield sensors and cloud monitoring hub.",
    expectedOutcome: "100% uptime monitoring with breach alerts delivered within 120 seconds.",
    timelineDays: 60,
    requestedBudget: "32,00,000",
    relevantExperience: "Screened 15k patients and monitored vaccine transport in Adilabad.",
    status: "SUBMITTED",
    score: null,
    evaluationComments: "",
    scoredDate: null,
    scoredBy: null
  }
];

export const initialPilots = [
  {
    id: "pilot_1",
    challengeId: "ch_1",
    applicationId: "app_1",
    startupId: "start_1",
    startupName: "AquaSensing Tech Pvt Ltd",
    department: "Bengaluru Water Supply and Sewerage Board (BWSSB) / MoHUA",
    challengeTitle: "AI-Assisted Urban Water Leakage Detection & Non-Revenue Water Reduction Pilot",
    startDate: "2026-08-10",
    expectedCompletionDate: "2026-11-10",
    totalBudget: "42,50,000",
    status: "IN_PROGRESS", // IN_PROGRESS, AWAITING_FINAL_DECISION, SCALED, REJECTED
    agreementSigned: true,
    agreementDate: "2026-08-08",
    milestones: [
      {
        id: "ms_1_1",
        title: "Milestone 1: Sensor Deployment & Baseline Calibration",
        description: "Installation of 50 acoustic sensors across Ward 42 and baseline NRW mapping.",
        dueDate: "2026-08-30",
        amount: "12,50,000",
        status: "VERIFIED", // PENDING, SUBMITTED, UNDER_VERIFICATION, VERIFIED, INCOMPLETE
        paymentStatus: "RELEASED", // PENDING, RELEASED
        evidenceUrl: "BWSSB_Ward42_Calibration_Report_v1.pdf",
        evidenceNotes: "All 50 sensors installed and communicating over 4G telemetry. Baseline NRW confirmed at 38.2%.",
        submittedDate: "2026-08-25",
        verifiedDate: "2026-08-28",
        verifiedBy: "Dr. Ananya Sen",
        verificationComments: "Physical audit verified at site. All 50 nodes calibrated accurately."
      },
      {
        id: "ms_1_2",
        title: "Milestone 2: Real-time Leak Triangulation & Repair Audit",
        description: "Identification of at least 15 active subterranean leak points with repair confirmation.",
        dueDate: "2026-09-30",
        amount: "15,00,000",
        status: "SUBMITTED",
        paymentStatus: "PENDING",
        evidenceUrl: "Leak_Triangulation_Audit_Ward42.pdf",
        evidenceNotes: "Identified 22 major ruptures. BWSSB engineering teams completed repair of 18 ruptures.",
        submittedDate: "2026-08-30",
        verifiedDate: null,
        verifiedBy: null,
        verificationComments: ""
      },
      {
        id: "ms_1_3",
        title: "Milestone 3: Final NRW Loss Reduction Target Verification",
        description: "Demonstration of NRW loss reduction to under 15% across Ward 42 feeder line.",
        dueDate: "2026-11-05",
        amount: "15,00,000",
        status: "PENDING",
        paymentStatus: "PENDING",
        evidenceUrl: "",
        evidenceNotes: "",
        submittedDate: null,
        verifiedDate: null,
        verifiedBy: null,
        verificationComments: ""
      }
    ],
    finalDecision: null // { decision: "SCALED" | "REJECTED", date: "...", comments: "...", scaledDepartments: [...] }
  }
];

export const initialActivities = [
  {
    id: "act_1",
    timestamp: "2026-07-15 10:30",
    actor: "Rajesh V. Sharma",
    role: "Government Officer",
    action: "CHALLENGE_CREATED",
    details: "Created Challenge: AI-Assisted Urban Water Leakage Detection (BWSSB)"
  },
  {
    id: "act_2",
    timestamp: "2026-07-28 14:15",
    actor: "Vikramaditya Kulkarni",
    role: "Startup",
    action: "APPLICATION_SUBMITTED",
    details: "AquaSensing Tech submitted proposal for BWSSB Water Leakage Challenge"
  },
  {
    id: "act_3",
    timestamp: "2026-08-05 11:45",
    actor: "Dr. Ananya Sen",
    role: "Evaluator",
    action: "PROPOSAL_SCORED",
    details: "Evaluated & scored AquaSensing Tech (Score: 92/100)"
  },
  {
    id: "act_4",
    timestamp: "2026-08-08 16:00",
    actor: "Dr. Ananya Sen",
    role: "Evaluator",
    action: "STARTUP_SHORTLISTED",
    details: "Shortlisted AquaSensing Tech for Pilot Agreement Execution"
  },
  {
    id: "act_5",
    timestamp: "2026-08-10 09:00",
    actor: "Rajesh V. Sharma",
    role: "Government Officer",
    action: "PILOT_INITIATED",
    details: "Initiated BWSSB Water Leakage Pilot Project with AquaSensing Tech"
  },
  {
    id: "act_6",
    timestamp: "2026-08-25 15:20",
    actor: "Vikramaditya Kulkarni",
    role: "Startup",
    action: "MILESTONE_SUBMITTED",
    details: "Submitted evidence for Milestone 1: Sensor Deployment & Baseline Calibration"
  },
  {
    id: "act_7",
    timestamp: "2026-08-28 12:10",
    actor: "Dr. Ananya Sen",
    role: "Evaluator",
    action: "MILESTONE_VERIFIED",
    details: "Verified Milestone 1 for AquaSensing Tech Pilot"
  },
  {
    id: "act_8",
    timestamp: "2026-08-28 14:30",
    actor: "Rajesh V. Sharma",
    role: "Government Officer",
    action: "PAYMENT_RELEASED",
    details: "Released Milestone 1 Payment of ₹12,50,000 to AquaSensing Tech"
  }
];
