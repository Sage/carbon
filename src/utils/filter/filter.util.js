import React from 'react';

const renderChild = (child, callback) => {
  if (callback) return callback(child);
  return child;
}

const filter = ({ filter }) => (children, callback) => {
  return React.Children.map(children, (child) => {
    if (!child.props.text || !filter) return renderChild(child, callback);
    const processedText = child.props.text.toLowerCase();
    const processedFilter = filter.toLowerCase();
    if (processedText.match(processedFilter)) return renderChild(child, callback);
    return null;
  });
};

export default filter;
