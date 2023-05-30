import React, { createContext, useContext } from "react";
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
  focusRedesignOptOut?: boolean;
}

export const NewValidationContext = createContext<
  Pick<
    CarbonProviderProps,
    "validationRedesignOptIn" | "roundedCornersOptOut" | "focusRedesignOptOut"
  >
>({});

export const CarbonProvider = ({
  children,
  theme = mintTheme,
  validationRedesignOptIn = false,
  roundedCornersOptOut = false,
  focusRedesignOptOut = false,
}: CarbonProviderProps) => {
  const {
    roundedCornersOptOut: existingRoundedCornersOptOut,
    focusRedesignOptOut: existingFocusRedesignOptOut,
  } = useContext(NewValidationContext);

  const roundedCornersOptOutValue =
    existingRoundedCornersOptOut || roundedCornersOptOut;
  const focusRedisignOptOutValue =
    existingFocusRedesignOptOut || focusRedesignOptOut;

  return (
    <ThemeProvider
      theme={{
        ...theme,
        focusRedesignOptOut: focusRedisignOptOutValue,
        roundedCornersOptOut: roundedCornersOptOutValue,
      }}
    >
      <CarbonScopedTokensProvider>
        <NewValidationContext.Provider
          value={{
            validationRedesignOptIn,
            roundedCornersOptOut: roundedCornersOptOutValue,
          }}
        >
          <TopModalContextProvider>{children}</TopModalContextProvider>
        </NewValidationContext.Provider>
      </CarbonScopedTokensProvider>
    </ThemeProvider>
  );
};

export default CarbonProvider;
