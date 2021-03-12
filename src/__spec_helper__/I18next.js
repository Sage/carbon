import React from "react";
import PropTypes from "prop-types";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import I18nProvider from "../components/I18nProvider";

i18n.use(initReactI18next).init({
  lng: "en-EN",
  fallbackLng: "en-EN",
  ns: ["app", "carbon"],
  defaultNS: "app",
  interpolation: {
    escapeValue: false,
  },
});

const I18next = ({ children, lng }) => {
  return (
    <I18nProvider t={i18n.getFixedT(lng, "carbon")}>{children}</I18nProvider>
  );
};

I18next.propTypes = {
  children: PropTypes.node.isRequired,
  lng: PropTypes.string,
};

I18next.defaultProps = {
  lng: "en",
};

export default I18next;
