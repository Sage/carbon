import React from 'react';
import './complex-heading.scss';

/**
 * Loads a heading with extra bits
 *
 * @param {object} props
 * @return {ComplexHeading}
 */
export default props => (
  <header className={ `complex-heading complex-heading--${props.align}` }>
    <h2 className='complex-heading__heading'>
      { props.heading }<span className='complex-heading__heading-suffix'>{ props.headingSuffix }</span>
    </h2>
    <hr className='complex-heading__divider' />
    <span className='complex-heading__text'>{ props.text }</span>
  </header>
);
