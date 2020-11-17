import React from "react";

const renderChild = (child, callback) => {
  if (callback) return callback(child);
  return child;
};

/**
 * The default Filter
 * @param { the text prop of option } text
 * @param { the given filter text } filter
 */
const defaultFilter = (text, filter) => {
  return text.includes(filter);
};

/**
 * Create a filter for React children:
 *
 *   filterChildren({ value: 'my filter' })(children);
 *
 * You can also pass in:
 *   * custom filters
 *   * 'no results' callback
 *   * a callback for each child
 *
 * For example:
 *
 *   const filter = filterChildren({
 *     value: 'my filter',
 *     filter: (text, filter, value) => filter !== text,
 *     onNoResults: () => 'no results!'
 *   });
 *
 *   filter(children, (child) => <div>{ child }</div>);
 */
const filterChildren = ({
  value,
  filter = defaultFilter,
  onNoResults,
} = {}) => (children, callback) => {
  const filteredChildren = React.Children.map(children, (child) => {
    if (!child.props.text || !value) return renderChild(child, callback);
    const processedText = child.props.text.toLowerCase();
    const processedValue = value.toLowerCase();
    if (filter(processedText, processedValue, child.props.value))
      return renderChild(child, callback);
    return null;
  });

  if (React.Children.count(filteredChildren)) return filteredChildren;
  if (onNoResults) return onNoResults();
  return null;
};

export default filterChildren;
