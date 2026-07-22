export interface FreeCert {
  name: string;
  provider: string;
  providerIcon: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
}

export const freeCertifications: FreeCert[] = [
  // Google
  { name: "Google IT Support Professional Certificate", provider: "Google", providerIcon: "🔍", category: "IT Support", description: "Foundational IT skills including troubleshooting, networking, security, and system administration.", url: "https://www.coursera.org/professional-certificates/google-it-support", tags: ["IT", "Networking", "Support"] },
  { name: "Google Data Analytics Certificate", provider: "Google", providerIcon: "🔍", category: "Data Analytics", description: "Data cleaning, analysis, visualization, and SQL using real-world datasets.", url: "https://www.coursera.org/professional-certificates/google-data-analytics", tags: ["Data", "SQL", "Analytics"] },
  { name: "Google UX Design Certificate", provider: "Google", providerIcon: "🔍", category: "UX Design", description: "User experience research, wireframing, prototyping, and usability testing.", url: "https://www.coursera.org/professional-certificates/google-ux-design", tags: ["UX", "Design", "Prototyping"] },
  { name: "Google Project Management Certificate", provider: "Google", providerIcon: "🔍", category: "Project Management", description: "Agile project management, Scrum methodology, and stakeholder management.", url: "https://www.coursera.org/professional-certificates/google-project-management", tags: ["PM", "Agile", "Scrum"] },
  { name: "Google Cybersecurity Certificate", provider: "Google", providerIcon: "🔍", category: "Cybersecurity", description: "Security risks, networks, Linux, SQL, Python, and SIEM tools.", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", tags: ["Security", "Python", "Linux"] },
  { name: "Google AI Essentials", provider: "Google", providerIcon: "🔍", category: "AI", description: "Practical AI skills — prompt engineering, responsible AI use, and AI tools for productivity.", url: "https://www.coursera.org/ai-essentials", tags: ["AI", "Prompt Engineering"] },
  { name: "Google Digital Marketing Certificate", provider: "Google", providerIcon: "🔍", category: "Marketing", description: "SEO, SEM, social media, email marketing, and e-commerce fundamentals.", url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce", tags: ["Marketing", "SEO", "Ads"] },
  { name: "Google Android Developer Certificate", provider: "Google", providerIcon: "🔍", category: "Mobile Dev", description: "Android app development with Kotlin, Jetpack Compose, and Material Design.", url: "https://www.coursera.org/professional-certificates/android-developer-google", tags: ["Android", "Kotlin", "Mobile"] },

  // AWS
  { name: "AWS Cloud Practitioner Essentials", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Foundational understanding of AWS Cloud, services, security, pricing, and support.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", tags: ["Cloud", "AWS", "Foundations"] },
  { name: "AWS Machine Learning Foundations", provider: "AWS", providerIcon: "☁️", category: "ML", description: "Introduction to machine learning on AWS with practical exercises.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/100/machine-learning-foundations", tags: ["ML", "AWS", "AI"] },
  { name: "AWS Cloud Technical Essentials", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Core AWS services, compute, database, storage, and networking basics.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/63/cloud-technical-essentials", tags: ["Cloud", "Infrastructure"] },
  { name: "AWS Cloud Quest: Cloud Practitioner", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Gamified cloud learning with hands-on labs and real AWS scenarios.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/11431/cloud-quest-cloud-practitioner", tags: ["Cloud", "Hands-on"] },

  // Meta (Facebook)
  { name: "Meta Front-End Developer Certificate", provider: "Meta", providerIcon: "📘", category: "Frontend", description: "React, responsive design, testing, version control, and UI/UX best practices.", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer", tags: ["React", "Frontend", "UI"] },
  { name: "Meta Back-End Developer Certificate", provider: "Meta", providerIcon: "📘", category: "Backend", description: "Python, Django, APIs, databases, and version control for back-end development.", url: "https://www.coursera.org/professional-certificates/meta-back-end-developer", tags: ["Python", "Django", "APIs"] },
  { name: "Meta Database Engineer Certificate", provider: "Meta", providerIcon: "📘", category: "Database", description: "Database design, SQL, NoSQL, data modeling, and Django ORM.", url: "https://www.coursera.org/professional-certificates/meta-database-engineer", tags: ["SQL", "Database", "Django"] },
  { name: "Meta Social Media Marketing Certificate", provider: "Meta", providerIcon: "📘", category: "Marketing", description: "Social media strategy, content creation, analytics, and advertising on Meta platforms.", url: "https://www.coursera.org/professional-certificates/meta-social-media-marketing", tags: ["Social Media", "Marketing"] },
  { name: "Meta Marketing Analytics Certificate", provider: "Meta", providerIcon: "📘", category: "Analytics", description: "Data analysis, A/B testing, marketing metrics, and SQL for marketing.", url: "https://www.coursera.org/professional-certificates/meta-marketing-analytics", tags: ["Analytics", "SQL", "Marketing"] },

  // IBM
  { name: "IBM Data Science Professional Certificate", provider: "IBM", providerIcon: "🔷", category: "Data Science", description: "Python, SQL, data visualization, machine learning, and Jupyter notebooks.", url: "https://www.coursera.org/professional-certificates/ibm-data-science", tags: ["Python", "ML", "Data"] },
  { name: "IBM AI Engineering Professional Certificate", provider: "IBM", providerIcon: "🔷", category: "AI/ML", description: "Machine learning, deep learning, NLP, and computer vision with TensorFlow and PyTorch.", url: "https://www.coursera.org/professional-certificates/ibm-ai-engineering", tags: ["AI", "Deep Learning", "TensorFlow"] },
  { name: "IBM Cybersecurity Analyst Certificate", provider: "IBM", providerIcon: "🔷", category: "Cybersecurity", description: "Incident response, digital forensics, threat intelligence, and security tools.", url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst", tags: ["Security", "Forensics"] },
  { name: "IBM Full Stack Cloud Developer Certificate", provider: "IBM", providerIcon: "🔷", category: "Full Stack", description: "Cloud-native app development with React, Node.js, Docker, Kubernetes, and IBM Cloud.", url: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer", tags: ["Full Stack", "Cloud", "DevOps"] },
  { name: "IBM Data Analyst Professional Certificate", provider: "IBM", providerIcon: "🔷", category: "Data Analytics", description: "Excel, Python, Cognos Analytics, and data visualization techniques.", url: "https://www.coursera.org/professional-certificates/ibm-data-analyst", tags: ["Analytics", "Python", "Excel"] },

  // Microsoft
  { name: "Microsoft Azure AI Fundamentals (AI-900)", provider: "Microsoft", providerIcon: "🟦", category: "AI", description: "Azure AI services, computer vision, NLP, conversational AI, and responsible AI.", url: "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/", tags: ["AI", "Azure", "Cloud"] },
  { name: "Microsoft Azure Data Fundamentals (DP-900)", provider: "Microsoft", providerIcon: "🟦", category: "Data", description: "Relational and non-relational data, analytics workloads, and Azure data services.", url: "https://learn.microsoft.com/en-us/training/paths/get-started-with-data-on-azure/", tags: ["Data", "Azure", "SQL"] },
  { name: "Microsoft Azure Fundamentals (AZ-900)", provider: "Microsoft", providerIcon: "🟦", category: "Cloud", description: "Cloud concepts, Azure services, pricing, SLA, and governance.", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-cloud-concepts/", tags: ["Cloud", "Azure", "Fundamentals"] },
  { name: "Microsoft Security Fundamentals (SC-900)", provider: "Microsoft", providerIcon: "🟦", category: "Security", description: "Zero trust, security operations, identity management, and compliance.", url: "https://learn.microsoft.com/en-us/training/paths/describe-concepts-of-security-operations/", tags: ["Security", "Identity", "Compliance"] },
  { name: "Microsoft Power Platform Fundamentals (PL-900)", provider: "Microsoft", providerIcon: "🟦", category: "Low-Code", description: "Power Apps, Power Automate, Power BI, and Power Virtual Agents basics.", url: "https://learn.microsoft.com/en-us/training/paths/power-platform-fundamentals/", tags: ["Low-Code", "Power Platform"] },

  // Salesforce
  { name: "Salesforce Administrator Certificate", provider: "Salesforce", providerIcon: "☁️", category: "CRM", description: "Salesforce configuration, user management, security, automation, and reporting.", url: "https://trailhead.salesforce.com/content/learn/trails/force_com_admin_beginner", tags: ["CRM", "Salesforce", "Admin"] },
  { name: "Salesforce Platform Developer Basics", provider: "Salesforce", providerIcon: "☁️", category: "Dev", description: "Apex, Visualforce, Lightning components, and Salesforce development fundamentals.", url: "https://trailhead.salesforce.com/content/learn/trails/force_com_platform_developer_beginner", tags: ["Dev", "Apex", "Lightning"] },
  { name: "Salesforce AI Associate", provider: "Salesforce", providerIcon: "☁️", category: "AI", description: "Responsible AI, Einstein AI tools, and AI-driven CRM workflows.", url: "https://trailhead.salesforce.com/en/content/learn/trails/ai-associate", tags: ["AI", "CRM", "Einstein"] },

  // HubSpot
  { name: "HubSpot Inbound Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Marketing", description: "Inbound methodology, content strategy, conversion optimization, and lead nurturing.", url: "https://academy.hubspot.com/courses/inbound-marketing", tags: ["Marketing", "Inbound", "Content"] },
  { name: "HubSpot Content Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Marketing", description: "Content creation, blogging strategy, storytelling, and content promotion.", url: "https://academy.hubspot.com/courses/content-marketing", tags: ["Content", "Blogging", "Strategy"] },
  { name: "HubSpot SEO Certification", provider: "HubSpot", providerIcon: "🟠", category: "SEO", description: "Keyword research, on-page SEO, link building, and technical SEO.", url: "https://academy.hubspot.com/courses/seo-training", tags: ["SEO", "Keywords", "Link Building"] },
  { name: "HubSpot Email Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Email", description: "Email strategy, segmentation, deliverability, and automation.", url: "https://academy.hubspot.com/courses/email-marketing", tags: ["Email", "Automation"] },
  { name: "HubSpot Sales Software Certification", provider: "HubSpot", providerIcon: "🟠", category: "Sales", description: "CRM usage, pipeline management, email tracking, and sales automation.", url: "https://academy.hubspot.com/courses/sales-software", tags: ["Sales", "CRM", "Automation"] },

  // Coursera / edX
  { name: "CS50: Introduction to Computer Science", provider: "Harvard (edX)", providerIcon: "🎓", category: "CS Foundations", description: "Harvard's legendary intro CS course — C, Python, SQL, algorithms, data structures, web development.", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x", tags: ["CS", "Python", "C"] },
  { name: "Machine Learning by Andrew Ng", provider: "Stanford (Coursera)", providerIcon: "🎓", category: "ML", description: "Supervised learning, neural networks, best practices, and unsupervised learning.", url: "https://www.coursera.org/learn/machine-learning", tags: ["ML", "Neural Networks"] },
  { name: "Deep Learning Specialization", provider: "DeepLearning.AI", providerIcon: "🎓", category: "Deep Learning", description: "Neural networks, CNNs, RNNs, transformers, and practical DL projects.", url: "https://www.coursera.org/specializations/deep-learning", tags: ["DL", "CNN", "RNN"] },
  { name: "Google IT Automation with Python", provider: "Google (Coursera)", providerIcon: "🔍", category: "Automation", description: "Python scripting, Git, IT automation, configuration management, and troubleshooting.", url: "https://www.coursera.org/professional-certificates/google-it-automation", tags: ["Python", "Automation", "Git"] },

  // GitHub / DevOps
  { name: "GitHub Foundations Certification", provider: "GitHub", providerIcon: "🐙", category: "DevOps", description: "Git basics, GitHub collaboration, project management, and GitHub Actions.", url: "https://skills.github.com/", tags: ["Git", "GitHub", "CI/CD"] },
  { name: "Kubernetes for Beginners", provider: "KodeKloud", providerIcon: "🐳", category: "DevOps", description: "Kubernetes fundamentals — pods, services, deployments, and cluster management.", url: "https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners/", tags: ["Kubernetes", "Docker", "DevOps"] },

  // Cisco
  { name: "Cisco Networking Academy (CCNA Prep)", provider: "Cisco", providerIcon: "🌐", category: "Networking", description: "Network fundamentals, IP connectivity, security fundamentals, and automation.", url: "https://www.netacad.com/courses/networking", tags: ["Networking", "CCNA", "Infrastructure"] },
  { name: "Cisco Python Essentials", provider: "Cisco", providerIcon: "🌐", category: "Python", description: "Python basics, data types, control flow, functions, and OOP.", url: "https://skillsnetworklabs.com/collections/courses/products/cb980d1f-ce86-4a66-bd15-24eb05a20f3d", tags: ["Python", "Fundamentals"] },

  // Linux Foundation
  { name: "Introduction to Linux (LFS101)", provider: "Linux Foundation", providerIcon: "🐧", category: "Linux", description: "Linux fundamentals — file system, shell commands, permissions, and system administration.", url: "https://training.linuxfoundation.org/training/introduction-to-linux/", tags: ["Linux", "Shell", "Sysadmin"] },

  // MongoDB
  { name: "MongoDB Basics (M001)", provider: "MongoDB", providerIcon: "🍃", category: "Database", description: "MongoDB fundamentals — documents, CRUD operations, indexing, and aggregation.", url: "https://learn.mongodb.com/learning-paths/mongodb-basics", tags: ["NoSQL", "MongoDB", "Database"] },

  // Redis
  { name: "Redis University - Redis Essentials", provider: "Redis", providerIcon: "🔴", category: "Database", description: "Redis data structures, pub/sub, transactions, and Lua scripting.", url: "https://university.redis.com/courses/cs210/", tags: ["Redis", "NoSQL", "Cache"] },
];

export const freeCertCategories = Array.from(new Set(freeCertifications.map((c) => c.category))).sort();
export const freeCertProviders = Array.from(new Set(freeCertifications.map((c) => c.provider))).sort();
