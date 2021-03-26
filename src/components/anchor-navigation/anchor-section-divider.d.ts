import { StyledComponentProps } from "styled-components";

export interface AnchorSectionDividerProps {
  /** @default "anchor-navigation-divider" */
  "data-element"?: string;
  /** Allows to override existing component styles */
  styleOverride?: () => object | object;
}

declare function AnchorSectionDivider(attrs: StyledComponentProps<"div", {}, AnchorSectionDividerProps, "">): JSX.Element;

export default AnchorSectionDivider;
