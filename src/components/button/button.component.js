import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router';
import Icon from '../icon';
import StyledButton, { StyledButtonSubtext } from './button.style';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';

const Button = (props) => {
  const {
    disabled, to, iconType, size, subtext
  } = props;

  const { as, buttonType, ...rest } = props;

  const propsWithoutAs = {
    ...rest,
    buttonType: buttonType || as
  };

  if (subtext.length > 0 && size !== 'large') {
    throw new Error('subtext prop has no effect unless the button is large');
  }

  // added to support legacy link buttons
  if (!disabled && to) {
    return (
      <RouterLink to={ to } type={ iconType }>
        {renderStyledButton(propsWithoutAs)}
      </RouterLink>
    );
  }

  return renderStyledButton(propsWithoutAs);
};

function renderStyledButton(buttonProps) {
  const {
    disabled,
    buttonType,
    iconType,
    theme,
    forwardRef,
    href,
    ...styleProps
  } = buttonProps;

  // added to support legacy link buttons
  if (href) {
    styleProps.href = href;
  }

  return (
    <StyledButton
      as={ (!disabled && href) ? 'a' : 'button' } // legacy link button feature
      buttonType={ buttonType }
      disabled={ disabled }
      role='button'
      type='button'
      legacyColorVariant={ theme }
      iconType={ iconType }
      { ...tagComponent('button', buttonProps) }
      { ...styleProps }
      ref={ forwardRef }
    >
      { renderChildren(buttonProps) }
    </StyledButton>
  );
}

function renderChildren({
  iconType, iconPosition, size, subtext, children, disabled, buttonType
}) {
  const iconColorMap = {
    primary: 'on-dark-background',
    secondary: 'business-color',
    tertiary: 'business-color',
    destructive: 'on-dark-background',
    darkBackground: 'business-color'
  };

  return (
    <>
      { iconType && iconPosition === 'before' && (
        <Icon
          type={ iconType }
          disabled={ disabled }
          bgTheme='none'
          iconColor={ iconColorMap[buttonType] }
        />) }
      <span>
        <span data-element='main-text'>{ children }</span>
        { size === 'large' && <StyledButtonSubtext data-element='subtext'>{ subtext }</StyledButtonSubtext> }
      </span>
      { iconType && iconPosition === 'after' && (
        <Icon
          type={ iconType }
          disabled={ disabled }
          bgTheme='none'
          iconColor={ iconColorMap[buttonType] }
        />) }
    </>
  );
}

Button.propTypes = {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "destructive" | "darkBackground" */
  buttonType: PropTypes.oneOf(OptionsHelper.buttonTypes),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions]),
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf([...OptionsHelper.icons, '']),
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
  /** Ref to be forwarded */
  forwardRef: PropTypes.func,
  /** Button types for legacy theme: "primary" | "secondary" */
  as: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** Set this prop to pass in legacy theme color variants */
  theme: PropTypes.oneOf(OptionsHelper.buttonColors),
  checkTheme: PropTypes.func,
  /** Legacy - used to transfrom button into anchor */
  href: PropTypes.string,
  /** Legacy - used to transfrom button into anchor */
  to: PropTypes.string

};

Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  disabled: false,
  iconPosition: 'before',
  theme: 'blue',
  subtext: ''
};

const ButtonWithForwardRef = React.forwardRef((props, ref) => <Button forwardRef={ ref } { ...props } />);

ButtonWithForwardRef.displayName = 'Button';
ButtonWithForwardRef.defaultProps = Button.defaultProps;

Button.displayName = 'Button';
export { ButtonWithForwardRef };
export default Button;
