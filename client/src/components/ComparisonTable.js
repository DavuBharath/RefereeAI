import React from 'react';

const ComparisonTable = ({ options, scores }) => {
  const getScoreColor = (score) => {
    if (score >= 4) return 'text-emerald-400 bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border-emerald-500/50 shadow-lg shadow-emerald-500/20';
    if (score >= 3) return 'text-amber-400 bg-gradient-to-br from-amber-500/30 to-amber-600/30 border-amber-500/50 shadow-lg shadow-amber-500/20';
    return 'text-gray-400 bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  const getProgressColor = (score) => {
    if (score >= 4) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (score >= 3) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  // Handle both formats: scores can be an object {optionName: score} or array [score1, score2]
  const sortedOptions = options.map((opt) => {
    const optionName = typeof opt === 'string' ? opt : opt.name;
    // If scores is an object, use the option name as key; if array, this won't work well
    const score = typeof scores === 'object' && !Array.isArray(scores) 
      ? (scores[optionName] || 0)
      : 0;
    
    return {
      name: optionName,
      score: score
    };
  }).sort((a, b) => b.score - a.score);

  return React.createElement('div', {
    className: 'space-y-12'
  }, [
    // Score Summary - Comparison Cards - Centered
    React.createElement('section', {
      key: 'scores',
      className: 'w-full'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-3xl font-bold text-white mb-8 text-center'
      }, 'Score Summary'),
      React.createElement('div', {
        key: 'grid',
        className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
      }, sortedOptions.map((option, index) =>
        React.createElement('div', {
          key: option.name,
          className: `bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
            index === 0 ? 'border-indigo-500/50 ring-4 ring-indigo-500/20 shadow-2xl shadow-indigo-500/30' : 'border-white/10 hover:border-white/20'
          }`
        }, [
          React.createElement('div', {
            key: 'header',
            className: 'flex items-start justify-between mb-6'
          }, [
            React.createElement('h4', {
              key: 'name',
              className: 'font-bold text-white text-xl'
            }, option.name),
            React.createElement('span', {
              key: 'score',
              className: `px-4 py-2 rounded-xl text-base font-bold border-2 ${getScoreColor(option.score)}`
            }, `${(option.score || 0).toFixed(1)}/5`)
          ]),
          React.createElement('div', {
            key: 'progress',
            className: 'mb-6'
          }, React.createElement('div', {
            className: 'h-3 bg-white/10 rounded-full overflow-hidden'
          }, React.createElement('div', {
            className: `h-full ${getProgressColor(option.score)} transition-all duration-1000`,
            style: { width: `${(option.score / 5) * 100}%` }
          }))),
          index === 0 && React.createElement('div', {
            key: 'badge',
            className: 'inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 text-indigo-300 rounded-xl text-sm font-semibold border border-indigo-500/30'
          }, '⭐ Strong fit for your constraints')
        ])
      ))
    ])
  ]);
};

export default ComparisonTable;
