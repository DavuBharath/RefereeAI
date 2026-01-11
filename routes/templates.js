const express = require('express');
const ComparisonTemplate = require('../models/ComparisonTemplate');
const router = express.Router();

// Get all comparison templates
router.get('/', async (req, res) => {
  try {
    const templates = await ComparisonTemplate.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get templates by category
router.get('/category/:category', async (req, res) => {
  try {
    const templates = await ComparisonTemplate.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await ComparisonTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new template (for seeding data)
router.post('/', async (req, res) => {
  try {
    const template = new ComparisonTemplate(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;