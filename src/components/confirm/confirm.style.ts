import styled, { css } from "styled-components";

import StyledIcon from "../icon/icon.style";
import { StyledHeadingTitle } from "../heading/heading.style";
import { ConfirmProps } from ".";

export const StyledConfirmButtons = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
`;

export const StyledConfirmHeading = styled.div<{
  type: ConfirmProps["iconType"];
}>`
  display: flex;
  align-items: center;

  ${StyledHeadingTitle} {
    padding: 0px;
  }

  ${StyledIcon} {
    margin-right: 16px;
    margin-bottom: 20px;
    ${({ type }) =>
      type === "warning" &&
      css`
        color: var(--colorsSemanticCaution500);
      `}
    ${({ type }) =>
      type === "error" &&
      css`
        color: var(--colorsSemanticNegative500);
      `}
  }
`;
