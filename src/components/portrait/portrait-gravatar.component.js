import React from 'react';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class PortraitGravatar extends React.Component {
  /** Generates the Gravatar URL for the specified email address and dimensions. */
  gravatarSrc() {
    const { gravatarEmail, dimensions } = this.props;

    const base = 'https://www.gravatar.com/avatar/';
    const hash = MD5(gravatarEmail.toLowerCase());

    return `${base}${hash}?s=${dimensions}&d=blank`;
  }

  /** Renders the component. */
  render() {
    return (
      <img
        src={ this.gravatarSrc() }
        alt={ this.props.alt }
        className={ this.props.className }
        data-element='user-image'
      />
    );
  }
}

PortraitGravatar.propTypes = {
  /** A custom CSS class for the component. */
  className: PropTypes.string,
  /** The user's email address for the Gravatar. */
  gravatarEmail: PropTypes.string.isRequired,
  /** The dimensions (size) to render the Gravatar, in pixels. */
  dimensions: PropTypes.number.isRequired,
  /** The `alt` HTML string. */
  alt: PropTypes.string
};

export default PortraitGravatar;
