import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import ValidationIconStyle from './validation-icon.style';
import { InputPresentationContext } from '../../__experimental__/components/input';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

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
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  message: PropTypes.string
};

export default ValidationIcon;
