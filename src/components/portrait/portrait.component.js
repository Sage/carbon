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

      {showIcon
        && (
          <StyledIcon
            type='individual'
            size={ size }
            shape={ shape }
            darkBackground={ darkBackground }
          />
        )
      }

      {showInitials
        && (
          <PortraitInitials
            size={ size }
            initials={ initials }
            darkBackground={ darkBackground }
            alt={ alt }
          />
        )
      }

      {showGravatar
        && (
          <PortraitGravatar
            gravatarEmail={ gravatar }
            size={ size }
            alt={ alt }
          />
        )
      }

      {showCustomImg
        && (
          <StyledCustomImg
            src={ src }
            alt={ alt }
            size={ size }
            data-element='user-image'
          />
        )
      }

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
