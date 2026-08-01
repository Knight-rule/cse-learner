'use client';

import { useState } from 'react';
import Link from 'next/link';

type CompanyCategory = 'FAANG' | 'Service' | 'Product' | 'Fintech' | 'Cloud';

interface Company {
  name: string;
  category: CompanyCategory;
  roles: string;
  rounds: string;
  keySkills: string;
  difficulty: 'Easy' | 'Medium' | 'Medium-Hard' | 'Hard' | 'Very Hard';
  prepTime: string;
  specialNotes: string;
  icon: string;
  color: string;
}

const companies: Company[] = [
  {
    name: 'Google',
    category: 'FAANG',
    roles: 'SDE I-III, Senior, Staff',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, Googleyness',
    difficulty: 'Very Hard',
    prepTime: '8-10 weeks',
    specialNotes: 'AI coding round, Hiring Committee, Team Match',
    icon: '🔍',
    color: '#4285F4',
  },
  {
    name: 'Microsoft',
    category: 'FAANG',
    roles: 'SDE I-II, Senior, Principal',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Growth Mindset',
    difficulty: 'Hard',
    prepTime: '6-8 weeks',
    specialNotes: 'As-Appropriate round, Azure focus',
    icon: '🪟',
    color: '#00A4EF',
  },
  {
    name: 'Amazon',
    category: 'FAANG',
    roles: 'SDE I-III, Senior, Principal',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, 16 Leadership Principles',
    difficulty: 'Very Hard',
    prepTime: '8-10 weeks',
    specialNotes: 'Bar Raiser veto power, AI literacy required',
    icon: '📦',
    color: '#FF9900',
  },
  {
    name: 'Meta',
    category: 'FAANG',
    roles: 'E3-E6, E7+',
    rounds: '5-6 rounds',
    keySkills: 'DSA (2 problems/round), System Design, Behavioral',
    difficulty: 'Very Hard',
    prepTime: '8-12 weeks',
    specialNotes: 'Code execution OFF, AI-enabled round, double-problem coding',
    icon: '👤',
    color: '#1877F2',
  },
  {
    name: 'Apple',
    category: 'FAANG',
    roles: 'ICT2-ICT5, Staff',
    rounds: '4-7 rounds',
    keySkills: 'DSA, System Design (mobile-first), Concurrency',
    difficulty: 'Hard',
    prepTime: '6-8 weeks',
    specialNotes: 'Team-owned loop, no AI tools, code craftsmanship',
    icon: '🍎',
    color: '#A2AAAD',
  },
  {
    name: 'TCS',
    category: 'Service',
    roles: 'System Engineer, IT Analyst',
    rounds: '4 rounds',
    keySkills: 'Aptitude, Coding basics, OOPs, SQL',
    difficulty: 'Easy',
    prepTime: '4 weeks',
    specialNotes: 'NQT exam, Prime/Digital/Ninja tiers',
    icon: '💼',
    color: '#0072C6',
  },
  {
    name: 'Infosys',
    category: 'Service',
    roles: 'System Engineer, Specialist Programmer',
    rounds: '3-4 rounds',
    keySkills: 'Aptitude, Coding basics, OOPs, SQL',
    difficulty: 'Easy',
    prepTime: '4-5 weeks',
    specialNotes: 'InfyTQ certification, HackWithInfy path',
    icon: '🏢',
    color: '#007CC3',
  },
  {
    name: 'Wipro',
    category: 'Service',
    roles: 'Project Engineer, Designer',
    rounds: '3-4 rounds',
    keySkills: 'Aptitude, CS basics, Coding',
    difficulty: 'Easy',
    prepTime: '4 weeks',
    specialNotes: 'WASE/WILP programs',
    icon: '🌐',
    color: '#005DA6',
  },
  {
    name: 'Cognizant',
    category: 'Service',
    roles: 'Programmer Analyst',
    rounds: '3-4 rounds',
    keySkills: 'Aptitude, CS basics, Coding',
    difficulty: 'Easy',
    prepTime: '4 weeks',
    specialNotes: 'Cognitive + technical assessment',
    icon: '💻',
    color: '#0033A0',
  },
  {
    name: 'Accenture',
    category: 'Service',
    roles: 'Associate Software Engineer',
    rounds: '3-4 rounds',
    keySkills: 'Cognitive, Technical, Behavioral',
    difficulty: 'Easy',
    prepTime: '4 weeks',
    specialNotes: 'Personality assessment included',
    icon: '🚀',
    color: '#A100FF',
  },
  {
    name: 'Razorpay',
    category: 'Product',
    roles: 'SDE I-III',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, Fintech',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Payment domain knowledge valued',
    icon: '💳',
    color: '#072654',
  },
  {
    name: 'PhonePe',
    category: 'Product',
    roles: 'SDE I-III',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, UPI',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'UPI domain knowledge required',
    icon: '📱',
    color: '#5F259F',
  },
  {
    name: 'Zerodha',
    category: 'Product',
    roles: 'Developer',
    rounds: '4-5 rounds',
    keySkills: 'Full Stack, System Design, Trading',
    difficulty: 'Medium',
    prepTime: '4-5 weeks',
    specialNotes: 'Take-home project, founder round',
    icon: '📈',
    color: '#E63946',
  },
  {
    name: 'Flipkart',
    category: 'Product',
    roles: 'SDE I-III',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, E-commerce',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'E-commerce domain valued',
    icon: '🛒',
    color: '#2874F0',
  },
  {
    name: 'Swiggy',
    category: 'Product',
    roles: 'SDE I-III',
    rounds: '5-6 rounds',
    keySkills: 'DSA, System Design, Real-time',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Real-time systems focus',
    icon: '🍔',
    color: '#FC8019',
  },
  {
    name: 'JPMorgan',
    category: 'Fintech',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Finance',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Financial domain knowledge',
    icon: '🏦',
    color: '#003D6B',
  },
  {
    name: 'Goldman Sachs',
    category: 'Fintech',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Quantitative',
    difficulty: 'Hard',
    prepTime: '6-8 weeks',
    specialNotes: 'Superday format, quantitative skills',
    icon: '💹',
    color: '#7399C6',
  },
  {
    name: 'Stripe',
    category: 'Fintech',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, APIs',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'API design focus',
    icon: '💰',
    color: '#635BFF',
  },
  {
    name: 'PayPal',
    category: 'Fintech',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Payments',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Payment domain valued',
    icon: '💲',
    color: '#003087',
  },
  {
    name: 'Databricks',
    category: 'Cloud',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Data/Spark',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Big data domain',
    icon: '📊',
    color: '#FF3621',
  },
  {
    name: 'Snowflake',
    category: 'Cloud',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Databases',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Database internals',
    icon: '❄️',
    color: '#29B5E8',
  },
  {
    name: 'Cloudflare',
    category: 'Cloud',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'DSA, System Design, Networking',
    difficulty: 'Medium-Hard',
    prepTime: '6 weeks',
    specialNotes: 'Networking/security focus',
    icon: '☁️',
    color: '#F38020',
  },
  {
    name: 'Vercel',
    category: 'Cloud',
    roles: 'Software Engineer',
    rounds: '4-5 rounds',
    keySkills: 'Full Stack, System Design, Edge',
    difficulty: 'Medium',
    prepTime: '4-5 weeks',
    specialNotes: 'Take-home, open-source valued',
    icon: '▲',
    color: '#000000',
  },
];

const categories: { name: CompanyCategory; icon: string; description: string }[] = [
  { name: 'FAANG', icon: '🏢', description: 'Google, Microsoft, Amazon, Meta, Apple' },
  { name: 'Service', icon: '💼', description: 'TCS, Infosys, Wipro, Cognizant, Accenture' },
  { name: 'Product', icon: '🚀', description: 'Razorpay, PhonePe, Flipkart, Swiggy, Zerodha' },
  { name: 'Fintech', icon: '💳', description: 'JPMorgan, Goldman Sachs, Stripe, PayPal' },
  { name: 'Cloud', icon: '☁️', description: 'Databricks, Snowflake, Cloudflare, Vercel' },
];

const prepPriority: { category: string; steps: string[] }[] = [
  {
    category: 'FAANG',
    steps: [
      'DSA mastery — 200+ LeetCode problems, medium-hard focus',
      'System Design — 5-6 designs, real-world scale',
      'Behavioral stories — 8-10 STAR stories, company-specific frameworks',
      'Mock interviews — 5-6 full loops minimum',
      'Company-specific prep — LPs (Amazon), Googleyness (Google), Growth Mindset (Microsoft)',
    ],
  },
  {
    category: 'Service',
    steps: [
      'Aptitude — Quant, reasoning, verbal (2-3 weeks)',
      'Coding basics — Arrays, strings, sorting (1-2 weeks)',
      'CS fundamentals — OOPs, DBMS, SQL (1 week)',
      'Interview prep — Project explanation, HR questions (1 week)',
    ],
  },
  {
    category: 'Product',
    steps: [
      'DSA — 50-100 LeetCode problems (3-4 weeks)',
      'System Design — Company-specific (2 weeks)',
      'Domain knowledge — Payment/fintech/e-commerce (1 week)',
      'Full-stack projects — Build complete applications (ongoing)',
    ],
  },
  {
    category: 'Fintech',
    steps: [
      'DSA — 50-100 problems (3-4 weeks)',
      'Financial domain — Markets, trading, compliance (2 weeks)',
      'System Design — Financial systems (2 weeks)',
      'Quantitative skills — Math, statistics basics (1 week)',
    ],
  },
  {
    category: 'Cloud',
    steps: [
      'DSA — 50-100 problems (3-4 weeks)',
      'Domain-specific — Data/networking/databases (2-3 weeks)',
      'System Design — Distributed systems (2 weeks)',
      'Open-source contributions — Build reputation (ongoing)',
    ],
  },
];

const difficultyColors: Record<string, string> = {
  Easy: '#10B981',
  Medium: '#F59E0B',
  'Medium-Hard': '#F97316',
  Hard: '#EF4444',
  'Very Hard': '#DC2626',
};

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'All'>('All');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const filteredCompanies =
    selectedCategory === 'All'
      ? companies
      : companies.filter((c) => c.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
          borderBottom: '1px solid var(--border)',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <span style={{ fontSize: 48 }}>🎯</span>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '16px 0 12px',
              lineHeight: 1.2,
            }}
          >
            Company Hiring Patterns
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              maxWidth: 600,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Interview processes, required skills, and preparation roadmaps for 23+ top tech
            companies across FAANG, service, product, fintech, and cloud/infrastructure.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Companies', value: '23+' },
              { label: 'Categories', value: '5' },
              { label: 'Prep Guides', value: '23+' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  textAlign: 'center',
                  padding: '12px 24px',
                  background: 'var(--surface)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  minWidth: 120,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 40,
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '10px 20px',
              borderRadius: 24,
              border: '2px solid',
              borderColor: selectedCategory === 'All' ? 'var(--accent)' : 'var(--border)',
              background: selectedCategory === 'All' ? 'var(--accent)' : 'var(--surface)',
              color: selectedCategory === 'All' ? 'white' : 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            All Companies
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                padding: '10px 20px',
                borderRadius: 24,
                border: '2px solid',
                borderColor: selectedCategory === cat.name ? 'var(--accent)' : 'var(--border)',
                background: selectedCategory === cat.name ? 'var(--accent)' : 'var(--surface)',
                color: selectedCategory === cat.name ? 'white' : 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 20,
            marginBottom: 60,
          }}
        >
          {filteredCompanies.map((company) => (
            <div
              key={company.name}
              onClick={() =>
                setExpandedCompany(expandedCompany === company.name ? null : company.name)
              }
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderLeft: `4px solid ${company.color}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = company.color;
                e.currentTarget.style.boxShadow = `0 4px 20px ${company.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{company.icon}</span>
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {company.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 12,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: `${company.color}20`,
                      color: company.color,
                      fontWeight: 600,
                    }}
                  >
                    {company.category}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Rounds</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {company.rounds}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Prep Time</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {company.prepTime}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Difficulty</span>
                  <span
                    style={{
                      color: difficultyColors[company.difficulty],
                      fontWeight: 600,
                      fontSize: 12,
                      padding: '2px 8px',
                      borderRadius: 8,
                      background: `${difficultyColors[company.difficulty]}15`,
                    }}
                  >
                    {company.difficulty}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {company.keySkills}
              </p>

              {expandedCompany === company.name && (
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--accent)',
                      fontWeight: 600,
                      margin: '0 0 8px',
                    }}
                  >
                    Special Notes
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {company.specialNotes}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      marginTop: 8,
                    }}
                  >
                    Roles: {company.roles}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preparation Priority Section */}
        <section style={{ marginTop: 60 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--text-primary)',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            Quick Prep Priority by Company Type
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            Focus your preparation based on the type of company you&apos;re targeting
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
              gap: 24,
            }}
          >
            {prepPriority.map((item) => {
              const cat = categories.find((c) => c.name === item.category);
              return (
                <div
                  key={item.category}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: 28 }}>{cat?.icon}</span>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {item.category}
                    </h3>
                  </div>
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {item.steps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                        }}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full Guide Link */}
        <section
          style={{
            marginTop: 60,
            textAlign: 'center',
            padding: 40,
            background: 'var(--surface)',
            borderRadius: 16,
            border: '1px solid var(--border)',
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}
          >
            Want the Full Guide?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              marginBottom: 24,
              maxWidth: 500,
              margin: '0 auto 24px',
            }}
          >
            Download the complete 2000+ line hiring patterns document with detailed roadmaps,
            application tips, and red flags for every company.
          </p>
          <a
            href="/hiring-patterns.md"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              background: 'var(--accent)',
              color: 'white',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📥 Download Full Guide
          </a>
        </section>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            href="/"
            style={{
              color: 'var(--accent)',
              fontSize: 16,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
