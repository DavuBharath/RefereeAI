/**
 * RefereeAI - Decision Engine (Vanilla JS)
 * Analyzes options based on user constraints
 */

const DecisionEngine = {
  
  /**
   * Calculate constraint-based weights
   */
  calculateWeights(constraints) {
    const weights = {
      budgetSuitability: 1.0,
      scalability: 1.0,
      learningCurve: 1.0,
      setupSpeed: 1.0
    };
    
    // Budget constraint
    if (constraints.budget === 'low') {
      weights.budgetSuitability = 2.5;
      weights.setupSpeed = 1.3;
    } else if (constraints.budget === 'high') {
      weights.budgetSuitability = 0.5;
      weights.scalability = 1.5;
    }
    
    // Scale constraint
    if (constraints.scale === 'small') {
      weights.learningCurve = 1.8;
      weights.budgetSuitability = 1.5;
    } else if (constraints.scale === 'growing') {
      weights.scalability = 1.5;
    } else if (constraints.scale === 'enterprise') {
      weights.scalability = 2.5;
      weights.learningCurve = 0.7;
    }
    
    // Expertise constraint
    if (constraints.expertise === 'beginner') {
      weights.learningCurve = 2.5;
      weights.setupSpeed = 1.8;
    } else if (constraints.expertise === 'intermediate') {
      weights.learningCurve = 1.2;
    } else if (constraints.expertise === 'advanced') {
      weights.learningCurve = 0.5;
      weights.scalability = 1.5;
    }
    
    // Time to market constraint
    if (constraints.timeToMarket === 'fast') {
      weights.setupSpeed = 2.5;
      weights.learningCurve = 1.8;
    } else if (constraints.timeToMarket === 'flexible') {
      weights.scalability = 1.3;
    }
    
    return weights;
  },
  
  /**
   * Calculate weighted scores for each option
   */
  calculateScores(options, weights) {
    const scores = {};
    
    options.forEach(option => {
      const weightedSum = (
        option.costEfficiency * weights.budgetSuitability +
        option.scalability * weights.scalability +
        option.easeOfUse * weights.learningCurve +
        option.timeToMarket * weights.setupSpeed
      );
      
      const weightSum = (
        weights.budgetSuitability +
        weights.scalability +
        weights.learningCurve +
        weights.setupSpeed
      );
      
      const normalizedScore = weightedSum / weightSum;
      scores[option.name] = Math.round(normalizedScore * 10) / 10;
    });
    
    return scores;
  },
  
  /**
   * Extract pros and cons from options
   */
  extractProsAndCons(options) {
    const prosAndCons = {};
    
    options.forEach(option => {
      prosAndCons[option.name] = {
        pros: option.strengths || [],
        cons: option.weaknesses || [],
        bestFor: option.bestFor || []
      };
    });
    
    return prosAndCons;
  },
  
  /**
   * Detect trade-offs between options
   */
  detectTradeoffs(options) {
    const tradeoffs = [];
    
    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length; j++) {
        const opt1 = options[i];
        const opt2 = options[j];
        
        // Cost vs Scalability trade-off
        const costDiff = opt1.costEfficiency - opt2.costEfficiency;
        const scaleDiff = opt1.scalability - opt2.scalability;
        
        if (Math.abs(costDiff) >= 2 && costDiff * scaleDiff < 0) {
          const cheaper = costDiff > 0 ? opt1.name : opt2.name;
          const scalable = scaleDiff > 0 ? opt1.name : opt2.name;
          tradeoffs.push(
            `💰 Cost vs Scale: ${cheaper} is more budget-friendly, but ${scalable} scales better for growth`
          );
        }
        
        // Simplicity vs Flexibility trade-off
        const easeDiff = opt1.easeOfUse - opt2.easeOfUse;
        const powerDiff = opt1.scalability - opt2.scalability;
        
        if (Math.abs(easeDiff) >= 2 && easeDiff * powerDiff < 0) {
          const simpler = easeDiff > 0 ? opt1.name : opt2.name;
          const powerful = powerDiff > 0 ? opt1.name : opt2.name;
          tradeoffs.push(
            `🎯 Simplicity vs Power: ${simpler} is easier to learn, but ${powerful} offers more advanced capabilities`
          );
        }
        
        // Speed vs Long-term trade-off
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
    
    if (tradeoffs.length === 0) {
      tradeoffs.push(
        '⚖️ Both options have similar trade-off profiles. Your choice depends on specific team preferences and existing infrastructure.'
      );
    }
    
    return tradeoffs;
  },
  
  /**
   * Generate balanced recommendation
   */
  generateRecommendation(options, scores, constraints) {
    const sortedOptions = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name);
    
    const topOption = sortedOptions[0];
    const secondOption = sortedOptions[1];
    const topScore = scores[topOption];
    const secondScore = scores[secondOption];
    const scoreDiff = topScore - secondScore;
    
    let recommendation = '';
    
    if (scoreDiff < 0.5) {
      recommendation = `Both ${topOption} (${topScore}) and ${secondOption} (${secondScore}) are excellent choices for your needs. The decision comes down to specific priorities:\n\n`;
      
      const topData = options.find(opt => opt.name === topOption);
      const secondData = options.find(opt => opt.name === secondOption);
      
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
    } else {
      recommendation = `${topOption} scores higher (${topScore} vs ${secondScore}) for your specific constraints, but here's what to consider:\n\n`;
      
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
  },
  
  /**
   * Explain reasoning behind the analysis
   */
  explainReasoning(constraints, weights) {
    let reasoning = 'Here\'s how your constraints influenced our analysis:\n\n';
    
    reasoning += `💰 Budget (${constraints.budget}): `;
    if (constraints.budget === 'low') {
      reasoning += `We prioritized cost-effectiveness heavily (${weights.budgetSuitability}x weight)\n`;
    } else if (constraints.budget === 'high') {
      reasoning += `We focused on capabilities over cost (${weights.budgetSuitability}x weight)\n`;
    } else {
      reasoning += `We balanced cost and features equally\n`;
    }
    
    reasoning += `📈 Scale (${constraints.scale}): `;
    if (constraints.scale === 'small') {
      reasoning += `We emphasized simplicity and ease of use (${weights.learningCurve}x weight)\n`;
    } else if (constraints.scale === 'enterprise') {
      reasoning += `We prioritized scalability heavily (${weights.scalability}x weight)\n`;
    } else {
      reasoning += `We balanced current needs with growth potential\n`;
    }
    
    reasoning += `🎓 Expertise (${constraints.expertise}): `;
    if (constraints.expertise === 'beginner') {
      reasoning += `We heavily weighted ease of learning (${weights.learningCurve}x weight)\n`;
    } else if (constraints.expertise === 'advanced') {
      reasoning += `We reduced emphasis on simplicity, focusing on advanced features\n`;
    } else {
      reasoning += `We balanced learning curve with capabilities\n`;
    }
    
    reasoning += `⚡ Time to Market (${constraints.timeToMarket}): `;
    if (constraints.timeToMarket === 'fast') {
      reasoning += `We prioritized quick setup and deployment (${weights.setupSpeed}x weight)\n`;
    } else {
      reasoning += `We allowed for more complex but powerful solutions\n`;
    }
    
    return reasoning;
  },
  
  /**
   * Main analysis function
   */
  analyze(category, selectedOptions, constraints) {
    const weights = this.calculateWeights(constraints);
    const scores = this.calculateScores(selectedOptions, weights);
    const prosAndCons = this.extractProsAndCons(selectedOptions);
    const tradeoffs = this.detectTradeoffs(selectedOptions);
    const recommendation = this.generateRecommendation(selectedOptions, scores, constraints);
    const reasoning = this.explainReasoning(constraints, weights);
    
    return {
      scores,
      prosAndCons,
      tradeoffs,
      recommendation,
      reasoning,
      options: selectedOptions
    };
  }
};
