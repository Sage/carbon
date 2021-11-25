import React from "react";
import PropTypes from "prop-types";
import MD5 from "crypto-js/md5";

import { StyledPortraitGravatar } from "./portrait.style";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";

const PortraitGravatar = ({
  gravatarEmail,
  size,
  alt,
  shape,
  errorCallback,
  ...rest
}) => {
  const gravatarSrc = () => {
    const { dimensions } = PORTRAIT_SIZE_PARAMS[size];
    const base = "https://www.gravatar.com/avatar/";
    const hash = MD5(gravatarEmail.toLowerCase());
    const fallbackOption = "404"; // "Return an HTTP 404 File Not Found response"

    /** @see https://en.gravatar.com/site/implement/images/#default-image */
    return `${base}${hash}?s=${dimensions}&d=${fallbackOption}`;
  };

  return (
    <StyledPortraitGravatar
      src={gravatarSrc()}
      alt={alt}
      size={size}
      shape={shape}
      onError={errorCallback}
      data-element="user-image"
      {...rest}
    />
  );
};

PortraitGravatar.propTypes = {
  /** The theme to use. */
  theme: PropTypes.object,
  /** The user's email address for the Gravatar. */
  gravatarEmail: PropTypes.string.isRequired,
  /** The size of the Gravatar. */
  size: PropTypes.oneOf(["XS", "S", "M", "ML", "L", "XL", "XXL"]).isRequired,
  /** The shape of the Gravatar. */
  shape: PropTypes.oneOf(["circle", "square"]),
  /** The `alt` HTML string. */
  alt: PropTypes.string,
  /** A callback to execute if the Gravatar image fails to load. */
  errorCallback: PropTypes.func,
};

PortraitGravatar.defaultProps = {
  shape: "square",
};

export default PortraitGravatar;
