import React from "react";
import PropTypes from "prop-types";
import TypeIconStyle from "./type-icon.style";
import Icon from "../../icon";

const TypeIcon = ({ variant, transparent }) => {
  return (
    <TypeIconStyle variant={variant} transparent={transparent}>
      <Icon type={variant} />
    </TypeIconStyle>
  );
};

TypeIcon.defaultProps = {
  variant: "info",
  transparent: false,
};

TypeIcon.propTypes = {
  variant: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
  transparent: PropTypes.bool,
};

export default TypeIcon;
