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
  advancedColorPicker: {
    ariaLabel: () => "Change colour",
    currentColorDescriptionTerm: () => "Current color assigned: ",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    selected: (count) => `${count} selected`,
  },
  breadcrumbs: {
    ariaLabel: () => "breadcrumbs",
  },
  confirm: {
    no: () => "No",
    yes: () => "Yes",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} character too many`
        : `${formattedCount} characters too many`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} character left`
        : `${formattedCount} characters left`,
    visuallyHiddenHint: (formattedCount) =>
      `You can enter up to ${formattedCount} characters`,
  },
  date: {
    dateFnsLocale: () => enGBDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
    },
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
  dismissibleBox: {
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
  fileInput: {
    dragAndDrop: () => "or drag and drop your file",
    selectFile: () => "Select file",
    fileUploadStatus: () => "File upload status",
    actions: {
      cancel: () => "Cancel upload",
      clear: () => "Clear",
      delete: () => "Delete file",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Back",
  },
  link: {
    skipLinkLabel: () => "Skip to main content",
  },
  loader: {
    loading: () => "Loading",
  },
  message: {
    closeButtonAriaLabel: () => "Close",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `Day in ${month} should be a number within 1-${daysInMonth}.`;
        }
        return "Day should be a number within a 1-31 range.";
      },
      month: () => "Month should be a number within a 1-12 range.",
      year: () => "Year should be a number within a 1800-2200 range.",
    },
    labels: {
      day: () => "Day",
      month: () => "Month",
      year: () => "Year",
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
  password: {
    ariaLiveShownMessage: () =>
      "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so.",
    ariaLiveHiddenMessage: () => "Your Password is currently hidden.",
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
  sidebar: {
    ariaLabels: {
      close: () => "Close",
    },
  },
  splitButton: {
    ariaLabel: () => "Show more",
  },
  stepFlow: {
    stepLabel: (currentStep, totalSteps) =>
      `Step ${currentStep} of ${totalSteps}`,
    screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
      `${
        category ? `${category}.` : ""
      } ${title}. Step ${currentStep} of ${totalSteps}.`,
    closeIconAriaLabel: () => "Close",
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
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Hrs.",
    minutesLabelText: () => "Mins.",
    hoursAriaLabelText: () => "Hours",
    minutesAriaLabelText: () => "Minutes",
  },
  toast: {
    ariaLabels: {
      close: () => "Close",
    },
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Close",
    },
  },
};

export default enGB;
