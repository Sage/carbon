import styled, { css } from "styled-components";

import Box from "../box";

import { componentPrefix } from "./constants";

interface StyledWrapperProps {
  error?: string;
  warning?: string;
}

interface StyledValidationMessageProps {
  error?: string;
}

export const StyledRichTextEditor = styled(Box)`
  position: relative;
`;

export const StyledHintText = styled.div<{
  isDisabled?: boolean;
}>`
  ::after {
    content: " ";
  }

  margin-top: var(--spacing000);
  margin-bottom: var(--spacing150);
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--colorsUtilityYin030)" : "var(--colorsUtilityYin055)"};
  font-size: 14px;
`;

export const StyledWrapper = styled.div<StyledWrapperProps>`
  ${({ error, warning }) => css`
    ${(error || warning) &&
    css`
      padding-left: 8px;
      border-left: 2px solid
        var(
          ${error
            ? "--colorsSemanticNegative500"
            : "--colorsSemanticCaution500"}
        );

      #${componentPrefix}-editor-toolbar-wrapper {
        border-radius: var(--borderRadius100);
        border: 2px solid
          var(
            ${error
              ? "--colorsSemanticNegative500"
              : "--colorsSemanticCaution500"}
          );

        .carbon-rte-editable,
        #${componentPrefix}-toolbar {
          outline: none;
        }

        #${componentPrefix}-toolbar {
          border-top: 1px solid var(--colorsUtilityMajor200);
        }
      }
    `}
  `};
`;

export const StyledEditorToolbarWrapper = styled.div``;

export const StyledValidationMessage = styled.div<StyledValidationMessageProps>`
  ${({ error }) => css`
    color: var(
      ${error ? "--colorsSemanticNegative500" : "--colorsSemanticCaution500"}
    );
    font-weight: 500;
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

export default StyledRichTextEditor;
