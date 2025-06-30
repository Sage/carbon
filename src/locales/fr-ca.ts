import { frCA as frCADateLocale } from "date-fns/locale/fr-CA";

import Locale from "./locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const frCA: Partial<Locale> = {
  locale: () => "fr-CA",
  actions: {
    edit: () => "Modifier",
    delete: () => "Supprimer",
  },
  actionPopover: {
    ariaLabel: () => "actions",
  },
  advancedColorPicker: {
    ariaLabel: () => "Changer de couleur",
    currentColorDescriptionTerm: () => "Couleur actuellement attribuée :",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    selected: (count) => `${count} sélectionné(s)`,
  },
  breadcrumbs: {
    ariaLabel: () => "chemins de navigation",
  },
  confirm: {
    no: () => "Non",
    yes: () => "Oui",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} caractère de trop`
        : `${formattedCount} caractères de trop`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} caractère restant`
        : `${formattedCount} caractères restants`,
    visuallyHiddenHint: (formattedCount) =>
      `vous pouvez saisir jusqu'à ${formattedCount} caractères.`,
  },
  date: {
    dateFnsLocale: () => frCADateLocale,
    ariaLabels: {
      previousMonthButton: () => "Mois précédent",
      nextMonthButton: () => "Mois suivant",
    },
  },
  dialog: {
    ariaLabels: {
      close: () => "Fermer",
    },
  },
  dialogFullScreen: {
    ariaLabels: {
      close: () => "Fermer",
    },
  },
  dismissibleBox: {
    ariaLabels: {
      close: () => "Fermer",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const errorPlural = isSingular(errors) ? "erreur" : "erreurs";
          const warningPlural = isSingular(warnings)
            ? "avertissement"
            : "avertissements";

          if (errors && warnings && type === "warning") {
            return ["et", `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return ["Il y a", `${errors} ${errorPlural}`];
          }
          if (warnings) {
            return ["Il y a", `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  fileInput: {
    dragAndDrop: () => "ou glissez et déposez-le ici.",
    selectFile: () => "Sélectionnez le fichier",
    fileUploadStatus: () => "État du téléversement des fichiers",
    actions: {
      cancel: () => "Annuler le téléversement",
      clear: () => "Effacer",
      delete: () => "Supprimer le fichier",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Retour",
  },
  label: {
    optional: () => "facultatif",
  },
  link: {
    skipLinkLabel: () => "Passer au contenu principal",
  },
  loader: {
    loading: () => "Chargement",
  },
  loaderSpinner: {
    loading: () => "Chargement...",
  },
  loaderStar: {
    loading: () => "Chargement...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Fermer" },
  },
  message: {
    closeButtonAriaLabel: () => "Fermer",
    error: () => "Erreur",
    info: () => "Information",
    success: () => "Opération réussie",
    warning: () => "Avertissement",
    neutral: () => "Information",
    ai: () => "Information générée par l'IA",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `Le jour du ${month} doit être un nombre compris entre 1- ${daysInMonth}`;
        }
        return "Le jour doit être un nombre compris entre 1 et 31 jours.";
      },
      month: () => "Le mois doit être un nombre compris entre 1 et 12.",
      year: () => "L'année doit être un nombre compris entre 1800 et 2200.",
    },
    labels: {
      day: () => "Jour",
      month: () => "Mois",
      year: () => "Année",
    },
  },
  pager: {
    show: () => "Afficher",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "élément" : "éléments";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "Première",
    last: () => "Dernière",
    next: () => "Suivante",
    previous: () => "Précédente",
    pageX: () => "Page",
    ofY: (count) => `de ${count}`,
  },
  password: {
    buttonLabelHide: () => "Masquer",
    buttonLabelShow: () => "Afficher",
    ariaLabelHide: () => "Masquer le mot de passe",
    ariaLabelShow: () => "Afficher le mot de passe",
    ariaLiveShownMessage: () =>
      "Votre mot de passe a été affiché. Si vous pouvez le faire en toute sécurité, focalisez sur la zone de saisie du mot de passe pour qu’il vous soit lu.",
    ariaLiveHiddenMessage: () => "Votre mot de passe est actuellement masqué.",
  },
  progressTracker: {
    of: () => "de",
  },
  pod: {
    undo: () => "Annuler",
  },
  textEditor: {
    boldAria: () => "Gras",
    cancelButton: () => "Annuler",
    cancelButtonAria: () => "Annuler",
    characterCounter(count: number | string) {
      return `${typeof count === "number" ? count.toString() : count} caractères restants`;
    },
    characterLimit(count: number) {
      return `Vous avez dépassé de ${count} caractères la limite autorisée`;
    },
    contentEditorAria: () => "Éditeur de texte enrichi",
    italicAria: () => "Italique",
    orderedListAria: () => "Liste ordonnée",
    saveButton: () => "Enregistrer",
    saveButtonAria: () => "Enregistrer",
    toolbarAriaLabel: () => "Mise en forme",
    unorderedListAria: () => "Liste non ordonnée",
  },
  search: {
    searchButtonText: () => "Chercher",
  },
  select: {
    actionButtonText: () => "Ajouter un nouvel élément",
    placeholder: () => "Sélectionner...",
    noResultsForTerm: (term) => `Aucun résultat pour ${term}`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Fermer",
    },
  },
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Trier tous les contenus ${sortContent && `de type ${sortContent}`}${
        sortType
          ? ` par ordre ${
              sortType === "ascending" ? "croissant" : "décroissant"
            }.`
          : " par ordre croissant ou décroissant."
      }`,
  },
  splitButton: {
    ariaLabel: () => "Afficher plus",
  },
  stepFlow: {
    stepLabel: (currentStep, totalSteps) =>
      `Étape ${currentStep} de ${totalSteps}`,
    screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
      `${
        category ? `${category}.` : ""
      } ${title}. Étape ${currentStep} de ${totalSteps}.`,
    closeIconAriaLabel: () => "Fermer",
  },
  switch: {
    on: () => "OUI",
    off: () => "NON",
  },
  tileSelect: {
    deselect: () => "Désélectionner",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Hres",
    minutesLabelText: () => "Mins.",
    hoursAriaLabelText: () => "Heures",
    minutesAriaLabelText: () => "Minutes",
  },
  toast: {
    ariaLabels: {
      close: () => "Fermer",
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
      close: () => "Fermer",
    },
  },
};

export default frCA;
