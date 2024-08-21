import React, { useContext, useRef } from "react";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import { Checkbox } from "../../checkbox";
import Events from "../../../__internal__/utils/helpers/events/events";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row.context";

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
  /** Sets an id string on the element */
  id?: string;
}

export const FlatTableCheckbox = ({
  as = "td",
  checked,
  onChange,
  selectable = true,
  onClick,
  ariaLabelledBy,
  id,
  ...rest
}: FlatTableCheckboxProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const internalId = useRef(id || guid());
  const { leftPositions, rightPositions } = useContext(FlatTableRowContext);

  const leftPosition = leftPositions[internalId.current];
  const rightPosition = rightPositions[internalId.current];
  const makeCellSticky =
    leftPosition !== undefined || rightPosition !== undefined;

  const dataElement = `flat-table-checkbox-${as === "td" ? "cell" : "header"}`;

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!Events.isDownKey(event) && !Events.isUpKey(event)) {
      event.stopPropagation();
    }
  };

  return (
    <StyledFlatTableCheckbox
      ref={ref}
      makeCellSticky={makeCellSticky}
      className={makeCellSticky ? "isSticky" : undefined}
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      as={as}
      {...tagComponent("flat-table-checkbox", {
        "data-element": dataElement,
        ...rest,
      })}
      id={internalId.current}
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
