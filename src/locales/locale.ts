import { Locale as DateFnsLocale } from "date-fns";

interface Locale {
  locale: () => string;
  actions: {
    edit: () => string;
    delete: () => string;
  };
  actionPopover: {
    ariaLabel: () => string;
  };
  batchSelection: {
    selected: (count: number | string) => string;
  };
  confirm: {
    no: () => string;
    yes: () => string;
  };
  date: {
    dateFnsLocale: () => DateFnsLocale;
  };
  dialog: {
    ariaLabels: {
      close: () => string;
    };
  };
  dialogFullScreen: {
    ariaLabels: {
      close: () => string;
    };
  };
  errors: {
    messages: {
      formSummary: (
        errors: number,
        warnings: number,
        type: string
      ) => [string, string] | null;
    };
  };
  heading: {
    backLinkAriaLabel: () => string;
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
    records: (count: number | string, showNumber?: boolean) => string;
    first: () => string;
    last: () => string;
    next: () => string;
    previous: () => string;
    pageX: () => string;
    ofY: (count: string | number) => string;
  };
  progressTracker: {
    of: () => string;
  };
  select: {
    actionButtonText: () => string;
    placeholder: () => string;
    noResultsForTerm: (term: string) => string;
  };
  link: {
    skipLinkLabel: () => string;
  };
  sidebar: {
    ariaLabels: {
      close: () => string;
    };
  };
  switch: {
    on: () => string;
    off: () => string;
  };
  textEditor: {
    tooltipMessages: {
      bold: () => string;
      italic: () => string;
      bulletList: () => string;
      numberList: () => string;
    };
    ariaLabels: {
      bold: () => string;
      italic: () => string;
      bulletList: () => string;
      numberList: () => string;
    };
  };
  tileSelect: {
    deselect: () => string;
  };
  toast: {
    ariaLabels: {
      close: () => string;
    };
  };
}

export default Locale;
