/**
 * AI Referee Decision Engine
 * Scores options based on constraints and generates trade-off explanations
 */

class DecisionEngine {
  
  /**
   * Calculate weighted scores for each option based on user constraints
   */
  static calculateScores(options, constraints) {
    const weights = this.getConstraintWeights(constraints);
    const scores = {};
    
    options.forEach(option => {
      // Calculate weighted score (1-5 scale)
      const score = (
        option.costEfficiency * weights.cost +
        option.scalability * weights.scalability +
        option.easeOfUse * weights.easeOfUse +
        option.timeToMarket * weights.timeToMarket +
        option.communitySupport * weights.community
      ) / 5; // Normalize to 0-5 scale
      
      scores[option.name] = Math.round(score * 10) / 10; // Round to 1 decimal
    });
    
    return scores;
  }
  
  /**
   * Generate constraint-based weights for scoring
   */
  static getConstraintWeights(constraints) {
    const weights = {
      cost: 1.0,
      scalability: 1.0,
      easeOfUse: 1.0,
      timeToMarket: 1.0,
      community: 1.0
    };
    
    // Adjust weights based on budget constraint
    if (constraints.budget === 'low') {
      weights.cost = 2.0; // Cost becomes very important
    } else if (constraints.budget === 'high') {
      weights.cost = 0.5; // Cost less important
      weights.scalability = 1.5; // Focus on scalability
    }
    
    // Adjust weights based on scale constraint
    if (constraints.scale === 'enterprise') {
      weights.scalability = 2.0;
      weights.community = 1.5; // Enterprise needs good support
    } else if (constraints.scale === 'small') {
      weights.easeOfUse = 1.8;
      weights.cost = 1.5;
    }
    
    // Adjust weights based on team expertise
    if (constraints.teamExpertise === 'beginner') {
      weights.easeOfUse = 2.0;
      weights.community = 1.8;
    } else if (constraints.teamExpertise === 'advanced') {
      weights.easeOfUse = 0.7;
      weights.scalability = 1.3;
    }
    
    // Adjust weights based on time to market
    if (constraints.timeToMarket === 'fast') {
      weights.timeToMarket = 2.0;
      weights.easeOfUse = 1.5;
    }
    
    return weights;
  }
  
  /**
   * Generate recommendation based on scores and constraints
   */
  static generateRecommendation(options, scores, constraints) {
    const sortedOptions = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([name]) => name);
    
    const topOption = sortedOptions[0];
    const secondOption = sortedOptions[1];
    
    const topOptionData = options.find(opt => opt.name === topOption);
    const secondOptionData = options.find(opt => opt.name === secondOption);
    
    // Generate contextual recommendation
    let recommendation = `Based on your constraints, here's what we found:\n\n`;
    
    // Primary recommendation
    recommendation += `**${topOption}** scores highest (${scores[topOption]}/5) for your needs. `;
    recommendation += `It's particularly strong in areas that matter most to you.\n\n`;
    
    // Alternative consideration
    if (secondOption && scores[secondOption] > 3.0) {
      recommendation += `**${secondOption}** (${scores[secondOption]}/5) is also worth considering. `;
      recommendation += `The choice between them depends on your priorities:\n\n`;
      
      // Generate priority-based guidance
      recommendation += this.generatePriorityGuidance(
        topOptionData, 
        secondOptionData, 
        constraints
      );
    }
    
    return recommendation;
  }
  
  /**
   * Generate priority-based guidance between top options
   */
  static generatePriorityGuidance(option1, option2, constraints) {
    let guidance = '';
    
    // Compare key aspects
    if (option1.costEfficiency > option2.costEfficiency) {
      guidance += `• If **budget is your main concern**, go with ${option1.name}\n`;
    } else if (option2.costEfficiency > option1.costEfficiency) {
      guidance += `• If **budget is your main concern**, go with ${option2.name}\n`;
    }
    
    if (option1.scalability > option2.scalability) {
      guidance += `• If you need **maximum scalability**, choose ${option1.name}\n`;
    } else if (option2.scalability > option1.scalability) {
      guidance += `• If you need **maximum scalability**, choose ${option2.name}\n`;
    }
    
    if (option1.easeOfUse > option2.easeOfUse) {
      guidance += `• If **ease of use** is critical, ${option1.name} is better\n`;
    } else if (option2.easeOfUse > option1.easeOfUse) {
      guidance += `• If **ease of use** is critical, ${option2.name} is better\n`;
    }
    
    return guidance;
  }
  
  /**
   * Identify key trade-offs between options
   */
  static identifyTradeOffs(options, constraints) {
    const tradeOffs = [];
    
    // Find options with significant differences in key metrics
    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length; j++) {
        const opt1 = options[i];
        const opt2 = options[j];
        
        // Cost vs Performance trade-off
        if (Math.abs(opt1.costEfficiency - opt2.costEfficiency) >= 2) {
          const cheaper = opt1.costEfficiency > opt2.costEfficiency ? opt1.name : opt2.name;
          const expensive = opt1.costEfficiency > opt2.costEfficiency ? opt2.name : opt1.name;
          tradeOffs.push(`${cheaper} is more cost-effective, but ${expensive} may offer better performance or features`);
        }
        
        // Ease vs Power trade-off
        if (Math.abs(opt1.easeOfUse - opt2.easeOfUse) >= 2) {
          const easier = opt1.easeOfUse > opt2.easeOfUse ? opt1.name : opt2.name;
          const complex = opt1.easeOfUse > opt2.easeOfUse ? opt2.name : opt1.name;
          tradeOffs.push(`${easier} is easier to use, while ${complex} offers more advanced capabilities`);
        }
        
        // Scale vs Simplicity trade-off
        if (Math.abs(opt1.scalability - opt2.scalability) >= 2) {
          const scalable = opt1.scalability > opt2.scalability ? opt1.name : opt2.name;
          const simple = opt1.scalability > opt2.scalability ? opt2.name : opt1.name;
          tradeOffs.push(`${scalable} scales better for large applications, ${simple} is simpler for smaller projects`);
        }
      }
    }
    
    return tradeOffs;
  }
  
  /**
   * Main method to run complete analysis
   */
  static analyze(template, selectedOptionNames, constraints) {
    // Filter selected options
    const selectedOptions = template.options.filter(opt => 
      selectedOptionNames.includes(opt.name)
    );
    
    // Calculate scores
    const scores = this.calculateScores(selectedOptions, constraints);
    
    // Generate recommendation
    const recommendation = this.generateRecommendation(selectedOptions, scores, constraints);
    
    // Identify trade-offs
    const tradeOffs = this.identifyTradeOffs(selectedOptions, constraints);
    
    // Generate reasoning
    const reasoning = this.generateReasoning(constraints, scores);
    
    return {
      scores,
      recommendation,
      tradeOffs,
      reasoning
    };
  }
  
  /**
   * Generate explanation of how constraints influenced the analysis
   */
  static generateReasoning(constraints, scores) {
    let reasoning = 'Our analysis considered your specific constraints:\n\n';
    
    reasoning += `• **Budget**: ${constraints.budget} - `;
    reasoning += constraints.budget === 'low' ? 'prioritized cost-effectiveness\n' :
                 constraints.budget === 'high' ? 'focused on features over cost\n' :
                 'balanced cost and features\n';
    
    reasoning += `• **Scale**: ${constraints.scale} - `;
    reasoning += constraints.scale === 'small' ? 'emphasized simplicity and ease of use\n' :
                 constraints.scale === 'enterprise' ? 'prioritized scalability and support\n' :
                 'balanced growth potential with current needs\n';
    
    reasoning += `• **Team Expertise**: ${constraints.teamExpertise} - `;
    reasoning += constraints.teamExpertise === 'beginner' ? 'weighted ease of use heavily\n' :
                 constraints.teamExpertise === 'advanced' ? 'considered advanced features\n' :
                 'balanced learning curve with capabilities\n';
    
    reasoning += `• **Time to Market**: ${constraints.timeToMarket} - `;
    reasoning += constraints.timeToMarket === 'fast' ? 'prioritized quick setup and deployment\n' :
                 'allowed for more complex but powerful solutions\n';
    
    return reasoning;
  }
}

module.exports = DecisionEngine;