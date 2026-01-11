const express = require('express');
const router = express.Router();
const compareController = require('../controllers/compareController');

// Get all comparison categories
router.get('/categories', compareController.getCategories);

// Get options for a specific category
router.get('/categories/:category', compareController.getCategoryOptions);

// Create new comparison and run analysis
router.post('/', compareController.createComparison);

module.exports = router;