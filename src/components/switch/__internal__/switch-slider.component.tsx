import React from "react";

import Loader from "../../loader/loader.component";
import { StyledSwitchSlider, HiddenContent } from "./switch-slider.style";
import SwitchSliderPanel from "./switch-slider-panel.style";
import ValidationIcon from "../../../__internal__/validations/validation-icon.component";
import useLocale from "../../../hooks/__internal__/useLocale";
import { ValidationProps } from "../../../__internal__/validations";

export interface SwitchSliderProps extends ValidationProps {
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "large";
  useValidationIcon?: boolean;
}

const SwitchSlider = ({
  checked,
  disabled,
  loading,
  size,
  error,
  warning,
  info,
  useValidationIcon,
}: SwitchSliderProps) => {
  const locale = useLocale();
  const onText = locale.switch.on();
  const offText = locale.switch.off();

  // Need to convert to uppercase to ensure hidden element
  // has same computed width as the visual text that's rendered
  const longestText =
    onText.length > offText.length
      ? onText.toUpperCase()
      : offText.toUpperCase();
  const panelContent = checked ? onText : offText;

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
    isActive: checked,
    size,
  };

  const sliderContent = (
    <SwitchSliderPanel {...sliderPanelStyleProps}>
      {loading ? <Loader {...loaderProps} /> : panelContent}
    </SwitchSliderPanel>
  );

  return (
    <>
      <HiddenContent size={size} aria-hidden>
        {longestText}
      </HiddenContent>
      <StyledSwitchSlider data-component="slider" {...switchSliderStyleProps}>
        {sliderContent}
        {useValidationIcon && (
          <ValidationIcon
            error={error}
            warning={warning}
            info={info}
            size={size}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        )}
      </StyledSwitchSlider>
    </>
  );
};

export default SwitchSlider;
