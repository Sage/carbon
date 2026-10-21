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
    ariaLabels: {
      close: () => "Fermer",
    },
    selected: (count, total) =>
      total
        ? `${count} sur ${total} éléments sélectionnés`
        : `${count} sélectionné(s)`,
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
  decimal: {
    ariaLabels: {
      popoverTrigger: () => "Déclencheur de contextuel décimal",
      popoverContent: () => "Contenu du contextuel décimal",
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
    dragAndDrop: (selectButtonText, multiple = false) => {
      if (!selectButtonText) {
        return multiple
          ? "ou glissez et déposez-les ici."
          : "ou glissez et déposez-le ici.";
      }

      return `Glissez-déposez ${
        multiple ? "vos fichiers" : "votre fichier"
      } ou utilisez ${selectButtonText} pour ${
        multiple ? "les choisir" : "le choisir"
      }.`;
    },
    selectFile: (multiple = false) =>
      multiple ? "Sélectionnez les fichiers" : "Sélectionnez le fichier",
    requiredDescription: () => "Ce champ est obligatoire.",
    currentFiles: (count) =>
      count === 1 ? `Fichier actuel (${count})` : `Fichiers actuels (${count})`,
    currentFilesProgressSummary: ({
      totalCount,
      uploadingCount,
      completedCount,
    }) => {
      const summaries: string[] = [];

      if (uploadingCount > 0) {
        summaries.push(
          `Téléversement de ${uploadingCount} ${
            uploadingCount === 1 ? "fichier en cours" : "fichiers en cours"
          }`,
        );
      }

      if (completedCount > 0) {
        summaries.push(
          completedCount === 1 && totalCount === 1
            ? "1 fichier téléversé"
            : `Fichiers téléversés : ${completedCount} sur ${totalCount}`,
        );
      }

      return summaries.length > 0 ? `${summaries.join(", ")}.` : "";
    },
    currentFilesErrorSummary: ({ errorCount }) =>
      errorCount === 1
        ? "1 fichier n’a pas pu être téléversé."
        : `${errorCount} fichiers n’ont pas pu être téléversés.`,
    previouslyUploadedFiles: (count) =>
      count === 1
        ? `Fichier téléversé précédemment (${count})`
        : `Fichiers téléversés précédemment (${count})`,
    uploading: () => "Téléversement...",
    uploaded: () => "Fichier téléversé",
    uploadErrorDetails: () => "Détails de l’erreur",
    announcements: {
      filesAdded: (files) =>
        files.length === 1
          ? `Fichier sélectionné : ${files[0]}.`
          : `Fichiers sélectionnés : ${files.join(", ")}.`,
      uploadComplete: (files) => `Téléversement terminé : ${files.join(", ")}.`,
      fileDeleted: (file) => `Fichier supprimé : ${file}.`,
      fileRemoved: (file) => `Fichier retiré : ${file}.`,
      uploadCancelled: (file) => `Téléversement annulé : ${file}.`,
    },
    actions: {
      cancel: () => "Annuler",
      delete: () => "Supprimer",
      remove: () => "Retirer",
      retry: () => "Réessayer",
      preview: () => "Aperçu",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Retour",
  },
  link: {
    skipLinkLabel: () => "Passer au contenu principal",
  },
  linkPreview: {
    closeButtonAriaLabel: () => "Fermer",
  },
  loader: {
    loading: () => "Chargement...",
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
    firstAriaLabel: (totalPages?: string | number) =>
      `Aller à la première page ${totalPages ? `(page 1 sur ${totalPages})` : ""}`,
    lastAriaLabel: (totalPages?: string | number) =>
      `Aller à la dernière page ${totalPages ? `(page ${totalPages} sur ${totalPages})` : ""}`,
    nextAriaLabel: (nextPage?: number | string, totalPages?: string | number) =>
      `Aller à la page suivante ${nextPage && totalPages ? `(page ${nextPage} sur ${totalPages})` : ""}`,
    previousAriaLabel: (
      previousPage?: number | string,
      totalPages?: string | number,
    ) =>
      `Aller à la page précédente ${previousPage && totalPages ? `(page ${previousPage} sur ${totalPages})` : ""}`,
    pageX: (currentPage?: number | string) =>
      `Page${currentPage ? ` ${currentPage}` : ""}`,
    ofY: (totalPages: number | string) => `sur ${totalPages}`,
    itemsPerPage: () => "Éléments par page",
    totalItems: () => "éléments au total",
    ariaLabel: () => "Pagination",
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
  popoverContainer: {
    openButton: {
      text: () => "Actions",
    },
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
      formKey: () => "Indique un champ obligatoire",
      linkFieldLabel: () => "Adresse du lien",
      linkFieldErrorMessage: () => "Saisissez l’adresse du lien",
      saveButton: () => "Save",
      saveButtonAria: () => "Save",
      textFieldLabel: () => "Texte du lien",
      textFieldErrorMessage: () => "Saisissez le texte du lien",
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
    searchButtonText: () => "Chercher",
    assistiveHint: () =>
      "Lorsque des suggestions de recherche sont disponibles, utilisez les touches fléchées haut et bas pour parcourir les résultats et la touche Entrée pour sélectionner. Sur les appareils tactiles, explorez les résultats en touchant l’écran ou en utilisant des gestes de balayage.",
    queryTooShort: (minQueryLength) =>
      `Saisissez au moins ${minQueryLength} caractères pour voir des résultats`,
    noResults: () => "Aucun résultat",
    results: (length) => {
      const words = {
        result: length === 1 ? "résultat" : "résultats",
        is: length === 1 ? "est" : "sont",
        available: length === 1 ? "disponible" : "disponibles",
      };

      return `${length} ${words.result} ${words.is} ${words.available}.`;
    },
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
    processingLabel: () => "Traitement en cours",
  },
  tileSelect: {
    deselect: () => "Désélectionner",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Heures",
    minutesLabelText: () => "Minutes",
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
