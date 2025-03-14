import React from "react";
import { ThemeProvider } from "styled-components";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { sageTheme } from "../../style/themes";
import type { ThemeObject } from "../../style/themes";
import NewValidationContext, {
  NewValidationContextProps,
} from "./__internal__/new-validation.context";
import TopModalProvider from "./__internal__/top-modal-provider.component";
import StyleSheetManager from "../../__internal__/style-sheet-manager";

export interface CarbonProviderProps extends NewValidationContextProps {
  /* Content for the provider to wrap */
  children: React.ReactNode;
  /** Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. */
  theme?: Partial<ThemeObject>;
}

export const CarbonProvider = ({
  children,
  theme = sageTheme,
  validationRedesignOptIn = false,
}: CarbonProviderProps) => (
  <StyleSheetManager>
    <ThemeProvider theme={theme}>
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
  </StyleSheetManager>
);

export default CarbonProvider;
