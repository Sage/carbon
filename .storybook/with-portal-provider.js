import { PortalContext } from "../src/components/portal/portal";
import isChromatic from "./isChromatic";

export const withPortalProvider = (Story, context) => {
  return (
    <PortalContext.Provider value={{ renderInRoot: isChromatic() }}>
      <Story {...context} />
    </PortalContext.Provider>
  );
};
