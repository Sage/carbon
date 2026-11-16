import React from "react";
import styled, { css } from "styled-components";
import ValidationMessage from "../../../../__internal__/validation-message/__next__";
import ErrorBorder from "../../../../__internal__/error-border/error-border.style";

export interface FileInputValidationProps {
  error?: boolean | string;
  validationId?: string;
  validationMessagePositionTop?: boolean;
}

const StyledFileInputValidationWrapper = styled.div<{
  $hasMessage: boolean;
  $validationMessagePositionTop: boolean;
}>`
  ${({ $hasMessage, $validationMessagePositionTop }) =>
    $hasMessage &&
    css`
      margin-${$validationMessagePositionTop ? "bottom" : "top"}: var(--global-space-comp-s);
    `}
`;

const FileInputValidation = ({
  error,
  validationId,
  validationMessagePositionTop = true,
}: FileInputValidationProps) => (
  // Always rendered, so the polite live region exists before an error is added.
  // When a consumer sets `error` after a selection or drop, focus is already on
  // the Select file button, so adding the error to its description alone would
  // not be announced.
  <StyledFileInputValidationWrapper
    role="status"
    $hasMessage={typeof error === "string"}
    $validationMessagePositionTop={validationMessagePositionTop}
  >
    <ValidationMessage id={validationId} error={error} size="medium" />
    {error && <ErrorBorder $warning={false} />}
  </StyledFileInputValidationWrapper>
);

export default FileInputValidation;
