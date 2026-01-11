const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Scoring criteria (1-5 scale)
  costEfficiency: { type: Number, min: 1, max: 5, required: true },
  scalability: { type: Number, min: 1, max: 5, required: true },
  easeOfUse: { type: Number, min: 1, max: 5, required: true },
  timeToMarket: { type: Number, min: 1, max: 5, required: true },
  communitySupport: { type: Number, min: 1, max: 5, required: true },
  // Detailed analysis
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  bestFor: [{ type: String }],
  notIdealFor: [{ type: String }]
});

const comparisonTemplateSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    enum: ['Cloud Services', 'APIs', 'Tech Stacks', 'Databases', 'Frontend Frameworks', 'Backend Frameworks']
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ComparisonTemplate', comparisonTemplateSchema);