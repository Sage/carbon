import React from "react";
import PropTypes from "prop-types";
import TypeIconStyle from "./type-icon.style";
import Icon from "../../icon";
import OptionsHelper from "../../../utils/helpers/options-helper";

const TypeIcon = ({ variant, transparent }) => {
  return (
    <TypeIconStyle variant={variant} transparent={transparent}>
      <Icon type={variant} bgTheme="none" />
    </TypeIconStyle>
  );
};

TypeIcon.defaultProps = {
  variant: "info",
  transparent: false,
};

TypeIcon.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  transparent: PropTypes.bool,
};

export default TypeIcon;
