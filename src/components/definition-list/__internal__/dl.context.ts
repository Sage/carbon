import React from "react";

export type ElementAlignment = "left" | "center" | "right";

export interface DlContextProps {
  /** Render the DefinitionList as a single column */
  asSingleColumn?: boolean;
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign?: ElementAlignment;
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign?: ElementAlignment;
}

export default React.createContext<DlContextProps>({});
