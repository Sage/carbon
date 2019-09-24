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
  iconId,
  isPartOfInput,
  tooltipMessage,
  tabIndexOverride,
  overrideContext
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

  const Context = overrideContext || InputPresentationContext;

  return (
    <Context.Consumer>
      {
        context => (
          <ValidationIconStyle
            id={ iconId }
            validationType={ type }
            role='tooltip'
            aria-label={ tooltipMessage }
            tabIndex={ tabIndexOverride || 0 }
            onFocus={ context && context.onFocus }
            onBlur={ context && context.onBlur }
          >
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
    </Context.Consumer>
  );
};

ValidationIcon.propTypes = {
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  iconId: PropTypes.string,
  tooltipMessage: PropTypes.string,
  theme: PropTypes.object,
  isPartOfInput: PropTypes.bool,
  tabIndexOverride: PropTypes.number,
  overrideContext: PropTypes.object
};

ValidationIcon.defaultProps = {
  theme: baseTheme
};
export default withTheme(ValidationIcon);
