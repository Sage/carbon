import React from "react";
import merge from "lodash/merge";
import PropTypes from "prop-types";
import Context from "../../__internal__/i18n-context";
import enGB from "../../locales/en-gb";

const I18nProvider = ({ locale, children }) =>
  locale ? (
    <Context.Provider value={merge(enGB, locale)}>{children}</Context.Provider>
  ) : (
    children
  );

I18nProvider.defaultProps = {
  locale: undefined,
};

I18nProvider.propTypes = {
  locale: PropTypes.shape({
    locale: PropTypes.string,
    actions: PropTypes.shape({
      edit: PropTypes.string,
      delete: PropTypes.string,
      reset: PropTypes.string,
    }),
    actionPopover: PropTypes.shape({
      ariaLabel: PropTypes.string,
    }),
    actionToolbar: PropTypes.shape({
      selected: PropTypes.string,
    }),
    batchSelection: PropTypes.shape({
      selected: PropTypes.func,
    }),
    confirm: PropTypes.shape({
      no: PropTypes.string,
      yes: PropTypes.string,
    }),
    date: PropTypes.shape({
      formats: PropTypes.shape({
        inputs: PropTypes.arrayOf(PropTypes.string),
        javascript: PropTypes.string,
      }),
    }),
    errors: PropTypes.shape({
      messages: PropTypes.shape({
        formSummary: PropTypes.func,
      }),
    }),
    message: PropTypes.shape({
      closeButtonAriaLabel: PropTypes.string,
    }),
    numeralDate: PropTypes.shape({
      validation: PropTypes.shape({
        day: PropTypes.string,
        month: PropTypes.string,
        year: PropTypes.string,
      }),
    }),
    pager: PropTypes.shape({
      show: PropTypes.string,
      records: PropTypes.func,
      first: PropTypes.string,
      last: PropTypes.string,
      next: PropTypes.string,
      previous: PropTypes.string,
      pageX: PropTypes.string,
      ofY: PropTypes.func,
    }),
    select: PropTypes.shape({
      actionButtonText: PropTypes.string,
      placeholder: PropTypes.string,
      noResultsForTerm: PropTypes.func,
    }),
    switch: PropTypes.shape({
      on: PropTypes.string,
      off: PropTypes.string,
    }),
    table: PropTypes.shape({
      noData: PropTypes.string,
    }),
    titleSelect: PropTypes.shape({
      deselect: PropTypes.string,
    }),
    wizards: PropTypes.shape({
      multiStep: PropTypes.shape({
        buttons: PropTypes.shape({
          submit: PropTypes.string,
          next: PropTypes.string,
          back: PropTypes.string,
        }),
      }),
    }),
  }),
  children: PropTypes.node.isRequired,
};

export default I18nProvider;
