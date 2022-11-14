import { generateGroups } from "./grouped-character.utils";

describe("generateGroups", () => {
  const groups = [2, 2, 4];

  it("should separate a string accoding to configuration", () => {
    expect(generateGroups(groups, "########")).toEqual(["##", "##", "####"]);
  });
  it("should group a string of a lower than maximum length", () => {
    expect(generateGroups(groups, "###")).toEqual(["##", "#"]);
  });
  it("should separate a string up to a maximum length", () => {
    expect(generateGroups(groups, "##########")).toEqual(["##", "##", "####"]);
  });
});
