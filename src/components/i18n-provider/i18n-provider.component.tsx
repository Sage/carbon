import React from "react";
import merge from "lodash/merge";
import Context from "../../__internal__/i18n-context";
import enGB from "../../locales/en-gb";
import Locale from "../../locales";

export interface I18nProviderProps {
  locale?: Partial<Locale>;
  children: React.ReactNode;
}

const I18nProvider = ({ locale, children }: I18nProviderProps) =>
  locale ? (
    <Context.Provider value={merge({}, enGB, locale)}>
      {children}
    </Context.Provider>
  ) : (
    <>{children}</>
  );

export default I18nProvider;
