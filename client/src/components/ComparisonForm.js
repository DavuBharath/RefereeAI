import React, { useState } from 'react';

const ComparisonForm = ({ template, onComparisonComplete, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [constraints, setConstraints] = useState({
    budget: '',
    scale: '',
    teamExpertise: '',
    timeToMarket: ''
  });
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedOptions.length < 2) {
      setError('Please select at least 2 options to compare');
      return;
    }

    const missingConstraints = Object.entries(constraints)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);

    if (missingConstraints.length > 0) {
      setError('Please fill in all constraint fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/comparisons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: template._id,
          selectedOptions,
          constraints
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create comparison');
      }

      const result = await response.json();
      onComparisonComplete(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = selectedOptions.length >= 2 && 
    Object.values(constraints).every(value => value);

  return React.createElement('div', {
    className: 'max-w-4xl mx-auto'
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      className: 'mb-8'
    }, [
      React.createElement('button', {
        key: 'back',
        onClick: onBack,
        className: 'text-gray-600 hover:text-gray-800 mb-4 flex items-center space-x-1'
      }, [
        React.createElement('span', { key: 'arrow' }, '←'),
        React.createElement('span', { key: 'text' }, 'Back to Categories')
      ]),
      React.createElement('h2', {
        key: 'title',
        className: 'text-3xl font-bold text-gray-800 mb-2'
      }, template.title),
      React.createElement('p', {
        key: 'description',
        className: 'text-gray-600'
      }, template.description)
    ]),

    React.createElement('form', {
      key: 'form',
      onSubmit: handleSubmit,
      className: 'space-y-8'
    }, [
      // Option Selection
      React.createElement('div', {
        key: 'options',
        className: 'bg-white rounded-lg shadow-sm border p-6'
      }, [
        React.createElement('h3', {
          key: 'title',
          className: 'text-xl font-semibold text-gray-800 mb-4'
        }, 'Select Options to Compare'),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-gray-600 mb-6'
        }, 'Choose at least 2 options you\'re considering:'),
        React.createElement('div', {
          key: 'grid',
          className: 'grid md:grid-cols-2 gap-4'
        }, template.options.map(option =>
          React.createElement('div', {
            key: option.name,
            className: `border rounded-lg p-4 cursor-pointer transition-all ${
              selectedOptions.includes(option.name)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'flex items-start space-x-3 cursor-pointer'
            }, [
              React.createElement('input', {
                key: 'checkbox',
                type: 'checkbox',
                checked: selectedOptions.includes(option.name),
                onChange: () => handleOptionToggle(option.name),
                className: 'mt-1 h-4 w-4 text-primary-600 rounded border-gray-300'
              }),
              React.createElement('div', {
                key: 'content',
                className: 'flex-1'
              }, [
                React.createElement('h4', {
                  key: 'name',
                  className: 'font-medium text-gray-800'
                }, option.name),
                React.createElement('p', {
                  key: 'description',
                  className: 'text-sm text-gray-600 mt-1'
                }, option.description)
              ])
            ])
          ])
        ))
      ]),

      // Constraints
      React.createElement('div', {
        key: 'constraints',
        className: 'bg-white rounded-lg shadow-sm border p-6'
      }, [
        React.createElement('h3', {
          key: 'title',
          className: 'text-xl font-semibold text-gray-800 mb-4'
        }, 'Your Constraints'),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-gray-600 mb-6'
        }, 'Help us understand your specific needs:'),
        React.createElement('div', {
          key: 'grid',
          className: 'grid md:grid-cols-2 gap-6'
        }, [
          // Budget
          React.createElement('div', {
            key: 'budget'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Budget'),
            React.createElement('select', {
              key: 'select',
              value: constraints.budget,
              onChange: (e) => handleConstraintChange('budget', e.target.value),
              className: 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500'
            }, [
              React.createElement('option', { key: 'empty', value: '' }, 'Select budget level'),
              React.createElement('option', { key: 'low', value: 'low' }, 'Low - Cost is a major concern'),
              React.createElement('option', { key: 'medium', value: 'medium' }, 'Medium - Balanced cost and features'),
              React.createElement('option', { key: 'high', value: 'high' }, 'High - Budget is flexible')
            ])
          ]),

          // Scale
          React.createElement('div', {
            key: 'scale'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Expected Scale'),
            React.createElement('select', {
              key: 'select',
              value: constraints.scale,
              onChange: (e) => handleConstraintChange('scale', e.target.value),
              className: 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500'
            }, [
              React.createElement('option', { key: 'empty', value: '' }, 'Select expected scale'),
              React.createElement('option', { key: 'small', value: 'small' }, 'Small - Personal or small team project'),
              React.createElement('option', { key: 'growing', value: 'growing' }, 'Growing - Startup or growing business'),
              React.createElement('option', { key: 'enterprise', value: 'enterprise' }, 'Enterprise - Large scale application')
            ])
          ]),

          // Team Expertise
          React.createElement('div', {
            key: 'expertise'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Team Expertise'),
            React.createElement('select', {
              key: 'select',
              value: constraints.teamExpertise,
              onChange: (e) => handleConstraintChange('teamExpertise', e.target.value),
              className: 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500'
            }, [
              React.createElement('option', { key: 'empty', value: '' }, 'Select team expertise level'),
              React.createElement('option', { key: 'beginner', value: 'beginner' }, 'Beginner - New to this technology'),
              React.createElement('option', { key: 'intermediate', value: 'intermediate' }, 'Intermediate - Some experience'),
              React.createElement('option', { key: 'advanced', value: 'advanced' }, 'Advanced - Experienced team')
            ])
          ]),

          // Time to Market
          React.createElement('div', {
            key: 'time'
          }, [
            React.createElement('label', {
              key: 'label',
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Time to Market'),
            React.createElement('select', {
              key: 'select',
              value: constraints.timeToMarket,
              onChange: (e) => handleConstraintChange('timeToMarket', e.target.value),
              className: 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500'
            }, [
              React.createElement('option', { key: 'empty', value: '' }, 'Select time preference'),
              React.createElement('option', { key: 'fast', value: 'fast' }, 'Fast - Need to launch quickly'),
              React.createElement('option', { key: 'flexible', value: 'flexible' }, 'Flexible - Quality over speed')
            ])
          ])
        ])
      ]),

      // Error Display
      error && React.createElement('div', {
        key: 'error',
        className: 'bg-red-50 border border-red-200 rounded-md p-4'
      }, React.createElement('p', {
        className: 'text-red-700'
      }, error)),

      // Submit Button
      React.createElement('div', {
        key: 'submit',
        className: 'flex justify-end'
      }, React.createElement('button', {
        type: 'submit',
        disabled: !isFormValid || loading,
        className: `px-8 py-3 rounded-md font-medium ${
          isFormValid && !loading
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`
      }, loading ? 'Analyzing...' : 'Compare Options'))
    ])
  ]);
};

export default ComparisonForm;