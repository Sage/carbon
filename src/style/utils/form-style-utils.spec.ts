import {
  calculateWidthValue,
  calculateFormSpacingValues,
} from "./form-style-utils";
import {
  HORIZONTAL_PADDING,
  CONTENT_TOP_PADDING,
  CONTENT_BOTTOM_PADDING,
} from "../../components/dialog/dialog.config";
import {
  SIDEBAR_TOP_SPACING,
  SIDEBAR_BOTTOM_SPACING,
  SIDEBAR_LEFT_PADDING,
  SIDEBAR_RIGHT_PADDING,
} from "../../components/sidebar/sidebar.config";

describe("calculateWidthValue", () => {
  it("adds padding-left and padding-right values to the width when both are supplied", () => {
    const padding = { pl: "20px", pr: "30px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (20px + 30px));");
  });

  it("adds padding-left and the default horizontal padding to the width when padding-left is supplied but not padding-right", () => {
    const padding = { pl: "20px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe(
      `width: calc(100% + (20px + ${HORIZONTAL_PADDING}px));`
    );
  });

  it("adds padding-right and the default horizontal padding to the width when padding-right is supplied but not padding-left", () => {
    const padding = { pr: "30px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe(
      `width: calc(100% + (${HORIZONTAL_PADDING}px + 30px));`
    );
  });

  it("adds the default horizontal padding to the width twice when neither padding-left or padding-right is supplied", () => {
    const padding = {};
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe(
      `width: calc(100% + (${HORIZONTAL_PADDING}px + ${HORIZONTAL_PADDING}px));`
    );
  });

  it("adds the appropriate value twice to the width when padding is given as a 1-value string", () => {
    const padding = { p: "20px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (20px + 20px));");
  });

  it("adds the appropriate value twice to the width when padding is given as a 2-value string", () => {
    const padding = { p: "20px 30px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (30px + 30px));");
  });

  it("adds the appropriate value twice to the width when padding is given as a 3-value string", () => {
    const padding = { p: "20px 30px 40px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (30px + 30px));");
  });

  it("adds the two appropriate values to the width when padding is given as a 4-value string", () => {
    const padding = { p: "20px 30px 40px 50px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (50px + 30px));");
  });

  it("gives priority to left/right padding values when these are supplied along with an overall padding string", () => {
    const padding = { p: "40px", pl: "20px", pr: "30px" };
    const computedWidth = calculateWidthValue(padding);
    expect(computedWidth).toBe("width: calc(100% + (20px + 30px));");
  });
});

describe("calculateFormSpacingValues", () => {
  describe("when used for form content in a dialog", () => {
    it("adds padding to all sides and negative margin to all except bottom", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": "40px",
        "padding-bottom": "50px",
      });
    });

    it("adds appropriate padding and margin when padding is specified as a complex CSS string", () => {
      const padding = { p: "40px 30px 50px 20px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": "40px",
        "padding-bottom": "50px",
      });
    });

    it("uses the default top spacing if no top padding is specified", () => {
      const padding = { pl: "20px", pr: "30px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": `calc(-1 * ${CONTENT_TOP_PADDING}px)`,
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": `${CONTENT_TOP_PADDING}px`,
        "padding-bottom": "50px",
      });
    });

    it("uses the default bottom spacing if no bottom padding is specified", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": "40px",
        "padding-bottom": `${CONTENT_BOTTOM_PADDING}px`,
      });
    });

    it("uses the default horizontal spacing if no left padding is specified", () => {
      const padding = { pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": `${HORIZONTAL_PADDING}px`,
        "padding-right": "30px",
        "padding-top": "40px",
        "padding-bottom": "50px",
      });
    });

    it("uses the default horizontal spacing if no right padding is specified", () => {
      const padding = { pl: "20px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": `${HORIZONTAL_PADDING}px`,
        "padding-top": "40px",
        "padding-bottom": "50px",
      });
    });
  });

  describe("when used for form content in a sidebar", () => {
    it("adds padding negative margin to all sides except bottom", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": "40px",
      });
    });

    it("adds appropriate padding and margin when padding is specified as a complex CSS string", () => {
      const padding = { p: "40px 30px 50px 20px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": "40px",
      });
    });

    it("uses the default top spacing if no top padding is specified", () => {
      const padding = { pl: "20px", pr: "30px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-top": `calc(-1 * ${SIDEBAR_TOP_SPACING})`,
        "padding-left": "20px",
        "padding-right": "30px",
        "padding-top": SIDEBAR_TOP_SPACING,
      });
    });

    it("uses the default horizontal spacing if no left padding is specified", () => {
      const padding = { pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-right": "calc(-1 * 30px)",
        "margin-top": "calc(-1 * 40px)",
        "padding-left": `${HORIZONTAL_PADDING}px`,
        "padding-right": "30px",
        "padding-top": "40px",
      });
    });

    it("uses the default horizontal spacing if no right padding is specified", () => {
      const padding = { pl: "20px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        true,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-top": "calc(-1 * 40px)",
        "padding-left": "20px",
        "padding-right": `${HORIZONTAL_PADDING}px`,
        "padding-top": "40px",
      });
    });
  });

  describe("when used for form footer in a dialog", () => {
    it("adds negative margin to all sides except top but no padding", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
      });
    });

    it("adds appropriate padding and margin when padding is specified as a complex CSS string", () => {
      const padding = { p: "40px 30px 50px 20px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
      });
    });

    it("uses the default bottom spacing if no bottom padding is specified", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": `calc(-1 * ${CONTENT_BOTTOM_PADDING}px)`,
      });
    });

    it("uses the default horizontal spacing if no left padding is specified", () => {
      const padding = { pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
      });
    });

    it("uses the default horizontal spacing if no right padding is specified", () => {
      const padding = { pl: "20px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "dialog"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-bottom": "calc(-1 * 50px)",
      });
    });
  });

  describe("when used for form footer in a sidebar", () => {
    it("adds negative margin to left and bottom and the default horizontal padding", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
        ":not(.padded)": {
          "padding-left": SIDEBAR_LEFT_PADDING,
          "padding-right": SIDEBAR_RIGHT_PADDING,
        },
      });
    });

    it("adds appropriate padding and margin when padding is specified as a complex CSS string", () => {
      const padding = { p: "40px 30px 50px 20px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
        ":not(.padded)": {
          "padding-left": SIDEBAR_LEFT_PADDING,
          "padding-right": SIDEBAR_RIGHT_PADDING,
        },
      });
    });

    it("uses the default bottom spacing if no bottom padding is specified", () => {
      const padding = { pl: "20px", pr: "30px", pt: "40px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": `calc(-1 * ${SIDEBAR_BOTTOM_SPACING})`,
        ":not(.padded)": {
          "padding-left": SIDEBAR_LEFT_PADDING,
          "padding-right": SIDEBAR_RIGHT_PADDING,
        },
      });
    });

    it("uses the default left margin if no left padding is specified", () => {
      const padding = { pr: "30px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-right": "calc(-1 * 30px)",
        "margin-bottom": "calc(-1 * 50px)",
        ":not(.padded)": {
          "padding-left": SIDEBAR_LEFT_PADDING,
          "padding-right": SIDEBAR_RIGHT_PADDING,
        },
      });
    });

    it("uses the default right margin if no right padding is specified", () => {
      const padding = { pl: "20px", pt: "40px", pb: "50px" };
      const computedSpacing = calculateFormSpacingValues(
        padding,
        false,
        "sidebar"
      );
      expect(computedSpacing).toEqual({
        "margin-left": "calc(-1 * 20px)",
        "margin-right": `calc(-1 * ${HORIZONTAL_PADDING}px)`,
        "margin-bottom": "calc(-1 * 50px)",
        ":not(.padded)": {
          "padding-left": SIDEBAR_LEFT_PADDING,
          "padding-right": SIDEBAR_RIGHT_PADDING,
        },
      });
    });
  });
});
