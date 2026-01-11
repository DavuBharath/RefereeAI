const mongoose = require('mongoose');

const constraintsSchema = new mongoose.Schema({
  budget: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    required: true 
  },
  scale: { 
    type: String, 
    enum: ['small', 'growing', 'enterprise'], 
    required: true 
  },
  teamExpertise: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: true 
  },
  timeToMarket: { 
    type: String, 
    enum: ['fast', 'flexible'], 
    required: true 
  }
});

const comparisonSchema = new mongoose.Schema({
  templateId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ComparisonTemplate', 
    required: true 
  },
  constraints: constraintsSchema,
  selectedOptions: [{ type: String, required: true }],
  result: {
    scores: { type: Map, of: Number },
    recommendation: { type: String },
    tradeOffs: [{ type: String }],
    reasoning: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comparison', comparisonSchema);