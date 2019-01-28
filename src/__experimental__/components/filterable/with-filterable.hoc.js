import React from 'react';
import FilterableConsumer from './filterable-consumer.component';

const WithFilterable = Component => props => (
  <FilterableConsumer text={ props.text }>
    <Component { ...props } />
  </FilterableConsumer>
);

export default WithFilterable;
