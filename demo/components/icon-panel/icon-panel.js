import React from 'react';

import Icon from 'components/icon';
import './icon-panel.scss';

/**
 * Puts out a div with icon related presentation
 *
 * @param {object} props.icon
 * @param {String} props.icon.name
 * @param {String} props.icon.type
 * @return {IconPanel}
 */
export default props =>
  <div className='demo-icon-panel'>
    <Icon type={ props.icon.type }></Icon>
    <h3 className='demo-icon-panel__title'>{ props.icon.name }</h3>
  </div>
;
