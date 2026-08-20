// Mock Database for Institutional Placement Management System

export const INITIAL_COMPANIES = [
  {
    id: "comp-1",
    name: "TechCorp Global",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
    industry: "Software & Cloud Architecture",
    website: "https://techcorpglobal.example.com",
    headquarters: "Bangalore, India",
    status: "Verified",
    recruiterEmail: "recruiter@techcorp.com",
    recruiterName: "Sarah Jenkins",
    description: "Leading cloud computing and AI software solutions provider working with Fortune 500 enterprises."
  },
  {
    id: "comp-2",
    name: "Innovate AI Labs",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80",
    industry: "Artificial Intelligence & Data Science",
    website: "https://innovateai.example.com",
    headquarters: "Hyderabad, India",
    status: "Verified",
    recruiterEmail: "careers@innovateai.com",
    recruiterName: "Alex Mercer",
    description: "Cutting-edge research laboratory specializing in generative AI, natural language processing, and computer vision."
  },
  {
    id: "comp-3",
    name: "FinPulse Solutions",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80",
    industry: "Fintech & Banking Systems",
    website: "https://finpulse.example.com",
    headquarters: "Mumbai, India",
    status: "Verified",
    recruiterEmail: "hiring@finpulse.com",
    recruiterName: "David Vance",
    description: "High-frequency trading platforms, algorithmic risk assessment, and global payment engine development."
  },
  {
    id: "comp-4",
    name: "CyberShield Systems",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80",
    industry: "Cybersecurity & Defence Infrastructure",
    website: "https://cybershield.example.com",
    headquarters: "Pune, India",
    status: "Pending",
    recruiterEmail: "talent@cybershield.com",
    recruiterName: "Priya Sharma",
    description: "Next-gen threat intelligence, zero-trust network security, and automated vulnerability scanning."
  }
];

export const INITIAL_JOBS = [
  {
    id: "job-101",
    companyId: "comp-1",
    companyName: "TechCorp Global",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
    title: "Graduate Software Engineer (SDE-1)",
    roleType: "Full-Time",
    ctc: "16.5 LPA",
    numericCtc: 16.5,
    location: "Bangalore / Hybrid",
    minCgpa: 7.5,
    eligibleDepartments: ["Computer Science & Engineering", "Information Technology", "Electronics & Comm."],
    deadline: "2026-08-15",
    description: "We are seeking dynamic computer science graduates to join our Core Platforms team. You will build microservices in Go/Python, design scalable REST & GraphQL APIs, and optimize cloud deployments on AWS/Kubernetes.",
    requirements: [
      "Proficiency in Data Structures & Algorithms",
      "Strong understanding of OOPs, DBMS, Operating Systems, and Computer Networks",
      "Hands-on experience with Python, Java, or TypeScript",
      "Familiarity with React or modern frontend frameworks is a plus"
    ],
    postedDate: "2026-07-20",
    applicantsCount: 42,
    status: "Active"
  },
  {
    id: "job-102",
    companyId: "comp-2",
    companyName: "Innovate AI Labs",
    companyLogo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80",
    title: "AI / Machine Learning Engineer Trainee",
    roleType: "Full-Time",
    ctc: "22.0 LPA",
    numericCtc: 22.0,
    location: "Hyderabad",
    minCgpa: 8.0,
    eligibleDepartments: ["Computer Science & Engineering", "Data Science & AI", "Electronics & Comm."],
    deadline: "2026-08-25",
    description: "Work directly alongside AI research scientists to train, fine-tune, and deploy Large Language Models (LLMs) and computer vision neural networks into production environments.",
    requirements: [
      "Solid foundation in Linear Algebra, Probability, and Deep Learning mathematics",
      "Experience with PyTorch, TensorFlow, and HuggingFace Transformers",
      "Good command over Python and CUDA optimization principles",
      "Demonstrated projects or Kaggle achievements"
    ],
    postedDate: "2026-07-22",
    applicantsCount: 68,
    status: "Active"
  },
  {
    id: "job-103",
    companyId: "comp-3",
    companyName: "FinPulse Solutions",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80",
    title: "Backend Engineer - High Performance Systems",
    roleType: "Full-Time",
    ctc: "14.0 LPA",
    numericCtc: 14.0,
    location: "Mumbai",
    minCgpa: 7.0,
    eligibleDepartments: ["Computer Science & Engineering", "Information Technology", "Electrical Eng."],
    deadline: "2026-08-10",
    description: "Develop low-latency transactional pipelines, fraud detection services, and real-time event streaming systems for national banking clients.",
    requirements: [
      "Strong Java 17+, C++, or Rust development skills",
      "Understanding of distributed caching (Redis, Memcached) and Kafka message queues",
      "Experience with SQL query tuning and database indexing strategies"
    ],
    postedDate: "2026-07-18",
    applicantsCount: 31,
    status: "Active"
  },
  {
    id: "job-104",
    companyId: "comp-1",
    companyName: "TechCorp Global",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
    title: "Cloud Infrastructure & DevOps Intern",
    roleType: "Internship + PPO",
    ctc: "45,000 / month (Stipend)",
    numericCtc: 6.0,
    location: "Remote / Bangalore",
    minCgpa: 6.5,
    eligibleDepartments: ["Computer Science & Engineering", "Information Technology", "Electronics & Comm.", "Mechanical Eng."],
    deadline: "2026-08-05",
    description: "6-month internship focusing on CI/CD pipelines, Docker containerization, Infrastructure as Code (Terraform), and cloud monitoring tools.",
    requirements: [
      "Basic knowledge of Linux shell scripting",
      "Understanding of Git workflows and GitHub Actions",
      "Eagerness to learn AWS Cloud Practitioner concepts"
    ],
    postedDate: "2026-07-15",
    applicantsCount: 25,
    status: "Active"
  }
];

export const INITIAL_STUDENTS = [
  {
    id: "stud-001",
    userId: "user-stud-1",
    rollNumber: "2022CSE0104",
    name: "Rohan Varma",
    email: "rohan.varma@inst.edu.in",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    batch: "2022-2026",
    cgpa: 8.92,
    skills: ["React.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "Docker"],
    placementStatus: "Placed", // 'Placed' | 'Unplaced' | 'In Process'
    placedCompany: "Innovate AI Labs",
    offeredCtc: "22.0 LPA",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Rohan_Varma_Resume_SDE.pdf",
    atsScore: 94,
    linkedin: "https://linkedin.com/in/rohanvarma-demo",
    github: "https://github.com/rohanvarma-demo",
    bio: "Passionate full-stack & AI software builder. 2x Hackathon finalist, campus tech club coordinator."
  },
  {
    id: "stud-002",
    userId: "user-stud-2",
    rollNumber: "2022ECE0045",
    name: "Ananya Iyer",
    email: "ananya.iyer@inst.edu.in",
    phone: "+91 98123 45678",
    department: "Electronics & Comm.",
    batch: "2022-2026",
    cgpa: 8.15,
    skills: ["Embedded C", "Python", "Verilog", "MATLAB", "IoT Protocols"],
    placementStatus: "In Process",
    placedCompany: null,
    offeredCtc: null,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Ananya_Iyer_ECE_Resume.pdf",
    atsScore: 82,
    linkedin: "https://linkedin.com/in/ananyaiyer-demo",
    github: "https://github.com/ananyaiyer-demo",
    bio: "ECE student with a strong interest in VLSI design, IoT devices, and firmware development."
  },
  {
    id: "stud-003",
    userId: "user-stud-3",
    rollNumber: "2022CSE0198",
    name: "Vikram Malhotra",
    email: "vikram.m@inst.edu.in",
    phone: "+91 97654 32109",
    department: "Computer Science & Engineering",
    batch: "2022-2026",
    cgpa: 7.85,
    skills: ["Java", "Spring Boot", "MySQL", "AWS", "Git"],
    placementStatus: "Unplaced",
    placedCompany: null,
    offeredCtc: null,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Vikram_Malhotra_Java_Dev.pdf",
    atsScore: 78,
    linkedin: "https://linkedin.com/in/vikrammalhotra-demo",
    github: "https://github.com/vikramm-demo",
    bio: "Backend developer specializing in Java enterprise applications and relational databases."
  },
  {
    id: "stud-004",
    userId: "user-stud-4",
    rollNumber: "2022IT0012",
    name: "Kavya Patel",
    email: "kavya.patel@inst.edu.in",
    phone: "+91 96543 21098",
    department: "Information Technology",
    batch: "2022-2026",
    cgpa: 9.40,
    skills: ["Python", "Machine Learning", "Pandas", "Scikit-Learn", "SQL", "Tableau"],
    placementStatus: "Placed",
    placedCompany: "TechCorp Global",
    offeredCtc: "16.5 LPA",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Kavya_Patel_Data_Scientist.pdf",
    atsScore: 96,
    linkedin: "https://linkedin.com/in/kavyapatel-demo",
    github: "https://github.com/kavyapatel-demo",
    bio: "Department gold medalist with published research paper on predictive analytics."
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-301",
    jobId: "job-101",
    studentId: "stud-001",
    studentName: "Rohan Varma",
    studentEmail: "rohan.varma@inst.edu.in",
    studentRoll: "2022CSE0104",
    department: "Computer Science & Engineering",
    cgpa: 8.92,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Rohan_Varma_Resume_SDE.pdf",
    atsScore: 94,
    status: "Selected", // 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Selected' | 'Rejected'
    appliedDate: "2026-07-21",
    coverNote: "I have built multiple scalable microservice applications in Go & React. Eager to contribute to TechCorp Global!"
  },
  {
    id: "app-302",
    jobId: "job-102",
    studentId: "stud-001",
    studentName: "Rohan Varma",
    studentEmail: "rohan.varma@inst.edu.in",
    studentRoll: "2022CSE0104",
    department: "Computer Science & Engineering",
    cgpa: 8.92,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Rohan_Varma_Resume_SDE.pdf",
    atsScore: 94,
    status: "Selected",
    appliedDate: "2026-07-22",
    coverNote: "Deep experience with PyTorch and fine-tuning Transformer architectures."
  },
  {
    id: "app-303",
    jobId: "job-101",
    studentId: "stud-003",
    studentName: "Vikram Malhotra",
    studentEmail: "vikram.m@inst.edu.in",
    studentRoll: "2022CSE0198",
    department: "Computer Science & Engineering",
    cgpa: 7.85,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Vikram_Malhotra_Java_Dev.pdf",
    atsScore: 78,
    status: "Interview Scheduled",
    appliedDate: "2026-07-21",
    coverNote: "Strong foundation in Java microservices and cloud deployment."
  },
  {
    id: "app-304",
    jobId: "job-103",
    studentId: "stud-002",
    studentName: "Ananya Iyer",
    studentEmail: "ananya.iyer@inst.edu.in",
    studentRoll: "2022ECE0045",
    department: "Electronics & Comm.",
    cgpa: 8.15,
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Ananya_Iyer_ECE_Resume.pdf",
    atsScore: 82,
    status: "Shortlisted",
    appliedDate: "2026-07-20",
    coverNote: "Analytical thinker with high proficiency in C++ algorithms."
  }
];

export const PLACEMENT_STATS = {
  overallPlacementRate: 84.5, // percentage
  totalEligibleStudents: 520,
  totalPlacedStudents: 439,
  totalOffersExtended: 582,
  highestPackage: "48.0 LPA",
  averagePackage: "11.8 LPA",
  medianPackage: "9.5 LPA",
  topCompaniesCount: 65,

  departmentStats: [
    { department: "Computer Science (CSE)", placed: 96, unplaced: 4, avgCtc: 16.2, highestCtc: 48.0 },
    { department: "Information Tech (IT)", placed: 92, unplaced: 8, avgCtc: 14.5, highestCtc: 36.0 },
    { department: "Electronics (ECE)", placed: 81, unplaced: 19, avgCtc: 10.8, highestCtc: 24.0 },
    { department: "Electrical (EEE)", placed: 75, unplaced: 25, avgCtc: 8.6, highestCtc: 18.0 },
    { department: "Mechanical (ME)", placed: 68, unplaced: 32, avgCtc: 7.2, highestCtc: 14.0 },
    { department: "Civil Eng. (CE)", placed: 62, unplaced: 38, avgCtc: 6.5, highestCtc: 12.0 }
  ],

  yearlyTrends: [
    { year: "2022", placementRate: 74, avgCtc: 8.2, highestCtc: 32.0 },
    { year: "2023", placementRate: 79, avgCtc: 9.5, highestCtc: 38.0 },
    { year: "2024", placementRate: 82, avgCtc: 10.4, highestCtc: 42.0 },
    { year: "2025", placementRate: 83.5, avgCtc: 11.2, highestCtc: 45.0 },
    { year: "2026 (Current)", placementRate: 84.5, avgCtc: 11.8, highestCtc: 48.0 }
  ],

  ctcDistribution: [
    { range: "< 6 LPA", count: 42 },
    { range: "6 - 10 LPA", count: 184 },
    { range: "10 - 15 LPA", count: 125 },
    { range: "15 - 25 LPA", count: 68 },
    { range: "> 25 LPA", count: 20 }
  ]
};
