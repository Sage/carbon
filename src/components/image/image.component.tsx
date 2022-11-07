import React from "react";
import invariant from "invariant";
import { Expand } from "../../__internal__/utils/helpers/types";
import { StyledImage, StyledImageProps } from "./image.style";

export const Image = ({
  alt,
  src,
  children,
  ...rest
}: Expand<StyledImageProps>) => {
  invariant(
    !src || !children,
    "The 'Image' component renders as an 'img' element when the 'src' prop is used and therefore does not accept children."
  );

  invariant(
    !src || (alt && typeof alt === "string"),
    "Please provide an 'alt' string when rendering the 'Image' component as an 'img' element."
  );

  return (
    <StyledImage alt={alt} src={src} {...rest}>
      {children}
    </StyledImage>
  );
};

Image.displayName = "Image";

export default Image;

export type { StyledImageProps as ImageProps } from "./image.style";
