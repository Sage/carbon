import styled, { css } from "styled-components";
import Typography from "../../../typography";
import Divider from "../../../divider";
import Button from "../../../button/__next__/button.component";

export const StyledActionButton = styled(Button)`
  min-width: 75px;
`;

export const StyledFileUploadStatus = styled.div<{
  $hasError: boolean;
  $hasThumbnail?: boolean;
  $isInMultiItemList?: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ $hasThumbnail }) =>
    $hasThumbnail
      ? "minmax(var(--global-size-2-xl), var(--global-size-3-xl)) auto minmax(0, 1fr)"
      : "minmax(0, 1fr)"};
  align-items: stretch;
  min-width: 0;
  // The thumbnail column (when present) bleeds flush to the card's edges -
  // this clips it back to the card's own rounded corners.
  overflow: hidden;
  background: var(--input-typical-bg-default);
  border: ${({ $hasError, $isInMultiItemList }) =>
      $isInMultiItemList
        ? "var(--global-borderwidth-none)"
        : $hasError
          ? "var(--global-borderwidth-s)"
          : "var(--global-borderwidth-xs)"}
    solid
    var(
      ${({ $hasError }) =>
        $hasError
          ? "--input-validation-border-error"
          : "--input-typical-border-default"}
    );
  border-radius: ${({ $isInMultiItemList }) =>
    $isInMultiItemList ? "0" : "var(--global-radius-container-m)"};
`;

export const StyledFileUploadStatusDivider = styled(Divider)`
  padding: 0;

  > [data-role="divider-content"] {
    border-left-color: var(--input-typical-border-default);
  }
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

export const StyledThumbnailColumn = styled.div`
  min-width: var(--global-size-2-xl);
  width: var(--global-size-3-xl);
  min-height: var(--global-size-3-xl);
  height: 100%;
  display: grid;
  place-items: center;
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

export const StyledStatusContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--global-space-comp-s);
  padding: var(--global-space-comp-s) var(--global-space-comp-m);
`;

export const StyledFileDetails = styled.div`
  min-width: 0;
  display: grid;
  gap: var(--global-space-comp-xs);
`;

export const StyledFileName = styled(Typography)`
  margin: 0;
  min-width: 0;
  font: var(--global-font-static-comp-regular-m);
  color: var(--input-typical-txt-default);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledStatusMessage = styled(Typography)<{ $hasError?: boolean }>`
  margin: 0;
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
  gap: var(--global-space-comp-xs);
  flex-wrap: wrap;
  justify-content: flex-end;
`;
