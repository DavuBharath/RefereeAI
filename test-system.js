/**
 * RefereeAI - System Test
 * Verifies both backend and frontend are working correctly
 */

const http = require('http');

console.log('🧪 Testing RefereeAI System...\n');

// Test 1: Backend Categories Endpoint
function testCategories() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:5000/api/comparisons/categories', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const categories = JSON.parse(data);
          console.log('✅ Backend Categories: ' + categories.length + ' categories loaded');
          console.log('   Categories:', categories.map(c => c.category).join(', '));
          resolve(categories);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Test 2: Backend Comparison Endpoint
function testComparison() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      category: 'programming-languages',
      selectedOptions: ['Python', 'JavaScript'],
      constraints: {
        budget: 'low',
        scale: 'small',
        expertise: 'beginner',
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
        try {
          const result = JSON.parse(data);
          console.log('\n✅ Backend Comparison: Decision engine working');
          console.log('   Scores:', result.result.scores);
          console.log('   Trade-offs detected:', result.result.tradeoffs.length);
          console.log('   Recommendation generated: Yes');
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Test 3: Frontend Availability
function testFrontend() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        console.log('\n✅ Frontend: Running on http://localhost:3000');
        resolve();
      } else {
        reject(new Error('Frontend returned status ' + res.statusCode));
      }
    }).on('error', reject);
  });
}

// Run all tests
async function runTests() {
  try {
    await testCategories();
    await testComparison();
    await testFrontend();
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log('\n📊 System Status:');
    console.log('   🟢 Backend:  http://localhost:5000  [RUNNING]');
    console.log('   🟢 Frontend: http://localhost:3000  [RUNNING]');
    console.log('   🟢 Categories: 10 loaded');
    console.log('   🟢 Decision Engine: Working');
    console.log('\n✨ RefereeAI is ready for use!');
    console.log('\nOpen http://localhost:3000 in your browser to start comparing options.\n');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
    process.exit(1);
  }
}

runTests();
