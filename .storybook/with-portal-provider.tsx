import { Decorator } from "@storybook/react";
import React from "react";
import { PortalContext } from "../src/components/portal/portal";
import isChromatic from "./isChromatic";

const withPortalProvider: Decorator = (Story, context) => {
  return (
    <PortalContext.Provider value={{ renderInRoot: isChromatic() }}>
      <Story {...context} />
    </PortalContext.Provider>
  );
};
export default withPortalProvider;
