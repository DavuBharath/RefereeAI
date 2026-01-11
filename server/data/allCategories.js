/**
 * RefereeAI - Complete Category Data
 * Production-ready comparison templates with real-world options
 */

const categories = {
  
  // CATEGORY 1: Programming Languages
  'programming-languages': {
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
        strengths: [
          'Easy to learn with clean, readable syntax',
          'Huge ecosystem for data science and AI/ML',
          'Excellent for rapid prototyping and MVPs',
          'Strong community with extensive libraries'
        ],
        weaknesses: [
          'Slower execution than compiled languages',
          'Global Interpreter Lock limits concurrency',
          'Not ideal for mobile development'
        ],
        bestFor: [
          'Data science and machine learning projects',
          'Web development with Django or Flask',
          'Automation scripts and tools'
        ]
      },
      {
        name: 'JavaScript',
        description: 'Universal language for web development',
        costEfficiency: 5,
        scalability: 4,
        easeOfUse: 4,
        timeToMarket: 5,
        strengths: [
          'Runs everywhere: browser, server, mobile',
          'Huge npm ecosystem with millions of packages',
          'Full-stack development with single language',
          'Excellent for real-time applications'
        ],
        weaknesses: [
          'Loose typing can lead to runtime errors',
          'Callback complexity without proper patterns',
          'Browser compatibility challenges'
        ],
        bestFor: [
          'Full-stack web development',
          'Real-time applications and SPAs',
          'Cross-platform mobile apps with React Native'
        ]
      },
      {
        name: 'Java',
        description: 'Enterprise-grade object-oriented language',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 3,
        timeToMarket: 3,
        strengths: [
          'Platform independent (Write Once, Run Anywhere)',
          'Strong typing with compile-time error checking',
          'Excellent for large enterprise systems',
          'Mature ecosystem with robust tools'
        ],
        weaknesses: [
          'Verbose syntax requires more code',
          'Slower development compared to Python/JS',
          'Steeper learning curve for beginners'
        ],
        bestFor: [
          'Enterprise applications and microservices',
          'Android mobile development',
          'Large-scale distributed systems'
        ]
      },
      {
        name: 'Go',
        description: 'Fast, simple language for modern systems',
        costEfficiency: 5,
        scalability: 5,
        easeOfUse: 4,
        timeToMarket: 4,
        strengths: [
          'Excellent performance with simple syntax',
          'Built-in concurrency with goroutines',
          'Fast compilation and execution',
          'Great for microservices and cloud-native apps'
        ],
        weaknesses: [
          'Smaller ecosystem than Python/JS',
          'Limited generics support (improving)',
          'Less suitable for complex business logic'
        ],
        bestFor: [
          'Microservices and APIs',
          'Cloud-native applications',
          'DevOps tools and CLI applications'
        ]
      },
      {
        name: 'Rust',
        description: 'Systems language focused on safety and performance',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 2,
        timeToMarket: 2,
        strengths: [
          'Memory safety without garbage collection',
          'Excellent performance matching C/C++',
          'Strong type system prevents many bugs',
          'Growing ecosystem for systems programming'
        ],
        weaknesses: [
          'Steep learning curve with ownership model',
          'Slower development initially',
          'Smaller ecosystem and community'
        ],
        bestFor: [
          'Systems programming and embedded systems',
          'Performance-critical applications',
          'WebAssembly and browser extensions'
        ]
      },
      {
        name: 'C++',
        description: 'Powerful language for performance-critical systems',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 2,
        timeToMarket: 2,
        strengths: [
          'Maximum performance and control',
          'Mature ecosystem with extensive libraries',
          'Industry standard for game development',
          'Direct hardware access'
        ],
        weaknesses: [
          'Complex syntax and manual memory management',
          'Prone to memory leaks and security issues',
          'Long compilation times for large projects'
        ],
        bestFor: [
          'Game development and graphics',
          'High-performance computing',
          'Operating systems and drivers'
        ]
      }
    ]
  },

  // CATEGORY 2: Backend Frameworks
  'backend-frameworks': {
    id: 'backend-frameworks',
    category: 'Backend Frameworks',
    title: 'Backend Framework Comparison',
    description: 'Compare frameworks for server-side development',
    icon: '⚙️',
    options: [
      {
        name: 'Node.js + Express',
        description: 'JavaScript runtime with minimalist framework',
        costEfficiency: 5,
        scalability: 4,
        easeOfUse: 4,
        timeToMarket: 5,
        strengths: [
          'Same language as frontend (JavaScript)',
          'Huge npm ecosystem with packages for everything',
          'Excellent for real-time applications',
          'Fast development with minimal boilerplate'
        ],
        weaknesses: [
          'Single-threaded limits CPU-intensive tasks',
          'Callback complexity without async/await',
          'Less opinionated structure than frameworks'
        ],
        bestFor: [
          'Real-time applications (chat, streaming)',
          'RESTful APIs and microservices',
          'Full-stack JavaScript teams'
        ]
      },
      {
        name: 'Django',
        description: 'Python framework with batteries included',
        costEfficiency: 5,
        scalability: 4,
        easeOfUse: 4,
        timeToMarket: 5,
        strengths: [
          'Batteries included: ORM, admin, auth built-in',
          'Excellent for rapid development and MVPs',
          'Strong security features by default',
          'Great documentation and community'
        ],
        weaknesses: [
          'Monolithic structure can feel rigid',
          'Slower than some alternatives',
          'Python GIL limits true concurrency'
        ],
        bestFor: [
          'Content-heavy web applications',
          'MVPs and rapid prototyping',
          'Projects needing admin interfaces'
        ]
      },
      {
        name: 'Spring Boot',
        description: 'Java framework for enterprise applications',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 2,
        timeToMarket: 3,
        strengths: [
          'Enterprise-grade and battle-tested',
          'Excellent for microservices architecture',
          'Strong typing with compile-time checks',
          'Robust ecosystem and tooling'
        ],
        weaknesses: [
          'Steep learning curve',
          'Verbose code and configuration',
          'Slower development compared to Node/Django'
        ],
        bestFor: [
          'Large enterprise applications',
          'Banking and financial systems',
          'Teams with Java expertise'
        ]
      },
      {
        name: 'FastAPI',
        description: 'Modern Python framework for APIs',
        costEfficiency: 5,
        scalability: 4,
        easeOfUse: 5,
        timeToMarket: 5,
        strengths: [
          'Extremely fast performance',
          'Automatic API documentation',
          'Modern Python with type hints',
          'Easy to learn and use'
        ],
        weaknesses: [
          'Younger ecosystem than Django',
          'Less built-in features (more focused)',
          'Smaller community compared to Django'
        ],
        bestFor: [
          'Modern REST and GraphQL APIs',
          'Machine learning model serving',
          'Microservices with Python'
        ]
      },
      {
        name: 'Laravel',
        description: 'PHP framework for web artisans',
        costEfficiency: 5,
        scalability: 3,
        easeOfUse: 4,
        timeToMarket: 5,
        strengths: [
          'Elegant syntax and developer experience',
          'Comprehensive ecosystem (Forge, Vapor)',
          'Excellent documentation',
          'Great for traditional web apps'
        ],
        weaknesses: [
          'PHP has perception issues',
          'Not ideal for real-time applications',
          'Scaling can be challenging'
        ],
        bestFor: [
          'Traditional web applications',
          'E-commerce platforms',
          'Content management systems'
        ]
      }
    ]
  }
};

module.exports = categories;


// CATEGORY 3: Frontend Frameworks
categories['frontend-frameworks'] = {
  id: 'frontend-frameworks',
  category: 'Frontend Frameworks',
  title: 'Frontend Framework Comparison',
  description: 'Compare frameworks for building user interfaces',
  icon: '🎨',
  options: [
    {
      name: 'React',
      description: 'Component-based library by Facebook',
      costEfficiency: 5,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 4,
      strengths: [
        'Huge ecosystem and community support',
        'Excellent performance with Virtual DOM',
        'Great developer tools and debugging',
        'Industry standard with high demand'
      ],
      weaknesses: [
        'Steep learning curve with JSX and hooks',
        'Requires additional libraries for routing/state',
        'Fast-changing ecosystem can be overwhelming'
      ],
      bestFor: [
        'Large-scale applications',
        'Teams with React experience',
        'Projects needing extensive third-party libraries'
      ]
    },
    {
      name: 'Vue.js',
      description: 'Progressive framework for building UIs',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Gentle learning curve with clear documentation',
        'Excellent performance',
        'Progressive adoption (use as much as needed)',
        'Great for both small and medium projects'
      ],
      weaknesses: [
        'Smaller ecosystem than React',
        'Less job market demand',
        'Fewer large-scale production examples'
      ],
      bestFor: [
        'Small to medium projects',
        'Teams new to modern frameworks',
        'Rapid prototyping and MVPs'
      ]
    },
    {
      name: 'Angular',
      description: 'Full-featured framework by Google',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 2,
      timeToMarket: 3,
      strengths: [
        'Complete solution with everything built-in',
        'Strong typing with TypeScript',
        'Excellent for large enterprise applications',
        'Opinionated structure enforces best practices'
      ],
      weaknesses: [
        'Steep learning curve',
        'Verbose and complex for simple projects',
        'Larger bundle sizes'
      ],
      bestFor: [
        'Large enterprise applications',
        'Teams preferring opinionated structure',
        'Projects requiring comprehensive features'
      ]
    },
    {
      name: 'Svelte',
      description: 'Compile-time framework with no virtual DOM',
      costEfficiency: 5,
      scalability: 3,
      easeOfUse: 4,
      timeToMarket: 4,
      strengths: [
        'Excellent performance with small bundles',
        'Simple, intuitive syntax',
        'No runtime overhead',
        'Less boilerplate code'
      ],
      weaknesses: [
        'Smaller community and ecosystem',
        'Fewer learning resources',
        'Limited third-party component libraries'
      ],
      bestFor: [
        'Performance-critical applications',
        'Small to medium projects',
        'Developers preferring simple syntax'
      ]
    }
  ]
};

// CATEGORY 4: Databases
categories['databases'] = {
  id: 'databases',
  category: 'Databases',
  title: 'Database Comparison',
  description: 'Compare databases for data storage',
  icon: '🗄️',
  options: [
    {
      name: 'MongoDB',
      description: 'NoSQL document database',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Flexible schema allows rapid iteration',
        'Easy to get started with JSON-like documents',
        'Horizontal scaling built-in',
        'Great for evolving data models'
      ],
      weaknesses: [
        'No ACID transactions across documents (older versions)',
        'Can lead to data inconsistency if not careful',
        'Not ideal for complex relational data'
      ],
      bestFor: [
        'Rapid prototyping and MVPs',
        'Applications with evolving schemas',
        'Document-heavy applications'
      ]
    },
    {
      name: 'PostgreSQL',
      description: 'Advanced open-source relational database',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 3,
      timeToMarket: 4,
      strengths: [
        'ACID compliant with strong data integrity',
        'Advanced features (JSON, full-text search, GIS)',
        'Excellent for complex queries',
        'Strong community and reliability'
      ],
      weaknesses: [
        'Requires upfront schema planning',
        'Vertical scaling limits',
        'More complex setup than NoSQL'
      ],
      bestFor: [
        'Applications requiring data integrity',
        'Complex relational data models',
        'Financial and transactional systems'
      ]
    },
    {
      name: 'MySQL',
      description: 'Popular open-source relational database',
      costEfficiency: 5,
      scalability: 3,
      easeOfUse: 4,
      timeToMarket: 4,
      strengths: [
        'Widely adopted with proven track record',
        'Easy to learn and use',
        'Excellent hosting support everywhere',
        'Fast for read-heavy workloads'
      ],
      weaknesses: [
        'Less advanced features than PostgreSQL',
        'Scaling can be challenging',
        'Some limitations with complex queries'
      ],
      bestFor: [
        'Web applications and CMSs',
        'Read-heavy applications',
        'Teams familiar with MySQL'
      ]
    },
    {
      name: 'Firebase',
      description: 'Real-time NoSQL cloud database by Google',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Real-time synchronization out of the box',
        'Managed service (no server maintenance)',
        'Excellent for mobile and web apps',
        'Built-in authentication and hosting'
      ],
      weaknesses: [
        'Vendor lock-in with Google',
        'Limited query capabilities',
        'Can become expensive at scale'
      ],
      bestFor: [
        'Real-time applications',
        'Mobile app backends',
        'Rapid prototyping without backend'
      ]
    },
    {
      name: 'Redis',
      description: 'In-memory data structure store',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 4,
      timeToMarket: 4,
      strengths: [
        'Extremely fast (in-memory)',
        'Versatile data structures',
        'Great for caching and sessions',
        'Pub/sub messaging built-in'
      ],
      weaknesses: [
        'Limited by available RAM',
        'Not suitable as primary database',
        'Data persistence requires configuration'
      ],
      bestFor: [
        'Caching layers',
        'Session storage',
        'Real-time analytics and leaderboards'
      ]
    }
  ]
};

// CATEGORY 5: Cloud Providers
categories['cloud-providers'] = {
  id: 'cloud-providers',
  category: 'Cloud Providers',
  title: 'Cloud Platform Comparison',
  description: 'Compare cloud infrastructure providers',
  icon: '☁️',
  options: [
    {
      name: 'AWS',
      description: 'Amazon Web Services - comprehensive cloud platform',
      costEfficiency: 3,
      scalability: 5,
      easeOfUse: 2,
      timeToMarket: 3,
      strengths: [
        'Largest service ecosystem (200+ services)',
        'Extensive documentation and training',
        'Global infrastructure (30+ regions)',
        'Enterprise-grade security and compliance'
      ],
      weaknesses: [
        'Complex pricing model',
        'Steep learning curve for beginners',
        'Can become expensive without optimization'
      ],
      bestFor: [
        'Large-scale enterprise applications',
        'Complex multi-service architectures',
        'Organizations requiring compliance'
      ]
    },
    {
      name: 'Google Cloud',
      description: 'Google Cloud Platform - AI/ML focused',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 4,
      strengths: [
        'Best-in-class AI/ML and data analytics',
        'Competitive pricing with sustained discounts',
        'Strong Kubernetes and container support',
        'Excellent BigQuery for data warehousing'
      ],
      weaknesses: [
        'Smaller service ecosystem than AWS',
        'Less enterprise adoption',
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
      strengths: [
        'Seamless Microsoft ecosystem integration',
        'Strong hybrid cloud capabilities',
        'Excellent enterprise support',
        'Active Directory integration'
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
    },
    {
      name: 'DigitalOcean',
      description: 'Developer-friendly cloud platform',
      costEfficiency: 5,
      scalability: 3,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Simple, predictable pricing',
        'Excellent developer experience',
        'Great documentation and tutorials',
        'Fast deployment'
      ],
      weaknesses: [
        'Limited advanced services',
        'Fewer global locations',
        'Not suitable for enterprise scale'
      ],
      bestFor: [
        'Small to medium applications',
        'Developer projects and startups',
        'Simple infrastructure needs'
      ]
    }
  ]
};


// CATEGORY 6: DevOps & Deployment
categories['devops-deployment'] = {
  id: 'devops-deployment',
  category: 'DevOps & Deployment',
  title: 'Deployment Strategy Comparison',
  description: 'Compare deployment and infrastructure approaches',
  icon: '🚀',
  options: [
    {
      name: 'Docker Containers',
      description: 'Containerization for consistent environments',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 4,
      timeToMarket: 4,
      strengths: [
        'Consistent environments across dev/prod',
        'Easy to version and rollback',
        'Efficient resource utilization',
        'Large ecosystem of pre-built images'
      ],
      weaknesses: [
        'Learning curve for Docker concepts',
        'Requires orchestration for production',
        'Networking can be complex'
      ],
      bestFor: [
        'Microservices architectures',
        'Development environment consistency',
        'CI/CD pipelines'
      ]
    },
    {
      name: 'Kubernetes',
      description: 'Container orchestration at scale',
      costEfficiency: 3,
      scalability: 5,
      easeOfUse: 2,
      timeToMarket: 2,
      strengths: [
        'Industry standard for container orchestration',
        'Excellent for large-scale deployments',
        'Self-healing and auto-scaling',
        'Cloud-agnostic portability'
      ],
      weaknesses: [
        'Steep learning curve',
        'Complex setup and maintenance',
        'Overkill for small applications'
      ],
      bestFor: [
        'Large-scale microservices',
        'Multi-cloud deployments',
        'Teams with DevOps expertise'
      ]
    },
    {
      name: 'Serverless',
      description: 'Function-as-a-Service deployment',
      costEfficiency: 5,
      scalability: 5,
      easeOfUse: 4,
      timeToMarket: 5,
      strengths: [
        'Pay only for actual usage',
        'Auto-scaling built-in',
        'No server management',
        'Fast deployment'
      ],
      weaknesses: [
        'Cold start latency',
        'Vendor lock-in',
        'Limited execution time'
      ],
      bestFor: [
        'Event-driven applications',
        'APIs with variable traffic',
        'Cost-sensitive projects'
      ]
    },
    {
      name: 'Traditional VMs',
      description: 'Virtual machine-based deployment',
      costEfficiency: 3,
      scalability: 3,
      easeOfUse: 5,
      timeToMarket: 4,
      strengths: [
        'Full control over environment',
        'Well-understood technology',
        'Works with legacy applications',
        'Simple mental model'
      ],
      weaknesses: [
        'Less efficient resource usage',
        'Manual scaling required',
        'Slower deployment than containers'
      ],
      bestFor: [
        'Legacy applications',
        'Teams familiar with VMs',
        'Applications requiring full OS control'
      ]
    }
  ]
};

// CATEGORY 7: API Architectures
categories['api-architectures'] = {
  id: 'api-architectures',
  category: 'API Architectures',
  title: 'API Architecture Comparison',
  description: 'Compare API design approaches',
  icon: '🔌',
  options: [
    {
      name: 'REST',
      description: 'RESTful APIs with HTTP methods',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Simple and well-understood',
        'Works with any HTTP client',
        'Cacheable by default',
        'Stateless and scalable'
      ],
      weaknesses: [
        'Over-fetching or under-fetching data',
        'Multiple requests for related data',
        'Versioning can be challenging'
      ],
      bestFor: [
        'Public APIs',
        'CRUD operations',
        'Teams familiar with HTTP'
      ]
    },
    {
      name: 'GraphQL',
      description: 'Query language for APIs',
      costEfficiency: 4,
      scalability: 4,
      easeOfUse: 3,
      timeToMarket: 4,
      strengths: [
        'Fetch exactly what you need',
        'Single endpoint for all queries',
        'Strong typing with schema',
        'Great developer experience'
      ],
      weaknesses: [
        'Learning curve for query language',
        'Caching is more complex',
        'Can be overkill for simple APIs'
      ],
      bestFor: [
        'Complex data requirements',
        'Mobile applications',
        'Rapidly evolving frontends'
      ]
    },
    {
      name: 'gRPC',
      description: 'High-performance RPC framework',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 3,
      strengths: [
        'Excellent performance with Protocol Buffers',
        'Bi-directional streaming',
        'Strong typing with .proto files',
        'Great for microservices'
      ],
      weaknesses: [
        'Not browser-friendly (needs proxy)',
        'Steeper learning curve',
        'Less human-readable than JSON'
      ],
      bestFor: [
        'Microservice communication',
        'High-performance requirements',
        'Internal APIs'
      ]
    }
  ]
};

// CATEGORY 8: Authentication Methods
categories['authentication'] = {
  id: 'authentication',
  category: 'Authentication Methods',
  title: 'Authentication Strategy Comparison',
  description: 'Compare user authentication approaches',
  icon: '🔐',
  options: [
    {
      name: 'JWT Tokens',
      description: 'JSON Web Tokens for stateless auth',
      costEfficiency: 5,
      scalability: 5,
      easeOfUse: 4,
      timeToMarket: 4,
      strengths: [
        'Stateless and scalable',
        'Works across domains',
        'Self-contained with claims',
        'No server-side session storage'
      ],
      weaknesses: [
        'Cannot revoke tokens easily',
        'Token size can be large',
        'Requires secure storage on client'
      ],
      bestFor: [
        'Microservices architectures',
        'Mobile applications',
        'Distributed systems'
      ]
    },
    {
      name: 'OAuth 2.0',
      description: 'Delegated authorization framework',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 3,
      strengths: [
        'Industry standard for authorization',
        'Secure delegated access',
        'Works with third-party providers',
        'Flexible grant types'
      ],
      weaknesses: [
        'Complex to implement correctly',
        'Multiple flows to understand',
        'Requires HTTPS'
      ],
      bestFor: [
        'Third-party integrations',
        'Social login',
        'API authorization'
      ]
    },
    {
      name: 'Session-based',
      description: 'Traditional server-side sessions',
      costEfficiency: 5,
      scalability: 3,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Simple to implement',
        'Easy to revoke sessions',
        'Server has full control',
        'Well-understood pattern'
      ],
      weaknesses: [
        'Requires server-side storage',
        'Scaling requires sticky sessions',
        'Not ideal for mobile apps'
      ],
      bestFor: [
        'Traditional web applications',
        'Monolithic architectures',
        'Simple authentication needs'
      ]
    },
    {
      name: 'Third-party Auth',
      description: 'Auth0, Firebase Auth, Clerk',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Quick to implement',
        'Security handled by experts',
        'Multiple providers supported',
        'Built-in UI components'
      ],
      weaknesses: [
        'Vendor lock-in',
        'Ongoing costs',
        'Less control over flow'
      ],
      bestFor: [
        'Rapid prototyping',
        'Startups without security expertise',
        'Projects needing social login'
      ]
    }
  ]
};

// CATEGORY 9: Learning Paths
categories['learning-paths'] = {
  id: 'learning-paths',
  category: 'Learning Paths',
  title: 'Learning Path Comparison',
  description: 'Compare approaches to learning tech skills',
  icon: '📚',
  options: [
    {
      name: 'DSA-focused',
      description: 'Data Structures & Algorithms emphasis',
      costEfficiency: 5,
      scalability: 4,
      easeOfUse: 3,
      timeToMarket: 3,
      strengths: [
        'Strong foundation for interviews',
        'Improves problem-solving skills',
        'Essential for top tech companies',
        'Transferable across languages'
      ],
      weaknesses: [
        'Takes time to master',
        'May not directly apply to daily work',
        'Can feel abstract initially'
      ],
      bestFor: [
        'Preparing for FAANG interviews',
        'Computer science students',
        'Long-term career investment'
      ]
    },
    {
      name: 'Full-stack Development',
      description: 'End-to-end web development skills',
      costEfficiency: 5,
      scalability: 5,
      easeOfUse: 4,
      timeToMarket: 5,
      strengths: [
        'Immediately applicable skills',
        'Build complete projects',
        'High market demand',
        'Versatile career options'
      ],
      weaknesses: [
        'Broad but not deep initially',
        'Constantly evolving technologies',
        'Can feel overwhelming'
      ],
      bestFor: [
        'Career switchers',
        'Freelancers and entrepreneurs',
        'Building your own products'
      ]
    },
    {
      name: 'AI/ML Specialization',
      description: 'Machine learning and AI focus',
      costEfficiency: 4,
      scalability: 5,
      easeOfUse: 2,
      timeToMarket: 3,
      strengths: [
        'High-growth field',
        'Cutting-edge technology',
        'High salary potential',
        'Intellectually stimulating'
      ],
      weaknesses: [
        'Requires strong math background',
        'Steep learning curve',
        'Needs powerful hardware'
      ],
      bestFor: [
        'Those with math/stats background',
        'Research-oriented careers',
        'Data science roles'
      ]
    },
    {
      name: 'DevOps Engineering',
      description: 'Infrastructure and automation focus',
      costEfficiency: 5,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 4,
      strengths: [
        'High demand in industry',
        'Good work-life balance',
        'Combines development and operations',
        'Critical for modern companies'
      ],
      weaknesses: [
        'Broad range of tools to learn',
        'On-call responsibilities',
        'Less visible impact than features'
      ],
      bestFor: [
        'Those who enjoy automation',
        'System-thinking individuals',
        'Stable career path'
      ]
    }
  ]
};

// CATEGORY 10: Career Choices
categories['career-choices'] = {
  id: 'career-choices',
  category: 'Career Choices',
  title: 'Career Path Comparison',
  description: 'Compare different career directions',
  icon: '💼',
  options: [
    {
      name: 'Startup',
      description: 'Join an early-stage startup',
      costEfficiency: 3,
      scalability: 5,
      easeOfUse: 3,
      timeToMarket: 5,
      strengths: [
        'High growth potential with equity',
        'Wear multiple hats and learn fast',
        'Direct impact on product',
        'Exciting and dynamic environment'
      ],
      weaknesses: [
        'Higher risk and uncertainty',
        'Lower initial salary',
        'Long hours and high pressure',
        'Equity may not materialize'
      ],
      bestFor: [
        'Risk-tolerant individuals',
        'Those seeking rapid growth',
        'Entrepreneurial mindset'
      ]
    },
    {
      name: 'Corporate Job',
      description: 'Work at established company',
      costEfficiency: 5,
      scalability: 3,
      easeOfUse: 5,
      timeToMarket: 5,
      strengths: [
        'Stable salary and benefits',
        'Structured career progression',
        'Work-life balance',
        'Learning from experienced teams'
      ],
      weaknesses: [
        'Slower growth and bureaucracy',
        'Less ownership and impact',
        'Can feel repetitive',
        'Limited equity upside'
      ],
      bestFor: [
        'Those valuing stability',
        'Family-oriented individuals',
        'Learning from established systems'
      ]
    },
    {
      name: 'Higher Studies',
      description: 'Pursue Masters or PhD',
      costEfficiency: 2,
      scalability: 4,
      easeOfUse: 3,
      timeToMarket: 2,
      strengths: [
        'Deep expertise in specific area',
        'Research and academic opportunities',
        'Potential for higher long-term earnings',
        'Network with academics and researchers'
      ],
      weaknesses: [
        'Significant time and money investment',
        'Delayed earnings',
        'May not directly apply to industry',
        'Opportunity cost of work experience'
      ],
      bestFor: [
        'Research-oriented careers',
        'Those passionate about specific topics',
        'Academic career aspirations'
      ]
    },
    {
      name: 'Freelancing',
      description: 'Independent contractor work',
      costEfficiency: 4,
      scalability: 4,
      easeOfUse: 3,
      timeToMarket: 5,
      strengths: [
        'Flexibility and autonomy',
        'Choose your projects and clients',
        'Potential for higher hourly rates',
        'Work from anywhere'
      ],
      weaknesses: [
        'Inconsistent income',
        'No benefits or job security',
        'Must handle business operations',
        'Client acquisition challenges'
      ],
      bestFor: [
        'Self-motivated individuals',
        'Those valuing flexibility',
        'Experienced professionals'
      ]
    }
  ]
};