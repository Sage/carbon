import { enGB as enGBDateLocale } from "date-fns/locale/en-GB";

import Locale from "./locale";

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
    currentColorDescriptionTerm: () => "Current colour assigned: ",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    ariaLabels: {
      close: () => "Close",
    },
    selected: (count, total) =>
      total ? `${count} of ${total} items selected` : `${count} selected`,
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
      openCalendarButton: () => "Open calendar",
      chooseMonth: () => "Choose the month",
      chooseYear: () => "Choose the year",
      closeButton: () => "Close",
      openCalendarDescription: () =>
        "Use the arrow keys to move between dates and press Enter or Space to select a date.",
      chooseDate: () => "Choose a date",
    },
    dateFormatOverride: undefined,
  },
  decimal: {
    ariaLabels: {
      popoverTrigger: () => "Decimal popover trigger",
      popoverContent: () => "Decimal popover content",
    },
  },
  dialog: {
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
          const isErrorPlural = isSingular(errors) ? "is" : "are";
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
    dragAndDrop: (selectButtonText, multiple = false) => {
      const fileNoun = multiple ? "files" : "file";

      if (!selectButtonText) return `or drag and drop your ${fileNoun}`;

      return `Drag and drop your ${fileNoun}, or use ${selectButtonText} to choose ${
        multiple ? "them" : "it"
      }`;
    },
    selectFile: (multiple = false) =>
      multiple ? "Select files" : "Select file",
    requiredDescription: () => "This field is required.",
    currentFiles: (count) =>
      count === 1 ? `Current file (${count})` : `Current files (${count})`,
    currentFilesProgressSummary: ({
      totalCount,
      uploadingCount,
      completedCount,
    }) => {
      const summaries: string[] = [];

      if (uploadingCount > 0) {
        summaries.push(
          `${uploadingCount} file${uploadingCount === 1 ? "" : "s"} uploading`,
        );
      }

      if (completedCount > 0) {
        summaries.push(
          completedCount === 1 && totalCount === 1
            ? "1 file uploaded successfully"
            : `${completedCount} of ${totalCount} files uploaded successfully`,
        );
      }

      return summaries.length > 0 ? `${summaries.join(", ")}.` : "";
    },
    currentFilesErrorSummary: ({ errorCount }) =>
      errorCount === 1
        ? "1 file couldn't be uploaded."
        : `${errorCount} files couldn't be uploaded.`,
    previouslyUploadedFiles: (count) =>
      count === 1
        ? `Previously uploaded file (${count})`
        : `Previously uploaded files (${count})`,
    uploading: () => "Uploading…",
    uploaded: () => "File uploaded",
    uploadErrorDetails: () => "Error details",
    announcements: {
      filesAdded: (files) =>
        files.length === 1
          ? `Selected file: ${files[0]}.`
          : `Selected files: ${files.join(", ")}.`,
      uploadComplete: (files) => `Upload complete: ${files.join(", ")}.`,
      fileDeleted: (file) => `File deleted: ${file}.`,
      fileRemoved: (file) => `File removed: ${file}.`,
      uploadCancelled: (file) => `Upload cancelled: ${file}.`,
    },
    actions: {
      cancel: () => "Cancel",
      delete: () => "Delete",
      remove: () => "Remove",
      retry: () => "Retry",
      preview: () => "Preview",
    },
  },
  globalHeader: {
    ariaLabel: () => "Global Header",
  },
  heading: {
    backLinkAriaLabel: () => "Back",
  },
  link: {
    skipLinkLabel: () => "Skip to main content",
  },
  linkPreview: {
    closeButtonAriaLabel: () => "Close",
  },
  loader: {
    loading: () => "Loading...",
  },
  loaderSpinner: {
    loading: () => "Loading...",
  },
  loaderStar: {
    loading: () => "Loading...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Close" },
  },
  message: {
    closeButtonAriaLabel: () => "Close",
    error: () => "Error",
    info: () => "Information",
    success: () => "Success",
    warning: () => "Warning",
    neutral: () => "Information",
    ai: () => "AI Information",
    callout: () => "Callout",
  },
  note: {
    created: () => "Created",
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
    firstAriaLabel: (totalPages?: string | number) =>
      `Go to first page ${totalPages ? `(page 1 of ${totalPages})` : ""} `,
    lastAriaLabel: (totalPages?: string | number) =>
      `Go to last page ${totalPages ? `(page ${totalPages} of ${totalPages})` : ""} `,
    nextAriaLabel: (nextPage?: number | string, totalPages?: string | number) =>
      `Go to next page ${nextPage && totalPages ? `(page ${nextPage} of ${totalPages})` : ""} `,
    previousAriaLabel: (
      previousPage?: number | string,
      totalPages?: string | number,
    ) =>
      `Go to previous page ${previousPage && totalPages ? `(page ${previousPage} of ${totalPages})` : ""} `,
    pageX: (currentPage?: number | string) =>
      `Page${currentPage ? ` ${currentPage}` : ""}`,
    ofY: (totalPages: number | string) => `of ${totalPages}`,
    itemsPerPage: () => "Items per page",
    totalItems: () => "total items",
    ariaLabel: () => "Pagination",
  },
  password: {
    buttonLabelHide: () => "Hide",
    buttonLabelShow: () => "Show",
    ariaLabelHide: () => "Hide password",
    ariaLabelShow: () => "Show password",
    ariaLiveShownMessage: () =>
      "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so.",
    ariaLiveHiddenMessage: () => "Your password is currently hidden.",
  },
  pill: {
    remove: (label: string) => `Remove ${label} pill`,
  },
  progressTracker: {
    of: () => "of",
  },
  pod: {
    undo: () => "Undo",
  },
  popoverContainer: {
    openButton: {
      text: () => "Actions",
    },
  },
  tabs: {
    error: (tabTitle) => `The ${tabTitle} tab contains errors`,
    info: (tabTitle) => `The ${tabTitle} tab contains information`,
    warning: (tabTitle) => `The ${tabTitle} tab contains warnings`,
    scrollLeftText: () => "Scroll Tabs Left",
    scrollRightText: () => "Scroll Tabs Right",
  },
  textEditor: {
    boldAria: () => "Bold",
    cancelButton: () => "Cancel",
    cancelButtonAria: () => "Cancel",
    characterCounter(count: number | string) {
      return `${typeof count === "number" ? count.toString() : count} characters remaining`;
    },
    characterLimit(count: number) {
      return `You are ${count} character(s) over the character limit`;
    },
    contentEditorAria: () => "Rich text content editor",
    hyperlink: {
      buttonAria: () => "Hyperlink",
      cancelButton: () => "Cancel",
      cancelButtonAria: () => "Cancel",
      dialogTitle: () => "Insert link",
      formKey: () => "Indicates required information",
      linkFieldLabel: () => "Link address",
      linkFieldErrorMessage: () => "Enter link address",
      saveButton: () => "Save",
      saveButtonAria: () => "Save",
      textFieldLabel: () => "Link text",
      textFieldErrorMessage: () => "Enter link text",
    },
    typography: {
      selectAria: () => "Heading type",
      paragraph: () => "Paragraph",
      title: () => "Title",
      subtitle: () => "Subtitle",
      sectionHeader: () => "Section header",
      sectionSubheader: () => "Section subheader",
    },
    italicAria: () => "Italic",
    orderedListAria: () => "Ordered list",
    saveButton: () => "Save",
    saveButtonAria: () => "Save",
    toolbarAriaLabel: () => "Formatting",
    underlineAria: () => "Underline",
    unorderedListAria: () => "Unordered list",
    mentions: {
      listAriaLabel: () => "List of mentionable people",
    },
  },
  search: {
    searchButtonText: () => "Search",
    assistiveHint: () =>
      "When search suggestions are available use up and down arrows to browse results and enter to select. Touch device users, explore by touch or with swipe gestures.",
    queryTooShort: (minQueryLength) =>
      `Type at least ${minQueryLength} characters to see results`,
    noResults: () => "No results found",
    results: (length) => {
      const words = {
        result: length === 1 ? "result" : "results",
        is: length === 1 ? "is" : "are",
      };

      return `${length} ${words.result} ${words.is} available.`;
    },
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
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Sort all ${sortContent || "contents"}${
        sortType
          ? ` in an ${sortType} order.`
          : " in an ascending or descending order."
      }`,
    ariaRoleDescription: () => "Sortable column header",
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
    on: () => "On",
    off: () => "Off",
    processingLabel: () => "Processing...",
  },
  table: {
    sort: {
      ariaRoleDescription: () => "Sortable column header",
    },
  },
  tileSelect: {
    deselect: () => "Deselect",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Hours",
    minutesLabelText: () => "Minutes",
    hoursAriaLabelText: () => "Hours",
    minutesAriaLabelText: () => "Minutes",
  },
  toast: {
    ariaLabels: {
      close: () => "Close",
    },
    error: () => "Error",
    info: () => "Information",
    success: () => "Success",
    warning: () => "Warning",
    neutral: () => "Information",
    notification: () => "Notification",
  },
  verticalMenu: {
    ariaLabels: {
      responsiveMenuLauncher: () => "Product menu launcher",
      responsiveMenuCloseButton: () => "Close product menu",
      responsiveMenuAria: () => "Product menu",
    },
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Close",
    },
  },
};

export default enGB;
