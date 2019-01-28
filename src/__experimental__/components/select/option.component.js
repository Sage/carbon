import React from 'react';
import { FilterableConsumer, FilterableContext } from './../filterable';

const Option = ({
  text,
  children,
  ...props
}) => (
  <FilterableConsumer text={ text }>
    <div>{ children || text }</div>
  </FilterableConsumer>
);

export default Option;