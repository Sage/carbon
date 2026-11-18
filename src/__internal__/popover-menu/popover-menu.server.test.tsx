import React from "react";
import { renderToString } from "react-dom/server";

import PopoverMenu from "./popover-menu.component";

test("renders without errors when window is not available", () => {
  expect(() =>
    renderToString(
      <PopoverMenu<HTMLButtonElement>
        open={false}
        onClose={jest.fn()}
        focusSelectedOnOpen
        popoverControl={(ref, props) => (
          <button ref={ref} {...props}>
            Open menu
          </button>
        )}
      >
        <li role="option" aria-selected="true">
          Selected option
        </li>
      </PopoverMenu>,
    ),
  ).not.toThrow();
});
