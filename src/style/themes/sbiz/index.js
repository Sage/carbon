import designTokens from "./theme.tokens"; // eventually imported from @sage/design-tokens
import mintTheme from "../mint";

export default {
  /**
   * @deprecated
   */
  ...mintTheme, // for backwards compatibility
  ...designTokens,
  name: "sbiz",
};
