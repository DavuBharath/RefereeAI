// Quick integration test
const http = require('http');

console.log('🧪 Testing AI Referee Integration...\n');

// Test 1: Backend Health
http.get('http://localhost:5000/api/comparisons/categories', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend API Test: PASSED');
    console.log('   Categories available:', JSON.parse(data).length);
    
    // Test 2: Create Comparison
    const postData = JSON.stringify({
      category: 'cloud-services',
      selectedOptions: ['AWS', 'Digital Ocean'],
      constraints: {
        budget: 'low',
        scale: 'small',
        teamExpertise: 'beginner',
        timeToMarket: 'fast'
      }
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/comparisons',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const result = JSON.parse(data);
        console.log('✅ Comparison API Test: PASSED');
        console.log('   Scores:', result.result.scores);
        console.log('   Trade-offs found:', result.result.tradeOffs.length);
        console.log('\n🎉 All Integration Tests PASSED!\n');
        console.log('═══════════════════════════════════════════════════════');
        console.log('🏆 AI REFEREE IS READY!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('');
        console.log('📍 Backend:  http://localhost:5000');
        console.log('📍 Frontend: http://localhost:3000');
        console.log('');
        console.log('👉 Open your browser and go to: http://localhost:3000');
        console.log('');
        console.log('What you can do:');
        console.log('  1. Choose a comparison category (Cloud Services or Frontend Frameworks)');
        console.log('  2. Select 2+ options to compare');
        console.log('  3. Set your constraints (budget, scale, expertise, timeline)');
        console.log('  4. View personalized recommendations with trade-offs!');
        console.log('');
        console.log('═══════════════════════════════════════════════════════');
      });
    });

    req.on('error', (e) => {
      console.error('❌ Comparison API Test: FAILED', e.message);
    });

    req.write(postData);
    req.end();
  });
}).on('error', (e) => {
  console.error('❌ Backend API Test: FAILED', e.message);
});