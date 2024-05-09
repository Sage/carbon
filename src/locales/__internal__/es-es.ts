import esDateLocale from "date-fns/locale/es";
import Locale from "../locale";

const isSingular = (count: string | number): boolean =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const esES: Locale = {
  locale: () => "es-ES",
  actions: {
    edit: () => "Editar",
    delete: () => "Borrar",
  },
  actionPopover: {
    ariaLabel: () => "acciones",
  },
  advancedColorPicker: {
    ariaLabel: () => "Cambiar color",
    currentColorDescriptionTerm: () => "Color asignado: ",
    currentColorAssigned: (currentColor) => currentColor,
  },
  batchSelection: {
    selected: (count) => `${count} seleccionados`,
  },
  breadcrumbs: {
    ariaLabel: () => "ruta de navegación",
  },
  confirm: {
    no: () => "No",
    yes: () => "Si",
  },
  characterCount: {
    tooManyCharacters: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} carácter de más`
        : `${formattedCount} caracteres de más`,
    charactersLeft: (count, formattedCount) =>
      count === 1
        ? `${formattedCount} carácter restante`
        : `${formattedCount} caracteres restantes`,
    visuallyHiddenHint: (formattedCount) =>
      `Puede introducir hasta ${formattedCount} caracteres`,
  },
  date: {
    dateFnsLocale: () => esDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Mes anterior",
      nextMonthButton: () => "Próximo mes",
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
          const warningPlural = isSingular(warnings)
            ? "advertencia"
            : "advertencias";

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
    dragAndDrop: () => "o arrastre y suelte su arichivo aquí",
    selectFile: () => "Seleccionar archivo",
    fileUploadStatus: () => "Estado de carga del archivo",
    actions: {
      cancel: () => "Cancelar carga",
      clear: () => "Quitar",
      delete: () => "Borrar archivo",
    },
  },
  heading: {
    backLinkAriaLabel: () => "Atrás",
  },
  link: {
    skipLinkLabel: () => "Saltar al contenido principal",
  },
  loader: {
    loading: () => "Cargando",
  },
  loaderSpinner: {
    loading: () => "Cargando...",
  },
  menuFullscreen: {
    ariaLabels: {
      closeButton: () => "Cerrar",
    },
  },
  message: {
    closeButtonAriaLabel: () => "Cerrar",
  },
  numeralDate: {
    validation: {
      day: (month, daysInMonth) => {
        if (month && daysInMonth) {
          return `El día en ${month} debe ser un número entre 1-${daysInMonth}.`;
        }
        return "El día debe ser un número entre 1-31.";
      },
      month: () => "El mes debe ser un número entre 1-12.",
      year: () => "El año debe ser un número entre 1800-2200.",
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
      "Se ha mostrado su contraseña. Enfoque el campo de contraseña para que sea leida, si es seguro hacerlo.",
    ariaLiveHiddenMessage: () => "Su contraseña esta oculta.",
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
    actionButtonText: () => "Añadir un nuevo elemento",
    placeholder: () => "Por favor seleccione...",
    noResultsForTerm: (term) => `No hay resultados para "${term}"`,
  },
  sidebar: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  sort: {
    accessibleName: (sortContent, sortType) =>
      `Ordenar todo ${sortContent || "contenido"}${
        sortType
          ? ` en orden ${
              sortType === "ascending" ? "ascendente" : "descendente"
            }.`
          : " en orden ascendente o descendente."
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
    on: () => "ON",
    off: () => "OFF",
  },
  textEditor: {
    tooltipMessages: {
      bold: () => "Negrita",
      italic: () => "Itálica",
      bulletList: () => "Lista con viñetas",
      numberList: () => "Lista numerada",
    },
    ariaLabels: {
      bold: () => "negrita",
      italic: () => "itálica",
      bulletList: () => "lista con viñetas",
      numberList: () => "lista numerada",
    },
  },
  tileSelect: {
    deselect: () => "Deseleccionar",
  },
  time: {
    amText: () => "AM",
    pmText: () => "PM",
    hoursLabelText: () => "Hrs.",
    minutesLabelText: () => "Mins.",
    hoursAriaLabelText: () => "Horas",
    minutesAriaLabelText: () => "Minutos",
  },
  toast: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
  verticalMenuFullScreen: {
    ariaLabels: {
      close: () => "Cerrar",
    },
  },
};

export default esES;
