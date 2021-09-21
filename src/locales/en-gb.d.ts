interface enGB {
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
      inputs: () => string[];
      javascript: () => string;
    };
  };
  errors: {
    messages: {
      formSummary: (
        errors: number | string,
        warnings: number | string,
        type: string
      ) => [string, string] | null;
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
    ofY: (count: number | string) => string;
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
  wizards: {
    multiStep: {
      buttons: {
        submit: () => string;
        next: () => string;
        back: () => string;
      };
    };
  };
}

export default enGB;
