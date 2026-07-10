import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import StyledCardColumn from "../card-column/card-column.style";
import { CardContextProps } from "../__internal__/card.context";
import { CardFooterProps } from "./card-footer.component";

const marginSizes = {
  none: "0",
  "extra-small": "0 calc(-1 * var(--global-space-comp-s))",
  small: "0 calc(-1 * var(--global-space-comp-l))",
  medium: "0 calc(-1 * var(--global-space-comp-xl))",
  large: "0 calc(-1 * var(--global-space-comp-2-xl))",
};

const paddingSizes = {
  none: "0",
  "extra-small": "0",
  small: "16px 24px",
  medium: "18px 32px",
  large: "20px 48px",
};

export type StyledCardFooterProps = SpaceProps &
  Required<Pick<CardFooterProps, "variant">> &
  Pick<CardContextProps, "roundness" | "spacing">;

const StyledCardFooter = styled.div<StyledCardFooterProps>`
  ${space}

  ${({ spacing, variant, roundness }) => css`
    background-color: ${variant === "transparent"
      ? "transparent"
      : "var(--colorsUtilityMajor025)"};
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
      margin: 0;
      padding: ${paddingSizes[spacing]};
    }
  `}
`;

export default StyledCardFooter;
