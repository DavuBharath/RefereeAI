import React from 'react';

const Recommendation = ({ recommendation, reasoning }) => {
  return React.createElement('div', {
    className: 'space-y-6'
  }, [
    // Recommendation
    React.createElement('div', {
      key: 'recommendation',
      className: 'bg-blue-50 border border-blue-200 rounded-lg p-6'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-blue-800 mb-4 flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '💡'),
        React.createElement('span', { key: 'text' }, 'Here is how the options compare')
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

    // Reasoning
    React.createElement('div', {
      key: 'reasoning',
      className: 'bg-gray-50 border border-gray-200 rounded-lg p-6'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'text-xl font-semibold text-gray-800 mb-4 flex items-center'
      }, [
        React.createElement('span', { key: 'icon', className: 'mr-2' }, '🧠'),
        React.createElement('span', { key: 'text' }, 'How this analysis was done')
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
    ])
  ]);
};

export default Recommendation;