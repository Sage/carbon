import React, { useContext } from "react";
import { CSSProperties } from "styled-components";
import { TagProps } from "__internal__/utils/helpers/tags";
import StyledOptionRow from "./option-row.style";
import SelectListContext from "../__internal__/select-list-context";

export interface OptionRowProps extends TagProps {
  /** The option's visible text, displayed within <Textbox> of <Select> */
  text: string;
  /** Row content, should consist of multiple td elements */
  children: React.ReactNode;
  /** The option's invisible internal value */
  value: string | Record<string, unknown>;
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /**
   * @private
   * @ignore
   * Callback to return value when the element is selected (prop added by the SelectList component) */
  onSelect?: (ev: {
    id?: string;
    text: string;
    value: string | Record<string, unknown>;
  }) => void;
  /**
   * @private
   * @ignore
   * Position of the element in the list */
  index?: number;
  /**
   * @private
   * @ignore
   * True when option should be hidden from the view (prop added by the SelectList component) */
  hidden?: boolean;
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying DOM element */
  style?: CSSProperties;
}

const OptionRow = React.forwardRef(
  (
    {
      id,
      text,
      children,
      onSelect,
      value,
      index,
      hidden,
      style,
      ...rest
    }: OptionRowProps,
    ref: React.ForwardedRef<HTMLTableRowElement>
  ) => {
    const handleClick = () => {
      onSelect?.({ id, text, value });
    };
    const selectListContext = useContext(SelectListContext);
    let isSelected = selectListContext.currentOptionsListIndex === index;

    if (selectListContext.multiselectValues) {
      isSelected = selectListContext.multiselectValues.includes(value);
    }

    return (
      <StyledOptionRow
        id={id}
        ref={ref}
        aria-selected={isSelected}
        data-component="option-row"
        onClick={handleClick}
        isHighlighted={selectListContext.currentOptionsListIndex === index}
        role="option"
        hidden={hidden}
        style={style}
        {...rest}
      >
        {children}
      </StyledOptionRow>
    );
  }
);

OptionRow.displayName = "OptionRow";

export default OptionRow;
