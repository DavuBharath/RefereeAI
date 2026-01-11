import React, { useState } from 'react';
import Home from './pages/Home';
import { SparklesCore } from './components/ui/SparklesCore';

const App = () => {
  const [currentView, setCurrentView] = useState('categories');

  const handleNavigateToCategories = (e) => {
    e.preventDefault();
    setCurrentView('categories');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHowItWorks = (e) => {
    e.preventDefault();
    if (currentView !== 'categories') {
      setCurrentView('categories');
      // Wait for view to change, then scroll
      setTimeout(() => {
        const element = document.getElementById('how-it-works');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return React.createElement('div', {
    className: 'relative min-h-screen bg-black'
  }, [
    // Sparkles Background - Full Screen
    React.createElement('div', {
      key: 'sparkles-bg',
      className: 'fixed inset-0 w-full h-full'
    }, React.createElement(SparklesCore, {
      id: 'tsparticlesfullpage',
      background: 'transparent',
      minSize: 0.6,
      maxSize: 1.4,
      particleDensity: 100,
      className: 'w-full h-full',
      particleColor: '#FFFFFF',
      speed: 1
    })),

    // Floating Navbar
    React.createElement('nav', {
      key: 'navbar',
      className: 'fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10'
    }, React.createElement('div', {
      className: 'max-w-7xl mx-auto px-6 py-4'
    }, React.createElement('div', {
      className: 'flex items-center justify-between'
    }, [
      // Logo + Name - Clickable to go home
      React.createElement('button', {
        key: 'logo',
        onClick: handleNavigateToCategories,
        className: 'flex items-center space-x-3 hover:opacity-80 transition-opacity'
      }, [
        React.createElement('div', {
          key: 'icon',
          className: 'w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/50'
        }, React.createElement('span', {
          className: 'text-white text-xl font-bold'
        }, 'R')),
        React.createElement('span', {
          key: 'name',
          className: 'text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'
        }, 'RefereeAI')
      ]),
      
      // Navigation Links
      React.createElement('div', {
        key: 'links',
        className: 'hidden md:flex items-center space-x-8'
      }, [
        React.createElement('button', {
          key: 'how',
          onClick: handleNavigateToHowItWorks,
          className: 'text-sm font-medium text-gray-300 hover:text-white transition-colors'
        }, 'How it Works'),
        React.createElement('button', {
          key: 'categories',
          onClick: handleNavigateToCategories,
          className: 'text-sm font-medium text-gray-300 hover:text-white transition-colors'
        }, 'Categories')
      ])
    ]))),
    
    // Main Content
    React.createElement('div', {
      key: 'main',
      className: 'relative z-10'
    }, React.createElement(Home, {
      currentView: currentView,
      setCurrentView: setCurrentView
    }))
  ]);
};

export default App;
