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
  // freeCodeCamp (100% free, no catch)
  { name: "Responsive Web Design", provider: "freeCodeCamp", providerIcon: "🔥", category: "Frontend", description: "HTML, CSS, accessibility, responsive design principles. Build 5 projects to earn the certification.", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", tags: ["HTML", "CSS", "Responsive"] },
  { name: "JavaScript Algorithms and Data Structures", provider: "freeCodeCamp", providerIcon: "🔥", category: "JavaScript", description: "ES6+, regex, debugging, data structures, algorithmic thinking, and OOP.", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", tags: ["JavaScript", "Algorithms", "Data Structures"] },
  { name: "Front End Development Libraries", provider: "freeCodeCamp", providerIcon: "🔥", category: "Frontend", description: "React, Redux, Bootstrap, Sass, and jQuery with project-based learning.", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/", tags: ["React", "Redux", "Bootstrap"] },
  { name: "Data Visualization", provider: "freeCodeCamp", providerIcon: "🔥", category: "Data", description: "D3.js, SVG, Canvas, JSON, AJAX for data-driven visualizations.", url: "https://www.freecodecamp.org/learn/data-visualization/", tags: ["D3.js", "SVG", "Visualization"] },
  { name: " APIs and Microservices", provider: "freeCodeCamp", providerIcon: "🔥", category: "Backend", description: "Node.js, Express, MongoDB, REST APIs, and microservice architecture.", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", tags: ["Node.js", "Express", "MongoDB"] },
  { name: "Quality Assurance", provider: "freeCodeCamp", providerIcon: "🔥", category: "Testing", description: "Chai, Mocha, Node.js testing, and acceptance testing with quality assurance methods.", url: "https://www.freecodecamp.org/learn/quality-assurance/", tags: ["Testing", "Mocha", "Chai"] },
  { name: "Scientific Computing with Python", provider: "freeCodeCamp", providerIcon: "🔥", category: "Python", description: "Python fundamentals, data structures, OOP, and algorithmic thinking with Python.", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", tags: ["Python", "OOP", "Algorithms"] },
  { name: "Data Analysis with Python", provider: "freeCodeCamp", providerIcon: "🔥", category: "Data", description: "NumPy, Pandas, Matplotlib, data cleaning, and analysis with real datasets.", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", tags: ["Python", "Pandas", "NumPy"] },
  { name: "Relational Database Course", provider: "freeCodeCamp", providerIcon: "🔥", category: "Database", description: "PostgreSQL, Bash, Git for relational database management and querying.", url: "https://www.freecodecamp.org/learn/relational-database/", tags: ["PostgreSQL", "SQL", "Bash"] },
  { name: "College Algebra with Python", provider: "freeCodeCamp", providerIcon: "🔥", category: "Math", description: "Linear algebra, quadratic equations, and Python for mathematical computations.", url: "https://www.freecodecamp.org/learn/college-algebra-with-python/", tags: ["Math", "Python", "Algebra"] },

  // AWS Skill Builder (100% free courses)
  { name: "AWS Cloud Practitioner Essentials", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Foundational understanding of AWS Cloud, services, security, pricing, and support.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", tags: ["Cloud", "AWS", "Foundations"] },
  { name: "AWS Machine Learning Foundations", provider: "AWS", providerIcon: "☁️", category: "ML", description: "Introduction to machine learning on AWS with practical exercises.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/100/machine-learning-foundations", tags: ["ML", "AWS", "AI"] },
  { name: "AWS Cloud Technical Essentials", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Core AWS services, compute, database, storage, and networking basics.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/63/cloud-technical-essentials", tags: ["Cloud", "Infrastructure"] },
  { name: "AWS Cloud Quest: Cloud Practitioner", provider: "AWS", providerIcon: "☁️", category: "Cloud", description: "Gamified cloud learning with hands-on labs and real AWS scenarios.", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/11431/cloud-quest-cloud-practitioner", tags: ["Cloud", "Hands-on"] },

  // Microsoft Learn (100% free learning paths)
  { name: "Azure AI Fundamentals (AI-900)", provider: "Microsoft", providerIcon: "🟦", category: "AI", description: "Azure AI services, computer vision, NLP, conversational AI, and responsible AI.", url: "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/", tags: ["AI", "Azure", "Cloud"] },
  { name: "Azure Data Fundamentals (DP-900)", provider: "Microsoft", providerIcon: "🟦", category: "Data", description: "Relational and non-relational data, analytics workloads, and Azure data services.", url: "https://learn.microsoft.com/en-us/training/paths/get-started-with-data-on-azure/", tags: ["Data", "Azure", "SQL"] },
  { name: "Azure Fundamentals (AZ-900)", provider: "Microsoft", providerIcon: "🟦", category: "Cloud", description: "Cloud concepts, Azure services, pricing, SLA, and governance.", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-cloud-concepts/", tags: ["Cloud", "Azure", "Fundamentals"] },
  { name: "Security Fundamentals (SC-900)", provider: "Microsoft", providerIcon: "🟦", category: "Security", description: "Zero trust, security operations, identity management, and compliance.", url: "https://learn.microsoft.com/en-us/training/paths/describe-concepts-of-security-operations/", tags: ["Security", "Identity", "Compliance"] },
  { name: "Power Platform Fundamentals (PL-900)", provider: "Microsoft", providerIcon: "🟦", category: "Low-Code", description: "Power Apps, Power Automate, Power BI, and Power Virtual Agents basics.", url: "https://learn.microsoft.com/en-us/training/paths/power-platform-fundamentals/", tags: ["Low-Code", "Power Platform"] },

  // Salesforce Trailhead (100% free)
  { name: "Salesforce Administrator Trail", provider: "Salesforce", providerIcon: "☁️", category: "CRM", description: "Salesforce configuration, user management, security, automation, and reporting.", url: "https://trailhead.salesforce.com/content/learn/trails/force_com_admin_beginner", tags: ["CRM", "Salesforce", "Admin"] },
  { name: "Salesforce Platform Developer Trail", provider: "Salesforce", providerIcon: "☁️", category: "Dev", description: "Apex, Visualforce, Lightning components, and Salesforce development fundamentals.", url: "https://trailhead.salesforce.com/content/learn/trails/force_com_platform_developer_beginner", tags: ["Dev", "Apex", "Lightning"] },
  { name: "Salesforce AI Associate Trail", provider: "Salesforce", providerIcon: "☁️", category: "AI", description: "Responsible AI, Einstein AI tools, and AI-driven CRM workflows.", url: "https://trailhead.salesforce.com/en/content/learn/trails/ai-associate", tags: ["AI", "CRM", "Einstein"] },

  // HubSpot Academy (100% free certifications)
  { name: "Inbound Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Marketing", description: "Inbound methodology, content strategy, conversion optimization, and lead nurturing.", url: "https://academy.hubspot.com/courses/inbound-marketing", tags: ["Marketing", "Inbound", "Content"] },
  { name: "Content Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Marketing", description: "Content creation, blogging strategy, storytelling, and content promotion.", url: "https://academy.hubspot.com/courses/content-marketing", tags: ["Content", "Blogging", "Strategy"] },
  { name: "SEO Certification", provider: "HubSpot", providerIcon: "🟠", category: "SEO", description: "Keyword research, on-page SEO, link building, and technical SEO.", url: "https://academy.hubspot.com/courses/seo-training", tags: ["SEO", "Keywords", "Link Building"] },
  { name: "Email Marketing Certification", provider: "HubSpot", providerIcon: "🟠", category: "Email", description: "Email strategy, segmentation, deliverability, and automation.", url: "https://academy.hubspot.com/courses/email-marketing", tags: ["Email", "Automation"] },
  { name: "Sales Software Certification", provider: "HubSpot", providerIcon: "🟠", category: "Sales", description: "CRM usage, pipeline management, email tracking, and sales automation.", url: "https://academy.hubspot.com/courses/sales-software", tags: ["Sales", "CRM", "Automation"] },

  // The Odin Project (100% free)
  { name: "Full Stack Ruby on Rails", provider: "The Odin Project", providerIcon: "💎", category: "Full Stack", description: "HTML, CSS, JavaScript, Ruby, Rails, databases, and deployment.", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails", tags: ["Ruby", "Rails", "Full Stack"] },
  { name: "Full Stack JavaScript", provider: "The Odin Project", providerIcon: "💎", category: "Full Stack", description: "HTML, CSS, JavaScript, React, Node.js, databases, and testing.", url: "https://www.theodinproject.com/paths/full-stack-javascript", tags: ["JavaScript", "React", "Node.js"] },

  // Google (free courses on Coursera with free audit)
  { name: "Google IT Automation with Python", provider: "Google", providerIcon: "🔍", category: "Automation", description: "Python scripting, Git, IT automation, configuration management, and troubleshooting.", url: "https://www.coursera.org/professional-certificates/google-it-automation", tags: ["Python", "Automation", "Git"] },
  { name: "Google AI Essentials", provider: "Google", providerIcon: "🔍", category: "AI", description: "Practical AI skills, prompt engineering, responsible AI use, and AI tools for productivity.", url: "https://www.coursera.org/ai-essentials", tags: ["AI", "Prompt Engineering"] },

  // Stanford / DeepLearning.AI (free to audit on Coursera)
  { name: "Machine Learning by Andrew Ng", provider: "Stanford (Coursera)", providerIcon: "🎓", category: "ML", description: "Supervised learning, neural networks, best practices, and unsupervised learning. Free to audit.", url: "https://www.coursera.org/learn/machine-learning", tags: ["ML", "Neural Networks"] },
  { name: "Deep Learning Specialization", provider: "DeepLearning.AI", providerIcon: "🎓", category: "Deep Learning", description: "Neural networks, CNNs, RNNs, transformers, and practical DL projects. Free to audit.", url: "https://www.coursera.org/specializations/deep-learning", tags: ["DL", "CNN", "RNN"] },
  { name: "CS50: Introduction to Computer Science", provider: "Harvard (edX)", providerIcon: "🎓", category: "CS Foundations", description: "Harvard's legendary intro CS course — C, Python, SQL, algorithms, data structures. Free to audit.", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x", tags: ["CS", "Python", "C"] },

  // GitHub Skills (free)
  { name: "GitHub Foundations Certification", provider: "GitHub", providerIcon: "🐙", category: "DevOps", description: "Git basics, GitHub collaboration, project management, and GitHub Actions.", url: "https://skills.github.com/", tags: ["Git", "GitHub", "CI/CD"] },

  // KodeKloud (free tier)
  { name: "Kubernetes for Beginners", provider: "KodeKloud", providerIcon: "🐳", category: "DevOps", description: "Kubernetes fundamentals — pods, services, deployments, and cluster management.", url: "https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners/", tags: ["Kubernetes", "Docker", "DevOps"] },

  // Cisco (free courses)
  { name: "Cisco Networking Academy (CCNA Prep)", provider: "Cisco", providerIcon: "🌐", category: "Networking", description: "Network fundamentals, IP connectivity, security fundamentals, and automation.", url: "https://www.netacad.com/courses/networking", tags: ["Networking", "CCNA", "Infrastructure"] },
  { name: "Cisco Python Essentials", provider: "Cisco", providerIcon: "🌐", category: "Python", description: "Python basics, data types, control flow, functions, and OOP.", url: "https://skillsnetworklabs.com/collections/courses/products/cb980d1f-ce86-4a66-bd15-24eb05a20f3d", tags: ["Python", "Fundamentals"] },

  // Linux Foundation (free)
  { name: "Introduction to Linux (LFS101)", provider: "Linux Foundation", providerIcon: "🐧", category: "Linux", description: "Linux fundamentals — file system, shell commands, permissions, and system administration.", url: "https://training.linuxfoundation.org/training/introduction-to-linux/", tags: ["Linux", "Shell", "Sysadmin"] },

  // MongoDB University (free)
  { name: "MongoDB Basics (M001)", provider: "MongoDB", providerIcon: "🍃", category: "Database", description: "MongoDB fundamentals — documents, CRUD operations, indexing, and aggregation.", url: "https://learn.mongodb.com/learning-paths/mongodb-basics", tags: ["NoSQL", "MongoDB", "Database"] },

  // Redis University (free)
  { name: "Redis Essentials", provider: "Redis", providerIcon: "🔴", category: "Database", description: "Redis data structures, pub/sub, transactions, and Lua scripting.", url: "https://university.redis.com/courses/cs210/", tags: ["Redis", "NoSQL", "Cache"] },

  // W3Schools (free)
  { name: "W3Schools Full Stack Developer Course", provider: "W3Schools", providerIcon: "📘", category: "Full Stack", description: "HTML, CSS, JavaScript, Python, SQL, and more with interactive exercises.", url: "https://www.w3schools.com/learn/", tags: ["HTML", "CSS", "JavaScript"] },

  // Kaggle (free)
  { name: "Intro to Machine Learning", provider: "Kaggle", providerIcon: "📊", category: "ML", description: "Decision trees, random forests, and model validation with Python.", url: "https://www.kaggle.com/learn/intro-to-machine-learning", tags: ["ML", "Python", "Kaggle"] },
  { name: "Intermediate Machine Learning", provider: "Kaggle", providerIcon: "📊", category: "ML", description: "Missing values, categorical variables, and advanced techniques.", url: "https://www.kaggle.com/learn/intermediate-machine-learning", tags: ["ML", "Python", "Pandas"] },
  { name: "Intro to Deep Learning", provider: "Kaggle", providerIcon: "📊", category: "Deep Learning", description: "Neural networks with TensorFlow and Keras for tabular data.", url: "https://www.kaggle.com/learn/intro-to-deep-learning", tags: ["DL", "TensorFlow", "Keras"] },
  { name: "Data Visualization", provider: "Kaggle", providerIcon: "📊", category: "Data", description: "Seaborn and matplotlib for creating effective data visualizations.", url: "https://www.kaggle.com/learn/data-visualization", tags: ["Python", "Seaborn", "Matplotlib"] },
  { name: "Feature Engineering", provider: "Kaggle", providerIcon: "📊", category: "Data", description: "Mutual information, clustering, PCA, and target encoding for ML.", url: "https://www.kaggle.com/learn/feature-engineering", tags: ["ML", "Python", "Feature Engineering"] },

  // DataCamp (free intro courses)
  { name: "Introduction to Python", provider: "DataCamp", providerIcon: "💻", category: "Python", description: "Python basics, lists, functions, and conditional statements.", url: "https://www.datacamp.com/courses/intro-to-python-for-data-science", tags: ["Python", "Beginner"] },
  { name: "Introduction to SQL", provider: "DataCamp", providerIcon: "💻", category: "Database", description: "SQL fundamentals — SELECT, WHERE, GROUP BY, and JOINs.", url: "https://www.datacamp.com/courses/intro-to-sql-for-data-science", tags: ["SQL", "Database", "Beginner"] },
];

export const freeCertCategories = Array.from(new Set(freeCertifications.map((c) => c.category))).sort();
export const freeCertProviders = Array.from(new Set(freeCertifications.map((c) => c.provider))).sort();
