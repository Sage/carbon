import React from 'react';
import PropTypes from 'prop-types';

import Browser from '../../utils/helpers/browser';

class PortraitInitials extends React.Component {
  static propTypes = {
    /** A custom CSS class for the component. */
    className: PropTypes.string,
    /** The user's initials to render. */
    initials: PropTypes.string.isRequired,
    /** The dimensions (size) of the canvas, in pixels. */
    dimensions: PropTypes.number.isRequired,
    /** Use a dark background. */
    darkBackground: PropTypes.bool,
    /** The `alt` HTML string. */
    alt: PropTypes.string
  }

  static defaultProps = {
    darkBackground: false
  }

  /** Cache of the initials graphic. */
  cachedImageDataUrl = null;

  /** Invoked before a mounted component receives new props. */
  componentWillReceiveProps(nextProps) {
    const shouldClearCache = (
      this.props.initials !== nextProps.initials
      || this.props.dimensions !== nextProps.dimensions
      || this.props.darkBackground !== nextProps.darkBackground
    );

    if (shouldClearCache) {
      this.cachedImageDataUrl = null;
    }
  }

  /** Generates a graphic with initials. */
  generateDataUrl() {
    if (this.cachedImageDataUrl) {
      return this.cachedImageDataUrl;
    }

    let canvas = Browser.getDocument().createElement('canvas');
    let context = canvas.getContext('2d');

    // Set canvas with & height
    canvas.width = this.props.dimensions;
    canvas.height = this.props.dimensions;

    // Select a font family to support different language characters
    // like Arial
    context.font = `${Math.round(canvas.width / 2.4)}px Lato, Arial`;
    context.textAlign = 'center';

    // Setup background and front color
    context = this.applyBackground(context);
    context = this.applyText(context);

    // Set image representation in default format (png)
    const dataURI = canvas.toDataURL();

    // Dispose canvas element
    canvas = null;

    this.cachedImageDataUrl = dataURI;

    return this.cachedImageDataUrl;
  }

  /** Applies the background colour to the canvas. */
  applyBackground(canvasContext) {
    const color = this.props.darkBackground ? '#8A8E95' : '#D8D9DC';

    canvasContext.fillStyle = color;
    canvasContext.fillRect(0, 0, this.props.dimensions, this.props.dimensions);

    return canvasContext;
  }

  /** Applies the initials text to the canvas. */
  applyText(canvasContext) {
    const letters = this.props.initials.slice(0, 3);

    canvasContext.fillStyle = this.props.darkBackground ? '#FFFFFF' : '#595959';
    canvasContext.fillText(letters.toUpperCase(), this.props.dimensions / 2, this.props.dimensions / 1.5);

    return canvasContext;
  }

  /** Renders the component. */
  render() {
    return (
      <img
        src={ this.generateDataUrl() }
        alt={ this.props.alt }
        className={ this.props.className }
        data-element='initials'
      />
    );
  }
}

export default PortraitInitials;
