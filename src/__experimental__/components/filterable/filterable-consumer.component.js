import React from 'react';
import FilterableContext from './filterable.context';

const shouldRenderChild = (text, filter, filterType, customFilter) => {
  if (text === undefined || filter === undefined) return true;
  if (customFilter) return customFilter(text, filter);

  const processedText = text.toLowerCase();
  const processedFilter = filter.toLowerCase();
  return processedText[filterType](processedFilter);
}

const FilterableConsumer = ({ text, children }) => {
  return (
    <FilterableContext.Consumer>
      {
        ({ filter, filterType, customFilter }) => (
          shouldRenderChild(text, filter, filterType, customFilter) && (children || text)
        )
      }
    </FilterableContext.Consumer>
  )
};

export default FilterableConsumer;
