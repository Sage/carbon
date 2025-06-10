import React from "react";
import TokenCSSLoader from "__internal__/tokens-loader";
// import "@sage/design-tokens-fusion/css/product/all.css";
import "./global.css";

type Modes = "dark" | "light";
type ScreenSizes = "small" | "large";

export interface FusionTokenWrapperProps {
  /** Content for the wrapper to wrap */
  children: React.ReactNode;
  /** Sets colour mode to apply appropriate token set */
  mode?: Modes;
  /** Sets screen size to apply appropriate token set */
  screenSize?: ScreenSizes;
}

let tokenLoader: TokenCSSLoader | null = null;

export default ({ children, mode, screenSize }: FusionTokenWrapperProps) => {
  // const currentMode = React.useRef<Modes | null>(null);
  // const currentScreenContext = React.useRef<ScreenSizes | null>(null);
  const [colourMode, setMode] = React.useState<Modes>(mode || "light");
  const [size, setSize] = React.useState<ScreenSizes>(screenSize || "large");

  const handleModeChangeClick = (newMode: Modes) => {
    if (colourMode === newMode) {
      return;
    }

    setMode(newMode);
  };

  const handleScreenSizeChangeClick = (newSize: ScreenSizes) => {
    if (size === newSize) {
      return;
    }

    setSize(newSize);
  };

  React.useLayoutEffect(() => {
    if (!tokenLoader) {
      tokenLoader = new TokenCSSLoader("frozenproduct", "");
    }

    tokenLoader.loadTokenCSS("large", "light");

    return () => {
      // Cleanup token loader instance
      if (tokenLoader) {
        TokenCSSLoader.destroy();
        tokenLoader = null;
      }
    };
  }, []);

  React.useLayoutEffect(() => {
    document.body.classList.remove("mode-dark", "mode-light");
    document.body.classList.add(`mode-${colourMode}`);
  }, [colourMode]);

  React.useLayoutEffect(() => {
    document.body.classList.remove("screen-small", "screen-large");
    document.body.classList.add(`screen-${size}`);
  }, [size]);

  return (
    <div>
      <button type="button" onClick={() => handleModeChangeClick("light")}>
        Light Mode
      </button>
      <button type="button" onClick={() => handleModeChangeClick("dark")}>
        Dark Mode
      </button>
      <button
        type="button"
        onClick={() => handleScreenSizeChangeClick("small")}
      >
        Small screen
      </button>
      <button
        type="button"
        onClick={() => handleScreenSizeChangeClick("large")}
      >
        Large screen
      </button>

      {children}
    </div>
  );
};
