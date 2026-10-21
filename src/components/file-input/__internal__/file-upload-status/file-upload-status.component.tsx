import React, { useEffect, useRef, useState } from "react";
import Button, { type ButtonProps } from "../../../button/__next__";
import Icon, { type IconType } from "../../../icon";
import {
  StyledActions,
  StyledFileDetails,
  StyledErrorStatus,
  StyledFileName,
  StyledFileNameRow,
  StyledFileUploadStatus,
  StyledStatusContent,
  StyledStatusIcon,
  StyledStatusMessage,
  StyledLeadingColumn,
} from "./file-upload-status.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import type { ResolvedFileInputLocale } from "../file-input.types";
import ThumbnailContent, {
  UploadingIndicator,
} from "./thumbnail-content.component";
import guid from "../../../../__internal__/utils/helpers/guid";

interface SharedStatusProps {
  /**
   * Name shown on the status card and used in action labels and
   * announcements.
   */
  filename: string;
  /**
   * Stable unique id. Use it when filenames can repeat, so each file keeps its
   * card and completion announcements match the right file.
   */
  id?: string;
  /**
   * Replaces the default status text ("Uploading…", "File uploaded" or "Error
   * details"). Previously uploaded files have no default text. For failed
   * files, the text is also announced. Include the file's state in a custom
   * message (for example "Uploading… 2.4 MB of 10 MB"), as it is the only
   * text that tells screen reader users the state.
   */
  message?: string;
  /**
   * Icon for the file. Shown before the filename when there is no thumbnail
   * column (uploading files show the loader instead), and in the thumbnail
   * column for failed files or when the image fails to load. Defaults to
   * `error` for failed files and a generic file icon otherwise.
   */
  iconType?: IconType;
  /**
   * Adds a thumbnail column. Completed and previously uploaded files show this
   * image, or the icon if it fails to load. Uploading files show the loader,
   * and failed files show the error icon.
   */
  thumbnailSrc?: string;
}
interface DeprecatedPrimaryAction {
  /**
   * @deprecated Use `onCancel`, `onDelete` or `onRemove`, depending on
   * `status`.
   */
  onAction: () => void;
}
interface CancelAction {
  /** Cancels the upload. Adds a Cancel button to the status card. */
  onCancel: () => void;
}
interface DeleteAction {
  /** Deletes the uploaded file. Adds a Delete button to the status card. */
  onDelete: () => void;
}
interface RemoveAction {
  /** Removes the failed file. Adds a Remove button to the status card. */
  onRemove: () => void;
}
// Callers must supply either the status-specific callback (e.g. `onCancel`)
// or the deprecated `onAction` - never neither.
type PrimaryAction<Action> =
  | (DeprecatedPrimaryAction & Partial<Action>)
  | ({ onAction?: never } & Action);
type StatusUploadingProps = SharedStatusProps &
  PrimaryAction<CancelAction> & {
    /** Upload state. `"previously"` is a file uploaded before this session. */
    status: "uploading";
    /**
     * Upload progress from 0 to 100, exposed to assistive technology. The
     * spinner does not yet show the value visually. Omit when unknown.
     */
    progress?: number;
  };
type StatusCompletedProps = SharedStatusProps &
  // Applied to the Preview link only, when `href` is set. aria-label is set
  // internally, so it's omitted here.
  Omit<ButtonProps, "href" | "aria-label"> &
  PrimaryAction<DeleteAction> & {
    /** Upload state. `"previously"` is a file uploaded before this session. */
    status: "completed";
    /** URL of the file. Adds a Preview link to the status card. */
    href?: string;
  };
type StatusPreviouslyProps = SharedStatusProps &
  // Applied to the Preview link only, when `href` is set. aria-label is set
  // internally, so it's omitted here.
  Omit<ButtonProps, "href" | "aria-label"> & {
    /** Upload state. `"previously"` is a file uploaded before this session. */
    status: "previously";
    /** URL of the file. Adds a Preview link to the status card. */
    href?: string;
    /**
     * Deletes the file. Single-file mode only; previously uploaded files are
     * read-only in multiple-file mode.
     */
    onDelete?: () => void;
    /** @deprecated Use `onDelete`. */
    onAction?: () => void;
  };
type StatusErrorProps = SharedStatusProps &
  PrimaryAction<RemoveAction> & {
    /** Upload state. `"previously"` is a file uploaded before this session. */
    status: "error";
    /** Adds a Retry button to the status card. */
    onRetry?: () => void;
  };
export type FileUploadStatusProps =
  | StatusUploadingProps
  | StatusCompletedProps
  | StatusPreviouslyProps
  | StatusErrorProps;
interface InternalProps {
  /** @ignore @private */
  moveFocusAfterAction?: (
    element: HTMLElement,
    removalAnnouncement?: string,
  ) => void;
  /** @ignore @private */
  isInMultiItemList?: boolean;
  /** @ignore @private */
  maxHeight?: string;
  /** @ignore @private */
  minHeight?: string;
  /** @ignore @private */
  multiple?: boolean;
  /** @ignore @private */
  removalAnnouncementId?: string;
  /** @ignore @private */
  onPreviewActivate?: () => void;
  /**
   * @ignore @private
   * Whether an error present when this status mounts should be announced.
   * False for statuses rendered with the field, so page load stays silent.
   */
  announceInitialError?: boolean;
}

interface PrimaryActionConfig {
  callback: () => void;
  text: string;
  removalAnnouncement: string;
}

interface PreviewButtonConfig {
  href: string;
  buttonProps: ButtonProps;
}

const createPrimaryAction = (
  callback: (() => void) | undefined,
  text: string,
  removalAnnouncement: string,
): PrimaryActionConfig | undefined =>
  callback ? { callback, text, removalAnnouncement } : undefined;

const createPreviewButton = (
  props: FileUploadStatusProps & InternalProps,
): PreviewButtonConfig | undefined => {
  if (
    (props.status !== "completed" && props.status !== "previously") ||
    !props.href
  ) {
    return undefined;
  }

  // Preview link props remain flat for compatibility with the previous
  // FileUploadStatus API. Adapt them here so status and internal layout props
  // are not forwarded to the underlying button element.
  const {
    id: _id,
    filename: _filename,
    message: _message,
    iconType: _iconType,
    thumbnailSrc: _thumbnailSrc,
    onAction: _onAction,
    onDelete: _onDelete,
    moveFocusAfterAction: _moveFocusAfterAction,
    isInMultiItemList: _isInMultiItemList,
    maxHeight: _maxHeight,
    minHeight: _minHeight,
    multiple: _multiple,
    removalAnnouncementId: _removalAnnouncementId,
    onPreviewActivate: _onPreviewActivate,
    announceInitialError: _announceInitialError,
    status: _status,
    href,
    ...buttonProps
  } = props;

  return { href, buttonProps };
};

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
    moveFocusAfterAction,
    isInMultiItemList,
    maxHeight,
    minHeight,
    multiple,
    removalAnnouncementId,
    onPreviewActivate,
    announceInitialError,
  } = props;
  const fallbackIconType =
    iconType ?? (status === "error" ? "error" : "file_generic");

  const locale = useLocale();
  const fileInputLocale = locale.fileInput as ResolvedFileInputLocale;

  const [failedThumbnailSrc, setFailedThumbnailSrc] = useState<string>();
  // A live region populated as it is inserted is not reliably announced, so
  // a status added in error mounts its region empty and fills it next frame.
  const [isErrorRegionReady, setIsErrorRegionReady] =
    useState(!announceInitialError);

  useEffect(() => {
    if (isErrorRegionReady) return undefined;
    const frame = requestAnimationFrame(() => setIsErrorRegionReady(true));
    return () => cancelAnimationFrame(frame);
  }, [isErrorRegionReady]);
  const statusMessageId = useRef(guid()).current;
  const hasThumbnailProp = thumbnailSrc !== undefined;

  let primaryAction: PrimaryActionConfig | undefined;
  let defaultStatusMessage: string | undefined;

  switch (status) {
    case "uploading":
      primaryAction = createPrimaryAction(
        props.onCancel ?? onAction,
        fileInputLocale.actions.cancel(),
        fileInputLocale.announcements.uploadCancelled(filename),
      );
      defaultStatusMessage = fileInputLocale.uploading();
      break;
    case "error":
      primaryAction = createPrimaryAction(
        props.onRemove ?? onAction,
        fileInputLocale.actions.remove(),
        fileInputLocale.announcements.fileRemoved(filename),
      );
      defaultStatusMessage = fileInputLocale.uploadErrorDetails();
      break;
    case "completed":
      primaryAction = createPrimaryAction(
        props.onDelete ?? onAction,
        fileInputLocale.actions.delete(),
        fileInputLocale.announcements.fileDeleted(filename),
      );
      defaultStatusMessage = fileInputLocale.uploaded();
      break;
    case "previously":
      primaryAction = multiple
        ? undefined
        : createPrimaryAction(
            props.onDelete ?? onAction,
            fileInputLocale.actions.delete(),
            fileInputLocale.announcements.fileDeleted(filename),
          );
      defaultStatusMessage = undefined;
      break;
  }

  const statusMessage = message ?? defaultStatusMessage;
  const actionDescription =
    [removalAnnouncementId, statusMessage ? statusMessageId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const retryText = fileInputLocale.actions.retry();

  const previewText = fileInputLocale.actions.preview();

  const invoke =
    (callback?: () => void, removalAnnouncement?: string) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      callback?.();
      moveFocusAfterAction?.(event.currentTarget, removalAnnouncement);
    };

  const previewButton = createPreviewButton(props);

  const uploadProgress = status === "uploading" ? props.progress : undefined;

  return (
    <StyledFileUploadStatus
      data-role="file-upload-status"
      $hasError={status === "error"}
      $hasThumbnail={hasThumbnailProp}
      $isInMultiItemList={isInMultiItemList}
      $maxHeight={maxHeight}
      $minHeight={minHeight}
      $multiple={multiple}
    >
      {hasThumbnailProp ? (
        <>
          <StyledLeadingColumn>
            <ThumbnailContent
              status={status}
              filename={filename}
              thumbnailSrc={thumbnailSrc}
              failedThumbnailSrc={failedThumbnailSrc}
              fallbackIconType={fallbackIconType}
              progress={uploadProgress}
              statusMessage={statusMessage}
              onThumbnailError={() => setFailedThumbnailSrc(thumbnailSrc)}
            />
          </StyledLeadingColumn>
        </>
      ) : null}
      <StyledStatusContent $multiple={multiple} $minHeight={minHeight}>
        <StyledErrorStatus role="status" data-role="file-upload-error-status">
          {status === "error" && isErrorRegionReady
            ? `${filename}: ${statusMessage}`
            : null}
        </StyledErrorStatus>
        <StyledFileDetails aria-hidden={status === "error" || undefined}>
          {hasThumbnailProp ? (
            <StyledFileName variant="span">{filename}</StyledFileName>
          ) : (
            // No thumbnail - show a small status icon before the filename.
            <StyledFileNameRow>
              {status === "uploading" ? (
                <UploadingIndicator
                  as={StyledStatusIcon}
                  filename={filename}
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
            <StyledStatusMessage
              id={statusMessageId}
              variant="p"
              $hasError={status === "error"}
            >
              {statusMessage}
            </StyledStatusMessage>
          )}
        </StyledFileDetails>
        <StyledActions>
          {/* Primary action renders first so the tertiary action ends up rightmost. */}
          {primaryAction && (
            <Button
              variantType="subtle"
              size="small"
              onClick={invoke(
                primaryAction.callback,
                primaryAction.removalAnnouncement,
              )}
              aria-label={`${primaryAction.text} ${filename}`}
              aria-describedby={actionDescription}
            >
              {primaryAction.text}
            </Button>
          )}
          {status === "error" && props.onRetry && (
            <Button
              variantType="tertiary"
              size="small"
              onClick={invoke(props.onRetry)}
              aria-label={`${retryText} ${filename}`}
              aria-describedby={actionDescription}
            >
              {retryText}
            </Button>
          )}
          {previewButton && (
            <Button
              {...previewButton.buttonProps}
              variantType="tertiary"
              size="small"
              href={previewButton.href}
              aria-label={`${previewText} ${filename}`}
              aria-describedby={
                [
                  removalAnnouncementId,
                  previewButton.buttonProps["aria-describedby"],
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              onClick={(event) => {
                onPreviewActivate?.();
                previewButton.buttonProps.onClick?.(event);
              }}
            >
              {previewText}
            </Button>
          )}
        </StyledActions>
      </StyledStatusContent>
    </StyledFileUploadStatus>
  );
};
export default FileUploadStatus;
