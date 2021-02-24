import { createContext } from "react";

export default createContext(() => {
  throw new Error("No I18nProvider exists.");
});
