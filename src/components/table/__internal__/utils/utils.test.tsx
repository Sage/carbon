import React from "react";
import flattenChildren from "./index";

const getElementSummary = (node: React.ReactNode) => {
  return {
    type: (node as React.ReactElement).type,
    children: (node as React.ReactElement).props.children,
  };
};

describe("flattenChildren", () => {
  it("flattens nested fragments into an ordered array of valid elements", () => {
    const children = (
      <>
        <div>Child 1</div>
        <React.Fragment>
          <span>Child 2</span>
          <p>Child 3</p>
        </React.Fragment>
        <div>Child 4</div>
      </>
    );

    const flattened = flattenChildren(children);

    expect(flattened).toHaveLength(4);
    expect(flattened.every(React.isValidElement)).toBe(true);
    expect(flattened.map(getElementSummary)).toEqual([
      { type: "div", children: "Child 1" },
      { type: "span", children: "Child 2" },
      { type: "p", children: "Child 3" },
      { type: "div", children: "Child 4" },
    ]);
  });

  it("ignores values that are not valid React elements", () => {
    const children = (
      <>
        <div>Child 1</div>
        {null}
        {undefined}
        ignored text
        {42}
        <React.Fragment>
          <span>Child 2</span>
          {false}
          <p>Child 3</p>
        </React.Fragment>
        <div>Child 4</div>
      </>
    );

    const flattened = flattenChildren(children);

    expect(flattened).toHaveLength(4);
    expect(flattened.every(React.isValidElement)).toBe(true);
    expect(flattened.map(getElementSummary)).toEqual([
      { type: "div", children: "Child 1" },
      { type: "span", children: "Child 2" },
      { type: "p", children: "Child 3" },
      { type: "div", children: "Child 4" },
    ]);
  });
});
