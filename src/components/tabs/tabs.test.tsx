import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, Tab } from ".";
import Logger from "../../__internal__/utils/logger";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";

beforeAll(() => {
  // scrollIntoView is not implemented in jsdom but hasn't been marked as such
  Element.prototype.scrollIntoView = jest.fn();
});

test("logs a migration warning for the legacy `Tabs` and `Tab` components on first render only", () => {
  const loggerSpy = jest.spyOn(Logger, "warn").mockImplementation(() => {});
  const component = (
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
    </Tabs>
  );

  const { rerender } = render(component);
  rerender(component);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: This version of the `Tabs` component is intended to help migration to the `next` version and will be removed in a future release.",
  );
  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: This version of the `Tab` component is intended to help migration to the `next` version and will be removed in a future release.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(2);
  loggerSpy.mockRestore();
});

test("renders a tab for each `Tab` child and shows the first tab's panel by default", () => {
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
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
    "aria-selected",
    "false",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab 1" })).toHaveTextContent(
    "Content 1",
  );
  expect(screen.getByText("Content 2")).not.toBeVisible();
});

test("sets the `tabId` as the tab's `id` and links the tab to its panel", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });
  expect(tab).toHaveAttribute("id", "foo");
  expect(tab).toHaveAttribute("aria-controls", "foo-panel");
  expect(screen.getByRole("tabpanel", { name: "Tab 1" })).toHaveAttribute(
    "id",
    "foo-panel",
  );
});

test("supports the `id` and `label` props on `Tab`", () => {
  render(
    <Tabs>
      <Tab id="foo" label="Tab 1">
        Content 1
      </Tab>
      <Tab id="bar" label="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });
  expect(tab).toHaveAttribute("id", "foo");
  expect(tab).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel", { name: "Tab 1" })).toHaveTextContent(
    "Content 1",
  );
});

test("sets the tab's `aria-controls` from the `controls` prop when provided", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" controls="custom-panel">
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
    "aria-controls",
    "custom-panel",
  );
});

test("selects the tab specified by `selectedTabId`", () => {
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

  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab 2" })).toHaveTextContent(
    "Content 2",
  );
});

test("updates the selected tab when `selectedTabId` changes", () => {
  const { rerender } = render(
    <Tabs selectedTabId="foo">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  rerender(
    <Tabs selectedTabId="bar">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
    "aria-selected",
    "false",
  );
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("keeps the selected tab when the content of a `Tab` updates", async () => {
  const user = userEvent.setup();
  const MockComponent = () => {
    const [updated, setUpdated] = React.useState(false);

    return (
      <Tabs selectedTabId="bar">
        <Tab tabId="foo" title="Tab 1">
          Content 1
        </Tab>
        <Tab tabId="bar" title="Tab 2">
          {updated ? "Updated content 2" : "Content 2"}
          <button type="button" onClick={() => setUpdated(true)}>
            Update
          </button>
        </Tab>
      </Tabs>
    );
  };
  render(<MockComponent />);

  await user.click(screen.getByRole("button", { name: "Update" }));

  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab 2" })).toHaveTextContent(
    "Updated content 2",
  );
});

test("only renders the selected tab's panel when `renderHiddenTabs` is false", async () => {
  const user = userEvent.setup();
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

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));

  expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  expect(screen.getByText("Content 2")).toBeVisible();
});

test("calls `onTabChange` with the tab id when a different tab is selected", async () => {
  const user = userEvent.setup();
  const onTabChange = jest.fn();
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

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));

  expect(onTabChange).toHaveBeenCalledTimes(1);
  expect(onTabChange).toHaveBeenCalledWith("bar");
});

test("arranges the tabs vertically when `position` is 'left'", async () => {
  const user = userEvent.setup();
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

  await user.tab();
  await user.keyboard("{ArrowDown}");

  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
});

test("applies `headerWidth` to the tabs when `position` is 'left'", () => {
  render(
    <Tabs position="left" headerWidth="250px">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveStyle({
    width: "250px",
  });
});

test("renders large tabs when `size` is 'large'", () => {
  render(
    <Tabs size="large">
      <Tab tabId="foo" title="Tab 1">
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-l)",
  );
});

test("renders full-width tabs without panels when inside a drawer sidebar", () => {
  render(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Tabs headerWidth="250px">
        <Tab tabId="foo" title="Tab 1">
          Content 1
        </Tab>
      </Tabs>
    </DrawerSidebarContext.Provider>,
  );

  expect(screen.getByTestId("tab-list-wrapper")).toHaveStyle({
    width: "100%",
  });
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveStyle({
    width: "100%",
  });
  expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
  expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
});

test("includes the status from `validationStatusOverride` in each tab's accessible name", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" validationStatusOverride={{ info: true }}>
        Content 1
      </Tab>
      <Tab tabId="bar" title="Tab 2" validationStatusOverride={{ error: true }}>
        Content 2
      </Tab>
      <Tab
        tabId="baz"
        title="Tab 3"
        validationStatusOverride={{ warning: true }}
      >
        Content 3
      </Tab>
    </Tabs>,
  );

  expect(
    screen.getByRole("tab", {
      name: "Tab 1 The Tab 1 tab contains information",
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("tab", { name: "Tab 2 The Tab 2 tab contains errors" }),
  ).toBeVisible();
  expect(
    screen.getByRole("tab", { name: "Tab 3 The Tab 3 tab contains warnings" }),
  ).toBeVisible();
});

test("renders the `customLayout` content in place of the `title`", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" customLayout={<span>Custom layout</span>}>
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab", { name: "Custom layout" })).toBeVisible();
  expect(screen.queryByText("Tab 1")).not.toBeInTheDocument();
});

test("renders `siblings` after the `title` by default", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" siblings={<span>Sibling</span>}>
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveTextContent(/^Tab 1\s*Sibling$/);
});

test("renders `siblings` before the `title` when `titlePosition` is 'after'", () => {
  render(
    <Tabs>
      <Tab
        tabId="foo"
        title="Tab 1"
        siblings={<span>Sibling</span>}
        titlePosition="after"
      >
        Content 1
      </Tab>
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveTextContent(/^Sibling\s*Tab 1$/);
});

test("applies the `data-role` from `titleProps` to the tab", () => {
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

  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
    "data-role",
    "custom-title",
  );
});

test("renders the tab as a link that opens in a new browser tab when `href` is provided", () => {
  render(
    <Tabs>
      <Tab tabId="foo" title="Tab 1" href="https://carbon.sage.com">
        Content 1
      </Tab>
    </Tabs>,
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });
  expect(tab).toHaveAttribute("href", "https://carbon.sage.com");
  expect(tab).toHaveAttribute("target", "_blank");
  expect(tab).not.toHaveAttribute("type");
});

test("logs warnings and does not render a `Tab` that has no `id` or `tabId`", () => {
  const loggerSpy = jest.spyOn(Logger, "warn").mockImplementation(() => {});
  render(
    <Tabs>
      <Tab title="Tab 1">Content 1</Tab>
      <Tab tabId="bar" title="Tab 2">
        Content 2
      </Tab>
    </Tabs>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: Tab component is missing a unique identifier. Please provide an `id` prop to ensure proper functionality.",
  );
  expect(loggerSpy).toHaveBeenCalledWith(
    "Warning: Each `Tab` component must have an `id` or `tabId` prop to associate it with a TabPanel.",
  );
  expect(screen.getAllByRole("tab")).toHaveLength(1);
  expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  loggerSpy.mockRestore();
});
