const isSingular = (count) =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

export default {
  locale: () => "en-GB",
  actions: {
    edit: () => "Edit",
    delete: () => "Delete",
  },
  actionPopover: {
    ariaLabel: () => "actions",
  },
  batchSelection: {
    selected: (count) => `${count} selected`,
  },
  confirm: {
    no: () => "No",
    yes: () => "Yes",
  },
  date: {
    formats: {
      inputs: () => [
        "DDMMYYYY",
        "DDMMYY",
        "DD/MM/YYYY",
        "DD/MM/YY",
        "MMDDYYYY",
        "MMDDYY",
        "MM/DD/YYYY",
        "MM/DD/YY",
        "DDMMM",
        "DD/MMM",
        "DDMM",
        "DD/MM",
        "YYYYMMDD",
        "YYYY/MM/DD",
        "D/MM/YYYY",
        "D/M/YYYY",
        "D/MM/YY",
        "D/M/YY",
        "DD/M/YYYY",
        "DD/M/YY",
        "DD/M/YY",
        "D/MMM/YYYY",
        "DD/MMM/YYYY",
        "DD/MMM/YY",
        "D/MMMM/YYYY",
        "DD/MMMM/YYYY",
        "DD/MMMM/YY",
        "MMM/YYYY",
        "MMM/YY",
        "MMMM/YYYY",
        "MMMM/YY",
        "Do/MMM/YYYY",
        "Do/MMM/YY",
        "Do/M/YYYY",
        "Do/M/YY",
        "Do/MM/YYYY",
        "Do/MM/YY",
        "Do/MMMM/YYYY",
        "Do/MMMM/YY",
        "MMMM/Do/YYYY",
        "MMMM/Do/YY",
        "MMMM/Do",
        "MMM/Do/YYYY",
        "MMM/Do/YY",
        "MMM/Do",
        "Do/MMM",
        "D/MMM",
        "D/MM",
        "D/M",
        "Do/MMMM",
        "Do/MM",
        "Do/M",
        "D/MMMM",
        "DD/MMMM",
        "DD/MMM",
        "DD/M",
        "MMM",
        "MMMM",
        "DD",
        "Do",
        "D",
      ],
      javascript: () => "DD/MM/YYYY",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const errorPlural = isSingular(errors) ? "error" : "errors";
          const warningPlural = isSingular(warnings) ? "warning" : "warnings";
          const isErrorPlural = isSingular(errors) && !warnings ? "is" : "are";
          const isWarningPlural = isSingular(warnings) ? "is" : "are";

          if (errors && warnings && type === "warnings") {
            return ["and", `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return [`There ${isErrorPlural}`, `${errors} ${errorPlural}`];
          }
          if (warnings) {
            return [`There ${isWarningPlural}`, `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  message: {
    closeButtonAriaLabel: () => "Close",
  },
  numeralDate: {
    validation: {
      day: () => "Day should be a number within a 1-31 range.",
      month: () => "Month should be a number within a 1-12 range.",
      year: () => "Year should be a number within a 1800-2200 range.",
    },
  },
  pager: {
    show: () => "Show",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "item" : "items";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "First",
    last: () => "Last",
    next: () => "Next",
    previous: () => "Previous",
    pageX: () => "Page",
    ofY: (count) => `of ${count}`,
  },
  select: {
    actionButtonText: () => "Add New Item",
    placeholder: () => "Please Select...",
    noResultsForTerm: (term) => `No results for "${term}"`,
  },
  switch: {
    on: () => "ON",
    off: () => "OFF",
  },
  textEditor: {
    tooltipMessages: {
      bold: () => "Bold",
      italic: () => "Italic",
      bulletList: () => "Bulleted List",
      numberList: () => "Numbered List",
    },
    ariaLabels: {
      bold: () => "bold",
      italic: () => "italic",
      bulletList: () => "bullet-list",
      numberList: () => "number-list",
    },
  },
  tileSelect: {
    deselect: () => "Deselect",
  },
  wizards: {
    multiStep: {
      buttons: {
        submit: () => "Submit",
        next: () => "Next",
        back: () => "Back",
      },
    },
  },
};
