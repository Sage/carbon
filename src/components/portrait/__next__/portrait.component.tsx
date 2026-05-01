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

export type PortraitShape = "circle" | "square";

export type PortraitSize = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";

export type PortraitVariant =
  | "black"
  | "blue"
  | "teal"
  | "green"
  | "lime"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "slate"
  | "grey";

export interface PortraitProps extends MarginProps, TagProps {
  /** @private @ignore */
  className?: string;
  /** A custom image URL. */
  src?: string;
  /** The size of the Portrait. */
  size?: PortraitSize;
  /** @private @ignore */
  name?: string;
  /** The `alt` HTML string. */
  alt?: string;
  /** The shape of the Portrait. */
  shape?: PortraitShape;
  /** Icon to be rendered as a fallback. */
  iconType?: IconType;
  /** The initials to render in the Portrait. */
  initials?: string;
  /** Prop for `onClick` events. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Color variant*/
  variant?: PortraitVariant;
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
  ...rest
}: PortraitProps) => {
  const [externalError, setExternalError] = useState(false);
  const hasValidImg = Boolean(src) && !externalError;

  useEffect(() => {
    setExternalError(false);
  }, [src]);

  const tagProps = tagComponent("portrait", rest);

  const renderComponent = () => {
    let portrait = <StyledIcon type={iconType} size={size} variant={variant} />;

    if (initials) {
      portrait = (
        <StyledPortraitInitials
          size={size}
          data-element="initials"
          variant={variant}
        >
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
      >
        {portrait}
      </StyledPortraitContainer>
    );
  };

  return renderComponent();
};

export default Portrait;
