import React, { useEffect, useState } from "react";
import tokens from "@sage/design-tokens/js/base/common";

import { PortraitSizes, PortraitShapes } from "./portrait.component";
import {
  StyledPortraitInitials,
  StyledPortraitInitialsImg,
  getColorsForInitials,
} from "./portrait.style";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";

export interface PortraitInitialsProps {
  /** The user's initials to render. */
  initials: string;
  /** The size of the initials image. */
  size: PortraitSizes;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** The shape of the Portrait. */
  shape?: PortraitShapes;
  /** The `alt` HTML string. */
  alt?: string;
}

const PortraitInitials = ({
  initials,
  size,
  shape = "circle",
  darkBackground,
  alt,
}: PortraitInitialsProps) => {
  const [cachedImageDataUrl, setCachedImageDataUrl] = useState<string>();

  useEffect(() => {
    setCachedImageDataUrl("");
  }, [initials, size, darkBackground]);

  const generateDataUrl = () => {
    if (cachedImageDataUrl) {
      return cachedImageDataUrl;
    }

    const { textColor, bgColor } = getColorsForInitials(darkBackground);

    let canvas: HTMLCanvasElement | null = document.createElement("canvas");
    const context = canvas.getContext("2d");

    let { dimensions } = PORTRAIT_SIZE_PARAMS[size];

    dimensions -= 2;

    // Set canvas with & height
    canvas.width = dimensions;
    canvas.height = dimensions;

    // Select a font family to support different language characters like Arial
    /* istanbul ignore else */
    if (context) {
      context.font = `${Math.round(canvas.width / 2.4)}px "Sage UI", Arial`;
      context.textAlign = "center";

      // Setup background and front color
      context.fillStyle = tokens[bgColor];
      context.fillRect(0, 0, dimensions, dimensions);
      context.fillStyle = tokens[textColor];
      context.fillText(
        initials.slice(0, 3).toUpperCase(),
        dimensions / 2,
        dimensions / 1.5
      );
    }

    // Set image representation in default format (png)
    const dataURI = canvas.toDataURL();

    // Dispose canvas element
    canvas = null;

    setCachedImageDataUrl(dataURI);

    return dataURI;
  };

  return (
    <StyledPortraitInitials
      data-element="initials"
      size={size}
      shape={shape}
      initials={initials}
    >
      <StyledPortraitInitialsImg src={generateDataUrl()} alt={alt} />
    </StyledPortraitInitials>
  );
};

export default PortraitInitials;
