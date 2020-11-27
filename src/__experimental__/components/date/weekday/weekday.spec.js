import React from "react";
import TestRenderer from "react-test-renderer";

import Weekday from "./weekday.component";

describe("Weekday", () => {
  const render = (props) => {
    return TestRenderer.create(<Weekday {...props}>sample children</Weekday>);
  };

  it("renders presentational div and context provider for its children", () => {
    expect(render({ title: "tile" })).toMatchSnapshot();
  });
});
