import styled, { css } from "styled-components";
import StyledIcon from "../../icon/icon.style";

type StyledFormSummaryProps = {
  showSummary?: boolean;
  fullWidth?: boolean;
};

export const StyledFormSummary = styled.div<StyledFormSummaryProps>`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
  font-size: var(--fontSizes100);
  font-weight: 500;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
    `}

  ${({ showSummary, fullWidth }) =>
    showSummary &&
    css`
      background-color: var(--colorsUtilityMajor025);
      border: solid var(--borderWidth100) var(--colorsActionMinor250);
      border-radius: var(--borderRadius100);
      margin: calc(-1 * var(--sizing100)) 0;
      padding: var(--sizing100);
      gap: var(--sizing125);

      ${fullWidth &&
      css`
        margin: 0 calc(-1 * var(--sizing100));
      `}
    `}
`;

export const StyledMessagePrefix = styled.div`
  &:first-of-type {
    margin-left: var(--sizing100);
  }
`;

export type StyledInternalSummaryProps = {
  type: "error" | "warning";
};

export const StyledInternalSummary = styled.div<StyledInternalSummaryProps>`
  display: flex;
  align-items: center;
  gap: var(--sizing100);
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
