export interface Company {
  name: string;
  slug: string;
  logo: string;
  careers: string;
  applyLink: string;
  category: string;
  tags: string[];
  description: string;
}

export const companies: Company[] = [
  // FAANG+
  { name: "Google", slug: "google", logo: "https://logo.clearbit.com/google.com", careers: "https://careers.google.com", applyLink: "https://careers.google.com/jobs", category: "FAANG+", tags: ["search", "cloud", "ai", "android"], description: "Search, Cloud, Android, YouTube, AI" },
  { name: "Microsoft", slug: "microsoft", logo: "https://logo.clearbit.com/microsoft.com", careers: "https://careers.microsoft.com", applyLink: "https://gcsservices.careers.microsoft.com/search/results.html", category: "FAANG+", tags: ["cloud", "enterprise", "ai", "gaming"], description: "Azure, Office, GitHub, LinkedIn, AI" },
  { name: "Amazon", slug: "amazon", logo: "https://logo.clearbit.com/amazon.com", careers: "https://www.amazon.jobs", applyLink: "https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&category=software-development", category: "FAANG+", tags: ["cloud", "ecommerce", "ai", "logistics"], description: "AWS, Prime, Alexa, Logistics" },
  { name: "Apple", slug: "apple", logo: "https://logo.clearbit.com/apple.com", careers: "https://jobs.apple.com", applyLink: "https://jobs.apple.com/en/search#", category: "FAANG+", tags: ["hardware", "ios", "software"], description: "iOS, macOS, Hardware, Services" },
  { name: "Meta", slug: "meta", logo: "https://logo.clearbit.com/meta.com", careers: "https://www.metacareers.com", applyLink: "https://www.metacareers.com/jobs", category: "FAANG+", tags: ["social", "ai", "vr", "ads"], description: "Facebook, Instagram, WhatsApp, Reality Labs" },
  { name: "Netflix", slug: "netflix", logo: "https://logo.clearbit.com/netflix.com", careers: "https://jobs.netflix.com", applyLink: "https://jobs.netflix.com/jobs", category: "FAANG+", tags: ["streaming", "content", "tech"], description: "Streaming, Content, Personalization" },

  // AI/ML Startups
  { name: "OpenAI", slug: "openai", logo: "https://logo.clearbit.com/openai.com", careers: "https://openai.com/careers", applyLink: "https://boards.greenhouse.io/openai", category: "AI/ML", tags: ["llm", "research", "chatgpt"], description: "GPT, ChatGPT, DALL-E, Research" },
  { name: "Anthropic", slug: "anthropic", logo: "https://logo.clearbit.com/anthropic.com", careers: "https://www.anthropic.com/careers", applyLink: "https://www.anthropic.com/careers#open-roles", category: "AI/ML", tags: ["llm", "safety", "claude"], description: "Claude, AI Safety Research" },
  { name: "DeepMind", slug: "deepmind", logo: "https://logo.clearbit.com/deepmind.com", careers: "https://deepmind.google/about/careers", applyLink: "https://deepmind.google/about/careers/#open-roles", category: "AI/ML", tags: ["research", "agi", "alpha"], description: "AI Research (Google)" },
  { name: "Hugging Face", slug: "huggingface", logo: "https://logo.clearbit.com/huggingface.co", careers: "https://huggingface.co/jobs", applyLink: "https://huggingface.co/jobs", category: "AI/ML", tags: ["open-source", "ml", "transformers"], description: "ML Platform, Open Source Models" },
  { name: "Cohere", slug: "cohere", logo: "https://logo.clearbit.com/cohere.com", careers: "https://cohere.com/careers", applyLink: "https://cohere.com/careers#open-roles", category: "AI/ML", tags: ["llm", "enterprise", "nlp"], description: "Enterprise LLMs, NLP" },
  { name: "Replicate", slug: "replicate", logo: "https://logo.clearbit.com/replicate.com", careers: "https://replicate.com/careers", applyLink: "https://replicate.com/careers", category: "AI/ML", tags: ["ml", "deployment", "api"], description: "ML Model Deployment" },
  { name: "Scale AI", slug: "scaleai", logo: "https://logo.clearbit.com/scale.com", careers: "https://scale.com/careers", applyLink: "https://scale.com/careers#open-roles", category: "AI/ML", tags: ["data", "labeling", "defense"], description: "Data Platform, AI Infrastructure" },
  { name: "Databricks", slug: "databricks", logo: "https://logo.clearbit.com/databricks.com", careers: "https://www.databricks.com/company/careers", applyLink: "https://www.databricks.com/company/careers/open-positions", category: "AI/ML", tags: ["data", "lakehouse", "spark"], description: "Lakehouse, Spark, AI Platform" },
  { name: "Weights & Biases", slug: "wandb", logo: "https://logo.clearbit.com/wandb.ai", careers: "https://wandb.ai/careers", applyLink: "https://wandb.ai/careers#open-roles", category: "AI/ML", tags: ["ml", "experiment-tracking"], description: "ML Experiment Tracking" },
  { name: "Anyscale", slug: "anyscale", logo: "https://logo.clearbit.com/anyscale.com", careers: "https://www.anyscale.com/careers", applyLink: "https://www.anyscale.com/careers#open-roles", category: "AI/ML", tags: ["ray", "distributed"], description: "Ray, Distributed Computing" },
  { name: "Modal", slug: "modal", logo: "https://logo.clearbit.com/modal.com", careers: "https://modal.com/careers", applyLink: "https://modal.com/careers", category: "AI/ML", tags: ["serverless", "gpu"], description: "Serverless GPU Computing" },
  { name: "Together AI", slug: "togetherai", logo: "https://logo.clearbit.com/together.ai", careers: "https://www.together.ai/careers", applyLink: "https://www.together.ai/careers", category: "AI/ML", tags: ["inference", "open-source"], description: "AI Inference Platform" },
  { name: "Perplexity", slug: "perplexity", logo: "https://logo.clearbit.com/perplexity.ai", careers: "https://perplexity.ai/careers", applyLink: "https://perplexity.ai/careers", category: "AI/ML", tags: ["search", "llm"], description: "AI Search Engine" },
  { name: "Mistral AI", slug: "mistral", logo: "https://logo.clearbit.com/mistral.ai", careers: "https://mistral.ai/careers", applyLink: "https://mistral.ai/careers#open-positions", category: "AI/ML", tags: ["llm", "open-source", "europe"], description: "European LLM Company" },
  { name: "Runway", slug: "runway", logo: "https://logo.clearbit.com/runwayml.com", careers: "https://runwayml.com/careers", applyLink: "https://runwayml.com/careers", category: "AI/ML", tags: ["video", "generative"], description: "AI Video Generation" },

  // Cloud & Infra
  { name: "Cloudflare", slug: "cloudflare", logo: "https://logo.clearbit.com/cloudflare.com", careers: "https://www.cloudflare.com/careers", applyLink: "https://www.cloudflare.com/careers/jobs", category: "Cloud & Infra", tags: ["cdn", "security", "edge"], description: "CDN, Edge Computing, Security" },
  { name: "Vercel", slug: "vercel", logo: "https://logo.clearbit.com/vercel.com", careers: "https://vercel.com/careers", applyLink: "https://vercel.com/careers#open-roles", category: "Cloud & Infra", tags: ["frontend", "nextjs", "deployment"], description: "Next.js, Frontend Cloud" },
  { name: "Netlify", slug: "netlify", logo: "https://logo.clearbit.com/netlify.com", careers: "https://www.netlify.com/careers", applyLink: "https://www.netlify.com/careers#openings", category: "Cloud & Infra", tags: ["jamstack", "deployment"], description: "Jamstack, Web Deployment" },
  { name: "DigitalOcean", slug: "digitalocean", logo: "https://logo.clearbit.com/digitalocean.com", careers: "https://www.digitalocean.com/careers", applyLink: "https://www.digitalocean.com/careers#open-roles", category: "Cloud & Infra", tags: ["cloud", "devops"], description: "Developer Cloud, Droplets, Kubernetes" },
  { name: "Fly.io", slug: "flyio", logo: "https://logo.clearbit.com/fly.io", careers: "https://fly.io/jobs", applyLink: "https://fly.io/jobs#open-roles", category: "Cloud & Infra", tags: ["edge", "containers"], description: "Edge Containers, Global Deployments" },
  { name: "Railway", slug: "railway", logo: "https://logo.clearbit.com/railway.app", careers: "https://railway.app/careers", applyLink: "https://railway.app/careers", category: "Cloud & Infra", tags: ["paaS", "deployment"], description: "PaaS, Instant Deployments" },
  { name: "Render", slug: "render", logo: "https://logo.clearbit.com/render.com", careers: "https://render.com/careers", applyLink: "https://render.com/careers#openings", category: "Cloud & Infra", tags: ["paaS", "deployment"], description: "Cloud PaaS, Auto Deploys" },
  { name: "Hetzner", slug: "hetzner", logo: "https://logo.clearbit.com/hetzner.com", careers: "https://www.hetzner.com/careers", applyLink: "https://www.hetzner.com/careers", category: "Cloud & Infra", tags: ["cloud", "hosting", "europe"], description: "Cloud Servers, Dedicated (Europe)" },
  { name: "Cockroach Labs", slug: "cockroachdb", logo: "https://logo.clearbit.com/cockroachlabs.com", careers: "https://www.cockroachlabs.com/careers", applyLink: "https://www.cockroachlabs.com/careers#open-roles", category: "Cloud & Infra", tags: ["sql", "distributed"], description: "Distributed SQL Database" },
  { name: "Neon", slug: "neon", logo: "https://logo.clearbit.com/neon.tech", careers: "https://neon.tech/careers", applyLink: "https://neon.tech/careers", category: "Cloud & Infra", tags: ["postgres", "serverless"], description: "Serverless Postgres" },

  // DevTools
  { name: "GitHub", slug: "github", logo: "https://logo.clearbit.com/github.com", careers: "https://github.com/about/careers", applyLink: "https://github.com/about/careers#openings", category: "DevTools", tags: ["git", "copilot", "actions"], description: "Git Hosting, Copilot, Actions" },
  { name: "GitLab", slug: "gitlab", logo: "https://logo.clearbit.com/gitlab.com", careers: "https://about.gitlab.com/jobs", applyLink: "https://about.gitlab.com/jobs/#hiring", category: "DevTools", tags: ["devops", "ci/cd", "open-source"], description: "DevSecOps Platform" },
  { name: "Atlassian", slug: "atlassian", logo: "https://logo.clearbit.com/atlassian.com", careers: "https://www.atlassian.com/company/jobs", applyLink: "https://www.atlassian.com/company/jobs/search", category: "DevTools", tags: ["jira", "confluence", "trello"], description: "Jira, Confluence, Trello" },
  { name: "Notion", slug: "notion", logo: "https://logo.clearbit.com/notion.so", careers: "https://www.notion.so/careers", applyLink: "https://www.notion.so/careers#openings", category: "DevTools", tags: ["productivity", "wiki", "docs"], description: "Connected Workspace" },
  { name: "Linear", slug: "linear", logo: "https://logo.clearbit.com/linear.app", careers: "https://linear.app/careers", applyLink: "https://linear.app/careers", category: "DevTools", tags: ["project-management", "issue-tracking"], description: "Issue Tracking" },
  { name: "Figma", slug: "figma", logo: "https://logo.clearbit.com/figma.com", careers: "https://www.figma.com/careers", applyLink: "https://www.figma.com/careers#open-roles", category: "DevTools", tags: ["design", "collaboration", "prototyping"], description: "Design Tool" },
  { name: "Canva", slug: "canva", logo: "https://logo.clearbit.com/canva.com", careers: "https://www.canva.com/careers", applyLink: "https://www.canva.com/careers/search", category: "DevTools", tags: ["design", "creative"], description: "Design Platform" },
  { name: "Miro", slug: "miro", logo: "https://logo.clearbit.com/miro.com", careers: "https://miro.com/careers", applyLink: "https://miro.com/careers#open-positions", category: "DevTools", tags: ["whiteboard", "collaboration"], description: "Visual Collaboration" },
  { name: "Retool", slug: "retool", logo: "https://logo.clearbit.com/retool.com", careers: "https://retool.com/careers", applyLink: "https://retool.com/careers#open-roles", category: "DevTools", tags: ["internal-tools", "low-code"], description: "Internal Tools Builder" },
  { name: "Loom", slug: "loom", logo: "https://logo.clearbit.com/loom.com", careers: "https://www.loom.com/careers", applyLink: "https://www.loom.com/careers#openings", category: "DevTools", tags: ["video", "async"], description: "Async Video Messaging" },
  { name: "Airtable", slug: "airtable", logo: "https://logo.clearbit.com/airtable.com", careers: "https://airtable.com/careers", applyLink: "https://airtable.com/careers#open-roles", category: "DevTools", tags: ["database", "no-code"], description: "Connected Apps Platform" },
  { name: "Pitch", slug: "pitch", logo: "https://logo.clearbit.com/pitch.com", careers: "https://pitch.com/careers", applyLink: "https://pitch.com/careers", category: "DevTools", tags: ["presentations"], description: "Collaborative Presentations" },
  { name: "Postman", slug: "postman", logo: "https://logo.clearbit.com/postman.com", careers: "https://www.postman.com/company/careers", applyLink: "https://www.postman.com/company/careers#open-roles", category: "DevTools", tags: ["api", "testing"], description: "API Development Platform" },

  // SaaS / Enterprise
  { name: "Stripe", slug: "stripe", logo: "https://logo.clearbit.com/stripe.com", careers: "https://stripe.com/jobs", applyLink: "https://stripe.com/jobs/search", category: "SaaS", tags: ["payments", "fintech", "api"], description: "Payments, Financial Infrastructure" },
  { name: "Shopify", slug: "shopify", logo: "https://logo.clearbit.com/shopify.com", careers: "https://www.shopify.com/careers", applyLink: "https://www.shopify.com/careers/search", category: "SaaS", tags: ["ecommerce", "ruby", "rails"], description: "E-commerce Platform" },
  { name: "Twilio", slug: "twilio", logo: "https://logo.clearbit.com/twilio.com", careers: "https://www.twilio.com/company/jobs", applyLink: "https://www.twilio.com/company/jobs#openings", category: "SaaS", tags: ["communications", "api", "sms"], description: "Communications API" },
  { name: "Datadog", slug: "datadog", logo: "https://logo.clearbit.com/datadoghq.com", careers: "https://www.datadoghq.com/careers", applyLink: "https://www.datadoghq.com/careers#open-positions", category: "SaaS", tags: ["monitoring", "observability", "logs"], description: "Monitoring, APM, Logs" },
  { name: "New Relic", slug: "newrelic", logo: "https://logo.clearbit.com/newrelic.com", careers: "https://newrelic.com/careers", applyLink: "https://newrelic.com/careers#open-roles", category: "SaaS", tags: ["observability", "apm"], description: "Observability Platform" },
  { name: "PagerDuty", slug: "pagerduty", logo: "https://logo.clearbit.com/pagerduty.com", careers: "https://www.pagerduty.com/careers", applyLink: "https://www.pagerduty.com/careers#openings", category: "SaaS", tags: ["incident-response", "on-call"], description: "Incident Management" },
  { name: "Grafana Labs", slug: "grafana", logo: "https://logo.clearbit.com/grafana.com", careers: "https://grafana.com/company/careers", applyLink: "https://grafana.com/company/careers/#hiring", category: "SaaS", tags: ["monitoring", "open-source", "dashboards"], description: "Grafana, Loki, Tempo" },
  { name: "HashiCorp", slug: "hashicorp", logo: "https://logo.clearbit.com/hashicorp.com", careers: "https://www.hashicorp.com/company/jobs", applyLink: "https://www.hashicorp.com/company/jobs#open-roles", category: "SaaS", tags: ["infra", "devops", "terraform"], description: "Terraform, Vault, Consul" },
  { name: "Confluent", slug: "confluent", logo: "https://logo.clearbit.com/confluent.io", careers: "https://www.confluent.io/company/careers", applyLink: "https://www.confluent.io/company/careers/#hiring", category: "SaaS", tags: ["kafka", "streaming"], description: "Apache Kafka Platform" },
  { name: "Redis (Inc)", slug: "redis", logo: "https://logo.clearbit.com/redis.com", careers: "https://redis.com/careers", applyLink: "https://redis.com/careers#open-roles", category: "SaaS", tags: ["cache", "database", "in-memory"], description: "In-memory Database" },
  { name: "Elastic", slug: "elastic", logo: "https://logo.clearbit.com/elastic.co", careers: "https://www.elastic.co/careers", applyLink: "https://www.elastic.co/careers#open-positions", category: "SaaS", tags: ["search", "analytics", "elasticsearch"], description: "Elasticsearch, Kibana" },
  { name: "MongoDB", slug: "mongodb", logo: "https://logo.clearbit.com/mongodb.com", careers: "https://www.mongodb.com/careers", applyLink: "https://www.mongodb.com/careers#open-roles", category: "SaaS", tags: ["nosql", "database", "atlas"], description: "Document Database, Atlas" },
  { name: "ClickHouse", slug: "clickhouse", logo: "https://logo.clearbit.com/clickhouse.com", careers: "https://clickhouse.com/company/careers", applyLink: "https://clickhouse.com/company/careers#openings", category: "SaaS", tags: ["analytics", "columnar", "olap"], description: "OLAP Database" },
  { name: "Snyk", slug: "snyk", logo: "https://logo.clearbit.com/snyk.io", careers: "https://snyk.io/careers", applyLink: "https://snyk.io/careers#open-roles", category: "SaaS", tags: ["devsecops", "security"], description: "Developer Security" },

  // Security
  { name: "CrowdStrike", slug: "crowdstrike", logo: "https://logo.clearbit.com/crowdstrike.com", careers: "https://www.crowdstrike.com/careers", applyLink: "https://www.crowdstrike.com/careers/search", category: "Security", tags: ["endpoint", "threat-intel", "falcon"], description: "Endpoint Protection, Threat Intel" },
  { name: "Palo Alto Networks", slug: "paloaltonetworks", logo: "https://logo.clearbit.com/paloaltonetworks.com", careers: "https://www.paloaltonetworks.com/careers", applyLink: "https://www.paloaltonetworks.com/careers#open-positions", category: "Security", tags: ["firewall", "cloud-security"], description: "Cybersecurity Platform" },
  { name: "Fortinet", slug: "fortinet", logo: "https://logo.clearbit.com/fortinet.com", careers: "https://www.fortinet.com/careers", applyLink: "https://www.fortinet.com/careers#open-roles", category: "Security", tags: ["firewall", "network-security"], description: "Network Security" },
  { name: "SentinelOne", slug: "sentinelone", logo: "https://logo.clearbit.com/sentinelone.com", careers: "https://www.sentinelone.com/careers", applyLink: "https://www.sentinelone.com/careers#openings", category: "Security", tags: ["endpoint", "ai", "xdr"], description: "AI Cybersecurity" },
  { name: "1Password", slug: "1password", logo: "https://logo.clearbit.com/1password.com", careers: "https://1password.com/careers", applyLink: "https://1password.com/careers#open-roles", category: "Security", tags: ["password", "identity"], description: "Password Manager" },
  { name: "Dashlane", slug: "dashlane", logo: "https://logo.clearbit.com/dashlane.com", careers: "https://www.dashlane.com/careers", applyLink: "https://www.dashlane.com/careers#openings", category: "Security", tags: ["password", "vpn"], description: "Password Manager, VPN" },

  // Fintech
  { name: "PayPal", slug: "paypal", logo: "https://logo.clearbit.com/paypal.com", careers: "https://careers.pypl.com", applyLink: "https://careers.pypl.com/search", category: "Fintech", tags: ["payments", "digital-wallet"], description: "Digital Payments" },
  { name: "Square (Block)", slug: "square", logo: "https://logo.clearbit.com/squareup.com", careers: "https://squareup.com/us/en/careers", applyLink: "https://squareup.com/us/en/careers#open-roles", category: "Fintech", tags: ["payments", "pos", "cashapp"], description: "Payments, POS, Cash App" },
  { name: "Plaid", slug: "plaid", logo: "https://logo.clearbit.com/plaid.com", careers: "https://plaid.com/careers", applyLink: "https://plaid.com/careers#open-positions", category: "Fintech", tags: ["banking", "api", "fintech"], description: "Financial Data API" },
  { name: "Brex", slug: "brex", logo: "https://logo.clearbit.com/brex.com", careers: "https://www.brex.com/careers", applyLink: "https://www.brex.com/careers#open-roles", category: "Fintech", tags: ["corporate-card", "banking"], description: "Corporate Cards, Banking" },
  { name: "Ramp", slug: "ramp", logo: "https://logo.clearbit.com/ramp.com", careers: "https://ramp.com/careers", applyLink: "https://ramp.com/careers#open-roles", category: "Fintech", tags: ["corporate-card", "savings"], description: "Corporate Card, Spend Mgmt" },
  { name: "Robinhood", slug: "robinhood", logo: "https://logo.clearbit.com/robinhood.com", careers: "https://robinhood.com/us/en/careers", applyLink: "https://robinhood.com/us/en/careers#open-roles", category: "Fintech", tags: ["trading", "investing", "crypto"], description: "Commission-free Trading" },
  { name: "Chime", slug: "chime", logo: "https://logo.clearbit.com/chime.com", careers: "https://www.chime.com/careers", applyLink: "https://www.chime.com/careers#openings", category: "Fintech", tags: ["neobank", "banking"], description: "Neobank, Fee-free Banking" },
  { name: "Nubank", slug: "nubank", logo: "https://logo.clearbit.com/nubank.com.br", careers: "https://nubank.com.br/carreiras", applyLink: "https://nubank.com.br/carreiras#vagas", category: "Fintech", tags: ["neobank", "latin-america"], description: "Largest Neobank (Latin America)" },
  { name: "Revolut", slug: "revolut", logo: "https://logo.clearbit.com/revolut.com", careers: "https://www.revolut.com/careers", applyLink: "https://www.revolut.com/careers#open-roles", category: "Fintech", tags: ["neobank", "crypto", "europe"], description: "Neobank, Crypto, Europe" },
  { name: "Wise", slug: "wise", logo: "https://logo.clearbit.com/wise.com", careers: "https://www.wise.jobs", applyLink: "https://www.wise.jobs/search", category: "Fintech", tags: ["remittance", "forex"], description: "International Money Transfer" },

  // India Startups
  { name: "Flipkart", slug: "flipkart", logo: "https://logo.clearbit.com/flipkart.com", careers: "https://www.flipkartcareers.com", applyLink: "https://www.flipkartcareers.com/job-search", category: "India", tags: ["ecommerce", "supply-chain"], description: "E-commerce (Walmart India)" },
  { name: "Razorpay", slug: "razorpay", logo: "https://logo.clearbit.com/razorpay.com", careers: "https://razorpay.com/careers", applyLink: "https://razorpay.com/careers#open-positions", category: "India", tags: ["payments", "fintech", "gateway"], description: "Payments Platform" },
  { name: "Freshworks", slug: "freshworks", logo: "https://logo.clearbit.com/freshworks.com", careers: "https://www.freshworks.com/careers", applyLink: "https://www.freshworks.com/careers#open-roles", category: "India", tags: ["saas", "crm", "itsm"], description: "SaaS, CRM, ITSM" },
  { name: "Zoho", slug: "zoho", logo: "https://logo.clearbit.com/zoho.com", careers: "https://www.zoho.com/careers.html", applyLink: "https://www.zoho.com/careers.html#current-openings", category: "India", tags: ["saas", "enterprise", "suite"], description: "SaaS Suite (45+ apps)" },
  { name: "CRED", slug: "cred", logo: "https://logo.clearbit.com/cred.club", careers: "https://cred.club/careers", applyLink: "https://cred.club/careers#openings", category: "India", tags: ["fintech", "credit", "rewards"], description: "Credit Card Payments" },
  { name: "Meesho", slug: "meesho", logo: "https://logo.clearbit.com/meesho.com", careers: "https://www.meesho.com/careers", applyLink: "https://www.meesho.com/careers#open-roles", category: "India", tags: ["ecommerce", "social", "reselling"], description: "Social Commerce" },
  { name: "Swiggy", slug: "swiggy", logo: "https://logo.clearbit.com/swiggy.com", careers: "https://careers.swiggy.com", applyLink: "https://careers.swiggy.com/jobs", category: "India", tags: ["food", "delivery", "quick-commerce"], description: "Food Delivery, Instamart" },
  { name: "Zerodha", slug: "zerodha", logo: "https://logo.clearbit.com/zerodha.com", careers: "https://zerodha.com/careers", applyLink: "https://zerodha.com/careers#open-roles", category: "India", tags: ["trading", "fintech"], description: "Discount Brokerage" },
  { name: "PhonePe", slug: "phonepe", logo: "https://logo.clearbit.com/phonepe.com", careers: "https://www.phonepe.com/careers", applyLink: "https://www.phonepe.com/careers#open-positions", category: "India", tags: ["payments", "upi", "fintech"], description: "UPI Payments" },
  { name: "Groww", slug: "groww", logo: "https://logo.clearbit.com/groww.in", careers: "https://groww.in/careers", applyLink: "https://groww.in/careers#openings", category: "India", tags: ["investing", "mutual-funds"], description: "Investment Platform" },
  { name: "Dream11", slug: "dream11", logo: "https://logo.clearbit.com/dream11.com", careers: "https://www.dream11.com/careers", applyLink: "https://www.dream11.com/careers#open-roles", category: "India", tags: ["fantasy-sports", "gaming"], description: "Fantasy Sports" },
  { name: "Ola", slug: "ola", logo: "https://logo.clearbit.com/olacabs.com", careers: "https://www.olacabs.com/careers", applyLink: "https://www.olacabs.com/careers", category: "India", tags: ["mobility", "ev", "ride-sharing"], description: "Ride-sharing, EV" },
  { name: "OYO", slug: "oyo", logo: "https://logo.clearbit.com/oyorooms.com", careers: "https://www.oyorooms.com/careers", applyLink: "https://www.oyorooms.com/careers#open-positions", category: "India", tags: ["hospitality", "travel"], description: "Hotel Chain, Hospitality" },
  { name: "BYJU'S", slug: "byjus", logo: "https://logo.clearbit.com/byjus.com", careers: "https://byjus.com/careers", applyLink: "https://byjus.com/careers#open-roles", category: "India", tags: ["edtech", "learning"], description: "EdTech Platform" },
  { name: "Unacademy", slug: "unacademy", logo: "https://logo.clearbit.com/unacademy.com", careers: "https://unacademy.com/careers", applyLink: "https://unacademy.com/careers#openings", category: "India", tags: ["edtech", "live-classes"], description: "EdTech, Live Classes" },
  { name: "Razorpay (Payroll)", slug: "razorpaypayroll", logo: "https://logo.clearbit.com/razorpay.com", careers: "https://razorpay.com/careers", applyLink: "https://razorpay.com/careers#engineering", category: "India", tags: ["hrtech", "payroll"], description: "Payroll Platform" },
  { name: "Postman", slug: "postman2", logo: "https://logo.clearbit.com/postman.com", careers: "https://www.postman.com/company/careers", applyLink: "https://www.postman.com/company/careers", category: "India", tags: ["api", "devtools", "bangalore"], description: "API Platform (Bangalore HQ)" },

  // Global Startups
  { name: "Spotify", slug: "spotify", logo: "https://logo.clearbit.com/spotify.com", careers: "https://lifeatspotify.com", applyLink: "https://lifeatspotify.com/join-us", category: "Startups", tags: ["music", "streaming", "audio"], description: "Music & Podcasts Streaming" },
  { name: "Airbnb", slug: "airbnb", logo: "https://logo.clearbit.com/airbnb.com", careers: "https://careers.airbnb.com", applyLink: "https://careers.airbnb.com/positions", category: "Startups", tags: ["travel", "marketplace", "housing"], description: "Travel Marketplace" },
  { name: "Uber", slug: "uber", logo: "https://logo.clearbit.com/uber.com", careers: "https://www.uber.com/careers", applyLink: "https://www.uber.com/global/en/careers", category: "Startups", tags: ["mobility", "delivery", "freight"], description: "Ride-sharing, Delivery, Freight" },
  { name: "DoorDash", slug: "doordash", logo: "https://logo.clearbit.com/doordash.com", careers: "https://doordash.engineering", applyLink: "https://doordash.engineering/careers", category: "Startups", tags: ["delivery", "logistics"], description: "Food Delivery" },
  { name: "Instacart", slug: "instacart", logo: "https://logo.clearbit.com/instacart.com", careers: "https://careers.instacart.com", applyLink: "https://careers.instacart.com/positions", category: "Startups", tags: ["grocery", "delivery"], description: "Grocery Delivery" },
  { name: "Snap", slug: "snap", logo: "https://logo.clearbit.com/snap.com", careers: "https://careers.snap.com", applyLink: "https://careers.snap.com/roles", category: "Startups", tags: ["social", "ar", "camera"], description: "Snapchat, AR" },
  { name: "Pinterest", slug: "pinterest", logo: "https://logo.clearbit.com/pinterest.com", careers: "https://careers.pinterest.com", applyLink: "https://careers.pinterest.com/roles", category: "Startups", tags: ["visual", "discovery", "pins"], description: "Visual Discovery" },
  { name: "Reddit", slug: "reddit", logo: "https://logo.clearbit.com/reddit.com", careers: "https://www.redditinc.com/careers", applyLink: "https://www.redditinc.com/careers#open-roles", category: "Startups", tags: ["community", "forum", "social"], description: "Community Forum" },
  { name: "Discord", slug: "discord", logo: "https://logo.clearbit.com/discord.com", careers: "https://discord.com/careers", applyLink: "https://discord.com/careers#open-positions", category: "Startups", tags: ["chat", "gaming", "community"], description: "Voice & Text Chat" },
  { name: "Twitch", slug: "twitch", logo: "https://logo.clearbit.com/twitch.tv", careers: "https://www.twitch.tv/jobs", applyLink: "https://www.twitch.tv/jobs#openings", category: "Startups", tags: ["streaming", "gaming", "live"], description: "Live Streaming" },
  { name: "Etsy", slug: "etsy", logo: "https://logo.clearbit.com/etsy.com", careers: "https://www.etsy.com/careers", applyLink: "https://www.etsy.com/careers#open-roles", category: "Startups", tags: ["marketplace", "handmade", "crafts"], description: "Handmade Marketplace" },
  { name: "Duolingo", slug: "duolingo", logo: "https://logo.clearbit.com/duolingo.com", careers: "https://careers.duolingo.com", applyLink: "https://careers.duolingo.com/jobs", category: "Startups", tags: ["edtech", "language", "ai"], description: "Language Learning" },
  { name: "Coinbase", slug: "coinbase", logo: "https://logo.clearbit.com/coinbase.com", careers: "https://www.coinbase.com/careers", applyLink: "https://www.coinbase.com/careers#openings", category: "Startups", tags: ["crypto", "exchange", "wallet"], description: "Crypto Exchange" },
  { name: "Notion", slug: "notion2", logo: "https://logo.clearbit.com/notion.so", careers: "https://www.notion.so/careers", applyLink: "https://www.notion.so/careers#open-roles", category: "Startups", tags: ["productivity", "wiki", "docs"], description: "Connected Workspace" },

  // Robotics / Hardware
  { name: "Tesla", slug: "tesla", logo: "https://logo.clearbit.com/tesla.com", careers: "https://www.tesla.com/careers", applyLink: "https://www.tesla.com/careers/search", category: "Robotics", tags: ["ev", "autonomous", "energy"], description: "EV, Autopilot, Energy" },
  { name: "NVIDIA", slug: "nvidia", logo: "https://logo.clearbit.com/nvidia.com", careers: "https://nvidia.wd5.myworkdayjobs.com", applyLink: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite", category: "Robotics", tags: ["gpu", "ai", "cuda"], description: "GPU, AI Hardware, CUDA" },
  { name: "Boston Dynamics", slug: "bostondynamics", logo: "https://logo.clearbit.com/bostondynamics.com", careers: "https://www.bostondynamics.com/careers", applyLink: "https://www.bostondynamics.com/careers#open-roles", category: "Robotics", tags: ["robotics", "locomotion"], description: "Advanced Robotics" },
  { name: "Waymo", slug: "waymo", logo: "https://logo.clearbit.com/waymo.com", careers: "https://waymo.com/careers", applyLink: "https://waymo.com/careers#open-positions", category: "Robotics", tags: ["autonomous", "self-driving"], description: "Autonomous Vehicles" },
  { name: "Rivian", slug: "rivian", logo: "https://logo.clearbit.com/rivian.com", careers: "https://rivian.com/careers", applyLink: "https://rivian.com/careers#open-roles", category: "Robotics", tags: ["ev", "trucks"], description: "Electric Trucks & SUVs" },

  // Gaming
  { name: "Epic Games", slug: "epicgames", logo: "https://logo.clearbit.com/epicgames.com", careers: "https://www.epicgames.com/site/en-US/careers", applyLink: "https://www.epicgames.com/site/en-US/careers#jobs", category: "Gaming", tags: ["unreal", "fortnite", "store"], description: "Unreal Engine, Fortnite" },
  { name: "Unity", slug: "unity", logo: "https://logo.clearbit.com/unity.com", careers: "https://careers.unity.com", applyLink: "https://careers.unity.com/positions", category: "Gaming", tags: ["game-engine", "3d", "realtime"], description: "Game Engine, 3D" },
  { name: "Roblox", slug: "roblox", logo: "https://logo.clearbit.com/roblox.com", careers: "https://corp.roblox.com/careers", applyLink: "https://corp.roblox.com/careers#open-roles", category: "Gaming", tags: ["metaverse", "ugc", "social"], description: "Metaverse Platform" },
  { name: "Riot Games", slug: "riotgames", logo: "https://logo.clearbit.com/riotgames.com", careers: "https://www.riotgames.com/careers", applyLink: "https://www.riotgames.com/en/work-with-us", category: "Gaming", tags: ["league", "valorant", "esports"], description: "League of Legends, Valorant" },
  { name: "Supercell", slug: "supercell", logo: "https://logo.clearbit.com/supercell.com", careers: "https://supercell.com/careers", applyLink: "https://supercell.com/careers/#open-positions", category: "Gaming", tags: ["mobile", "clash"], description: "Mobile Games (Clash of Clans)" },
  { name: "Valve", slug: "valve", logo: "https://logo.clearbit.com/valvesoftware.com", careers: "https://www.valvesoftware.com/jobs", applyLink: "https://www.valvesoftware.com/jobs#applying", category: "Gaming", tags: ["steam", "vr", "half-life"], description: "Steam, VR, Games" },
  { name: "Blizzard", slug: "blizzard", logo: "https://logo.clearbit.com/blizzard.com", careers: "https://careers.blizzard.com", applyLink: "https://careers.blizzard.com#open-positions", category: "Gaming", tags: ["world-of-warcraft", "overwatch"], description: "World of Warcraft, Overwatch" },

  // Media / Streaming
  { name: "Disney", slug: "disney", logo: "https://logo.clearbit.com/disney.com", careers: "https://disneycareers.com", applyLink: "https://disneycareers.com/en/search-jobs", category: "Media", tags: ["streaming", "entertainment", "pixar"], description: "Disney, Pixar, Marvel, Star Wars" },
  { name: "Spotify", slug: "spotify2", logo: "https://logo.clearbit.com/spotify.com", careers: "https://lifeatspotify.com", applyLink: "https://lifeatspotify.com/join-us", category: "Media", tags: ["music", "podcasts", "audio"], description: "Music & Podcasts" },
  { name: "Warner Bros Discovery", slug: "wbd", logo: "https://logo.clearbit.com/wbd.com", careers: "https://wbd.wd5.myworkdayjobs.com", applyLink: "https://wbd.wd5.myworkdayjobs.com/wbd", category: "Media", tags: ["streaming", "hbo", "warner"], description: "HBO Max, Warner Bros" },
  { name: "Lionsgate", slug: "lionsgate", logo: "https://logo.clearbit.com/lionsgate.com", careers: "https://www.lionsgate.com/careers", applyLink: "https://www.lionsgate.com/careers#openings", category: "Media", tags: ["film", "studio"], description: "Film Studio" },

  // Consulting / Services
  { name: "Deloitte", slug: "deloitte", logo: "https://logo.clearbit.com/deloitte.com", careers: "https://jobs.deloitte.com", applyLink: "https://jobs.deloitte.com/search", category: "Consulting", tags: ["consulting", "audit", "advisory"], description: "Big 4 Consulting" },
  { name: "Accenture", slug: "accenture", logo: "https://logo.clearbit.com/accenture.com", careers: "https://www.accenture.com/us-en/careers", applyLink: "https://www.accenture.com/us-en/careers/jobsearch", category: "Consulting", tags: ["consulting", "technology"], description: "Technology Consulting" },
  { name: "McKinsey", slug: "mckinsey", logo: "https://logo.clearbit.com/mckinsey.com", careers: "https://www.mckinsey.com/careers", applyLink: "https://www.mckinsey.com/careers/search-jobs", category: "Consulting", tags: ["strategy", "consulting"], description: "Strategy Consulting" },
  { name: "Bain & Company", slug: "bain", logo: "https://logo.clearbit.com/bain.com", careers: "https://www.bain.com/careers", applyLink: "https://www.bain.com/careers/find-a-role", category: "Consulting", tags: ["strategy", "consulting"], description: "Strategy Consulting" },

  // Telecommunications
  { name: "Jio", slug: "jio", logo: "https://logo.clearbit.com/jio.com", careers: "https://www.jio.com/careers", applyLink: "https://www.jio.com/careers#open-positions", category: "Telecom", tags: ["5g", "digital", "india"], description: "5G, Digital Services (India)" },
  { name: "Airtel", slug: "airtel", logo: "https://logo.clearbit.com/airtel.in", careers: "https://www.airtel.in/careers", applyLink: "https://www.airtel.in/careers#openings", category: "Telecom", tags: ["5g", "digital", "india"], description: "5G, Digital Services (India)" },
];

export function searchCompanies(query: string, category?: string): Company[] {
  let results = companies;
  if (category) {
    results = results.filter((c) => c.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q)) ||
        c.description.toLowerCase().includes(q)
    );
  }
  return results;
}

export const categories = Array.from(new Set(companies.map((c) => c.category))).sort();
