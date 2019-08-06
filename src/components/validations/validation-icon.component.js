import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Icon from '../icon';
import ValidationIconStyle from './validation-icon.style';
import { InputPresentationContext } from '../../__experimental__/components/input';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const ValidationIcon = ({
  theme,
  type,
  size,
  tooltipMessage
}) => {
  let modernTooltipProps = {};

  if (!isClassic(theme)) {
    // overrides default positioning for non legacy themes
    modernTooltipProps = {
      tooltipPosition: 'right',
      tooltipAlign: 'center',
      hasValidationTooltip: true,
      isThemeModern: true
    };
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
              size={ size }
              { ...modernTooltipProps }
            />
          </ValidationIconStyle>
        )
      }
    </InputPresentationContext.Consumer>
  );
};

ValidationIcon.propTypes = {
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  tooltipMessage: PropTypes.string,
  theme: PropTypes.object
};

ValidationIcon.defaultProps = {
  theme: baseTheme,
  size: 'medium'
};
export default withTheme(ValidationIcon);
