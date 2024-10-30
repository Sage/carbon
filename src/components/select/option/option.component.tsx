import React, { useContext, useRef } from "react";
import guid from "../../../__internal__/utils/helpers/guid";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import StyledOption from "./option.style";
import SelectListContext from "../__internal__/select-list/select-list.context";

export interface OptionProps
  extends Omit<
      React.InputHTMLAttributes<HTMLLIElement>,
      "value" | "onSelect" | "onClick"
    >,
    Omit<TagProps, "data-component"> {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** The option's visible text, displayed within `<Textbox>` of `<Select>`, and used for filtering */
  text?: string;
  /** Alternative rendered content, displayed within `<SelectList>` of `<Select>` (eg: an icon, an image, etc) */
  children?: React.ReactNode;
  /** The option's invisible internal value, if this is not passed the option will not be treated as interactive or selectable */
  value?: string | Record<string, unknown>;
  /** MultiSelect only - custom Pill border color - provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** MultiSelect only - fill Pill background with color */
  fill?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
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
  /**
   * @private
   * @ignore
   */
  isInGroup?: boolean;
}

const Option = React.forwardRef(
  (
    {
      text,
      children,
      disabled,
      onSelect,
      value,
      id,
      index,
      hidden,
      onClick,
      style,
      isInGroup,
      ...rest
    }: OptionProps,
    ref: React.ForwardedRef<HTMLLIElement>,
  ) => {
    const selectListContext = useContext(SelectListContext);
    let isSelected = selectListContext.currentOptionsListIndex === index;
    const internalIdRef = useRef(id || guid());

    if (selectListContext.multiselectValues && value) {
      isSelected = selectListContext.multiselectValues.includes(value);
    }

    function handleClick() {
      if (disabled || !value) {
        return;
      }
      if (!onClick) {
        onSelect?.({ text, value, id: internalIdRef.current });
      } else {
        onSelect?.();
        onClick(value);
      }
    }

    return (
      <StyledOption
        id={internalIdRef.current}
        ref={ref}
        aria-selected={isSelected}
        aria-disabled={disabled}
        isDisabled={disabled}
        onClick={handleClick}
        isHighlighted={selectListContext.currentOptionsListIndex === index}
        role="option"
        hidden={hidden}
        style={style}
        isInteractive={!!value}
        {...{ ...rest, fill: undefined }}
        data-component="option"
        isInGroup={isInGroup}
      >
        {children || text}
      </StyledOption>
    );
  },
);

Option.displayName = "Option";

export default Option;
