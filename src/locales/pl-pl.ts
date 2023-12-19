import Locale from "./locale";
import { pl as plDateLocale } from "./date-fns-locales";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

export const PolishPlural = (
  singularNominativ: string,
  pluralNominativ: string,
  pluralGenitive: string,
  value: number
) => {
  if (value === 1) {
    return singularNominativ;
  }
  if (
    value % 10 >= 2 &&
    value % 10 <= 4 &&
    (value % 100 < 10 || value % 100 >= 20)
  ) {
    return pluralNominativ;
  }
  return pluralGenitive;
};

const translateColor = (color: string) => {
  switch (color.toLowerCase()) {
    case "white":
      return "biały";
    case "transparent":
      return "przezroczysty";
    case "black":
      return "czarny";
    case "blue":
      return "niebieski";
    case "pink":
      return "różowy";
    case "purple":
      return "fioletowy";
    case "goldenrod":
      return "złoty";
    case "orchid":
      return "ciemny róż";
    case "desert":
      return "pustynny";
    case "turquoise":
      return "turkusowy";
    case "mint":
      return "miętowy";
    default:
      return color;
  }
};

const plPL: Locale = {
  locale: () => "pl-PL",
  actions: {
    edit: () => "Edytuj",
    delete: () => "Usuń",
  },
  actionPopover: {
    ariaLabel: () => "akcje",
  },
  advancedColorPicker: {
    ariaLabel: () => "Zmień kolor",
    currentColorDescriptionTerm: (currentColor: string) =>
      translateColor(currentColor) === "biały"
        ? "Aktualny przypisany kolor: "
        : "Aktualnie przypisany kolor: ",
    currentColorAssigned: (currentColor: string) =>
      translateColor(currentColor),
  },
  batchSelection: {
    selected: (count) => `${count} wybrano`,
  },
  breadcrumbs: {
    ariaLabel: () => "okruszki",
  },
  confirm: {
    no: () => "Nie",
    yes: () => "Tak",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      `Masz o ${formattedCount} ${PolishPlural(
        "znak",
        "znaki",
        "znaków",
        count
      )} za dużo`,
    charactersLeft: (count, formattedCount) =>
      `Masz ${formattedCount} ${PolishPlural(
        "pozostały",
        "pozostałe",
        "pozostałych",
        count
      )} ${PolishPlural("znak", "znaki", "znaków", count)}`,
    visuallyHiddenHint: (formattedCount) =>
      `Można wprowadzić do ${formattedCount} znaków`,
  },

  date: {
    dateFnsLocale: () => plDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Poprzedni miesiąc",
      nextMonthButton: () => "Następny miesiąc",
    },
  },
  dialog: {
    ariaLabels: {
      close: () => "Zamknij",
    },
  },
  dialogFullScreen: {
    ariaLabels: {
      close: () => "Zamknij",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const errorPlural = isSingular(errors) ? "błąd" : "błędy";
          const warningPlural = isSingular(warnings)
            ? "ostrzerzenie"
            : "ostrzerzenia";

          if (errors && warnings && type === "warnings") {
            return [`oraz`, `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return ["Znaleziono", `${errors} ${errorPlural}`];
          }
          if (warnings) {
            return ["Znaleziono", `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  fileInput: {
    dragAndDrop: () => "lub przeciągnij i upuść plik",
    selectFile: () => "Wybierz pliki",
    fileUploadStatus: () => "Status przesyłania plików",
    actions: {
      cancel: () => "Anuluj przesyłanie",
      clear: () => "Wyczyść",
      delete: () => "Usuń plik",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Wstecz",
  },
  link: {
    skipLinkLabel: () => "Przejdź do treści",
  },
  loader: {
    loading: () => "Ładowanie",
  },
  message: {
    closeButtonAriaLabel: () => "Zamknij",
  },
  numeralDate: {
    validation: {
      day: () => "Dzień musi być liczbą w zakresie 1-31.",
      month: () => "Miesiąć musi być liczbą w zakresie 1-12.",
      year: () => "Rok musi być liczbą w zakresie 1800-2200.",
    },
  },
  pager: {
    show: () => "Pokaż",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "rzecz" : "rzeczy";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "Pierwsza",
    last: () => "Ostatnia",
    next: () => "Następna",
    previous: () => "Poprzednia",
    pageX: () => "Strona",
    ofY: (count) => `z ${count}`,
  },
  password: {
    ariaLiveShownMessage: () =>
      "Zostało wyświetlone Twoje hasło. Skup się na haśle, aby je odczytać, jeśli jest to bezpieczne.",
    ariaLiveHiddenMessage: () => "Twoje hasło jest obecnie ukryte.",
  },
  progressTracker: {
    of: () => "z",
  },
  pod: {
    undo: () => "Cofnąć",
  },
  select: {
    actionButtonText: () => "Dodaj nowy element",
    placeholder: () => "Proszę wybierz...",
    noResultsForTerm: (term) => `Brak wyników dla "${term}"`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Zamknij",
    },
  },
  splitButton: {
    ariaLabel: () => "Pokaż więcej",
  },
  switch: {
    on: () => "WŁ",
    off: () => "WYŁ",
  },
  textEditor: {
    tooltipMessages: {
      bold: () => "Pogrubiony",
      italic: () => "Kursywa",
      bulletList: () => "Lista Punktowana",
      numberList: () => "Lista Numerowana",
    },
    ariaLabels: {
      bold: () => "pogrubiony",
      italic: () => "kursywa",
      bulletList: () => "lista-punktowana",
      numberList: () => "lista-numerowana",
    },
  },
  tileSelect: {
    deselect: () => "Odznacz",
  },
  toast: {
    ariaLabels: {
      close: () => "Zamknij",
    },
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Zamknij",
    },
  },
};

export { PolishPlural as PolishPlurals };
export default plPL;
