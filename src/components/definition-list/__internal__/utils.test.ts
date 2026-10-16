import React from "react";
import { flattenChildren } from "./utils";

test("falls back to an empty string when a valid element has no key", () => {
  const elementWithoutKey = React.createElement("div", null, "content");

  // React.Children.toArray always assigns a key, so it is stubbed here to
  // simulate an element reaching flattenChildren without one.
  jest
    .spyOn(React.Children, "toArray")
    .mockReturnValue([elementWithoutKey] as (
      | string
      | number
      | React.ReactElement
    )[]);

  const [result] = flattenChildren(
    elementWithoutKey,
  ) as React.ReactElement<unknown>[];

  expect(result.key).toBe("");

  jest.restoreAllMocks();
});
