import React from "react";
import { renderToString } from "react-dom/server";

import { AnchorNavigation, AnchorNavigationItem } from ".";

test("renders in a server-side environment", () => {
  const view = renderToString(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem>First</AnchorNavigationItem>
          <AnchorNavigationItem>Second</AnchorNavigationItem>
        </>
      }
    />,
  );

  expect(view).toContain("First");
  expect(view).toContain("Second");
});
