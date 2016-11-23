import React from 'react';

/**
 * Handles responsive layout in a grid three wide maximum
 *
 * @param {object} props.children immediately rendered
 * @return {ContentGrid}
 */
export default props =>
  <ul className='demo-content-grid'>{ props.children }</ul>
;
