import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

const ButtonToggle = (props) => {
  function icon() {
    if (!props.buttonIcon) return null;

    return (
      <Icon type={ props.buttonIcon } />
    );
  }

  return (
    <button type='button'>
      {icon()}
      {props.children}
    </button>
  );
};

ButtonToggle.propTypes = {
  /**
   * Which buttonIcon the button should render.
   */
  buttonIcon: PropTypes.string,

  /**
   * Sets the size of the buttonIcon (eg. large)
   */
  buttonIconSize: PropTypes.string,

  /**
   * Sets the size of the button (eg. large)
   */
  size: PropTypes.string,

  /**
   * remove spacing from inbetween buttons
   */
  grouped: PropTypes.bool,

  /**
   * Disable all user interaction.
   */
  disabled: PropTypes.bool,

  /**
   * A required prop. This is what the button will display.
   */
  children: PropTypes.node.isRequired
};

ButtonToggle.defaultProps = {
  size: 'large'
};

export default ButtonToggle;
