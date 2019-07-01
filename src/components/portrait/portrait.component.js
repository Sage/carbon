import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import PortraitGravatar from './portrait-gravatar.component';
import PortraitInitials from './portrait-initials.component';
import StyledPortrait, { StyledCustomImg, StyledIcon } from './portrait.style';

function Icon(iconProps) {
  const { darkBackground, shape, size } = iconProps;
  return (
    <StyledIcon
      type='individual'
      size={ size }
      shape={ shape }
      darkBackground={ darkBackground }
    />
  );
}

function Initials(initialsProps) {
  const {
    alt, darkBackground, initials, size
  } = initialsProps;
  return (
    <PortraitInitials
      size={ size }
      initials={ initials }
      darkBackground={ darkBackground }
      alt={ alt }
    />
  );
}

function Gravatar(gravatarProps) {
  const { alt, gravatar, size } = gravatarProps;
  return (
    <PortraitGravatar
      gravatarEmail={ gravatar }
      size={ size }
      alt={ alt }
    />
  );
}

function CustomImg(customimgProps) {
  const { alt, size, src } = customimgProps;
  return (
    <StyledCustomImg
      src={ src }
      alt={ alt }
      size={ size }
      data-element='user-image'
    />
  );
}

function Portrait(props) {
  const { gravatar, initials, src } = props;
  const showIcon = Boolean(!src && !initials);
  const showInitials = Boolean(!src && initials);
  const showGravatar = Boolean(gravatar);
  const showCustomImg = Boolean(!gravatar && src);

  return (
    <StyledPortrait
      showIcon={ showIcon }
      showInitials={ showInitials }
      showGravatar={ showGravatar }
      showCustomImg={ showCustomImg }
      { ...props }
      { ...tagComponent('portrait', props) }
    >
      {showIcon && <Icon { ...props } />}
      {showInitials && <Initials { ...props } />}
      {showGravatar && <Gravatar { ...props } />}
      {showCustomImg && <CustomImg { ...props } />}
    </StyledPortrait>
  );
}

Portrait.propTypes = {
  /** The size of the Portrait. */
  size: PropTypes.oneOf(OptionsHelper.sizesFull),
  /** A custom image URL. */
  src: (props) => {
    if (!props.gravatar && !props.src && !props.initials) {
      throw new Error('Portrait requires a prop of "src", "gravatar" or "initials"');
    } else if (props.gravatar && props.src) {
      throw new Error('Portrait requires a prop of "src" or "gravatar" but not both');
    }
  },
  /** An email address registered with Gravatar. */
  gravatar: PropTypes.string,
  /** The `alt` HTML string. */
  alt: PropTypes.string,
  /** The shape of the Portrait. */
  shape: PropTypes.oneOf(OptionsHelper.shapesVaried),
  /** The initials to render in the Portrait. */
  initials: PropTypes.string,
  /** Use a dark background. */
  darkBackground: PropTypes.bool
};

Portrait.defaultProps = {
  size: 'medium',
  shape: 'standard',
  darkBackground: false,
  alt: ''
};

export default Portrait;
