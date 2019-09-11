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
  iconId,
  theme,
  type,
  size,
  isPartOfInput,
  tooltipMessage
}) => {
  let modernTooltipProps = {};

  if (!isClassic(theme)) {
    // overrides default positioning for non legacy themes
    modernTooltipProps = {
      tooltipPosition: 'right',
      tooltipAlign: 'center',
      isThemeModern: true,
      isPartOfInput
    };
  }

  return (
    <InputPresentationContext.Consumer>
      {
        context => (
          <ValidationIconStyle
            data-validation-type={ type }
            validationType={ type }
          >
            <Icon
              id={ iconId }
              key={ `${type}-icon` }
              role='tooltip'
              tooltipType={ type }
              tooltipMessage={ tooltipMessage }
              tooltipVisible={ context && (context.hasFocus || context.hasMouseOver) }
              type={ type }
              size={ size }
              aria-label={ tooltipMessage || 'additional validation information' }
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
  iconId: PropTypes.string,
  tooltipMessage: PropTypes.string,
  theme: PropTypes.object,
  isPartOfInput: PropTypes.bool
};

ValidationIcon.defaultProps = {
  theme: baseTheme
};
export default withTheme(ValidationIcon);
