import React from 'react';

const TemplateList = ({ templates, onTemplateSelect }) => {
  // Group templates by category
  const templatesByCategory = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  const categoryIcons = {
    'Cloud Services': '☁️',
    'Frontend Frameworks': '🎨',
    'Backend Frameworks': '⚙️',
    'Databases': '🗄️',
    'APIs': '🔌',
    'Tech Stacks': '🏗️'
  };

  return React.createElement('div', {
    className: 'max-w-6xl mx-auto'
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      className: 'text-center mb-12'
    }, [
      React.createElement('h2', {
        key: 'title',
        className: 'text-4xl font-bold text-gray-800 mb-4'
      }, 'Choose What to Compare'),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-xl text-gray-600 max-w-2xl mx-auto'
      }, 'Select a comparison category to get started. We\'ll help you understand the trade-offs and make the right choice for your needs.')
    ]),

    // Categories
    React.createElement('div', {
      key: 'categories',
      className: 'space-y-8'
    }, Object.entries(templatesByCategory).map(([category, categoryTemplates]) =>
      React.createElement('div', {
        key: category,
        className: 'bg-white rounded-lg shadow-sm border p-6'
      }, [
        React.createElement('div', {
          key: 'category-header',
          className: 'flex items-center space-x-3 mb-4'
        }, [
          React.createElement('span', {
            key: 'icon',
            className: 'text-2xl'
          }, categoryIcons[category] || '📋'),
          React.createElement('h3', {
            key: 'title',
            className: 'text-2xl font-semibold text-gray-800'
          }, category)
        ]),
        
        React.createElement('div', {
          key: 'templates',
          className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'
        }, categoryTemplates.map(template =>
          React.createElement('div', {
            key: template._id,
            className: 'border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-primary-300',
            onClick: () => onTemplateSelect(template)
          }, [
            React.createElement('h4', {
              key: 'title',
              className: 'font-semibold text-gray-800 mb-2'
            }, template.title),
            React.createElement('p', {
              key: 'description',
              className: 'text-gray-600 text-sm mb-3'
            }, template.description),
            React.createElement('div', {
              key: 'options',
              className: 'flex flex-wrap gap-1 mb-3'
            }, template.options.slice(0, 3).map(option =>
              React.createElement('span', {
                key: option.name,
                className: 'bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'
              }, option.name)
            ).concat(
              template.options.length > 3 ? [
                React.createElement('span', {
                  key: 'more',
                  className: 'text-gray-500 text-xs'
                }, `+${template.options.length - 3} more`)
              ] : []
            )),
            React.createElement('div', {
              key: 'action',
              className: 'text-primary-600 text-sm font-medium flex items-center'
            }, [
              React.createElement('span', { key: 'text' }, 'Compare Options'),
              React.createElement('span', { key: 'arrow', className: 'ml-1' }, '→')
            ])
          ])
        ))
      ])
    ))
  ]);
};

export default TemplateList;