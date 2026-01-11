import React from 'react';

const DetailedComparison = ({ options, scores }) => {
  // Sort options by score
  const sortedOptions = options
    .map((opt) => {
      const optionName = typeof opt === 'string' ? opt : opt.name;
      const optionData = typeof opt === 'string' ? null : opt;
      const score = typeof scores === 'object' && !Array.isArray(scores) 
        ? (scores[optionName] || 0)
        : 0;
      
      return {
        name: optionName,
        data: optionData,
        score: score
      };
    })
    .sort((a, b) => b.score - a.score);

  return React.createElement('section', {
    className: 'w-full space-y-12'
  }, [
    // Section Header
    React.createElement('div', {
      key: 'header',
      className: 'text-center'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-3xl font-bold text-white mb-4'
      }, 'Detailed Option Analysis'),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-lg text-gray-400'
      }, 'In-depth breakdown of strengths, weaknesses, and best use cases')
    ]),

    // Detailed Cards for Each Option
    React.createElement('div', {
      key: 'options',
      className: 'space-y-8'
    }, sortedOptions.map((option, index) => {
      if (!option.data) return null;
      
      return React.createElement('div', {
        key: option.name,
        className: `bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 rounded-2xl p-8 ${
          index === 0 ? 'border-indigo-500/50 ring-2 ring-indigo-500/20' : 'border-white/10'
        }`
      }, [
        // Option Header
        React.createElement('div', {
          key: 'header',
          className: 'flex items-center justify-between mb-6 pb-6 border-b border-white/10'
        }, [
          React.createElement('div', {
            key: 'info',
            className: 'flex-1'
          }, [
            React.createElement('h4', {
              key: 'name',
              className: 'text-2xl font-bold text-white mb-2'
            }, option.name),
            React.createElement('p', {
              key: 'description',
              className: 'text-base text-gray-400'
            }, option.data.description)
          ]),
          React.createElement('div', {
            key: 'score',
            className: `px-6 py-3 rounded-xl text-xl font-bold ${
              option.score >= 4 
                ? 'bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 text-emerald-400 border-2 border-emerald-500/50'
                : option.score >= 3
                ? 'bg-gradient-to-br from-amber-500/30 to-amber-600/30 text-amber-400 border-2 border-amber-500/50'
                : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-400 border-2 border-gray-500/30'
            }`
          }, `${option.score.toFixed(1)}/5`)
        ]),

        // Content Grid
        React.createElement('div', {
          key: 'content',
          className: 'grid md:grid-cols-2 gap-8'
        }, [
          // Strengths Column
          React.createElement('div', {
            key: 'strengths',
            className: 'space-y-4'
          }, [
            React.createElement('div', {
              key: 'header',
              className: 'flex items-center mb-4'
            }, [
              React.createElement('div', {
                key: 'icon',
                className: 'w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/30'
              }, React.createElement('span', {
                className: 'text-xl'
              }, '✓')),
              React.createElement('h5', {
                key: 'title',
                className: 'text-xl font-bold text-emerald-400'
              }, 'Strengths')
            ]),
            React.createElement('ul', {
              key: 'list',
              className: 'space-y-3'
            }, (option.data.strengths || []).map((strength, idx) =>
              React.createElement('li', {
                key: idx,
                className: 'flex items-start bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/20'
              }, [
                React.createElement('span', {
                  key: 'bullet',
                  className: 'text-emerald-400 mr-3 mt-0.5 flex-shrink-0 font-bold'
                }, '•'),
                React.createElement('span', {
                  key: 'text',
                  className: 'text-gray-300 text-sm leading-relaxed'
                }, strength)
              ])
            ))
          ]),

          // Weaknesses Column
          React.createElement('div', {
            key: 'weaknesses',
            className: 'space-y-4'
          }, [
            React.createElement('div', {
              key: 'header',
              className: 'flex items-center mb-4'
            }, [
              React.createElement('div', {
                key: 'icon',
                className: 'w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-amber-500/30'
              }, React.createElement('span', {
                className: 'text-xl'
              }, '⚠')),
              React.createElement('h5', {
                key: 'title',
                className: 'text-xl font-bold text-amber-400'
              }, 'Considerations')
            ]),
            React.createElement('ul', {
              key: 'list',
              className: 'space-y-3'
            }, (option.data.weaknesses || []).map((weakness, idx) =>
              React.createElement('li', {
                key: idx,
                className: 'flex items-start bg-amber-500/5 rounded-lg p-3 border border-amber-500/20'
              }, [
                React.createElement('span', {
                  key: 'bullet',
                  className: 'text-amber-400 mr-3 mt-0.5 flex-shrink-0 font-bold'
                }, '•'),
                React.createElement('span', {
                  key: 'text',
                  className: 'text-gray-300 text-sm leading-relaxed'
                }, weakness)
              ])
            ))
          ])
        ]),

        // Best For Section
        React.createElement('div', {
          key: 'bestfor',
          className: 'mt-8 pt-8 border-t border-white/10'
        }, [
          React.createElement('div', {
            key: 'header',
            className: 'flex items-center mb-4'
          }, [
            React.createElement('div', {
              key: 'icon',
              className: 'w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/30'
            }, React.createElement('span', {
              className: 'text-xl'
            }, '🎯')),
            React.createElement('h5', {
              key: 'title',
              className: 'text-xl font-bold text-indigo-400'
            }, 'Best Suited For')
          ]),
          React.createElement('ul', {
            key: 'list',
            className: 'grid md:grid-cols-2 gap-3'
          }, (option.data.bestFor || []).map((use, idx) =>
            React.createElement('li', {
              key: idx,
              className: 'flex items-start bg-indigo-500/5 rounded-lg p-3 border border-indigo-500/20'
            }, [
              React.createElement('span', {
                key: 'bullet',
                className: 'text-indigo-400 mr-3 mt-0.5 flex-shrink-0'
              }, '→'),
              React.createElement('span', {
                key: 'text',
                className: 'text-gray-300 text-sm leading-relaxed'
              }, use)
            ])
          ))
        ])
      ]);
    }))
  ]);
};

export default DetailedComparison;
