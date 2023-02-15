import React from "react";
import PropTypes from "prop-types";
import StyledOptionGroupHeader from "./option-group-header.style";
import Icon from "../../icon";

const OptionGroupHeader = React.forwardRef(
  ({ label, icon, style, ...rest }, ref) => {
    return (
      <StyledOptionGroupHeader style={style} {...rest} ref={ref}>
        {icon && <Icon type={icon} />}
        <h4>{label}</h4>
      </StyledOptionGroupHeader>
    );
  }
);

OptionGroupHeader.propTypes = {
  /** Heading text */
  label: PropTypes.string.isRequired,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Any valid Carbon icon name
   */
  icon: PropTypes.string,
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying DOM element */
  style: PropTypes.object,
};

export default OptionGroupHeader;
