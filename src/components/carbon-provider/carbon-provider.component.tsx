import React from "react";
import { ThemeProvider } from "styled-components";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { sageTheme } from "../../style/themes";
import type { ThemeObject } from "../../style/themes";
import NewValidationContext, {
  NewValidationContextProps,
} from "./__internal__/new-validation.context";
import TopModalProvider from "./__internal__/top-modal-provider.component";

export interface CarbonProviderProps extends NewValidationContextProps {
  /* Content for the provider to wrap */
  children: React.ReactNode;
  /** Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. */
  theme?: Partial<ThemeObject>;
}

const CarbonProvider = ({
  children,
  theme = sageTheme,
  validationRedesignOptIn = false,
}: CarbonProviderProps) => (
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
);

export default CarbonProvider;
