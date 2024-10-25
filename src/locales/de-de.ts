import deDEDateLocale from "date-fns/locale/de";

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
    selected: (count) => `${count} ausgewählt`,
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
  dialog: {
    ariaLabels: {
      close: () => "Schließen",
    },
  },
  dialogFullScreen: {
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
    dragAndDrop: () => "oder per Drag & Drop ablegen",
    selectFile: () => "Datei auswählen",
    fileUploadStatus: () => "Status",
    actions: {
      cancel: () => "Upload abbrechen",
      clear: () => "Löschen",
      delete: () => "Datei löschen",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Zurück",
  },
  link: {
    skipLinkLabel: () => "Zum Hauptinhalt springen",
  },
  loader: {
    loading: () => "Laden",
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
    show: () => "Anzeigen",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "Element" : "Elemente";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "Erste",
    last: () => "Letzte",
    next: () => "Weiter",
    previous: () => "Vorherige",
    pageX: () => "Seite",
    ofY: (count) => `von ${count}`,
  },
  password: {
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
  search: {
    searchButtonText: () => "Suchen",
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
    on: () => "EIN",
    off: () => "AUS",
  },
  textEditor: {
    tooltipMessages: {
      bold: () => "Fett",
      italic: () => "Kursiv",
      bulletList: () => "Aufzählung mit Punkten",
      numberList: () => "Nummerierte Liste",
    },
    ariaLabels: {
      bold: () => "fett",
      italic: () => "kursiv",
      bulletList: () => "Aufzählung mit Punkten",
      numberList: () => "Nummerierte Liste",
    },
  },
  tileSelect: {
    deselect: () => "Auswahl aufheben",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "h",
    minutesLabelText: () => "min",
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
