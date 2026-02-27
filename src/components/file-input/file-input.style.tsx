import styled, { css } from "styled-components";
import type { InputProps } from "../../__internal__/input";
import type { ValidationProps } from "../../__internal__/validations";

// Because inputs with type="file" cannot have a value, we need to omit it from the InputProps type.
// This is a workaround to avoid TypeScript errors when using the InputProps type.
// The value prop is not used in the FileInput component, so we can safely omit it
type CustomFileInputProps = Omit<InputProps, "value"> & {
  value?: string;
};

export const StyledHiddenFileInput = styled.input<CustomFileInputProps>`
  display: none;
`;

interface StyledFileInputPresentationProps
  extends Pick<ValidationProps, "error"> {
  isDraggedOver?: boolean;
  isDraggingFile?: boolean;
  hasUploadStatus?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  isVertical?: boolean;
}

export const StyledFileInputPresentation = styled.div<StyledFileInputPresentationProps>`
  ${({ hasUploadStatus, minWidth, minHeight, maxWidth, maxHeight }) => css`
    min-width: ${minWidth};
    min-height: ${minHeight};
    max-width: ${maxWidth};
    ${!hasUploadStatus &&
    css`
      padding: 11px; /* not 12px to account for 1px border */
      max-height: ${maxHeight};
      box-sizing: border-box;
    `}
  `}

  ${({ hasUploadStatus, isDraggedOver, isDraggingFile, error, isVertical }) => {
    const borderWidthToken =
      error || isDraggingFile ? "borderWidth200" : "borderWidth100";
    let borderColorToken = "colorsUtilityMajor300";
    let backgroundColorToken = "colorsUtilityYang100";
    if (isDraggedOver) {
      borderColorToken = "colorsUtilityMajor400";
      backgroundColorToken = "colorsUtilityMajor100";
    } else if (isDraggingFile) {
      borderColorToken = "colorsUtilityMajor400";
    }
    if (error) {
      borderColorToken = `colorsSemanticNegative${isDraggingFile ? 600 : 500}`;
    }
    return (
      !hasUploadStatus &&
      css`
        display: flex;
        ${isVertical && "flex-direction: column;"}
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        text-align: center;
        gap: var(--spacing100);
        border-radius: var(--borderRadius050);
        border: var(--${borderWidthToken}) dashed var(--${borderColorToken});
        background: var(--${backgroundColorToken});
        [data-component="typography"] {
          color: var(--colorsUtilityYin055);
        }
      `
    );
  }}
`;
