import React from "react";
import { PaddingProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledVerticalMenuItem, StyledTitle } from "../vertical-menu.style";

export interface VerticalMenuTriggerProps extends PaddingProps, TagProps {
  /** Height of the menu trigger */
  height?: string;
  /** Title of the menu trigger */
  children: string;
  /** Callback passed to the menu trigger */
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const VerticalMenuTrigger = ({
  height = "40px",
  p = 2,
  onClick,
  children,
  ...rest
}: VerticalMenuTriggerProps) => {
  const paddingProps = filterStyledSystemPaddingProps(rest);

  return (
    <StyledVerticalMenuItem
      onClick={onClick as (ev: React.MouseEvent<HTMLButtonElement>) => void}
      as="button"
      height={height}
      p={p}
      tabIndex={0}
      {...paddingProps}
      {...tagComponent("vertical-menu-trigger", rest)}
    >
      <StyledTitle>{children}</StyledTitle>
    </StyledVerticalMenuItem>
  );
};

export default VerticalMenuTrigger;
