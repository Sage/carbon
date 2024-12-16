import React, { useState } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, Tab } from ".";
import { StyledTabsHeaderWrapper } from "./__internal__/tabs-header/tabs-header.style";
import StyledTab from "./tab/tab.style";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Drawer from "../drawer";
import Textbox from "../textbox";
import NumeralDate from "../numeral-date";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Logger from "../../__internal__/utils/logger";

let loggerSpy: jest.SpyInstance;

beforeEach(() => {
  loggerSpy = jest.spyOn(Logger, "deprecate").mockImplementation(() => {});
});

afterEach(() => {
  loggerSpy.mockRestore();
});

testStyledSystemMargin(
  (props) => (
    <Tabs {...props}>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ),
  () => screen.getByTestId("tabs"),
);

testStyledSystemMargin(
  (props) => (
    <Tabs {...props} position="left">
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ),
  () => screen.getByTestId("tabs"),
);

test("should not throw an error when rendered with NumeralDate as a child", () => {
  expect(() => {
    render(
      <Tabs align="left" position="top">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <NumeralDate
            dateFormat={["dd", "mm", "yyyy"]}
            error="Tooltip position set to top"
            label="As string"
            tooltipPosition="top"
            value={{ dd: "01", mm: "01", yyyy: "0001" }}
          />
          <Textbox error="error" onChange={() => {}} />
        </Tab>
      </Tabs>,
    );
  }).not.toThrow();
});

test("should throw an error if rendered with `headerWidth` prop and `position` prop set to `top`", () => {
  const consoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  render(
    <Tabs position="top" headerWidth="500px">
      <Tab title="Tab Title 1" tabId="uniqueid1">
        TabContent
      </Tab>
    </Tabs>,
  );

  expect(consoleSpy).toHaveBeenCalledWith(
    "Invalid usage of prop headerWidth in Tabs. The headerWidth can be used only if position is set to left",
  );

  consoleSpy.mockRestore();
});

test("passes the `className` prop down to the element", () => {
  render(
    <Tabs className="custom-class-1 custom-class-2">
      <Tab tabId="foo" />
    </Tabs>,
  );

  expect(screen.getByTestId("tabs")).toHaveClass(
    "custom-class-1",
    "custom-class-2",
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'className' prop has been deprecated and will soon be removed from the 'Tabs' component.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
});

test("the `selectedTabId` prop determines which child `Tab` is displayed", () => {
  render(
    <Tabs selectedTabId="tab-2">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  expect(screen.getByText("Content for tab 1")).not.toBeVisible();
  expect(screen.getByText("Content for tab 2")).toBeVisible();
  expect(screen.getByText("Content for tab 3")).not.toBeVisible();
});

test("when the `renderHiddenTabs` prop is false, only the currently visible tab is rendered in the DOM", () => {
  render(
    <Tabs selectedTabId="tab-2" renderHiddenTabs={false}>
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  expect(screen.queryByText("Content for tab 1")).not.toBeInTheDocument();
  expect(screen.getByText("Content for tab 2")).toBeVisible();
  expect(screen.queryByText("Content for tab 3")).not.toBeInTheDocument();
});

test.each(["error", "warning", "info"] as const)(
  "when `renderHiddenTabs` is false, adds the correct %s state to the tab header only in the visible tab when the validation prop is set",
  (validation) => {
    render(
      <Tabs renderHiddenTabs={false} selectedTabId="uniqueid1">
        <Tab
          title="Tab Title 1"
          tabId="uniqueid1"
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
        >
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
        </Tab>
        <Tab
          title="Tab Title 2"
          tabId="uniqueid2"
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
        >
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
        </Tab>
      </Tabs>,
    );

    expect(
      within(screen.getByRole("tab", { name: "Tab Title 1" })).getByTestId(
        `icon-${validation}`,
      ),
    ).toBeVisible();
    expect(
      within(screen.getByRole("tab", { name: "Tab Title 2" })).queryByTestId(
        `icon-${validation}`,
      ),
    ).not.toBeInTheDocument();
  },
);

test("when the `renderHiddenTabs` prop is true, all tabs are rendered in the DOM with only the first visible", () => {
  render(
    <Tabs>
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();
  expect(screen.getByText("Content for tab 3")).not.toBeVisible();
});

test("when a tab title is clicked, the associated tab becomes the visible one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));
  expect(screen.getByText("Content for tab 1")).not.toBeVisible();
  expect(screen.getByText("Content for tab 2")).toBeVisible();
});

test("when a tab title is clicked, the `onTabChange` callback prop gets called with the tab id", async () => {
  const user = userEvent.setup();
  const onTabChange = jest.fn();
  render(
    <Tabs selectedTabId="tab-1" onTabChange={onTabChange}>
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));
  expect(onTabChange).toHaveBeenCalledTimes(1);
  expect(onTabChange).toHaveBeenCalledWith("tab-2");
});

test("updates the selected tab when the `selectedTabId` prop is updated", () => {
  const { rerender } = render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();

  rerender(
    <Tabs selectedTabId="tab-2">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByText("Content for tab 1")).not.toBeVisible();
  expect(screen.getByText("Content for tab 2")).toBeVisible();
});

test("blurs the previously-selected tab title when the `selectedTabId` prop is updated", () => {
  const { rerender } = render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  rerender(
    <Tabs selectedTabId="tab-2">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByRole("tab", { name: "Tab 1" })).not.toHaveFocus();
});

test("does not call the `onTabChange` callback when rerendered with the selected tab as the new `selectedTabId", async () => {
  const user = userEvent.setup();
  const onTabChange = jest.fn();
  const { rerender } = render(
    <Tabs selectedTabId="tab-1" onTabChange={onTabChange}>
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  await user.click(screen.getByRole("tab", { name: "Tab 2" }));
  expect(onTabChange).toHaveBeenCalledTimes(1);

  rerender(
    <Tabs selectedTabId="tab-2">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(onTabChange).toHaveBeenCalledTimes(1);
});

test("when the position is `top` (the default), pressing the right arrow key focuses the next tab title", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when the position is `top` (the default), pressing the right arrow key when focused on the last tab title focuses the first one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when the position is `top` (the default), pressing the left arrow key focuses the previous tab title", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when the position is `top` (the default), pressing the left arrow key when focused on the first tab title focuses the last one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when the position is `left`, pressing the down arrow key focuses the next tab title", async () => {
  const user = userEvent.setup();
  render(
    <Tabs position="left" selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when the position is `left`, pressing the down arrow key when focused on the last tab title focuses the first one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs position="left" selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when the position is `left`, pressing the up arrow key focuses the previous tab title", async () => {
  const user = userEvent.setup();
  render(
    <Tabs position="left" selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when the position is `left`, pressing the up arrow key when focused on the first tab title focuses the last one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs position="left" selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when the Enter key is pressed on a tab title, the associated tab becomes the visible one", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();

  act(() => {
    screen.getByRole("tab", { name: "Tab 2" }).focus();
  });
  await user.keyboard("{Enter}");
  expect(screen.getByText("Content for tab 1")).not.toBeVisible();
  expect(screen.getByText("Content for tab 2")).toBeVisible();
});

test("when a non-Enter, non-arrow key is pressed on a tab title, neither the visible tab nor the focused tab title updates", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();
  expect(screen.getByText("Content for tab 3")).not.toBeVisible();
  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("a");
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();
  expect(screen.getByText("Content for tab 3")).not.toBeVisible();
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when rendered in a Drawer sidebar, pressing the down arrow key focuses the next tab title", async () => {
  const user = userEvent.setup();
  render(
    <Drawer
      sidebar={
        <Tabs selectedTabId="tab-1">
          <Tab tabId="tab-1" title="Tab 1">
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3">
            Content for tab 3
          </Tab>
        </Tabs>
      }
    >
      drawer content
    </Drawer>,
  );
  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when rendered in a Drawer sidebar`, pressing the down arrow key when focused on the last tab title focuses the first one", async () => {
  const user = userEvent.setup();
  render(
    <Drawer
      sidebar={
        <Tabs selectedTabId="tab-1">
          <Tab tabId="tab-1" title="Tab 1">
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3">
            Content for tab 3
          </Tab>
        </Tabs>
      }
    >
      drawer content
    </Drawer>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when rendered in a Drawer sidebar, pressing the up arrow key focuses the previous tab title", async () => {
  const user = userEvent.setup();
  render(
    <Drawer
      sidebar={
        <Tabs selectedTabId="tab-1">
          <Tab tabId="tab-1" title="Tab 1">
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3">
            Content for tab 3
          </Tab>
        </Tabs>
      }
    >
      drawer content
    </Drawer>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 3" }).focus();
  });

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
});

test("when rendered in a Drawer sidebar, pressing the up arrow key when focused on the first tab title focuses the last one", async () => {
  const user = userEvent.setup();
  render(
    <Drawer
      sidebar={
        <Tabs selectedTabId="tab-1">
          <Tab tabId="tab-1" title="Tab 1">
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3">
            Content for tab 3
          </Tab>
        </Tabs>
      }
    >
      drawer content
    </Drawer>,
  );

  act(() => {
    screen.getByRole("tab", { name: "Tab 1" }).focus();
  });

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
});

test("when there is no validation issue in a tab, no validation icon is displayed in the tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("when there is an error in a tab, an error icon is displayed in the corresponding tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox error onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-error",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("when errors and warnings are both present in a tab, only the error icon is displayed in the corresponding tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox error onChange={() => {}} />
        <Textbox warning onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-error",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("error and warning icons are displayed correctly when the new validation flag is present and the tabs have position top", async () => {
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn>
      <Tabs selectedTabId="tab-1">
        <Tab tabId="tab-1" title="Tab 1" errorMessage="error">
          Content for tab 1
          <Textbox error onChange={() => {}} />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" warningMessage="warning">
          Content for tab 2
          <Textbox warning onChange={() => {}} />
        </Tab>
      </Tabs>
    </CarbonProvider>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).getByTestId(
      "icon-error",
    ),
  ).toBeInTheDocument();

  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-warning",
    ),
  ).toBeInTheDocument();

  await user.click(screen.getByRole("tab", { name: "Tab 1" }));

  expect(screen.getByTestId("tab-selected-indicator")).toHaveStyle({
    "--selected-indicator-color": "var(--colorsSemanticNegative500)",
  });

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));

  expect(screen.getByTestId("tab-selected-indicator")).toHaveStyle({
    "--selected-indicator-color": "var(--colorsSemanticCaution500)",
  });
});

test("error and warning icons are displayed correctly when the new validation flag is present and the tabs have position left", async () => {
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn>
      <Tabs selectedTabId="tab-1" position="left">
        <Tab tabId="tab-1" title="Tab 1" errorMessage="error">
          Content for tab 1
          <Textbox error onChange={() => {}} />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" warningMessage="warning">
          Content for tab 2
          <Textbox warning onChange={() => {}} />
        </Tab>
      </Tabs>
    </CarbonProvider>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).getByTestId(
      "icon-error",
    ),
  ).toBeInTheDocument();

  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-warning",
    ),
  ).toBeInTheDocument();

  await user.click(screen.getByRole("tab", { name: "Tab 1" }));

  expect(screen.getByTestId("tab-selected-indicator")).toHaveStyle({
    "--selected-indicator-color": "var(--colorsSemanticNegative500)",
  });

  await user.click(screen.getByRole("tab", { name: "Tab 2" }));

  expect(screen.getByTestId("tab-selected-indicator")).toHaveStyle({
    "--selected-indicator-color": "var(--colorsSemanticCaution500)",
  });
});

test("when errors, warnings and infos are all present in a tab, only the error icon is displayed in the corresponding tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox error onChange={() => {}} />
        <Textbox warning onChange={() => {}} />
        <Textbox info onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-error",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("when a tab has warnings and no errors, a warning icon is displayed in the corresponding tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox warning onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-warning",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("when a tab has info and no errors or warnings, an info icon is displayed in the corresponding tab title", () => {
  render(
    <Tabs selectedTabId="tab-1">
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox info onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId("icon-info"),
  ).toBeVisible();
});

test("an error icon is displayed in the corresponding tab title when specified by the `validationStatusOverride` prop", () => {
  render(
    <Tabs
      selectedTabId="tab-1"
      validationStatusOverride={{
        "tab-1": { error: false },
        "tab-2": { error: true },
      }}
    >
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox error onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-error",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("a warning icon is displayed in the corresponding tab title when specified by the `validationStatusOverride` prop", () => {
  render(
    <Tabs
      selectedTabId="tab-1"
      validationStatusOverride={{
        "tab-1": { warning: false },
        "tab-2": { warning: true },
      }}
    >
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox warning onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId(
      "icon-warning",
    ),
  ).toBeVisible();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
});

test("an info icon is displayed in the corresponding tab title when specified by the `validationStatusOverride` prop", () => {
  render(
    <Tabs
      selectedTabId="tab-1"
      validationStatusOverride={{
        "tab-1": { info: false },
        "tab-2": { info: true },
      }}
    >
      <Tab
        tabId="tab-1"
        title="Tab 1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox info onChange={() => {}} />
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <Textbox onChange={() => {}} />
      </Tab>
    </Tabs>,
  );

  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-error",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).queryByTestId(
      "icon-warning",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 1" })).queryByTestId(
      "icon-info",
    ),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("tab", { name: "Tab 2" })).getByTestId("icon-info"),
  ).toBeVisible();
});

test("arrow key navigation remains consistent when tab children are added and removed", async () => {
  const user = userEvent.setup();
  const WithConditionalChildren = () => {
    const [showAllTabs, setShowAllTabs] = useState(true);

    const generateTab = (tabTitle: string) => (
      <Tab title={tabTitle} tabId={tabTitle} key={tabTitle}>
        {tabTitle}
      </Tab>
    );

    return (
      <>
        <button
          id="foo"
          type="button"
          onClick={() => setShowAllTabs((prev) => !prev)}
        >
          Toggle children
        </button>
        <Tabs>
          {!showAllTabs && generateTab("tab-1")}
          {showAllTabs &&
            [1, 2, 3].map((tabNumber) => generateTab(`tab-${tabNumber}`))}
        </Tabs>
      </>
    );
  };
  render(<WithConditionalChildren />);

  act(() => {
    screen.getByRole("tab", { name: "tab-1" }).focus();
  });

  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-3" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-2" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-3" })).toHaveFocus();

  await user.click(screen.getByRole("button", { name: "Toggle children" }));
  expect(screen.getAllByRole("tab")).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "Toggle children" }));
  expect(screen.getAllByRole("tab")).toHaveLength(3);

  act(() => {
    screen.getByRole("tab", { name: "tab-1" }).focus();
  });

  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-3" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-2" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "tab-3" })).toHaveFocus();
  await user.click(screen.getByRole("button", { name: "Toggle children" }));
  expect(screen.getAllByRole("tab")).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "Toggle children" }));
  expect(screen.getAllByRole("tab")).toHaveLength(3);

  act(() => {
    screen.getByRole("tab", { name: "tab-1" }).focus();
  });

  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "tab-2" })).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "tab-3" })).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "tab-1" })).toHaveFocus();
});

test("has the expected `data-component` attribute", () => {
  render(
    <Tabs>
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  expect(screen.getByTestId("tabs")).toHaveAttribute("data-component", "tabs");
});

test("accepts `data-element` and `data-role` props", () => {
  render(
    <Tabs data-element="foo" data-role="bar">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "foo");
});

test("child Tab components accept a `data-role` prop via `titleProps` which is added to the corresponding tab title", () => {
  render(
    <Tabs>
      <Tab tabId="tab-id" titleProps={{ "data-role": "foo" }} />
    </Tabs>,
  );

  expect(screen.getByRole("tab")).toHaveAttribute("data-role", "foo");
});

test.each(["error", "warning", "info"])(
  "passes the all %s messages from the child inputs to the tooltip in the Tab title when they are strings and the `showValidationsSummary` prop is set",
  async (validation) => {
    const user = userEvent.setup();
    render(
      <Tabs showValidationsSummary>
        <Tab tabId="1" title="Test">
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "first validation message" }}
          />
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "second validation message" }}
          />
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "third validation message" }}
          />
        </Tab>
      </Tabs>,
    );

    await user.hover(
      within(screen.getByRole("tab", { name: "Test" })).getByTestId(
        `icon-${validation}`,
      ),
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "• first validation message • second validation message • third validation message",
    );
  },
);

test.each(["error", "warning", "info"])(
  "leaves out boolean values from the %s messages in child inputs from the tooltip in the Tab title when the `showValidationsSummary` prop is set",
  async (validation) => {
    const user = userEvent.setup();
    render(
      <Tabs showValidationsSummary>
        <Tab tabId="1" title="Test">
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "first validation message" }}
          />
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "third validation message" }}
          />
        </Tab>
      </Tabs>,
    );

    await user.hover(
      within(screen.getByRole("tab", { name: "Test" })).getByTestId(
        `icon-${validation}`,
      ),
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "• first validation message • third validation message",
    );
  },
);

test.each(["error", "warning", "info"])(
  "passes the %s message from the child inputs to the tooltip in the Tab title with no `•` character when there is only one such message, and the `showValidationsSummary` prop is set",
  async (validation) => {
    const user = userEvent.setup();
    render(
      <Tabs showValidationsSummary>
        <Tab tabId="1" title="Test">
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "first validation message" }}
          />
        </Tab>
      </Tabs>,
    );

    await user.hover(
      within(screen.getByRole("tab", { name: "Test" })).getByTestId(
        `icon-${validation}`,
      ),
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "first validation message",
    );
  },
);

test.each(["error", "warning", "info"])(
  "uses just the `%sMessage` prop as the tooltip message when all child validation props are boolean and the `showValidationsSummary` prop is set",
  async (validation) => {
    const user = userEvent.setup();
    render(
      <Tabs showValidationsSummary>
        <Tab
          tabId="1"
          title="Test"
          {...{ [`${validation}Message`]: "a single message" }}
        >
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
          <Textbox onChange={() => {}} {...{ [validation]: true }} />
        </Tab>
      </Tabs>,
    );

    await user.hover(
      within(screen.getByRole("tab", { name: "Test" })).getByTestId(
        `icon-${validation}`,
      ),
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("a single message");
  },
);

test.each(["error", "warning", "info"])(
  "uses just the `%sMessage` prop as the tooltip message when the `showValidationsSummary` prop is not set",
  async (validation) => {
    const user = userEvent.setup();
    render(
      <Tabs>
        <Tab
          tabId="1"
          title="Test"
          {...{ [`${validation}Message`]: "a single message" }}
        >
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "first validation message" }}
          />
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "second validation message" }}
          />
          <Textbox
            onChange={() => {}}
            {...{ [validation]: "third validation message" }}
          />
        </Tab>
      </Tabs>,
    );

    await user.hover(
      within(screen.getByRole("tab", { name: "Test" })).getByTestId(
        `icon-${validation}`,
      ),
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("a single message");
  },
);

// coverage - headerWidth prop tested in Chromatic
test.each(["35%", "100px", "5em"])(
  "should render tab header with the correct width when the `headerWidth` prop is provided and the `position` prop is `left`",
  (headerWidth) => {
    render(
      <Tabs position="left" headerWidth={headerWidth}>
        <Tab title="Tab Title 1" tabId="uniqueid1">
          TabContent
        </Tab>
      </Tabs>,
    );

    expect(screen.getByTestId("tabs")).toHaveStyleRule("width", headerWidth, {
      modifier: `${StyledTabsHeaderWrapper}`,
    });
    expect(screen.getByTestId("tabs")).toHaveStyleRule(
      "width",
      `calc(100% - ${headerWidth})`,
      {
        modifier: `${StyledTab}`,
      },
    );
  },
);

// coverage
test("leaves the same tab content visible when the already-selected tab is clicked", async () => {
  const user = userEvent.setup();
  render(
    <Tabs selectedTabId="tab-1">
      <Tab tabId="tab-1" title="Tab 1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3">
        Content for tab 3
      </Tab>
    </Tabs>,
  );

  await user.click(screen.getByRole("tab", { name: "Tab 1" }));
  expect(screen.getByText("Content for tab 1")).toBeVisible();
  expect(screen.getByText("Content for tab 2")).not.toBeVisible();
});

test("renders the tabs with the correct size when the `size` prop is set to default", () => {
  render(
    <Tabs size="default">
      <Tab tabId="1" title="Test 1">
        Content
      </Tab>
      <Tab tabId="2" title="Test 2">
        Content
      </Tab>
    </Tabs>,
  );
  expect(screen.getByTestId("tab-container")).toHaveStyle("height: 42px");
});

test("renders the tabs with the correct size when the `size` prop is set to large", () => {
  render(
    <Tabs size="large">
      <Tab tabId="1" title="Test 1">
        Content
      </Tab>
      <Tab tabId="2" title="Test 2">
        Content
      </Tab>
    </Tabs>,
  );
  expect(screen.getByTestId("tab-container")).toHaveStyle("height: 50px");
});
