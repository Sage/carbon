import React, { createContext } from "react";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { ThemeObject } from "../../style/themes/base";

export interface CarbonProviderProps {
  theme?: Partial<ThemeObject>;
  children: React.ReactNode;
  validationRedesignOptIn?: boolean;
}

export const NewValidationContext = createContext<
  Pick<CarbonProviderProps, "validationRedesignOptIn">
>({});

export const CarbonProvider = ({
  children,
  theme = mintTheme,
  validationRedesignOptIn = false,
}: CarbonProviderProps) => (
  <ThemeProvider theme={theme}>
    <CarbonScopedTokensProvider>
      <NewValidationContext.Provider value={{ validationRedesignOptIn }}>
        {children}
      </NewValidationContext.Provider>
    </CarbonScopedTokensProvider>
  </ThemeProvider>
);

export default CarbonProvider;
