import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import { StyledButtonToggle, StyledButtonToggleLabel, StyledButtonToggleIcon } from './button-toggle.style';
import guid from '../../utils/helpers/guid';

const ButtonToggle = (props) => {
  const inputGuid = guid();

  function icon() {
    if (!props.buttonIcon) return null;

    return (
      <StyledButtonToggleIcon { ...props }>
        <Icon type={ props.buttonIcon } />
      </StyledButtonToggleIcon>
    );
  }

  function hiddenInput() {
    return (
      <input
        type='radio'
        name={ props.name }
        id={ inputGuid }
        disabled={ props.disabled }
        style={ { // ToDo: Move to styled-component?
          width: 0,
          height: 0,
          opacity: 0
        } }
      />
    );
  }

  return (
    <StyledButtonToggle { ...props }>
      {hiddenInput()}
      <StyledButtonToggleLabel
        { ...props } htmlFor={ inputGuid }
      >
        <div className='content-wrapper'>
          {icon()}
          {props.children}
        </div>
      </StyledButtonToggleLabel>
    </StyledButtonToggle>
  );
};

ButtonToggle.propTypes = {
  name: PropTypes.string, /** Name used on the hidden radio button. */
  onChange: PropTypes.func, /** Change handler passed in from parent. */
  buttonIcon: PropTypes.string, /** buttonIcon the to render. */
  buttonIconSize: PropTypes.string, /** Sets the size of the buttonIcon (eg. large) */
  size: PropTypes.string, /** Sets the size of the button (padding, font-size). Only used in Classic theme. */
  grouped: PropTypes.bool, /** Remove spacing from between buttons. */
  disabled: PropTypes.bool, /** Disable all user interaction. */
  children: PropTypes.node.isRequired /** A required prop. This is the button text. */
};

ButtonToggle.defaultProps = {
  size: 'large'
};

export default ButtonToggle;
