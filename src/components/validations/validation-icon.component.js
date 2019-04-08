import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import ValidationIconStyle from './validation-icon.style';
import VALIDATION_TYPES from './validation-types.config';
import { InputPresentationContext } from '../../__experimental__/components/input';

const ValidationIcon = ({ type, message }) => (
  <InputPresentationContext.Consumer>
    {
      context => (
        <ValidationIconStyle type={ type }>
          <Icon
            key={ `${type}-icon` }
            tooltipType={ type }
            tooltipMessage={ message }
            tooltipVisible={ context && (context.hasFocus || context.hasMouseOver) }
            type={ type }
          />
        </ValidationIconStyle>
      )
    }
  </InputPresentationContext.Consumer>
);

ValidationIcon.propTypes = {
  type: PropTypes.oneOf(Object.keys(VALIDATION_TYPES)),
  message: PropTypes.string
};

export default ValidationIcon;
