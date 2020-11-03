import React from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import Loader from "../../../components/loader/loader.component";
import StyledSwitchSlider from "./switch-slider.style";
import SwitchSliderPanel from "./switch-slider-panel.style";
import ValidationIcon from "../../../components/validations/validation-icon.component";

const SwitchSlider = (props) => {
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

  const on = I18n.t("switch.on", { defaultValue: "ON" }).toUpperCase();
  const off = I18n.t("switch.off", { defaultValue: "OFF" }).toUpperCase();

  const panelContent = checked ? on : off;

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
    ...props,
  };

  const sliderContent = (
    <SwitchSliderPanel {...sliderPanelStyleProps}>
      {loading ? <Loader {...loaderProps} /> : panelContent}
    </SwitchSliderPanel>
  );

  return (
    <StyledSwitchSlider {...switchSliderStyleProps}>
      {sliderContent}
      {useValidationIcon && (
        <ValidationIcon
          error={error}
          warning={warning}
          info={info}
          size={props.size}
        />
      )}
    </StyledSwitchSlider>
  );
};

SwitchSlider.propTypes = {
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
