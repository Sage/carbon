import styled, { css } from "styled-components";
import Typography from "../../../typography";
import { DEFAULT_FILE_INPUT_MIN_HEIGHT } from "../../file-input.style";
import visuallyHidden from "../../../../style/utils/visually-hidden";

interface FileUploadStatusStyleProps {
  $hasError: boolean;
  $hasThumbnail?: boolean;
  $isInMultiItemList?: boolean;
  $maxHeight?: string;
  $minHeight?: string;
  $multiple?: boolean;
}

const getBorderWidth = ({
  $hasError,
  $isInMultiItemList,
}: Pick<FileUploadStatusStyleProps, "$hasError" | "$isInMultiItemList">) => {
  if ($isInMultiItemList) return "var(--global-borderwidth-none)";
  if ($hasError) return "var(--global-borderwidth-s)";
  return "var(--global-borderwidth-xs)";
};

export const StyledFileUploadStatus = styled.div<FileUploadStatusStyleProps>`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ $hasThumbnail }) =>
    $hasThumbnail ? "auto minmax(0, 1fr)" : "minmax(0, 1fr)"};
  align-items: stretch;
  min-width: 0;
  max-height: ${({ $multiple, $maxHeight }) =>
    !$multiple ? $maxHeight : undefined};
  min-height: ${({ $multiple, $minHeight }) =>
    !$multiple ? $minHeight || DEFAULT_FILE_INPUT_MIN_HEIGHT : undefined};
  // The thumbnail fills its column up to the container's edges, so clip it to
  // the rounded corners. This also clips content past maxHeight in
  // single-file mode.
  overflow: hidden;
  background: var(--input-typical-bg-default);
  border: ${getBorderWidth} solid
    var(
      ${({ $hasError }) =>
        $hasError
          ? "--input-validation-border-error"
          : "--input-typical-border-default"}
    );
  border-radius: ${({ $isInMultiItemList }) =>
    $isInMultiItemList
      ? "var(--global-radius-none)"
      : "var(--global-radius-container-m)"};
`;

export const StyledStatusIcon = styled.span`
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: var(--global-size-2-xs);
  height: var(--global-size-2-xs);
  overflow: hidden;
`;

export const StyledFileNameRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--global-space-comp-s);
`;

export const StyledLeadingColumn = styled.div`
  min-width: var(--global-size-2-xl);
  width: var(--global-size-3-xl);
  min-height: var(--global-size-3-xl);
  height: 100%;
  display: grid;
  place-items: center;
  border-right: var(--global-borderwidth-xs) solid
    var(--input-typical-border-default);
`;
export const StyledThumbnail = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: var(--global-size-3-xl);
  object-fit: cover;
`;

export const StyledUploadingIcon = styled.span`
  display: inline-flex;
  width: var(--global-size-s);
  height: var(--global-size-s);
`;

export const StyledStatusContent = styled.div<{
  $multiple?: boolean;
  $minHeight?: string;
}>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ $multiple }) =>
    $multiple ? "var(--global-space-comp-s)" : "var(--global-space-comp-xs)"};
  padding: ${({ $multiple }) =>
    $multiple
      ? "var(--global-space-comp-s) var(--global-space-comp-m)"
      : "var(--global-space-comp-xs) var(--global-space-comp-m)"};
`;

export const StyledFileDetails = styled.div`
  min-width: 0;
  display: grid;
  gap: var(--global-space-comp-xs);
`;

export const StyledErrorStatus = styled.div`
  ${visuallyHidden}
`;

export const StyledFileName = styled(Typography)`
  margin: var(--global-space-none);
  min-width: 0;
  font: var(--global-font-static-comp-regular-m);
  color: var(--input-typical-txt-default);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledStatusMessage = styled(Typography)<{ $hasError?: boolean }>`
  margin: var(--global-space-none);
  font: var(--global-font-static-comp-regular-m);
  color: var(--input-typical-txt-alt);
  ${({ $hasError }) =>
    $hasError &&
    css`
      font: var(--global-font-static-comp-medium-m);
      color: var(--input-validation-label-error);
    `}
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);
  flex-wrap: wrap;
  justify-content: flex-end;
`;
