import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Tabs, { Tab, TabList, TabPanel } from "./tabs.component";
import Icon from "../../icon";
import Typography from "../../typography";
import { assertLoggerComponentMessage } from "../../../__spec_helper__/__internal__/test-utils";
import Textbox from "../../textbox";
import { TabsHandle } from "./tabs.types";
import Button from "../../button";

const TestComponent = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
        <button data-role="test-button">Test button</button>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};

test("shows a warning when slots are used with a non-string label", () => {
  const jestWarnSpy = jest.spyOn(console, "warn").mockImplementation();
  const slotContent = <Icon type="blocked_square" />;

  assertLoggerComponentMessage({
    component: (
      <Tabs>
        <TabList ariaLabel="Sample Tabs">
          <Tab
            id="tab-1"
            controls="tab-panel-1"
            label={<div>Bad example</div>}
            leftSlot={slotContent}
            rightSlot={slotContent}
          />
        </TabList>
        <TabPanel id="tab-panel-1" tabId="tab-1">
          <Typography>Content 1</Typography>
        </TabPanel>
      </Tabs>
    ),
    message:
      "[WARNING] Using `leftSlot` and/or `rightSlot` is not supported when `label` is not a string. Please use `leftSlot` and/or `rightSlot` alongside a string `label`, or use the `label` prop exclusively.",
    method: "warn",
  });
  jestWarnSpy.mockRestore();
});

test("renders correctly with defaults", () => {
  render(<TestComponent />);
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel");

  expect(tab1).toBeInTheDocument();
  expect(tabPanel1).toBeInTheDocument();
  expect(tabPanel1).toHaveTextContent("Content 1");
});

test("renders correctly when `size` prop set to `large`", () => {
  render(<TestComponent size="large" />);
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel");

  expect(tab1).toBeInTheDocument();
  expect(tabPanel1).toBeInTheDocument();
  expect(tabPanel1).toHaveTextContent("Content 1");
});

test("renders correctly when `orientation` prop set to `vertical`", () => {
  render(<TestComponent orientation="vertical" />);
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel");

  expect(tab1).toBeInTheDocument();
  expect(tabPanel1).toBeInTheDocument();
  expect(tabPanel1).toHaveTextContent("Content 1");
});

test("renders correctly when `orientation` prop set to `vertical` and `size` is set to `large`", () => {
  render(<TestComponent orientation="vertical" size="large" />);
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel");

  expect(tab1).toBeInTheDocument();
  expect(tabPanel1).toBeInTheDocument();
  expect(tabPanel1).toHaveTextContent("Content 1");
});

test("renders correctly when `leftSlot` prop set to a valid React element", () => {
  const leftSlotContent = <Icon data-element="icon" type="blocked_square" />;
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1"
          controls="tab-panel-1"
          label="Tab One"
          leftSlot={leftSlotContent}
        />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  expect(tab1).toBeInTheDocument();

  const icon = screen.getByTestId("icon");
  expect(icon).toBeInTheDocument();
});

test("renders correctly when `rightSlot` prop set to a valid React element", () => {
  const rightSlotContent = <Icon type="blocked_square" />;
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1"
          controls="tab-panel-1"
          label="Tab One"
          rightSlot={rightSlotContent}
        />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab");
  expect(tab1).toBeInTheDocument();

  const icon = screen.getByTestId("icon");
  expect(icon).toBeInTheDocument();
});

test("responds to horizontal keyboard interactions", async () => {
  const user = userEvent.setup();

  render(<TestComponent />);

  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tab2 = screen.getByRole("tab", { name: "Tab Two" });
  const tab3 = screen.getByRole("tab", { name: "Tab Three" });

  await user.keyboard("{Tab}");
  expect(tab1).toHaveFocus();

  const button = screen.getByTestId("test-button");

  await user.keyboard("{Tab}");
  expect(button).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}");
  expect(tab1).toHaveFocus();

  await user.keyboard("{End}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Home}");
  expect(tab1).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent(/Content 1/gi);

  await user.keyboard("{ArrowRight}");
  expect(tab2).toHaveFocus();

  await user.keyboard(" ");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");

  await user.keyboard("{ArrowRight}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Enter}");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 3");

  await user.keyboard("{ArrowRight}");
  expect(tab1).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(tab2).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(tab1).toHaveFocus();

  await user.keyboard(" ");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
});

test("updates the focus index when a user presses 'tab' key", async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tab2 = screen.getByRole("tab", { name: "Tab Two" });
  const tab3 = screen.getByRole("tab", { name: "Tab Three" });

  await user.click(tab2);
  await user.keyboard("{ArrowRight}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(document.body).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(tab2).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(tab1).toHaveFocus();
});

test("responds to vertical keyboard interactions", async () => {
  const user = userEvent.setup();

  render(<TestComponent orientation="vertical" />);

  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tab2 = screen.getByRole("tab", { name: "Tab Two" });
  const tab3 = screen.getByRole("tab", { name: "Tab Three" });

  await user.keyboard("{Tab}");
  expect(tab1).toHaveFocus();

  const button = screen.getByTestId("test-button");

  await user.keyboard("{Tab}");
  expect(button).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}");
  expect(tab1).toHaveFocus();

  await user.keyboard("{End}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Home}");
  expect(tab1).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent(/Content 1/gi);

  await user.keyboard("{ArrowDown}");
  expect(tab2).toHaveFocus();

  await user.keyboard(" ");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 2");

  await user.keyboard("{ArrowDown}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Enter}");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 3");

  await user.keyboard("{ArrowDown}");
  expect(tab1).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(tab2).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(tab1).toHaveFocus();

  await user.keyboard(" ");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Content 1");
});

test("updates the focus index when a user presses 'tab' key and `orientation` is 'vertical'", async () => {
  const user = userEvent.setup();
  render(<TestComponent orientation="vertical" />);

  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tab2 = screen.getByRole("tab", { name: "Tab Two" });
  const tab3 = screen.getByRole("tab", { name: "Tab Three" });

  await user.click(tab2);
  await user.keyboard("{ArrowDown}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(document.body).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(tab2).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(tab3).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(tab1).toHaveFocus();
});

test("shows an error icon when the `error` prop is specified", async () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" error />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const icon = screen.getByTestId("icon-error");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveStyle("color: rgb(219, 0, 78)");
});

test("includes error description in tab accessible name when `error` prop is specified", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" error />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab = screen.getByRole("tab");
  expect(tab).toHaveAccessibleName(/contains errors/i);
});

test("shows a warning icon when the `warning` prop is specified", async () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" warning />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const icon = screen.getByTestId("icon-warning");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveStyle("color: rgb(214, 67, 9)");
});

test("includes warning description in tab accessible name when `warning` prop is specified", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" warning />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab = screen.getByRole("tab");
  expect(tab).toHaveAccessibleName(/contains warnings/i);
});

test("shows an info icon when the `info` prop is specified", async () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" info />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const icon = screen.getByTestId("icon-info");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveStyle("color: rgb(0, 96, 167)");
});

test("includes info description in tab accessible name when `info` prop is specified", () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" info />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab = screen.getByRole("tab");
  expect(tab).toHaveAccessibleName(/contains information/i);
});

test("renders tablist with expected accessible name when `ariaLabel` prop is provided", () => {
  const ariaLabel = "Custom Tab List Label";

  render(
    <Tabs>
      <TabList ariaLabel={ariaLabel}>
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tabList = screen.getByRole("tablist");
  expect(tabList).toHaveAccessibleName(ariaLabel);
});

test("shows the validation icons regardless of whether tab panels are active", async () => {
  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
        <Tab id="tab-4" controls="tab-panel-4" label="Tab Four" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Textbox onChange={() => {}} value="" error />
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Textbox onChange={() => {}} value="" warning />
      </TabPanel>

      <TabPanel id="tab-panel-4" tabId="tab-4">
        <Textbox onChange={() => {}} value="" info />
      </TabPanel>
    </Tabs>,
  );

  const tab2 = screen.getByRole("tab", {
    name: "Tab Two The Tab Two tab contains errors",
  });
  const tab3 = screen.getByRole("tab", {
    name: "Tab Three The Tab Three tab contains warnings",
  });
  const tab4 = screen.getByRole("tab", {
    name: "Tab Four The Tab Four tab contains information",
  });

  const errorIcon = within(tab2).getByTestId("icon-error");
  expect(errorIcon).toBeInTheDocument();
  expect(errorIcon).toHaveStyle("color: rgb(219, 0, 78)");

  const warningIcon = within(tab3).getByTestId("icon-warning");
  expect(warningIcon).toBeInTheDocument();
  expect(warningIcon).toHaveStyle("color: rgb(214, 67, 9)");

  const infoIcon = within(tab4).getByTestId("icon-info");
  expect(infoIcon).toBeInTheDocument();
  expect(infoIcon).toHaveStyle("color: rgb(0, 96, 167)");
});

test("renders correctly when a default tab is specified", () => {
  render(<TestComponent selectedTabId="tab-3" />);
  const tab = screen.getByRole("tab", { name: "Tab Three" });
  const tabPanel = screen.getByRole("tabpanel");

  expect(tab).toBeInTheDocument();
  expect(tab).toHaveAttribute("aria-selected", "true");
  expect(tabPanel).toBeInTheDocument();
  expect(tabPanel).toHaveTextContent("Content 3");
});

test("calling exposed focusTab method with correct tabId focuses chosen tab", async () => {
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
          <TabPanel id="tab-panel-1" tabId="tab-1">
            <Typography>Content 1</Typography>
            <button data-role="test-button">Test button</button>
          </TabPanel>
          <TabPanel id="tab-panel-2" tabId="tab-2">
            <Typography>Content 2</Typography>
          </TabPanel>
          <TabPanel id="tab-panel-3" tabId="tab-3">
            <Typography>Content 3</Typography>
          </TabPanel>
        </Tabs>
        <Button onClick={() => tabsHandle.current?.focusTab("tab-3")}>
          Focus Tab 3
        </Button>
      </>
    );
  };

  render(<MockComponent />);

  const thirdTab = screen.getByRole("tab", {
    name: "Tab Three",
  });
  const button = screen.getByRole("button", {
    name: "Focus Tab 3",
  });

  await user.click(button);

  expect(thirdTab).toHaveFocus();
});

test("invokes the onTabChange handler the active tab changes", async () => {
  const user = userEvent.setup();
  const mockTabChangeFn = jest.fn();

  render(
    <Tabs>
      <TabList ariaLabel="Sample Tabs" onTabChange={mockTabChangeFn}>
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>,
  );

  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tab2 = screen.getByRole("tab", { name: "Tab Two" });
  const tab3 = screen.getByRole("tab", { name: "Tab Three" });

  // Clicking the active tab should not fire the change event
  await user.click(tab1);
  expect(mockTabChangeFn).not.toHaveBeenCalled();

  await user.click(tab2);
  expect(mockTabChangeFn).toHaveBeenCalledWith("tab-2");
  await user.click(tab3);
  expect(mockTabChangeFn).toHaveBeenCalledWith("tab-3");
  await user.click(tab1);
  expect(mockTabChangeFn).toHaveBeenCalledWith("tab-1");
});

test("applies the `data-element` and `data-role` props to expected elements", () => {
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
        <Typography>Content 1</Typography>
      </TabPanel>
    </Tabs>,
  );
  const tabs = screen.getByTestId("tabs-bar");
  const tabsList = screen.getByRole("tablist");
  const tab1 = screen.getByRole("tab", { name: "Tab One" });
  const tabPanel1 = screen.getByRole("tabpanel");

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
