import React from "react";
import PropTypes from "prop-types";
import Context from "../../__internal__/I18nContext";

const I18nProvider = ({ t, children }) => (
  <Context.Provider value={t}>{children}</Context.Provider>
);

I18nProvider.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default I18nProvider;
