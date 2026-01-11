/**
 * RefereeAI - Main Application Logic
 * Handles UI interactions and state management
 */

// Application State
const AppState = {
  selectedCategory: null,
  selectedOptions: [],
  constraints: {
    budget: '',
    scale: '',
    expertise: '',
    timeToMarket: ''
  },
  results: null
};

// DOM Elements
const elements = {
  hero: document.getElementById('hero'),
  categoriesSection: document.getElementById('categories'),
  optionsSection: document.getElementById('options'),
  resultsSection: document.getElementById('results'),
  howItWorksSection: document.getElementById('how-it-works'),
  categoryGrid: document.getElementById('category-grid'),
  categoryTitle: document.getElementById('category-title'),
  categoryDescription: document.getElementById('category-description'),
  optionsGrid: document.getElementById('options-grid'),
  optionsError: document.getElementById('options-error'),
  constraintsError: document.getElementById('constraints-error'),
  compareButton: document.getElementById('compare-button'),
  scoresTable: document.getElementById('scores-table'),
  detailedAnalysis: document.getElementById('detailed-analysis'),
  recommendation: document.getElementById('recommendation'),
  tradeoffs: document.getElementById('tradeoffs'),
  reasoning: document.getElementById('reasoning')
};

// Initialize app
function init() {
  renderCategories();
  attachEventListeners();
}

// Render categories grid
function renderCategories() {
  elements.categoryGrid.innerHTML = '';
  
  Object.values(CATEGORIES).forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.categoryId = category.id;
    
    card.innerHTML = `
      <div class="category-icon">${category.icon}</div>
      <h3 class="category-name">${category.category}</h3>
      <p class="category-description">${category.description}</p>
      <p class="category-count">${category.options.length} options</p>
    `;
    
    card.addEventListener('click', () => selectCategory(category.id));
    elements.categoryGrid.appendChild(card);
  });
}

// Select a category
function selectCategory(categoryId) {
  AppState.selectedCategory = categoryId;
  AppState.selectedOptions = [];
  
  const category = CATEGORIES[categoryId];
  elements.categoryTitle.textContent = category.title;
  elements.categoryDescription.textContent = category.description;
  
  renderOptions(category.options);
  showSection('options');
}

// Render options for selected category
function renderOptions(options) {
  elements.optionsGrid.innerHTML = '';
  
  options.forEach(option => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.dataset.optionName = option.name;
    
    card.innerHTML = `
      <input type="checkbox" class="option-checkbox" id="opt-${option.name.replace(/\s+/g, '-')}">
      <h4 class="option-name">${option.name}</h4>
      <p class="option-description">${option.description}</p>
    `;
    
    const checkbox = card.querySelector('.option-checkbox');
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        card.classList.add('selected');
        AppState.selectedOptions.push(option);
      } else {
        card.classList.remove('selected');
        AppState.selectedOptions = AppState.selectedOptions.filter(opt => opt.name !== option.name);
      }
      validateForm();
    });
    
    card.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
    
    elements.optionsGrid.appendChild(card);
  });
}

// Validate form and enable/disable compare button
function validateForm() {
  const optionsValid = AppState.selectedOptions.length >= 2;
  const constraintsValid = 
    AppState.constraints.budget &&
    AppState.constraints.scale &&
    AppState.constraints.expertise &&
    AppState.constraints.timeToMarket;
  
  if (!optionsValid) {
    elements.optionsError.classList.remove('hidden');
  } else {
    elements.optionsError.classList.add('hidden');
  }
  
  if (constraintsValid) {
    elements.constraintsError.classList.add('hidden');
  }
  
  elements.compareButton.disabled = !(optionsValid && constraintsValid);
}

// Handle compare button click
function handleCompare() {
  const optionsValid = AppState.selectedOptions.length >= 2;
  const constraintsValid = 
    AppState.constraints.budget &&
    AppState.constraints.scale &&
    AppState.constraints.expertise &&
    AppState.constraints.timeToMarket;
  
  if (!optionsValid) {
    elements.optionsError.classList.remove('hidden');
    return;
  }
  
  if (!constraintsValid) {
    elements.constraintsError.classList.remove('hidden');
    return;
  }
  
  // Run analysis
  AppState.results = DecisionEngine.analyze(
    AppState.selectedCategory,
    AppState.selectedOptions,
    AppState.constraints
  );
  
  renderResults();
  showSection('results');
}

// Render results
function renderResults() {
  const { scores, prosAndCons, tradeoffs, recommendation, reasoning } = AppState.results;
  
  // Render scores
  renderScores(scores);
  
  // Render detailed analysis
  renderDetailedAnalysis(prosAndCons, scores);
  
  // Render recommendation
  elements.recommendation.textContent = recommendation;
  
  // Render trade-offs
  renderTradeoffs(tradeoffs);
  
  // Render reasoning
  elements.reasoning.textContent = reasoning;
}

// Render scores table
function renderScores(scores) {
  elements.scoresTable.innerHTML = '';
  
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);
  
  // Create comparison table
  const table = document.createElement('div');
  table.className = 'comparison-table';
  
  // Table header
  const header = document.createElement('div');
  header.className = 'table-header';
  header.innerHTML = `
    <div class="table-cell header-cell">Rank</div>
    <div class="table-cell header-cell">Option</div>
    <div class="table-cell header-cell">Score</div>
    <div class="table-cell header-cell">Rating</div>
  `;
  table.appendChild(header);
  
  // Table rows
  sortedScores.forEach(([name, score], index) => {
    const row = document.createElement('div');
    row.className = 'table-row';
    if (index === 0) {
      row.classList.add('top-row');
    }
    
    const stars = '⭐'.repeat(Math.round(score));
    const rankBadge = index === 0 ? '🏆' : `#${index + 1}`;
    
    row.innerHTML = `
      <div class="table-cell rank-cell">${rankBadge}</div>
      <div class="table-cell name-cell">${name}</div>
      <div class="table-cell score-cell">${score}/5</div>
      <div class="table-cell stars-cell">${stars}</div>
    `;
    
    table.appendChild(row);
  });
  
  elements.scoresTable.appendChild(table);
}

// Render detailed analysis
function renderDetailedAnalysis(prosAndCons, scores) {
  elements.detailedAnalysis.innerHTML = '';
  
  // Create cards grid
  const grid = document.createElement('div');
  grid.className = 'analysis-grid';
  
  Object.entries(prosAndCons).forEach(([name, data]) => {
    const card = document.createElement('div');
    card.className = 'analysis-card';
    
    card.innerHTML = `
      <div class="analysis-card-header">
        <h4 class="analysis-card-title">${name}</h4>
        <div class="analysis-card-score">
          <span class="score-badge">${scores[name]}</span>
          <span class="score-label">/5</span>
        </div>
      </div>
      
      <div class="analysis-card-body">
        <div class="analysis-section">
          <div class="section-header">
            <span class="section-icon">✓</span>
            <h5 class="section-title">Strengths</h5>
          </div>
          <ul class="analysis-list strengths">
            ${data.pros.map(pro => `<li>${pro}</li>`).join('')}
          </ul>
        </div>
        
        <div class="analysis-section">
          <div class="section-header">
            <span class="section-icon">⚠</span>
            <h5 class="section-title">Weaknesses</h5>
          </div>
          <ul class="analysis-list weaknesses">
            ${data.cons.map(con => `<li>${con}</li>`).join('')}
          </ul>
        </div>
        
        <div class="analysis-section">
          <div class="section-header">
            <span class="section-icon">→</span>
            <h5 class="section-title">Best For</h5>
          </div>
          <ul class="analysis-list best-for">
            ${data.bestFor.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    grid.appendChild(card);
  });
  
  elements.detailedAnalysis.appendChild(grid);
}

// Render trade-offs
function renderTradeoffs(tradeoffs) {
  elements.tradeoffs.innerHTML = '';
  
  tradeoffs.forEach(tradeoff => {
    const item = document.createElement('div');
    item.className = 'tradeoff-item';
    item.textContent = tradeoff;
    elements.tradeoffs.appendChild(item);
  });
}

// Show specific section
function showSection(sectionName) {
  // Hide all sections
  elements.hero.classList.add('hidden');
  elements.categoriesSection.classList.add('hidden');
  elements.optionsSection.classList.add('hidden');
  elements.resultsSection.classList.add('hidden');
  elements.howItWorksSection.classList.add('hidden');
  
  // Show requested section
  switch (sectionName) {
    case 'categories':
      elements.hero.classList.remove('hidden');
      elements.categoriesSection.classList.remove('hidden');
      elements.howItWorksSection.classList.remove('hidden');
      break;
    case 'options':
      elements.optionsSection.classList.remove('hidden');
      break;
    case 'results':
      elements.resultsSection.classList.remove('hidden');
      break;
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download results as text file
function downloadResults() {
  if (!AppState.results) return;
  
  const { scores, prosAndCons, tradeoffs, recommendation, reasoning } = AppState.results;
  const category = CATEGORIES[AppState.selectedCategory];
  
  let content = `RefereeAI Comparison Report\n`;
  content += `${'='.repeat(50)}\n\n`;
  content += `Category: ${category.category}\n`;
  content += `Date: ${new Date().toLocaleDateString()}\n\n`;
  
  content += `SCORES\n${'-'.repeat(50)}\n`;
  Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .forEach(([name, score]) => {
      content += `${name}: ${score}/5\n`;
    });
  
  content += `\n\nRECOMMENDATION\n${'-'.repeat(50)}\n`;
  content += `${recommendation}\n`;
  
  content += `\n\nTRADE-OFFS\n${'-'.repeat(50)}\n`;
  tradeoffs.forEach(tradeoff => {
    content += `${tradeoff}\n`;
  });
  
  content += `\n\nDETAILED ANALYSIS\n${'-'.repeat(50)}\n`;
  Object.entries(prosAndCons).forEach(([name, data]) => {
    content += `\n${name} (Score: ${scores[name]})\n`;
    content += `\nStrengths:\n`;
    data.pros.forEach(pro => content += `  • ${pro}\n`);
    content += `\nWeaknesses:\n`;
    data.cons.forEach(con => content += `  • ${con}\n`);
    content += `\nBest For:\n`;
    data.bestFor.forEach(item => content += `  • ${item}\n`);
  });
  
  content += `\n\nHOW WE COMPARED\n${'-'.repeat(50)}\n`;
  content += `${reasoning}\n`;
  
  // Create and download file
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `refereeai-comparison-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Attach event listeners
function attachEventListeners() {
  // Constraint selects
  document.getElementById('budget').addEventListener('change', (e) => {
    AppState.constraints.budget = e.target.value;
    validateForm();
  });
  
  document.getElementById('scale').addEventListener('change', (e) => {
    AppState.constraints.scale = e.target.value;
    validateForm();
  });
  
  document.getElementById('expertise').addEventListener('change', (e) => {
    AppState.constraints.expertise = e.target.value;
    validateForm();
  });
  
  document.getElementById('timeToMarket').addEventListener('change', (e) => {
    AppState.constraints.timeToMarket = e.target.value;
    validateForm();
  });
  
  // Compare button
  elements.compareButton.addEventListener('click', handleCompare);
  
  // Navigation buttons
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      
      switch (action) {
        case 'show-categories':
        case 'back-to-categories':
          showSection('categories');
          break;
        case 'show-how-it-works':
          document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
          break;
        case 'back-to-options':
          showSection('options');
          break;
        case 'download-results':
          downloadResults();
          break;
        case 'new-comparison':
          // Reset state
          AppState.selectedOptions = [];
          AppState.constraints = {
            budget: '',
            scale: '',
            expertise: '',
            timeToMarket: ''
          };
          // Reset form
          document.querySelectorAll('.constraint-select').forEach(select => {
            select.value = '';
          });
          document.querySelectorAll('.option-checkbox').forEach(checkbox => {
            checkbox.checked = false;
          });
          document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
          });
          validateForm();
          showSection('options');
          break;
      }
    });
  });
  
  // Logo click
  document.querySelector('.logo').addEventListener('click', () => {
    showSection('categories');
  });
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
