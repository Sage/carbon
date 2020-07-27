export default (palette) => {
  const { atOpacity } = palette,

      blackWithOpacity = atOpacity('#000000'),
      baseWithOpacity = atOpacity(palette.productGreen);

  return {
    name: 'base',

    spacing: 8,

    colors: {
      // main
      base: palette.productGreen,
      primary: palette.genericGreenTint(15),
      secondary: palette.genericGreenShade(35),
      tertiary: palette.genericGreenShade(55),
      brand: palette.brilliantGreen,
      disabled: palette.genericGreenTint(40),
      whiteMix: palette.genericGreenTint(90),
      withOpacity: baseWithOpacity(0.55),

      // generic
      black: '#000000',
      slate: '#003349',
      white: '#FFFFFF',

      // element
      border: palette.slateTint(40),
      dashedBorder: '#99ADB6',
      dashedButtonText: 'rgba(0, 0, 0, 0.9)',
      dashedHoverBackground: '#CCD6DB',
      focusedIcon: palette.slateTint(20),
      focusedLinkBackground: palette.goldTint(50),
      previewBackground: palette.slateTint(75),
      hoveredTabKeyline: palette.genericGreenTint(30),

      // status
      error: palette.errorRed,
      focus: palette.gold,
      info: palette.productBlueShade(3),
      success: palette.brilliantGreenShade(20),
      warning: palette.carrotOrange,
      destructive: {
        hover: palette.errorRedShade(20)
      }
    },

    anchorNavigation: {
      divider: palette.slateTint(80),
      navItemHoverBackground: palette.slateTint(90)
    },

    accordion: {
      border: palette.slateTint(80),
      background: palette.slateTint(90)
    },

    tileSelect: {
      border: palette.slateTint(75),
      disabledBackground: palette.slateTint(90),
      hoverBackground: palette.slateTint(95),
      descriptionColor: blackWithOpacity(0.55),
      disabledText: blackWithOpacity(0.3)
    },

    batchSelection: {
      lightTheme: palette.slateTint(70)
    },

    hr: {
      background: palette.slateTint(80)
    },

    editor: {
      border: palette.slateTint(40),
      counter: 'rgba(0,0,0,0.55)',
      placeholder: 'rgba(0,0,0,0.30)',
      button: {
        hover: palette.slateTint(80)
      },
      toolbar: {
        background: palette.slateTint(95)
      }
    },

    menu: {
      focus: palette.slateTint(95),
      divider: palette.slateTint(90),
      itemColor: blackWithOpacity(0.9),
      itemColorDisabled: blackWithOpacity(0.3),

      light: {
        background: palette.slateTint(90),
        selected: palette.slateTint(85),
        divider: palette.slateTint(80)
      },

      dark: {
        divider: palette.slateTint(10),
        submenuBackground: palette.slateShade(50),
        selected: palette.slateTint(10)
      }
    },

    form: {
      invalid: palette.slateTint(95)
    },

    card: {
      footerBackground: palette.slateTint(95),
      footerBorder: palette.slateTint(90)
    },

    carousel: {
      activeSelectorBackground: palette.slateTint(40),
      inactiveSelectorBackground: palette.slateTint(80)
    },

    flatTable: {
      light: {
        headerBackground: palette.slateTint(80),
        border: palette.slateTint(70)
      },

      dark: {
        headerBackground: palette.slateTint(20),
        border: palette.slateTint(40)
      },

      transparentWhite: {
        headerBackground: '#fff',
        border: '#fff'
      },

      transparentBase: {
        headerBackground: palette.slateTint(95),
        border: palette.slateTint(95)
      },

      drawerSidebar: {
        headerBackground: palette.slateTint(93),
        hover: palette.slateTint(85),
        highlighted: palette.slateTint(80),
        selected: palette.slateTint(70)
      },

      hover: palette.slateTint(95),
      headerIconColor: palette.slateTint(60),
      selected: palette.slateTint(85),
      highlighted: palette.slateTint(90)
    },

    help: {
      color: blackWithOpacity(0.65),
      hover: blackWithOpacity(0.9)
    },

    pod: {
      border: palette.slateTint(80),
      secondaryBackground: palette.slateTint(95),
      tertiaryBackground: palette.slateTint(90),
      tileBackground: '#FFFFFF',
      footerBackground: palette.slateTint(95),
      hoverBackground: palette.slateTint(85)
    },

    text: {
      color: blackWithOpacity(0.9),
      placeholder: blackWithOpacity(0.3),
      size: '14px'
    },

    readOnly: {
      textboxBackground: palette.slateTint(98),
      textboxBorder: palette.slateTint(80),
      textboxText: blackWithOpacity(0.74)
    },

    disabled: {
      border: palette.slateTint(80),
      button: palette.slateTint(90),
      disabled: blackWithOpacity(0.55),
      input: palette.slateTint(95),
      text: blackWithOpacity(0.3),
      buttonText: 'rgba(0,0,0,.2)',
      background: palette.slateTint(90),
      switch: palette.slateTint(89.5)
    },

    draggableItem: {
      border: palette.slateTint(90)
    },

    checkable: {
      checked: 'rgba(0,0,0,0.90)'
    },

    table: {
      primary: palette.slateTint(95),
      secondary: palette.slateTint(80),
      tertiary: palette.slateTint(10),
      header: palette.slateTint(20),
      hover: palette.slateTint(90),
      selected: palette.slateTint(85),
      zebra: palette.slateTint(98),
      dragging: palette.slateTint(90)
    },

    drawer: {
      background: palette.slateTint(93),
      divider: palette.slateTint(85)
    },

    pager: {
      active: 'rgba(0,0,0,0.90)',
      disabled: 'rgba(0,0,0,0.3)'
    },

    icon: {
      default: 'rgba(0,0,0,0.65)',
      defaultHover: 'rgba(0,0,0,0.90)',
      onLightBackground: palette.slateTint(40),
      onLightBackgroundHover: palette.slateTint(20),
      disabled: 'rgba(0,0,0,0.30)'
    },

    popoverContainer: {
      iconColor: 'rgba(0,0,0,0.90)'
    },

    navigationBar: {
      light: {
        background: palette.slateTint(90),
        borderBottom: palette.slateTint(85)
      },

      dark: {
        background: '#003349',
        borderBottom: '#003349'
      }
    },

    numeralDate: {
      passive: '#668592',
      error: '#C7384F'
    },

    portrait: {
      border: palette.slateTint(50),
      background: palette.slateTint(95),
      initials: 'rgba(0,0,0,0.65)'
    },

    pill: {
      neutral: palette.slateTint(30),
      warning: palette.carrotOrangeTint(20),
      neutralBackgroundFocus: palette.slateTint(10),
      warningButtonFocus: palette.carrotOrange,
      errorButtonFocus: palette.errorRedShade(20)
    },

    search: {
      active: palette.goldTint(50),
      button: '#255BC7',
      passive: palette.slateTint(80),
      searchActive: '#668592'
    },

    select: {
      border: '#bfccd2',
      selected: palette.slateTint(95)
    },

    shadows: {
      depth1: '0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1)',
      depth2: '0 10px 20px 0 rgba(0,20,29,0.2), 0 20px 40px 0 rgba(0,20,29,0.1)',
      depth3: '0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1)',
      depth4: '0 10px 40px 0 rgba(0,20,29,0.04), 0 50px 80px 0 rgba(0,20,29,0.1)',
      /* no space after comma as it is stripped from the variable when used in the spec */
      cards: '0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15)',
      cardsIE: '0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15), 0 0 1px 0 rgba(0,20,29,0.15)'
    },

    switch: {
      off: '#CCD6DB'
    },

    tile: {
      border: palette.slateTint(80),
      separator: palette.slateTint(90)
    },

    note: {
      timeStamp: 'rgba(0,0,0,0.65)'
    },

    zIndex: {
      overlay: 1000,
      popover: 2000,
      modal: 3000,
      header: 4000,
      fullScreenModal: 5000,
      notification: 6000
    }
  };
};
