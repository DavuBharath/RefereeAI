#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏆 Setting up AI Referee...\n');

// Check if .env exists, if not create from template
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-referee
NODE_ENV=development`;
  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created\n');
} else {
  console.log('✅ .env file already exists\n');
}

// Install dependencies
console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed\n');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install client dependencies
console.log('📦 Installing frontend dependencies...');
try {
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed\n');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Check MongoDB connection and seed data
console.log('🌱 Seeding database with sample data...');
try {
  execSync('node seedData.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully\n');
} catch (error) {
  console.log('⚠️  Could not seed database. Make sure MongoDB is running.');
  console.log('   You can start MongoDB and run: npm run seed\n');
}

console.log('🎉 Setup complete!\n');
console.log('To start the application:');
console.log('1. Make sure MongoDB is running');
console.log('2. Run: npm run dev-full');
console.log('3. Open http://localhost:3000 in your browser\n');
console.log('Or run backend and frontend separately:');
console.log('- Backend: npm run dev');
console.log('- Frontend: npm run client\n');
console.log('Happy comparing! 🚀');