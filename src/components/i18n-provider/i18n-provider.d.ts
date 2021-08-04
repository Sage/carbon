import * as React from "react";

export interface I18nProviderProps {
  children: React.ReactNode;
  locale: {
    locale: () => string;
    actions: {
      edit: () => string;
      delete: () => string;
      reset: () => string;
    };
    actionPopover: {
      ariaLabel: () => string;
    };
    actionToolbar: {
      selected: () => string;
    };
    batchSelection: {
      selected: (count: number | string) => string;
    };
    confirm: {
      no: () => string;
      yes: () => string;
    };
    date: {
      formats: {
        inputs: () => [string],
        javascript: () => string,
      }
    },
    errors: {
      messages: {
        formSummary: (errors: number, warnings: number, type: string) => string;
      };
    };
    message: {
      closeButtonAriaLabel: () => string;
    };
    numeralDate: {
      validation: {
        day: () => string;
        month: () => string;
        year: () => string;
      };
    };
    pager: {
      show: () => string;
      records: (count: number | string, showNumber: boolean) => string;
      first: () => string;
      last: () => string;
      next: () => string;
      previous: () => string;
      pageX: () => string;
      ofY: (count: string | number) => string;
    };
    select: {
      actionButtonText: () => string;
      placeholder: () => string;
      noResultsForTerm: (term: string) => string;
    };
    switch: {
      on: () => string;
      off: () => string;
    };
    table: {
      noData: () => string;
    };
    titleSelect: {
      deselect: () => string;
    };
    wizards: {
      multiStep: {
        buttons: {
          submit: () => string;
          next: () => string;
          back: () => string;
        };
      };
    };
  };
}

declare const I18nProvider: React.FunctionComponent<I18nProviderProps>;
export default I18nProvider;
