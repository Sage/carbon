import { createGlobalStyle } from "styled-components";
import {
  TAB_GUARD_TOP,
  TAB_GUARD_BOTTOM,
} from "../__internal__/focus-trap/focus-trap.component";

const GlobalStyle = createGlobalStyle`
  :root {
    --carbon-global-styles-loaded: true;

    --background-light: var(--modes-color-custom-default-alt-light);
    --foreground-light: var(--modes-color-colorcode-blue-deep-light);
    --background-dark: var(--modes-color-colorcode-blue-muted-dark);
    --foreground-dark: var(--modes-color-custom-default-alt-dark);
  }

  /* .theme-high-contrast {
    --background-light: red;
    --foreground-light: #000000;
  }


  .theme-high-contrast {
    --background-dark: #000000;
    --foreground-dark: red;
  } */


  .product-small {
    --product-font-size: 14px;
  }


  .product-large {
    --product-font-size: 20px;
  }

  *:not(button) {
    background-color: var(--global-background-color) !important;
    color: var(--global-foreground-color) !important;
    font-size: var(--font-size) !important;
  }

  .mode-dark,
  .dark {
    color-scheme: only dark;
  }

  .mode-light,
  .light {
    color-scheme: only light;
  }

  body {
    color: rgba(0, 0, 0, 0.9);
    font-family: "Sage UI", sans-serif;
    font-size: 14px;
    margin: 0px;
    padding: 0px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    /* set on the body for the switching to work */
    --global-background-color: light-dark(var(--background-light), var(--background-dark));
    --global-foreground-color: light-dark(var(--foreground-light), var(--foreground-dark));
    --global-container-size: 100%; /* Mobile size */
    --font-size: calc(var(--product-font-size, 12px) - 2px);
    
    @media only screen and (min-width: 600px) {
      --global-container-size: 50%; /* desktop size */
      --font-size: var(--product-font-size, 12px);
    }
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
`;

export default GlobalStyle;
