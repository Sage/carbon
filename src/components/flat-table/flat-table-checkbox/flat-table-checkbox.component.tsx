import React, { useLayoutEffect, useRef } from "react";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import { Checkbox } from "../../checkbox";
import Events from "../../../__internal__/utils/helpers/events/events";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface FlatTableCheckboxProps extends TagProps {
  /** Prop to polymorphically render either a 'th' or 'td' element */
  as?: "td" | "th";
  /** Prop to set checked prop on Checkbox */
  checked?: boolean;
  /** Callback to be called onChange in Checkbox */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Whether to render the checkbox or not, defaults to true */
  selectable?: boolean;
  /** Callback function to be called when click event received */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** The id of the element that labels the input */
  ariaLabelledBy?: string;
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition?: number;
  /**
   * @private
   * @ignore
   * Sets the right position when sticky column found
   */
  rightPosition?: number;
  /**
   * @private
   * @ignore
   * Index of cell within row
   */
  cellIndex?: number;
  /**
   * @private
   * @ignore
   * Callback to report the offsetWidth
   */
  reportCellWidth?: (offset: number, index?: number) => void;
}

export const FlatTableCheckbox = ({
  as = "td",
  checked,
  onChange,
  selectable = true,
  onClick,
  leftPosition,
  rightPosition,
  cellIndex,
  reportCellWidth,
  ariaLabelledBy,
  ...rest
}: FlatTableCheckboxProps) => {
  const ref = useRef<HTMLTableCellElement>(null);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  const dataElement = `flat-table-checkbox-${as === "td" ? "cell" : "header"}`;

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (onClick) onClick(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!Events.isDownKey(event) && !Events.isUpKey(event)) {
      event.stopPropagation();
    }
  };

  return (
    <StyledFlatTableCheckbox
      ref={ref}
      makeCellSticky={!!reportCellWidth}
      className={reportCellWidth ? "isSticky" : undefined}
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      as={as}
      {...tagComponent("flat-table-checkbox", {
        "data-element": dataElement,
        ...rest,
      })}
    >
      {selectable && (
        <Checkbox
          checked={checked}
          onChange={onChange}
          name="flat-table-checkbox"
          mb={0}
          ariaLabelledBy={ariaLabelledBy}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      )}
    </StyledFlatTableCheckbox>
  );
};

FlatTableCheckbox.displayName = "FlatTableCheckbox";

export default FlatTableCheckbox;
