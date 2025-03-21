/* eslint-disable no-nested-ternary */
import styled, { css } from "styled-components";
import { margin, space } from "styled-system";

import Box from "../box";
import addFocusStyling from "../../style/utils/add-focus-styling";

const StyledAccordionGroup = styled.div`
  ${margin}
`;

const StyledWrapper = styled.div<{
  borders?: "default" | "full" | "none";
  size?: "large" | "small";
  width?: string;
}>`
  border: 1px solid var(--colorsActionMinor100);
  padding: ${({ size }) =>
    size === "small" ? "var(--spacing200)" : "var(--spacing300)"};
  width: ${({ width }) => width || "100%"};

  ${({ borders }) =>
    borders === "default" &&
    css`
      border-left: none;
      border-right: none;
    `}

  ${({ borders }) =>
    borders === "none" &&
    css`
      border: none;
    `}


  &:focus {
    ${addFocusStyling()}
  }
`;

const StyledDetails = styled.details<{
  disableContentPadding?: boolean;
  size?: "large" | "small";
}>`
  overflow: hidden;

  &[open] + div.content {
    max-height: 800px;
    padding-top: ${({ disableContentPadding, size }) =>
      disableContentPadding
        ? "0"
        : size === "small"
          ? "var(--spacing200)"
          : "var(--spacing300)"};
    padding-bottom: ${({ disableContentPadding, size }) =>
      disableContentPadding
        ? "0"
        : size === "small"
          ? "var(--spacing200)"
          : "var(--spacing300)"};

    transition:
      max-height 100ms ease-in-out,
      padding 50ms linear;
  }

  span::before {
    rotate: 0deg;
    transition: rotate 200ms ease-in;
  }

  &[open] span::before {
    rotate: 180deg;
    transition: rotate 200ms ease-out;
  }
`;

const StyledSummary = styled.summary`
  ${space}
  cursor: pointer;
  list-style: none;
  user-select: none;
`;

const StyledSummaryTitleWrapper = styled(Box)``;

const StyledContent = styled.div`
  max-width: 500px;
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  max-height: 0;
  overflow: hidden;
  border: 2px solid transparent;
  transition:
    max-height 100ms cubic-bezier(0, 1, 0, 1),
    padding 50ms linear;
`;

export {
  StyledAccordionGroup,
  StyledContent,
  StyledDetails,
  StyledSummary,
  StyledSummaryTitleWrapper,
  StyledWrapper,
};
