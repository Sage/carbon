import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import StyledButtonBar from "./button-bar.style";
import Button from "../button";
import IconButton from "../icon-button";

const ButtonBar = (props) => {
  const { children, size, iconPosition, buttonType, ...rest } = props;

  const getBtnProps = (child) => {
    const btnProps = {
      ...child.props,
      buttonType: "secondary",
      size,
      iconPosition,
      fullWidth: false,
    };
    return btnProps;
  };

  return (
    <StyledButtonBar {...rest}>
      {React.Children.map(children, (child) => (
        <child.type
          {...getBtnProps(child)}
          className={child.type === IconButton ? "icon" : ""}
        />
      ))}
    </StyledButtonBar>
  );
};

ButtonBar.propTypes = {
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition: PropTypes.oneOf(["before", "after"]),
  /** Styled system spacing props */
  ...propTypes.space,
  /** Apply fullWidth style to the button bar */
  fullWidth: PropTypes.bool,

  /** The Button / IconButton elements the button bar displays */
  children: (props) => {
    let error = null;
    React.Children.forEach(props.children, (child) => {
      if (child.type !== Button && child.type !== IconButton) {
        error = new Error(
          "ButtonBar accepts only `Button` or `IconButton` elements."
        );
      }
    });
    return error;
  },
};

ButtonBar.defaultProps = {
  size: "medium",
  iconPosition: "before",
  fullWidth: false,
};

export default ButtonBar;
