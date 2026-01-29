import { createGlobalStyle } from "styled-components";
import {
  TAB_GUARD_TOP,
  TAB_GUARD_BOTTOM,
} from "../__internal__/focus-trap/focus-trap.component";
import { baseTheme } from "./themes";

const GlobalStyle = createGlobalStyle`
  body {
    color: rgba(0, 0, 0, 0.9);
    font-family: "Sage UI", sans-serif;
    font-size: 14px;
    margin: 0px;
    padding: 0px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  h1, .h1 { font-size: 24px; font-weight: 700; line-height: 32px; }
  h2, .h2 { font-size: 22px; font-weight: 500; margin-bottom: 26px; }
  h3, .h3 { font-size: 20px; font-weight: 500; margin-bottom: 24px; }
  h4, .h4 { font-size: 18px; font-weight: 500; margin-bottom: 22px; }
  h5, .h5 { font-size: 16px; font-weight: 500; margin-bottom: 20px; }
  h6, .h6 { font-size: 14px; font-weight: 500; margin-bottom: 18px; }

  [data-element=${TAB_GUARD_TOP}], [data-element=${TAB_GUARD_BOTTOM}] {
    position: fixed;
  }

  body:has(.adaptive-sidebar-modal-view) {
  --adaptiveSidebarModalBackdrop: ${baseTheme.zIndex.overlay};
  }
`;

export default GlobalStyle;
