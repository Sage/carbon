import React from "react";
import { Decorator } from "@storybook/react";
import TokensWrapper from "./tokens-wrapper-demo";

const withFusionTokens: Decorator = (Story, context) => (
  <TokensWrapper>
    <Story {...context} />
  </TokensWrapper>
);

export default withFusionTokens;
