import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import StyledCardColumn from "../card-column/card-column.style";
import { CardContextProps } from "../__internal__/card.context";
import { CardFooterProps } from "./card-footer.component";

const marginSizes = {
  small: "0 -24px",
  medium: "0 -32px",
  large: "0 -48px",
};

const paddingSizes = {
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
    font-size: 14px;
    font-weight: 500;
    margin: ${marginSizes[spacing]};
    display: flex;
    ${roundness === "default" &&
    css`
      border-bottom-left-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius100);
    `}
    ${roundness === "large" &&
    css`
      border-bottom-left-radius: var(--borderRadius200);
      border-bottom-right-radius: var(--borderRadius200);
    `}

    ${StyledCardColumn} {
      margin: 0;
      padding: ${paddingSizes[spacing]};
    }
  `}
`;

export default StyledCardFooter;
