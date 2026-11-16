import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs, Tab, TabList, TabPanel } from ".";
import type { TabsHandle, TabsProps } from ".";
import Textbox from "../../textbox";
import I18nProvider from "../../i18n-provider";
import { enGB } from "../../../locales";
import { assertLoggerComponentMessage } from "../../../__spec_helper__/__internal__/test-utils";

const TestComponent = (props: Omit<TabsProps, "children">) => (
  <Tabs {...props}>
    <TabList ariaLabel="Sample Tabs">
      <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
      <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
      <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
    </TabList>
    <TabPanel id="tab-panel-1" tabId="tab-1">
      Content 1
    </TabPanel>
    <TabPanel id="tab-panel-2" tabId="tab-2">
      Content 2
    </TabPanel>
    <TabPanel id="tab-panel-3" tabId="tab-3">
      Content 3
    </TabPanel>
  </Tabs>
);

beforeAll(() => {
  // scrollIntoView is not implemented in jsdom but hasn't been marked as such
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

// jsdom has no layout, so mock the tab list dimensions to make the tabs overflow
const mockTabListOverflow = (scrollLeft = 0) => {
  jest.spyOn(Element.prototype, "scrollWidth", "get").mockReturnValue(1000);
  jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(300);
  jest
    .spyOn(Element.prototype, "scrollLeft", "get")
    .mockReturnValue(scrollLeft);
};

test("selects the first tab and shows its panel by default", () => {
  render(<TestComponent />);

  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute(
    "aria-selected",
    "false",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab One" })).toHaveTextContent(
    "Content 1",
  );
  expect(
    screen.queryByRole("tabpanel", { name: "Tab Two" }),
  ).not.toBeInTheDocument();
});

test("selects the tab specified by `selectedTabId` and shows its panel", () => {
  render(<TestComponent selectedTabId="tab-3" />);

  expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab Three" })).toHaveTextContent(
    "Content 3",
  );
});

test("logs a warning when `leftSlot` or `rightSlot` is used with a non-string `label`", () => {
  const jestWarnSpy = jest.spyOn(console, "warn").mockImplementation();

  assertLoggerComponentMessage({
    component: (
      <Tabs>
        <TabList ariaLabel="Sample Tabs">
          <Tab
            id="tab-1"
            controls="tab-panel-1"
            label={<span>Tab One</span>}
            leftSlot="Left slot"
          />
        </TabList>
      </Tabs>
    ),
    message:
      "[WARNING] Using `leftSlot` and/or `rightSlot` is not supported when `label` is not a string. Please use `leftSlot` and/or `rightSlot` alongside a string `label`, or use the `label` prop exclusively.",
    method: "warn",
  });

  jestWarnSpy.mockRestore();
});

test("renders `leftSlot` and `rightSlot` content alongside a string `label`", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1"
          controls="tab-panel-1"
          label="Tab One"
          leftSlot="Left slot"
          rightSlot="Right slot"
        />
      </TabList>
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveAccessibleName(
    "Left slot Tab One Right slot",
  );
});

test("moves focus between tabs with the ArrowLeft and ArrowRight keys, wrapping at either end", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await user.tab();
  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveFocus();
});

test("moves focus to the first and last tabs with the Home and End keys", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await user.tab();
  await user.keyboard("{End}");
  expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveFocus();

  await user.keyboard("{Home}");
  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();
});

test("moves focus between tabs with the ArrowUp and ArrowDown keys, wrapping at either end, when `orientation` is 'vertical'", async () => {
  const user = userEvent.setup();
  render(<TestComponent orientation="vertical" />);

  await user.tab();
  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveFocus();
});

test("selects the focused tab and shows its panel when Enter or Space is pressed", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await user.tab();
  await user.keyboard("{ArrowRight}");
  await user.keyboard("{Enter}");

  expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab Two" })).toHaveTextContent(
    "Content 2",
  );

  await user.keyboard("{ArrowRight}");
  await user.keyboard(" ");

  expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel", { name: "Tab Three" })).toHaveTextContent(
    "Content 3",
  );
});

test("resets arrow key navigation to the selected tab when the user tabs out of the tab list", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await user.tab();
  await user.keyboard("{ArrowRight}");
  await user.tab();
  await user.tab();
  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveFocus();
});

test("does not move focus when ArrowUp, ArrowDown or an unrelated key is pressed and `orientation` is 'horizontal'", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  await user.tab();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowUp}");
  await user.keyboard("a");

  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();
});

test("does not move focus with arrow keys when `selectedTabId` does not match any tab", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<TestComponent selectedTabId="tab-1" />);

  await user.tab();
  rerender(<TestComponent selectedTabId="missing-tab" />);
  await user.keyboard("{ArrowRight}");

  expect(screen.getByRole("tab", { name: "Tab One" })).toHaveFocus();
});

test("includes error description in the tab's accessible name when `error` is true", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" error />
      </TabList>
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveAccessibleName(
    "Tab One The Tab One tab contains errors",
  );
});

test("includes warning description in the tab's accessible name when `warning` is true", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" warning />
      </TabList>
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveAccessibleName(
    "Tab One The Tab One tab contains warnings",
  );
});

test("shows the validation status of fields within inactive tab panels on their tabs", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        Content 1
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Textbox label="Error field" value="" onChange={() => {}} error />
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Textbox label="Warning field" value="" onChange={() => {}} warning />
      </TabPanel>
    </Tabs>,
  );

  expect(
    screen.getByRole("tab", {
      name: "Tab Two The Tab Two tab contains errors",
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("tab", {
      name: "Tab Three The Tab Three tab contains warnings",
    }),
  ).toBeVisible();
});

test("removes the validation status of fields from their tabs when the fields are unmounted", async () => {
  const user = userEvent.setup();
  const MockComponent = () => {
    const [showFields, setShowFields] = React.useState(true);

    return (
      <>
        <button type="button" onClick={() => setShowFields(false)}>
          Remove fields
        </button>
        <Tabs>
          <TabList ariaLabel="Sample Tabs">
            <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
            <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
          </TabList>
          <TabPanel id="tab-panel-1" tabId="tab-1">
            {showFields && (
              <Textbox label="Error field" value="" onChange={() => {}} error />
            )}
          </TabPanel>
          <TabPanel id="tab-panel-2" tabId="tab-2">
            {showFields && (
              <Textbox
                label="Warning field"
                value=""
                onChange={() => {}}
                warning
              />
            )}
          </TabPanel>
        </Tabs>
      </>
    );
  };
  render(<MockComponent />);

  const tab1 = screen.getByRole("tab", { name: /Tab One/ });
  const tab2 = screen.getByRole("tab", { name: /Tab Two/ });
  expect(tab1).toHaveAccessibleName("Tab One The Tab One tab contains errors");
  expect(tab2).toHaveAccessibleName(
    "Tab Two The Tab Two tab contains warnings",
  );

  await user.click(screen.getByRole("button", { name: "Remove fields" }));

  expect(tab1).toHaveAccessibleName("Tab One");
  expect(tab2).toHaveAccessibleName("Tab Two");
});

test("sets the accessible name of the tab list via the `ariaLabel` prop", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Custom Tab List Label">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
      </TabList>
    </Tabs>,
  );

  expect(
    screen.getByRole("tablist", { name: "Custom Tab List Label" }),
  ).toBeInTheDocument();
});

test("focuses and selects the specified tab when the exposed `focusTab` method is called", async () => {
  const user = userEvent.setup();
  const MockComponent = () => {
    const tabsHandle = React.useRef<TabsHandle>(null);

    return (
      <>
        <Tabs>
          <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
            <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
            <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
            <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
          </TabList>
        </Tabs>
        <button
          type="button"
          onClick={() => tabsHandle.current?.focusTab("tab-3")}
        >
          Focus Tab 3
        </button>
      </>
    );
  };
  render(<MockComponent />);

  await user.click(screen.getByRole("button", { name: "Focus Tab 3" }));

  const tab3 = screen.getByRole("tab", { name: "Tab Three" });
  expect(tab3).toHaveFocus();
  expect(tab3).toHaveAttribute("aria-selected", "true");
});

test("calls `onTabChange` with the tab id when a different tab is selected", async () => {
  const user = userEvent.setup();
  const onTabChange = jest.fn();
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs" onTabChange={onTabChange}>
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
      </TabList>
    </Tabs>,
  );

  await user.click(screen.getByRole("tab", { name: "Tab Two" }));

  expect(onTabChange).toHaveBeenCalledTimes(1);
  expect(onTabChange).toHaveBeenCalledWith("tab-2");
});

test("does not call `onTabChange` when the already selected tab is clicked", async () => {
  const user = userEvent.setup();
  const onTabChange = jest.fn();
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs" onTabChange={onTabChange}>
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
      </TabList>
    </Tabs>,
  );

  await user.click(screen.getByRole("tab", { name: "Tab One" }));

  expect(onTabChange).not.toHaveBeenCalled();
});

test("renders with provided data- attributes", () => {
  render(
    <Tabs data-element="tabs-foo" data-role="tabs-bar">
      <TabList
        ariaLabel="Sample Tabs"
        data-element="tablist-foo"
        data-role="tablist-bar"
      >
        <Tab
          data-element="tab-foo"
          data-role="tab-bar"
          id="tab-1"
          controls="tab-panel-1"
          label="Tab One"
        />
      </TabList>
      <TabPanel
        data-element="tabpanel-foo"
        data-role="tabpanel-bar"
        id="tab-panel-1"
        tabId="tab-1"
      >
        Content 1
      </TabPanel>
    </Tabs>,
  );

  const tabs = screen.getByTestId("tabs-bar");
  const tabsList = screen.getByRole("tablist");
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel", { name: "Tab One" });

  expect(tabs).toHaveAttribute("data-component", "tabs");
  expect(tabs).toHaveAttribute("data-element", "tabs-foo");
  expect(tabsList).toHaveAttribute("data-component", "tab-list");
  expect(tabsList).toHaveAttribute("data-element", "tablist-foo");
  expect(tabsList).toHaveAttribute("data-role", "tablist-bar");
  expect(tab1).toHaveAttribute("data-component", "tab");
  expect(tab1).toHaveAttribute("data-element", "tab-foo");
  expect(tab1).toHaveAttribute("data-role", "tab-bar");
  expect(tabPanel1).toHaveAttribute("data-component", "tab-panel");
  expect(tabPanel1).toHaveAttribute("data-element", "tabpanel-foo");
  expect(tabPanel1).toHaveAttribute("data-role", "tabpanel-bar");
});

test("sets 'aria-orientation' to horizontal by default", () => {
  render(<TestComponent />);

  const tabList = screen.getByRole("tablist");
  expect(tabList).toHaveAttribute("aria-orientation", "horizontal");
});

test("sets 'aria-orientation' to vertical when `orientation` is vertical", () => {
  render(<TestComponent orientation="vertical" />);

  const tabList = screen.getByRole("tablist");
  expect(tabList).toHaveAttribute("aria-orientation", "vertical");
});

test("shows scroll buttons that scroll the tab list when the tabs overflow horizontally", async () => {
  const user = userEvent.setup();
  let scrollLeft = 0;
  mockTabListOverflow();
  jest
    .spyOn(Element.prototype, "scrollLeft", "get")
    .mockImplementation(() => scrollLeft);
  jest
    .spyOn(Element.prototype, "scrollLeft", "set")
    .mockImplementation((value) => {
      scrollLeft = value;
    });
  render(<TestComponent />);

  expect(
    screen.queryByRole("button", { name: "Scroll Tabs Left" }),
  ).not.toBeInTheDocument();

  const scrollRightButton = screen.getByRole("button", {
    name: "Scroll Tabs Right",
  });
  await user.click(scrollRightButton);

  expect(scrollLeft).toBe(200);
  expect(
    screen.getByRole("button", { name: "Scroll Tabs Left" }),
  ).toBeVisible();

  await user.click(scrollRightButton);
  await user.click(scrollRightButton);
  await user.click(scrollRightButton);

  expect(scrollLeft).toBe(800);
  expect(
    screen.queryByRole("button", { name: "Scroll Tabs Right" }),
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Scroll Tabs Left" }));

  expect(scrollLeft).toBe(600);
  expect(
    screen.getByRole("button", { name: "Scroll Tabs Right" }),
  ).toBeVisible();
});

test("renders the scroll button titles from the `I18nProvider` locale", () => {
  mockTabListOverflow(100);
  render(
    <I18nProvider
      locale={{
        tabs: {
          ...enGB.tabs,
          scrollLeftText: () => "Custom left",
          scrollRightText: () => "Custom right",
        },
      }}
    >
      <TestComponent />
    </I18nProvider>,
  );

  expect(screen.getByRole("button", { name: "Custom left" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Custom right" })).toBeVisible();
});

test("does not render scroll buttons when `orientation` is 'vertical' and the tabs overflow", () => {
  mockTabListOverflow(100);
  render(<TestComponent orientation="vertical" />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
