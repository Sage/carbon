import React from "react";
import Link, { LinkProps } from "../../../link";
import ButtonMinor from "../../../button-minor";
import StyledTypography from "../../../typography/typography.style";
import {
  StyledProgressBar,
  InnerBar,
} from "../../../progress-tracker/progress-tracker.style";
import LoaderBar from "../../../loader-bar";
import Icon, { IconType } from "../../../icon";
import {
  StyledFileUploadStatus,
  StyledFileUploadStatusRow,
  StyledFileLinkContainer,
} from "./file-upload-status.style";
import useLocale from "../../../../hooks/__internal__/useLocale";

interface StatusUploadingProps {
  /** the status of the upload */
  status: "uploading";
  /** a number from 0-100 giving the current upload progress as a percentage. Only used for the `uploading` status.
   * If the progress prop is not specified in the `uploading` status, a loading animation will be shown instead
   * (or text equivalent for users with a reduced-motion operating system preference).
   */
  progress?: number;
}

interface StatusDoneProps extends LinkProps {
  /** the status of the upload */
  status: "completed" | "previously";
  /** the URL opened by the file link. Must be provided for only the `completed` and `previously` statuses. */
  href: string;
}

interface StatusErrorProps {
  /** the status of the upload */
  status: "error";
}

interface MandatoryStatusProps {
  /** the name of the file */
  filename: string;
  /** a function to be executed when the user clicks the appropriate action button (Clear/Delete File/Cancel Upload)  */
  onAction: () => void;
  /** The status message. Used to display the current upload progress, including error messages where appropriate. Not used for the `previously` status. */
  message?: string;
  /** The icon to use for the file during or after upload */
  iconType?: IconType;
}

export type FileUploadStatusProps = MandatoryStatusProps &
  (StatusUploadingProps | StatusErrorProps | StatusDoneProps);

export const FileUploadStatus = ({
  status,
  filename,
  message,
  onAction,
  iconType = "file_generic",
  ...statusProps
}: FileUploadStatusProps) => {
  const locale = useLocale();
  const statusMessage = message || locale.fileInput.fileUploadStatus();

  let buttonText;
  let linkProps;
  let progressBar = null;
  switch (status) {
    case "uploading":
      buttonText = locale.fileInput.actions.cancel();
      progressBar =
        (statusProps as StatusUploadingProps).progress === undefined ? (
          <LoaderBar />
        ) : (
          <StyledProgressBar
            data-element="progress-tracker-bar"
            data-role="progress-tracker-bar"
            progress={(statusProps as StatusUploadingProps).progress}
            aria-hidden="true"
          >
            <InnerBar
              data-element="inner-bar"
              data-role="inner-bar"
              size="medium"
              progress={
                (statusProps as StatusUploadingProps).progress as number
              }
              error={false}
            />
          </StyledProgressBar>
        );
      break;
    case "previously":
    case "completed":
      buttonText = locale.fileInput.actions.delete();
      linkProps = { ...statusProps, icon: iconType };
      break;
    case "error":
      buttonText = locale.fileInput.actions.clear();
      break;
    // istanbul ignore next
    default:
      // no other cases if consumers are using TS, but ESLint still insists on it
      break;
  }
  const actionButton = (
    <ButtonMinor onClick={onAction} buttonType="tertiary">
      {buttonText}
    </ButtonMinor>
  );

  const fileLink = linkProps ? (
    <Link download={Boolean(status === "completed")} {...linkProps}>
      {filename}
    </Link>
  ) : (
    <>
      <Icon type={iconType} />
      <span>{filename}</span>
    </>
  );
  const mainRow =
    status !== "previously" ? (
      <StyledFileUploadStatusRow>
        <StyledTypography as="p" mb={0} aria-live="polite">
          {statusMessage}
        </StyledTypography>
        {actionButton}
      </StyledFileUploadStatusRow>
    ) : (
      <StyledFileUploadStatusRow onlyRow>
        <StyledFileLinkContainer>{fileLink}</StyledFileLinkContainer>
        {actionButton}
      </StyledFileUploadStatusRow>
    );
  const secondRow =
    status !== "previously" ? (
      <StyledFileUploadStatusRow upperPadding lowerPadding>
        <StyledFileLinkContainer>{fileLink}</StyledFileLinkContainer>
      </StyledFileUploadStatusRow>
    ) : null;
  return (
    <StyledFileUploadStatus
      data-role="file-upload-status"
      hasError={status === "error"}
    >
      {mainRow}
      {secondRow}
      {progressBar}
    </StyledFileUploadStatus>
  );
};

export default FileUploadStatus;
