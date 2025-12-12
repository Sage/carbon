import getIconColor from "./utils";

describe("getIconColor", () => {
  describe("when inverse = true", () => {
    it("returns #000 when variantType is primary", () => {
      expect(
        getIconColor({
          inverse: true,
          variant: undefined,
          variantType: "primary",
          disabled: false,
        }),
      ).toBe("#000");
    });

    it("returns rgba(255, 255, 255, 0.42) when disabled", () => {
      expect(
        getIconColor({
          inverse: true,
          variant: undefined,
          variantType: undefined,
          disabled: true,
        }),
      ).toBe("rgba(255, 255, 255, 0.42)");
    });

    it("returns #FFF otherwise", () => {
      expect(
        getIconColor({
          inverse: true,
          variant: undefined,
          variantType: undefined,
          disabled: false,
        }),
      ).toBe("#FFF");
    });
  });

  describe("when inverse = false", () => {
    describe("variant = ai", () => {
      it("returns disabled ai label color", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: "gradient",
            variantType: undefined,
            disabled: true,
          }),
        ).toBe("var(--button-ai-label-disabled, #0000006B)");
      });

      it("returns active ai label color", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: "gradient",
            variantType: undefined,
            disabled: false,
          }),
        ).toBe("var(--button-ai-label-active, #000)");
      });
    });

    describe("variantType = primary", () => {
      it("returns typical primary label color", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: undefined,
            variantType: "primary",
            disabled: false,
          }),
        ).toBe("var(--button-typical-primary-label-default, #FFF)");
      });
    });

    describe("variant = destructive", () => {
      it("returns disabled destructive secondary label", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: "destructive",
            variantType: undefined,
            disabled: true,
          }),
        ).toBe(
          "var(--button-destructive-secondary-label-disabled, rgba(0, 0, 0, 0.42))",
        );
      });

      it("returns default destructive secondary label", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: "destructive",
            variantType: undefined,
            disabled: false,
          }),
        ).toBe("var(--button-destructive-secondary-label-default, #DB004E)");
      });
    });

    describe("fallback (typical secondary)", () => {
      it("returns disabled typical secondary label", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: undefined,
            variantType: undefined,
            disabled: true,
          }),
        ).toBe("var(--button-typical-secondary-label-disabled, #0000006B)");
      });

      it("returns active typical secondary label", () => {
        expect(
          getIconColor({
            inverse: false,
            variant: undefined,
            variantType: undefined,
            disabled: false,
          }),
        ).toBe("var(--button-typical--secondary-label-active, #000)");
      });
    });
  });
});
