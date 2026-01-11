/**
 * RefereeAI - Decision Engine
 * Compares AWS vs GCP based on user constraints
 * Returns scores, trade-offs, and balanced recommendations
 */

// Option profiles with ratings (1-5 scale)
const OPTIONS = {
  AWS: {
    name: 'AWS',
    costEfficiency: 3,      // Moderate cost
    scalability: 5,         // Excellent scalability
    easeOfUse: 2,          // Complex for beginners
    timeToMarket: 3,       // Moderate setup time
    support: 5             // Best-in-class support
  },
  GCP: {
    name: 'GCP',
    costEfficiency: 4,      // Better pricing
    scalability: 5,         // Excellent scalability
    easeOfUse: 3,          // Moderate learning curve
    timeToMarket: 4,       // Faster deployment
    support: 4             // Good support
  }
};

/**
 * Calculate weighted scores based on user constraints
 */
function calculateScores(constraints) {
  const { budget, scale, expertise, timeToMarket } = constraints;
  
  // Initialize weights (all start at 1.0)
  const weights = {
    cost: 1.0,
    scalability: 1.0,
    easeOfUse: 1.0,
    timeToMarket: 1.0,
    support: 1.0
  };
  
  // Adjust weights based on budget
  if (budget === 'low') {
    weights.cost = 2.5;           // Cost becomes critical
  } else if (budget === 'high') {
    weights.cost = 0.5;           // Cost less important
    weights.scalability = 1.5;    // Focus on capabilities
  }
  
  // Adjust weights based on scale
  if (scale === 'enterprise') {
    weights.scalability = 2.0;    // Scalability critical
    weights.support = 1.8;        // Need strong support
  } else if (scale === 'small') {
    weights.easeOfUse = 1.8;      // Simplicity matters
    weights.cost = 1.5;           // Budget conscious
  }
  
  // Adjust weights based on expertise
  if (expertise === 'beginner') {
    weights.easeOfUse = 2.5;      // Ease of use critical
    weights.support = 2.0;        // Need good docs/support
  } else if (expertise === 'advanced') {
    weights.easeOfUse = 0.5;      // Can handle complexity
    weights.scalability = 1.5;    // Want advanced features
  }
  
  // Adjust weights based on time to market
  if (timeToMarket === 'fast') {
    weights.timeToMarket = 2.0;   // Speed is critical
    weights.easeOfUse = 1.5;      // Need quick setup
  }
  
  // Calculate weighted scores for each option
  const scores = {};
  
  for (const [key, option] of Object.entries(OPTIONS)) {
    const score = (
      option.costEfficiency * weights.cost +
      option.scalability * weights.scalability +
      option.easeOfUse * weights.easeOfUse +
      option.timeToMarket * weights.timeToMarket +
      option.support * weights.support
    ) / 5; // Normalize to 0-5 scale
    
    scores[key] = Math.round(score * 10) / 10; // Round to 1 decimal
  }
  
  return scores;
}

/**
 * Identify trade-offs between AWS and GCP
 */
function identifyTradeoffs() {
  const tradeoffs = [];
  
  // Cost trade-off
  tradeoffs.push(
    "💰 Cost: GCP offers more competitive pricing, but AWS has more cost optimization tools"
  );
  
  // Ease of use trade-off
  tradeoffs.push(
    "🎯 Learning Curve: GCP is slightly easier to start with, but AWS has more learning resources"
  );
  
  // Ecosystem trade-off
  tradeoffs.push(
    "🔧 Services: AWS has the largest service catalog, but GCP excels in data/AI services"
  );
  
  // Time to market trade-off
  tradeoffs.push(
    "⚡ Speed: GCP can be faster to deploy, but AWS has more pre-built solutions"
  );
  
  return tradeoffs;
}

/**
 * Generate balanced recommendation (no absolute winner)
 */
function generateRecommendation(scores, constraints) {
  const awsScore = scores.AWS;
  const gcpScore = scores.GCP;
  const diff = Math.abs(awsScore - gcpScore);
  
  let recommendation = "";
  
  // Close scores - emphasize it's a tough choice
  if (diff < 0.5) {
    recommendation = `Both AWS (${awsScore}) and GCP (${gcpScore}) are excellent choices for your needs. The decision comes down to specific priorities:\n\n`;
    recommendation += `• Choose AWS if: You need the broadest service ecosystem and enterprise-grade support\n`;
    recommendation += `• Choose GCP if: You prioritize cost efficiency and modern cloud-native tools\n`;
  }
  // AWS scores higher
  else if (awsScore > gcpScore) {
    recommendation = `AWS scores slightly higher (${awsScore} vs ${gcpScore}) for your constraints, but consider:\n\n`;
    recommendation += `• AWS Strengths: Mature ecosystem, extensive services, strong enterprise support\n`;
    recommendation += `• GCP Alternative: Better pricing, excellent for data/AI workloads, simpler interface\n\n`;
    recommendation += `If ${constraints.budget === 'low' ? 'budget' : constraints.expertise === 'beginner' ? 'ease of use' : 'advanced features'} is your top priority, AWS aligns well. However, GCP remains competitive.`;
  }
  // GCP scores higher
  else {
    recommendation = `GCP scores slightly higher (${gcpScore} vs ${awsScore}) for your constraints, but consider:\n\n`;
    recommendation += `• GCP Strengths: Competitive pricing, modern tools, great for data/AI, faster deployment\n`;
    recommendation += `• AWS Alternative: Largest ecosystem, more third-party integrations, proven at scale\n\n`;
    recommendation += `If ${constraints.budget === 'low' ? 'cost savings' : constraints.timeToMarket === 'fast' ? 'quick deployment' : 'innovation'} matters most, GCP is strong. But AWS offers unmatched breadth.`;
  }
  
  return recommendation;
}

/**
 * Main comparison function
 */
function compare(constraints) {
  // Validate constraints
  const required = ['budget', 'scale', 'expertise', 'timeToMarket'];
  for (const field of required) {
    if (!constraints[field]) {
      throw new Error(`Missing required constraint: ${field}`);
    }
  }
  
  // Calculate scores
  const scores = calculateScores(constraints);
  
  // Identify trade-offs
  const tradeoffs = identifyTradeoffs();
  
  // Generate recommendation
  const recommendation = generateRecommendation(scores, constraints);
  
  // Return complete analysis
  return {
    scores,
    tradeoffs,
    recommendation,
    constraints,
    timestamp: new Date().toISOString()
  };
}

// Export for use in Express app
module.exports = { compare };

// Demo usage (uncomment to test standalone)
/*
const result = compare({
  budget: 'low',
  scale: 'small',
  expertise: 'beginner',
  timeToMarket: 'fast'
});

console.log('=== RefereeAI Demo ===\n');
console.log('Scores:', result.scores);
console.log('\nTrade-offs:');
result.tradeoffs.forEach(t => console.log('  -', t));
console.log('\nRecommendation:');
console.log(result.recommendation);
*/