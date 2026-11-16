import React from "react";
import Icon, { type IconType } from "../../../icon";
import Loader from "../../../loader/__next__";
import type { FileUploadStatusProps } from "./file-upload-status.component";
import {
  StyledStatusIcon,
  StyledThumbnail,
  StyledUploadingIcon,
} from "./file-upload-status.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import type { ResolvedFileInputLocale } from "../file-input.types";

interface UploadingIndicatorProps {
  as: typeof StyledUploadingIcon | typeof StyledStatusIcon;
  filename: string;
  size: "small" | "extra-small";
  progress?: number;
  statusMessage?: string;
}

export const UploadingIndicator = ({
  as: Wrapper,
  filename,
  size,
  progress,
  statusMessage,
}: UploadingIndicatorProps) => {
  const locale = useLocale();
  const fileInputLocale = locale.fileInput as ResolvedFileInputLocale;

  if (progress === undefined) {
    // The status message ("Uploading…" by default) already tells screen
    // readers the file is uploading, so the spinner is hidden from them. With
    // an empty message, the spinner is labelled instead.
    if (statusMessage?.trim()) {
      return (
        <Wrapper aria-hidden>
          <Loader loaderType="ring" size={size} showLabel={false} />
        </Wrapper>
      );
    }

    return (
      <Wrapper
        role="img"
        aria-label={`${filename}: ${fileInputLocale.uploading()}`}
      >
        <span aria-hidden>
          <Loader loaderType="ring" size={size} showLabel={false} />
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      // The adjacent status message is read as text, so the name only
      // identifies the file.
      aria-label={filename}
    >
      {/* TODO: Pass progress when Loader exposes a determinate ring API. Keep
          exactly one progress bar exposed to assistive technology: either keep
          Loader inside this aria-hidden span (visual only), or move the
          progressbar role, value, and filename name onto Loader and remove
          them here. Loader must then not also render its own status role or
          "Loading" label. */}
      <span aria-hidden>
        <Loader loaderType="ring" isTracked size={size} showLabel={false} />
      </span>
    </Wrapper>
  );
};

interface ThumbnailContentProps {
  status: FileUploadStatusProps["status"];
  filename: string;
  thumbnailSrc?: string;
  failedThumbnailSrc?: string;
  fallbackIconType: IconType;
  progress?: number;
  statusMessage?: string;
  onThumbnailError: () => void;
}

const ThumbnailContent = ({
  status,
  filename,
  thumbnailSrc,
  failedThumbnailSrc,
  fallbackIconType,
  progress,
  statusMessage,
  onThumbnailError,
}: ThumbnailContentProps) => {
  if (status === "uploading") {
    return (
      <UploadingIndicator
        as={StyledUploadingIcon}
        filename={filename}
        size="small"
        progress={progress}
        statusMessage={statusMessage}
      />
    );
  }

  if (status === "error") {
    return (
      <Icon type={fallbackIconType} size="large" aria-hidden color="negative" />
    );
  }

  if (thumbnailSrc && thumbnailSrc !== failedThumbnailSrc) {
    return (
      <StyledThumbnail src={thumbnailSrc} alt="" onError={onThumbnailError} />
    );
  }

  return <Icon type={fallbackIconType} aria-hidden color="neutral" />;
};

export default ThumbnailContent;
