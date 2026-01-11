const DecisionEngine = require('../utils/decisionEngine');
const allCategories = require('../data/allCategories');

/**
 * Get all available comparison categories
 */
exports.getCategories = (req, res) => {
  try {
    const categories = Object.values(allCategories).map(cat => ({
      id: cat.id,
      category: cat.category,
      title: cat.title,
      description: cat.description,
      icon: cat.icon,
      optionCount: cat.options.length
    }));
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error.message 
    });
  }
};

/**
 * Get options for a specific category
 */
exports.getCategoryOptions = (req, res) => {
  try {
    const { category } = req.params;
    const template = allCategories[category];
    
    if (!template) {
      return res.status(404).json({ 
        error: 'Category not found',
        availableCategories: Object.keys(allCategories)
      });
    }
    
    res.json(template);
  } catch (error) {
    console.error('Error fetching category options:', error);
    res.status(500).json({ 
      error: 'Failed to fetch category options',
      message: error.message 
    });
  }
};

/**
 * Create comparison and run analysis
 */
exports.createComparison = (req, res) => {
  try {
    const { category, selectedOptions, constraints } = req.body;
    
    // Validate input
    if (!category) {
      return res.status(400).json({ 
        error: 'Category is required' 
      });
    }
    
    if (!selectedOptions || !Array.isArray(selectedOptions)) {
      return res.status(400).json({ 
        error: 'Selected options must be an array' 
      });
    }
    
    if (selectedOptions.length < 2) {
      return res.status(400).json({ 
        error: 'Please select at least 2 options to compare' 
      });
    }
    
    if (!constraints) {
      return res.status(400).json({ 
        error: 'Constraints are required' 
      });
    }
    
    // Validate constraints
    const requiredConstraints = ['budget', 'scale', 'expertise', 'timeToMarket'];
    const missingConstraints = requiredConstraints.filter(c => !constraints[c]);
    
    if (missingConstraints.length > 0) {
      return res.status(400).json({ 
        error: `Missing constraints: ${missingConstraints.join(', ')}` 
      });
    }
    
    // Get template
    const template = allCategories[category];
    if (!template) {
      return res.status(404).json({ 
        error: 'Category not found',
        availableCategories: Object.keys(allCategories)
      });
    }
    
    // Filter selected options
    const optionsToCompare = template.options.filter(opt => 
      selectedOptions.includes(opt.name)
    );
    
    if (optionsToCompare.length < 2) {
      return res.status(400).json({ 
        error: 'Invalid option names provided',
        availableOptions: template.options.map(o => o.name)
      });
    }
    
    // Run decision engine analysis
    const result = DecisionEngine.analyze(
      template.category,
      optionsToCompare,
      constraints
    );
    
    // Return analysis
    res.status(201).json({
      success: true,
      category: template.category,
      title: template.title,
      constraints,
      result
    });
    
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create comparison',
      message: error.message 
    });
  }
};

module.exports = exports;