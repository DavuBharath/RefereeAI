// Quick test to verify API connection
const http = require('http');

console.log('🧪 Testing API Connection...\n');

// Test 1: Backend health
http.get('http://localhost:5000/api/comparisons/categories', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const categories = JSON.parse(data);
      console.log('✅ Backend API Working!');
      console.log(`✅ Found ${categories.length} categories`);
      console.log('\nCategories:');
      categories.forEach(cat => {
        console.log(`  ${cat.icon} ${cat.category} (${cat.optionCount} options)`);
      });
      console.log('\n🎉 All systems operational!');
      console.log('\n📍 Frontend: http://localhost:3000');
      console.log('📍 Backend:  http://localhost:5000/api');
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
    }
  });
}).on('error', (error) => {
  console.error('❌ Backend connection failed:', error.message);
  console.log('\n💡 Make sure backend is running: npm start');
});
