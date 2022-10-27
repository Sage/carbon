import styled, { css } from "styled-components";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";

type StyledFormSummaryProps = {
  showSummary?: boolean;
  fullWidth?: boolean;
};

export const StyledFormSummary = styled.div<StyledFormSummaryProps>`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  padding: 8px;
  white-space: nowrap;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
    `}

  ${({ showSummary }) =>
    showSummary &&
    css`
      background-color: var(--colorsUtilityMajor025);
    `}
  ${StyledButton} {
    margin-right: 0;
  }
`;

export const StyledMessagePrefix = styled.div`
  &:first-of-type {
    margin-left: 4px;
  }
  margin-right: 4px;
`;

export type StyledInternalSummaryProps = {
  type: "error" | "warning";
};

export const StyledInternalSummary = styled.div<StyledInternalSummaryProps>`
  display: flex;
  align-items: center;
  margin-right: 8px;
  &:last-of-type {
    margin-right: 16px;
  }
  ${({ type }) =>
    type === "warning" &&
    css`
      color: var(--colorsSemanticCaution650);
    `}
  ${({ type }) =>
    type === "error" &&
    css`
      color: var(--colorsSemanticNegative600);
    `}

  ${StyledIcon} {
    margin-right: 4px;
    ${({ type }) =>
      type === "warning" &&
      css`
        color: var(--colorsSemanticCaution650);
      `}
    ${({ type }) =>
      type === "error" &&
      css`
        color: var(--colorsSemanticNegative600);
      `}
  }
`;
