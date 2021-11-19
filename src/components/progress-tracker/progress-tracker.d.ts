import { MarginProps } from "styled-system";

export interface ProgressBarProps extends MarginProps {
  /** Size of the progressBar. */
  size?: "small" | "medium" | "large";
  /** Current progress (percentage). */
  progress?: number;
  /** Flag to control whether the default value labels (as percentages) should be rendered. */
  showDefaultLabels?: boolean;
  /** Value to display as current progress. */
  currentProgressLabel?: string;
  /** Value to display as the maximum progress limit. */
  maxProgressLabel?: string;
  /**
   * Sets the colour of the bar that shows the current progress.
   * The "traffic" variant changes the colour of status bar depending on current progress.
   * */
  variant?: "default" | "traffic";
  /** The orientation of the component. */
  orientation?: "horizontal" | "vertical";
  /** The direction the bar should move as progress increases, only applies in vertical orientation. */
  direction?: "up" | "down";
  /**
   * The position the value label are rendered in.
   * Top/bottom apply to horizontal and left/right to vertical orientation.
   */
  labelsPosition?: "top" | "bottom" | "left" | "right";
}

declare function ProgressBar(props: ProgressBarProps): JSX.Element;

export default ProgressBar;
