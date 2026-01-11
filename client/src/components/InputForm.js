import React, { useState } from 'react';
import { NeonButton } from './ui/NeonButton';

const InputForm = ({ category, options, onSubmit, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [constraints, setConstraints] = useState({
    budget: '',
    scale: '',
    expertise: '',
    timeToMarket: ''
  });
  const [error, setError] = useState(null);

  const handleOptionToggle = (optionName) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionName)) {
        return prev.filter(name => name !== optionName);
      } else {
        return [...prev, optionName];
      }
    });
  };

  const handleConstraintChange = (field, value) => {
    setConstraints(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedOptions.length < 2) {
      setError('Please select at least 2 options to compare');
      return;
    }

    const missingConstraints = Object.entries(constraints)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);

    if (missingConstraints.length > 0) {
      setError('Please select all constraints');
      return;
    }

    setError(null);
    onSubmit({ selectedOptions, constraints });
  };

  const isFormValid = selectedOptions.length >= 2 && 
    Object.values(constraints).every(value => value);

  const constraintOptions = {
    budget: [
      { value: 'low', label: 'Low', desc: 'Cost is a priority' },
      { value: 'medium', label: 'Medium', desc: 'Balanced approach' },
      { value: 'high', label: 'High', desc: 'Budget is flexible' }
    ],
    scale: [
      { value: 'small', label: 'Small', desc: 'Personal or small team' },
      { value: 'growing', label: 'Growing', desc: 'Startup or expanding' },
      { value: 'enterprise', label: 'Enterprise', desc: 'Large scale' }
    ],
    expertise: [
      { value: 'beginner', label: 'Beginner', desc: 'New to this' },
      { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
      { value: 'advanced', label: 'Advanced', desc: 'Experienced team' }
    ],
    timeToMarket: [
      { value: 'fast', label: 'Fast', desc: 'Launch quickly' },
      { value: 'flexible', label: 'Flexible', desc: 'Quality over speed' }
    ]
  };

  return React.createElement('div', {
    className: 'w-full flex items-center justify-center px-6 py-20 animate-slide-up'
  }, React.createElement('div', {
    className: 'max-w-4xl mx-auto w-full'
  }, [
    // Back Button
    React.createElement('button', {
      key: 'back',
      onClick: onBack,
      className: 'flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors'
    }, [
      React.createElement('span', { key: 'arrow' }, '←'),
      React.createElement('span', { key: 'text', className: 'text-sm font-medium' }, 'Back to Categories')
    ]),

    // Header - Centered
    React.createElement('div', {
      key: 'header',
      className: 'mb-12 text-center'
    }, [
      React.createElement('h2', {
        key: 'title',
        className: 'text-4xl md:text-5xl font-bold text-white mb-4'
      }, category.title),
      React.createElement('p', {
        key: 'description',
        className: 'text-lg text-gray-400'
      }, 'Select options and define your constraints to receive a tailored comparison')
    ]),

    React.createElement('form', {
      key: 'form',
      onSubmit: handleSubmit,
      className: 'space-y-12'
    }, [
      // Option Selection - Selectable Cards
      React.createElement('section', {
        key: 'options',
        className: 'mb-12'
      }, [
        React.createElement('h3', {
          key: 'title',
          className: 'text-2xl font-bold text-white mb-3 text-center'
        }, 'Select Options to Compare'),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-sm text-gray-400 mb-8 text-center'
        }, 'Choose at least two options'),
        React.createElement('div', {
          key: 'grid',
          className: 'grid md:grid-cols-2 gap-4'
        }, options.map(option =>
          React.createElement('button', {
            key: option.name,
            type: 'button',
            onClick: () => handleOptionToggle(option.name),
            className: `text-left p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedOptions.includes(option.name)
                ? 'border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl shadow-lg shadow-indigo-500/20'
                : 'bg-gray-900/50 backdrop-blur-xl border-white/10 hover:border-white/30 hover:bg-gray-800/50'
            }`
          }, [
            React.createElement('div', {
              key: 'header',
              className: 'flex items-start justify-between mb-3'
            }, [
              React.createElement('h4', {
                key: 'name',
                className: 'font-bold text-lg text-white'
              }, option.name),
              selectedOptions.includes(option.name) && React.createElement('div', {
                key: 'check',
                className: 'w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/50'
              }, React.createElement('span', {
                className: 'text-white text-sm'
              }, '✓'))
            ]),
            React.createElement('p', {
              key: 'description',
              className: 'text-sm text-gray-400 leading-relaxed'
            }, option.description)
          ])
        ))
      ]),

      // Constraints - Dropdown Selects
      React.createElement('section', {
        key: 'constraints',
        className: 'mb-12'
      }, [
        React.createElement('h3', {
          key: 'title',
          className: 'text-2xl font-bold text-white mb-3 text-center'
        }, 'Define Your Constraints'),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-sm text-gray-400 mb-8 text-center'
        }, 'Help us understand your specific situation'),
        
        React.createElement('div', {
          key: 'grid',
          className: 'space-y-6'
        }, [
          // Budget
          React.createElement('div', {
            key: 'budget'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-300 mb-2'
            }, 'Budget'),
            React.createElement('select', {
              key: 'select',
              value: constraints.budget,
              onChange: (e) => handleConstraintChange('budget', e.target.value),
              className: 'w-full px-5 py-4 bg-gray-900/50 backdrop-blur-xl border-2 border-white/10 rounded-xl text-white text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all'
            }, [
              React.createElement('option', {
                key: 'placeholder',
                value: '',
                disabled: true,
                className: 'bg-gray-800'
              }, 'Select budget level'),
              ...constraintOptions.budget.map(opt =>
                React.createElement('option', {
                  key: opt.value,
                  value: opt.value,
                  className: 'bg-gray-800'
                }, `${opt.label} - ${opt.desc}`)
              )
            ])
          ]),

          // Scale
          React.createElement('div', {
            key: 'scale'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-300 mb-2'
            }, 'Expected Scale'),
            React.createElement('select', {
              key: 'select',
              value: constraints.scale,
              onChange: (e) => handleConstraintChange('scale', e.target.value),
              className: 'w-full px-5 py-4 bg-gray-900/50 backdrop-blur-xl border-2 border-white/10 rounded-xl text-white text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all'
            }, [
              React.createElement('option', {
                key: 'placeholder',
                value: '',
                disabled: true,
                className: 'bg-gray-800'
              }, 'Select scale'),
              ...constraintOptions.scale.map(opt =>
                React.createElement('option', {
                  key: opt.value,
                  value: opt.value,
                  className: 'bg-gray-800'
                }, `${opt.label} - ${opt.desc}`)
              )
            ])
          ]),

          // Expertise
          React.createElement('div', {
            key: 'expertise'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-300 mb-2'
            }, 'Team Expertise'),
            React.createElement('select', {
              key: 'select',
              value: constraints.expertise,
              onChange: (e) => handleConstraintChange('expertise', e.target.value),
              className: 'w-full px-5 py-4 bg-gray-900/50 backdrop-blur-xl border-2 border-white/10 rounded-xl text-white text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all'
            }, [
              React.createElement('option', {
                key: 'placeholder',
                value: '',
                disabled: true,
                className: 'bg-gray-800'
              }, 'Select expertise level'),
              ...constraintOptions.expertise.map(opt =>
                React.createElement('option', {
                  key: opt.value,
                  value: opt.value,
                  className: 'bg-gray-800'
                }, `${opt.label} - ${opt.desc}`)
              )
            ])
          ]),

          // Time to Market
          React.createElement('div', {
            key: 'time'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-300 mb-2'
            }, 'Time to Market'),
            React.createElement('select', {
              key: 'select',
              value: constraints.timeToMarket,
              onChange: (e) => handleConstraintChange('timeToMarket', e.target.value),
              className: 'w-full px-5 py-4 bg-gray-900/50 backdrop-blur-xl border-2 border-white/10 rounded-xl text-white text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all'
            }, [
              React.createElement('option', {
                key: 'placeholder',
                value: '',
                disabled: true,
                className: 'bg-gray-800'
              }, 'Select timeline'),
              ...constraintOptions.timeToMarket.map(opt =>
                React.createElement('option', {
                  key: opt.value,
                  value: opt.value,
                  className: 'bg-gray-800'
                }, `${opt.label} - ${opt.desc}`)
              )
            ])
          ])
        ])
      ]),

      // Error Display
      error && React.createElement('div', {
        key: 'error',
        className: 'bg-red-900/50 border border-red-500/50 rounded-lg p-4'
      }, React.createElement('p', {
        className: 'text-sm text-red-200'
      }, error)),

      // Submit Button with NeonButton - Centered
      React.createElement('div', {
        key: 'submit',
        className: 'flex justify-center pt-8'
      }, React.createElement(NeonButton, {
        type: 'submit',
        disabled: !isFormValid,
        variant: 'solid',
        size: 'lg',
        className: 'w-full sm:w-auto px-12'
      }, 'Generate Comparison'))
    ])
  ]));
};

export default InputForm;
