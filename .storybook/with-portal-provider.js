import PortalContext from "../src/components/portal/__internal__/portal.context";
import isChromatic from "./isChromatic";

export const withPortalProvider = (Story, context) => {
  return (
    <PortalContext.Provider value={{ renderInRoot: isChromatic() }}>
      <Story {...context} />
    </PortalContext.Provider>
  );
};
