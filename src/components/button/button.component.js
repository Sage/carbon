import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import StyledButton, { StyledButtonSubtext } from './button.style';
import tagComponent from '../../utils/helpers/tags';
import Link from '../link';
import OptionsHelper from '../../utils/helpers/options-helper';

const Button = (props) => {
  const {
    as,
    disabled,
    iconPosition,
    iconType,
    theme,
    ...rest
  } = props;

  if (props.href || props.to) return renderLink(theme, rest, props);

  return (
    <StyledButton
      disabled={ disabled }
      renderAs={ as }
      role='button'
      iconType={ iconType }
      iconPosition={ iconPosition }
      variant={ theme }
      { ...tagComponent('button', props) }
      { ...rest }
    >
      { renderChildren(props) }
    </StyledButton>
  );
};

function renderLink(theme, rest, props) {
  return (
    <Link
      role='button'
      variant={ theme }
      { ...tagComponent('button', props) }
      { ...rest }
    >
      { renderChildren(props) }
    </Link>
  );
}

function renderChildren({
  iconType,
  iconPosition,
  size,
  subtext,
  children
}) {
  return (
    <>
      { iconType && iconPosition === 'before' && <Icon type={ iconType } /> }
      <span>
        <span data-element='main-text'>{ children }</span>
        { size === 'large' && <StyledButtonSubtext data-element='subtext'>{ subtext }</StyledButtonSubtext> }
      </span>
      { iconType && iconPosition === 'after' && <Icon type={ iconType } /> }
    </>
  );
}

Button.propTypes = {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "destructive" | "darkBackground" */
  as: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transfrom button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
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
  /** Set this prop to pass in legacy theme color variants */
  theme: PropTypes.oneOf(OptionsHelper.buttonColors),
  /** Used to transfrom button into anchor */
  to: PropTypes.string
};

Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  disabled: false,
  iconPosition: '',
  iconType: '',
  subtext: '',
  theme: 'blue'
};

export default Button;
