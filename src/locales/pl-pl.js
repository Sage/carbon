const isSingular = (count) =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

export default {
  locale: () => "pl-PL",
  actions: {
    edit: () => "Edytuj",
    delete: () => "Usuń",
  },
  actionPopover: {
    ariaLabel: () => "akcje",
  },
  batchSelection: {
    selected: (count) => `${count} wybrano`,
  },
  confirm: {
    no: () => "Nie",
    yes: () => "Tak",
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
  select: {
    actionButtonText: () => "Dodaj nowy element",
    placeholder: () => "Proszę wybierz...",
    noResultsForTerm: (term) => `Brak wyników dla "${term}"`,
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
  wizards: {
    multiStep: {
      buttons: {
        submit: () => "Wyślij",
        next: () => "Następny",
        back: () => "Wstecz",
      },
    },
  },
};
