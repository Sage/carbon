import React from "react";
import PropTypes from "prop-types";
import MD5 from "crypto-js/md5";
import { StyledPortraitGravatar } from "./portrait.style";
import sizeParams from "./portrait-size.config";
import OptionsHelper from "../../utils/helpers/options-helper";

class PortraitGravatar extends React.Component {
  /** Generates the Gravatar URL for the specified email address and dimensions. */
  gravatarSrc() {
    const { gravatarEmail, size } = this.props;
    const { dimensions } = sizeParams[size];
    const base = "https://www.gravatar.com/avatar/";
    const hash = MD5(gravatarEmail.toLowerCase());
    const fallbackOption = "404"; // "Return an HTTP 404 File Not Found response"

    /** @see https://en.gravatar.com/site/implement/images/#default-image */
    return `${base}${hash}?s=${dimensions}&d=${fallbackOption}`;
  }

  /** Renders the component. */
  render() {
    const { alt, size, shape, errorCallback, ...otherProps } = this.props;
    return (
      <StyledPortraitGravatar
        src={this.gravatarSrc()}
        alt={alt}
        size={size}
        shape={shape}
        onError={errorCallback}
        data-element="user-image"
        {...otherProps}
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
  size: PropTypes.oneOf(OptionsHelper.sizesPortrait).isRequired,
  /** The shape of the Gravatar. */
  shape: PropTypes.oneOf(OptionsHelper.shapesPortrait),
  /** The `alt` HTML string. */
  alt: PropTypes.string,
  /** A callback to execute if the Gravatar image fails to load. */
  errorCallback: PropTypes.func,
};

PortraitGravatar.defaultProps = {
  shape: "square",
};

export default PortraitGravatar;
