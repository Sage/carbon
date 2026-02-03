import { pt as ptPTDateLocale } from "date-fns/locale/pt";

import Locale from "./locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const ptPT: Partial<Locale> = {
  locale: () => "pt-PT",
  actions: {
    edit: () => "Editar",
    delete: () => "Eliminar",
  },
  actionPopover: {
    ariaLabel: () => "ações",
  },
  advancedColorPicker: {
    ariaLabel: () => "Alterar cor",
    currentColorDescriptionTerm: () => "Cor aplicada: ",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    selected: (count) =>
      count === 1 ? `${count} selecionado` : `${count} selecionados`,
  },
  breadcrumbs: {
    ariaLabel: () => "caminho de navegação",
  },
  confirm: {
    no: () => "Não",
    yes: () => "Sim",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} caráter a mais`
        : `${formattedCount} carateres a mais`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `Resta ${formattedCount} caráter`
        : `Restam ${formattedCount} carateres`,
    visuallyHiddenHint: (formattedCount) =>
      `Pode introduzir até ${formattedCount} carateres indefinidos`,
  },
  date: {
    dateFnsLocale: () => ptPTDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Mês anterior",
      nextMonthButton: () => "Mês seguinte",
    },
    dateFormatOverride: undefined,
  },
  dialog: {
    ariaLabels: {
      close: () => "Fechar",
    },
  },
  dismissibleBox: {
    ariaLabels: {
      close: () => "Fechar",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const errorPlural = isSingular(errors) ? "erro" : "erros";
          const warningPlural = isSingular(warnings) ? "aviso" : "avisos";

          if (errors && warnings && type === "warning") {
            return ["e", `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return [`Há`, `${errors} ${errorPlural}`];
          }
          if (warnings) {
            return [`Há`, `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  fileInput: {
    dragAndDrop: () => "ou arrastar e largar",
    selectFile: () => "Selecionar ficheiro",
    fileUploadStatus: () => "Estado de carregamento",
    actions: {
      cancel: () => "Cancelar carregamento",
      clear: () => "Limpar",
      delete: () => "Eliminar ficheiro",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Retroceder",
  },
  link: {
    skipLinkLabel: () => "Ir para o conteúdo principal",
  },
  loader: {
    loading: () => "A carregar...",
  },
  loaderSpinner: {
    loading: () => "A carregar...",
  },
  loaderStar: {
    loading: () => "A carregar...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Fechar" },
  },
  message: {
    closeButtonAriaLabel: () => "Fechar",
    error: () => "Erro",
    info: () => "Informação",
    success: () => "Sucesso",
    warning: () => "Aviso",
    neutral: () => "Informação",
    ai: () => "Informação gerada por IA",
    callout: () => "Alerta",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `O dia de ${month} deve ser um número entre 1 e ${daysInMonth}.`;
        }
        return "O dia deve ser um número entre 1 e 31.";
      },
      month: () => "O mês deve ser um número entre 1 e 12.",
      year: () => "O ano deve ser um número entre 1800 e 2200.",
    },
    labels: {
      day: () => "Dia",
      month: () => "Mês",
      year: () => "Ano",
    },
  },
  pager: {
    show: () => "Mostrar",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "item" : "itens";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "Primeira",
    last: () => "Última",
    next: () => "Seguinte",
    previous: () => "Anterior",
    pageX: () => "Página",
    ofY: (count) => `de ${count}`,
  },
  password: {
    buttonLabelHide: () => "Ocultar",
    buttonLabelShow: () => "Mostrar",
    ariaLabelHide: () => "Ocultar palavra-passe",
    ariaLabelShow: () => "Mostrar palavra-passe",
    ariaLiveShownMessage: () =>
      "A palavra-passe foi apresentada. Se puder fazê-lo em segurança, concentre-se na área de introdução da palavra-passe para que esta lhe seja lida.",
    ariaLiveHiddenMessage: () => "A palavra-passe está oculta.",
  },
  pill: {
    remove: (label: string) => `Remover ${label}`,
  },
  progressTracker: {
    of: () => "de",
  },
  pod: {
    undo: () => "Anular",
  },
  tabs: {
    error: () => "contém erros",
    warning: () => "contém avisos",
    info: () => "contém informações",
  },
  textEditor: {
    boldAria: () => "Negrito",
    cancelButton: () => "Cancelar",
    cancelButtonAria: () => "Cancelar",
    characterCounter: (count: number | string) => {
      const formattedCount =
        typeof count === "number" ? count.toString() : count;
      return isSingular(count)
        ? `Resta ${formattedCount} caráter`
        : `Restam ${formattedCount} carateres`;
    },
    characterLimit: (count: number) =>
      count === 1
        ? `Ultrapassou o limite em ${count} caráter`
        : `Ultrapassou o limite em ${count} carateres`,
    contentEditorAria: () => "Editor de conteúdo",
    hyperlink: {
      buttonAria: () => "Link",
      cancelButton: () => "Cancelar",
      cancelButtonAria: () => "Cancelar",
      dialogTitle: () => "Adicionar link",
      linkFieldLabel: () => "Link",
      saveButton: () => "Guardar",
      saveButtonAria: () => "Guardar",
      textFieldLabel: () => "Texto",
    },
    typography: {
      selectAria: () => "Tipo de título",
      paragraph: () => "Parágrafo",
      title: () => "Título",
      subtitle: () => "Subtítulo",
      sectionHeader: () => "Cabeçalho da secção",
      sectionSubheader: () => "Subcabeçalho da secção",
    },
    italicAria: () => "Itálico",
    orderedListAria: () => "Lista ordenada",
    saveButton: () => "Guardar",
    saveButtonAria: () => "Guardar",
    toolbarAriaLabel: () => "Formatação",
    underlineAria: () => "Sublinhado",
    unorderedListAria: () => "Lista não ordenada",
    mentions: {
      listAriaLabel: () => "Lista de pessoas que podem ser mencionadas",
    },
  },
  search: {
    searchButtonText: () => "Pesquisar",
  },
  select: {
    actionButtonText: () => "Adicionar novo item",
    placeholder: () => "Selecione...",
    noResultsForTerm: (term) => `Não há resultados para ${term}`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Fechar",
    },
  },
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Ordenar todos os ${sortContent || "itens"}${
        sortType
          ? ` por ordem ${sortType}.`
          : " por ordem ascendente ou descendente."
      }`,
  },
  splitButton: {
    ariaLabel: () => "Mostrar mais",
  },
  stepFlow: {
    stepLabel: (currentStep, totalSteps) =>
      `Passo ${currentStep} de ${totalSteps}`,
    screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
      `${
        category ? `${category}.` : ""
      } ${title}. Passo ${currentStep} de ${totalSteps}.`,
    closeIconAriaLabel: () => "Fechar",
  },
  switch: {
    on: () => "ON",
    off: () => "OFF",
  },
  tileSelect: {
    deselect: () => "Desmarcar",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "h",
    minutesLabelText: () => "min",
    hoursAriaLabelText: () => "Horas",
    minutesAriaLabelText: () => "Minutos",
  },
  toast: {
    ariaLabels: {
      close: () => "Fechar",
    },
    error: () => "Erro",
    info: () => "Informação",
    success: () => "Sucesso",
    warning: () => "Aviso",
    neutral: () => "Informação",
    notification: () => "Notificação",
  },
  verticalMenu: {
    ariaLabels: {
      responsiveMenuLauncher: () => "Arranque da aplicação",
      responsiveMenuCloseButton: () => "Fechar aplicação",
      responsiveMenuAria: () => "Menu da aplicação",
    },
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Fechar",
    },
  },
};

export default ptPT;
