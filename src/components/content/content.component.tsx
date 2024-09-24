import React from "react";

import {
  StyledContent,
  StyledContentProps,
  StyledContentTitle,
  StyledContentTitleProps,
  StyledContentBody,
  StyledContentBodyProps,
} from "./content.style";

export interface ContentProps
  extends StyledContentProps,
    StyledContentTitleProps,
    StyledContentBodyProps {
  /** The body of the content component */
  children?: React.ReactNode;
  /** The title of the content component */
  title?: React.ReactNode;
}

export const Content = ({
  variant = "primary",
  children,
  title,
  inline = false,
  align = "left",
  titleWidth,
  bodyFullWidth = false,
  ...rest
}: ContentProps) => {
  return (
    <StyledContent
      align={align}
      bodyFullWidth={bodyFullWidth}
      {...rest}
      data-component="content"
    >
      <StyledContentTitle
        variant={variant}
        inline={inline}
        data-element="content-title"
        data-role="content-title"
        titleWidth={titleWidth}
        align={align}
      >
        {title}
      </StyledContentTitle>

      <StyledContentBody
        variant={variant}
        inline={inline}
        data-element="content-body"
        data-role="content-body"
        bodyFullWidth={bodyFullWidth}
        titleWidth={titleWidth}
        align={align}
      >
        {children}
      </StyledContentBody>
    </StyledContent>
  );
};

Content.displayName = "Content";
export default Content;
