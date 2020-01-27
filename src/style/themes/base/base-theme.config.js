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

    menu: {
      focus: palette.slateTint(95),
      divider: palette.slateTint(90),
      itemColor: blackWithOpacity(0.9),
      itemColorDisabled: blackWithOpacity(0.3)
    },

    form: {
      invalid: palette.slateTint(95)
    },

    card: {
      footerBackground: palette.slateTint(95),
      footerBorder: palette.slateTint(90),
      footerText: palette.productGreenShade(21)
    },

    carousel: {
      activeSelectorBackground: palette.slateTint(40),
      inactiveSelectorBackground: palette.slateTint(80)
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

    pager: {
      active: 'rgba(0,0,0,0.74)',
      disabled: 'rgba(0,0,0,0.55)',
      hover: 'rgba(0,0,0,0.90)'
    },

    rainbow: {
      textColor: '#003349'
    },

    icon: {
      default: 'rgba(0,0,0,0.65)',
      defaultHover: 'rgba(0,0,0,0.90)',
      onLightBackground: palette.slateTint(40),
      onLightBackgroundHover: palette.slateTint(20),
      disabled: 'rgba(0,0,0,0.30)'
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
    }
  };
};
