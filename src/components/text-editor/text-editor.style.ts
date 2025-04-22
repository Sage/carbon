import styled, { css } from "styled-components";

import { margin, MarginProps } from "styled-system";
import Box from "../box";
import addFocusStyling from "../../style/utils/add-focus-styling";

type StyledTextEditorWrapperProps = MarginProps;
interface StyledWrapperProps {
  error?: string;
  namespace: string;
  warning?: string;
}

interface StyledValidationMessageProps {
  error?: string;
}

interface StyledEditorToolbarWrapperProps {
  focused?: boolean;
  hasWarningOrError?: boolean;
}

export const StyledTextEditor = styled(Box)`
  position: relative;
`;

export const StyledTextEditorWrapper = styled.div<StyledTextEditorWrapperProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}
`;

export const StyledWrapper = styled.div<StyledWrapperProps>`
  ${({ error, namespace, warning }) => css`
    min-height: 120px;
    min-width: 300px;

    ${(error || warning) &&
    css`
      padding-left: 8px;
      border-left: 2px solid
        var(
          ${error
            ? "--colorsSemanticNegative500"
            : "--colorsSemanticCaution500"}
        );

      #${namespace}-editor-toolbar-wrapper {
        border-radius: var(--borderRadius100);
        border: 2px solid
          var(
            ${error
              ? "--colorsSemanticNegative500"
              : "--colorsSemanticCaution500"}
          );

        .${namespace}-editable, #${namespace}-toolbar {
          outline: none;
        }
      }
    `}
  `};
`;

export const StyledEditorToolbarWrapper = styled.div<StyledEditorToolbarWrapperProps>`
  ${({ focused, hasWarningOrError }) => css`
    border-radius: var(--borderRadius100);
    outline: ${hasWarningOrError
      ? "none"
      : "1px solid var(--colorsUtilityMajor200)"};

    ${focused && addFocusStyling()}
  `}
`;

export const StyledHeaderWrapper = styled.div`
  padding: var(--spacing200);
`;

export const StyledFooterWrapper = styled.div`
  border-top: 1px solid var(--colorsUtilityMajor200);
  padding: var(--spacing200);
`;

export const StyledValidationMessage = styled.div<StyledValidationMessageProps>`
  ${({ error }) => css`
    color: var(
      ${error ? "--colorsSemanticNegative500" : "--colorsSemanticCaution600"}
    );
    font-weight: ${error ? 500 : "normal"};
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

export default StyledTextEditor;
