export interface Internship {
  name: string;
  company: string;
  companyIcon: string;
  type: string;
  description: string;
  url: string;
  tags: string[];
}

export const internships: Internship[] = [
  // ═══ FAANG+ Internships ═══
  { name: "Google Summer of Code (GSoC)", company: "Google", companyIcon: "🔍", type: "Open Source", description: "Work on open source projects with mentorship from global communities. Paid stipend for students worldwide.", url: "https://summerofcode.withgoogle.com/", tags: ["Open Source", "Paid", "Global"] },
  { name: "Google Internship Program", company: "Google", companyIcon: "🔍", type: "Corporate", description: "Software Engineering, Product Management, and UX internships across Google offices worldwide.", url: "https://buildyourfuture.withgoogle.com/programs/internships", tags: ["SWE", "PM", "UX", "Global"] },
  { name: "Microsoft Learn Student Ambassadors", company: "Microsoft", companyIcon: "🟦", type: "Ambassador", description: "Lead tech communities on campus, run workshops, and build projects with Microsoft tools and Azure.", url: "https://developer.microsoft.com/en-us/ambassadors/", tags: ["Ambassador", "Azure", "Community"] },
  { name: "Microsoft Internship Program", company: "Microsoft", companyIcon: "🟦", type: "Corporate", description: "Software Engineering, Data Science, and PM internships at Microsoft locations globally.", url: "https://careers.microsoft.com/v2/global/en/internships", tags: ["SWE", "Data", "PM", "Global"] },
  { name: "Microsoft Research Internship", company: "Microsoft", companyIcon: "🟦", type: "Research", description: "Research internships in AI, ML, NLP, CV, systems, and security at MSR labs.", url: "https://www.microsoft.com/en-us/research/internship/", tags: ["Research", "AI", "ML"] },
  { name: "Amazon Internship Program", company: "Amazon", companyIcon: "📦", type: "Corporate", description: "Software Development, Data Science, and Business internships across Amazon and AWS teams.", url: "https://www.amazon.jobs/en/teams/internships", tags: ["SDE", "AWS", "Data", "Global"] },
  { name: "AWS re/Start Program", company: "AWS", companyIcon: "☁️", type: "Training", description: "Free cloud skills training program with job placement support for unemployed/underemployed individuals.", url: "https://aws.amazon.com/training/restart/", tags: ["Cloud", "Training", "Career"] },
  { name: "Meta University Program", company: "Meta", companyIcon: "📘", type: "Early Career", description: "Early career program for underrepresented students — training, mentorship, and potential full-time conversion.", url: "https://www.metacareers.com/university", tags: ["Early Career", "Diversity"] },
  { name: "Meta Internship Program", company: "Meta", companyIcon: "📘", type: "Corporate", description: "SWE, ML, Data Science, and PM internships at Meta offices.", url: "https://www.metacareers.com/students/", tags: ["SWE", "ML", "PM", "Global"] },
  { name: "Apple Internship Program", company: "Apple", companyIcon: "🍎", type: "Corporate", description: "Software Engineering, Hardware, and Design internships at Apple.", url: "https://www.apple.com/careers/us/students.html", tags: ["SWE", "Hardware", "Design"] },
  { name: "NVIDIA Internship Program", company: "NVIDIA", companyIcon: "🟢", type: "Corporate", description: "Internships in GPU computing, AI, autonomous vehicles, robotics, and hardware engineering.", url: "https://www.nvidia.com/en-us/about-nvidia/careers/", tags: ["AI", "GPU", "Hardware", "Global"] },
  { name: "Intel Internship Program", company: "Intel", companyIcon: "🔵", type: "Corporate", description: "Hardware, software, firmware, and AI internships across Intel's global offices.", url: "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html", tags: ["Hardware", "Firmware", "AI"] },

  // ═══ AI/ML Internships ═══
  { name: "OpenAI Internship Program", company: "OpenAI", companyIcon: "🤖", type: "Corporate", description: "Research and engineering internships working on GPT, DALL-E, and safety research.", url: "https://openai.com/careers", tags: ["AI", "Research", "LLM"] },
  { name: "Anthropic Internship", company: "Anthropic", companyIcon: "🧠", type: "Corporate", description: "Research internships in AI safety, interpretability, and constitutional AI.", url: "https://www.anthropic.com/careers", tags: ["AI Safety", "Research"] },
  { name: "DeepMind Internship", company: "DeepMind", companyIcon: "🔬", type: "Research", description: "Research internships in reinforcement learning, neuroscience, and AGI safety.", url: "https://deepmind.google/about/careers/", tags: ["Research", "RL", "AGI"] },
  { name: "Hugging Face Internship", company: "Hugging Face", companyIcon: "🤗", type: "Corporate", description: "Work on open-source ML models, transformers, and the HF ecosystem.", url: "https://huggingface.co/jobs", tags: ["ML", "Open Source", "Transformers"] },
  { name: "Databricks Internship", company: "Databricks", companyIcon: "📊", type: "Corporate", description: "Internships in Spark, data engineering, ML platforms, and lakehouse architecture.", url: "https://www.databricks.com/company/careers", tags: ["Data", "Spark", "ML"] },

  // ═══ Cloud & Infra ═══
  { name: "Cloudflare Internship", company: "Cloudflare", companyIcon: "☁️", type: "Corporate", description: "Internships in networking, security, edge computing, and distributed systems.", url: "https://www.cloudflare.com/careers", tags: ["Networking", "Security", "Edge"] },
  { name: "Vercel Internship", company: "Vercel", companyIcon: "▲", type: "Corporate", description: "Frontend engineering internships working on Next.js and the frontend cloud.", url: "https://vercel.com/careers", tags: ["Frontend", "Next.js", "React"] },
  { name: "DigitalOcean Internship", company: "DigitalOcean", companyIcon: "🌊", type: "Corporate", description: "Cloud infrastructure internships — compute, networking, and developer experience.", url: "https://www.digitalocean.com/careers", tags: ["Cloud", "Infrastructure"] },

  // ═══ DevTools ═══
  { name: "GitHub Campus Experts", company: "GitHub", companyIcon: "🐙", type: "Ambassador", description: "Train to become a campus tech leader — workshop facilitation, community building, and GitHub skills.", url: "https://education.github.com/experts", tags: ["Campus", "Leadership", "Community"] },
  { name: "GitLab Internship", company: "GitLab", companyIcon: "🦊", type: "Corporate", description: "Remote internships in DevSecOps, CI/CD, and open-source tooling.", url: "https://about.gitlab.com/jobs", tags: ["Remote", "DevOps", "Open Source"] },
  { name: "Figma Internship", company: "Figma", companyIcon: "🎨", type: "Corporate", description: "Design tool engineering internships — web rendering, collaboration, and plugins.", url: "https://www.figma.com/careers", tags: ["Design", "WebGL", "Collaboration"] },
  { name: "Notion Internship", company: "Notion", companyIcon: "📝", type: "Corporate", description: "Product and engineering internships at Notion.", url: "https://www.notion.so/careers", tags: ["Product", "Engineering"] },
  { name: "Cursor Internship", company: "Cursor", companyIcon: "⌨️", type: "Corporate", description: "AI-first code editor internships — ML, IDE development, and developer tools.", url: "https://www.cursor.com/careers", tags: ["AI", "IDE", "Developer Tools"] },

  // ═══ SaaS & Enterprise ═══
  { name: "Stripe Internship", company: "Stripe", companyIcon: "💳", type: "Corporate", description: "Payments infrastructure internships — APIs, distributed systems, and financial tech.", url: "https://stripe.com/jobs", tags: ["Payments", "API", "Fintech", "Global"] },
  { name: "Shopify Internship", company: "Shopify", companyIcon: "🛍️", type: "Corporate", description: "E-commerce platform internships — Ruby on Rails, React, and merchant tools.", url: "https://www.shopify.com/careers", tags: ["E-commerce", "Ruby", "React"] },
  { name: "Datadog Internship", company: "Datadog", companyIcon: "🐕", type: "Corporate", description: "Observability platform internships — monitoring, APM, and log analytics.", url: "https://www.datadoghq.com/careers", tags: ["Monitoring", "Observability"] },
  { name: "MongoDB Internship", company: "MongoDB", companyIcon: "🍃", type: "Corporate", description: "Database engineering internships — Atlas, aggregation pipeline, and sharding.", url: "https://www.mongodb.com/careers", tags: ["Database", "NoSQL"] },
  { name: "Snowflake Internship", company: "Snowflake", companyIcon: "❄️", type: "Corporate", description: "Cloud data warehouse internships — query optimization and distributed storage.", url: "https://careers.snowflake.com", tags: ["Data Warehouse", "Cloud"] },
  { name: "Salesforce Internship Program", company: "Salesforce", companyIcon: "☁️", type: "Corporate", description: "Engineering, Product, and Business internships at Salesforce with mentorship.", url: "https://careers.salesforce.com/en/internships/", tags: ["Engineering", "Product", "CRM"] },
  { name: "IBM SkillsBuild Internship", company: "IBM", companyIcon: "🔷", type: "Training + Internship", description: "Free tech skills platform with structured learning paths and hands-on projects.", url: "https://skillsbuild.org/", tags: ["Free", "Learning", "Projects"] },
  { name: "HashiCorp Internship", company: "HashiCorp", companyIcon: "🔐", type: "Corporate", description: "Infrastructure automation internships — Terraform, Vault, and Consul.", url: "https://www.hashicorp.com/company/jobs", tags: ["Infra", "DevOps", "Terraform"] },

  // ═══ Security ═══
  { name: "CrowdStrike Internship", company: "CrowdStrike", companyIcon: "🦅", type: "Corporate", description: "Cybersecurity internships — endpoint protection, threat intelligence, and Falcon platform.", url: "https://www.crowdstrike.com/careers", tags: ["Security", "Endpoint", "Threat Intel"] },
  { name: "Palo Alto Networks Internship", company: "Palo Alto Networks", companyIcon: "🛡️", type: "Corporate", description: "Cybersecurity platform internships — firewalls, cloud security, and Cortex.", url: "https://www.paloaltonetworks.com/careers", tags: ["Security", "Firewall", "Cloud"] },
  { name: "1Password Internship", company: "1Password", companyIcon: "🔑", type: "Corporate", description: "Password manager internships — cryptography, identity, and security engineering.", url: "https://1password.com/careers", tags: ["Security", "Cryptography", "Identity"] },

  // ═══ Fintech ═══
  { name: "PayPal Internship", company: "PayPal", companyIcon: "💰", type: "Corporate", description: "Digital payments internships — mobile, web, and financial infrastructure.", url: "https://careers.pypl.com", tags: ["Payments", "Fintech", "Global"] },
  { name: "Revolut Internship", company: "Revolut", companyIcon: "💳", type: "Corporate", description: "Neobank internships — banking, crypto, and global payments.", url: "https://www.revolut.com/careers", tags: ["Fintech", "Banking", "Crypto", "Europe"] },
  { name: "Klarna Internship", company: "Klarna", companyIcon: "🛒", type: "Corporate", description: "Buy Now Pay Later internships — payments, ML, and consumer finance.", url: "https://www.klarna.com/careers/", tags: ["Fintech", "BNPL", "Europe"] },
  { name: "Robinhood Internship", company: "Robinhood", companyIcon: "📈", type: "Corporate", description: "Commission-free trading internships — fintech, real-time systems, and crypto.", url: "https://robinhood.com/us/en/careers", tags: ["Trading", "Fintech", "Crypto"] },
  { name: "Deel Internship", company: "Deel", companyIcon: "🌍", type: "Corporate", description: "Global payroll and HR platform internships — international compliance and payments.", url: "https://www.deel.com/careers", tags: ["Payroll", "Global HR", "Remote"] },

  // ═══ India ═══
  { name: "Flipkart Internship", company: "Flipkart", companyIcon: "🛒", type: "Corporate", description: "E-commerce internships — supply chain, ML, and product development.", url: "https://www.flipkartcareers.com", tags: ["E-commerce", "ML", "India"] },
  { name: "Razorpay Internship", company: "Razorpay", companyIcon: "💳", type: "Corporate", description: "Payments platform internships — fintech, APIs, and distributed systems.", url: "https://razorpay.com/careers", tags: ["Fintech", "Payments", "India"] },
  { name: "Freshworks Internship", company: "Freshworks", companyIcon: "💼", type: "Corporate", description: "SaaS internships — CRM, ITSM, and customer engagement platforms.", url: "https://www.freshworks.com/careers", tags: ["SaaS", "CRM", "India"] },
  { name: "Zoho Internship", company: "Zoho", companyIcon: "📊", type: "Corporate", description: "SaaS suite internships — build 45+ business applications.", url: "https://www.zoho.com/careers.html", tags: ["SaaS", "Enterprise", "India"] },
  { name: "Swiggy Internship", company: "Swiggy", companyIcon: "🍔", type: "Corporate", description: "Food delivery internships — real-time systems, logistics, and ML.", url: "https://careers.swiggy.com", tags: ["Delivery", "Real-time", "India"] },
  { name: "PhonePe Internship", company: "PhonePe", companyIcon: "📱", type: "Corporate", description: "UPI payments internships — fintech, distributed systems, and mobile.", url: "https://www.phonepe.com/careers", tags: ["UPI", "Fintech", "India"] },
  { name: "Sarvam AI Internship", company: "Sarvam AI", companyIcon: "🇮🇳", type: "Corporate", description: "India-focused LLM internships — Indian languages, NLP, and AI research.", url: "https://www.sarvam.ai/careers", tags: ["LLM", "Indian Languages", "AI", "India"] },

  // ═══ Global Startups ═══
  { name: "Spotify Internship", company: "Spotify", companyIcon: "🎵", type: "Corporate", description: "Music streaming internships — audio ML, backend, and mobile.", url: "https://lifeatspotify.com", tags: ["Music", "Streaming", "Europe"] },
  { name: "Airbnb Internship", company: "Airbnb", companyIcon: "🏠", type: "Corporate", description: "Travel marketplace internships — ML, payments, and trust & safety.", url: "https://careers.airbnb.com", tags: ["Travel", "ML", "Global"] },
  { name: "Uber Internship", company: "Uber", companyIcon: "🚗", type: "Corporate", description: "Mobility internships — real-time systems, ML, and payments.", url: "https://www.uber.com/careers", tags: ["Mobility", "Real-time", "Global"] },
  { name: "Discord Internship", company: "Discord", companyIcon: "💬", type: "Corporate", description: "Voice & text chat internships — real-time infrastructure and ML.", url: "https://discord.com/careers", tags: ["Chat", "Real-time", "Gaming"] },
  { name: "Duolingo Internship", company: "Duolingo", companyIcon: "🦉", type: "Corporate", description: "Language learning internships — ML, gamification, and mobile.", url: "https://careers.duolingo.com", tags: ["EdTech", "ML", "Gamification"] },
  { name: "Coinbase Internship", company: "Coinbase", companyIcon: "🪙", type: "Corporate", description: "Crypto exchange internships — blockchain, security, and payments.", url: "https://www.coinbase.com/careers", tags: ["Crypto", "Blockchain", "Fintech"] },
  { name: "Rippling Internship", company: "Rippling", companyIcon: "🔗", type: "Corporate", description: "HR, IT & Payroll platform internships — enterprise SaaS.", url: "https://www.rippling.com/careers", tags: ["HR", "IT", "SaaS"] },

  // ═══ Robotics & Hardware ═══
  { name: "Tesla Internship", company: "Tesla", companyIcon: "⚡", type: "Corporate", description: "EV, Autopilot, and energy internships — robotics, AI, and hardware.", url: "https://www.tesla.com/careers", tags: ["EV", "Autonomous", "AI"] },
  { name: "SpaceX Internship", company: "SpaceX", companyIcon: "🚀", type: "Corporate", description: "Rocket engineering internships — propulsion, avionics, and software.", url: "https://www.spacex.com/careers/", tags: ["Rockets", "Space", "Engineering"] },
  { name: "Waymo Internship", company: "Waymo", companyIcon: "🚗", type: "Corporate", description: "Autonomous vehicle internships — perception, planning, and simulation.", url: "https://waymo.com/careers", tags: ["Autonomous", "Self-driving", "AI"] },
  { name: "Boston Dynamics Internship", company: "Boston Dynamics", companyIcon: "🤖", type: "Corporate", description: "Advanced robotics internships — locomotion, perception, and control.", url: "https://www.bostondynamics.com/careers", tags: ["Robotics", "Locomotion"] },
  { name: "Figure AI Internship", company: "Figure AI", companyIcon: "🦾", type: "Corporate", description: "Humanoid robot internships — AI, manipulation, and embodied intelligence.", url: "https://www.figure.ai/careers", tags: ["Humanoid", "AI", "Robotics"] },

  // ═══ Gaming ═══
  { name: "Epic Games Internship", company: "Epic Games", companyIcon: "🎮", type: "Corporate", description: "Game development internships — Unreal Engine, Fortnite, and tools.", url: "https://www.epicgames.com/site/en-US/careers", tags: ["Unreal", "Fortnite", "Game Dev"] },
  { name: "Unity Internship", company: "Unity", companyIcon: "🎯", type: "Corporate", description: "Game engine internships — 3D rendering, real-time systems, and tools.", url: "https://careers.unity.com", tags: ["Game Engine", "3D", "Real-time"] },
  { name: "Riot Games Internship", company: "Riot Games", companyIcon: "⚔️", type: "Corporate", description: "Game development internships — League of Legends, Valorant, and anti-cheat.", url: "https://www.riotgames.com/careers", tags: ["League", "Valorant", "Game Dev"] },

  // ═══ Open Source & Programs ═══
  { name: "Outreachy Internship", company: "Outreachy", companyIcon: "🌍", type: "Open Source", description: "Paid remote internships in open source for underrepresented groups.", url: "https://www.outreachy.org/", tags: ["Open Source", "Paid", "Diversity", "Global"] },
  { name: "Linux Foundation Mentorship", company: "Linux Foundation", companyIcon: "🐧", type: "Open Source", description: "Mentored open source projects with stipend. Kubernetes, CNCF, and more.", url: "https://mentorship.lfx.linuxfoundation.org/", tags: ["Open Source", "Kubernetes", "Stipend"] },
  { name: "MLH Fellowship", company: "MLH", companyIcon: "🎓", type: "Open Source", description: "Paid remote fellowship for students — open source, web3, or explorer tracks.", url: "https://fellowship.mlh.io/", tags: ["Fellowship", "Paid", "Remote", "Global"] },
  { name: "GirlScript Summer of Code", company: "GirlScript", companyIcon: "💜", type: "Open Source", description: "3-month open source internship with mentorship, learning sessions, and swag.", url: "https://gssoc.girlscript.tech/", tags: ["Open Source", "India", "Mentorship"] },
  { name: "Summer of Bitcoin", company: "Summer of Bitcoin", companyIcon: "₿", type: "Open Source", description: "Paid open source internship focused on Bitcoin ecosystem development.", url: "https://www.summerofbitcoin.org/", tags: ["Bitcoin", "Open Source", "Paid"] },
  { name: "Hacktoberfest", company: "DigitalOcean", companyIcon: "🌊", type: "Open Source", description: "Annual October event — complete 4 PRs to earn swag and contribute to open source.", url: "https://hacktoberfest.com/", tags: ["Open Source", "Hacktoberfest", "Beginner", "Global"] },
  { name: "Google Season of Docs", company: "Google", companyIcon: "🔍", type: "Open Source", description: "Paid program pairing technical writers with open source organizations.", url: "https://developers.google.com/season-of-docs", tags: ["Documentation", "Paid", "Open Source"] },
  { name: "Season of KDE", company: "KDE", companyIcon: "💙", type: "Open Source", description: "Contribute to KDE projects — desktop environment, frameworks, and apps.", url: "https://season.kde.org/", tags: ["KDE", "Open Source", "Desktop"] },

  // ═══ Platforms ═══
  { name: "Internshala", company: "Internshala", companyIcon: "🚀", type: "Platform", description: "India's largest internship platform — 10,000+ remote and in-person internships.", url: "https://internshala.com/internships", tags: ["India", "Remote", "Various"] },
  { name: "LinkedIn Internship Board", company: "LinkedIn", companyIcon: "💼", type: "Platform", description: "Curated internship listings from top companies worldwide.", url: "https://www.linkedin.com/jobs/internships/", tags: ["Platform", "Global", "Various"] },
  { name: "Wellfound (AngelList)", company: "Wellfound", companyIcon: "🦄", type: "Platform", description: "Internship opportunities at high-growth startups — equity-based and paid.", url: "https://wellfound.com/internships", tags: ["Startup", "Equity", "Remote", "Global"] },
  { name: "Glassdoor Internships", company: "Glassdoor", companyIcon: "🏢", type: "Platform", description: "Internship listings with salary data and company reviews.", url: "https://www.glassdoor.com/Job/internships-SRCH_KO0,12.htm", tags: ["Platform", "Reviews", "Global"] },

  // ═══ International Programs ═══
  { name: "Amazon Future Engineer", company: "Amazon", companyIcon: "📦", type: "Training", description: "Scholarship + internship program for underrepresented students in CS.", url: "https://www.amazonfutureengineer.com/", tags: ["Scholarship", "Diversity", "Global"] },
  { name: "Apple Developer Academy", company: "Apple", companyIcon: "🍎", type: "Training", description: "iOS/macOS development training program — learn Swift and app development.", url: "https://developer.apple.com/academies/", tags: ["iOS", "Swift", "Training"] },
  { name: "IBM Quantum Internship", company: "IBM", companyIcon: "🔷", type: "Research", description: "Quantum computing research internships — Qiskit, algorithms, and hardware.", url: "https://www.ibm.com/quantum", tags: ["Quantum", "Research", "Qiskit"] },
  { name: "Google PhD Fellowship", company: "Google", companyIcon: "🔍", type: "Research", description: "Fellowship for PhD students doing cutting-edge research in CS and related fields.", url: "https://research.google/outreach/phd-fellowship/", tags: ["PhD", "Research", "Fellowship"] },
  { name: "Microsoft Research PhD Internship", company: "Microsoft", companyIcon: "🟦", type: "Research", description: "Research internships for PhD students at Microsoft Research labs.", url: "https://www.microsoft.com/en-us/research/academic-program/phd-internship/", tags: ["PhD", "Research", "AI"] },
];

export const internshipTypes = Array.from(new Set(internships.map((i) => i.type))).sort();
export const internshipCompanies = Array.from(new Set(internships.map((i) => i.company))).sort();
