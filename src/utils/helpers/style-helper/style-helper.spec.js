import { isClassic, isDLS } from ".";
import { classicTheme, carbonThemeList } from "../../../style/themes";

describe("when isClassic is called", () => {
  describe("with classic theme as an argument", () => {
    it("then the function should return true", () => {
      expect(isClassic(classicTheme)).toEqual(true);
    });
  });

  describe.each(carbonThemeList.map((theme) => [theme.name, theme]))(
    "with %s theme as an argument",
    (themeName, theme) => {
      it("then the function should return false", () => {
        expect(isClassic(theme)).toEqual(false);
      });
    }
  );
});

describe("when isDLS is called", () => {
  describe("with classic theme as an argument", () => {
    it("then the function should return false", () => {
      expect(isDLS(classicTheme)).toEqual(false);
    });
  });

  describe.each(carbonThemeList.map((theme) => [theme.name, theme]))(
    "with %s theme as an argument",
    (themeName, theme) => {
      it("then the function should return true", () => {
        expect(isDLS(theme)).toEqual(true);
      });
    }
  );
});
