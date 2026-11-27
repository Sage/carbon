import React from "react";
import useIdPolyfill from "../../../../hooks/__internal__/useIdPolyfill";
import FileUploadStatus, {
  type FileUploadStatusProps,
} from "../file-upload-status";
import {
  StyledFileUploadStatusList,
  StyledFileUploadStatusListContainer,
  StyledFileUploadStatusListLabelSet,
  StyledFileUploadStatusListErrorSummary,
  StyledFileUploadStatusListLabel,
} from "../../file-input.style";

export interface FileUploadStatusListProps {
  items: FileUploadStatusProps[];
  label: string;
  statusSummary?: string;
  errorSummary?: string;
  moveFocusAfterAction: (
    element: HTMLElement,
    removalAnnouncement?: string,
  ) => void;
  maxHeight?: string;
  minHeight?: string;
  multiple?: boolean;
  removalAnnouncementId?: string;
  onPreviewActivate?: () => void;
  announceInitialErrors?: boolean;
}

const FileUploadStatusList = ({
  items,
  label,
  statusSummary,
  errorSummary,
  moveFocusAfterAction,
  maxHeight,
  minHeight,
  multiple,
  removalAnnouncementId,
  onPreviewActivate,
  announceInitialErrors,
}: FileUploadStatusListProps) => {
  const labelId = useIdPolyfill();
  const statusSummaryId = useIdPolyfill();
  const errorSummaryId = useIdPolyfill();

  return (
    <StyledFileUploadStatusListContainer $multiple={multiple}>
      <StyledFileUploadStatusListLabelSet>
        <StyledFileUploadStatusListLabel
          variant="p"
          id={labelId}
          $visuallyHidden={!multiple}
        >
          {label}
        </StyledFileUploadStatusListLabel>
        {statusSummary && (
          <StyledFileUploadStatusListLabel
            variant="p"
            id={statusSummaryId}
            $visuallyHidden={!multiple}
          >
            {statusSummary}
          </StyledFileUploadStatusListLabel>
        )}
        {errorSummary && (
          <StyledFileUploadStatusListErrorSummary
            variant="p"
            id={errorSummaryId}
          >
            {errorSummary}
          </StyledFileUploadStatusListErrorSummary>
        )}
      </StyledFileUploadStatusListLabelSet>
      <StyledFileUploadStatusList
        data-role="file-upload-status-list"
        tabIndex={-1}
        // The summary joins the list name, which screen readers announce on
        // entering the list; a list description is rarely read from its items.
        aria-labelledby={[
          labelId,
          statusSummary ? statusSummaryId : undefined,
          errorSummary ? errorSummaryId : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-describedby={removalAnnouncementId}
        $hasMultipleItems={items.length > 1}
      >
        {items.map((status, index) => (
          <li
            key={
              status.id ??
              `${status.filename}-${
                items
                  .slice(0, index)
                  .filter(({ filename }) => filename === status.filename).length
              }`
            }
          >
            <FileUploadStatus
              {...status}
              isInMultiItemList={items.length > 1}
              moveFocusAfterAction={moveFocusAfterAction}
              maxHeight={maxHeight}
              minHeight={minHeight}
              multiple={multiple}
              removalAnnouncementId={removalAnnouncementId}
              onPreviewActivate={onPreviewActivate}
              announceInitialError={announceInitialErrors}
            />
          </li>
        ))}
      </StyledFileUploadStatusList>
    </StyledFileUploadStatusListContainer>
  );
};

export default FileUploadStatusList;
