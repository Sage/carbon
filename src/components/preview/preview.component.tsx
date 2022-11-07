import React from "react";
import { MarginProps } from "styled-system";

import { Expand } from "../../__internal__/utils/helpers/types";
import PreviewPlaceholder, {
  PreviewPlaceholderProps,
} from "./__internal__/preview-placeholder.component";
import { StyledPreview } from "./preview.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface PreviewProps
  extends Partial<Omit<PreviewPlaceholderProps, "index">>,
    Expand<MarginProps> {
  /** Children content to render in the component. */
  children?: React.ReactNode;
  /* Provides more control over when in a loading state. */
  loading?: boolean;
}

export const Preview = ({
  children,
  loading,
  lines = 1,
  ...props
}: PreviewProps) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const hasPlaceholder = loading === undefined ? !children : loading;

  if (hasPlaceholder) {
    const placeholders = [];

    for (let i = 1; i <= lines; i++) {
      placeholders.push(
        <PreviewPlaceholder key={i} index={i} lines={lines} {...props} />
      );
    }

    return <StyledPreview {...marginProps}>{placeholders}</StyledPreview>;
  }

  return <StyledPreview {...marginProps}>{children}</StyledPreview>;
};

export default Preview;
