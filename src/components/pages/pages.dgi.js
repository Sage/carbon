import React from 'react';
import PropTypes from 'prop-types';

class Pages extends React.component {
static propTypes = {
/**
   * A custom class name for the component.
   */
  className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  /**
   * This component supports children.
   */
  children: PropTypes.node,

  /**
     * The selected tab on page load
     */
  initialSlideIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  /**
     * The selected slide
     */
  slideIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  /**
     * Enables the slide selector
     */
  enableSlideSelector: PropTypes.bool,

  /**
     * Enables the previous button
     */
  enablePreviousButton: PropTypes.bool,

  /**
     * Enables the next button
     */
  enableNextButton: PropTypes.bool,

  /**
     * Action to be called on slide change
     */
  onSlideChange: PropTypes.func,

  /**
     * Controls which transition to use.
     */
  transition: PropTypes.string
}

render() {
  return (<></>);
}
}
export default Pages;
