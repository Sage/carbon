import React from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import I18nProvider from "../../../src/components/I18nProvider";
import en from "./en.json";
import fr from "./fr.json";

const match = window.location.href.match(/locale=(.[^&]*)/);
const locale = match ? match[1] : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      app: en,
    },
    fr: {
      carbon: fr,
    },
  },
  lng: locale,
  ns: ["app"],
  interpolation: {
    escapeValue: false,
  },
});

const I18next = ({ children }) => {
  const { t } = useTranslation("carbon");

  return <I18nProvider t={t}>{children}</I18nProvider>;
};

export default I18next;
