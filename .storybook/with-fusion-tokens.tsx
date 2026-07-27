import React from "react";
import { Decorator } from "@storybook/react";
import TokensWrapper from "./tokens-wrapper-demo";

const withFusionTokens: Decorator = (Story, context) => (
  <TokensWrapper
    modeOverride={context.globals.mode}
    allowOverrides={context.globals["override-tokens"] === "on"}
  >
    <Story {...context} />
  </TokensWrapper>
);

export default withFusionTokens;
