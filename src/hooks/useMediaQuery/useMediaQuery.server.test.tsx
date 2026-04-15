import React from "react";
import { renderToString } from "react-dom/server";

import useMediaQuery from ".";

const TestComponent = () => {
  const matchQuery = useMediaQuery("(min-width:960px)");
  return <span>{`${matchQuery}`}</span>;
};

test("returns undefined in a server-side environment", () => {
  const view = renderToString(<TestComponent />);
  expect(view).toContain("undefined");
});

test("renders without errors when window is not available", () => {
  expect(() => renderToString(<TestComponent />)).not.toThrow();
});
