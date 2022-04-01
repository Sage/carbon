import React from "react";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import StyledSimpleColor from "./simple-color.style";
import ColorSampleBox from "../color-sample-box";
import StyledSimpleColorInput from "../simple-color-input/simple-color-input.style";
import { CommonInputProps } from "../../../__internal__/input";

export interface SimpleColorProps
  extends Pick<
    CommonInputProps,
    "id" | "name" | "onBlur" | "onChange" | "inputRef"
  > {
  defaultChecked?: boolean;
  /** the value of the color that is represented by this SimpleColor */
  value?: string;
  /** called when the user selects or deselects this color option */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onMouseDown` events */
  onMouseDown?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** determines if this color option is selected or unselected */
  checked?: boolean;
  /** [Legacy] Custom classname */
  className?: string;
  "data-component"?: string;
  "data-element"?: string;
  "data-role"?: string;
  "data-up"?: boolean;
  "data-down"?: boolean;
  "data-item-up"?: number;
  "data-item-down"?: number;
}

export const SimpleColor = React.forwardRef<
  HTMLInputElement | null,
  SimpleColorProps
>(
  (props: SimpleColorProps, ref): JSX.Element => {
    const {
      onChange,
      onBlur,
      onMouseDown,
      value = "",
      name,
      checked = false,
      className,
      ...rest
    } = props;

    return (
      <StyledSimpleColor
        color={value}
        checked={checked}
        className={className}
        {...tagComponent("simple-color", props)}
      >
        <StyledSimpleColorInput
          onChange={onChange}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
          checked={checked}
          name={name}
          type="radio"
          role="radio"
          value={value}
          aria-checked={checked}
          ref={ref}
          {...rest}
        />
        <ColorSampleBox color={value} checked={checked} />
      </StyledSimpleColor>
    );
  }
);

SimpleColor.displayName = "SimpleColor";
export default SimpleColor;
