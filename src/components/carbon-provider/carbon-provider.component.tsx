import React, { createContext } from "react";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { ThemeObject } from "../../style/themes/base";

import { TopModalContextProvider } from "./top-modal-context";

export interface CarbonProviderProps {
  theme?: Partial<ThemeObject>;
  children: React.ReactNode;
  validationRedesignOptIn?: boolean;
  roundedCornersOptOut?: boolean;
}

export const NewValidationContext = createContext<
  Pick<CarbonProviderProps, "validationRedesignOptIn" | "roundedCornersOptOut">
>({});

export const CarbonProvider = ({
  children,
  theme = mintTheme,
  validationRedesignOptIn = false,
  roundedCornersOptOut = false,
}: CarbonProviderProps) => (
  <ThemeProvider theme={theme}>
    <CarbonScopedTokensProvider roundedCornersOptOut={roundedCornersOptOut}>
      <NewValidationContext.Provider
        value={{ validationRedesignOptIn, roundedCornersOptOut }}
      >
        <TopModalContextProvider>{children}</TopModalContextProvider>
      </NewValidationContext.Provider>
    </CarbonScopedTokensProvider>
  </ThemeProvider>
);

export default CarbonProvider;
