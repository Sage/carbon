import React from "react";
import MD5 from "crypto-js/md5";

import { StyledPortraitGravatar } from "./portrait.style";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";
import { PortraitSizes, PortraitShapes } from "./portrait.component";

export interface PortraitGravatarProps {
  /** The user's email address for the Gravatar. */
  gravatarEmail: string;
  /** The size of the Gravatar. */
  size: PortraitSizes;
  /** The shape of the Gravatar. */
  shape?: PortraitShapes;
  /** The `alt` HTML string. */
  alt?: string;
  /** A callback to execute if the Gravatar image fails to load. */
  errorCallback?: () => void;
}

const PortraitGravatar = ({
  gravatarEmail,
  size,
  alt,
  shape = "square",
  errorCallback,
}: PortraitGravatarProps) => {
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
    />
  );
};

export default PortraitGravatar;
