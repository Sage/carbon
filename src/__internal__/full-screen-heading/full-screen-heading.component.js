import React from "react";
import PropTypes from "prop-types";
import tagComponent from "../utils/helpers/tags/tags";
import StyledFullScreenHeading, {
  StyledHeaderContainer,
} from "./full-screen-heading.style";

const FullScreenHeading = React.forwardRef((props, ref) => {
  const { children, ...otherProps } = props;

  return (
    <StyledFullScreenHeading
      {...otherProps}
      {...tagComponent("full-screen-heading", props)}
      ref={ref}
    >
      <StyledHeaderContainer>{children}</StyledHeaderContainer>
    </StyledFullScreenHeading>
  );
});

FullScreenHeading.propTypes = {
  children: PropTypes.node,
};

export default FullScreenHeading;
