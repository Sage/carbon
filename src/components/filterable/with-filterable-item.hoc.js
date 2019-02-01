import React from 'react';
import PropTypes from 'prop-types';
import FilterableItem from './filterable-item.component';

/**
 * A higher order component to decorate a component with as a FilterableItem.
 *
 * Basic example:
 *
 *   import { WithFilterableItem } from 'carbon-react/lib/components/filterable';
 *   const MyComponent = ({ children }) => <div>{ children }</div>;
 *   export default WithFilterableItem(MyComponent);
 */

const WithFilterableItem = (Component) => {
  const WrappedComponent = props => (
    <FilterableItem text={ props.text }>
      <Component { ...props } />
    </FilterableItem>
  );

  WrappedComponent.propTypes = {
    text: PropTypes.string.isRequired
  };

  WrappedComponent.displayName = `WithFilterableItem(${Component.displayName})`;

  return WrappedComponent;
};

export default WithFilterableItem;
