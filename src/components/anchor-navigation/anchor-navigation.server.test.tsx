import React from "react";
import { renderToString } from "react-dom/server";

import {
  AnchorNavigation,
  AnchorNavigationContent,
  AnchorNavigationItem,
  AnchorNavigationMenu,
} from ".";

const currentLinkWithLabel = (label: string) =>
  new RegExp(`<a[^>]*aria-current="location"[^>]*>(?:(?!<\\/a>).)*${label}`);

test("marks the first legacy item as the current location during server rendering", () => {
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

  expect(view).toMatch(currentLinkWithLabel("First"));
  expect(view).not.toMatch(currentLinkWithLabel("Second"));
});

test("marks a direct legacy item as the current location during server rendering", () => {
  const view = renderToString(
    <AnchorNavigation
      stickyNavigation={<AnchorNavigationItem>Item</AnchorNavigationItem>}
    />,
  );

  expect(view).toMatch(currentLinkWithLabel("Item"));
});

test("preserves an explicitly initially selected legacy item during server rendering", () => {
  const view = renderToString(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem>First</AnchorNavigationItem>
          <AnchorNavigationItem initiallySelected>Second</AnchorNavigationItem>
        </>
      }
    />,
  );

  expect(view).not.toMatch(currentLinkWithLabel("First"));
  expect(view).toMatch(currentLinkWithLabel("Second"));
});

test("marks the initially selected compound item as the current location during server rendering", () => {
  const view = renderToString(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected>First</AnchorNavigationItem>
        <AnchorNavigationItem>Second</AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent />
    </AnchorNavigation>,
  );

  expect(view).toMatch(currentLinkWithLabel("First"));
  expect(view).not.toMatch(currentLinkWithLabel("Second"));
});
