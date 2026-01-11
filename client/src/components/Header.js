import React from 'react';

const Header = ({ currentView, onBackToTemplates, onNewComparison }) => {
  return React.createElement('header', {
    className: 'bg-white shadow-sm border-b'
  }, React.createElement('div', {
    className: 'container mx-auto px-4 py-4'
  }, React.createElement('div', {
    className: 'flex items-center justify-between'
  }, [
    // Logo and title
    React.createElement('div', {
      key: 'logo',
      className: 'flex items-center space-x-3'
    }, [
      React.createElement('div', {
        key: 'icon',
        className: 'text-3xl'
      }, '⚖️'),
      React.createElement('div', {
        key: 'text'
      }, [
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl font-bold text-gray-800'
        }, 'AI Referee'),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-sm text-gray-600'
        }, 'Compare options, understand trade-offs')
      ])
    ]),
    
    // Navigation
    React.createElement('nav', {
      key: 'nav',
      className: 'flex items-center space-x-4'
    }, [
      currentView !== 'templates' && React.createElement('button', {
        key: 'back',
        onClick: onBackToTemplates,
        className: 'text-gray-600 hover:text-gray-800 flex items-center space-x-1'
      }, [
        React.createElement('span', { key: 'arrow' }, '←'),
        React.createElement('span', { key: 'text' }, 'All Comparisons')
      ]),
      
      currentView === 'result' && React.createElement('button', {
        key: 'new',
        onClick: onNewComparison,
        className: 'bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
      }, 'New Comparison')
    ])
  ])));
};

export default Header;