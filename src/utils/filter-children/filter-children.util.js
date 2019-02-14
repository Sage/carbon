import React from 'react';

const renderChild = (child, callback) => {
  if (callback) return callback(child);
  return child;
};

const defaultFilter = (text, value) => {
  return text.includes(value);
};

const filterChildren = ({
  value, filter = defaultFilter, onNoResults
} = {}) => (children, callback) => {
  const filteredChildren = React.Children.map(children, (child) => {
    if (!child.props.text || !value) return renderChild(child, callback);
    const processedText = child.props.text.toLowerCase();
    const processedValue = value.toLowerCase();
    if (filter(processedText, processedValue)) return renderChild(child, callback);
    return null;
  });

  if (React.Children.count(filteredChildren)) return filteredChildren;
  if (onNoResults) return onNoResults();
  return null;
};

export default filterChildren;
