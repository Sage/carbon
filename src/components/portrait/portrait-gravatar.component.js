import React from 'react';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class PortraitGravatar extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * The user's email address for the Gravatar.
     */
    gravatarEmail: PropTypes.string.isRequired,

    /**
     * The dimensions (size) to render the Gravatar, in pixels.
     */
    dimensions: PropTypes.number.isRequired,

    /**
     * Defines the alt HTML string.
     */
    alt: PropTypes.string
  }

  /**
   * Gets src url based on passed gravatar email
   *
   * @method gravatarSrc
   * @return {String}
   */
  gravatarSrc() {
    const { gravatarEmail, dimensions } = this.props;

    const base = 'https://www.gravatar.com/avatar/';
    const hash = MD5(gravatarEmail.toLowerCase());

    return `${base}${hash}?s=${dimensions}&d=blank`;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
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

export default PortraitGravatar;
