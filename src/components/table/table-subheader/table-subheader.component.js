import React from 'react';
import TableHeader from '../table-header';
import StyledTableSubheader from './table-subheader.style';

/**
 * A TableSubheader widget.
 * An extension of the TableHeader class which caters for differences in styling.
 */
const TableSubheader = props => (
  <TableHeader
    { ...componentTags(props) }
    styledComponent={ StyledTableSubheader }
    { ...props }
  />
);

function componentTags(props) {
  return {
    'data-component': 'table-sub-header',
    'data-element': props['data-element'],
    'data-role': props['data-role']
  };
}

export default TableSubheader;
