import * as React from "react";

export interface ConfigurableItemRowProps {
  /** A custom class name for the component. */
  className?: string;
  /** The checked value for the checkbox. */
  enabled?: boolean;
  /** The disabled value for the checkbox. */
  locked?: boolean;
  /** The label for the row. */
  name?: string;
  /** Callback triggered when the checkbox checked value is updated. */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The unique index for the row. */
  rowIndex: number;
  /** An internal prop. Helpful to detect which component should be rendered */
  theme?: object;
}

declare function ConfigurableItemRow(props: ConfigurableItemRowProps): JSX.Element;

export { ConfigurableItemRow as ConfigurableItemRowWithoutHOC };
export default ConfigurableItemRow;
