import * as React from "react";

import { ThemeObject } from "../../style/themes/base";

export interface CarbonProviderProps {
  theme?: ThemeObject;
  children: React.ReactNode;
  validationRedesignOptIn?: boolean;
}

declare function CarbonProvider(props: CarbonProviderProps): JSX.Element;
export default CarbonProvider;
