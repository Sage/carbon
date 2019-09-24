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
            tabIndex={ tabIndexOverride }
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
  /** A string to represent the type of validation */
  type: PropTypes.oneOf(OptionsHelper.validationTypes),
  /** A small string to indicate the size of the icon */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId: PropTypes.string,
  /** A message that the ValidationIcon component will display */
  tooltipMessage: PropTypes.string,
  /** Properties related to the theme */
  theme: PropTypes.object,
  /** A boolean to indicate if the icon is part of an input */
  isPartOfInput: PropTypes.bool,
  /** Overrides the default tabindex of the component */
  tabIndexOverride: PropTypes.number,
  /** Overrides the default context of the component */
  overrideContext: PropTypes.object
};

ValidationIcon.defaultProps = {
  theme: baseTheme,
  tabIndexOverride: 0
};
export default withTheme(ValidationIcon);
