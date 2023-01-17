import { MarginProps } from "styled-system";

export interface ProgressTrackerProps extends MarginProps {
  /** Specifies an aria-label to the component */
  "aria-label"?: string;
  /** Specifies the aria-describedby for the component */
  "aria-describedby"?: string;
  /** The value of progress to be read out to the user. */
  "aria-valuenow"?: number;
  /** The minimum value of the progress tracker */
  "aria-valuemin"?: number;
  /** The maximum value of the progress tracker */
  "aria-valueMax"?: number;
  /** Prop to define the human readable text alternative of aria-valuenow
   * if aria-valuenow is not a number */
  "aria-valuetext"?: string;
  /** Size of the progressBar. */
  size?: "small" | "medium" | "large";
  /** Length of the progress bar, any valid css string. */
  length?: string;
  /** Current progress (percentage). */
  progress?: number;
  /** Flag to control whether the default value labels (as percentages) should be rendered. */
  showDefaultLabels?: boolean;
  /** Value to display as current progress. */
  currentProgressLabel?: string;
  /** Value to display as the maximum progress limit. */
  maxProgressLabel?: string;
  /**
   * The position the value label are rendered in.
   * Top/bottom apply to horizontal and left/right to vertical orientation.
   */
  labelsPosition?: "top" | "bottom";
  /** Value of the preposition defined between Value1 and Value2 on the label. */
  customValuePreposition?: string;
}

declare function ProgressTracker(props: ProgressTrackerProps): JSX.Element;

export default ProgressTracker;
