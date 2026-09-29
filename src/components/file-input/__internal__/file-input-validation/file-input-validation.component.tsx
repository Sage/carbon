import React from "react";
import styled, { css } from "styled-components";
import ValidationMessage from "../../../../__internal__/validation-message/__next__";
import ErrorBorder from "../../../../__internal__/error-border/error-border.style";

export interface FileInputValidationProps {
  error?: boolean | string;
  validationId?: string;
}

const StyledFileInputValidationWrapper = styled.div<{ $hasMessage: boolean }>`
  ${({ $hasMessage }) =>
    $hasMessage &&
    css`
      margin-top: var(--global-space-comp-s);
    `}
`;

const FileInputValidation = ({
  error,
  validationId,
}: FileInputValidationProps) => (
  <StyledFileInputValidationWrapper
    role={error ? "alert" : undefined}
    $hasMessage={typeof error === "string"}
  >
    <ValidationMessage id={validationId} error={error} size="medium" />
    {error && <ErrorBorder $warning={false} />}
  </StyledFileInputValidationWrapper>
);

export default FileInputValidation;
