import React, { useContext } from "react";
import StyledOption from "./option.style";
import SelectListContext from "../__internal__/select-list-context";

export interface OptionProps
  extends Omit<
    React.InputHTMLAttributes<HTMLLIElement>,
    "value" | "onSelect" | "onClick"
  > {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: string;
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children?: React.ReactNode;
  /** The option's invisible internal value */
  value: string | Record<string, unknown>;
  /** MultiSelect only - custom Pill border color - provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** MultiSelect only - fill Pill background with color */
  fill?: boolean;
  /**
   * @private
   * @ignore
   * OnClick callback */
  onClick?: (value: string | Record<string, unknown>) => void;
  /**
   * @private
   * @ignore
   * OnSelect callback */
  onSelect?: (target?: {
    text?: string;
    value?: string | Record<string, unknown>;
    id?: string;
  }) => void;
  /**
   * @private
   * @ignore
   */
  index?: number;
}

const Option = React.forwardRef(
  (
    {
      text,
      children,
      onSelect,
      value,
      id,
      index,
      hidden,
      onClick,
      style,
      ...rest
    }: OptionProps,
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    const selectListContext = useContext(SelectListContext);
    let isSelected = selectListContext.currentOptionsListIndex === index;

    if (selectListContext.multiselectValues) {
      isSelected = selectListContext.multiselectValues.includes(value);
    }

    function handleClick() {
      if (!onClick) {
        onSelect?.({ text, value, id });
      } else {
        onSelect?.();
        onClick(value);
      }
    }

    return (
      <StyledOption
        id={id}
        ref={ref}
        aria-selected={isSelected}
        data-component="option"
        onClick={handleClick}
        isHighlighted={selectListContext.currentOptionsListIndex === index}
        role="option"
        hidden={hidden}
        style={style}
        {...rest}
      >
        {children || text}
      </StyledOption>
    );
  }
);

Option.displayName = "Option";

export default Option;
