import React from 'react';

/**
 * Loads a large SVG icon with some text
 *
 * @param {object} props
 * @return {SellingPointPanel}
 */
export default props => (
  <div className='selling-point-panel'>
    <img className='selling-point-panel__icon' src={ `${global.imagePath}/${props.icon}.svg` } />
    <h3 className='selling-point-panel__heading'>{ props.heading }</h3>
    <span className='selling-point-panel__text'>{ props.text }</span>
  </div>
);
