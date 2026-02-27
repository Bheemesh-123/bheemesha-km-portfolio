// ─── Single Source of Truth ───────────────────────────────────────────────────
// Edit this file to update every section of the portfolio.

export const profile = {
  name: "Bheemesha K M",
  role: "Apprentice Data Scientist",
  location: "Bengaluru, Karnataka, India",
  email: "bheemesh.k.m8497@gmail.com",
  phone: "+91-7483204853",
  github: "https://github.com/Bheemesh-123",
  linkedin: "https://www.linkedin.com/in/bheemesha-k-m-471ba9252",
  resumePath: "/resume",

  /**
   * Web3Forms public access key (safe for client-side use).
   * Get yours free at https://web3forms.com — enter your email and you'll get the key.
   * Messages will be delivered directly to your email inbox in real-time.
   * Leave empty string to fall back to mailto: links.
   */
  web3formsKey: "2e723059-fb71-4da6-b5fc-63c2a66cc644",

  /** Roles the user is targeting — shown in hero typewriter and opportunity badges */
  targetRoles: [
    "Junior Data Scientist",
    "Data Scientist",
    "AI / Machine Learning Engineer",
    "Data Analyst",
    "Data Engineer",
    "ML / DL Engineer",
    "Computer Vision Engineer",
    "AI Solutions Developer",
    "Business Intelligence Analyst",
    "NLP Engineer",
  ],

  hero: {
    headline: "Hi, I'm Bheemesha 👋",
    subtitle:
      "Apprentice Data Scientist with hands-on experience in ML/DL, EDA, and segmentation model experimentation.\nI build practical AI solutions and data-driven systems.",
  },

  about: {
    paragraphs: [
      "I completed an apprenticeship at Target Corporation India Pvt. Ltd. as an Apprentice Data Scientist under the AI–Data Scientist curriculum (Sep 3, 2025 – Mar 2, 2026). The program encompassed company culture and values, soft skills, and a comprehensive end-to-end data science foundation — covering Python, mathematics, probability, statistics, EDA, supervised/unsupervised/reinforcement learning, neural networks, and Andrew Ng's Machine Learning Specialization.",
      "I enjoy building practical AI solutions, experimenting with models and pipelines, and designing evaluation metrics to compare approaches for real-world use cases.",
    ],
    quickFacts: [
      { label: "Location", value: "Bengaluru, India" },
      { label: "Degree", value: "B.E. in CSE (CGPA 9.03)" },
      { label: "Focus", value: "ML / DL / Computer Vision" },
      { label: "Status", value: "Open to DS, ML & Analyst roles" },
    ],
  },

  skills: [
    {
      category: "Programming",
      items: ["Python", "Java"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB"],
    },
    {
      category: "Data / AI",
      items: [
        "Machine Learning",
        "Deep Learning",
        "EDA",
        "Gen-AI",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "NumPy",
        "scikit-learn",
      ],
    },
    {
      category: "Tools",
      items: ["Power BI (basic)", "RPA (basic)"],
    },
    {
      category: "Web",
      items: ["HTML", "CSS"],
    },
  ],

  experience: [
    {
      company: "Target Corporation India Pvt. Ltd.",
      location: "Bengaluru",
      role: "Apprentice Data Scientist",
      period: "Sep 3, 2025 – Mar 2, 2026",
      status: "Apprenticeship completed (Mar 2, 2026)",
      bullets: [
        "Apprenticeship covering Python, probability, statistics, EDA, ML algorithms, and neural networks.",
        "Proof-of-concept for Image Generation segmentation: experimented with SAM2 (Segment Anything Model 2), BiRefNet_HR, Inspyrenet, DiffDIS, and IS-NET.",
        "Built evaluation pipelines and metrics to compare segmentation models and recommend the best approach for the use case.",
      ],
    },
    {
      company:
        "VTU Internship (NSDC, NASSCOM, IBM collaboration; Rooman Technologies, Wadhwani Foundation)",
      location: "",
      role: "Intern",
      period: "Sep 2024 – May 2025",
      status: "",
      bullets: [
        "Learned Python programming, ML concepts, networking basics, prompt engineering, and Power BI.",
        'Built a "Virtual Painter" application using computer vision with interactive features.',
      ],
    },
  ],

  projects: [
    {
      title: "Face Recognition–Based Employee Attendance System",
      tagline: "Touchless, automated attendance using facial recognition.",
      description:
        "An automated attendance system that identifies employees through facial recognition, eliminating manual processes and preventing proxy attendance.",
      bullets: [
        "Automated attendance tracking by identifying employees via facial recognition, reducing manual effort.",
        "Improved accuracy and security by preventing proxy attendance.",
        "Generated real-time attendance logs/reports to support HR workflows.",
      ],
      tech: ["Python", "OpenCV", "NumPy"],
      repoUrl: null,
      demoUrl: null,
      featured: true,
    },
    {
      title: "Sports Management System",
      tagline: "Role-based sports activity management for institutions.",
      description:
        "A web application for managing sports activities, player information, and results with role-based access control.",
      bullets: [
        "Developed a web app to manage sports activities and player information.",
        "Implemented two user roles (Admin/User) with permissions.",
        "Integrated MySQL for storing activities, players, and results.",
      ],
      tech: ["HTML", "CSS", "JavaScript", "MySQL"],
      repoUrl: null,
      demoUrl: null,
      featured: true,
    },
    {
      title: "AI-Driven Healthcare Assistant with Blockchain Records",
      tagline:
        "Symptom analysis + secure medical records using AI and blockchain.",
      description:
        "A comprehensive healthcare platform combining AI-driven diagnostics with blockchain-based tamper-proof medical record management.",
      bullets: [
        "Implemented AI-driven symptom analysis, specialist recommendations, and appointment scheduling.",
        "Integrated AI chatbot with blockchain-based tamper-proof medical record management.",
        "Added secure authentication (facial recognition + ID verification) and a personalized e-shop recommendation flow.",
      ],
      tech: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "React.js",
        "Node.js",
        "Solidity",
        "Web3.js",
        "MongoDB",
        "Firebase",
      ],
      repoUrl: null,
      demoUrl: null,
      featured: true,
    },
    {
      title: "Virtual Painter",
      tagline: "Real-time virtual painting using computer vision.",
      description:
        "An interactive computer vision–based virtual painting system built during internship, enabling real-time drawing via live camera input.",
      bullets: [
        "Built an interactive CV-based virtual painting system during internship.",
        "Enabled smooth drawing interactions and real-time feedback.",
        "Focused on usability and performance for live camera input.",
      ],
      tech: ["Python", "OpenCV"],
      repoUrl: null,
      demoUrl: null,
      featured: true,
    },
  ],

  education: [
    {
      institution: "Ballari Institute of Technology and Management",
      degree: "B.E. in Computer Science and Engineering",
      cgpa: "9.03 / 10",
      period: "Dec 2021 – Jun 2025",
    },
  ],

  certifications: [
    {
      title: "Salesforce AI Associate",
      link: "https://www.salesforce.com/trailblazer/kuwnbhe7c85bd06ak6",
    },
    {
      title: "Python Programming Internship",
      link: null,
    },
    {
      title: "Machine Learning Specialization — Coursera (Andrew Ng)",
      link: null,
    },
  ],

  extras: {
    extracurricular: ["Actively participated in Kabaddi and Cricket"],
    coursework: [
      "Data Structures and Algorithms",
      "Database Management System",
      "Operating System",
      "Computer Networks",
    ],
  },

  seo: {
    title: "Bheemesha K M — Data Scientist | ML Engineer | AI Developer",
    description:
      "Portfolio of Bheemesha K M — Apprentice Data Scientist seeking Junior Data Scientist, Data Analyst, ML Engineer, Data Engineer, and AI roles. Experienced in ML/DL, EDA, computer vision, and building data-driven systems.",
    url: "https://bheemesha.vercel.app",
    ogImage: "/og-image.png",
  },
} as const;

export type Profile = typeof profile;
