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
  tabIndex,
  isFocused,
  onClick
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
            id={ iconId }
            validationType={ type }
            role='tooltip'
            aria-label={ tooltipMessage }
            onClick={ onClick }
          >
            <Icon
              key={ `${type}-icon` }
              tooltipType={ type }
              tooltipMessage={ tooltipMessage }
              tooltipVisible={ isFocused || (context && (context.hasFocus || context.hasMouseOver)) }
              type={ type }
              size={ size }
              tabIndex={ tabIndex }
              { ...modernTooltipProps }
            />
          </ValidationIconStyle>
        )
      }
    </InputPresentationContext.Consumer>
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
  onClick: PropTypes.object,
  /** An onClick handler */
  isPartOfInput: PropTypes.bool,
  /** Overrides the default tabindex of the component */
  tabIndex: PropTypes.number,
  /** A boolean received from IconWrapper */
  isFocused: PropTypes.bool
};

ValidationIcon.defaultProps = {
  theme: baseTheme,
  tabIndex: -1
};

export default withTheme(ValidationIcon);
