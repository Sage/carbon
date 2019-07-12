import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import OptionsHelper from '../../utils/helpers/options-helper';
import PortraitGravatar from './portrait-gravatar.component';
import PortraitInitials from './portrait-initials.component';
import StyledPortrait, { StyledCustomImg, StyledIcon } from './portrait.style';

function Portrait(props) {
  const {
    alt, darkBackground, gravatar, initials, shape, size, src
  } = props;

  function renderIcon() {
    if (!src && !initials) {
      return (
        <StyledIcon
          type='individual'
          size={ size }
          shape={ shape }
          darkBackground={ darkBackground }
        />
      );
    }
    return null;
  }

  function renderInitials() {
    if (!src && initials) {
      return (
        <PortraitInitials
          size={ size }
          shape={ shape }
          initials={ initials }
          darkBackground={ darkBackground }
          alt={ alt }
        />
      );
    }
    return null;
  }

  function renderGravatar() {
    if (gravatar) {
      return (
        <PortraitGravatar
          gravatarEmail={ gravatar }
          shape={ shape }
          size={ size }
          alt={ alt }
        />
      );
    }
    return null;
  }

  function renderCustomImg() {
    if (!gravatar && src) {
      return (
        <StyledCustomImg
          src={ src }
          alt={ alt }
          size={ size }
          shape={ shape }
          data-element='user-image'
        />
      );
    }
    return null;
  }

  return (
    <StyledPortrait { ...props } { ...tagComponent('portrait', props) }>
      {renderIcon()}
      {renderInitials()}
      {renderGravatar()}
      {renderCustomImg()}
    </StyledPortrait>
  );
}

Portrait.propTypes = {
  /** The size of the Portrait. */
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]),
  /** A custom image URL. */
  src: (props) => {
    if (props.src && typeof props.src !== 'string') {
      throw new Error(
        `Invalid prop \`src\` of type \`${typeof props.src}\` supplied to \`Portrait\`, expected \`string\`.`
      );
    } else if (props.gravatar && props.src) {
      throw new Error('Portrait requires a prop of "src" or "gravatar" but not both');
    }
  },
  /** An email address registered with Gravatar. */
  gravatar: PropTypes.string,
  /** The `alt` HTML string. */
  alt: PropTypes.string,
  /** The shape of the Portrait. */
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait]),
  /** The initials to render in the Portrait. */
  initials: PropTypes.string,
  /** Use a dark background. */
  darkBackground: PropTypes.bool
};

Portrait.defaultProps = {
  size: 'M',
  shape: 'square',
  darkBackground: false,
  alt: ''
};

export default Portrait;
