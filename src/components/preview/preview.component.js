import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import PreviewPlaceholder from "./__internal__/preview-placeholder.component";
import { StyledPreview } from "./preview.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

export const Preview = ({ children, loading, lines, ...props }) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const hasPlaceholder = typeof loading !== "undefined" ? loading : !children;

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

Preview.propTypes = {
  ...marginPropTypes,
  /** Children content to render in the component. */
  children: PropTypes.node,
  /** A custom height to be applied to the component. */
  height: PropTypes.string,
  /** The number of lines to render. */
  lines: PropTypes.number,
  /* Provides more control over when in a loading state. */
  loading: PropTypes.bool,
  /** A custom width */
  width: PropTypes.string,
};

Preview.defaultProps = {
  lines: 1,
};

export default Preview;
