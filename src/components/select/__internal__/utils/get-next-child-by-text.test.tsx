import React from "react";
import getNextChildByText from "./get-next-child-by-text";
import Option from "../../option";

const optionList = [
  <Option text="amber" value="amber" />,
  <Option text="blue" value="blue" />,
  <Option text="white" value="white" />,
  <Option text="black" value="black" />,
  <Option text="purple" value="purple" />,
  <Option text="brown" value="brown" />,
];

test("matches single character to first option's starting letter", () => {
  expect(getNextChildByText("a", optionList)).toStrictEqual(
    <Option text="amber" value="amber" />,
  );
  expect(getNextChildByText("b", optionList)).toStrictEqual(
    <Option text="blue" value="blue" />,
  );
  expect(getNextChildByText("w", optionList)).toStrictEqual(
    <Option text="white" value="white" />,
  );
});

test("returns undefined for unmatched single character", () => {
  expect(getNextChildByText("x", optionList)).toBeUndefined();
});

test("matches repeated character to first option's starting letter", () => {
  expect(getNextChildByText("bb", optionList)).toStrictEqual(
    <Option text="blue" value="blue" />,
  );
});

test("finds next option for repeated character after a match", () => {
  expect(getNextChildByText("bb", optionList, 1)).toStrictEqual(
    <Option text="black" value="black" />,
  );
});

test("cycles to first option for repeated character after last match", () => {
  expect(getNextChildByText("bb", optionList, 5)).toStrictEqual(
    <Option text="blue" value="blue" />,
  );
});

test("matches string to option starting with that string", () => {
  expect(getNextChildByText("br", optionList)).toStrictEqual(
    <Option text="brown" value="brown" />,
  );
  expect(getNextChildByText("bla", optionList)).toStrictEqual(
    <Option text="black" value="black" />,
  );
});
