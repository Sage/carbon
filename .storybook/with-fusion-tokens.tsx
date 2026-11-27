import React from "react";
import { Decorator } from "@storybook/react";
import TokensWrapper from "./tokens-wrapper-demo";

const withFusionTokens: Decorator = (Story, context) => (
  <TokensWrapper
    modernisation={
      import.meta.env.STORYBOOK_ENABLE_MODERNISATION === "true" &&
      context.globals.modernisation === "on"
    }
  >
    <Story {...context} />
  </TokensWrapper>
);

export default withFusionTokens;
