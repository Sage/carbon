import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MD5 from 'crypto-js/md5';
import tagComponent from '../../utils/helpers/tags';
import Browser from '../../utils/helpers/browser';

import Icon from './../icon';

/**
 * A Portrait Widget.
 *
 * == How to use a Portrait in a component
 *
 * In your file
 *
 *   import Portrait from 'carbon/lib/components/portrait';
 *
 * To render the Portrait
 *
 *   <Portrait src='/my-image' alt='my image' />
 *
 * To render a gravatar portrait
 *
 *   <Portrait gravatar='mygrav@email.com' />
 *
 * You can pass a 'size' property to adjust the size of the portrait
 *    The default is lmed
 *    options: small, smed, lmed, large
 *
 * For additional properties specific to this component, see propTypes.
 */
class Portrait extends React.Component {


  static propTypes = {

    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Size of the img
     * Options: small, smed, lmed, large
     *
     * @property size
     * @type {String}
     */
    size: PropTypes.string,

    /**
     * Source of the image
     *
     * @property src
     * @type {String}
     */
    src: (props) => {
      if (!props.gravatar && !props.src) {
        throw new Error('Portrait requires a prop of "src" OR a prop of "gravatar"');
      } else if (props.gravatar && props.src) {
        throw new Error('Portrait requires a prop of "src" OR a prop of "gravatar" but not both');
      }
    },

    /**
     * Gravatar email
     *
     * @property src
     * @type {String}
     */
    gravatar: PropTypes.string,

    /**
     * Alternate text for image
     *
     * @property src
     * @type {String}
     */
    alt: PropTypes.string,

    /**
     * Shape of the portrait
     * Options - standard, circle, leaf
     *
     * @property shape
     * @type {String}
     */
    shape: PropTypes.string,

    /**
     * Initials to display as image
     *
     * @property initials
     * @type {String}
     * @default 'U'
     */
    initials: PropTypes.string,

    /**
     * If to use a dark background instead of a light background.
     *
     * @property darkBackground
     * @type {Boolean}
     * @default false
     */
    darkBackground: PropTypes.bool
  }

  static defaultProps = {
    alt: '',
    size: 'medium',
    shape: 'standard'
  };

  /**
   * @method componentWillReceiveProps
   * @param {Object}
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.initials !== nextProps.initials ||
        this.props.size !== nextProps.size) {
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
   * Props for the HTML Img
   *
   * @method imgSrc
   * @return {String}
   */
  get imgSrc() {
    if (this.props.gravatar) { return this.gravatarSrc; }
    return this.props.src;
  }

  /**
   * Gets src url based on passed gravatar email
   *
   * @method gravatarSrc
   * @return {String}
   */
  get gravatarSrc() {
    const base = 'https://www.gravatar.com/avatar/';
    const hash = MD5(this.props.gravatar.toLowerCase());
    const size = this.numericSizes[this.props.size];

    return `${base}${hash}?s=${size}&d=blank`;
  }

  /**
   * Generates a graphic with initials.
   *
   * @method generateInitials
   * @return {String}
   */
  get generateInitials() {
    if (this.memoizeInitials) {
      return this.memoizeInitials;
    }

    const size = this.numericSizes[this.props.size];
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
    const color = this.props.darkBackground ? '#4E545F' : '#D8D9DC';

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

    context.fillStyle = '#636872';
    context.fillText(letters.toUpperCase(), size / 2, size / 1.5);

    return context;
  }

  /**
   * Maps size to width/height value
   *
   * @method numericSizes
   * @return {Object}
   */
  get numericSizes() {
    return {
      'extra-small': '25',
      small: '30',
      'medium-small': '40',
      medium: '60',
      'medium-large': '70',
      large: '100',
      'extra-large': '120'
    };
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-portrait',
      'carbon-portrait--image',
      `carbon-portrait--${this.props.size}`,
      `carbon-portrait--${this.props.shape}`,
      this.props.className
    );
  }

  /**
   * Return the html for the initials image.
   *
   * @method initialsImage
   * @return {Object}
   */
  get initialsImage() {
    // if not using src, generate initials for potential fallback
    if (this.props.src) { return null; }
    if (!this.props.initials) { return this.sansInitialsImage; }

    return (
      <img
        data-element='initials'
        className='carbon-portrait__img carbon-portrait__initials'
        src={ this.generateInitials }
        alt={ this.props.alt || '' }
      />
    );
  }

  /**
   * Return the html for the avatar image.
   *
   * @method avatarImage
   * @return {Object}
   */
  get avatarImage() {
    return (
      <img
        data-element='user-image'
        className='carbon-portrait__img carbon-portrait__avatar'
        src={ this.imgSrc }
        alt={ this.props.alt || '' }
      />
    );
  }

  /**
   *
   * Return the html for the Icon displayed in the event that both the image and initials are missing
   *
   * @method sansInitialsImage
   * @return {Object}
   */
  get sansInitialsImage() {
    return (
      <Icon
        className='carbon-portrait__img carbon-portrait__sans-initials'
        type='individual'
      />
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('portrait', this.props) }>
        { this.initialsImage }
        { this.avatarImage }
      </div>
    );
  }
}

export default Portrait;
