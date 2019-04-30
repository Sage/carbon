import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import StyledButton, { StyledButtonSubtext } from './button.style';
import Link from '../link';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';

const Button = (props) => {
  const {
    as,
    buttonType,
    disabled,
    iconPosition,
    theme,
    forwardRef,
    ...rest
  } = props;

  return (
    <StyledButton
      disabled={ disabled }
      buttonType={ buttonType || as }
      role='button'
      iconPosition={ iconPosition }
      legacyColorVariant={ theme }
      { ...tagComponent('button', props) }
      { ...rest }
      ref={ forwardRef }
    >
      { renderChildren(props) }
    </StyledButton>
  );
};

function renderChildren(props) {
  const {
    iconType,
    iconPosition,
    size,
    subtext,
    children,
    href,
    to
  } = props;
  let buttonContent = (
    <>
      <span data-element='main-text'>{ children }</span>
      { size === 'large' && <StyledButtonSubtext data-element='subtext'>{ subtext }</StyledButtonSubtext> }
    </>
  );

  if (href || to) {
    buttonContent = <Link { ...props }>{buttonContent}</Link>;
  }

  return (
    <>
      { iconType && iconPosition === 'before' && <Icon type={ iconType } /> }
      {buttonContent}
      { iconType && iconPosition === 'after' && <Icon type={ iconType } /> }
    </>
  );
}

Button.propTypes = {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "destructive" | "darkBackground" */
  buttonType: PropTypes.oneOf(OptionsHelper.themesBinary),
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
  subtext: (props) => {
    if (props.subtext.length > 0 && props.size !== 'large') {
      throw new Error('subtext prop has no effect unless the button is large');
    } else {
      return null;
    }
  },
  /** Ref to be forwarded */
  forwardRef: PropTypes.func,
  /** Button types for legacy theme: "primary" | "secondary" */
  as: PropTypes.oneOf(OptionsHelper.themesBinaryClassic),
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

/** HOC created as a workaround for a Storybook rendering wrong PropTables and Story Source when forwarding a ref */
const withForwardRef = () => {
  const ForwardRefButton = React.forwardRef((props, ref) => <Button forwardRef={ ref } { ...props } />);

  ForwardRefButton.displayName = 'Button';
  ForwardRefButton.defaultProps = Button.defaultProps;

  return ForwardRefButton;
};

export default withForwardRef(Button);
