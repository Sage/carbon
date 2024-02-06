interface StyledPillInnerConfigProps {
  varietyColor: string;
  buttonFocus: string;
  content: string;
}

interface StyledPillConfig {
  status: {
    neutral: StyledPillInnerConfigProps;
    negative: StyledPillInnerConfigProps;
    warning: StyledPillInnerConfigProps;
    positive: StyledPillInnerConfigProps;
    information: StyledPillInnerConfigProps;
    neutralWhite: StyledPillInnerConfigProps;
  };
  tag: {
    primary: StyledPillInnerConfigProps;
  };
}

export default (isDarkBackground: boolean): StyledPillConfig => {
  return {
    status: {
      neutral: {
        varietyColor: isDarkBackground
          ? "var(--colorsSemanticNeutral400)"
          : "var(--colorsSemanticNeutral500)",
        buttonFocus: isDarkBackground
          ? "var(--colorsSemanticNeutral500)"
          : "var(--colorsSemanticNeutral600)",
        content: isDarkBackground
          ? "var(--colorsSemanticNeutralYin090)"
          : "var(--colorsSemanticNeutralYang100)",
      },
      negative: {
        varietyColor: isDarkBackground
          ? "var(--colorsSemanticNegative450)"
          : "var(--colorsSemanticNegative500)",
        buttonFocus: isDarkBackground
          ? "var(--colorsSemanticNegative500)"
          : "var(--colorsSemanticNegative600)",
        content: isDarkBackground
          ? "var(--colorsSemanticNegativeYin090)"
          : "var(--colorsSemanticNegativeYang100)",
      },
      warning: {
        varietyColor: "var(--colorsSemanticCaution400)",
        buttonFocus: "var(--colorsSemanticCaution600)",
        content: "var(--colorsSemanticCautionYin090)",
      },
      positive: {
        varietyColor: isDarkBackground
          ? "var(--colorsSemanticPositive400)"
          : "var(--colorsSemanticPositive500)",
        buttonFocus: isDarkBackground
          ? "var(--colorsSemanticPositive500)"
          : "var(--colorsSemanticPositive600)",
        content: isDarkBackground
          ? "var(--colorsSemanticPositiveYin090)"
          : "var(--colorsSemanticPositiveYang100)",
      },
      information: {
        varietyColor: isDarkBackground
          ? "var(--colorsSemanticInfo400)"
          : "var(--colorsSemanticInfo500)",
        buttonFocus: isDarkBackground
          ? "var(--colorsSemanticInfo500)"
          : "var(--colorsSemanticInfo600)",
        content: isDarkBackground
          ? "var(--colorsSemanticInfoYin090)"
          : "var(--colorsSemanticInfoYang100)",
      },
      neutralWhite: {
        varietyColor: "var(--colorsSemanticNeutralYang100)",
        buttonFocus: "var(--colorsSemanticNeutralYin030)",
        content: "var(--colorsSemanticNeutral500)",
      },
    },
    tag: {
      primary: {
        varietyColor: "var(--colorsActionMajor500)",
        buttonFocus: "var(--colorsActionMajor600)",
        content: "var(--colorsActionMajorYang100)",
      },
    },
  };
};
