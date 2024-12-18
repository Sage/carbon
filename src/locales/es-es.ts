import esESDateLocale from "date-fns/locale/es";

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
    selected: (count) => `Registros seleccionados: ${count}`,
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
  dialog: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  dialogFullScreen: {
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
    show: () => "Mostrar",
    records: (count, showNumber = true) => {
      const noun = isSingular(count) ? "elemento" : "elementos";
      return showNumber ? `${count} ${noun}` : noun;
    },
    first: () => "Primera",
    last: () => "Última",
    next: () => "Siguiente",
    previous: () => "Anterior",
    pageX: () => "Página",
    ofY: (count) => `de ${count}`,
  },
  password: {
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
  search: {
    searchButtonText: () => "Buscar",
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
