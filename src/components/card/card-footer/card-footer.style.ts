import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import StyledCardColumn from "../card-column/card-column.style";
import { CardContextProps } from "../__internal__/card.context";
import { CardFooterProps } from "./card-footer.component";

const marginSizes = {
  none: "var(--global-size-none)",
  "extra-small":
    "var(--global-size-none) calc(-1 * var(--global-space-comp-s))",
  small: "var(--global-size-none) calc(-1 * var(--global-space-comp-l))",
  medium: "var(--global-size-none) calc(-1 * var(--global-space-comp-xl))",
  large: "var(--global-size-none) calc(-1 * var(--global-space-comp-2-xl))",
};

const paddingSizes = {
  none: "var(--global-size-none)",
  "extra-small": "var(--global-size-none)",
  small: "var(--global-space-comp-l) var(--global-space-comp-xl)",
  medium: "18px var(--global-space-comp-2-xl)",
  large: "var(--global-size-2-xs) var(--global-size-l)",
};

export type StyledCardFooterProps = SpaceProps &
  Required<Pick<CardFooterProps, "variant">> &
  Pick<CardContextProps, "roundness" | "spacing">;

const StyledCardFooter = styled.div<StyledCardFooterProps>`
  ${space}

  ${({ spacing, variant, roundness }) => css`
    background-color: ${variant === "transparent"
      ? "transparent"
      : "var(--container-standard-bg-default)"};
    border-top: var(--colorsUtilityMajor100);
    border-top-width: 1px;
    border-top-style: solid;
    margin: ${marginSizes[spacing]};
    display: flex;
    ${(roundness === "moderate" || roundness === "default") &&
    css`
      border-bottom-left-radius: var(--global-radius-container-l);
      border-bottom-right-radius: var(--global-radius-container-l);
    `}
    ${(roundness === "curved" || roundness === "large") &&
    css`
      border-bottom-left-radius: var(--global-radius-container-xl);
      border-bottom-right-radius: var(--global-radius-container-xl);
    `}

    ${StyledCardColumn} {
      margin: var(--global-size-none);
      padding: ${paddingSizes[spacing]};
    }
  `}
`;

export default StyledCardFooter;
