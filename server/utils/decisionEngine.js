/**
 * RefereeAI - Decision Engine
 * 
 * PURPOSE:
 * This engine helps users choose between technical options by:
 * 1. Scoring each option based on user constraints
 * 2. Detecting trade-offs between options
 * 3. Generating balanced recommendations (never declaring a single "best")
 * 
 * DESIGN PHILOSOPHY:
 * - Transparent: Every calculation is explainable
 * - Educational: Teaches users HOW to decide
 * - Balanced: No single winner, just trade-offs
 */

class DecisionEngine {
  
  /**
   * STEP 1: Calculate Constraint-Based Weights
   * 
   * Each constraint adjusts the importance of different criteria.
   * Example: Low budget → cost weight increases from 1.0 to 2.5
   * 
   * @param {Object} constraints - User's specific situation
   * @returns {Object} weights - Adjusted importance multipliers
   */
  static calculateWeights(constraints) {
    // Start with neutral weights (everything equally important)
    const weights = {
      budgetSuitability: 1.0,
      scalability: 1.0,
      learningCurve: 1.0,
      setupSpeed: 1.0
    };
    
    // BUDGET CONSTRAINT
    // Low budget → cost becomes critical (2.5x more important)
    // High budget → cost less important, focus on capabilities
    if (constraints.budget === 'low') {
      weights.budgetSuitability = 2.5;
      weights.setupSpeed = 1.3; // Also want quick, cheap setup
    } else if (constraints.budget === 'high') {
      weights.budgetSuitability = 0.5; // Cost doesn't matter much
      weights.scalability = 1.5; // Can afford to scale
    }
    
    // SCALE CONSTRAINT
    // Small scale → simplicity matters
    // Enterprise → scalability critical
    if (constraints.scale === 'small') {
      weights.learningCurve = 1.8; // Need easy to use
      weights.budgetSuitability = 1.5; // Budget conscious
    } else if (constraints.scale === 'growing') {
      weights.scalability = 1.5; // Need room to grow
    } else if (constraints.scale === 'enterprise') {
      weights.scalability = 2.5; // Scalability is critical
      weights.learningCurve = 0.7; // Can handle complexity
    }
    
    // EXPERTISE CONSTRAINT
    // Beginner → ease of use critical
    // Advanced → can handle complexity
    if (constraints.expertise === 'beginner') {
      weights.learningCurve = 2.5; // Must be easy to learn
      weights.setupSpeed = 1.8; // Need quick wins
    } else if (constraints.expertise === 'intermediate') {
      weights.learningCurve = 1.2; // Moderate importance
    } else if (constraints.expertise === 'advanced') {
      weights.learningCurve = 0.5; // Can handle complexity
      weights.scalability = 1.5; // Want advanced features
    }
    
    // TIME TO MARKET CONSTRAINT
    // Fast → speed is everything
    // Flexible → can take time for better solution
    if (constraints.timeToMarket === 'fast') {
      weights.setupSpeed = 2.5; // Speed critical
      weights.learningCurve = 1.8; // Need easy setup
    } else if (constraints.timeToMarket === 'flexible') {
      weights.scalability = 1.3; // Can invest in better architecture
    }
    
    return weights;
  }
  
  /**
   * STEP 2: Calculate Weighted Scores
   * 
   * Each option has capability scores (1-5 scale).
   * We multiply by weights and normalize to get final score.
   * 
   * Formula: 
   * score = (capability1 × weight1 + capability2 × weight2 + ...) / sum(weights)
   * 
   * @param {Array} options - Options to compare
   * @param {Object} weights - Importance multipliers
   * @returns {Object} scores - Final scores per option
   */
  static calculateScores(options, weights) {
    const scores = {};
    
    options.forEach(option => {
      // Weighted sum of all capabilities
      const weightedSum = (
        option.costEfficiency * weights.budgetSuitability +
        option.scalability * weights.scalability +
        option.easeOfUse * weights.learningCurve +
        option.timeToMarket * weights.setupSpeed
      );
      
      // Calculate sum of weights for normalization
      const weightSum = (
        weights.budgetSuitability +
        weights.scalability +
        weights.learningCurve +
        weights.setupSpeed
      );
      
      // Normalize to 0-5 scale
      const normalizedScore = weightedSum / weightSum;
      
      // Round to 1 decimal place for readability
      scores[option.name] = Math.round(normalizedScore * 10) / 10;
    });
    
    return scores;
  }
  
  /**
   * STEP 3: Extract Pros & Cons
   * 
   * Simply return the strengths and weaknesses from option profiles.
   * This makes results transparent and educational.
   * 
   * @param {Array} options - Options being compared
   * @returns {Object} prosAndCons - Structured pros/cons per option
   */
  static extractProsAndCons(options) {
    const prosAndCons = {};
    
    options.forEach(option => {
      prosAndCons[option.name] = {
        pros: option.strengths || [],
        cons: option.weaknesses || [],
        bestFor: option.bestFor || []
      };
    });
    
    return prosAndCons;
  }
  
  /**
   * STEP 4: Detect Trade-offs
   * 
   * Compare options pairwise to find significant differences.
   * A difference of 2+ points (on 1-5 scale) is "significant".
   * 
   * Trade-off types:
   * - Cost vs Scalability
   * - Simplicity vs Flexibility
   * - Speed vs Long-term Growth
   * 
   * @param {Array} options - Options being compared
   * @returns {Array} tradeoffs - Human-readable trade-off explanations
   */
  static detectTradeoffs(options) {
    const tradeoffs = [];
    
    // Compare each pair of options
    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length; j++) {
        const opt1 = options[i];
        const opt2 = options[j];
        
        // TRADE-OFF 1: Cost vs Scalability
        // If one is cheaper but less scalable
        const costDiff = opt1.costEfficiency - opt2.costEfficiency;
        const scaleDiff = opt1.scalability - opt2.scalability;
        
        if (Math.abs(costDiff) >= 2 && costDiff * scaleDiff < 0) {
          // They trade off (one cheaper, other more scalable)
          const cheaper = costDiff > 0 ? opt1.name : opt2.name;
          const scalable = scaleDiff > 0 ? opt1.name : opt2.name;
          tradeoffs.push(
            `💰 Cost vs Scale: ${cheaper} is more budget-friendly, but ${scalable} scales better for growth`
          );
        }
        
        // TRADE-OFF 2: Simplicity vs Flexibility
        // If one is easier but less powerful
        const easeDiff = opt1.easeOfUse - opt2.easeOfUse;
        const powerDiff = opt1.scalability - opt2.scalability;
        
        if (Math.abs(easeDiff) >= 2 && easeDiff * powerDiff < 0) {
          const simpler = easeDiff > 0 ? opt1.name : opt2.name;
          const powerful = powerDiff > 0 ? opt1.name : opt2.name;
          tradeoffs.push(
            `🎯 Simplicity vs Power: ${simpler} is easier to learn, but ${powerful} offers more advanced capabilities`
          );
        }
        
        // TRADE-OFF 3: Speed vs Long-term
        // If one is faster to set up but less scalable
        const speedDiff = opt1.timeToMarket - opt2.timeToMarket;
        const longTermDiff = opt1.scalability - opt2.scalability;
        
        if (Math.abs(speedDiff) >= 2 && speedDiff * longTermDiff < 0) {
          const faster = speedDiff > 0 ? opt1.name : opt2.name;
          const longTerm = longTermDiff > 0 ? opt1.name : opt2.name;
          tradeoffs.push(
            `⚡ Speed vs Growth: ${faster} gets you started faster, but ${longTerm} is better for long-term growth`
          );
        }
      }
    }
    
    // If no specific trade-offs detected, add general ones
    if (tradeoffs.length === 0) {
      tradeoffs.push(
        '⚖️ Both options have similar trade-off profiles. Your choice depends on specific team preferences and existing infrastructure.'
      );
    }
    
    return tradeoffs;
  }
  
  /**
   * STEP 5: Generate Balanced Recommendation
   * 
   * CRITICAL RULE: Never declare a single "best" option.
   * Always use conditional language: "If X, choose A. If Y, choose B."
   * 
   * @param {Array} options - Options being compared
   * @param {Object} scores - Calculated scores
   * @param {Object} constraints - User constraints
   * @returns {String} recommendation - Balanced recommendation text
   */
  static generateRecommendation(options, scores, constraints) {
    // Sort options by score
    const sortedOptions = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name);
    
    const topOption = sortedOptions[0];
    const secondOption = sortedOptions[1];
    const topScore = scores[topOption];
    const secondScore = scores[secondOption];
    const scoreDiff = topScore - secondScore;
    
    let recommendation = '';
    
    // CASE 1: Very close scores (< 0.5 difference)
    // Both are equally good, explain when to choose each
    if (scoreDiff < 0.5) {
      recommendation = `Both ${topOption} (${topScore}) and ${secondOption} (${secondScore}) are excellent choices for your needs. The decision comes down to specific priorities:\n\n`;
      
      // Find the top option's data
      const topData = options.find(opt => opt.name === topOption);
      const secondData = options.find(opt => opt.name === secondOption);
      
      // Compare key capabilities
      if (topData.costEfficiency > secondData.costEfficiency) {
        recommendation += `• Choose ${topOption} if: Budget is your top concern\n`;
      } else {
        recommendation += `• Choose ${secondOption} if: Budget is your top concern\n`;
      }
      
      if (topData.scalability > secondData.scalability) {
        recommendation += `• Choose ${topOption} if: You need maximum scalability\n`;
      } else {
        recommendation += `• Choose ${secondOption} if: You need maximum scalability\n`;
      }
      
      if (topData.easeOfUse > secondData.easeOfUse) {
        recommendation += `• Choose ${topOption} if: Ease of use is critical\n`;
      } else {
        recommendation += `• Choose ${secondOption} if: Ease of use is critical\n`;
      }
    }
    // CASE 2: Clear leader (≥ 0.5 difference)
    // One scores higher, but still explain alternatives
    else {
      recommendation = `${topOption} scores higher (${topScore} vs ${secondScore}) for your specific constraints, but here's what to consider:\n\n`;
      
      // Explain why top option scored higher
      const priorityMap = {
        low: 'budget constraints',
        small: 'small scale needs',
        beginner: 'beginner-friendly requirements',
        fast: 'quick time-to-market needs'
      };
      
      const priorities = [];
      if (constraints.budget === 'low') priorities.push(priorityMap.low);
      if (constraints.scale === 'small') priorities.push(priorityMap.small);
      if (constraints.expertise === 'beginner') priorities.push(priorityMap.beginner);
      if (constraints.timeToMarket === 'fast') priorities.push(priorityMap.fast);
      
      if (priorities.length > 0) {
        recommendation += `${topOption} aligns well with your ${priorities.join(', ')}.\n\n`;
      }
      
      // But still present the alternative
      recommendation += `However, ${secondOption} might be better if:\n`;
      
      const secondData = options.find(opt => opt.name === secondOption);
      const topData = options.find(opt => opt.name === topOption);
      
      if (secondData.scalability > topData.scalability) {
        recommendation += `• You anticipate rapid growth and need maximum scalability\n`;
      }
      if (secondData.costEfficiency < topData.costEfficiency && constraints.budget !== 'low') {
        recommendation += `• You're willing to invest more for additional features\n`;
      }
      if (secondData.easeOfUse < topData.easeOfUse && constraints.expertise === 'advanced') {
        recommendation += `• Your team can handle more complexity for more power\n`;
      }
    }
    
    return recommendation;
  }
  
  /**
   * MAIN ANALYSIS FUNCTION
   * 
   * Orchestrates the entire decision-making process:
   * 1. Calculate weights from constraints
   * 2. Calculate scores for each option
   * 3. Extract pros and cons
   * 4. Detect trade-offs
   * 5. Generate balanced recommendation
   * 
   * @param {String} category - Category being compared
   * @param {Array} selectedOptions - Options to compare
   * @param {Object} constraints - User's constraints
   * @returns {Object} analysis - Complete analysis results
   */
  static analyze(category, selectedOptions, constraints) {
    // STEP 1: Calculate constraint-based weights
    const weights = this.calculateWeights(constraints);
    
    // STEP 2: Calculate weighted scores
    const scores = this.calculateScores(selectedOptions, weights);
    
    // STEP 3: Extract pros and cons
    const prosAndCons = this.extractProsAndCons(selectedOptions);
    
    // STEP 4: Detect trade-offs
    const tradeoffs = this.detectTradeoffs(selectedOptions);
    
    // STEP 5: Generate balanced recommendation
    const recommendation = this.generateRecommendation(selectedOptions, scores, constraints);
    
    // STEP 6: Explain reasoning
    const reasoning = this.explainReasoning(constraints, weights);
    
    // Return complete analysis
    return {
      scores,           // Numerical scores per option
      prosAndCons,      // Strengths and weaknesses
      tradeoffs,        // Trade-off explanations
      recommendation,   // Balanced recommendation text
      reasoning,        // Why we scored this way
      options: selectedOptions  // Original option data
    };
  }
  
  /**
   * EXPLAIN REASONING
   * 
   * Transparently explain how constraints influenced the analysis.
   * This builds trust and educates users.
   * 
   * @param {Object} constraints - User constraints
   * @param {Object} weights - Calculated weights
   * @returns {String} reasoning - Human-readable explanation
   */
  static explainReasoning(constraints, weights) {
    let reasoning = 'Here\'s how your constraints influenced our analysis:\n\n';
    
    // Budget reasoning
    reasoning += `💰 Budget (${constraints.budget}): `;
    if (constraints.budget === 'low') {
      reasoning += `We prioritized cost-effectiveness heavily (${weights.budgetSuitability}x weight)\n`;
    } else if (constraints.budget === 'high') {
      reasoning += `We focused on capabilities over cost (${weights.budgetSuitability}x weight)\n`;
    } else {
      reasoning += `We balanced cost and features equally\n`;
    }
    
    // Scale reasoning
    reasoning += `📈 Scale (${constraints.scale}): `;
    if (constraints.scale === 'small') {
      reasoning += `We emphasized simplicity and ease of use (${weights.learningCurve}x weight)\n`;
    } else if (constraints.scale === 'enterprise') {
      reasoning += `We prioritized scalability heavily (${weights.scalability}x weight)\n`;
    } else {
      reasoning += `We balanced current needs with growth potential\n`;
    }
    
    // Expertise reasoning
    reasoning += `🎓 Expertise (${constraints.expertise}): `;
    if (constraints.expertise === 'beginner') {
      reasoning += `We heavily weighted ease of learning (${weights.learningCurve}x weight)\n`;
    } else if (constraints.expertise === 'advanced') {
      reasoning += `We reduced emphasis on simplicity, focusing on advanced features\n`;
    } else {
      reasoning += `We balanced learning curve with capabilities\n`;
    }
    
    // Time to market reasoning
    reasoning += `⚡ Time to Market (${constraints.timeToMarket}): `;
    if (constraints.timeToMarket === 'fast') {
      reasoning += `We prioritized quick setup and deployment (${weights.setupSpeed}x weight)\n`;
    } else {
      reasoning += `We allowed for more complex but powerful solutions\n`;
    }
    
    return reasoning;
  }
}

module.exports = DecisionEngine;