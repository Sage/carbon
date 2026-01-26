import React from "react";
import { renderToString } from "react-dom/server";
import Popover from ".";

test("doesn't render popup in a server environment", () => {
  const view = renderToString(
    <Popover reference={{ current: null }}>
      <>Hello world!</>
    </Popover>,
  );

  expect(view).not.toContain("Hello world!");
});
