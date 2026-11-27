import React from "react";
import { renderToString } from "react-dom/server";
import Popover from ".";

test("doesn't render popup in a server environment", () => {
  const view = renderToString(
    <Popover reference={null}>
      <>Hello world!</>
    </Popover>,
  );

  expect(view).not.toContain("Hello world!");
});

test.each([undefined, true])(
  "doesn't render popup in a server environment (useTopLayer=%s)",
  (useTopLayer) => {
    const view = renderToString(
      <Popover reference={null} useTopLayer={useTopLayer}>
        <>Hello world!</>
      </Popover>,
    );

    expect(view).not.toContain("Hello world!");
  },
);
