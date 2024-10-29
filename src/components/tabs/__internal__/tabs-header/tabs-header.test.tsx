import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import TabsHeader from "./tabs-header.component";
import { StyledTabsHeaderList } from "./tabs-header.style";
import TabTitle from "../tab-title/tab-title.component";

test("renders children correctly", () => {
  render(
    <TabsHeader>
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getAllByRole("tab")).toHaveLength(2);
  expect(screen.getAllByRole("tab")[0]).toHaveTextContent("title-1");
  expect(screen.getAllByRole("tab")[1]).toHaveTextContent("title-2");
});

test("accepts a `role` prop", () => {
  render(
    <TabsHeader role="tablist">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toBeVisible();
  expect(screen.getByRole("tablist")).toHaveTextContent("title-1title-2");
});

// coverage
test("renders before element with correct opacity when scroll position is not at the left", () => {
  render(
    <TabsHeader role="tablist">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  const mockScrollValues = {
    scrollWidth: 768,
    clientWidth: 256,
    scrollLeft: 64,
  };

  const tabList = screen.getByRole("tablist");

  Object.entries(mockScrollValues).forEach(([key, value]) => {
    Object.defineProperty(tabList, key, {
      configurable: true,
      value,
    });
  });

  fireEvent.scroll(tabList);

  expect(tabList).toHaveStyleRule("opacity", "0.5", { modifier: ":before" });
});

// coverage
test("applies proper styles when the `extendedLine` prop is `false`", () => {
  render(
    <TabsHeader role="tablist" extendedLine={false}>
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({ width: "fit-content" });
});

// coverage
test("applies proper styles when the `align` prop is `right`", () => {
  render(
    <TabsHeader role="tablist" align="right">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({
    "justify-content": "flex-end",
    "text-align": "right",
  });
});

// coverage
test("applies proper styles when the `noRightBorder` prop is `true` and `position` is `left`", () => {
  render(
    <TabsHeader role="tablist" noRightBorder position="left">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({
    "box-shadow": "none",
  });
});

// coverage
test("applies proper styles when the `align` prop is `right` and `position` is `left`", () => {
  render(
    <TabsHeader role="tablist" align="right" position="left">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({
    "justify-content": "flex-start",
  });
});

// coverage - need to render the styled component directly to cover the default prop assignments
test("renders with correct styles", () => {
  render(<StyledTabsHeaderList role="tablist" />);

  expect(screen.getByRole("tablist")).toHaveStyle({
    display: "flex",
    cursor: "default",
    "list-style": "none",
    padding: "3px",
  });
});
