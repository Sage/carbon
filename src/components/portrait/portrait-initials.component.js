import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import getSizeParams from './portrait-size.config';
import BaseTheme from '../../style/themes/base';
import Browser from '../../utils/helpers/browser';
import { isClassic } from '../../utils/helpers/style-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import { StyledPortraitInitials, StyledPortraitInitialsImg, getColorsForInitials } from './portrait.style';

class PortraitInitials extends React.Component {
  /** Cache of the initials graphic. */
  cachedImageDataUrl = null;

  /** Invoked before a mounted component receives new props. */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const shouldClearCache = (
      this.props.theme !== nextProps.theme
      || this.props.initials !== nextProps.initials
      || this.props.size !== nextProps.size
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

    const { theme, size, darkBackground } = this.props;
    const { textColor, bgColor } = getColorsForInitials(theme, darkBackground);

    let canvas = Browser.getDocument().createElement('canvas');
    let context = canvas.getContext('2d');
    let { dimensions } = getSizeParams(theme, size);

    if (!isClassic(theme)) {
      // For non-Classic themes, reduce the size by 2 pixels to
      // allow for the CSS border around the canvas <img> element.
      dimensions -= 2;
    }

    // Set canvas with & height
    canvas.width = dimensions;
    canvas.height = dimensions;

    // Select a font family to support different language characters
    // like Arial
    context.font = `${Math.round(canvas.width / 2.4)}px Lato, Arial`;
    context.textAlign = 'center';

    // Setup background and front color
    context = this.applyBackground(context, dimensions, bgColor);
    context = this.applyText(context, dimensions, textColor);

    // Set image representation in default format (png)
    const dataURI = canvas.toDataURL();

    // Dispose canvas element
    canvas = null;

    this.cachedImageDataUrl = dataURI;

    return this.cachedImageDataUrl;
  }

  /** Applies the background colour to the canvas. */
  applyBackground(canvasContext, dimensions, bgColor) {
    canvasContext.fillStyle = bgColor;
    canvasContext.fillRect(0, 0, dimensions, dimensions);

    return canvasContext;
  }

  /** Applies the initials text to the canvas. */
  applyText(canvasContext, dimensions, textColor) {
    const letters = this.props.initials.slice(0, 3);

    canvasContext.fillStyle = textColor;
    canvasContext.fillText(letters.toUpperCase(), dimensions / 2, dimensions / 1.5);

    return canvasContext;
  }

  /** Renders the component. */
  render() {
    const {
      size, shape, theme, ...otherProps
    } = this.props;
    return (
      <StyledPortraitInitials
        data-element='initials'
        size={ size }
        shape={ shape }
        theme={ theme }
        { ...otherProps }
      >
        <StyledPortraitInitialsImg src={ this.generateDataUrl() } alt={ this.props.alt } />
      </StyledPortraitInitials>
    );
  }
}

PortraitInitials.propTypes = {
  /** The theme to use. */
  theme: PropTypes.object,
  /** The user's initials to render. */
  initials: PropTypes.string.isRequired,
  /** The size of the initials image. */
  size: PropTypes.oneOf([...OptionsHelper.sizesFull, ...OptionsHelper.sizesPortrait]).isRequired,
  /** Use a dark background. */
  darkBackground: PropTypes.bool,
  /** The shape of the Portrait. */
  shape: PropTypes.oneOf([...OptionsHelper.shapesVaried, ...OptionsHelper.shapesPortrait]),
  /** The `alt` HTML string. */
  alt: PropTypes.string
};

PortraitInitials.defaultProps = {
  shape: 'square',
  theme: BaseTheme
};

export default withTheme(PortraitInitials);
