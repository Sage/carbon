export type Variants = "default" | "negative" | "neutral";

export interface StyledLinkProps {
  /** Disables the link visually and functionally. */
  disabled?: boolean;
  /** Determines the alignment of the icon relative to the link content. */
  iconAlign?: "left" | "right";
  /** Applies accessibility styles used for skip links (e.g., "Skip to content"). */
  isSkipLink?: boolean;
  /** Adjusts the color theme for rendering on a dark background. */
  isDarkBackground?: boolean;
  /** Defines the visual variant of the link (e.g., "default", "negative", "neutral"). */
  variant?: Variants;
  /** Indicates whether the link currently has keyboard focus. */
  hasFocus?: boolean;
  /** Indicates whether the link has visible textual or icon content. */
  hasContent: boolean;
  /** Applies styling specific to links used inside a MenuItem. */
  isMenuItem?: boolean;
  /** Constrains the maximum width of the link; applies ellipsis to overflowing text. */
  maxWidth?: string;
}
