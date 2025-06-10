import React from "react";
import FusionTokensWrapper, {
  FusionTokenWrapperProps,
} from "../../src/components/fusion-tokens-wrapper";
import CarbonProvider, {
  CarbonProviderProps,
} from "../../src/components/carbon-provider";

export default ({
  children,
  mode,
  screenSize,
  theme,
  validationRedesignOptIn,
}: FusionTokenWrapperProps & CarbonProviderProps) => (
  <FusionTokensWrapper mode={mode} screenSize={screenSize}>
    <CarbonProvider
      theme={theme}
      validationRedesignOptIn={validationRedesignOptIn}
    >
      {children}
    </CarbonProvider>
  </FusionTokensWrapper>
);
