import * as React from "react";
import { MarginProps } from "styled-system";

export interface SearchProps extends MarginProps {
  /** Prop to specify the aria-label of the search component */
  "aria-label"?: string;
  /** Prop for `uncontrolled` use */
  defaultValue?: string;
  /** Prop for `id` */
  id?: string;
  /** Prop for `name` */
  name?: string;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` events */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onClick` events.
   *  `onClick` events are triggered when the `searchButton` is clicked
   */
  onClick?: (
    ev: React.ChangeEvent<HTMLInputElement> &
      React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Prop for a placeholder */
  placeholder?: string;
  /** Prop boolean to state whether the `search` icon renders */
  searchButton?: boolean;
  /**
   * Prop for specifying an input width length.
   * Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /** Prop for active search threshold. This must be a positive number */
  threshold?: number;
  /** Prop for `controlled` use */
  value?: string;
  /** Prop to specify the styling of the search component */
  variant?: string;
  /** A callback to retrieve the input reference */
  inputRef?: React.RefObject<HTMLInputElement>;
  /** Input tabindex */
  tabIndex?: number;
}

declare function Search(props: SearchProps): JSX.Element;

export default Search;
