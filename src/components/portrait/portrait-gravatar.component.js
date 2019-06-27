import React from 'react';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { withTheme } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import { StyledPortraitGravatar, getSizeParams } from './portrait.style';
import OptionsHelper from '../../utils/helpers/options-helper';

class PortraitGravatar extends React.Component {
  /** Generates the Gravatar URL for the specified email address and dimensions. */
  gravatarSrc() {
    const { theme, gravatarEmail, size } = this.props;
    const { dimensions } = getSizeParams(theme, size);
    const base = 'https://www.gravatar.com/avatar/';
    const hash = MD5(gravatarEmail.toLowerCase());

    return `${base}${hash}?s=${dimensions}&d=blank`;
  }

  /** Renders the component. */
  render() {
    return (
      <StyledPortraitGravatar
        src={ this.gravatarSrc() }
        alt={ this.props.alt }
        data-element='user-image'
      />
    );
  }
}

PortraitGravatar.propTypes = {
  /** The theme to use. */
  theme: PropTypes.object,
  /** The user's email address for the Gravatar. */
  gravatarEmail: PropTypes.string.isRequired,
  /** The size of the Gravatar. */
  size: PropTypes.oneOf(OptionsHelper.sizesFull).isRequired,
  /** The `alt` HTML string. */
  alt: PropTypes.string
};

PortraitGravatar.defaultProps = {
  theme: BaseTheme
};

export default withTheme(PortraitGravatar);
