import React, { useState } from "react";
import { type ButtonProps } from "../../../button/__next__";
import Icon, { type IconType } from "../../../icon";
import {
  StyledActionButton,
  StyledActions,
  StyledFileUploadStatusDivider,
  StyledFileDetails,
  StyledFileName,
  StyledFileNameRow,
  StyledFileUploadStatus,
  StyledStatusContent,
  StyledStatusIcon,
  StyledStatusMessage,
  StyledThumbnailColumn,
} from "./file-upload-status.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import type ResolvedFileInputLocale from "../resolved-file-input-locale";
import ThumbnailContent, {
  UploadingIndicator,
} from "./thumbnail-content.component";

interface SharedStatusProps {
  filename: string;
  /** Unique key, since `filename` alone may not be. */
  id?: string;
  message?: string;
  iconType?: IconType;
  thumbnailSrc?: string;
}
interface DeprecatedPrimaryAction {
  /** @deprecated Use the status-specific callback. */
  onAction: () => void;
}
// Callers must supply either the status-specific callback (e.g. `onCancel`)
// or the deprecated `onAction` - never neither.
type PrimaryAction<Action extends string> =
  | (DeprecatedPrimaryAction & Partial<Record<Action, () => void>>)
  | ({ onAction?: never } & Record<Action, () => void>);
type StatusUploadingProps = SharedStatusProps &
  PrimaryAction<"onCancel"> & {
    status: "uploading";
    progress?: number;
  };
type StatusCompletedProps = SharedStatusProps &
  // aria-label is set internally, so it's omitted here.
  Omit<ButtonProps, "href" | "aria-label"> &
  PrimaryAction<"onDelete"> & {
    status: "completed";
    href?: string;
  };
type StatusPreviouslyProps = SharedStatusProps &
  // aria-label is set internally, so it's omitted here.
  Omit<ButtonProps, "href" | "aria-label"> & {
    status: "previously";
    href?: string;
    onAction?: never;
    onDelete?: never;
  };
type StatusErrorProps = SharedStatusProps &
  PrimaryAction<"onRemove"> & {
    status: "error";
    onRetry?: () => void;
  };
export type FileUploadStatusProps =
  | StatusUploadingProps
  | StatusCompletedProps
  | StatusPreviouslyProps
  | StatusErrorProps;
interface InternalProps {
  onActionFocusFallback?: (element: HTMLElement) => void;
  isInMultiItemList?: boolean;
}

export const FileUploadStatus = (
  props: FileUploadStatusProps & InternalProps,
) => {
  const {
    status,
    filename,
    message,
    iconType,
    thumbnailSrc,
    onAction,
    onActionFocusFallback,
    isInMultiItemList,
  } = props;
  const fallbackIconType =
    iconType ?? (status === "error" ? "error" : "file_generic");

  const locale = useLocale();
  const fileInputLocale = locale.fileInput as ResolvedFileInputLocale;

  const [failedThumbnailSrc, setFailedThumbnailSrc] = useState<string>();
  const hasThumbnailProp = thumbnailSrc !== undefined;

  const primaryAction =
    status === "uploading"
      ? props.onCancel || onAction
      : status === "error"
        ? props.onRemove || onAction
        : status === "completed"
          ? props.onDelete || onAction
          : undefined;

  const primaryActionText =
    status === "uploading"
      ? fileInputLocale.actions.cancel()
      : status === "error"
        ? fileInputLocale.actions.remove()
        : fileInputLocale.actions.delete();

  const statusMessage =
    message ||
    (status === "uploading"
      ? fileInputLocale.uploading()
      : status === "completed"
        ? fileInputLocale.uploaded()
        : status === "error"
          ? fileInputLocale.uploadError()
          : undefined);

  const retryText = fileInputLocale.actions.retry();

  const previewText = fileInputLocale.actions.preview();

  const invoke =
    (callback?: () => void) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      callback?.();
      onActionFocusFallback?.(event.currentTarget);
    };

  let previewButton: { href: string; buttonProps: ButtonProps } | undefined;
  if ((status === "completed" || status === "previously") && props.href) {
    // Strips props already handled elsewhere (filename, status, etc.),
    // leaving any caller-passed Button props to forward to the preview link.
    const {
      filename: _filename,
      message: _message,
      iconType: _iconType,
      thumbnailSrc: _thumbnailSrc,
      onAction: _onAction,
      onDelete: _onDelete,
      onActionFocusFallback: _onActionFocusFallback,
      isInMultiItemList: _isInMultiItemList,
      status: _status,
      href,
      ...buttonProps
    } = props;
    previewButton = { href, buttonProps };
  }

  const uploadProgress = status === "uploading" ? props.progress : undefined;

  return (
    <StyledFileUploadStatus
      data-role="file-upload-status"
      $hasError={status === "error"}
      $hasThumbnail={hasThumbnailProp}
      $isInMultiItemList={isInMultiItemList}
      role={status === "error" ? "alert" : "group"}
      aria-label={filename}
    >
      {hasThumbnailProp ? (
        <>
          <StyledThumbnailColumn>
            <ThumbnailContent
              status={status}
              thumbnailSrc={thumbnailSrc}
              failedThumbnailSrc={failedThumbnailSrc}
              fallbackIconType={fallbackIconType}
              progress={uploadProgress}
              statusMessage={statusMessage}
              onThumbnailError={() => setFailedThumbnailSrc(thumbnailSrc)}
            />
          </StyledThumbnailColumn>
          <StyledFileUploadStatusDivider type="vertical" aria-hidden />
        </>
      ) : null}
      <StyledStatusContent>
        <StyledFileDetails>
          {hasThumbnailProp ? (
            <StyledFileName variant="span">{filename}</StyledFileName>
          ) : (
            // No thumbnail - show a small status icon before the filename.
            <StyledFileNameRow>
              {status === "uploading" ? (
                <UploadingIndicator
                  as={StyledStatusIcon}
                  size="extra-small"
                  progress={uploadProgress}
                  statusMessage={statusMessage}
                />
              ) : (
                <StyledStatusIcon>
                  <Icon
                    type={fallbackIconType}
                    aria-hidden
                    color={status === "error" ? "negative" : "neutral"}
                  />
                </StyledStatusIcon>
              )}
              <StyledFileName variant="span">{filename}</StyledFileName>
            </StyledFileNameRow>
          )}
          {statusMessage && (
            <StyledStatusMessage variant="p" $hasError={status === "error"}>
              {statusMessage}
            </StyledStatusMessage>
          )}
        </StyledFileDetails>
        <StyledActions>
          {/* Primary action renders first so the tertiary action ends up rightmost. */}
          {primaryAction && (
            <StyledActionButton
              variantType="subtle"
              size="small"
              onClick={invoke(primaryAction)}
              aria-label={`${primaryActionText} ${filename}`}
            >
              {primaryActionText}
            </StyledActionButton>
          )}
          {status === "error" && props.onRetry && (
            <StyledActionButton
              variantType="tertiary"
              size="small"
              onClick={invoke(props.onRetry)}
              aria-label={`${retryText} ${filename}`}
            >
              {retryText}
            </StyledActionButton>
          )}
          {previewButton && (
            <StyledActionButton
              {...previewButton.buttonProps}
              variantType="tertiary"
              size="small"
              href={previewButton.href}
              aria-label={`${previewText} ${filename}`}
            >
              {previewText}
            </StyledActionButton>
          )}
        </StyledActions>
      </StyledStatusContent>
    </StyledFileUploadStatus>
  );
};
export default FileUploadStatus;
