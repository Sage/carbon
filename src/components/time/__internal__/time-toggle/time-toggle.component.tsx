import React, { useRef, useCallback } from "react";
import guid from "../../../../__internal__/utils/helpers/guid";
import { TagProps } from "../../../../__internal__/utils/helpers/tags";
import { ToggleValue } from "../../time.component";
import useLocale from "../../../../hooks/__internal__/useLocale";

import { ButtonToggle, ButtonToggleGroup } from "../../../button-toggle";

export interface ToggleDataProps {
  wrapperProps?: Omit<TagProps, "data-component">;
  amToggleProps?: Omit<TagProps, "data-component">;
  pmToggleProps?: Omit<TagProps, "data-component">;
}

export interface ToggleProps extends Omit<TagProps, "data-component"> {
  size?: "small" | "medium" | "large";
  onChange: (pressedValue: ToggleValue) => void;
  toggleValue: ToggleValue;
  disabled?: boolean;
  toggleProps?: ToggleDataProps;
}

const Toggle = ({
  size,
  onChange,
  toggleValue,
  disabled,
  toggleProps,
}: ToggleProps) => {
  const locale = useLocale();
  const amText = locale.time.amText();
  const pmText = locale.time.pmText();
  const internalId = useRef(guid());
  const { wrapperProps, amToggleProps, pmToggleProps } =
    toggleProps || /* istanbul ignore next */ {};

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const selectedButtonValue = (event.target as HTMLButtonElement).value;

      if (selectedButtonValue !== toggleValue) {
        onChange(selectedButtonValue as ToggleValue);
      }
    },
    [toggleValue, onChange],
  );

  return (
    <ButtonToggleGroup
      {...wrapperProps}
      data-component="time-button-toggle-group"
      m="0px 0px 0px 16px"
      id={internalId.current}
      onChange={handleChange}
      value={toggleValue}
      disabled={disabled}
    >
      <ButtonToggle
        {...amToggleProps}
        data-component="am-button-toggle"
        value="AM"
        size={size}
      >
        {amText}
      </ButtonToggle>
      <ButtonToggle
        {...pmToggleProps}
        data-component="pm-button-toggle"
        value="PM"
        size={size}
      >
        {pmText}
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};

Toggle.displayName = "Toggle";

export default Toggle;
