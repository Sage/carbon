import { es as esESDateLocale } from "date-fns/locale/es";

import Locale from "./locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const esES: Partial<Locale> = {
  locale: () => "es-ES",
  actions: {
    edit: () => "Editar",
    delete: () => "Eliminar",
  },
  actionPopover: {
    ariaLabel: () => "acciones",
  },
  advancedColorPicker: {
    ariaLabel: () => "Cambiar color",
    currentColorDescriptionTerm: () => "Color aplicado:",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    ariaLabels: {
      close: () => "Cerrar",
    },
    selected: (count, total) =>
      total
        ? `Elementos seleccionados: ${count} de ${total}`
        : `Elementos seleccionados: ${count}`,
  },
  breadcrumbs: {
    ariaLabel: () => "ruta de navegación",
  },
  confirm: {
    no: () => "No",
    yes: () => "Sí",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `Hay ${formattedCount} carácter de más.`
        : `Hay ${formattedCount} caracteres de más.`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `Queda ${formattedCount} carácter.`
        : `Quedan ${formattedCount} caracteres.`,
    visuallyHiddenHint: (formattedCount) =>
      `Puedes introducir hasta ${formattedCount} caracteres.`,
  },
  date: {
    dateFnsLocale: () => esESDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Mes anterior",
      nextMonthButton: () => "Mes siguiente",
    },
  },
  decimal: {
    ariaLabels: {
      popoverTrigger: () => "Activador del elemento emergente decimal",
      popoverContent: () => "Contenido del elemento emergente decimal",
    },
  },
  dialog: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  dismissibleBox: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings, type) => {
          const errorPlural = isSingular(errors) ? "error" : "errores";
          const warningPlural = isSingular(warnings) ? "aviso" : "avisos";

          if (errors && warnings && type === "warning") {
            return ["y", `${warnings} ${warningPlural}`];
          }
          if (errors) {
            return ["Hay", `${errors} ${errorPlural}`];
          }
          if (warnings) {
            return ["Hay", `${warnings} ${warningPlural}`];
          }
          return null;
        },
    },
  },
  fileInput: {
    dragAndDrop: () => "También los puedes arrastrar hasta aquí.",
    selectFile: () => "Selecciona un archivo",
    fileUploadStatus: () => "Estado de subida de ficheros",
    actions: {
      cancel: () => "Cancelar subida",
      clear: () => "Borrar",
      delete: () => "Eliminar",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Volver",
  },
  link: {
    skipLinkLabel: () => "Ir al contenido principal",
  },
  loader: {
    loading: () => "Cargando...",
  },
  loaderSpinner: {
    loading: () => "Cargando...",
  },
  loaderStar: {
    loading: () => "Cargando...",
  },
  menuFullscreen: {
    ariaLabels: { closeButton: () => "Cerrar" },
  },
  message: {
    closeButtonAriaLabel: () => "Cerrar",
    error: () => "Error",
    info: () => "Información",
    success: () => "Acción realizada",
    warning: () => "Aviso",
    neutral: () => "Información",
    ai: () => "Información generada por IA",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `El día del mes ${month} debe ser un número comprendido entre 1 y ${daysInMonth}.`;
        }
        return "El día debe ser un número comprendido entre 1 y 31.";
      },
      month: () => "El mes debe ser un número comprendido entre 1 y 12.",
      year: () => "El año debe ser un número comprendido entre 1800 y 2200.",
    },
    labels: {
      day: () => "Día",
      month: () => "Mes",
      year: () => "Año",
    },
  },
  pager: {
    firstAriaLabel: () => "Ir a primera página",
    lastAriaLabel: () => "Ir a última página",
    nextAriaLabel: () => "Ir a página siguiente",
    previousAriaLabel: () => "Ir a página anterior",
    pageX: (currentPage?: number | string) => `Página ${currentPage}`,
    ofTotalPages: (totalPages: number | string) => `de ${totalPages} páginas`,
    itemsPerPage: () => "Elementos por página",
    ariaLabel: () => "Paginación",
  },
  password: {
    buttonLabelHide: () => "Ocultar",
    buttonLabelShow: () => "Mostrar",
    ariaLabelHide: () => "Ocultar contraseña",
    ariaLabelShow: () => "Mostrar contraseña",
    ariaLiveShownMessage: () =>
      "Tu contraseña se muestra en pantalla. Si estás en un entorno seguro, coloca el cursor sobre ella para que se te lea en voz alta.",
    ariaLiveHiddenMessage: () => "La contraseña está oculta.",
  },
  progressTracker: {
    of: () => "de",
  },
  pod: {
    undo: () => "Deshacer",
  },
  tabs: {
    error: (tabTitle) => `Hay errores en la pestaña ${tabTitle}`,
    info: (tabTitle) => `Hay información relevante en la pestaña ${tabTitle}`,
    warning: (tabTitle) => `Hay avisos en la pestaña ${tabTitle}`,
  },
  textEditor: {
    boldAria: () => "Negrita",
    cancelButton: () => "Cancelar",
    cancelButtonAria: () => "Cancelar",
    characterCounter(count: number | string) {
      return `Quedan ${typeof count === "number" ? count.toString() : count} caracteres`;
    },
    characterLimit(count: number) {
      return `El límite de ${count} caracteres se ha superado.`;
    },
    contentEditorAria: () => "Editor de contenidos de texto enriquecido",
    italicAria: () => "Cursiva",
    orderedListAria: () => "Lista ordenada",
    saveButton: () => "Guardar",
    saveButtonAria: () => "Guardar",
    toolbarAriaLabel: () => "Formato",
    unorderedListAria: () => "Lista no ordenada",
    hyperlink: {
      buttonAria: () => "Hyperlink",
      cancelButton: () => "Cancel",
      cancelButtonAria: () => "Cancel",
      dialogTitle: () => "Add link",
      formKey: () => "El asterisco (*) indica información obligatoria",
      linkFieldLabel: () => "Dirección de enlace",
      linkFieldErrorMessage: () => "Introduce la dirección del enlace",
      saveButton: () => "Save",
      saveButtonAria: () => "Save",
      textFieldLabel: () => "Texto de enlace",
      textFieldErrorMessage: () => "Introduce el texto del enlace",
    },
    typography: {
      selectAria: () => "Heading type",
      paragraph: () => "Paragraph",
      title: () => "Title",
      subtitle: () => "Subtitle",
      sectionHeader: () => "Section header",
      sectionSubheader: () => "Section subheader",
    },
    underlineAria: () => "Underline",
    mentions: {
      listAriaLabel: () => "List of mentionable people",
    },
  },
  search: {
    searchButtonText: () => "Buscar",
    assistiveHint: () =>
      "Usa las flechas arriba y abajo para explorar las sugerencias de búsqueda y pulsa Intro para seleccionarlas. En pantallas táctiles, toca o desliza el dedo para navegar.",
    queryTooShort: (minQueryLength) =>
      `Escribe al menos ${minQueryLength} caracteres para obtener resultados.`,
    noResults: () => "No se ha encontrado ningún resultado",
    results: (length) => {
      const words = {
        result: length === 1 ? "resultado" : "resultados",
        available: 1 === 1 ? "disponible" : "disponibles",
      };

      return `${length} ${words.result} ${words.available}.`;
    },
  },
  select: {
    actionButtonText: () => "Añadir elemento",
    placeholder: () => "Seleccionar...",
    noResultsForTerm: (term) => `No hay resultados para ${term}.`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Ordenar todos los contenidos ${sortContent && `de tipo ${sortContent}`}${
        sortType
          ? ` según orden ${
              sortType === "ascending" ? "ascendente" : "descendente"
            }.`
          : " según orden ascendente o descendente."
      }`,
  },
  splitButton: {
    ariaLabel: () => "Mostrar más",
  },
  stepFlow: {
    stepLabel: (currentStep, totalSteps) =>
      `Paso ${currentStep} de ${totalSteps}`,
    screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
      `${
        category ? `${category}.` : ""
      } ${title}. Paso ${currentStep} de ${totalSteps}.`,
    closeIconAriaLabel: () => "Cerrar",
  },
  switch: {
    on: () => "SÍ",
    off: () => "NO",
    processingLabel: () => "Procesando",
  },
  tileSelect: {
    deselect: () => "Deseleccionar",
  },
  time: {
    amText: () => "a. m.",
    pmText: () => "p. m.",
    hoursLabelText: () => "h",
    minutesLabelText: () => "min",
    hoursAriaLabelText: () => "Horas",
    minutesAriaLabelText: () => "Minutos",
  },
  toast: {
    ariaLabels: {
      close: () => "Cerrar",
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
      close: () => "Cerrar",
    },
  },
};

export default esES;
