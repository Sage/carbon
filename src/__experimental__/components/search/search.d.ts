import * as React from "react";

export interface SearchProps {
  /** Prop to specify the aria-label of the search component */
  "aria-label"?: string;
  /** Prop for `uncontrolled` use */
  defaultValue?: string;
  /** Prop for `id` */
  id?: string;
  /** Prop for `name` */
  name?: string;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Prop for `onChange` events */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onClick` events.
   *  `onClick` events are triggered when the `searchButton` is clicked
   */
  onClick?: (ev: React.SyntheticEvent) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.SyntheticEvent) => void;
  /** Prop for a placeholder */
  placeholder?: string;
  /** Prop boolean to state whether the `search` icon renders */
  searchButton?: boolean;
  /** Prop for specifing an input width length.
   *  Leaving the `searchWidth` prop with no value will default the width to '100%'
   */
  searchWidth?: string;
  /** Prop for active search threshold. This must be a positive number */
  threshold?: number;
  /** Prop for `controlled` use */
  value?: string;
  /** Prop to specify the styling of the search component */
  variant?: string;
}
declare const Search: React.ComponentType<SearchProps>;

export default Search;
