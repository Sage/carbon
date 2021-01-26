import React from "react";
import PropTypes from "prop-types";
import {
  StyledContent,
  StyledContentTitle,
  StyledContentBody,
} from "./content.style.js";

const Content = ({
  variant = "primary",
  children,
  title,
  inline = false,
  align = "left",
  titleWidth,
  bodyFullWidth = false,
}) => (
  <StyledContent
    align={align}
    bodyFullWidth={bodyFullWidth}
    data-component="content"
  >
    <StyledContentTitle
      variant={variant}
      inline={inline}
      data-element="content-title"
      titleWidth={titleWidth}
      align={align}
    >
      {title}
    </StyledContentTitle>

    <StyledContentBody
      variant={variant}
      inline={inline}
      data-element="content-body"
      bodyFullWidth={bodyFullWidth}
      titleWidth={titleWidth}
      align={align}
    >
      {children}
    </StyledContentBody>
  </StyledContent>
);

Content.propTypes = {
  /** Applies a theme to the Content Value: primary, secondary */
  variant: PropTypes.oneOf(["primary", "secondary"]),
  /** The body of the content component */
  children: PropTypes.node,
  /** The title of the content component */
  title: PropTypes.string,
  /** Displays the content inline with the title */
  inline: PropTypes.bool,
  /** Aligns the content (left, center or right) */
  align: PropTypes.oneOf(["left", "center", "right"]),
  /** Sets a custom width for the title element */
  titleWidth: PropTypes.string,
  /** Over-rides the calculation of body width based on titleWidth.
   * Sometimes we need the body to be full width while keeping a title width similar to other widths */
  bodyFullWidth: PropTypes.bool,
};

export default Content;
