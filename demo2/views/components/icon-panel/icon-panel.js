import React from 'react';

/**
 * Loads a large SVG icon with some text
 *
 * @param {object} props
 * @return {IconPanel}
 */
export default props => (
  <div className='icon-panel'>
    <img className='icon-panel__icon' src={ `/assets/images/${props.icon}.svg` } />
    <h3 className='icon-panel__heading'>{ props.heading }</h3>
    <span className='icon-panel__text'>{ props.text }</span>
  </div>
);
