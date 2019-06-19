import React from 'react';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import tagComponent from '../../utils/helpers/tags';
import Browser from '../../utils/helpers/browser';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledPortrait, { StyledInitialsImage, StyledAvatarImage, StyledIcon } from './portrait.style';

class Portrait extends React.Component {
  /**
   * Maps size to width/height value.
   */
  static numericSizes = {
    'extra-small': '24',
    small: '32',
    'medium-small': '40',
    medium: '56',
    'medium-large': '72',
    large: '104',
    'extra-large': '128'
  }

  static propTypes = {
    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * Defines the size of the Portrait.
     */
    size: PropTypes.oneOf(OptionsHelper.sizesFull),

    /**
     * Define an image source.
     *
     */
    src: (props) => {
      if (!props.gravatar && !props.src && !props.initials) {
        throw new Error('Portrait requires a prop of "src", "gravatar" or "initials"');
      } else if (props.gravatar && props.src) {
        throw new Error('Portrait requires a prop of "src" or "gravatar" but not both');
      }
    },

    /**
     * Define an email address registered with gravatar.
     */
    gravatar: PropTypes.string,

    /**
     * Defines the alt HTML string.
     */
    alt: PropTypes.string,

    /**
     * Defines the shape of the Portrait.
     */
    shape: PropTypes.oneOf(OptionsHelper.shapesVaried),

    /**
     * Define some initials to render in the Portrait.
     */
    initials: PropTypes.string,

    /**
     * Switch to a dark background (requires a hard re-render).
     */
    darkBackground: PropTypes.bool
  }

  static defaultProps = {
    size: 'medium',
    shape: 'standard',
    darkBackground: false,
    alt: ''
  };

  /**
   * @method componentWillReceiveProps
   * @param {Object}
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.initials !== nextProps.initials
        || this.props.size !== nextProps.size) {
      this.memoizeInitials = null;
    }
  }

  /**
   * Cache the initials graphic.
   *
   * @param memoizeInitials
   * @type {String}
   */
  memoizeInitials = null;

  /**
   * Gets src url based on passed gravatar email
   *
   * @method gravatarSrc
   * @return {String}
   */
  gravatarSrc() {
    const base = 'https://www.gravatar.com/avatar/';
    const hash = MD5(this.props.gravatar.toLowerCase());
    const size = Portrait.numericSizes[this.props.size];

    return `${base}${hash}?s=${size}&d=blank`;
  }

  /**
   * Generates a graphic with initials.
   *
   * @method generateInitials
   * @return {String}
   */
  generateInitials() {
    if (this.memoizeInitials) {
      return this.memoizeInitials;
    }

    const size = Portrait.numericSizes[this.props.size];
    let canvas = Browser.getDocument().createElement('canvas');
    let context = canvas.getContext('2d');

    // Set canvas with & height
    canvas.width = size;
    canvas.height = size;

    // Select a font family to support different language characters
    // like Arial
    context.font = `${Math.round(canvas.width / 2.4)}px Lato, Arial`;
    context.textAlign = 'center';

    // Setup background and front color
    context = this.applyBackground(context, size);
    context = this.applyText(context, size);

    // Set image representation in default format (png)
    const dataURI = canvas.toDataURL();

    // Dispose canvas element
    canvas = null;

    this.memoizeInitials = dataURI;

    return this.memoizeInitials;
  }

  /**
   * Applies background to canvas.
   *
   * @method applyBackground
   * @return {Object}
   */
  applyBackground = (context, size) => {
    const color = this.props.darkBackground ? '#8A8E95' : '#D8D9DC';

    context.fillStyle = color;
    context.fillRect(0, 0, size, size);

    return context;
  }

  /**
   * Applies text to canvas.
   *
   * @method applyText
   * @return {Object}
   */
  applyText = (context, size) => {
    const letters = this.props.initials ? this.props.initials.slice(0, 3) : '';

    context.fillStyle = this.props.darkBackground ? '#FFFFFF' : '#595959';
    context.fillText(letters.toUpperCase(), size / 2, size / 1.5);

    return context;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    const {
      alt, darkBackground, gravatar, initials, shape, size, src
    } = this.props;

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
        { ...this.props }
        { ...tagComponent('portrait', this.props) }
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
            <StyledInitialsImage
              src={ this.generateInitials() }
              alt={ alt }
              data-element='initials'
            />
          )
        }

        {showGravatar
          && (
            <StyledAvatarImage
              src={ this.gravatarSrc() }
              alt={ alt }
              size={ size }
              data-element='user-image'
            />
          )
        }

        {showCustomImg
          && (
            <StyledAvatarImage
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
}

export default Portrait;
