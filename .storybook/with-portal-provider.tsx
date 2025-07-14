import { Decorator } from "@storybook/react-vite";
import React from "react";
import PortalContext from "../src/components/portal/__internal__/portal.context";
import isChromatic from "./isChromatic";

const withPortalProvider: Decorator = (Story, context) => {
  return (
    <PortalContext.Provider value={{ renderInRoot: isChromatic() }}>
      <Story {...context} />
    </PortalContext.Provider>
  );
};
export default withPortalProvider;
