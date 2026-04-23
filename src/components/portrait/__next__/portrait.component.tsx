import React, { useEffect, useState } from "react";
import { MarginProps } from "styled-system";

import { IconType } from "../../icon";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";

import {
  StyledCustomImg,
  StyledIcon,
  StyledPortraitContainer,
  StyledPortraitInitials,
} from "./portrait.style";
import { filterStyledSystemMarginProps } from "../../../style/utils";

export type PortraitShapes = "circle" | "square";

export type PortraitSizes = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export interface PortraitProps extends MarginProps, TagProps {
  /** @private @ignore */
  className?: string;
  /** A custom image URL. */
  src?: string;
  /** The size of the Portrait. */
  size?: PortraitSizes;
  /** @private @ignore */
  name?: string;
  /** The `alt` HTML string. */
  alt?: string;
  /** The shape of the Portrait. */
  shape?: PortraitShapes;
  /** Icon to be rendered as a fallback. */
  iconType?: IconType;
  /** The initials to render in the Portrait. */
  initials?: string;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Color variant*/
  variant?: "black" | "blue" | "teal" | "green" | "lime" | "orange" | "red" | "pink" | "purple" | "slate" | "grey";
  /** The color theme of the Portrait. */
  colorTheme?: "light" | "dark";
}

export const Portrait = ({
  alt,
  className,
  name,
  iconType = "individual",
  initials,
  shape = "circle",
  size = "M",
  src,
  onClick,
  variant = "black",
  colorTheme = "light",
  ...rest
}: PortraitProps) => {

  const [externalError, setExternalError] = useState(false);
  const hasValidImg = Boolean(src) && !externalError;

  useEffect(() => {
    setExternalError(false);
  }, [src]);

  const tagProps = tagComponent("portrait", rest);

  const renderComponent = () => {
    let portrait = <StyledIcon type={iconType} size={size} />;

    if (initials) {
      portrait = (
        <StyledPortraitInitials size={size} data-element="initials" variant={variant} colorTheme={colorTheme} >
          {initials.slice(0, 3).toUpperCase()}
        </StyledPortraitInitials>
      );
    }

    if (src && !externalError) {
      portrait = (
        <StyledCustomImg
          src={src}
          alt={alt || name || ""}
          data-element="user-image"
          onError={() => setExternalError(true)}
        />
      );
    }

    return (
      <StyledPortraitContainer
        {...filterStyledSystemMarginProps(rest)}
        onClick={onClick}
        className={className}
        {...tagProps}
        hasValidImg={hasValidImg}
        size={size}
        shape={shape}
        variant={variant}
        colorTheme={colorTheme} 
      >
        {portrait}
      </StyledPortraitContainer>
    );
  };

  return renderComponent();
};

export default Portrait;
