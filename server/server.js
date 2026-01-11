const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Start server (no MongoDB required - using in-memory data)
app.listen(PORT, () => {
  console.log('🏆 AI Referee Backend Started!');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`✅ Using in-memory data (no database required)`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/comparisons/categories`);
  console.log(`  GET  http://localhost:${PORT}/api/comparisons/categories/:id`);
  console.log(`  POST http://localhost:${PORT}/api/comparisons`);
  console.log('');
});