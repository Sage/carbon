import React from "react";
import Icon, { type IconType } from "../../../icon";
import Loader from "../../../loader/__next__";
import type { FileUploadStatusProps } from "./file-upload-status.component";
import {
  StyledStatusIcon,
  StyledThumbnail,
  StyledUploadingIcon,
} from "./file-upload-status.style";

interface UploadingIndicatorProps {
  as: typeof StyledUploadingIcon | typeof StyledStatusIcon;
  size: "small" | "extra-small";
  progress?: number;
  statusMessage?: string;
}

export const UploadingIndicator = ({
  as: Wrapper,
  size,
  progress,
  statusMessage,
}: UploadingIndicatorProps) => {
  if (progress === undefined) {
    return (
      <Wrapper>
        <Loader
          loaderType="ring"
          size={size}
          showLabel={false}
          loaderLabel={statusMessage}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label={statusMessage}
    >
      {/* Avoid Loader's nested status role conflicting with this progressbar. */}
      <span aria-hidden>
        <Loader loaderType="ring" isTracked size={size} showLabel={false} />
      </span>
    </Wrapper>
  );
};

interface ThumbnailContentProps {
  status: FileUploadStatusProps["status"];
  thumbnailSrc?: string;
  failedThumbnailSrc?: string;
  fallbackIconType: IconType;
  progress?: number;
  statusMessage?: string;
  onThumbnailError: () => void;
}

const ThumbnailContent = ({
  status,
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
