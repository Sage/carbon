import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TabsHeader from "./tabs-header.component";
import Tab from "../../tab/tab.component";
import { StyledTabsHeaderList } from "./tabs-header.style";
import TabTitle from "../tab-title/tab-title.component";

jest.mock("../../../../hooks/__internal__/useResizeObserver");

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

  expect(screen.getByTestId("tab-header-wrapper")).toHaveStyle({
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

// coverage - navigation button interaction
test("renders with interactive navigation buttons", async () => {
  const user = userEvent.setup();

  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  render(
    <TabsHeader role="tablist" align="left" position="top">
      {tabsData.map((tabData) => (
        <Tab role="tab" {...tabData} key={tabData.key} />
      ))}
    </TabsHeader>,
  );

  const tabContainer = screen.getByTestId("tab-container");
  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 0);
  const leftButton = screen.getByTestId("tab-navigation-button-left");
  const rightButton = screen.getByTestId("tab-navigation-button-right");

  expect(tabContainer.scrollLeft).toEqual(0);
  await user.click(rightButton);

  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 200);

  expect(tabContainer.scrollLeft).toEqual(200);
  await user.click(leftButton);

  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 0);

  expect(tabContainer.scrollLeft).toEqual(0);
});

// coverage
test("applies proper styles when the `extendedLine` prop is `false` and `position` is `left`", () => {
  render(
    <TabsHeader
      role="tablist"
      noRightBorder
      position="left"
      extendedLine={false}
    >
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({
    "box-shadow": "none",
  });
});

// coverage
test("applies proper styles when the `align` prop is `left` and `position` is `left`", () => {
  render(
    <TabsHeader role="tablist" noRightBorder position="left" align="left">
      <TabTitle title="title-1" onClick={() => {}} onKeyDown={() => {}} />
      <TabTitle title="title-2" onClick={() => {}} onKeyDown={() => {}} />
    </TabsHeader>,
  );

  expect(screen.getByRole("tablist")).toHaveStyle({
    "box-shadow": "none",
  });
});

// coverage - navigation button interaction
test("renders with interactive navigation buttons and nnnnhandles visibility correctly", async () => {
  const user = userEvent.setup();

  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
      "data-role": "tab",
    }));
  const TestComponent = () => (
    <TabsHeader role="tablist" align="left" position="top">
      {tabsData.map((tabData) => (
        <Tab role="tab" {...tabData} key={tabData.key} />
      ))}
    </TabsHeader>
  );

  const { rerender } = render(<TestComponent />);

  const tabContainer = screen.getByTestId("tab-container");
  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 0);

  const leftButtonWrapper = screen.getByTestId(
    "tab-navigation-button-wrapper-left",
  );
  const leftButton = screen.getByTestId("tab-navigation-button-left");
  const rightButton = screen.getByTestId("tab-navigation-button-right");

  expect(leftButtonWrapper).toHaveStyle({ display: "none" });

  expect(tabContainer.scrollLeft).toEqual(0);
  await user.click(rightButton);

  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 200);
  expect(tabContainer.scrollLeft).toEqual(200);
  rerender(<TestComponent />);

  expect(leftButtonWrapper).toHaveStyle({ display: "block" });

  await user.click(leftButton);

  jest.spyOn(tabContainer, "scrollLeft", "get").mockImplementation(() => 0);
  expect(tabContainer.scrollLeft).toEqual(0);
});
