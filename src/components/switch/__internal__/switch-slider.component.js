import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import Loader from "../../loader/loader.component";
import StyledSwitchSlider from "./switch-slider.style";
import SwitchSliderPanel from "./switch-slider-panel.style";
import ValidationIcon from "../../../__internal__/validations/validation-icon.component";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import useLocale from "../../../hooks/__internal__/useLocale";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const SwitchSlider = (props) => {
  const l = useLocale();
  const {
    checked,
    disabled,
    loading,
    size,
    error,
    warning,
    info,
    useValidationIcon,
  } = props;

  const panelContent = checked ? l.switch.on() : l.switch.off();

  const switchSliderStyleProps = {
    isLoading: loading,
    checked,
    disabled,
    size,
    error,
    warning,
    info,
  };

  const sliderPanelStyleProps = {
    isLoading: loading,
    size,
    type: checked ? "on" : "off",
    disabled,
  };

  const loaderProps = {
    isInsideButton: true,
    isActive: props.checked,
    size,
    ...filterStyledSystemMarginProps(props),
  };

  const sliderContent = (
    <SwitchSliderPanel {...sliderPanelStyleProps}>
      {loading ? <Loader {...loaderProps} /> : panelContent}
    </SwitchSliderPanel>
  );

  return (
    <StyledSwitchSlider
      {...switchSliderStyleProps}
      {...filterStyledSystemMarginProps(props)}
    >
      {sliderContent}
      {useValidationIcon && (
        <ValidationIcon
          error={error}
          warning={warning}
          info={info}
          size={props.size}
          tooltipFlipOverrides={["top", "bottom"]}
        />
      )}
    </StyledSwitchSlider>
  );
};

SwitchSlider.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  useValidationIcon: PropTypes.bool,
};

export default SwitchSlider;
