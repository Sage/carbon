import React from "react";
import { renderToString } from "react-dom/server";
import Skeleton from ".";

test("renders in a server-side environment", () => {
  const view = renderToString(<Skeleton />);

  expect(view).toContain('data-component="skeleton"');
  expect(view).toContain('data-role="skeleton-wrapper"');
  expect(view).toContain('data-role="skeleton-line"');
});
