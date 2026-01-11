import React from 'react';

const ComparisonResult = ({ result, onNewComparison, onBackToTemplates }) => {
  const { comparison, template } = result;
  const { scores, recommendation, tradeOffs, reasoning } = comparison.result;

  // Convert scores Map to array for sorting
  const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a);

  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-600 bg-green-100';
    if (score >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreBar = (score) => {
    const percentage = (score / 5) * 100;
    const color = score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-yellow-500' : 'bg-red-500';
    return React.createElement('div', {
      className: 'w-full bg-gray-200 rounded-full h-2'
    }, React.createElement('div', {
      className: `${color} h-2 rounded-full transition-all duration-500`,
      style: { width: `${percentage}%` }
    }));
  };

  return React.createElement('div', {
    className: 'max-w-6xl mx-auto'
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      className: 'text-center mb-8'
    }, [
      React.createElement('div', {
        key: 'icon',
        className: 'text-6xl mb-4'
      }, '🎯'),
      React.createElement('h2', {
        key: 'title',
        className: 'text-3xl font-bold text-gray-800 mb-2'
      }, 'Comparison Results'),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-gray-600'
      }, `Analysis for: ${template.title}`)
    ]),

    // Scores Overview
    React.createElement('div', {
      key: 'scores',
      className: 'bg-white rounded-lg shadow-sm border p-6 mb-8'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-gray-800 mb-6'
      }, 'Overall Scores'),
      React.createElement('div', {
        key: 'grid',
        className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
      }, sortedScores.map(([optionName, score], index) =>
        React.createElement('div', {
          key: optionName,
          className: `border rounded-lg p-4 ${index === 0 ? 'border-primary-300 bg-primary-50' : 'border-gray-200'}`
        }, [
          React.createElement('div', {
            key: 'header',
            className: 'flex items-center justify-between mb-3'
          }, [
            React.createElement('h4', {
              key: 'name',
              className: 'font-medium text-gray-800'
            }, optionName),
            React.createElement('span', {
              key: 'score',
              className: `px-2 py-1 rounded text-sm font-medium ${getScoreColor(score)}`
            }, `${score}/5`)
          ]),
          React.createElement('div', {
            key: 'bar',
            className: 'mb-2'
          }, getScoreBar(score)),
          index === 0 && React.createElement('div', {
            key: 'badge',
            className: 'text-xs text-primary-600 font-medium'
          }, '🏆 Best Match')
        ])
      ))
    ]),

    // Detailed Comparison Table
    React.createElement('div', {
      key: 'table',
      className: 'bg-white rounded-lg shadow-sm border p-6 mb-8'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-gray-800 mb-6'
      }, 'Detailed Comparison'),
      React.createElement('div', {
        key: 'overflow',
        className: 'overflow-x-auto'
      }, React.createElement('table', {
        className: 'w-full'
      }, [
        React.createElement('thead', {
          key: 'head'
        }, React.createElement('tr', {
          className: 'border-b'
        }, [
          React.createElement('th', {
            key: 'option',
            className: 'text-left py-3 px-4 font-medium text-gray-800'
          }, 'Option'),
          React.createElement('th', {
            key: 'strengths',
            className: 'text-left py-3 px-4 font-medium text-gray-800'
          }, 'Key Strengths'),
          React.createElement('th', {
            key: 'weaknesses',
            className: 'text-left py-3 px-4 font-medium text-gray-800'
          }, 'Considerations'),
          React.createElement('th', {
            key: 'best-for',
            className: 'text-left py-3 px-4 font-medium text-gray-800'
          }, 'Best For')
        ])),
        React.createElement('tbody', {
          key: 'body'
        }, template.options.map(option =>
          React.createElement('tr', {
            key: option.name,
            className: 'border-b hover:bg-gray-50'
          }, [
            React.createElement('td', {
              key: 'name',
              className: 'py-4 px-4'
            }, [
              React.createElement('div', {
                key: 'name-score',
                className: 'font-medium text-gray-800'
              }, option.name),
              React.createElement('div', {
                key: 'score',
                className: 'text-sm text-gray-600'
              }, `Score: ${scores[option.name]}/5`)
            ]),
            React.createElement('td', {
              key: 'strengths',
              className: 'py-4 px-4'
            }, React.createElement('ul', {
              className: 'text-sm text-gray-600 space-y-1'
            }, option.strengths.slice(0, 3).map((strength, idx) =>
              React.createElement('li', {
                key: idx,
                className: 'flex items-start'
              }, [
                React.createElement('span', {
                  key: 'bullet',
                  className: 'text-green-500 mr-1'
                }, '✓'),
                React.createElement('span', { key: 'text' }, strength)
              ])
            ))),
            React.createElement('td', {
              key: 'weaknesses',
              className: 'py-4 px-4'
            }, React.createElement('ul', {
              className: 'text-sm text-gray-600 space-y-1'
            }, option.weaknesses.slice(0, 3).map((weakness, idx) =>
              React.createElement('li', {
                key: idx,
                className: 'flex items-start'
              }, [
                React.createElement('span', {
                  key: 'bullet',
                  className: 'text-orange-500 mr-1'
                }, '⚠'),
                React.createElement('span', { key: 'text' }, weakness)
              ])
            ))),
            React.createElement('td', {
              key: 'best-for',
              className: 'py-4 px-4'
            }, React.createElement('ul', {
              className: 'text-sm text-gray-600 space-y-1'
            }, option.bestFor.slice(0, 2).map((use, idx) =>
              React.createElement('li', {
                key: idx,
                className: 'flex items-start'
              }, [
                React.createElement('span', {
                  key: 'bullet',
                  className: 'text-blue-500 mr-1'
                }, '→'),
                React.createElement('span', { key: 'text' }, use)
              ])
            )))
          ])
        ))
      ]))
    ]),

    // Recommendation
    React.createElement('div', {
      key: 'recommendation',
      className: 'bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-blue-800 mb-4 flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '💡'),
        React.createElement('span', { key: 'text' }, 'Our Recommendation')
      ]),
      React.createElement('div', {
        key: 'content',
        className: 'prose prose-blue max-w-none'
      }, recommendation.split('\n').map((paragraph, idx) =>
        paragraph.trim() && React.createElement('p', {
          key: idx,
          className: 'text-blue-700 mb-3'
        }, paragraph.trim())
      ))
    ]),

    // Trade-offs
    tradeOffs.length > 0 && React.createElement('div', {
      key: 'tradeoffs',
      className: 'bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-yellow-800 mb-4 flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '⚖️'),
        React.createElement('span', { key: 'text' }, 'Key Trade-offs to Consider')
      ]),
      React.createElement('ul', {
        key: 'list',
        className: 'space-y-2'
      }, tradeOffs.map((tradeOff, idx) =>
        React.createElement('li', {
          key: idx,
          className: 'text-yellow-700 flex items-start'
        }, [
          React.createElement('span', {
            key: 'bullet',
            className: 'mr-2 mt-1'
          }, '•'),
          React.createElement('span', { key: 'text' }, tradeOff)
        ])
      ))
    ]),

    // Reasoning
    React.createElement('div', {
      key: 'reasoning',
      className: 'bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-gray-800 mb-4 flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '🧠'),
        React.createElement('span', { key: 'text' }, 'How We Analyzed This')
      ]),
      React.createElement('div', {
        key: 'content',
        className: 'text-gray-700'
      }, reasoning.split('\n').map((line, idx) =>
        line.trim() && React.createElement('p', {
          key: idx,
          className: 'mb-2'
        }, line.trim())
      ))
    ]),

    // Actions
    React.createElement('div', {
      key: 'actions',
      className: 'flex justify-center space-x-4'
    }, [
      React.createElement('button', {
        key: 'new',
        onClick: onNewComparison,
        className: 'bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 font-medium'
      }, 'Compare Different Options'),
      React.createElement('button', {
        key: 'back',
        onClick: onBackToTemplates,
        className: 'bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 font-medium'
      }, 'Browse All Categories')
    ])
  ]);
};

export default ComparisonResult;