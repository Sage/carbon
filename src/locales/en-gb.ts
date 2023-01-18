import Locale from "./locale";
import { enGB as enGBDateLocale } from "./date-fns-locales";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const enGB: Locale = {
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
    dateFnsLocale: () => enGBDateLocale,
  },
  dialog: {
    ariaLabels: {
      close: () => "Close",
    },
  },
  dialogFullScreen: {
    ariaLabels: {
      close: () => "Close",
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

          if (errors && warnings && type === "warning") {
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
  heading: {
    backLinkAriaLabel: () => "Back",
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
  progressTracker: {
    of: () => "of",
  },
  pod: {
    undo: () => "Undo",
  },
  select: {
    actionButtonText: () => "Add New Item",
    placeholder: () => "Please Select...",
    noResultsForTerm: (term) => `No results for "${term}"`,
  },
  link: {
    skipLinkLabel: () => "Skip to main content",
  },
  sidebar: {
    ariaLabels: {
      close: () => "Close",
    },
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
  toast: {
    ariaLabels: {
      close: () => "Close",
    },
  },
};

export default enGB;
