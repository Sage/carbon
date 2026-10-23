import styled, { css } from "styled-components";
import type { ValidationProps } from "../../__internal__/validations";
import Typography from "../typography";
import StyledTypography from "../typography/typography.style";
import visuallyHidden from "../../style/utils/visually-hidden";
import addFocusStyling from "../../style/utils/add-focus-styling";

export const DEFAULT_FILE_INPUT_MIN_HEIGHT = "102px";

export const StyledFileInputContainer = styled.div`
  min-height: 0;

  > [data-component="file-input"] {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  > [data-component="file-input"] > [data-role="field-line"] {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
  }
`;

export const StyledHiddenFileInput = styled.input`
  display: none;
`;
export const StyledFileInputLabelSet = styled.div`
  display: flex;
  flex-direction: column;
  // Keep the label and hint as wide as their text, so clicking beside the
  // label does not open the file picker.
  align-items: flex-start;
  min-width: 0;
  overflow-wrap: anywhere;
  width: 100%;
  margin-bottom: var(--global-space-comp-s);
`;
export const StyledSupportingText = styled(Typography)`
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  margin: var(--global-space-none);
  font: var(--global-font-static-comp-regular-m);
`;

interface FileInputDropZoneProps {
  $error?: ValidationProps["error"];
  $isDraggedOver?: boolean;
  $isDraggingFile?: boolean;
  $maxHeight?: string;
  $maxWidth?: string;
  $minHeight?: string;
  $minWidth?: string;
  $isVertical?: boolean;
  $multiple?: boolean;
  $disabled?: boolean;
}

const getDropZoneBackground = ({
  $disabled,
  $isDraggedOver,
}: Pick<FileInputDropZoneProps, "$disabled" | "$isDraggedOver">) => {
  if ($disabled) return "var(--input-typical-bg-disabled)";
  /* istanbul ignore next -- verified by Chromatic drag-over state */
  if ($isDraggedOver) return "var(--input-typical-bg-hover)";
  return "var(--input-typical-bg-default)";
};

const getDashedBorderStroke = ({
  $error,
  $disabled,
  $isDraggedOver,
}: Pick<FileInputDropZoneProps, "$error" | "$disabled" | "$isDraggedOver">) => {
  if ($error) return "var(--input-validation-border-error)";
  if ($disabled) return "var(--input-typical-border-disabled)";
  /* istanbul ignore next -- verified by Chromatic drag-over state */
  if ($isDraggedOver) return "var(--input-typical-border-hover)";
  return "var(--input-typical-border-default)";
};

export const StyledFileInputDropZone = styled.div<FileInputDropZoneProps>`
  ${({ $minWidth, $minHeight, $maxWidth, $maxHeight }) => css`
    min-width: ${$minWidth ? `min(100%, ${$minWidth})` : "0"};
    min-height: ${$minHeight || DEFAULT_FILE_INPUT_MIN_HEIGHT};
    max-width: ${$maxWidth};
    max-height: ${$maxHeight};
  `}
  // z-index: 0 stops StyledDashedBorder's z-index: -1 escaping this box.
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: 100%;
  padding: var(--global-space-comp-m) var(--global-space-comp-xl);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: ${({ $isVertical }) => ($isVertical ? "column" : "row")};
  text-align: center;
  gap: var(--global-space-comp-m);
  border-radius: var(--global-radius-container-m);
  background-color: ${getDropZoneBackground};
  ${StyledTypography} {
    font: var(--global-font-static-comp-regular-m);
    color: ${({ $disabled }) => {
      if ($disabled) return "var(--input-typical-txt-disabled)";
      return "var(--input-typical-txt-default)";
    }};
  }

  > ${StyledTypography} {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
`;

export const StyledDashedBorder = styled.svg<
  Pick<
    FileInputDropZoneProps,
    "$error" | "$isDraggedOver" | "$isDraggingFile" | "$disabled"
  >
>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  // Behind Button/Typography so axe can rule out overlap.
  z-index: -1;

  rect {
    fill: none;
    stroke-dasharray: 8 4;
    --dashed-border-width: ${({ $error, $isDraggedOver, $isDraggingFile }) =>
      $error || $isDraggedOver || $isDraggingFile
        ? "var(--global-borderwidth-s)"
        : "var(--global-borderwidth-xs)"};
    x: calc(var(--dashed-border-width) / 2);
    y: calc(var(--dashed-border-width) / 2);
    width: calc(100% - var(--dashed-border-width));
    height: calc(100% - var(--dashed-border-width));
    rx: calc(var(--global-radius-container-m) - var(--dashed-border-width) / 2);
    stroke-width: var(--dashed-border-width);
    stroke: ${getDashedBorderStroke};
  }
`;
interface FileStatusListsProps {
  $multiple?: boolean;
  $minWidth?: string;
  $maxWidth?: string;
}

export const StyledFileStatusLists = styled.div<FileStatusListsProps>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--global-space-comp-s);
  padding-top: ${({ $multiple }) =>
    $multiple ? "var(--global-space-comp-s)" : "var(--global-space-none)"};
  min-height: 0;
  min-width: ${({ $minWidth }) =>
    $minWidth ? `min(100%, ${$minWidth})` : "0"};
  max-width: ${({ $maxWidth }) => $maxWidth};
  width: 100%;
`;

export const StyledFileUploadStatusListContainer = styled.div<{
  $multiple?: boolean;
}>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ $multiple }) =>
    $multiple ? "var(--global-space-comp-s)" : "var(--global-space-none)"};
  padding-top: ${({ $multiple }) =>
    $multiple ? "var(--global-space-comp-s)" : "var(--global-space-none)"};
  min-height: 0;
  min-width: 0;
`;

export const StyledFileUploadStatusListLabel = styled(StyledSupportingText)<{
  $visuallyHidden?: boolean;
}>`
  color: var(--input-typical-txt-alt);

  ${({ $visuallyHidden }) => $visuallyHidden && visuallyHidden}
`;

export const StyledFileUploadStatusListLabelSet = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
`;

export const StyledFileUploadStatusListErrorSummary = styled(
  StyledSupportingText,
)`
  font: var(--global-font-static-comp-medium-m);
  color: var(--input-validation-label-error);
`;

export const StyledFileUploadStatusList = styled.ul<{
  $hasMultipleItems: boolean;
}>`
  margin: var(--global-space-none);
  padding: var(--global-space-none);
  list-style: none;

  &:focus-visible {
    ${addFocusStyling(true)}
  }

  ${({ $hasMultipleItems }) =>
    $hasMultipleItems &&
    css`
      overflow: hidden;
      border: var(--global-borderwidth-xs) solid
        var(--input-typical-border-default);
      border-radius: var(--global-radius-container-m);

      > li + li {
        border-top: var(--global-borderwidth-xs) solid
          var(--input-typical-border-default);
      }
    `}
`;

export const StyledStatusAnnouncement = styled.div`
  ${visuallyHidden}
`;

export const StyledRequiredDescription = styled.span`
  ${visuallyHidden}
`;

export const StyledRemovalAnnouncement = styled.span`
  ${visuallyHidden}
`;
