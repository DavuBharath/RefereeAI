# RefereeAI 🏆

**Smart technical decision-making through constraint-based comparison and trade-off analysis.**

RefereeAI helps developers, students, and founders make informed technical decisions by comparing options side-by-side with personalized scoring based on your specific constraints. No single "best" answer—just clear trade-offs and contextual recommendations.

---

## 🎯 What Problem Does This Solve?

When choosing between technical options (cloud providers, frameworks, databases, programming languages), people often:
- Get overwhelmed by too many choices
- Receive biased "one-size-fits-all" recommendations  
- Don't understand the trade-offs between options
- Make decisions without considering their specific constraints (budget, team size, timeline)

**RefereeAI solves this** by providing constraint-based analysis that adapts to YOUR situation, not generic advice.

---

## 💡 Key Features

### 🎨 Modern, Professional UI
- **Sparkles particle animation background** (100 white particles on black)
- **Centered, responsive design** with gradient cards and hover effects
- **Dark theme** with zinc-900 backgrounds and neon accents
- **Smooth navigation** between categories, form, and results

### 📊 10 Comparison Categories, 49 Real Options
- **Programming Languages**: Python, JavaScript, Java, Go, Rust
- **Cloud Providers**: AWS, GCP, Azure, DigitalOcean, Heroku
- **Frontend Frameworks**: React, Vue, Angular, Svelte, Next.js
- **Backend Frameworks**: Express, Django, Spring Boot, FastAPI, Rails
- **Databases**: PostgreSQL, MongoDB, MySQL, Redis, Cassandra
- **Mobile Development**: React Native, Flutter, Swift, Kotlin, Ionic
- **DevOps Tools**: Docker, Kubernetes, Jenkins, GitHub Actions, CircleCI
- **Testing Frameworks**: Jest, Pytest, JUnit, Cypress, Selenium
- **State Management**: Redux, MobX, Zustand, Recoil, Context API
- **CSS Frameworks**: Tailwind, Bootstrap, Material-UI, Chakra UI, Styled Components

### 🧠 Intelligent Decision Engine
- **4 Universal Constraints**: Budget, Scale, Team Expertise, Time to Market
- **Weighted scoring system**: Constraints adjust importance of different criteria
- **Trade-off detection**: Identifies significant differences between options
- **Contextual recommendations**: "If X matters most, choose A. If Y is priority, choose B"
- **Never declares a single winner**: Always shows multiple perspectives

### 📥 Download Comparison Reports
- **Text file format** with clear formatting using box-drawing characters
- **Includes**: Score summary with star ratings, detailed analysis (all strengths/weaknesses/best-for scenarios), recommendation, trade-offs
- **UTF-8 encoding** with special characters (★, ✓, ⚠, 🎯, →)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** (without JSX - uses `React.createElement` only)
- **Tailwind CSS** (via CDN in index.html)
- **Framer Motion** (animations)
- **@tsparticles** (SparklesCore background animation)
- **Lucide React** (icons)

### Backend
- **Node.js + Express** (REST API)
- **No database required** (uses in-memory data from `server/data/allCategories.js`)
- **Helmet** (security headers)
- **CORS** (cross-origin support)

### Architecture
- **MERN-style** (MongoDB optional, currently using in-memory data)
- **REST API** with `/api/comparisons` endpoints
- **Proxy setup**: Frontend (port 3000) → Backend (port 5000)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ (with npm)
- **No MongoDB required** (data is in-memory)
- **No authentication or paid APIs needed**

### Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd refereeai
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Start the backend server** (Terminal 1)
```bash
npm start
# Backend runs on http://localhost:5000
```

5. **Start the frontend** (Terminal 2)
```bash
cd client
npm start
# Frontend runs on http://localhost:3000
```

6. **Open your browser**
```
http://localhost:3000
```

### Quick Test
```bash
# Test backend API
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"AI Referee API is running"}
```

---

## 📁 Project Structure

```
refereeai/
├── client/                          # React frontend (port 3000)
│   ├── public/
│   │   └── index.html              # Tailwind CSS via CDN
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComparisonTable.js  # Score display with rankings
│   │   │   ├── DetailedComparison.js # All strengths/weaknesses/best-for
│   │   │   ├── TradeoffExplanation.js # Trade-off analysis
│   │   │   ├── Recommendation.js   # Contextual guidance
│   │   │   ├── InputForm.js        # Category selection & constraints
│   │   │   └── ui/
│   │   │       ├── SparklesCore.js # Particle animation background
│   │   │       └── NeonButton.js   # Gradient button component
│   │   ├── pages/
│   │   │   └── Home.js             # Main page (categories/form/results)
│   │   ├── services/
│   │   │   └── api.js              # API communication layer
│   │   ├── App.js                  # Root component with navbar
│   │   └── index.js                # Entry point
│   └── package.json
│
├── server/                          # Node.js backend (port 5000)
│   ├── controllers/
│   │   └── compareController.js    # Request handlers
│   ├── routes/
│   │   └── compareRoutes.js        # API endpoints
│   ├── utils/
│   │   └── decisionEngine.js       # Core comparison algorithm
│   ├── data/
│   │   ├── allCategories.js        # 10 categories, 49 options
│   │   └── categories.js           # Category metadata
│   ├── app.js                      # Express app setup
│   └── server.js                   # Server entry point
│
├── package.json                     # Backend dependencies
├── .env                            # Environment variables (optional)
├── .gitignore
└── README.md
```

---

## 🧠 How the Decision Engine Works

### Step 1: Constraint-Based Weighting
User constraints adjust the importance of different criteria:

**Example: Low Budget**
- `budgetSuitability` weight: 1.0 → 2.5x (cost becomes critical)
- `setupSpeed` weight: 1.0 → 1.3x (want quick, cheap setup)

**Example: Beginner Team**
- `learningCurve` weight: 1.0 → 2.5x (ease of use critical)
- `setupSpeed` weight: 1.0 → 1.8x (need quick wins)

### Step 2: Weighted Scoring
Each option has capability scores (1-5 scale):
- `costEfficiency` (budget suitability)
- `scalability`
- `easeOfUse` (learning curve)
- `timeToMarket` (setup speed)

**Formula:**
```
score = (capability1 × weight1 + capability2 × weight2 + ...) / sum(weights)
```

### Step 3: Trade-off Detection
Identifies significant differences (>0.5 points) between top options:
- "Option A is more cost-effective but less scalable than Option B"
- "Option B has a steeper learning curve but offers better performance"

### Step 4: Contextual Recommendations
Generates guidance based on priorities:
- "If budget and quick deployment are your priorities, choose DigitalOcean"
- "If you need advanced AI/ML capabilities, consider GCP despite the learning curve"

**NEVER declares a single "best" option** - always shows trade-offs and multiple perspectives.

---

## 📊 Example Comparison

### Scenario: Startup Choosing Cloud Provider

**Constraints:**
- Budget: Low
- Scale: Growing
- Team Expertise: Intermediate
- Time to Market: Fast

**Results:**

| Option | Score | Rank |
|--------|-------|------|
| DigitalOcean | 4.2/5 | ⭐ Top Choice |
| GCP | 3.8/5 | Strong Alternative |
| AWS | 3.1/5 | Consider If... |

**Trade-off:**
"DigitalOcean is more cost-effective and easier to use, while AWS offers more advanced features but requires more expertise and higher costs."

**Recommendation:**
"If budget and quick deployment are your priorities, choose DigitalOcean. If you need advanced AI/ML capabilities and can invest in learning, consider GCP despite the steeper learning curve."

---

## 🎨 UI Design Principles

### Visual Style
- **Centered layouts** with max-width containers (max-w-4xl to max-w-6xl)
- **Gradient backgrounds** (gray-900 to gray-800)
- **Shadow effects** with color glows (shadow-2xl with indigo/purple)
- **Hover animations** on cards and buttons
- **Sparkles background** (100 white particles, black canvas)

### Component Hierarchy
1. **Hero Section**: 6xl-8xl gradient text, centered
2. **Categories Grid**: 3-column layout, gradient cards
3. **Form**: Large dropdowns (not pill toggles), gradient option cards
4. **Results**: Score table → Detailed comparison → How we compared → Trade-offs
5. **Action Buttons**: All use NeonButton (solid/ghost variants)

### Navigation
- **Floating navbar** with backdrop blur
- **Clickable logo** returns to categories
- **Smooth scrolling** between sections
- **State management** syncs internal/external views

---

## 🔧 API Endpoints

### GET `/api/health`
Health check endpoint
```json
{
  "status": "OK",
  "message": "AI Referee API is running"
}
```

### GET `/api/comparisons/categories`
Get all comparison categories
```json
[
  {
    "id": "programming-languages",
    "category": "Programming Languages",
    "title": "Programming Language Comparison",
    "description": "Compare languages for your next project",
    "icon": "💻"
  }
]
```

### GET `/api/comparisons/categories/:categoryId`
Get category with all options
```json
{
  "id": "programming-languages",
  "category": "Programming Languages",
  "options": [
    {
      "name": "Python",
      "description": "Versatile language for web, data, and AI",
      "costEfficiency": 5,
      "scalability": 4,
      "easeOfUse": 5,
      "timeToMarket": 5,
      "strengths": ["Easy to learn...", "Huge ecosystem..."],
      "weaknesses": ["Slower execution..."],
      "bestFor": ["Data science...", "Web development..."]
    }
  ]
}
```

### POST `/api/comparisons/compare`
Create a comparison
```json
{
  "category": "programming-languages",
  "selectedOptions": ["Python", "JavaScript"],
  "constraints": {
    "budget": "low",
    "scale": "growing",
    "expertise": "intermediate",
    "timeToMarket": "fast"
  }
}
```

**Response:**
```json
{
  "category": "Programming Languages",
  "options": [
    {
      "name": "Python",
      "score": 4.5,
      "description": "...",
      "strengths": [...],
      "weaknesses": [...],
      "bestFor": [...]
    }
  ],
  "scores": {
    "Python": 4.5,
    "JavaScript": 4.3
  },
  "tradeoffs": [
    "Python is easier to learn but JavaScript runs everywhere"
  ],
  "recommendation": "If rapid prototyping is your priority..."
}
```

---

## 🎯 Design Philosophy

### Core Principles
1. **No Single Answers**: Always show trade-offs, never declare one "winner"
2. **Context Matters**: Recommendations change based on user constraints
3. **Educational**: Explain reasoning behind recommendations
4. **Transparent**: Every calculation is explainable
5. **Accessible**: Simple language, clear visual hierarchy

### Constraint System
All categories use the same 4 constraints:
- **Budget**: low / medium / high
- **Scale**: small / growing / enterprise
- **Expertise**: beginner / intermediate / advanced
- **Time to Market**: fast / moderate / flexible

This consistency makes the system predictable and easy to understand.

---

## 🔮 Future Enhancements

- [ ] User-generated comparison templates
- [ ] Community voting on option ratings
- [ ] Integration with real-time pricing APIs
- [ ] Team collaboration features
- [ ] Comparison history and saved templates
- [ ] Export to PDF/CSV formats
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port already in use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### API connection failed
1. Ensure backend is running on port 5000
2. Check `client/package.json` has `"proxy": "http://localhost:5000"`
3. Restart both servers

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes (follow existing code style)
4. Test thoroughly
5. Submit a pull request

---

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the decision engine code in `server/utils/decisionEngine.js`

---

**Built with ❤️ for better technical decision-making**

*No authentication, no paid APIs, no complexity—just smart comparisons.*
