const express = require('express');
const Comparison = require('../models/Comparison');
const ComparisonTemplate = require('../models/ComparisonTemplate');
const DecisionEngine = require('../utils/decisionEngine');
const router = express.Router();

// Create new comparison and run analysis
router.post('/', async (req, res) => {
  try {
    const { templateId, constraints, selectedOptions } = req.body;
    
    // Validate input
    if (!templateId || !constraints || !selectedOptions || selectedOptions.length < 2) {
      return res.status(400).json({ 
        error: 'Template ID, constraints, and at least 2 selected options are required' 
      });
    }
    
    // Get template
    const template = await ComparisonTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    // Validate selected options exist in template
    const templateOptionNames = template.options.map(opt => opt.name);
    const invalidOptions = selectedOptions.filter(opt => !templateOptionNames.includes(opt));
    if (invalidOptions.length > 0) {
      return res.status(400).json({ 
        error: `Invalid options: ${invalidOptions.join(', ')}` 
      });
    }
    
    // Run decision engine analysis
    const result = DecisionEngine.analyze(template, selectedOptions, constraints);
    
    // Save comparison
    const comparison = new Comparison({
      templateId,
      constraints,
      selectedOptions,
      result
    });
    
    await comparison.save();
    
    // Return analysis with template data for frontend
    res.status(201).json({
      comparison,
      template: {
        title: template.title,
        category: template.category,
        options: template.options.filter(opt => selectedOptions.includes(opt.name))
      }
    });
    
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get comparison by ID
router.get('/:id', async (req, res) => {
  try {
    const comparison = await Comparison.findById(req.params.id)
      .populate('templateId');
    
    if (!comparison) {
      return res.status(404).json({ error: 'Comparison not found' });
    }
    
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent comparisons
router.get('/', async (req, res) => {
  try {
    const comparisons = await Comparison.find()
      .populate('templateId', 'title category')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;