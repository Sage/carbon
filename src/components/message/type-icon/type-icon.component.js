import React from "react";
import PropTypes from "prop-types";
import TypeIconStyle from "./type-icon.style";
import Icon from "../../icon";
import OptionsHelper from "../../../utils/helpers/options-helper";

const TypeIcon = ({ variant, roundedCorners, transparent }) => {
  return (
    <TypeIconStyle
      variant={variant}
      roundedCorners={roundedCorners}
      transparent={transparent}
    >
      <Icon type={variant} bgTheme="none" />
    </TypeIconStyle>
  );
};

TypeIcon.defaultProps = {
  variant: "info",
  transparent: false,
  roundedCorners: true,
};

TypeIcon.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default TypeIcon;
