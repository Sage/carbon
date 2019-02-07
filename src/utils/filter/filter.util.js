import React from 'react';

const renderChild = (child, callback) => {
  if (callback) return callback(child);
  return child;
};

const defaultFilter = (processedText, processedValue, filterType) => {
  return processedText[filterType](processedValue);
};

const filterChildren = ({ value, filterType = 'match', filter = defaultFilter, noResults }) => (children, callback) => {
  const filteredChildren = React.Children.map(children, (child) => {
    if (!child.props.text || !value) return renderChild(child, callback);
    const processedText = child.props.text.toLowerCase();
    const processedValue = value.toLowerCase();
    if (filter(processedText, processedValue, filterType)) return renderChild(child, callback);
    return null;
  });

  if (React.Children.count(filteredChildren)) return filteredChildren;
  if (noResults) return noResults();
  return null;
};

export default filterChildren;
