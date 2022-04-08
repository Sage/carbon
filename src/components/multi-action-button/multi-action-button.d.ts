import { SplitButtonProps } from "../split-button";

export interface MultiActionButtonProps extends SplitButtonProps {
  /** Button type: "primary" | "secondary" | "tertiary" */
  buttonType?: "primary" | "secondary" | "tertiary";
}

declare function MultiActionButton(props: MultiActionButtonProps): JSX.Element;

export default MultiActionButton;
