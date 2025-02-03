import React from "react";
import styled from "styled-components";
import { margin, MarginProps } from "styled-system";

import BaseTheme from "../../style/themes/base";
import Icon from "../icon";
import { PortraitSizes, PortraitShapes } from "./portrait.component";
import { PORTRAIT_SIZE_PARAMS } from "./portrait.config";
import profileConfigSizes from "../profile/profile.config";

type StyledPortraitProps = {
  darkBackground?: boolean;
  size: PortraitSizes;
  shape?: PortraitShapes;
  hasValidImg?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
};

export const StyledPortraitInitials = styled.div<
  Pick<StyledPortraitProps, "size">
>`
  font-weight: 500;
  font-size: ${({ size }) => profileConfigSizes[size].initialSize};
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
`;

export const StyledCustomImg = styled.img`
  height: inherit;
  min-width: inherit;
`;

// && is used here to increase the specificity
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledIcon = styled(Icon)<Pick<StyledPortraitProps, "size">>`
  && {
    color: inherit;
    height: inherit;
    min-width: inherit;

    ::before {
      font-size: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].iconDimensions}px;
    }
  }
`;

export const StyledPortraitContainer = styled.div<
  StyledPortraitProps & MarginProps
>`
  color: ${({ darkBackground }) =>
    darkBackground
      ? "var(--colorsUtilityReadOnly600)"
      : "var(--colorsUtilityYin090)"};
  background-color: ${({ darkBackground }) =>
    darkBackground
      ? "var(--colorsUtilityYin090)"
      : "var(--colorsUtilityReadOnly400)"};
  ${({ hasValidImg, size }) =>
    hasValidImg && `max-width: ${PORTRAIT_SIZE_PARAMS[size].dimensions}px;`}
  min-width: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].dimensions}px;
  height: ${({ size }) => PORTRAIT_SIZE_PARAMS[size].dimensions}px;
  overflow: hidden;
  border-radius: ${({ shape }) =>
    shape === "square" ? "0px" : "var(--borderRadiusCircle)"};
  border: 1px solid var(--colorsUtilityReadOnly600);
  display: inline-block;

  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}
`;

StyledPortraitContainer.defaultProps = {
  theme: BaseTheme,
};
