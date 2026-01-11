/**
 * RefereeAI - Complete Category Data
 * Production-ready comparison templates
 */

const categories = {
  'cloud-providers': {
    id: 'cloud-providers',
    category: 'Cloud Providers',
    title: 'Cloud Platform Comparison',
    description: 'Compare major cloud infrastructure providers',
    icon: '☁️',
    options: [
      {
        name: 'AWS',
        description: 'Amazon Web Services - comprehensive cloud platform',
        costEfficiency: 3,
        scalability: 5,
        easeOfUse: 2,
        timeToMarket: 3,
        communitySupport: 5,
        strengths: [
          'Largest service ecosystem with 200+ services',
          'Extensive documentation and training resources',
          'Global infrastructure across 30+ regions',
          'Enterprise-grade security and compliance'
        ],
        weaknesses: [
          'Complex pricing model can be confusing',
          'Steep learning curve for beginners',
          'Can become expensive without optimization'
        ],
        bestFor: [
          'Large-scale enterprise applications',
          'Complex multi-service architectures',
          'Organizations requiring compliance certifications'
        ]
      },
      {
        name: 'Google Cloud',
        description: 'Google Cloud Platform - AI/ML focused cloud',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 3,
        timeToMarket: 4,
        communitySupport: 4,
        strengths: [
          'Best-in-class AI/ML and data analytics',
          'Competitive pricing with sustained use discounts',
          'Strong Kubernetes and container support',
          'Excellent BigQuery for data warehousing'
        ],
        weaknesses: [
          'Smaller service ecosystem than AWS',
          'Less enterprise adoption in some regions',
          'Fewer third-party integrations'
        ],
        bestFor: [
          'Data-heavy and analytics applications',
          'AI/ML and machine learning projects',
          'Modern containerized applications'
        ]
      },
      {
        name: 'Azure',
        description: 'Microsoft Azure - enterprise and hybrid cloud',
        costEfficiency: 3,
        scalability: 5,
        easeOfUse: 3,
        timeToMarket: 3,
        communitySupport: 5,
        strengths: [
          'Seamless Microsoft ecosystem integration',
          'Strong hybrid cloud capabilities',
          'Excellent enterprise support and SLAs',
          'Active Directory and identity management'
        ],
        weaknesses: [
          'Complex portal interface',
          'Pricing can be confusing',
          'Some services less mature than AWS'
        ],
        bestFor: [
          'Organizations using Microsoft stack',
          'Hybrid cloud deployments',
          'Enterprise Windows applications'
        ]
      }
    ]
  }
};

module.exports = categories;

// Add more categories here
categories['programming-languages'] = {
  id: 'programming-languages',
  category: 'Programming Languages',
  title: 'Programming Language Comparison',
  description: 'Compare languages for your next project',
  icon: '💻',
  options: [
    {
      name: 'Python',
      description: 'Versatile language for web, data, and AI',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 5,
      timeToMarket: 5,
      communitySupport: 5,
      strengths: [
        'Easy to learn with clean syntax',
        'Huge ecosystem for data science and AI',
        'Excellent for rapid prototyping',
        'Strong community and libraries'
      ],
      weaknesses: [
        'Slower execution than compiled languages',
        'Global Interpreter Lock limits concurrency',
        'Not ideal for mobile development'
      ],
      bestFor: [
        'Data science and machine learning',
        'Web development with Django/Flask',
        'Automation and scripting'
      ]
    },
    {
      name: 'JavaScript',
      description: 'Universal language for web development',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 4,
      timeToMarket: 5,
      communitySupport: 5,
      strengths: [
        'Runs everywhere (browser, server, mobile)',
        'Huge npm ecosystem',
        'Full-stack development with one language',
        'Excellent for real-time applications'
      ],
      weaknesses: [
        'Loose typing can lead to bugs',
        'Callback hell without proper patterns',
        'Browser compatibility issues'
      ],
      bestFor: [
        'Full-stack web development',
        'Real-time applications',
        'Cross-platform mobile apps'
      ]
    },
    {
      name: 'Java',
      description: 'Enterprise-grade object-oriented language',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 3,
      communitySupport: 5,
      strengths: [
        'Platform independent (Write Once, Run Anywhere)',
        'Strong typing and compile-time checks',
        'Excellent for large enterprise systems',
        'Mature ecosystem and tools'
      ],
      weaknesses: [
        'Verbose syntax',
        'Slower development compared to Python/JS',
        'Steeper learning curve'
      ],
      bestFor: [
        'Enterprise applications',
        'Android mobile development',
        'Large-scale distributed systems'
      ]
    }
  ]
};