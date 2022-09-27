import React from "react";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import {
  StyledPreviewPlaceholder,
  StyledPreviewPlaceholderProps,
} from "./preview-placeholder.style";

export interface PreviewPlaceholderProps extends StyledPreviewPlaceholderProps {
  index: number;
  /** The number of lines to render. */
  lines: number;
  /* Provides more control over when in a loading state. */
  loading?: boolean;
}

const PreviewPlaceholder = ({
  height,
  index,
  lines,
  width,
  ...props
}: PreviewPlaceholderProps) => {
  const isLastLine = lines > 1 && lines === index;

  return (
    <StyledPreviewPlaceholder
      height={height}
      width={!width && isLastLine ? "80%" : width}
      {...tagComponent("preview", props)}
    />
  );
};

export default PreviewPlaceholder;
