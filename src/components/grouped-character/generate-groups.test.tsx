import { generateGroups } from "./grouped-character.utils";

const groups = [2, 2, 4];

test("should separate a string according to configuration", () => {
  expect(generateGroups(groups, "########")).toEqual(["##", "##", "####"]);
});

test("should group a string of a lower than maximum length", () => {
  expect(generateGroups(groups, "###")).toEqual(["##", "#"]);
});

test("should separate a string up to a maximum length", () => {
  expect(generateGroups(groups, "##########")).toEqual(["##", "##", "####"]);
});
