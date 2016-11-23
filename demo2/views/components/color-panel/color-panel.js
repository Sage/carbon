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
  <div
    className={ `demo-color-panel demo-color-panel--${props.color.fontContrast}` }
    style={ { backgroundColor: props.color.hex } }
  >
    <div className='demo-color-panel__details'>
      <h3 className='demo-color-panel__title'>
        <CopyActionWrapper valueToCopy={ props.color.name }>
          { props.color.name }
        </CopyActionWrapper>
      </h3>
      <span className='demo-color-panel__supplementary'>
        <CopyActionWrapper valueToCopy={ props.color.hex }>
          { props.color.hex }
        </CopyActionWrapper>
      </span>
    </div>
  </div>
;
