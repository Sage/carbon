import * as React from "react";
import Button from "../../button";
import { FormInputPropTypes } from "../select-textbox/select-textbox";

export interface FilterableSelectProps extends FormInputPropTypes {
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: React.ReactNode;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | object;
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal?: boolean;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** True for default text button or a Button Component to be rendered */
  listActionButton?: boolean | typeof Button;
  /** When true component will work in multi column mode.
   * Children should consist of OptionRow components in this mode
   */
  multiColumn?: boolean;
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage?: string;
  /** A custom callback for when the input text changes */
  onFilterChange?: (filterText: string) => void;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A callback for when the Action Button is triggered */
  onListAction?: () => void;
  /** A callback that is triggered when a user scrolls to the bottom of the list */
  onListScrollBottom?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string | object;
}

declare function FilterableSelect(props: FilterableSelectProps & React.RefAttributes<HTMLInputElement>): JSX.Element;

export default FilterableSelect;
