import React from "react";
import tagComponent from "../utils/helpers/tags/tags";
import StyledFullScreenHeading, {
  StyledHeaderContainer,
  StyledFullScreenHeadingProps,
} from "./full-screen-heading.style";

export interface FullScreenHeadingProps extends StyledFullScreenHeadingProps {
  children?: React.ReactNode;
}

const FullScreenHeading = React.forwardRef<
  HTMLDivElement,
  FullScreenHeadingProps
>((props: FullScreenHeadingProps, ref) => {
  const { children, hasContent } = props;

  return (
    <StyledFullScreenHeading
      hasContent={hasContent}
      {...tagComponent("full-screen-heading", props)}
      ref={ref}
    >
      <StyledHeaderContainer>{children}</StyledHeaderContainer>
    </StyledFullScreenHeading>
  );
});

FullScreenHeading.displayName = "FullScreenHeading";

export default FullScreenHeading;
