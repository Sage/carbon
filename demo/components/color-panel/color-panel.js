import React from 'react';

/**
 * Puts out a div with color related presentation
 *
 * @param {object} props.color
 * @param {String} props.color.fontContrast - `dark` or `light` will pull out correctly contrasted fonts for the
   background `hex`
 * @param {String} props.color.hex - #RRGGBB hex for color, with `#` prefix
 * @param {String} props.color.name
 * @return {ColorPanel}
 */
export default props =>
  <div
    className={ `demo-color-panel demo-color-panel--${props.color.fontContrast}` }
    style={ { backgroundColor: props.color.hex } }
  >
    <div className='demo-color-panel__details'>
      <h3 className='demo-color-panel__title'>{ props.color.name }</h3>
      <span className='demo-color-panel__supplementary'>{ props.color.hex }</span>
    </div>
  </div>
;
