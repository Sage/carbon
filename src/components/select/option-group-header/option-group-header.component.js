import React from "react";
import PropTypes from "prop-types";
import StyledOptionGroupHeader from "./option-group-header.style";
import Icon from "../../icon";

const OptionGroupHeader = ({ label, icon }) => {
  return (
    <StyledOptionGroupHeader>
      {icon && <Icon type={icon} />}
      <h4>{label}</h4>
    </StyledOptionGroupHeader>
  );
};

OptionGroupHeader.propTypes = {
  /** Heading text */
  label: PropTypes.string.isRequired,
  /** Any valid Carbon icon name */
  icon: PropTypes.string,
};

export default OptionGroupHeader;
