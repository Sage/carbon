import React, { useLayoutEffect, useRef, useState } from "react";
import guid from "../../../../__internal__/utils/helpers/guid";
import FileUploadStatus, {
  type FileUploadStatusProps,
} from "../file-upload-status";
import {
  StyledFileUploadStatusList,
  StyledFileUploadStatusListContainer,
  StyledFileUploadStatusListLabelSet,
  StyledFileUploadStatusListErrorSummary,
  StyledFileUploadStatusListLabel,
  StyledFileUploadStatusListScroller,
} from "../../file-input.style";

export interface FileUploadStatusListProps {
  items: FileUploadStatusProps[];
  label: string;
  errorSummary?: string;
  onActionFocusFallback: (element: HTMLElement) => void;
  minHeight?: string;
  multiple?: boolean;
}

const FileUploadStatusList = ({
  items,
  label,
  errorSummary,
  onActionFocusFallback,
  minHeight,
  multiple,
}: FileUploadStatusListProps) => {
  const labelId = useRef(guid());
  const listRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    /* istanbul ignore next -- React attaches the ref before layout effects run. */
    if (!list) return;

    const isScrollable = list.scrollHeight > list.clientHeight;
    setHasScrollbar((current) =>
      current === isScrollable ? current : isScrollable,
    );
  }, [items]);

  return (
    <StyledFileUploadStatusListContainer $multiple={multiple}>
      <StyledFileUploadStatusListLabelSet>
        <StyledFileUploadStatusListLabel
          variant="p"
          id={labelId.current}
          $visuallyHidden={!multiple}
        >
          {label}
        </StyledFileUploadStatusListLabel>
        {errorSummary && (
          <StyledFileUploadStatusListErrorSummary variant="p">
            {errorSummary}
          </StyledFileUploadStatusListErrorSummary>
        )}
      </StyledFileUploadStatusListLabelSet>
      <StyledFileUploadStatusListScroller
        ref={listRef}
        $hasScrollbar={hasScrollbar}
        data-role="file-upload-status-list-scroller"
      >
        <StyledFileUploadStatusList
          data-role="file-upload-status-list"
          tabIndex={-1}
          aria-labelledby={labelId.current}
          $hasMultipleItems={items.length > 1}
        >
          {items.map((status, index) => (
            <li
              key={
                status.id ??
                `${status.filename}-${
                  items
                    .slice(0, index)
                    .filter(({ filename }) => filename === status.filename)
                    .length
                }`
              }
            >
              <FileUploadStatus
                {...status}
                isInMultiItemList={items.length > 1}
                onActionFocusFallback={onActionFocusFallback}
                minHeight={minHeight}
                multiple={multiple}
              />
            </li>
          ))}
        </StyledFileUploadStatusList>
      </StyledFileUploadStatusListScroller>
    </StyledFileUploadStatusListContainer>
  );
};

export default FileUploadStatusList;
