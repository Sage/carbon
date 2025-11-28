import React from "react";

import Loader from "../../../loader/__next__/loader.component";
import { StyledSwitchSlider, HiddenContent } from "./switch-slider.style";
import SwitchSliderPanel from "./switch-slider-panel.style";
import useLocale from "../../../../hooks/__internal__/useLocale";

export interface SwitchSliderProps {
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "large";
}

const SwitchSlider = ({
  checked,
  disabled,
  loading,
  size,
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
  // const panelContent = checked ? onText : offText;

  const switchSliderStyleProps = {
    isLoading: loading,
    checked,
    disabled,
    size,
  };

  const sliderPanelStyleProps = {
    isLoading: loading,
    size,
    type: checked ? "on" : "off",
    disabled,
  };

  const loaderProps = {
    // isInsideButton: true,
    isActive: checked,
    size,
    showLabel: false,
  };

  const sliderContent = (
    <SwitchSliderPanel
      data-role="slider-panel"
      {...sliderPanelStyleProps}
      aria-live="polite"
    >
      {loading ? (
        <Loader
          loaderType="ring"
          data-role="switch-slider-loader"
          {...loaderProps}
        />
      ) : null}
    </SwitchSliderPanel>
  );

  return (
    <>
      <HiddenContent size={size} aria-hidden>
        {longestText}
      </HiddenContent>
      <StyledSwitchSlider
        data-component="slider"
        data-role="slider"
        {...switchSliderStyleProps}
      >
        {sliderContent}
      </StyledSwitchSlider>
    </>
  );
};

export default SwitchSlider;
