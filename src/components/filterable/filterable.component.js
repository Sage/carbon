import React from 'react';
import PropTypes from 'prop-types';
import FilterableContext from './filterable.context';

/**
 * Will filter any children using the FilterableItem component or higher order component.
 *
 * A basic example:
 *
 *   import { Filterable, FilterableItem } from 'carbon-react/lib/components/filterable';
 *
 *   const MyFilter = () => (
 *     <Filterable filter='one'>
 *       <FilterableItem text='one'>One</FilterableItem>
 *       <FilterableItem text='two'>Two</FilterableItem>
 *       <FilterableItem text='three'>Three</FilterableItem>
 *     </Filterable>
 *   );
 */

const Filterable = ({
  filter, filterType, customFilter, children
}) => (
  <FilterableContext.Provider value={ { filter, filterType, customFilter } }>
    { children }
  </FilterableContext.Provider>
);

Filterable.defaultProps = {
  filterType: 'match'
};

Filterable.propTypes = {
  children: PropTypes.node,
  customFilter: PropTypes.func, // supply a custom function to perform the filtering of an item
  filter: PropTypes.string, // the string to apply the filter against
  filterType: PropTypes.string // supply a filtering method, such as 'match' or 'startsWith'
};

export default Filterable;
