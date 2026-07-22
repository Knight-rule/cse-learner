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
  // Google
  { name: "Google Summer of Code (GSoC)", company: "Google", companyIcon: "🔍", type: "Open Source", description: "Work on open source projects with mentorship from global communities. Paid stipend for students worldwide.", url: "https://summerofcode.withgoogle.com/", tags: ["Open Source", "Paid", "Global"] },
  { name: "Google Internship Program", company: "Google", companyIcon: "🔍", type: "Corporate", description: "Software Engineering, Product Management, and UX internships across Google offices worldwide.", url: "https://buildyourfuture.withgoogle.com/programs/internships", tags: ["SWE", "PM", "UX"] },
  { name: "Google Student Developer Club", company: "Google", companyIcon: "🔍", type: "Community", description: "Lead campus communities, organize events, and build projects with Google technology.", url: "https://developers.google.com/community/gdsc", tags: ["Community", "Campus", "Events"] },

  // Microsoft
  { name: "Microsoft Learn Student Ambassadors", company: "Microsoft", companyIcon: "🟦", type: "Ambassador", description: "Lead tech communities on campus, run workshops, and build projects with Microsoft tools and Azure.", url: "https://developer.microsoft.com/en-us/ambassadors/", tags: ["Ambassador", "Azure", "Community"] },
  { name: "Microsoft Internship Program", company: "Microsoft", companyIcon: "🟦", type: "Corporate", description: "Software Engineering, Data Science, and PM internships at Microsoft locations globally.", url: "https://careers.microsoft.com/v2/global/en/internships", tags: ["SWE", "Data", "PM"] },
  { name: "Microsoft Research Internship", company: "Microsoft", companyIcon: "🟦", type: "Research", description: "Research internships in AI, ML, NLP, CV, systems, and security at MSR labs.", url: "https://www.microsoft.com/en-us/research/internship/", tags: ["Research", "AI", "ML"] },

  // Amazon / AWS
  { name: "Amazon Internship Program", company: "Amazon", companyIcon: "📦", type: "Corporate", description: "Software Development, Data Science, and Business internships across Amazon and AWS teams.", url: "https://www.amazon.jobs/en/teams/internships", tags: ["SDE", "AWS", "Data"] },
  { name: "AWS re/Start Program", company: "AWS", companyIcon: "☁️", type: "Training", description: "Free cloud skills training program with job placement support for unemployed/underemployed individuals.", url: "https://aws.amazon.com/training/restart/", tags: ["Cloud", "Training", "Career"] },

  // Meta
  { name: "Meta University Program", company: "Meta", companyIcon: "📘", type: "Early Career", description: "Early career program for underrepresented students — training, mentorship, and potential full-time conversion.", url: "https://www.metacareers.com/university", tags: ["Early Career", "Diversity"] },
  { name: "Meta Internship Program", company: "Meta", companyIcon: "📘", type: "Corporate", description: "SWE, ML, Data Science, and PM internships at Meta offices.", url: "https://www.metacareers.com/students/", tags: ["SWE", "ML", "PM"] },

  // IBM
  { name: "IBM SkillsBuild Internship", company: "IBM", companyIcon: "🔷", type: "Training + Internship", description: "Free tech skills platform with structured learning paths and hands-on projects.", url: "https://skillsbuild.org/", tags: ["Free", "Learning", "Projects"] },
  { name: "IBM Internship Program", company: "IBM", companyIcon: "🔷", type: "Corporate", description: "Software Engineering, Data Science, Cloud, and Consulting internships globally.", url: "https://www.ibm.com/careers/internships", tags: ["SWE", "Cloud", "AI"] },

  // Salesforce
  { name: "Salesforce Internship Program", company: "Salesforce", companyIcon: "☁️", type: "Corporate", description: "Engineering, Product, and Business internships at Salesforce with mentorship and project work.", url: "https://careers.salesforce.com/en/internships/", tags: ["Engineering", "Product"] },
  { name: "Salesforce Pathfinder Program", company: "Salesforce", companyIcon: "☁️", type: "Training", description: "Intensive training program in Salesforce technology with job placement support.", url: "https://trailhead.salesforce.com/pathfinder", tags: ["Trailhead", "CRM", "Training"] },

  // GitHub / Open Source
  { name: "Outreachy Internship", company: "Outreachy", companyIcon: "🌍", type: "Open Source", description: "Paid remote internships in open source for underrepresented groups. Work with Mozilla, Google, and more.", url: "https://www.outreachy.org/", tags: ["Open Source", "Paid", "Diversity"] },
  { name: "Linux Foundation Mentorship", company: "Linux Foundation", companyIcon: "🐧", type: "Open Source", description: "Mentored open source projects with stipend. Kubernetes, CNCF, and other LF projects.", url: "https://mentorship.lfx.linuxfoundation.org/", tags: ["Open Source", "Kubernetes", "Stipend"] },
  { name: "MLH Fellowship", company: "MLH", companyIcon: "🎓", type: "Open Source", description: "Paid remote fellowship for students — open source, web3, or explorer tracks with mentorship.", url: "https://fellowship.mlh.io/", tags: ["Fellowship", "Paid", "Remote"] },

  // NVIDIA
  { name: "NVIDIA Internship Program", company: "NVIDIA", companyIcon: "🟢", type: "Corporate", description: "Internships in GPU computing, AI, autonomous vehicles, robotics, and hardware engineering.", url: "https://www.nvidia.com/en-us/about-nvidia/careers/", tags: ["AI", "GPU", "Hardware"] },

  // Intel
  { name: "Intel Internship Program", company: "Intel", companyIcon: "🔵", type: "Corporate", description: "Hardware, software, firmware, and AI internships across Intel's global offices.", url: "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html", tags: ["Hardware", "Firmware", "AI"] },

  // Apple
  { name: "Apple Internship Program", company: "Apple", companyIcon: "🍎", type: "Corporate", description: "Software Engineering, Hardware, and Design internships at Apple.", url: "https://www.apple.com/careers/us/students.html", tags: ["SWE", "Hardware", "Design"] },

  // Startup / Remote Programs
  { name: "Internshala", company: "Internshala", companyIcon: "🚀", type: "Platform", description: "India's largest internship platform — 10,000+ remote and in-person internships across domains.", url: "https://internshala.com/internships", tags: ["India", "Remote", "Various"] },
  { name: "LinkedIn Internship Board", company: "LinkedIn", companyIcon: "💼", type: "Platform", description: "Curated internship listings from top companies worldwide — search by role, location, and company.", url: "https://www.linkedin.com/jobs/internships/", tags: ["Platform", "Global", "Various"] },
  { name: "AngelList Startup Internships", company: "AngelList", companyIcon: "🦄", type: "Startup", description: "Internship opportunities at high-growth startups — equity-based and paid positions.", url: "https://angel.co/internships", tags: ["Startup", "Equity", "Remote"] },
  { name: "Hasjob Internships", company: "Hasjob", companyIcon: "📋", type: "Platform", description: "Startup and tech job board with internship listings across India and remote roles.", url: "https://hasjob.co/", tags: ["India", "Startup", "Tech"] },

  // Specific Programs
  { name: "GirlScript Summer of Code", company: "GirlScript", companyIcon: "💜", type: "Open Source", description: "3-month open source internship with mentorship, learning sessions, and swag rewards.", url: "https://gssoc.girlscript.tech/", tags: ["Open Source", "India", "Mentorship"] },
  { name: "Summer of Bitcoin", company: "Summer of Bitcoin", companyIcon: "₿", type: "Open Source", description: "Paid open source internship focused on Bitcoin ecosystem development.", url: "https://www.summerofbitcoin.org/", tags: ["Bitcoin", "Open Source", "Paid"] },
  { name: "Girlscript Winter of Contributing", company: "GirlScript", companyIcon: "💜", type: "Open Source", description: "Open source contribution program with mentorship and community support.", url: "https://gwoc.girlscript.tech/", tags: ["Open Source", "Winter", "India"] },
  { name: "SOC (Season of Contributions)", company: "PHP", companyIcon: "🐘", type: "Open Source", description: "Contribute to PHP ecosystem projects with mentorship from core maintainers.", url: "https://www.php.net/soc/", tags: ["PHP", "Open Source"] },
  { name: "GSSoC (Girlscript Summer of Code)", company: "GirlScript", companyIcon: "💜", type: "Open Source", description: "Open source contribution program — beginner to advanced. 3 months of mentorship and rewards.", url: "https://gssoc.girlscript.tech/", tags: ["Open Source", "Beginner", "India"] },

  // Remote / Freelance
  { name: "GitHub Campus Experts", company: "GitHub", companyIcon: "🐙", type: "Ambassador", description: "Train to become a campus tech leader — workshop facilitation, community building, and GitHub skills.", url: "https://education.github.com/experts", tags: ["Campus", "Leadership", "Community"] },
  { name: "Microsoft Imagine Cup", company: "Microsoft", companyIcon: "🟦", type: "Competition", description: "Global student technology competition — build solutions for real-world problems with Azure.", url: "https://imaginecup.microsoft.com/", tags: ["Competition", "Azure", "Innovation"] },
  { name: "Hacktoberfest Student Program", company: "DigitalOcean", companyIcon: "🌊", type: "Open Source", description: "Annual October event — complete 4 pull requests to earn swag and contribute to open source.", url: "https://hacktoberfest.com/", tags: ["Open Source", "Hacktoberfest", "Beginner"] },
  { name: "AWS Student Community", company: "AWS", companyIcon: "☁️", type: "Community", description: "Free AWS credits, workshops, and learning resources for students building on cloud.", url: "https://aws.amazon.com/free/student/", tags: ["Cloud", "Free Credits", "Students"] },
];

export const internshipTypes = Array.from(new Set(internships.map((i) => i.type))).sort();
export const internshipCompanies = Array.from(new Set(internships.map((i) => i.company))).sort();
