import styled, { css } from "styled-components";
import type { InputProps } from "../../__internal__/legacy-input";
import type { ValidationProps } from "../../__internal__/validations";
import Typography from "../typography";
import StyledTypography from "../typography/typography.style";
import visuallyHidden from "../../style/utils/visually-hidden";

const SCROLLBAR_TRACK_WIDTH = "12px";

export const StyledFileInputContainer = styled.div`
  height: inherit;
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

// `value` can't meaningfully be set on a file input, so it's optional here
// (InputProps otherwise requires it).
type CustomFileInputProps = Omit<InputProps, "value"> & { value?: string };
export const StyledHiddenFileInput = styled.input<CustomFileInputProps>`
  display: none;
`;
export const StyledFileInputLabelSet = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--global-space-comp-s);
`;
interface FileInputLabelProps {
  $isRequired?: boolean;
  $disabled?: boolean;
}
// Use a native label because Typography does not forward `htmlFor`.
// Without it, the label would not be associated with the file input.
export const StyledFileInputLabel = styled.label<FileInputLabelProps>`
  display: block;
  margin: var(--global-space-none);
  font: var(--global-font-static-comp-medium-m);
  color: ${({ $disabled }) =>
    $disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-default)"};

  // Not inline-flex: labels can wrap onto multiple lines, and flex items
  // don't wrap individually - the asterisk would end up centered beside the
  // whole block instead of trailing the last line.
  ${({ $isRequired, $disabled }) =>
    $isRequired &&
    css`
      ::after {
        content: "*";
        color: ${$disabled
          ? /* istanbul ignore next -- covered by Chromatic's disabled required state */
            "var(--input-labelset-label-disabled)"
          : "var(--input-labelset-label-required)"};
        font: var(--global-font-static-comp-medium-m);
        margin-left: var(--global-space-comp-xs);
      }
    `}
`;
interface FileInputHintProps {
  $disabled?: boolean;
}
export const StyledSupportingText = styled(Typography)`
  margin: var(--global-space-none);
  font: var(--global-font-static-comp-regular-m);
`;

export const StyledFileInputHint = styled(
  StyledSupportingText,
)<FileInputHintProps>`
  color: ${({ $disabled }) =>
    $disabled
      ? /* istanbul ignore next -- visual-only disabled state */
        "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-alt)"};
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
    min-width: min(100%, ${$minWidth});
    min-height: ${$minHeight};
    max-width: ${$maxWidth};
    max-height: ${$maxHeight};
  `}
  // z-index: 0 stops StyledDashedBorder's z-index: -1 escaping this box.
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  width: 100%;
  padding: var(--global-space-comp-xl);
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
  // Mirrors the drop zone's own sizing so the status list lines up with it
  // instead of stretching to fill its container.
  $minWidth: string;
  $maxWidth?: string;
}

export const StyledFileStatusLists = styled.div<FileStatusListsProps>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--global-space-comp-s);
  padding-top: var(--global-space-comp-s);
  min-height: 0;
  min-width: min(100%, ${({ $minWidth }) => $minWidth});
  max-width: ${({ $maxWidth }) => $maxWidth};
`;

export const StyledFileUploadStatusListContainer = styled.div<{
  $hideLabel?: boolean;
}>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--global-space-comp-s);
  padding-top: ${({ $hideLabel }) =>
    $hideLabel ? "var(--global-space-none)" : "var(--global-space-comp-s)"};
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

  ${({ $hasMultipleItems }) =>
    $hasMultipleItems &&
    css`
      align-self: start;
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

export const StyledFileUploadStatusListScroller = styled.div<{
  $hasScrollbar: boolean;
}>`
  display: grid;
  gap: 0;
  min-width: 0;
  box-sizing: border-box;
  width: ${({ $hasScrollbar }) =>
    $hasScrollbar ? `calc(100% + ${SCROLLBAR_TRACK_WIDTH})` : "100%"};
  flex: 1 1 auto;
  max-height: 100%;
  min-height: 0;
  overflow-y: auto;

  /* Firefox supports the standard scrollbar properties but not fixed dimensions. */
  @supports (-moz-appearance: none) {
    scrollbar-color: var(--container-scrollbar-fg-default)
      var(--container-scrollbar-bg-default);
    scrollbar-width: thin;
  }

  /* Chromium and Safari use these rules for the specified track and thumb sizes. */
  &::-webkit-scrollbar {
    width: ${SCROLLBAR_TRACK_WIDTH};
    border-radius: var(--global-radius-container-circle);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--container-scrollbar-bg-default);
    border-radius: var(--global-radius-container-circle);
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: var(--global-radius-container-circle);
    background-clip: padding-box;
    background-color: var(--container-scrollbar-fg-default);
  }
`;

export const StyledLiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
