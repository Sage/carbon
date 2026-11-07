import React from "react";

import flattenChildren from ".";

test("returns direct children as an array", () => {
  const result = flattenChildren([<span key="a">A</span>, "text"]);

  expect(result).toHaveLength(2);
});

test("flattens nested fragments alongside direct children", () => {
  const result = flattenChildren(
    <>
      <span>A</span>
      <>
        <span>B</span>
        <span>C</span>
      </>
      {null}
    </>,
  );

  expect(result).toHaveLength(3);
});
