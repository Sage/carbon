import React from "react";
import { Decorator } from "@storybook/react";
import TokensWrapper from "./tokens-wrapper-demo";

const withFusionTokens: Decorator = (Story, context) => (
  <TokensWrapper modeOverride={context.globals.mode}>
    <Story {...context} />
  </TokensWrapper>
);

export default withFusionTokens;
