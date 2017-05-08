import React from 'react';

/**
 * Handles responsive layout in a grid three wide maximum
 *
 * @param {object} props.children immediately rendered
 * @param {object} props.columns 3 is the default, 5 is also a setting
 * @return {ContentGrid}
 */
export default props =>
  <ul className={ `demo-content-grid demo-content-grid--${props.columns}-columns` }>
    { props.children }
  </ul>
