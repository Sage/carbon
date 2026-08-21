import React from "react";
import { renderToString } from "react-dom/server";
import PopoverContainer from "./popover-container.component";

test("doesn't render popover-container in a server environment", () => {
  const view = renderToString(
    <PopoverContainer>
      <>Hello world!</>
    </PopoverContainer>,
  );

  expect(view).not.toContain("Hello world!");
});
