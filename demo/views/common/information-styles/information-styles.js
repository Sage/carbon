import React from 'react';
import './information-styles.scss';

/**
 * Wraps children in styling wrapper
 *
 * @param {object} props
 * @return {InformationStyled}
 */
export default props => (
  <div className='demo-information-styles'>
    { props.children }
  </div>
);
