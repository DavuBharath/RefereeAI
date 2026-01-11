import React from 'react';

const TradeoffExplanation = ({ tradeOffs }) => {
  if (!tradeOffs || tradeOffs.length === 0) {
    return null;
  }

  return React.createElement('section', {
    className: 'w-full'
  }, [
    React.createElement('h3', {
      key: 'title',
      className: 'text-3xl font-bold text-white mb-8 text-center'
    }, 'Trade-offs & Considerations'),

    // Insight Callout
    React.createElement('div', {
      key: 'callout',
      className: 'bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl shadow-amber-500/20'
    }, [
      React.createElement('div', {
        key: 'header',
        className: 'flex items-center justify-center mb-6'
      }, [
        React.createElement('div', {
          key: 'icon',
          className: 'w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/50'
        }, React.createElement('span', {
          className: 'text-3xl'
        }, '⚖️')),
        React.createElement('h4', {
          key: 'heading',
          className: 'text-2xl font-bold text-amber-300 ml-4'
        }, 'Key Trade-offs')
      ]),
      React.createElement('div', {
        key: 'list',
        className: 'space-y-4'
      }, tradeOffs.map((tradeoff, index) =>
        React.createElement('div', {
          key: index,
          className: 'flex items-start bg-black/20 rounded-xl p-4 border border-amber-500/20'
        }, [
          React.createElement('span', {
            key: 'number',
            className: 'flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg shadow-amber-500/30'
          }, index + 1),
          React.createElement('p', {
            key: 'text',
            className: 'text-base text-gray-200 leading-relaxed flex-1'
          }, tradeoff)
        ])
      ))
    ])
  ]);
};

export default TradeoffExplanation;
