import * as React from "react";

export interface ConfigurableItemsProps {
  /** Children elements. */
  children?: React.ReactNode;
  /** A custom class name for the component. */
  className?: string;
  /** Callback triggered when an item is dragged. */
  onDrag: (originalIndex: number, hoverIndex: number) => void;
  /** Callback triggered when when the reset button is pressed. */
  onReset?: () => void;
  /** Callback triggered when the form is saved. */
  onSave: (ev: React.FormEvent<HTMLFormElement>) => void;
  /** An internal prop. Helpful to detect which component should be rendered */
  theme?: object;

}

declare function ConfigurableItems(props: ConfigurableItemsProps): JSX.Element;

export default ConfigurableItems;
