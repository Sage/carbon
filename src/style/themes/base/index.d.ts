import { Palette } from "../../palette";

export interface ColorsWithHex {
  [key: string]: string;
}

type BasePalette = Palette &
  ColorsWithHex & {
    blackOpacity: (opacity: number) => string;
    whiteOpacity: (opacity: number) => string;
  };

export interface Colors {
  base: string;
  primary: string;
  secondary: string;
  tertiary: string;
  brand: string;
  disabled: string;
  whiteMix: string;
  withOpacity: string;

  // generic
  black: "#000000";
  slate: "#003349";
  white: "#FFFFFF";

  // element
  border: string;
  dashedBorder: string;
  dashedButtonText: string;
  dashedHoverBackground: string;
  focusedIcon: string;
  focusedLinkBackground: string;
  previewBackground: string;
  hoveredTabKeyline: string;

  // status
  error: string;
  focus: string;
  info: string;
  success: string;
  warning: string;
  destructive: {
    hover: string;
  };
  asterisk: string;
}

export interface ThemeObject {
  name: string;
  palette: BasePalette;
  spacing: number;
  space: number[];

  colors: Colors;

  anchorNavigation: {
    divider: string;
    navItemHoverBackground: string;
  };

  accordion: {
    border: string;
    background: string;
  };

  tileSelect: {
    border: string;
    disabledBackground: string;
    hoverBackground: string;
    descriptionColor: string;
    disabledText: string;
  };

  batchSelection: {
    lightTheme: string;
  };

  hr: {
    background: string;
  };

  editor: {
    border: string;
    counter: string;
    placeholder: string;
    button: {
      hover: string;
    };
    toolbar: {
      background: string;
    };
  };

  menu: {
    focus: string;
    divider: string;
    itemColor: string;
    itemColorDisabled: string;

    light: {
      background: string;
      selected: string;
      divider: string;
      title: string;
    };

    dark: {
      divider: string;
      submenuBackground: string;
      selected: string;
      title: string;
      searchIcon: string;
      searchIconHover: string;
    };
  };

  form: {
    invalid: string;
  };

  card: {
    footerBackground: string;
    footerBorder: string;
  };

  carousel: {
    activeSelectorBackground: string;
    inactiveSelectorBackground: string;
  };

  flatTable: {
    light: {
      headerBackground: string;
      border: string;
    };

    dark: {
      headerBackground: string;
      border: string;
    };

    subRow: {
      background: string;
      shadow: string;
    };

    transparentWhite: {
      headerBackground: string;
      border: string;
    };

    transparentBase: {
      headerBackground: string;
      border: string;
    };

    drawerSidebar: {
      headerBackground: string;
      hover: string;
      highlighted: string;
      selected: string;
    };

    hover: string;
    headerIconColor: string;
    selected: string;
    highlighted: string;
  };

  help: {
    color: string;
    hover: string;
  };

  pod: {
    border: string;
    secondaryBackground: string;
    tertiaryBackground: string;
    tileBackground: string;
    footerBackground: string;
    hoverBackground: string;
  };

  text: {
    color: string;
    placeholder: string;
    size: string;
  };

  readOnly: {
    textboxBackground: string;
    textboxBorder: string;
    textboxText: string;
  };

  content: {
    secondaryColor: string;
  };

  definitionList: {
    dtTextDark: string;
    dtTextLight: string;
    ddText: string;
  };

  disabled: {
    border: string;
    button: string;
    disabled: string;
    input: string;
    text: string;
    buttonText: string;
    background: string;
    switch: string;
  };

  draggableItem: {
    border: string;
  };

  checkable: {
    checked: string;
  };

  table: {
    primary: string;
    secondary: string;
    tertiary: string;
    header: string;
    hover: string;
    selected: string;
    zebra: string;
    dragging: string;
  };

  drawer: {
    background: string;
    divider: string;
  };

  pager: {
    active: string;
    disabled: string;
    alternate: string;
  };

  icon: {
    default: string;
    defaultHover: string;
    onLightBackground: string;
    onLightBackgroundHover: string;
    disabled: string;
  };

  popoverContainer: {
    iconColor: string;
  };

  navigationBar: {
    light: {
      background: string;
      borderBottom: string;
    };

    dark: {
      background: string;
      borderBottom: string;
    };
  };

  numeralDate: {
    passive: string;
    error: string;
  };

  portrait: {
    border: string;
    background: string;
    initials: string;
  };

  picklist: {
    locked: string;
    lockedContent: string;
    lockedText: string;
  };

  pill: {
    neutral: string;
    warning: string;
    neutralBackgroundFocus: string;
    warningButtonFocus: string;
    errorButtonFocus: string;
  };

  scrollbar: {
    light: {
      thumb: string;
      track: string;
    };

    dark: {
      thumb: string;
      track: string;
    };
  };

  search: {
    active: string;
    button: string;
    passive: string;
    icon: string;
    iconHover: string;
    searchActive: string;
    darkVariantPlaceholder: string;
    darkVariantBorder: string;
    darkVariantText: string;
    iconDarkVariant: string;
    iconDarkVariantHover: string;
  };

  select: {
    border: string;
    selected: string;
    optionHeader: string;
    tableHeaderBorder: string;
  };

  shadows: {
    depth1: string;
    depth2: string;
    depth3: string;
    depth4: string;
    cards: string;
    cardsIE: string;
  };

  switch: {
    off: string;
  };

  tile: {
    border: string;
    footerBackground: string;
    separator: string;
  };

  tab: {
    background: string;
    altHover: string;
  };

  note: {
    timeStamp: string;
  };

  zIndex: {
    smallOverlay: number;
    overlay: number;
    popover: number;
    modal: number;
    header: number;
    fullScreenModal: number;
    notification: number;
    aboveAll: number;
  };
}

declare const baseTheme: ThemeObject;

declare function mergeWithBase(configureTheme: ThemeObject): ThemeObject;

export default baseTheme;
export { mergeWithBase };
