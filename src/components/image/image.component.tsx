import React from "react";
import invariant from "invariant";
import { StyledImage, StyledImageProps } from "./image.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

export const Image = ({
  alt,
  decorative = false,
  src,
  children,
  position,
  top,
  right,
  bottom,
  left,
  ...rest
}: StyledImageProps) => {
  invariant(
    !src || !children,
    "The 'Image' component renders as an 'img' element when the 'src' prop is used and therefore does not accept children.",
  );

  invariant(
    !src || (alt && typeof alt === "string") || decorative,
    "Please use the 'decorative' prop if the 'alt' text should be an empty value or provide an 'alt' string when rendering the 'Image' component as an 'img' element.",
  );

  return (
    <StyledImage
      alt={alt}
      decorative={decorative}
      src={src}
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      {...rest}
      {...tagComponent("image", rest)}
    >
      {children}
    </StyledImage>
  );
};

Image.displayName = "Image";

export default Image;

export type { StyledImageProps as ImageProps } from "./image.style";
