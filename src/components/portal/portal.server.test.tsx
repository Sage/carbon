import React from "react";
import { renderToString } from "react-dom/server";
import Portal from "./portal";

test("when rendering `Portal` component in a server-side environment, a React portal is not rendered", () => {
  const view = renderToString(<Portal>Hello world</Portal>);
  expect(view).not.toMatch(/Hello world/);
});
