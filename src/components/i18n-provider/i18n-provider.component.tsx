import React from "react";
import merge from "lodash/merge";
import { Expand } from "../../__internal__/utils/helpers/types";
import Context from "../../__internal__/i18n-context";
import enGB from "../../locales/en-gb";
import Locale from "../../locales";

export interface I18nProviderProps {
  locale?: Expand<Partial<Locale>>;
  children: React.ReactNode;
}

export const I18nProvider = ({ locale, children }: I18nProviderProps) =>
  locale ? (
    <Context.Provider value={merge({}, enGB, locale)}>
      {children}
    </Context.Provider>
  ) : (
    <>{children}</>
  );

export default I18nProvider;
