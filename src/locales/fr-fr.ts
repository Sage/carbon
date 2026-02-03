import { fr as frFRDateLocale } from "date-fns/locale/fr";

import Locale from "./locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const frFR: Partial<Locale> = {
  locale: () => "fr-FR",
  actions: {
    edit: () => "Modifier",
    delete: () => "Supprimer",
  },
  actionPopover: {
    ariaLabel: () => "actions",
  },
  advancedColorPicker: {
    ariaLabel: () => "Changer de couleur",
    currentColorDescriptionTerm: () => "Couleur actuelle attribuée :",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    selected: (count) => `${count} sélectionné(s)`,
  },
  breadcrumbs: {
    ariaLabel: () => "Chemin de navigation",
  },
  confirm: {
    no: () => "Non",
    yes: () => "Oui",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `il y a ${formattedCount} caractère de trop`
        : `${formattedCount} caractères de trop`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} caractère restant`
        : `${formattedCount} caractères restants`,
    visuallyHiddenHint: (formattedCount) =>
      `vous pouvez saisir jusqu'à ${formattedCount} caractères.`,
  },
  date: {
    dateFnsLocale: () => frFRDateLocale,
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
    dragAndDrop: () => "ou glisser et déposer votre fichier",
    selectFile: () => "Sélectionnez le fichier",
    fileUploadStatus: () => "Statut du téléchargement de fichiers",
    actions: {
      cancel: () => "Annuler le téléchargement",
      clear: () => "Effacer",
      delete: () => "Supprimer le fichier",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Retour",
  },
  link: {
    skipLinkLabel: () => "Passer au contenu principal",
  },
  loader: {
    loading: () => "Chargement en cours...",
  },
  loaderSpinner: {
    loading: () => "Chargement en cours...",
  },
  loaderStar: {
    loading: () => "Chargement en cours...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Fermer" },
  },
  message: {
    closeButtonAriaLabel: () => "Fermer",
    error: () => "Erreur",
    info: () => "Information",
    success: () => "Action réussie",
    warning: () => "Avertissement",
    neutral: () => "Information",
    ai: () => "Information générée par IA",
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
      "Votre mot de passe s'affiche. Assurez-vous d'être dans un environnement sûr puis survolez la zone avec votre souris et vous pourrez écouter le mot de passe.",
    ariaLiveHiddenMessage: () => "Votre mot de passe est actuellement caché.",
  },
  progressTracker: {
    of: () => "de",
  },
  pod: {
    undo: () => "Annuler",
  },
  tabs: {
    error: (tabTitle) => `L'onglet ${tabTitle} contient des erreurs`,
    info: (tabTitle) => `L'onglet ${tabTitle} contient des informations`,
    warning: (tabTitle) => `L'onglet ${tabTitle} contient des avertissements`,
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
    underlineAria: () => "Underline",
    hyperlink: {
      buttonAria: () => "Hyperlink",
      cancelButton: () => "Cancel",
      cancelButtonAria: () => "Cancel",
      dialogTitle: () => "Add link",
      linkFieldLabel: () => "Link",
      saveButton: () => "Save",
      saveButtonAria: () => "Save",
      textFieldLabel: () => "Text",
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
    searchButtonText: () => "Rechercher",
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
    on: () => "Oui",
    off: () => "Non",
  },
  tileSelect: {
    deselect: () => "Désélectionner",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "h",
    minutesLabelText: () => "min",
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

export default frFR;
