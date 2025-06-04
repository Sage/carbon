import React from "react";
import { ThemeProvider } from "styled-components";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { sageTheme } from "../../style/themes";
import type { ThemeObject } from "../../style/themes";
import NewValidationContext, {
  NewValidationContextProps,
} from "./__internal__/new-validation.context";
import TopModalProvider from "./__internal__/top-modal-provider.component";
import "@sage/design-tokens-fusion/css/product/all.css";
// import "../../style/global.css";

type Modes = "dark" | "light" | "system";
type ProductContexts = "small" | "large";

export interface CarbonProviderProps extends NewValidationContextProps {
  /* Content for the provider to wrap */
  children: React.ReactNode;
  /** Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. */
  theme?: Partial<ThemeObject>;

  mode?: Modes;
  /** Product context for the provider to wrap */
  productContext?: ProductContexts;
}

export const CarbonProvider = ({
  children,
  theme = sageTheme,
  validationRedesignOptIn = false,
  // mode = "light",
  // productContext = "small",
}: CarbonProviderProps) => {
  // const currentMode = React.useRef<Modes | null>(null);
  // const currentProductContext = React.useRef<ProductContexts | null>(null);
  const [mode, setMode] = React.useState<Modes>("light");
  const [productContext, setProductContext] =
    React.useState<ProductContexts>("small");
  // React.useEffect(() => {
  //   if (currentMode.current !== mode) {
  //     document.body.classList.remove("mode-dark", "mode-light");
  //     document.body.classList.add(`mode-${mode}`);
  //     currentMode.current = mode;
  //   }

  //   if (currentProductContext.current !== productContext) {
  //     document.body.classList.remove("product-small", "product-large");
  //     document.body.classList.add(`product-${productContext}`);
  //     currentProductContext.current = productContext;
  //   }
  // }, [mode, productContext]);

  const handleModeChangeClick = (newMode: Modes) => {
    if (mode === newMode) {
      return;
    }

    setMode(newMode);
  };

  const handleProductContextChangeClick = (
    newProductContext: ProductContexts,
  ) => {
    if (productContext === newProductContext) {
      return;
    }

    setProductContext(newProductContext);
  };

  React.useLayoutEffect(() => {
    document.body.classList.remove("mode-dark", "mode-light");
    document.body.classList.add(`mode-${mode}`);
  }, [mode]);

  React.useLayoutEffect(() => {
    document.body.classList.remove("product-small", "product-large");
    document.body.classList.add(`product-${productContext}`);
  }, [productContext]);

  return (
    <ThemeProvider theme={theme}>
      <button type="button" onClick={() => handleModeChangeClick("light")}>
        Light Mode
      </button>
      <button type="button" onClick={() => handleModeChangeClick("dark")}>
        Dark Mode
      </button>
      <button
        type="button"
        onClick={() => handleProductContextChangeClick("small")}
      >
        Small Product
      </button>
      <button
        type="button"
        onClick={() => handleProductContextChangeClick("large")}
      >
        Large Product
      </button>
      <CarbonScopedTokensProvider>
        <NewValidationContext.Provider
          value={{
            validationRedesignOptIn,
          }}
        >
          <TopModalProvider>{children}</TopModalProvider>
        </NewValidationContext.Provider>
      </CarbonScopedTokensProvider>
    </ThemeProvider>
  );
};

export default CarbonProvider;

// maybe we can't memoize Gloabla styles loading in sb?
