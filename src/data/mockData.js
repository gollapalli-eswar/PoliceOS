// Centralized mock data for PoliceOS AI (frontend-only demo data).
// All entities are cross-linked by caseId so every module tells one consistent story.

export const stationInfo = {
  name: 'Central City Police Station',
  code: 'PS-CC-014',
  district: 'Central District',
  jurisdiction: 'Zone 3',
};

export const officers = [
  {
    id: 'OFF-101', name: 'Officer Arjun Rao', badge: 'B-4521', designation: 'Sub-Inspector',
    email: 'arjun.rao@police.gov.in', phone: '+91 98450 11221', status: 'On Duty',
    activeCases: 4, completedCases: 21, joined: '2021-06-12',
  },
  {
    id: 'OFF-102', name: 'Officer Priya Menon', badge: 'B-4588', designation: 'Sub-Inspector',
    email: 'priya.menon@police.gov.in', phone: '+91 98450 33210', status: 'On Duty',
    activeCases: 3, completedCases: 34, joined: '2020-01-08',
  },
  {
    id: 'OFF-103', name: 'Officer Karthik Iyer', badge: 'B-4610', designation: 'Head Constable',
    email: 'karthik.iyer@police.gov.in', phone: '+91 98450 55432', status: 'Off Duty',
    activeCases: 2, completedCases: 17, joined: '2019-11-02',
  },
  {
    id: 'OFF-104', name: 'Officer Sneha Patil', badge: 'B-4652', designation: 'Sub-Inspector',
    email: 'sneha.patil@police.gov.in', phone: '+91 98450 76543', status: 'On Duty',
    activeCases: 5, completedCases: 12, joined: '2022-03-19',
  },
];

export const currentUser = {
  officer: { id: 'OFF-101', name: 'Arjun Rao', role: 'Police Officer', badge: 'B-4521', station: stationInfo.name },
  stationHead: { id: 'SH-001', name: 'Insp. Meera Sharma', role: 'Station Head', badge: 'B-1002', station: stationInfo.name },
};

export const cases = [
  {
    id: 'CASE-1024', crimeType: 'Vehicle Theft', status: 'Active', priority: 'High',
    assignedOfficer: 'OFF-101', createdDate: '2026-09-10', location: 'MG Road Parking Complex',
  },
  {
    id: 'CASE-1025', crimeType: 'Cybercrime — Financial Fraud', status: 'Active', priority: 'High',
    assignedOfficer: 'OFF-102', createdDate: '2026-09-12', location: 'Online / Remote',
  },
  {
    id: 'CASE-1026', crimeType: 'Missing Person', status: 'Under Investigation', priority: 'Critical',
    assignedOfficer: 'OFF-104', createdDate: '2026-09-14', location: 'Railway Station Area',
  },
  {
    id: 'CASE-1027', crimeType: 'Burglary', status: 'Closed', priority: 'Medium',
    assignedOfficer: 'OFF-103', createdDate: '2026-08-28', location: 'Green Park Residency',
  },
  {
    id: 'CASE-1028', crimeType: 'Assault', status: 'Active', priority: 'Medium',
    assignedOfficer: 'OFF-101', createdDate: '2026-09-16', location: 'Market Street',
  },
];

export const complaints = [
  {
    id: 'COMP-5001', caseId: 'CASE-1024', crimeType: 'Vehicle Theft',
    complainantName: 'Rakesh Kumar', contact: '+91 90001 22334', date: '2026-09-10', time: '21:15',
    location: 'MG Road Parking Complex', officer: 'OFF-101', status: 'Case Created',
    description: 'My motorcycle (KA-05-AB-3344) was stolen from the parking complex near MG Road between 8:30 PM and 9:00 PM.',
    property: 'Bajaj Pulsar 220F, Black, Reg. KA-05-AB-3344',
  },
  {
    id: 'COMP-5002', caseId: 'CASE-1025', crimeType: 'Cybercrime — Financial Fraud',
    complainantName: 'Anita Desai', contact: '+91 90002 44556', date: '2026-09-12', time: '10:40',
    location: 'Online / Remote', officer: 'OFF-102', status: 'Case Created',
    description: 'Received a fraudulent call claiming to be from my bank and lost ₹85,000 through a fake UPI request.',
    property: 'Bank transaction records, UPI transaction ID',
  },
  {
    id: 'COMP-5003', caseId: 'CASE-1026', crimeType: 'Missing Person',
    complainantName: 'Lakshmi Nair', contact: '+91 90003 66778', date: '2026-09-14', time: '19:05',
    location: 'Railway Station Area', officer: 'OFF-104', status: 'Case Created',
    description: 'My son (19) did not return home after leaving for the railway station on the evening of Sept 14.',
    property: 'N/A',
  },
  {
    id: 'COMP-5004', caseId: null, crimeType: 'Noise Complaint / Public Nuisance',
    complainantName: 'Vikram Shah', contact: '+91 90004 88990', date: '2026-09-17', time: '23:20',
    location: 'Sunrise Apartments, Block C', officer: 'OFF-103', status: 'Pending Review',
    description: 'Repeated late-night disturbance from a neighbouring unit over the past week.',
    property: 'N/A',
  },
  {
    id: 'COMP-5005', caseId: 'CASE-1027', crimeType: 'Burglary',
    complainantName: 'Suresh Babu', contact: '+91 90005 11223', date: '2026-08-28', time: '06:10',
    location: 'Green Park Residency', officer: 'OFF-103', status: 'Case Created',
    description: 'Home was broken into overnight; jewelry and electronics reported missing.',
    property: 'Gold jewelry (approx. 40g), one laptop',
  },
];

export const aiExtraction = {
  'COMP-5001': {
    crimeType: 'Vehicle Theft', date: '2026-09-10', time: '20:30–21:00',
    location: 'MG Road Parking Complex', victim: 'Rakesh Kumar',
    property: 'Bajaj Pulsar 220F, Reg. KA-05-AB-3344',
    incidentDescription: 'Two-wheeler reported stolen from a public parking area during evening hours; no witnesses identified at time of filing.',
    confidence: 0.92,
  },
};

export const firs = [
  {
    id: 'FIR-3001', caseId: 'CASE-1024', crimeType: 'Vehicle Theft', createdDate: '2026-09-11',
    officer: 'OFF-101', status: 'Approved', lastUpdated: '2026-09-12',
    provisions: ['BNS Section 303 — Theft', 'BNS Section 305 — Theft of motor vehicle'],
    summary: 'FIR registered for theft of a two-wheeler from MG Road Parking Complex on 10 Sept 2026.',
  },
  {
    id: 'FIR-3002', caseId: 'CASE-1025', crimeType: 'Cybercrime — Financial Fraud', createdDate: '2026-09-12',
    officer: 'OFF-102', status: 'Pending Approval', lastUpdated: '2026-09-13',
    provisions: ['BNS Section 318 — Cheating', 'IT Act Section 66D — Cheating by personation using computer resource'],
    summary: 'FIR drafted for financial fraud via impersonation of a bank representative, resulting in unauthorized UPI transaction.',
  },
  {
    id: 'FIR-3003', caseId: 'CASE-1026', crimeType: 'Missing Person', createdDate: '2026-09-14',
    officer: 'OFF-104', status: 'Draft', lastUpdated: '2026-09-15',
    provisions: ['BNSS Section 173 — Information in cognizable cases'],
    summary: 'FIR draft prepared for reported missing person last seen near the railway station.',
  },
  {
    id: 'FIR-3004', caseId: 'CASE-1027', crimeType: 'Burglary', createdDate: '2026-08-28',
    officer: 'OFF-103', status: 'Approved', lastUpdated: '2026-08-29',
    provisions: ['BNS Section 331 — House-breaking', 'BNS Section 305 — Theft'],
    summary: 'FIR registered for overnight burglary at Green Park Residency with items reported missing.',
  },
];

export const evidenceTypes = ['CCTV', 'Location', 'Call Record', 'Image', 'Face Recognition', 'Document', 'Audio'];

export const evidenceItems = [
  { id: 'EVD-9001', caseId: 'CASE-1024', type: 'CCTV', date: '2026-09-10', time: '20:42', location: 'Railway Station Gate 2', uploadedBy: 'OFF-101', status: 'Verified', description: 'CCTV footage — person entering parking complex vicinity.' },
  { id: 'EVD-9002', caseId: 'CASE-1024', type: 'Location', date: '2026-09-10', time: '20:47', location: 'Near Railway Station', uploadedBy: 'OFF-101', status: 'Verified', description: 'Location/device ping near railway station.' },
  { id: 'EVD-9003', caseId: 'CASE-1024', type: 'CCTV', date: '2026-09-10', time: '20:51', location: 'Parking Area Cam 4', uploadedBy: 'OFF-101', status: 'Verified', description: 'CCTV footage — person moving toward parking area.' },
  { id: 'EVD-9004', caseId: 'CASE-1024', type: 'Face Recognition', date: '2026-09-10', time: '20:54', location: 'Parking Area Cam 4', uploadedBy: 'AI System', status: 'Needs Review', description: 'Possible face match against internal watchlist (AI-generated, unconfirmed).' },
  { id: 'EVD-9005', caseId: 'CASE-1024', type: 'CCTV', date: '2026-09-10', time: '20:58', location: 'Parking Area Exit', uploadedBy: 'OFF-101', status: 'Verified', description: 'CCTV footage — individual leaving location.' },
  { id: 'EVD-9006', caseId: 'CASE-1024', type: 'Call Record', date: '2026-09-10', time: '21:02', location: 'N/A', uploadedBy: 'OFF-101', status: 'Verified', description: 'Outgoing call from a number associated with the vicinity, relevance under review.' },
  { id: 'EVD-9007', caseId: 'CASE-1024', type: 'Document', date: '2026-09-11', time: '09:10', location: 'N/A', uploadedBy: 'OFF-101', status: 'Verified', description: 'Vehicle registration certificate submitted by complainant.' },
  { id: 'EVD-9008', caseId: 'CASE-1025', type: 'Document', date: '2026-09-12', time: '11:00', location: 'N/A', uploadedBy: 'OFF-102', status: 'Verified', description: 'Bank statement showing unauthorized UPI transaction.' },
  { id: 'EVD-9009', caseId: 'CASE-1025', type: 'Call Record', date: '2026-09-12', time: '10:22', location: 'N/A', uploadedBy: 'OFF-102', status: 'Verified', description: 'Call log of the reported fraudulent call.' },
  { id: 'EVD-9010', caseId: 'CASE-1026', type: 'CCTV', date: '2026-09-14', time: '19:00', location: 'Railway Station Concourse', uploadedBy: 'OFF-104', status: 'Verified', description: 'CCTV footage showing last known sighting.' },
  { id: 'EVD-9011', caseId: 'CASE-1026', type: 'Image', date: '2026-09-14', time: '18:30', location: 'Family submitted', uploadedBy: 'Lakshmi Nair', status: 'Verified', description: 'Recent photograph of the missing individual.' },
];

// AI-assisted evidence sequence reconstruction for CASE-1024 (railway station example from spec).
export const evidenceSequences = {
  'CASE-1024': [
    { id: 'SEQ-1', time: '08:42 PM', type: 'CCTV', title: 'Person enters railway station', evidenceId: 'EVD-9001', confidence: 'confirmed', note: 'Directly observed in camera footage.' },
    { id: 'SEQ-2', time: '08:47 PM', type: 'Location', title: 'Device/location signal appears near railway station', evidenceId: 'EVD-9002', confidence: 'confirmed', note: 'Location record matches timeframe and area.' },
    { id: 'SEQ-3', time: '08:51 PM', type: 'CCTV', title: 'Person moves toward parking area', evidenceId: 'EVD-9003', confidence: 'confirmed', note: 'Directly observed in camera footage.' },
    { id: 'SEQ-4', time: '08:54 PM', type: 'Face Recognition', title: 'Face match detected in available footage', evidenceId: 'EVD-9004', confidence: 'inferred', note: 'AI-generated match; not yet confirmed by an officer.' },
    { id: 'SEQ-5', time: '08:58 PM', type: 'CCTV', title: 'Person leaves location', evidenceId: 'EVD-9005', confidence: 'confirmed', note: 'Directly observed in camera footage.' },
    { id: 'SEQ-6', time: '09:02 PM', type: 'Call Record', title: 'Relevant call event recorded nearby', evidenceId: 'EVD-9006', confidence: 'inferred', note: 'AI-correlated by time and proximity; relevance unconfirmed.' },
  ],
};

export const investigationTasks = {
  'CASE-1024': [
    { id: 'T1', text: 'Review CCTV footage from parking complex', done: true, assignee: 'OFF-101' },
    { id: 'T2', text: 'Verify location information against telecom records', done: true, assignee: 'OFF-101' },
    { id: 'T3', text: 'Review available call records', done: false, assignee: 'OFF-101' },
    { id: 'T4', text: 'Identify and interview witnesses', done: false, assignee: 'OFF-101' },
    { id: 'T5', text: 'Verify vehicle details with RTO', done: false, assignee: 'OFF-101' },
  ],
  'CASE-1025': [
    { id: 'T6', text: 'Trace UPI transaction beneficiary account', done: true, assignee: 'OFF-102' },
    { id: 'T7', text: 'Request call detail records from telecom provider', done: false, assignee: 'OFF-102' },
    { id: 'T8', text: 'Coordinate with cyber cell for IP trace', done: false, assignee: 'OFF-102' },
  ],
  'CASE-1026': [
    { id: 'T9', text: 'Review station CCTV for last sighting', done: true, assignee: 'OFF-104' },
    { id: 'T10', text: 'Circulate description to nearby stations', done: true, assignee: 'OFF-104' },
    { id: 'T11', text: 'Interview family and known associates', done: false, assignee: 'OFF-104' },
    { id: 'T12', text: 'Check hospital and shelter records', done: false, assignee: 'OFF-104' },
  ],
};

export const investigationUpdates = {
  'CASE-1024': [
    { id: 'U1', date: '2026-09-11', time: '10:30', activity: 'CCTV Review', description: 'Reviewed footage from 3 cameras covering the parking complex approach.', officer: 'OFF-101', relatedEvidence: 'EVD-9001, EVD-9003, EVD-9005' },
    { id: 'U2', date: '2026-09-12', time: '15:00', activity: 'Location Verification', description: 'Cross-checked location ping against telecom tower data — consistent with timeline.', officer: 'OFF-101', relatedEvidence: 'EVD-9002' },
  ],
  'CASE-1025': [
    { id: 'U3', date: '2026-09-13', time: '09:15', activity: 'Bank Coordination', description: 'Requested transaction freeze and beneficiary details from the receiving bank.', officer: 'OFF-102', relatedEvidence: 'EVD-9008' },
  ],
};

export const reports = [
  { id: 'RPT-7001', caseId: 'CASE-1024', type: 'Status Report', createdDate: '2026-09-13', officer: 'OFF-101', status: 'Submitted' },
  { id: 'RPT-7002', caseId: 'CASE-1025', type: 'Investigation Report', createdDate: '2026-09-14', officer: 'OFF-102', status: 'Draft' },
  { id: 'RPT-7003', caseId: 'CASE-1027', type: 'Case Summary', createdDate: '2026-08-30', officer: 'OFF-103', status: 'Submitted' },
  { id: 'RPT-7004', caseId: 'CASE-1024', type: 'Daily Report', createdDate: '2026-09-17', officer: 'OFF-101', status: 'Submitted' },
];

export const notifications = [
  { id: 'N1', text: 'FIR approval pending for CASE-1025', time: '10 min ago', read: false, type: 'fir' },
  { id: 'N2', text: 'New CCTV evidence uploaded to CASE-1024', time: '1 hr ago', read: false, type: 'evidence' },
  { id: 'N3', text: 'Investigation update added to CASE-1026', time: '3 hr ago', read: false, type: 'investigation' },
  { id: 'N4', text: 'New complaint registered — COMP-5004', time: 'Yesterday', read: true, type: 'complaint' },
  { id: 'N5', text: 'FIR-3004 approved for CASE-1027', time: '2 days ago', read: true, type: 'fir' },
];

export const recentActivity = [
  { id: 'A1', text: 'Complaint COMP-5004 registered by Officer Karthik Iyer', time: '2 hr ago' },
  { id: 'A2', text: 'FIR-3002 generated for CASE-1025', time: '5 hr ago' },
  { id: 'A3', text: 'Evidence EVD-9004 (Face Recognition) uploaded to CASE-1024', time: '1 day ago' },
  { id: 'A4', text: 'Investigation update added to CASE-1024', time: '1 day ago' },
  { id: 'A5', text: 'Daily Report RPT-7004 generated for CASE-1024', time: '1 day ago' },
];

export const crimeCategoryData = [
  { name: 'Theft', value: 34 }, { name: 'Cybercrime', value: 21 }, { name: 'Burglary', value: 15 },
  { name: 'Assault', value: 12 }, { name: 'Missing Person', value: 9 }, { name: 'Other', value: 9 },
];

export const crimeTrendData = [
  { month: 'Apr', cases: 38 }, { month: 'May', cases: 42 }, { month: 'Jun', cases: 35 },
  { month: 'Jul', cases: 47 }, { month: 'Aug', cases: 41 }, { month: 'Sep', cases: 29 },
];

export const caseStatusData = [
  { name: 'Active', value: 3 }, { name: 'Under Investigation', value: 1 }, { name: 'Closed', value: 1 },
];

export const firStatusData = [
  { name: 'Draft', value: 1 }, { name: 'Pending Approval', value: 1 }, { name: 'Approved', value: 2 },
];

export const officerActivityData = officers.map(o => ({ name: o.name.replace('Officer ', ''), active: o.activeCases, completed: o.completedCases }));

export const caseTimelineSteps = (caseId) => ([
  { label: 'Complaint Registered', done: true, date: complaints.find(c => c.caseId === caseId)?.date },
  { label: 'Case Created', done: true, date: cases.find(c => c.id === caseId)?.createdDate },
  { label: 'FIR Generated', done: !!firs.find(f => f.caseId === caseId) },
  { label: 'FIR Approved', done: firs.find(f => f.caseId === caseId)?.status === 'Approved' },
  { label: 'Evidence Added', done: evidenceItems.some(e => e.caseId === caseId) },
  { label: 'Investigation Started', done: !!investigationTasks[caseId] },
  { label: 'Investigation Updates', done: !!investigationUpdates[caseId] },
  { label: 'Report Generated', done: reports.some(r => r.caseId === caseId) },
]);

export const legalProvisions = [
  { id: 'BNS-303', code: 'BNS Section 303', title: 'Theft', text: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.', source: 'Bharatiya Nyaya Sanhita, 2023', page: 'p. 84' },
  { id: 'BNS-305', code: 'BNS Section 305', title: 'Theft of motor vehicle', text: 'Enhanced provisions applicable where the property stolen is a motor vehicle, including aggravating circumstances.', source: 'Bharatiya Nyaya Sanhita, 2023', page: 'p. 87' },
  { id: 'BNS-318', code: 'BNS Section 318', title: 'Cheating', text: 'Whoever deceives any person, fraudulently or dishonestly induces the person to deliver property, is said to cheat.', source: 'Bharatiya Nyaya Sanhita, 2023', page: 'p. 96' },
  { id: 'BNS-351', code: 'BNS Section 351', title: 'Criminal Intimidation', text: 'Whoever threatens another with injury to person, reputation or property with intent to cause alarm, commits criminal intimidation.', source: 'Bharatiya Nyaya Sanhita, 2023', page: 'p. 112' },
  { id: 'BNSS-173', code: 'BNSS Section 173', title: 'Information in cognizable cases', text: 'Every information relating to the commission of a cognizable offence shall be recorded by the officer in charge of a police station.', source: 'Bharatiya Nagarik Suraksha Sanhita, 2023', page: 'p. 22' },
];

export const ragSources = [
  { id: 'RS-1', title: 'BNS Section 303 — Theft', chunk: 'Whoever, intending to take dishonestly any movable property out of the possession of any person...', relevance: 0.94, doc: 'Bharatiya Nyaya Sanhita, 2023' },
  { id: 'RS-2', title: 'SOP: Vehicle Theft Investigation', chunk: 'On receipt of a vehicle theft complaint, officers shall verify registration details and circulate the vehicle description...', relevance: 0.88, doc: 'Police SOP Manual, Ch. 7' },
  { id: 'RS-3', title: 'Circular 2025/44 — Evidence Handling', chunk: 'All digital evidence including CCTV extracts must be hash-verified at the time of collection...', relevance: 0.81, doc: 'State Police HQ Circular' },
];

export const sops = [
  { id: 'SOP-1', title: 'Vehicle Theft Investigation Protocol', category: 'Investigation', updated: '2026-02-10' },
  { id: 'SOP-2', title: 'First Response to Missing Person Reports', category: 'Response', updated: '2025-11-22' },
  { id: 'SOP-3', title: 'Digital Evidence Collection & Chain of Custody', category: 'Evidence', updated: '2026-04-03' },
  { id: 'SOP-4', title: 'Cybercrime Complaint Handling', category: 'Investigation', updated: '2026-01-15' },
];

export const circulars = [
  { id: 'CIR-1', title: 'Circular 2025/44 — Digital Evidence Handling Standards', date: '2025-12-01' },
  { id: 'CIR-2', title: 'Circular 2026/09 — Updated FIR Filing Timelines under BNSS', date: '2026-03-18' },
  { id: 'CIR-3', title: 'Circular 2026/21 — Cybercrime Reporting Escalation Matrix', date: '2026-06-05' },
];

export const getCaseById = (id) => cases.find(c => c.id === id);
export const getOfficerById = (id) => officers.find(o => o.id === id);
export const getComplaintByCase = (caseId) => complaints.find(c => c.caseId === caseId);
export const getFIRByCase = (caseId) => firs.find(f => f.caseId === caseId);
export const getEvidenceByCase = (caseId) => evidenceItems.filter(e => e.caseId === caseId);
export const getReportsByCase = (caseId) => reports.filter(r => r.caseId === caseId);
export const getCasesByOfficer = (officerId) => cases.filter(c => c.assignedOfficer === officerId);
