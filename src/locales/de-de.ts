import { de as deDEDateLocale } from "date-fns/locale/de";

import Locale from "./locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const deDE: Partial<Locale> = {
  locale: () => "de-DE",
  actions: {
    edit: () => "Bearbeiten",
    delete: () => "Löschen",
  },
  actionPopover: {
    ariaLabel: () => "Aktionen",
  },
  advancedColorPicker: {
    ariaLabel: () => "Farbe ändern",
    currentColorDescriptionTerm: () => "Aktuell zugewiesene Farbe:",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    ariaLabels: {
      close: () => "Schließen",
    },
    selected: (count, total) =>
      total ? `${count} von ${total} ausgewählt` : `${count} ausgewählt`,
  },
  breadcrumbs: {
    ariaLabel: () => "Breadcrumbs",
  },
  confirm: {
    no: () => "Nein",
    yes: () => "Ja",
  },
  characterCount: {
    tooManyCharacters: (formattedCount) => `${formattedCount} Zeichen zu viel`,
    charactersLeft: (formattedCount) => `${formattedCount} Zeichen übrig`,
    visuallyHiddenHint: (formattedCount) =>
      `Sie können bis zu ${formattedCount} Zeichen eingeben.`,
  },
  date: {
    dateFnsLocale: () => deDEDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Vorheriger Monat",
      nextMonthButton: () => "Nächster Monat",
    },
  },
  decimal: {
    ariaLabels: {
      popoverTrigger: () => "Dezimal-Popover-Auslöser",
      popoverContent: () => "Dezimal-Popover-Inhalt",
    },
  },
  dialog: {
    ariaLabels: {
      close: () => "Schließen",
    },
  },
  dismissibleBox: {
    ariaLabels: {
      close: () => "Schließen",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const warningPlural = isSingular(warnings) ? "Warnung" : "Warnungen";

          if (errors && warnings && type === "warning") {
            return ["und", `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return ["Es gibt", `${errors} Fehler`];
          }
          if (warnings) {
            return ["Es gibt", `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  fileInput: {
    dragAndDrop: (selectButtonText, multiple = false) => {
      if (!selectButtonText) return "oder per Drag & Drop ablegen";

      return `Ziehen Sie Ihre ${
        multiple ? "Dateien" : "Datei"
      } per Drag & Drop hierher oder wählen Sie sie über ${selectButtonText} aus.`;
    },
    selectFile: (multiple = false) =>
      multiple ? "Dateien auswählen" : "Datei auswählen",
    requiredDescription: () => "Pflichtfeld",
    currentFiles: (count) =>
      count === 1 ? `Aktuelle Datei (${count})` : `Aktuelle Dateien (${count})`,
    currentFilesProgressSummary: ({
      totalCount,
      uploadingCount,
      completedCount,
    }) => {
      const summaries: string[] = [];

      if (uploadingCount > 0) {
        summaries.push(
          `${uploadingCount} ${
            uploadingCount === 1
              ? "Datei wird hochgeladen"
              : "Dateien werden hochgeladen"
          }`,
        );
      }

      if (completedCount > 0) {
        summaries.push(
          completedCount === 1 && totalCount === 1
            ? "1 Datei hochgeladen"
            : `${completedCount} von ${totalCount} Dateien hochgeladen`,
        );
      }

      return summaries.length > 0 ? `${summaries.join(", ")}.` : "";
    },
    currentFilesErrorSummary: ({ errorCount }) =>
      errorCount === 1
        ? "1 Datei konnte nicht hochgeladen werden."
        : `${errorCount} Dateien konnten nicht hochgeladen werden.`,
    previouslyUploadedFiles: (count) =>
      count === 1
        ? `Zuvor hochgeladene Datei (${count})`
        : `Zuvor hochgeladene Dateien (${count})`,
    uploading: () => "Hochladen...",
    uploaded: () => "Datei hochgeladen",
    uploadErrorDetails: () => "Fehlerdetails",
    announcements: {
      filesAdded: (files) =>
        files.length === 1
          ? `Ausgewählte Datei: ${files[0]}`
          : `Ausgewählte Dateien: ${files.join(", ")}`,
      uploadComplete: (files) => `Upload abgeschlossen: ${files.join(", ")}`,
      fileDeleted: (file) => `Datei gelöscht: ${file}`,
      fileRemoved: (file) => `Datei entfernt: ${file}`,
      uploadCancelled: (file) => `Upload abgebrochen: ${file}`,
    },
    actions: {
      cancel: () => "Abbrechen",
      delete: () => "Löschen",
      remove: () => "Entfernen",
      retry: () => "Erneut versuchen",
      preview: () => "Vorschau",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Zurück",
  },
  link: {
    skipLinkLabel: () => "Zum Hauptinhalt springen",
  },
  linkPreview: {
    closeButtonAriaLabel: () => "Schließen",
  },
  loader: {
    loading: () => "Laden...",
  },
  loaderSpinner: {
    loading: () => "Laden...",
  },
  loaderStar: {
    loading: () => "Laden...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Schließen" },
  },
  message: {
    closeButtonAriaLabel: () => "Schließen",
    error: () => "Fehler",
    info: () => "Informationen",
    success: () => "Erfolg",
    warning: () => "Warnung",
    neutral: () => "Informationen",
    ai: () => "Von KI generierte Informationen",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `Tag in ${month} muss eine Zahl von 1- ${daysInMonth} sein`;
        }
        return "Der Tag muss eine Zahl zwischen 1 und 31 sein.";
      },
      month: () => "Der Monat muss eine Zahl zwischen 1 und 12 sein.",
      year: () => "Das Jahr muss eine Zahl zwischen 1000 und 2200 sein.",
    },
    labels: {
      day: () => "Tag",
      month: () => "Monat",
      year: () => "Jahr",
    },
  },
  pager: {
    firstAriaLabel: (totalPages?: string | number) =>
      `Zur ersten Seite ${totalPages ? `(Seite 1 von ${totalPages})` : ""}`,
    lastAriaLabel: (totalPages?: string | number) =>
      `Zur letzten Seite ${totalPages ? `(Seite ${totalPages} von ${totalPages})` : ""}`,
    nextAriaLabel: (nextPage?: number | string, totalPages?: string | number) =>
      `Zur nächsten Seite ${nextPage && totalPages ? `(Seite ${nextPage} von ${totalPages})` : ""}`,
    previousAriaLabel: (
      previousPage?: number | string,
      totalPages?: string | number,
    ) =>
      `Zur vorherigen Seite ${previousPage && totalPages ? `(Seite ${previousPage} von ${totalPages})` : ""}`,
    pageX: (currentPage?: number | string) =>
      `Seite${currentPage ? ` ${currentPage}` : ""}`,
    ofY: (totalPages: number | string) => `von ${totalPages}`,
    itemsPerPage: () => "Elemente pro Seite",
    totalItems: () => "Elemente gesamt",
    ariaLabel: () => "Seitennavigation",
  },
  password: {
    buttonLabelHide: () => "Ausblenden",
    buttonLabelShow: () => "Anzeigen",
    ariaLabelHide: () => "Passwort ausblenden",
    ariaLabelShow: () => "Passwort anzeigen",
    ariaLiveShownMessage: () =>
      "Ihr Passwort wurde angezeigt. Bewegen Sie den Cursor über das Passwort, um es sich vorlesen zu lassen, wenn dies sicher ist.",
    ariaLiveHiddenMessage: () => "Ihr Passwort ist derzeit ausgeblendet.",
  },
  progressTracker: {
    of: () => "von",
  },
  pod: {
    undo: () => "Rückgängig",
  },
  popoverContainer: {
    openButton: {
      text: () => "Aktionen",
    },
  },
  tabs: {
    error: (tabTitle) => `Die Registerkarte ${tabTitle} enthält Fehler`,
    info: (tabTitle) => `Die Registerkarte ${tabTitle} enthält Informationen`,
    warning: (tabTitle) => `Die Registerkarte ${tabTitle} enthält Warnungen`,
  },
  textEditor: {
    boldAria: () => "Fett",
    cancelButton: () => "Abbrechen",
    cancelButtonAria: () => "Abbrechen",
    characterCounter(count: number | string) {
      return `Noch ${typeof count === "number" ? count.toString() : count} Zeichen`;
    },
    characterLimit(count: number) {
      return `Sie sind ${count} Zeichen über dem Zeichenlimit`;
    },
    contentEditorAria: () => "Editor für Rich-Text-Inhalte",
    italicAria: () => "Kursiv",
    orderedListAria: () => "Sortierte Liste",
    saveButton: () => "Speichern",
    saveButtonAria: () => "Speichern",
    toolbarAriaLabel: () => "Formatierung",
    unorderedListAria: () => "Unsortierte Liste",
    underlineAria: () => "Underline",
    hyperlink: {
      buttonAria: () => "Hyperlink",
      cancelButton: () => "Cancel",
      cancelButtonAria: () => "Cancel",
      dialogTitle: () => "Add link",
      formKey: () => "Pflichtfeld",
      linkFieldLabel: () => "Link-Adresse",
      linkFieldErrorMessage: () => "Link-Adresse eingeben",
      saveButton: () => "Save",
      saveButtonAria: () => "Save",
      textFieldLabel: () => "Link-Text",
      textFieldErrorMessage: () => "Link-Text eingeben",
    },
    typography: {
      selectAria: () => "Heading type",
      paragraph: () => "Paragraph",
      title: () => "Title",
      subtitle: () => "Subtitle",
      sectionHeader: () => "Section header",
      sectionSubheader: () => "Section subheader",
    },
    mentions: {
      listAriaLabel: () => "List of mentionable people",
    },
  },
  search: {
    searchButtonText: () => "Suchen",
    assistiveHint: () =>
      "Navigieren Sie mit den Pfeiltasten durch die Suchvorschläge und wählen Sie einen Eintrag mit der Eingabetaste aus. Auf Touch-Geräten können Sie die Ergebnisse per Berührung oder Wischgeste durchsuchen.",
    queryTooShort: (minQueryLength) =>
      `Geben Sie mindestens ${minQueryLength} Zeichen ein, um Ergebnisse anzuzeigen.`,
    noResults: () => "Keine Ergebnisse gefunden",
    results: (length) => {
      const words = {
        result: length === 1 ? "Ergebnis" : "Ergebnisse",
      };

      return `${length} ${words.result} verfügbar.`;
    },
  },
  select: {
    actionButtonText: () => "Neues Element hinzufügen",
    placeholder: () => "Bitte auswählen...",
    noResultsForTerm: (term) =>
      `Es wurden keine Ergebnisse für ${term} gefunden.`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Schließen",
    },
  },
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Alle ${sortContent || "inhalte"}${
        sortType
          ? ` in der Reihenfolge ${
              sortType === "ascending" ? "aufsteigend" : "absteigend"
            } sortieren.`
          : " in der Reihenfolge aufsteigend oder absteigend sortieren."
      }`,
  },
  splitButton: {
    ariaLabel: () => "Mehr anzeigen",
  },
  stepFlow: {
    stepLabel: (currentStep, totalSteps) =>
      `Schritt ${currentStep} von ${totalSteps}`,
    screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
      `${
        category ? `${category}.` : ""
      } ${title}. Schritt ${currentStep} von ${totalSteps}.`,
    closeIconAriaLabel: () => "Schließen",
  },
  switch: {
    on: () => "Ein",
    off: () => "Aus",
    processingLabel: () => "Verarbeitung",
  },
  tileSelect: {
    deselect: () => "Auswahl aufheben",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Stunden",
    minutesLabelText: () => "Minuten",
    hoursAriaLabelText: () => "Stunden",
    minutesAriaLabelText: () => "Minuten",
  },
  toast: {
    ariaLabels: {
      close: () => "Schließen",
    },
    error: () => "",
    info: () => "",
    success: () => "",
    warning: () => "",
    neutral: () => "",
    notification: () => "",
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Schließen",
    },
  },
};

export default deDE;
