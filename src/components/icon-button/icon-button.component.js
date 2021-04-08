import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Events from "../../utils/helpers/events";
import StyledIconButton from "./icon-button.style";
import Icon from "../icon";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const IconButton = React.forwardRef(({ onAction, children, ...rest }, ref) => {
  const marginProps = filterStyledSystemMarginProps(rest);
  const onKeyDown = (e) => {
    if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
      e.preventDefault();
      onAction(e);
    } else {
      e.stopPropagation();
    }
  };

  const handleOnAction = (e) => {
    onAction(e);
  };

  return (
    <StyledIconButton
      {...rest}
      onKeyDown={onKeyDown}
      onClick={handleOnAction}
      ref={ref}
      {...marginProps}
    >
      {children}
    </StyledIconButton>
  );
});

IconButton.propTypes = {
  ...marginPropTypes,
  /** Children prop is restricted to one Icon Component */
  children: PropTypes.shape({
    type: PropTypes.oneOf([Icon, PropTypes.element]),
  }).isRequired,
  /** Callback */
  onAction: PropTypes.func.isRequired,
};

export default IconButton;
