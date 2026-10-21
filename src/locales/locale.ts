import { Locale as DateFnsLocale } from "date-fns";

export interface CurrentFileStatusCounts {
  totalCount: number;
  uploadingCount: number;
  completedCount: number;
  errorCount: number;
}

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
    ariaLabels: {
      close: () => string;
    };
    selected: (count: number | string, total?: number | string) => string;
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
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      openCalendarButton?: () => string;
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      chooseMonth?: () => string;
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      chooseYear?: () => string;
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      closeButton?: () => string;
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      openCalendarDescription?: () => string;
      /** Optional in locale overrides; I18nProvider supplies the en-GB fallback. */
      chooseDate?: () => string;
    };
    dateFormatOverride?: string;
  };
  decimal: {
    ariaLabels: {
      popoverTrigger: () => string;
      popoverContent: () => string;
    };
  };
  dialog: {
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
    dragAndDrop: (selectButtonText?: string, multiple?: boolean) => string;
    selectFile: (multiple?: boolean) => string;
    /**
     * @deprecated Type-only compatibility for legacy locale objects. This key
     * is unused at runtime; use `uploading`, `uploaded`, or
     * `uploadErrorDetails` for status-specific text.
     */
    fileUploadStatus?: () => string;
    requiredDescription?: () => string;
    currentFiles?: (count: number) => string;
    currentFilesErrorSummary?: (counts: CurrentFileStatusCounts) => string;
    previouslyUploadedFiles?: (count: number) => string;
    uploading?: () => string;
    uploaded?: () => string;
    uploadErrorDetails?: () => string;
    announcements?: {
      filesAdded?: (files: string[]) => string;
      uploadComplete?: (files: string[]) => string;
      fileDeleted?: (file: string) => string;
      fileRemoved?: (file: string) => string;
      uploadCancelled?: (file: string) => string;
    };
    actions: {
      cancel: () => string;
      delete: () => string;
      /**
       * @deprecated Type-only compatibility for legacy locale objects. This
       * key is unused at runtime; use `remove` for failed uploads.
       */
      clear?: () => string;
      remove?: () => string;
      retry?: () => string;
      preview?: () => string;
    };
  };
  globalHeader: {
    ariaLabel: () => string;
  };
  heading: {
    backLinkAriaLabel: () => string;
  };
  link: {
    skipLinkLabel: () => string;
  };
  linkPreview: {
    closeButtonAriaLabel?: () => string;
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
    callout?: () => string;
  };
  note: {
    created: () => string;
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
    /** @deprecated This translation key is no longer in use. */
    show?: () => string;
    /** @deprecated This translation key is no longer in use. */
    records?: (count: number | string, showNumber?: boolean) => string;
    /** @deprecated This translation key is no longer in use. */
    first?: () => string;
    /** @deprecated This translation key is no longer in use. */
    last?: () => string;
    /** @deprecated This translation key is no longer in use. */
    next?: () => string;
    /** @deprecated This translation key is no longer in use. */
    previous?: () => string;
    /** @deprecated This translation key is no longer in use. */
    ofTotalPages?: (totalPages: string | number) => string;

    pageX: (currentPage?: number | string) => string;
    // TODO - make the following keys required once deprecated keys are removed.
    ariaLabel?: () => string;
    ofY?: (totalPages: string | number) => string;
    itemsPerPage?: () => string;
    totalItems?: () => string;
    firstAriaLabel?: (totalPages?: string | number) => string;
    lastAriaLabel?: (totalPages?: string | number) => string;
    nextAriaLabel?: (
      nextPage?: number | string,
      totalPages?: string | number,
    ) => string;
    previousAriaLabel?: (
      previousPage?: number | string,
      totalPages?: string | number,
    ) => string;
  };
  password: {
    buttonLabelHide?: () => string;
    buttonLabelShow?: () => string;
    ariaLabelHide?: () => string;
    ariaLabelShow?: () => string;
    ariaLiveShownMessage: () => string;
    ariaLiveHiddenMessage: () => string;
  };
  pill: {
    remove: (label: string) => string;
  };
  progressTracker: {
    of: () => string;
  };
  pod: {
    undo: () => string;
  };
  popoverContainer: {
    openButton: {
      text: () => string;
    };
  };
  tabs: {
    error: (tabTitle?: string) => string;
    warning: (tabTitle?: string) => string;
    info: (tabTitle?: string) => string;
    scrollLeftText?: () => string;
    scrollRightText?: () => string;
  };
  textEditor: {
    boldAria: () => string;
    cancelButton: () => string;
    cancelButtonAria: () => string;
    characterCounter: (count: number | string) => string;
    characterLimit: (count: number) => string;
    contentEditorAria: () => string;
    hyperlink: {
      buttonAria: () => string;
      cancelButton: () => string;
      cancelButtonAria: () => string;
      dialogTitle: () => string;
      formKey?: () => string;
      linkFieldLabel: () => string;
      linkFieldErrorMessage?: () => string;
      saveButton: () => string;
      saveButtonAria: () => string;
      textFieldLabel: () => string;
      textFieldErrorMessage?: () => string;
    };
    typography: {
      selectAria: () => string;
      paragraph: () => string;
      title: () => string;
      subtitle: () => string;
      sectionHeader: () => string;
      sectionSubheader: () => string;
    };
    italicAria: () => string;
    orderedListAria: () => string;
    saveButton: () => string;
    saveButtonAria: () => string;
    toolbarAriaLabel: () => string;
    underlineAria: () => string;
    unorderedListAria: () => string;
    mentions: {
      listAriaLabel: () => string;
    };
  };
  search: {
    searchButtonText: () => string;
    assistiveHint: () => string;
    queryTooShort: (minQueryLength: number) => string;
    noResults: () => string;
    results: (length: number) => string;
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
    /**
     * @deprecated The `sort.accessibleName` locale string is deprecated in favour of using `aria-live` regions.
     * Use an `aria-live` region to announce changes in sort order to assistive technologies.
     */
    accessibleName?: (
      sortContent?: string,
      sortType?: "ascending" | "descending",
    ) => string;
    /* TODO make ariaRoleDescription required as part of FE-7599 */
    ariaRoleDescription?: () => string;
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
    processingLabel: () => string;
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
  verticalMenu: {
    ariaLabels: {
      responsiveMenuLauncher: () => string;
      responsiveMenuCloseButton: () => string;
      responsiveMenuAria: () => string;
    };
  };
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => string;
    };
  };
}

export default Locale;
