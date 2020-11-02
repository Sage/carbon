import React from "react";
import PropTypes from "prop-types";
import tagComponent from "../../utils/helpers/tags";
import StyledFullScreenHeading, {
  StyledHeaderContainer,
} from "./full-screen-heading.style";
import IconButton from "../../components/icon-button";
import Icon from "../../components/icon";

const FullScreenHeading = React.forwardRef((props, ref) => {
  const { children, showCloseIcon, onCancel, ...otherProps } = props;

  const closeIcon = () => {
    if (!showCloseIcon || !onCancel) return null;
    return (
      <IconButton data-element="close" onAction={onCancel}>
        <Icon type="close" />
      </IconButton>
    );
  };

  return (
    <StyledFullScreenHeading
      {...otherProps}
      {...tagComponent("full-screen-heading", props)}
      ref={ref}
    >
      <StyledHeaderContainer>{children}</StyledHeaderContainer>
      {closeIcon()}
    </StyledFullScreenHeading>
  );
});

FullScreenHeading.propTypes = {
  children: PropTypes.node,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** A custom close event handler */
  onCancel: PropTypes.func,
};

export default FullScreenHeading;
