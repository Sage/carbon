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
  advancedColorPicker: {
    ariaLabel: () => string;
    currentColorDescriptionTerm: (currentColor: string) => string;
    currentColorAssigned: (currentColor: string) => string;
  };
  batchSelection: {
    selected: (count: number | string) => string;
  };
  breadcrumbs: {
    ariaLabel: () => string;
  };
  characterCount: {
    tooManyCharacters: (count: number, formattedCount: string) => string;
    charactersLeft: (count: number, formattedCount: string) => string;
    visuallyHiddenHint: (formattedCount: string) => string;
  };
  confirm: {
    no: () => string;
    yes: () => string;
  };
  date: {
    dateFnsLocale: () => DateFnsLocale;
    ariaLabels: {
      previousMonthButton: () => string;
      nextMonthButton: () => string;
    };
    dateFormatOverride?: string;
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
  dismissibleBox: {
    ariaLabels: {
      close: () => string;
    };
  };
  errors: {
    messages: {
      formSummary: (
        errors: number,
        warnings: number,
        type: string,
      ) => [string, string] | null;
    };
  };
  fileInput: {
    dragAndDrop: () => string;
    selectFile: () => string;
    fileUploadStatus: () => string;
    actions: {
      cancel: () => string;
      clear: () => string;
      delete: () => string;
    };
  };
  heading: {
    backLinkAriaLabel: () => string;
  };
  label: {
    optional: () => string;
  };
  link: {
    skipLinkLabel: () => string;
  };
  loader: {
    loading: () => string;
  };
  loaderSpinner: {
    loading: () => string;
  };
  loaderStar: {
    loading: () => string;
  };
  menuFullscreen: {
    ariaLabels: {
      closeButton: () => string;
    };
  };
  message: {
    closeButtonAriaLabel: () => string;
    error: () => string;
    info: () => string;
    success: () => string;
    warning: () => string;
    neutral: () => string;
    ai: () => string;
  };
  numeralDate: {
    validation: {
      day: (month?: string, daysInMonth?: string) => string;
      month: () => string;
      year: () => string;
    };
    labels: {
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
  password: {
    ariaLiveShownMessage: () => string;
    ariaLiveHiddenMessage: () => string;
  };
  progressTracker: {
    of: () => string;
  };
  pod: {
    undo: () => string;
  };
  textEditor: {
    boldAria: () => string;
    cancelButton: () => string;
    cancelButtonAria: () => string;
    characterCounter: (count: number | string) => string;
    characterLimit: (count: number) => string;
    contentEditorAria: () => string;
    italicAria: () => string;
    orderedListAria: () => string;
    saveButton: () => string;
    saveButtonAria: () => string;
    toolbarAriaLabel: () => string;
    unorderedListAria: () => string;
  };
  search: {
    searchButtonText: () => string;
  };
  select: {
    actionButtonText: () => string;
    placeholder: () => string;
    noResultsForTerm: (term: string) => string;
  };
  sidebar: {
    ariaLabels: {
      close: () => string;
    };
  };
  sort: {
    accessibleName: (
      sortContent?: string,
      sortType?: "ascending" | "descending",
    ) => string;
  };
  splitButton: {
    ariaLabel: () => string;
  };
  stepFlow: {
    stepLabel: (currentStep: number, totalSteps: number) => string;
    screenReaderOnlyTitle: (
      title: string,
      currentStep: number,
      totalSteps: number,
      category?: string,
    ) => string;
    closeIconAriaLabel?: () => string;
  };
  switch: {
    on: () => string;
    off: () => string;
  };
  tileSelect: {
    deselect: () => string;
  };
  time: {
    amText: () => string;
    pmText: () => string;
    hoursLabelText: () => string;
    minutesLabelText: () => string;
    hoursAriaLabelText: () => string;
    minutesAriaLabelText: () => string;
  };
  toast: {
    ariaLabels: {
      close: () => string;
    };
    error: () => string;
    info: () => string;
    success: () => string;
    warning: () => string;
    neutral: () => string;
    notification: () => string;
  };
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => string;
    };
  };
}

export default Locale;
