import React from 'react';
import classNames from 'classnames';
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
     * Required unless gravatar is provided
     *
     * @property src
     * @type {String}
     */
    src: function(props) {
      if (!props.gravatar && !props.src) {
        throw new Error(`Portrait requires a prop of 'src' OR a prop of 'gravatar'`);
      } else if (props.gravatar && props.src) {
        throw new Error(`Portrait requires a prop of 'src' OR a prop of 'gravatar' but not both`);
      }
    },

    /**
     * Gravatar email
     * Required unless src is provided
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
    alt: React.PropTypes.string
  }

  static defaultProps = {
    size: 'lmed'
  };

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

    let props = {};
    props.src = this.props.src;
    props.alt = this.props.alt;
    return props;
  }

  /**
   * Gets src url based on passed gravatar email
   *
   * @method gravatarProps
   * @return {Object}
   */
  get gravatarProps() {
    let base = 'http://www.gravatar.com/avatar/';
    let hash = MD5(this.props.gravatar.toLowerCase());
    let size = this.numericSizes[this.props.size];

    let props = {};
    props.src = `${base}${hash}?s=${size}`;
    props.alt = this.props.alt || this.props.gravatar;
    return props;
  }

  /**
   * Maps size to width/height value
   *
   * @method numericSizes
   * @return {Object}
   */
  get numericSizes() {
    return {
      small: '30',
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
      this.props.className
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
      <img
        className={ this.mainClasses }
        { ...this.imgProps }
      />
    );
  }
}

export default Portrait;
