import React from 'react';
import FilterableContext from './filterable.context';

const FilterableProvider = ({ filter, filterType, customFilter, children }) => {
  return (
    <FilterableContext.Provider value={ { filter, filterType, customFilter } }>
      { children }
    </FilterableContext.Provider>
  )
};

FilterableProvider.defaultProps = {
  filterType: 'match'
};

export default FilterableProvider;
