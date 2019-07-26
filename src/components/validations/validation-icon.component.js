import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Icon from '../icon';
import ValidationIconStyle from './validation-icon.style';
import { InputPresentationContext } from '../../__experimental__/components/input';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const ValidationIcon = ({ theme, type, tooltipMessage }) => {
  let tooltipPositionProps = {
    tooltipPosition: 'right',
    tooltipAlign: 'center'
  };

  if (isClassic(theme)) {
    tooltipPositionProps = {};
  }

  return (
    <InputPresentationContext.Consumer>
      {
        context => (
          <ValidationIconStyle type={ type }>
            <Icon
              key={ `${type}-icon` }
              tooltipType={ type }
              tooltipMessage={ tooltipMessage }
              tooltipVisible={ context && (context.hasFocus || context.hasMouseOver) }
              type={ type }
              { ...tooltipPositionProps }
            />
          </ValidationIconStyle>
        )
      }
    </InputPresentationContext.Consumer>
  );
};

ValidationIcon.propTypes = {
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  tooltipMessage: PropTypes.string,
  theme: PropTypes.object
};

ValidationIcon.defaultProps = {
  theme: baseTheme
};
export default withTheme(ValidationIcon);
