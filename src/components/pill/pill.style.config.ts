interface StyledPillInnerConfigProps {
  varietyColor: string;
  varietyColorAlt: string;
  varietyBorderColor: string;
  buttonFocus: string;
  buttonFocusAlt: string;
  content: string;
  contentAlt: string;
}

interface StyledPillConfig {
  status: {
    grey: StyledPillInnerConfigProps;
    green: StyledPillInnerConfigProps;
    red: StyledPillInnerConfigProps;
    orange: StyledPillInnerConfigProps;
    blue: StyledPillInnerConfigProps;
    purple: StyledPillInnerConfigProps;
    teal: StyledPillInnerConfigProps;
    lime: StyledPillInnerConfigProps;
    pink: StyledPillInnerConfigProps;
    slate: StyledPillInnerConfigProps;
  };
}

export default (inverse: boolean): StyledPillConfig => {
  const content = inverse
    ? "var(--pill-generic-inverse-label-default)"
    : "var(--pill-generic-label-default)";
  const contentAlt = inverse
    ? "var(--pill-generic-inverse-label-alt-default)"
    : "var(--pill-generic-label-alt-default)";

  return {
    status: {
      grey: {
        varietyColor: inverse
          ? "var(--pill-gray-inverse-bg-default)"
          : "var(--pill-gray-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-gray-inverse-bg-alt-default)"
          : "var(--pill-gray-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-gray-inverse-border-default)"
          : "var(--pill-gray-border-default)",
        buttonFocus: inverse
          ? "var(--pill-gray-inverse-bg-hover)"
          : "var(--pill-gray-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-gray-inverse-bg-alt-hover)"
          : "var(--pill-gray-bg-alt-hover)",
        content,
        contentAlt,
      },
      green: {
        varietyColor: inverse
          ? "var(--pill-green-inverse-bg-default)"
          : "var(--pill-green-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-green-inverse-bg-alt-default)"
          : "var(--pill-green-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-green-inverse-border-default)"
          : "var(--pill-green-border-default)",
        buttonFocus: inverse
          ? "var(--pill-green-inverse-bg-hover)"
          : "var(--pill-green-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-green-inverse-bg-alt-hover)"
          : "var(--pill-green-bg-alt-hover)",
        content,
        contentAlt,
      },
      red: {
        varietyColor: inverse
          ? "var(--pill-red-inverse-bg-default)"
          : "var(--pill-red-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-red-inverse-bg-alt-default)"
          : "var(--pill-red-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-red-inverse-border-default)"
          : "var(--pill-red-border-default)",
        buttonFocus: inverse
          ? "var(--pill-red-inverse-bg-hover)"
          : "var(--pill-red-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-red-inverse-bg-alt-hover)"
          : "var(--pill-red-bg-alt-hover)",
        content,
        contentAlt,
      },
      orange: {
        varietyColor: inverse
          ? "var(--pill-orange-inverse-bg-default)"
          : "var(--pill-orange-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-orange-inverse-bg-alt-default)"
          : "var(--pill-orange-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-orange-inverse-border-default)"
          : "var(--pill-orange-border-default)",
        buttonFocus: inverse
          ? "var(--pill-orange-inverse-bg-hover)"
          : "var(--pill-orange-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-orange-inverse-bg-alt-hover)"
          : "var(--pill-orange-bg-alt-hover)",
        content,
        contentAlt,
      },
      blue: {
        varietyColor: inverse
          ? "var(--pill-blue-inverse-bg-default)"
          : "var(--pill-blue-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-blue-inverse-bg-alt-default)"
          : "var(--pill-blue-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-blue-inverse-border-default)"
          : "var(--pill-blue-border-default)",
        buttonFocus: inverse
          ? "var(--pill-blue-inverse-bg-hover)"
          : "var(--pill-blue-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-blue-inverse-bg-alt-hover)"
          : "var(--pill-blue-bg-alt-hover)",
        content,
        contentAlt,
      },
      purple: {
        varietyColor: inverse
          ? "var(--pill-purple-inverse-bg-default)"
          : "var(--pill-purple-bg-default)",
        varietyColorAlt: inverse
          ? "var(--pill-purple-inverse-bg-alt-default)"
          : "var(--pill-purple-bg-alt-default)",
        varietyBorderColor: inverse
          ? "var(--pill-purple-inverse-border-default)"
          : "var(--pill-purple-border-default)",
        buttonFocus: inverse
          ? "var(--pill-purple-inverse-bg-hover)"
          : "var(--pill-purple-bg-hover)",
        buttonFocusAlt: inverse
          ? "var(--pill-purple-inverse-bg-alt-hover)"
          : "var(--pill-purple-bg-alt-hover)",
        content,
        contentAlt,
      },
      // Custom swatches — no inverse tokens available
      teal: {
        varietyColor: "var(--pill-teal-bg-default)",
        varietyColorAlt: "var(--pill-teal-bg-alt-default)",
        varietyBorderColor: "var(--pill-teal-border-default)",
        buttonFocus: "var(--pill-teal-bg-hover)",
        buttonFocusAlt: "var(--pill-teal-bg-alt-hover)",
        content,
        contentAlt,
      },
      lime: {
        varietyColor: "var(--pill-lime-bg-default)",
        varietyColorAlt: "var(--pill-lime-bg-alt-default)",
        varietyBorderColor: "var(--pill-lime-border-default)",
        buttonFocus: "var(--pill-lime-bg-hover)",
        buttonFocusAlt: "var(--pill-lime-bg-alt-hover)",
        content,
        contentAlt,
      },
      pink: {
        varietyColor: "var(--pill-pink-bg-default)",
        varietyColorAlt: "var(--pill-pink-bg-alt-default)",
        varietyBorderColor: "var(--pill-pink-border-default)",
        buttonFocus: "var(--pill-pink-bg-hover)",
        buttonFocusAlt: "var(--pill-pink-bg-alt-hover)",
        content,
        contentAlt,
      },
      slate: {
        varietyColor: "var(--pill-slate-bg-default)",
        varietyColorAlt: "var(--pill-slate-bg-alt-default)",
        varietyBorderColor: "var(--pill-slate-border-default)",
        buttonFocus: "var(--pill-slate-bg-hover)",
        buttonFocusAlt: "var(--pill-slate-bg-alt-hover)",
        content,
        contentAlt,
      },
    },
  };
};
