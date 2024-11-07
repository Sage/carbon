import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

import { sageTheme } from "../../style/themes";
import type { ThemeObject } from "../../style/themes";
import NewValidationContext, {
  NewValidationContextProps,
} from "./__internal__/new-validation.context";
import TopModalProvider from "./__internal__/top-modal-provider.component";
import Logger from "../../__internal__/utils/logger";

export interface CarbonProviderProps extends NewValidationContextProps {
  /* Content for the provider to wrap */
  children: React.ReactNode;
  /** Theme which specifies styles to apply to all child components. Set to `sageTheme` by default. */
  theme?: Partial<ThemeObject>;
}

let deprecatedRoundedCornersOptOut = false;
let deprecatedFocusRedesignOptOut = false;

export const CarbonProvider = ({
  children,
  theme = sageTheme,
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

  if (!deprecatedRoundedCornersOptOut && roundedCornersOptOutValue) {
    deprecatedRoundedCornersOptOut = true;
    Logger.deprecate(
      "The `roundedCornersOptOut` feature flag has been deprecated and will soon be removed. " +
        "Along with this feature flag, the legacy pre-rounded corners styling will also be removed. ",
    );
  }

  if (!deprecatedFocusRedesignOptOut && focusRedesignOptOutValue) {
    deprecatedFocusRedesignOptOut = true;
    Logger.deprecate(
      "The `focusRedesignOptOut` feature flag has been deprecated and will soon be removed. " +
        "Along with this feature flag, the legacy focus styling will also be removed. ",
    );
  }

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
          <TopModalProvider>{children}</TopModalProvider>
        </NewValidationContext.Provider>
      </CarbonScopedTokensProvider>
    </ThemeProvider>
  );
};

export default CarbonProvider;
