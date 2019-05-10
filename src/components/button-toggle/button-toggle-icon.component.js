import React from 'react';
import PropTypes from 'prop-types';
import { StyledButtonToggleIcon } from './button-toggle.style';
import Icon from '../icon';

const ButtonToggleIcon = props => (
  <StyledButtonToggleIcon { ...props }>
    <Icon type={ props.buttonIcon } />
  </StyledButtonToggleIcon>
);

ButtonToggleIcon.propTypes = {
  /** buttonIcon to render. */
  buttonIcon: PropTypes.string
};


export default ButtonToggleIcon;
