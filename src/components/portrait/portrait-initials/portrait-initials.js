import React from 'react';
import classNames from 'classnames';
import MD5 from 'crypto-js/md5';

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
    initials: React.PropTypes.string
  }

  static defaultProps = {
    size: 'lmed',
    shape: 'standard',
    initials: 'U'
  };

  shouldComponentUpdate = (nextProps) => {
    return nextProps.initials !== this.props.initials ||
           nextProps.size !== this.props.size ||
           nextProps.shape !== this.props.shape;
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
      `ui-portrait--${ this.props.shape }`,
      this.props.className
    );
  }

  get generateInitials() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    let size = this.numericSizes[this.props.size];
 
    // Generate a random color every time function is called
    let color =  "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
 
    // Set canvas with & height
    canvas.width = size;
    canvas.height = size;
 
    // Select a font family to support different language characters
    // like Arial
    context.font = Math.round(canvas.width / 2) + "px Arial";
    context.textAlign = "center";
 
    // Setup background and front color
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFF";
    context.fillText(this.props.initials, size / 2, size / 1.5);
 
    // Set image representation in default format (png)
    let dataURI = canvas.toDataURL();
 
    // Dispose canvas element
    canvas = null;
 
    return dataURI;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    // return (
    //   <div className='ui-portrait-initials'>
    //     { this.props.initials }
    //   </div>
    // );
    return (
      <img
        className={ this.mainClasses }
        src={ this.generateInitials }
        alt={ this.props.alt }
      />
    );
  }
}

export default Portrait;
