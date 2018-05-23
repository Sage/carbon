import React from 'react';
const images = {
  flexible: require('./flexible.svg'),
  hammer: require('./hammer.svg'),
  plug: require('./plug.svg'),
  point: require('./point.svg'),
  brush: require('./brush.svg'),
  collaborate: require('./collaborate.svg')
};

/**
 * Loads a large SVG icon with some text
 *
 * @param {object} props
 * @return {SellingPointPanel}
 */
export default props => (
  <div className='selling-point-panel'>
    <img className='selling-point-panel__icon' src={ images[props.icon] } />
    <h3 className='selling-point-panel__heading'>{ props.heading }</h3>
    <span className='selling-point-panel__text'>{ props.text }</span>
  </div>
);
