import * as React from "react";
import { State } from "@popperjs/core";

type PopoverModifier = {
  name: string;
  options?: Record<string, unknown>;
  enabled?: boolean;
};

export interface PopoverPropTypes {
  // Element to be positioned, has to be a single node and has to accept `ref` and `style` props
  children: React.ReactNode;
  // Placement of children in relation to the reference element
  placement?:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";
  // Disables interaction with background UI
  disableBackgroundUI?: boolean;
  // Optional modifiers array, for more information and object structure go to:
  // https://popper.js.org/docs/v2/constructors/#modifiers
  modifiers?: PopoverModifier[];
  // Optional onFirstUpdate function, for more information go to:
  // hhttps://popper.js.org/docs/v2/lifecycle/#hook-into-the-lifecycle
  onFirstUpdate?: (state: State) => void;
  // When true, children are not rendered in portal
  disablePortal?: boolean;
  // Reference element, children will be positioned in relation to this element - should be a ref
  reference?: React.RefObject<HTMLElement>;
}

declare function Popover(props: PopoverPropTypes): JSX.Element;

export default Popover;
