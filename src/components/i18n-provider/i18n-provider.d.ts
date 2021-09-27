import * as React from "react";

import Locale from "../../locales";

export interface I18nProviderProps {
  locale: Partial<Locale>;
  children: React.ReactNode;
}

declare const I18nProvider: React.FunctionComponent<I18nProviderProps>;
export default I18nProvider;
