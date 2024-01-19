import { PolishPlurals } from "./pl-pl";

describe("PolishPlural function checks", () => {
  it("if value is 1 singularNominativ is returned", () => {
    const count = 1;
    const test = PolishPlurals("znak", "znaki", "znaków", count);
    expect(test).toBe("znak");
  });

  it.each([2, 3, 4, 22, 23, 24])(
    "if value is %s pluralNominativ is returned",
    (count) => {
      const test = PolishPlurals("znak", "znaki", "znaków", count);
      expect(test).toBe("znaki");
    }
  );

  it.each([5, 6, 7, 8, 9, 10])(
    "if value is %s pluralGenitive is returned",
    (count) => {
      const test = PolishPlurals("znak", "znaki", "znaków", count);
      expect(test).toBe("znaków");
    }
  );
});
