import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { mintTheme } from "../../style/themes";
import type { ThemeObject } from "../../style/themes";

import { TopModalContextProvider } from "./top-modal-context";

export interface CarbonProviderProps {
  /* Content for the provider to wrap */
  children: React.ReactNode;
  /** Theme which specifies styles to apply to all child components. Set to `mintTheme` by default for legacy support. */
  theme?: Partial<ThemeObject>;
  /** Feature flag for opting in to the latest validation designs for components that support it.
   *
   * NOTE - Will eventually be set to `true` by default in the future. */
  validationRedesignOptIn?: boolean;
  /** Feature flag for opting out of styling components to have rounded corners.
   *
   * NOTE - Will eventually be set to `false` by default in the future. */
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
  const focusRedesignOptOutValue =
    existingFocusRedesignOptOut || focusRedesignOptOut;
  return (
    <ThemeProvider
      theme={{
        ...theme,
        roundedCornersOptOut: roundedCornersOptOutValue,
        focusRedesignOptOut: focusRedesignOptOutValue,
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
