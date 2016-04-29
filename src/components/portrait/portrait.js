import React from 'react';
import classNames from 'classnames';
import PortraitInitials from './portrait-initials';
import MD5 from 'crypto-js/md5';

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
     * Size of the img
     * Options: small, smed, lmed, large
     *
     * @property size
     * @type {String}
     */
    size: React.PropTypes.string,

    /**
     * Source of the image
     *
     * @property src
     * @type {String}
     */
    src: React.PropTypes.string, 

    /**
     * Gravatar email
     *
     * @property src
     * @type {String}
     */
    gravatar: React.PropTypes.string,

    /**
     * Alternate text for image
     *
     * @property src
     * @type {String}
     */
    alt: React.PropTypes.string,

    /**
     * Shape of the portrait
     * Options - standard, circle, leaf
     *
     * @property shape
     * @type {String}
     */
    shape: React.PropTypes.string,

    /**
     * Initials to display as image
     *
     * @property initials
     * @type {String}
     * @default 'U'
     */
    initials: React.PropTypes.string,

    /**
     * Forces the user of initials
     *
     * @property useInitials
     * @type {Boolean}
     * @default false
     */
    useInitials: React.PropTypes.bool
  }

  static defaultProps = {
    size: 'lmed',
    shape: 'standard',
    initials: 'U',
    useInitials: false
  };

  state = {
    error: false
  }

  /**
   * Props for the HTML Img
   *
   * @method imgProps
   * @return {Object} props
   */
  get imgProps() {
    if (this.props.gravatar) {
      return this.gravatarProps;
    }

    return {
      src: this.props.src,
      alt: this.props.alt
    };
  }

  /**
   * Gets src url based on passed gravatar email
   *
   * @method gravatarProps
   * @return {Object}
   */
  get gravatarProps() {
    let base = 'http://www.gravatar.com/avatar/',
        hash = MD5(this.props.gravatar.toLowerCase()),
        size = this.numericSizes[this.props.size];

    return {
      src: `${base}${hash}?s=${size}`,
      alt: this.props.alt || this.props.gravatar
    };
  }

  /**
   * Maps size to width/height value
   *
   * @method numericSizes
   * @return {Object}
   */
  get numericSizes() {
    return {
      small: '25',
      smed: '50',
      lmed: '70',
      large: '100'
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
      'ui-portrait',
      `ui-portrait--${ this.props.size }`,
      `ui-portrait--${ this.props.shape }`,
      this.props.className
    );
  }

  onError = (ev) => {
    this.setState({ error: true });
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (this.props.useInitials || this.state.error) {
      return (
        <PortraitInitials
          className={ this.props.className }
          alt={ this.props.alt }
          size={ this.props.size }
          shape={ this.props.shape }
          initials={ this.props.initials }
        />
      );
    } else {
      return (
        <img
          className={ this.mainClasses }
          { ...this.imgProps }
          onError={ this.onError }
        />
      );
    }
  }
}

export default Portrait;
