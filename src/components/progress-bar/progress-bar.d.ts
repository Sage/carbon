import { MarginProps } from "styled-system";

export interface ProgressBarProps extends MarginProps {
  /** Size of the progressBar. */
  size?: "small" | "medium" | "large";
  /** Current progress (percentage). */
  progress: number;
  /** Value to display as current progress (shows current percentage for true) */
  value?: boolean | string;
  /** Value to display as 100% progress (shows "100%" for true) */
  maxValue?: boolean | string;
  colour?: "default" | "traffic";
}

declare function ProgressBar(props: ProgressBarProps): JSX.Element;

export default ProgressBar;
