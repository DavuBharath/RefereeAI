# Design Document

## Overview

RefereeAI is a full-stack web application that provides constraint-based technical decision-making through a modern, interactive interface. The system consists of a React frontend (without JSX) using Tailwind CSS and a Node.js/Express backend with an in-memory data store. The core innovation is the Decision Engine, which applies constraint-based weighting to option capabilities, generating personalized scores and contextual recommendations without declaring a single "best" option.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   React    │  │   Tailwind   │  │   @tsparticles   │   │
│  │ (no JSX)   │  │     CSS      │  │   (Sparkles)     │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
│         │                │                    │             │
│         └────────────────┴────────────────────┘             │
│                          │                                  │
│                    API Service Layer                        │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTP/REST
                           │ (Port 3000 → 5000)
┌──────────────────────────┼──────────────────────────────────┐
│                          │                                  │
│                    Express Server                           │
│                          │                                  │
│  ┌────────────┐  ┌──────┴───────┐  ┌──────────────────┐   │
│  │  Routes    │  │ Controllers  │  │ Decision Engine  │   │
│  │            │→ │              │→ │                  │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
│                          │                                  │
│                  ┌───────┴────────┐                        │
│                  │  In-Memory     │                        │
│                  │  Data Store    │                        │
│                  │ (allCategories)│                        │
│                  └────────────────┘                        │
│                      Backend                                │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18.2 (using React.createElement, no JSX)
- Tailwind CSS (via CDN)
- Framer Motion (animations)
- @tsparticles/react, @tsparticles/slim, @tsparticles/engine (background)
- Lucide React (icons)

**Backend:**
- Node.js + Express 4.18
- Helmet (security headers)
- CORS (cross-origin support)
- No database (in-memory data)

**Development:**
- react-scripts (frontend dev server)
- nodemon (backend hot reload)

## Components and Interfaces

### Frontend Components

#### 1. App.js (Root Component)
**Purpose:** Application shell with navigation state management

**State:**
- `currentView`: string ('categories' | 'form' | 'results')

**Methods:**
- `handleNavigateToCategories()`: Navigate to category selection
- `handleNavigateToHowItWorks()`: Scroll to how-it-works section

**Renders:**
- SparklesCore background (fixed, full-screen)
- Floating navbar with logo and navigation links
- Home component with view state

#### 2. Home.js (Main Page)
**Purpose:** Orchestrates all views and manages comparison flow

**State:**
- `view`: string (internal view state)
- `categories`: array (all available categories)
- `selectedCategory`: object (current category with options)
- `comparisonResult`: object (comparison output)
- `loading`: boolean
- `error`: string | null

**Methods:**
- `loadCategories()`: Fetch all categories from API
- `handleCategorySelect(categoryId)`: Load category options and show form
- `handleComparisonSubmit(formData)`: Submit comparison and show results
- `handleBackToCategories()`: Reset and return to categories
- `handleNewComparison()`: Return to form with same category
- `handleDownloadResults()`: Generate and download text file
- `updateView(newView)`: Sync internal and external view state

**Views:**
- Categories: Hero section + category grid + how-it-works
- Form: InputForm component
- Results: Score table + detailed comparison + recommendation + trade-offs

#### 3. InputForm.js
**Purpose:** Collect option selections and constraint inputs

**Props:**
- `category`: object (category data with options)
- `options`: array (available options)
- `onSubmit`: function (callback with form data)
- `onBack`: function (return to categories)

**State:**
- `selectedOptions`: array (selected option names)
- `constraints`: object { budget, scale, expertise, timeToMarket }

**Validation:**
- Minimum 2 options selected
- All 4 constraints must be set

**UI:**
- Large dropdown selects (not pill toggles)
- Gradient option cards with checkboxes
- Constraint dropdowns with 3 values each
- Submit button (disabled until valid)

#### 4. ComparisonTable.js
**Purpose:** Display scores in ranked table format

**Props:**
- `options`: array (option objects or names)
- `scores`: object { optionName: score }

**Features:**
- Sort by score (descending)
- Show score as X.X/5.0
- Visual star rating (★ × rounded score)
- Highlight top option with indigo ring
- Responsive table layout

#### 5. DetailedComparison.js
**Purpose:** Show comprehensive strengths, weaknesses, and use cases

**Props:**
- `options`: array (option objects)
- `scores`: object { optionName: score }

**Features:**
- Two-column layout: Strengths | Considerations
- Show ALL items (no truncation)
- "Best Suited For" section
- Top option highlighted with indigo ring
- Emerald for strengths, amber for considerations, indigo for best-for

#### 6. Recommendation.js
**Purpose:** Display contextual recommendation and reasoning

**Props:**
- `recommendation`: string (contextual guidance)
- `reasoning`: string (constraint influence explanation)

**Features:**
- "How We Compared These Options" section
- Formatted recommendation text
- Constraint weight explanations
- Educational tone

#### 7. TradeoffExplanation.js
**Purpose:** Explain trade-offs between options

**Props:**
- `tradeOffs`: array (trade-off strings)

**Features:**
- List all detected trade-offs
- Icons for trade-off types (💰, 🎯, ⚡)
- Clear explanations of what's gained/lost

#### 8. SparklesCore.js
**Purpose:** Animated particle background

**Props:**
- `id`: string
- `background`: string
- `minSize`: number
- `maxSize`: number
- `particleDensity`: number
- `particleColor`: string
- `speed`: number

**Implementation:**
- Uses @tsparticles/react
- 100 white particles on transparent background
- Slow movement (speed: 1)
- Fixed positioning, full-screen

#### 9. NeonButton.js
**Purpose:** Consistent button styling with gradient effects

**Props:**
- `variant`: 'solid' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `onClick`: function
- `children`: ReactNode

**Variants:**
- Solid: Gradient background (indigo to purple)
- Ghost: Transparent with gradient border

### Backend Components

#### 1. server.js (Entry Point)
**Purpose:** Start Express server

**Responsibilities:**
- Import app from app.js
- Listen on port 5000
- Log startup message

#### 2. app.js (Express App)
**Purpose:** Configure Express application

**Middleware:**
- helmet() - Security headers
- cors() - Cross-origin support
- express.json() - Parse JSON bodies

**Routes:**
- `/api/comparisons/*` → compareRoutes
- `/api/health` → Health check

**Error Handling:**
- Global error handler middleware

#### 3. compareRoutes.js
**Purpose:** Define comparison API endpoints

**Routes:**
- `GET /categories` → getAllCategories
- `GET /categories/:categoryId` → getCategoryOptions
- `POST /compare` → createComparison

#### 4. compareController.js
**Purpose:** Handle comparison requests

**Methods:**
- `getAllCategories()`: Return all categories with metadata
- `getCategoryOptions(categoryId)`: Return category with full option data
- `createComparison(category, selectedOptions, constraints)`: Run decision engine and return results

**Response Format:**
```javascript
{
  title: string,
  result: {
    options: array,
    scores: object,
    tradeoffs: array,
    recommendation: string,
    reasoning: string
  }
}
```

#### 5. decisionEngine.js (Core Algorithm)
**Purpose:** Calculate scores, detect trade-offs, generate recommendations

**Methods:**

**calculateWeights(constraints):**
- Input: { budget, scale, expertise, timeToMarket }
- Output: { budgetSuitability, scalability, learningCurve, setupSpeed }
- Logic: Apply multipliers based on constraint values
  - Low budget → budgetSuitability × 2.5
  - Enterprise scale → scalability × 2.5
  - Beginner expertise → learningCurve × 2.5
  - Fast timeToMarket → setupSpeed × 2.5

**calculateScores(options, weights):**
- Input: options array, weights object
- Output: { optionName: score }
- Formula: (capability1 × weight1 + ... + capability4 × weight4) / sum(weights)
- Normalize to 0-5 scale, round to 1 decimal

**extractProsAndCons(options):**
- Input: options array
- Output: { optionName: { pros, cons, bestFor } }
- Simply extract from option data

**detectTradeoffs(options):**
- Input: options array
- Output: array of trade-off strings
- Logic: Compare pairs, find differences ≥2 points
  - Cost vs Scalability
  - Simplicity vs Power
  - Speed vs Long-term Growth

**generateRecommendation(options, scores, constraints):**
- Input: options, scores, constraints
- Output: recommendation string
- Logic:
  - If score difference < 0.5: "Both are excellent, choose based on..."
  - If score difference ≥ 0.5: "X scores higher because..., but Y might be better if..."
  - NEVER declare single "best"

**explainReasoning(constraints, weights):**
- Input: constraints, weights
- Output: reasoning string
- Explain how each constraint influenced weights

**analyze(category, selectedOptions, constraints):**
- Orchestrates all methods
- Returns complete analysis object

#### 6. allCategories.js (Data Store)
**Purpose:** Store all category and option data

**Structure:**
```javascript
{
  'category-id': {
    id: string,
    category: string,
    title: string,
    description: string,
    icon: string,
    options: [
      {
        name: string,
        description: string,
        costEfficiency: 1-5,
        scalability: 1-5,
        easeOfUse: 1-5,
        timeToMarket: 1-5,
        strengths: string[],
        weaknesses: string[],
        bestFor: string[]
      }
    ]
  }
}
```

**Categories:**
1. programming-languages (6 options)
2. backend-frameworks (5 options)
3. frontend-frameworks (4 options)
4. databases (5 options)
5. cloud-providers (4 options)
6. devops-deployment (4 options)
7. api-architectures (3 options)
8. authentication (4 options)
9. learning-paths (3 options)
10. (Additional categories as needed)

## Data Models

### Category Model
```javascript
{
  id: string,              // kebab-case identifier
  category: string,        // Display name
  title: string,           // Page title
  description: string,     // Brief description
  icon: string,            // Emoji icon
  optionCount: number      // Number of options (computed)
}
```

### Option Model
```javascript
{
  name: string,            // Display name
  description: string,     // Brief description
  costEfficiency: number,  // 1-5 scale
  scalability: number,     // 1-5 scale
  easeOfUse: number,       // 1-5 scale
  timeToMarket: number,    // 1-5 scale
  strengths: string[],     // Array of strength descriptions
  weaknesses: string[],    // Array of weakness descriptions
  bestFor: string[]        // Array of use case descriptions
}
```

### Constraints Model
```javascript
{
  budget: 'low' | 'medium' | 'high',
  scale: 'small' | 'growing' | 'enterprise',
  expertise: 'beginner' | 'intermediate' | 'advanced',
  timeToMarket: 'fast' | 'moderate' | 'flexible'
}
```

### Comparison Request Model
```javascript
{
  category: string,        // Category ID
  selectedOptions: string[], // Array of option names
  constraints: Constraints   // User constraints
}
```

### Comparison Result Model
```javascript
{
  title: string,           // Category title
  result: {
    options: Option[],     // Full option objects
    scores: {              // Scores by option name
      [optionName]: number
    },
    tradeoffs: string[],   // Trade-off explanations
    recommendation: string, // Contextual recommendation
    reasoning: string      // Constraint influence explanation
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Score Normalization
*For any* set of options and constraints, all calculated scores should be between 0 and 5 (inclusive) and rounded to exactly 1 decimal place.
**Validates: Requirements 3.6, 3.7, 3.8**

### Property 2: Constraint Weight Application
*For any* constraint set to an extreme value (low budget, enterprise scale, beginner expertise, fast timeToMarket), the corresponding weight multiplier should be at least 2.0x the base weight.
**Validates: Requirements 3.2, 3.3, 3.4, 3.5**

### Property 3: Minimum Option Selection
*For any* comparison request with fewer than 2 selected options, the system should reject the request and display an error message.
**Validates: Requirements 2.3**

### Property 4: Score Ordering
*For any* comparison result, options in the score table should be sorted in descending order by score (highest first).
**Validates: Requirements 4.3**

### Property 5: Trade-off Detection Threshold
*For any* pair of options, a trade-off should only be detected when the capability difference is at least 2 points on the 1-5 scale.
**Validates: Requirements 6.2, 6.3, 6.4**

### Property 6: No Single Winner Declaration
*For any* generated recommendation, the text should never contain phrases like "best option", "winner", "top choice" without conditional language (e.g., "if X, then Y").
**Validates: Requirements 7.2**

### Property 7: Constraint Consistency
*For any* category, all options should be evaluated using exactly 4 capability scores: costEfficiency, scalability, easeOfUse, and timeToMarket.
**Validates: Requirements 15.1, 15.5**

### Property 8: Download File Completeness
*For any* comparison result, the downloaded text file should contain all sections: header, score summary, detailed analysis, recommendation, and trade-offs.
**Validates: Requirements 9.3**

### Property 9: API Response Structure
*For any* successful comparison request, the API response should contain a result object with exactly 5 properties: options, scores, tradeoffs, recommendation, and reasoning.
**Validates: Requirements 12.4**

### Property 10: View State Synchronization
*For any* navigation action, the internal view state and external view state should remain synchronized.
**Validates: Requirements 10.5**

## Error Handling

### Frontend Error Handling

**API Communication Errors:**
- Network failures → Display "Connection error. Please check your internet connection."
- 404 errors → Display "Category not found. Please try another category."
- 500 errors → Display "Server error. Please try again later."
- Timeout → Display "Request timed out. Please try again."

**Validation Errors:**
- Fewer than 2 options selected → Display "Please select at least 2 options to compare."
- Missing constraints → Disable submit button, show validation message

**State Errors:**
- Failed to load categories → Display error notification with retry option
- Failed to load category options → Return to categories with error message

**Error Display:**
- Use fixed-position notification (bottom-right)
- Red background (red-900/95) with red border
- Dismiss button to close
- Auto-dismiss after 5 seconds (optional)

### Backend Error Handling

**Request Validation:**
- Missing category → 400 Bad Request
- Missing selectedOptions → 400 Bad Request
- Missing constraints → 400 Bad Request
- Invalid category ID → 404 Not Found

**Data Errors:**
- Category not found → 404 Not Found
- Option not found → 400 Bad Request with message

**Server Errors:**
- Calculation errors → 500 Internal Server Error
- Unexpected errors → 500 Internal Server Error
- Log all errors to console with stack trace

**Error Response Format:**
```javascript
{
  error: string,  // Human-readable error message
  code: string    // Error code (optional)
}
```

## Testing Strategy

### Unit Testing

**Frontend Components:**
- Test each component renders correctly with props
- Test user interactions (clicks, form submissions)
- Test state updates and side effects
- Test error states and loading states

**Backend Functions:**
- Test Decision Engine methods with various inputs
- Test constraint weight calculations
- Test score calculations with edge cases
- Test trade-off detection logic
- Test recommendation generation

**API Endpoints:**
- Test successful requests return correct data
- Test validation errors return 400
- Test not found errors return 404
- Test server errors return 500

### Property-Based Testing

Use a property-based testing library (e.g., fast-check for JavaScript) to verify universal properties across many generated inputs.

**Configuration:**
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: **Feature: refereeai-comparison-system, Property {number}: {property_text}**

**Property Tests:**

1. **Score Normalization Property**
   - Generate random options and constraints
   - Calculate scores
   - Assert all scores are 0 ≤ score ≤ 5
   - Assert all scores have exactly 1 decimal place

2. **Constraint Weight Property**
   - Generate random extreme constraints
   - Calculate weights
   - Assert extreme constraint weights ≥ 2.0x base weight

3. **Minimum Selection Property**
   - Generate comparison requests with 0-1 options
   - Assert all are rejected with error

4. **Score Ordering Property**
   - Generate random comparison results
   - Assert options are sorted by score descending

5. **Trade-off Threshold Property**
   - Generate random option pairs
   - Calculate capability differences
   - Assert trade-offs only detected when diff ≥ 2

6. **No Winner Declaration Property**
   - Generate random comparison results
   - Generate recommendations
   - Assert no absolute "best" language without conditions

7. **Constraint Consistency Property**
   - For all categories and options
   - Assert exactly 4 capability scores present

8. **Download Completeness Property**
   - Generate random comparison results
   - Generate download file
   - Assert all required sections present

9. **API Response Structure Property**
   - Generate random valid comparison requests
   - Assert response has exactly 5 result properties

10. **View Sync Property**
    - Generate random navigation sequences
    - Assert internal and external view states match

### Integration Testing

**End-to-End Flows:**
1. Load categories → Select category → Submit comparison → View results
2. View results → Download report → Verify file contents
3. View results → New comparison → Verify form state
4. View results → Browse categories → Verify state reset

**API Integration:**
- Test frontend API service communicates correctly with backend
- Test error handling across frontend-backend boundary
- Test loading states during API calls

### Manual Testing

**Visual Testing:**
- Verify sparkles animation renders correctly
- Verify responsive layouts on different screen sizes
- Verify hover effects and transitions
- Verify color gradients and shadows

**User Flow Testing:**
- Complete full comparison flow as a user
- Test navigation between all views
- Test error scenarios (network failures, invalid inputs)
- Test download functionality

**Browser Compatibility:**
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

**Frontend:**
- Lazy load components where possible
- Memoize expensive calculations
- Debounce user inputs
- Use React.memo for pure components

**Backend:**
- In-memory data store (no database queries)
- Calculations complete in < 100ms
- No external API calls
- Stateless server (horizontal scaling possible)

**Network:**
- Minimize API payload sizes
- Use compression (gzip)
- Implement request caching where appropriate

**Rendering:**
- Use CSS transforms for animations (GPU-accelerated)
- Avoid layout thrashing
- Optimize particle count for performance (100 particles)

## Security Considerations

**Frontend:**
- Sanitize user inputs before display
- Use HTTPS in production
- Implement CSP headers
- No sensitive data in localStorage

**Backend:**
- Helmet middleware for security headers
- CORS configured for specific origins
- Input validation on all endpoints
- Rate limiting (future enhancement)
- No SQL injection risk (no database)

**Data:**
- No user authentication (no user data stored)
- No PII collected
- All data is public (comparison options)

## Deployment Considerations

**Development:**
- Frontend: `npm start` (port 3000)
- Backend: `npm start` (port 5000)
- Proxy configured in client/package.json

**Production:**
- Build frontend: `npm run build`
- Serve static files from Express
- Use environment variables for configuration
- Deploy to cloud platform (Heroku, Vercel, AWS)

**Environment Variables:**
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment (development | production)
- `FRONTEND_URL`: Frontend URL for CORS (production)

## Future Enhancements

1. **User Accounts**: Save comparison history
2. **Custom Categories**: User-generated comparison templates
3. **Community Voting**: Crowdsource option ratings
4. **Real-time Pricing**: Integrate with pricing APIs
5. **Team Collaboration**: Share comparisons with team
6. **Export Formats**: PDF, CSV, JSON exports
7. **Multi-language**: i18n support
8. **Mobile App**: React Native version
9. **AI Recommendations**: ML-based personalization
10. **Comparison Analytics**: Track popular comparisons
