import React from 'react';

/**
 * Item for a ContetnGrid, separated out so that a component can wrap something of it's own and avoid looping twice
   over a set of list items (first to build the children, then again in the ContentGrid to render the list) - this
   also maintains list semantics
 *
 * @param {object} props.children
 * @return {ContentGridItem}
 */
export default props =>
  <li className='demo-content-grid__item'>{ props.children }</li>
;
