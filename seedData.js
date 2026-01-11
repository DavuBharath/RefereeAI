const mongoose = require('mongoose');
const ComparisonTemplate = require('./models/ComparisonTemplate');
require('dotenv').config();

const seedTemplates = [
  {
    category: 'Cloud Services',
    title: 'Cloud Platform for Startups',
    description: 'Compare major cloud providers for startup and small business needs',
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
          'Largest service ecosystem',
          'Excellent documentation',
          'Global infrastructure',
          'Enterprise-grade security'
        ],
        weaknesses: [
          'Complex pricing model',
          'Steep learning curve',
          'Can be expensive for small workloads'
        ],
        bestFor: [
          'Large-scale applications',
          'Enterprise customers',
          'Complex architectures'
        ],
        notIdealFor: [
          'Simple websites',
          'Beginners to cloud',
          'Very tight budgets'
        ]
      },
      {
        name: 'Google Cloud Platform',
        description: 'Google Cloud Platform - AI/ML focused cloud services',
        costEfficiency: 4,
        scalability: 5,
        easeOfUse: 3,
        timeToMarket: 4,
        communitySupport: 4,
        strengths: [
          'Best-in-class AI/ML services',
          'Competitive pricing',
          'Strong data analytics',
          'Kubernetes native'
        ],
        weaknesses: [
          'Smaller service ecosystem than AWS',
          'Less enterprise adoption',
          'Fewer global regions'
        ],
        bestFor: [
          'Data-heavy applications',
          'AI/ML projects',
          'Modern containerized apps'
        ],
        notIdealFor: [
          'Legacy enterprise systems',
          'Windows-heavy environments',
          'Regulatory compliance needs'
        ]
      },
      {
        name: 'Digital Ocean',
        description: 'Digital Ocean - developer-friendly cloud platform',
        costEfficiency: 5,
        scalability: 3,
        easeOfUse: 5,
        timeToMarket: 5,
        communitySupport: 4,
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
          'Developer projects',
          'Startups with simple needs'
        ],
        notIdealFor: [
          'Enterprise applications',
          'Complex compliance requirements',
          'Global scale applications'
        ]
      }
    ]
  },
  {
    category: 'Frontend Frameworks',
    title: 'Frontend Framework for Web Apps',
    description: 'Compare popular frontend frameworks for web application development',
    options: [
      {
        name: 'React',
        description: 'Facebook\'s component-based UI library',
        costEfficiency: 5,
        scalability: 5,
        easeOfUse: 3,
        timeToMarket: 4,
        communitySupport: 5,
        strengths: [
          'Huge ecosystem and community',
          'Excellent performance with Virtual DOM',
          'Great developer tools',
          'Industry standard'
        ],
        weaknesses: [
          'Steep learning curve',
          'Requires additional libraries for full functionality',
          'Fast-changing ecosystem'
        ],
        bestFor: [
          'Large applications',
          'Teams with React experience',
          'Projects needing extensive third-party libraries'
        ],
        notIdealFor: [
          'Simple static sites',
          'Beginner developers',
          'Quick prototypes'
        ]
      },
      {
        name: 'Vue.js',
        description: 'Progressive framework for building user interfaces',
        costEfficiency: 5,
        scalability: 4,
        easeOfUse: 5,
        timeToMarket: 5,
        communitySupport: 4,
        strengths: [
          'Gentle learning curve',
          'Excellent documentation',
          'Great performance',
          'Progressive adoption'
        ],
        weaknesses: [
          'Smaller ecosystem than React',
          'Less job market demand',
          'Fewer large-scale examples'
        ],
        bestFor: [
          'Small to medium projects',
          'Teams new to modern frameworks',
          'Rapid prototyping'
        ],
        notIdealFor: [
          'Very large enterprise applications',
          'Teams requiring extensive third-party integrations'
        ]
      },
      {
        name: 'Svelte',
        description: 'Compile-time framework with no virtual DOM',
        costEfficiency: 5,
        scalability: 3,
        easeOfUse: 4,
        timeToMarket: 4,
        communitySupport: 3,
        strengths: [
          'Excellent performance',
          'Small bundle sizes',
          'Simple, intuitive syntax',
          'No runtime overhead'
        ],
        weaknesses: [
          'Smaller community',
          'Fewer learning resources',
          'Limited ecosystem',
          'Less mature tooling'
        ],
        bestFor: [
          'Performance-critical applications',
          'Small to medium projects',
          'Developers who like simple syntax'
        ],
        notIdealFor: [
          'Large enterprise applications',
          'Teams needing extensive third-party libraries',
          'Projects requiring mature ecosystem'
        ]
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-referee');
    
    // Clear existing templates
    await ComparisonTemplate.deleteMany({});
    
    // Insert seed data
    await ComparisonTemplate.insertMany(seedTemplates);
    
    console.log('Database seeded successfully!');
    console.log(`Inserted ${seedTemplates.length} comparison templates`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedTemplates };