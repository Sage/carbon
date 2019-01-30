import React from 'react';
import PropTypes from 'prop-types';
import FilterableContext from './filterable.context';

/**
 * Renders an item which hooks into the closest Filterable parent to determine
 * if the item should be rendered or not. See filterable.component.js for more info.
 */

const shouldRenderChild = (text, filter, filterType, customFilter) => {
  if (text === undefined || filter === undefined) return true;
  if (customFilter) return customFilter(text, filter);

  const processedText = text.toLowerCase();
  const processedFilter = filter.toLowerCase();
  return processedText[filterType](processedFilter);
};

const FilterableItem = ({ text, children }) => (
  <FilterableContext.Consumer>
    {
      ({ filter, filterType, customFilter }) => (
        shouldRenderChild(text, filter, filterType, customFilter) && (children || text)
      )
    }
  </FilterableContext.Consumer>
);

FilterableItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FilterableItem;
