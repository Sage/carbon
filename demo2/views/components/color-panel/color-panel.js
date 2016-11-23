import React from 'react';

import CopyActionWrapper from '../../components/copy-action-wrapper';

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
  <CopyActionWrapper
    className={ `demo-color-panel demo-color-panel--${props.color.fontContrast}` }
    style={ { backgroundColor: props.color.hex } }
    valueToCopy={ props.color.name }
  >
    <div className='demo-color-panel__details'>
      <h3 className='demo-color-panel__title'>{ props.color.name }</h3>
      <div className='demo-color-panel__copy'>
        <span className='demo-color-panel__supplementary'>{ props.color.hex }</span>
        <span className='demo-color-panel__copy-popup'>Copy</span>
        <span className='demo-color-panel__copied-feedback'>Copied!</span>
      </div>
    </div>
  </CopyActionWrapper>
;
