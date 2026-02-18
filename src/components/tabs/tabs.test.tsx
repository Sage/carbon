import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, Tab } from ".";
import Logger from "../../__internal__/utils/logger";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";

test("calls Logger.warn twice when the Tabs and Tab components are rendered", () => {
  const loggerSpy = jest.spyOn(Logger, "warn");

  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: This version of the `Tabs` component is intended to help migration to the `next` version and will be removed in a future release.",
  );
  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: This version of the `Tab` component is intended to help migration to the `next` version and will be removed in a future release.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(2);
  loggerSpy.mockRestore();
});

test("renders all tabs by default", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tablist", { name: "Tabs" })).toBeVisible();
  expect(screen.getByRole("tab", { name: "Tab 1" })).toBeVisible();
  expect(screen.getByRole("tab", { name: "Tab 2" })).toBeVisible();
  expect(screen.getByText("Content 1")).toBeVisible();
  expect(screen.getByText("Content 2")).toBeInTheDocument();
});

test("sets the `tabId` prop as the `id` attribute on the rendered element", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("id", "foo");
  expect(tab2).toHaveAttribute("id", "bar");
});

test("hides tabs when `renderHiddenTabs` prop is false", () => {
  render(
    <Tabs renderHiddenTabs={false}>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(screen.getByText("Content 1")).toBeVisible();
  expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
});

test("hides tabs when `renderHiddenTabs` prop is false and selectedTabId is set", () => {
  render(
    <Tabs renderHiddenTabs={false} selectedTabId="bar">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  expect(screen.getByText("Content 2")).toBeVisible();
});

test("renders the tabs in horizontal orientation when `position` prop is not set", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 2" });
  expect(tab).not.toHaveStyle("border-right: 2px solid #8b8b8bff");
});

test("renders the tabs in horizontal orientation when `position` prop is set to 'top'", () => {
  render(
    <Tabs position="top">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 2" });
  expect(tab).not.toHaveStyle("border-right: 2px solid #8b8b8bff");
});

test("renders the tabs in vertical orientation when `position` prop is set to 'left'", () => {
  render(
    <Tabs position="left">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 2" });
  expect(tab).toHaveStyle("border-right: 2px solid #8b8b8bff");
});

test("applies width correctly when `headerWidth` prop is not set and `position` prop is set to 'left'", () => {
  render(
    <Tabs position="left">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tabList = screen.getAllByRole("tab");
  tabList.forEach((tab) => {
    expect(tab).toHaveStyle("width: 200px");
  });
});

test("applies width correctly when `headerWidth` prop set and `position` prop is set to 'left'", () => {
  const headerWidth = "250px";
  render(
    <Tabs headerWidth={headerWidth} position="left">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tabList = screen.getAllByRole("tab");
  tabList.forEach((tab) => {
    expect(tab).toHaveStyle(`width: ${headerWidth}`);
  });
});

test("does not apply `headerWidth` when `position` prop is set to 'top'", () => {
  const headerWidth = "250px";
  render(
    <Tabs headerWidth={headerWidth} position="top">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tabList = screen.getAllByRole("tab");
  tabList.forEach((tab) => {
    expect(tab).not.toHaveStyle(`width: ${headerWidth}`);
  });
});

test("sets the first Tab as active by default", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-selected", "true");
  expect(tab2).toHaveAttribute("aria-selected", "false");
});

test("sets the active Tab when `selectedTabId` prop is set", () => {
  render(
    <Tabs selectedTabId="bar">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-selected", "false");
  expect(tab2).toHaveAttribute("aria-selected", "true");
});

test("renders relevant validation status indicators on Tabs when `validationStatusOverride` prop is set", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" validationStatusOverride={{ error: true }}>
        Content 1
      </Tab>
      <Tab
        tabId="bar"
        title="Tab 2"
        validationStatusOverride={{ warning: true }}
      >
        Content 2
      </Tab>
      <Tab tabId="baz" title="Tab 3" validationStatusOverride={{ info: true }}>
        Content 3
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", {
    name: "Tab 1 The Tab 1 tab contains errors",
  });
  const tab2 = screen.getByRole("tab", {
    name: "Tab 2 The Tab 2 tab contains warnings",
  });
  const tab3 = screen.getByRole("tab", {
    name: "Tab 3 The Tab 3 tab contains information",
  });

  const errorIcon = within(tab1).getByTestId("icon-error");
  expect(errorIcon).toBeVisible();

  const warningIcon = within(tab2).getByTestId("icon-warning");
  expect(warningIcon).toBeVisible();

  const infoIcon = within(tab3).getByTestId("icon-info");
  expect(infoIcon).toBeVisible();
});

test("renders custom layout when `customLayout` prop is set", () => {
  render(
    <Tabs>
      <Tab
        tabId="foo"
        title="Tab 1"
        customLayout={
          <div data-role="custom-layout">
            <span>Custom </span>
            <strong>Layout</strong>
          </div>
        }
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  const customLayout = within(tab1).getByTestId("custom-layout");

  expect(customLayout).toBeVisible();
  expect(within(customLayout).getByText("Custom")).toBeVisible();
  expect(within(customLayout).getByText("Layout")).toBeVisible();
});

test("renders custom layout when `customLayout` prop is set and position is 'left'", () => {
  render(
    <Tabs position="left">
      <Tab
        tabId="foo"
        title="Tab 1"
        customLayout={
          <div data-role="custom-layout">
            <span>Custom </span>
            <strong>Layout</strong>
          </div>
        }
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  const customLayout = within(tab1).getByTestId("custom-layout");

  expect(customLayout).toBeVisible();
  expect(within(customLayout).getByText("Custom")).toBeVisible();
  expect(within(customLayout).getByText("Layout")).toBeVisible();
});

test("renders `siblings` when they are passed", () => {
  render(
    <Tabs>
      <Tab
        tabId="foo"
        title="Tab 1"
        siblings={<span data-role="sibling">Sibling</span>}
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  const sibling = within(tab1).getByTestId("sibling");

  expect(sibling).toBeVisible();
  expect(within(tab1).getByText("Tab 1")).toBeVisible();
  expect(within(tab1).getByText("Sibling")).toBeVisible();
});

test("renders `siblings` when they are passed and `titlePosition` is set to 'after'", () => {
  render(
    <Tabs>
      <Tab
        tabId="foo"
        title="Tab 1"
        siblings={<span data-role="sibling">Sibling</span>}
        titlePosition="after"
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  const sibling = within(tab1).getByTestId("sibling");

  expect(sibling).toBeVisible();
  expect(within(tab1).getByText("Tab 1")).toBeVisible();
  expect(within(tab1).getByText("Sibling")).toBeVisible();
});

test("calls `onTabChange` callback when a tab is clicked", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();

  render(
    <Tabs onTabChange={onTabChange}>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  await user.click(tab2);

  expect(onTabChange).toHaveBeenCalledWith("bar");
});

test("focuses the relevant tab but does not call `onTabChange` callback when arrow key navigation is used", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });
  await user.tab();
  await user.keyboard("{ArrowRight}");

  expect(tab2).toHaveFocus();
  expect(onTabChange).not.toHaveBeenCalled();
});

test("calls `onTabChange` callback when user presses enter key on a focused tab that isn't already active", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });
  await user.tab();
  await user.keyboard("{ArrowRight}");
  await user.keyboard("{Enter}");

  expect(tab2).toHaveFocus();
  expect(onTabChange).toHaveBeenCalledWith("bar");
});

test("calls `onTabChange` callback when user presses space key on a focused tab that isn't already active", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });
  await user.tab();
  await user.keyboard("{ArrowRight}");
  await user.keyboard(" ");

  expect(tab2).toHaveFocus();
  expect(onTabChange).toHaveBeenCalledWith("bar");
});

test("does not call `onTabChange` callback when the active tab is clicked", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  await user.click(tab1);

  expect(onTabChange).not.toHaveBeenCalled();
});

test("does not call `onTabChange` callback when user presses enter key on a focused tab that is already active", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  await user.tab();
  await user.keyboard("{Enter}");

  expect(tab1).toHaveFocus();
  expect(onTabChange).not.toHaveBeenCalled();
});

test("does not call `onTabChange` callback when user presses space key on a focused tab that is already active", async () => {
  const onTabChange = jest.fn();
  const user = userEvent.setup();
  render(
    <Tabs onTabChange={onTabChange} selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );
  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  await user.tab();
  await user.keyboard(" ");

  expect(tab1).toHaveFocus();
  expect(onTabChange).not.toHaveBeenCalled();
});

test("adds custom data-role to tab title when `titleProps` prop is set", () => {
  render(
    <Tabs>
      <Tab
        tabId="foo"
        title="Tab 1"
        titleProps={{ "data-role": "custom-title" }}
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  const tabTitle = screen.getByTestId("custom-title");
  expect(tabTitle).toBeVisible();
});

test("renders an anchor element when an `href` prop is passed to a Tab", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" href="https://www.example.com">
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab1).toBeVisible();
  expect(tab1.tagName).toBe("A");
  expect(tab1).toHaveAttribute("href", "https://www.example.com");
  expect(tab1).toHaveAttribute("target", "_blank");
});

test("renders a button element when no `href` prop is passed to a Tab", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab1).toBeVisible();
  expect(tab1.tagName).toBe("BUTTON");
});

test("renders tabs with correct size when `size` prop is set to 'default'", () => {
  render(
    <Tabs size="default">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveStyle("font-size: 14px");
  expect(tab2).toHaveStyle("font-size: 14px");
});

test("renders tabs with correct size when `size` prop is set to 'large'", () => {
  render(
    <Tabs size="large">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveStyle("font-size: 16px");
  expect(tab2).toHaveStyle("font-size: 16px");
});

test("sets the `headerWidth` to '100%' when DrawerSidebarContext is detected", () => {
  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Tabs>
        <Tab tabId="foo" title="Tab 1">
          Content 1
        </Tab>
        <Tab tabId="bar" title="Tab 2">
          Content 2
        </Tab>
      </Tabs>
    </DrawerSidebarContext.Provider>,
  );

  expect(screen.getByTestId("tab-list-wrapper")).toHaveStyle("width: 100%");
});

test("updates the selected tab when the `selectedTabId` prop changes", () => {
  const { rerender } = render(
    <Tabs selectedTabId="foo">
      <Tab id="foo" label="Tab 1">
        Content 1
      </Tab>
      <Tab id="bar" label="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-selected", "true");
  expect(tab2).toHaveAttribute("aria-selected", "false");

  rerender(
    <Tabs selectedTabId="bar">
      <Tab id="foo" label="Tab 1">
        Content 1
      </Tab>
      <Tab id="bar" label="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(tab1).toHaveAttribute("aria-selected", "false");
  expect(tab2).toHaveAttribute("aria-selected", "true");
});

test("logs warnings when no `id` or `tabId` prop is provided to Tab", () => {
  const loggerSpy = jest.spyOn(Logger, "warn");

  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Tabs>
        <Tab title="Tab 1">Content 1</Tab>
      </Tabs>
    </DrawerSidebarContext.Provider>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: Tab component is missing a unique identifier. Please provide an `id` prop to ensure proper functionality.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockRestore();
});

test("logs warnings when `TabPanel` cannot associate `id` or `tabId` prop is to a Tab", () => {
  const loggerSpy = jest.spyOn(Logger, "warn");

  render(
    <Tabs>
      <Tab title="Tab 1">Content 1</Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: Each `Tab` component must have an `id` or `tabId` prop to associate it with a TabPanel.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(2);
  loggerSpy.mockRestore();
});
