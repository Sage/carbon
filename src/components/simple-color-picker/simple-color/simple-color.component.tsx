import React, { useRef } from "react";

import guid from "../../../__internal__/utils/helpers/guid";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import {
  StyledSimpleColor,
  StyledColorSampleBox,
  StyledTickIcon,
  StyledSimpleColorInput,
} from "./simple-color.style";
import Logger from "../../../__internal__/utils/logger";

let deprecatedClassNameWarningShown = false;

export interface SimpleColorProps {
  /** the value of the color that is represented by this SimpleColor */
  value: string;
  /** the input name */
  name?: string;
  /** the input id */
  id?: string;
  /** if true, input will be disabled */
  disabled?: boolean;
  /** called when the user selects or deselects this color option */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onMouseDown` events */
  onMouseDown?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** determines if this color option is selected or unselected */
  checked?: boolean;
  /** determines if this color option is selected or unselected when component is used as uncontrolled */
  defaultChecked?: boolean;
  /** [Legacy] Custom classname */
  className?: string;
}

export const SimpleColor = React.forwardRef<HTMLInputElement, SimpleColorProps>(
  (props: SimpleColorProps, ref) => {
    if (!deprecatedClassNameWarningShown && props.className) {
      Logger.deprecate(
        "The 'className' prop has been deprecated and will soon be removed from the 'SimpleColor' component.",
      );
      deprecatedClassNameWarningShown = true;
    }

    const {
      onChange,
      onBlur,
      onMouseDown,
      value,
      name,
      checked = false,
      className,
      id,
      defaultChecked,
      ...rest
    } = props;

    const { current: inputId } = useRef(id || guid());

    return (
      <StyledSimpleColor
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
          ref={ref}
          id={inputId}
          defaultChecked={defaultChecked}
          {...rest}
        />
        <StyledColorSampleBox color={value}>
          {checked && <StyledTickIcon color={value} type="tick" />}
        </StyledColorSampleBox>
      </StyledSimpleColor>
    );
  },
);

SimpleColor.displayName = "SimpleColor";
export default SimpleColor;
