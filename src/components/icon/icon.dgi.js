import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.component {
static propTypes = {
  /**
     * Add classes to this component
     */
  className: PropTypes.string,

  /**
     * Icon type
     */
  type: PropTypes.string.isRequired,

  /**
     * Background size
     */
  bgSize: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
     * Background shape
     */
  bgShape: PropTypes.oneOf(['square', 'rounded-rect', 'circle']),

  /**
     * Background color theme
     */
  bgTheme: PropTypes.string,
  /**
       * The message for this tooltip
       */
  tooltipMessage: PropTypes.node,

  /**
       * The position of this tooltip: top, bottom, left or right
       */
  tooltipPosition: PropTypes.string,

  /**
       * The alignment of this tooltip: left, right or center
       */
  tooltipAlign: PropTypes.string

}

render() {
  return (<></>);
}
}
export default Icon;
