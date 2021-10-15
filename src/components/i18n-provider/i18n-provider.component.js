import React from "react";
import merge from "lodash/merge";
import PropTypes from "prop-types";
import Context from "../../__internal__/i18n-context";
import enGB from "../../locales/en-gb";

const I18nProvider = ({ locale, children }) =>
  locale ? (
    <Context.Provider value={merge({}, enGB, locale)}>
      {children}
    </Context.Provider>
  ) : (
    children
  );

I18nProvider.defaultProps = {
  locale: undefined,
};

I18nProvider.propTypes = {
  locale: PropTypes.shape({
    locale: PropTypes.func,
    actions: PropTypes.shape({
      edit: PropTypes.func,
      delete: PropTypes.func,
      reset: PropTypes.func,
    }),
    actionPopover: PropTypes.shape({
      ariaLabel: PropTypes.func,
    }),
    batchSelection: PropTypes.shape({
      selected: PropTypes.func,
    }),
    confirm: PropTypes.shape({
      no: PropTypes.func,
      yes: PropTypes.func,
    }),
    date: PropTypes.shape({
      formats: PropTypes.shape({
        inputs: PropTypes.func,
        javascript: PropTypes.func,
      }),
    }),
    errors: PropTypes.shape({
      messages: PropTypes.shape({
        formSummary: PropTypes.func,
      }),
    }),
    message: PropTypes.shape({
      closeButtonAriaLabel: PropTypes.func,
    }),
    numeralDate: PropTypes.shape({
      validation: PropTypes.shape({
        day: PropTypes.func,
        month: PropTypes.func,
        year: PropTypes.func,
      }),
    }),
    pager: PropTypes.shape({
      show: PropTypes.func,
      records: PropTypes.func,
      first: PropTypes.func,
      last: PropTypes.func,
      next: PropTypes.func,
      previous: PropTypes.func,
      pageX: PropTypes.func,
      ofY: PropTypes.func,
    }),
    select: PropTypes.shape({
      actionButtonText: PropTypes.func,
      placeholder: PropTypes.func,
      noResultsForTerm: PropTypes.func,
    }),
    switch: PropTypes.shape({
      on: PropTypes.func,
      off: PropTypes.func,
    }),
    table: PropTypes.shape({
      noData: PropTypes.func,
    }),
    textEditor: PropTypes.shape({
      tooltipMessages: PropTypes.shape({
        bold: PropTypes.func,
        italic: PropTypes.func,
        bulletList: PropTypes.func,
        numberList: PropTypes.func,
      }),
      ariaLabels: PropTypes.shape({
        bold: PropTypes.func,
        italic: PropTypes.func,
        bulletList: PropTypes.func,
        numberList: PropTypes.func,
      }),
    }),
    titleSelect: PropTypes.shape({
      deselect: PropTypes.func,
    }),
    wizards: PropTypes.shape({
      multiStep: PropTypes.shape({
        buttons: PropTypes.shape({
          submit: PropTypes.func,
          next: PropTypes.func,
          back: PropTypes.func,
        }),
      }),
    }),
  }),
  children: PropTypes.node.isRequired,
};

export default I18nProvider;
