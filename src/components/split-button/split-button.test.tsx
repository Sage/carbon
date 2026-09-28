import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/dom";
import SplitButton, { SplitButtonHandle } from "./split-button.component";
import Button from "../button/__next__";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import I18nProvider from "../i18n-provider";
import {
  FlatTable,
  FlatTableBody,
  FlatTableRow,
  FlatTableCell,
} from "../flat-table";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "guid-12345");

testStyledSystemMargin(
  (props) => (
    <SplitButton data-role="split-button-container" text="Test" {...props}>
      <Button>Test</Button>
    </SplitButton>
  ),
  () => screen.getByTestId("split-button-container"),
);

const MockComponent = () => {
  const splitButtonHandle = React.useRef<SplitButtonHandle>(null);
  return (
    <div>
      <SplitButton ref={splitButtonHandle} text="Main Button">
        <Button>Single Button</Button>
      </SplitButton>
      ,
      <Button onClick={() => splitButtonHandle.current?.focusMainButton()}>
        Press me to focus on the main button
      </Button>
      <Button onClick={() => splitButtonHandle.current?.focusToggleButton()}>
        Press me to focus on the toggle button
      </Button>
    </div>
  );
};

test("renders the main and toggle buttons", () => {
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Main" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Show more" })).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "Single Button" }),
  ).not.toBeInTheDocument();
});

test("renders child buttons when toggle button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  expect(screen.getByRole("button", { name: "Main" })).toBeVisible();
  expect(toggle).toBeVisible();
  expect(
    await screen.findByRole("button", { name: "Extra Button 1" }),
  ).toBeVisible();
  expect(
    await screen.findByRole("button", { name: "Extra Button 2" }),
  ).toBeVisible();
  expect(
    await screen.findByRole("button", { name: "Extra Button 3" }),
  ).toBeVisible();
});

test("anchors a left-positioned menu to the SplitButton container", async () => {
  const computePositionSpy = jest.spyOn(floatingUi, "computePosition");
  const user = userEvent.setup();

  render(
    <SplitButton data-role="split-button-container" text="Main" position="left">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const splitButton = screen.getByTestId("split-button-container");

  await user.click(screen.getByRole("button", { name: "Show more" }));

  expect(computePositionSpy).toHaveBeenCalledWith(
    splitButton,
    expect.any(HTMLElement),
    expect.objectContaining({
      placement: "bottom-start",
      strategy: "fixed",
    }),
  );

  computePositionSpy.mockRestore();
});

test("applies a custom menu width", async () => {
  const user = userEvent.setup();

  render(
    <SplitButton menuWidth="320px" text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));

  const menu = screen.getByTestId("menu-wrapper");

  await waitFor(() => expect(menu).toHaveStyle({ width: "320px" }));
});

test("only starts and cleans up floating autoUpdate when additional buttons are visible", async () => {
  jest.clearAllMocks();

  const user = userEvent.setup();
  const cleanupSpy = jest.fn();
  const autoUpdateSpy = jest
    .spyOn(floatingUi, "autoUpdate")
    .mockImplementation(() => cleanupSpy);

  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(autoUpdateSpy).not.toHaveBeenCalled();

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  expect(autoUpdateSpy).toHaveBeenCalledTimes(1);

  await user.click(toggle);

  expect(cleanupSpy).toHaveBeenCalledTimes(1);

  jest.resetAllMocks();
});

test("should focus the main button when the focusMainButton on the ref handle is invoked", async () => {
  const user = userEvent.setup();
  render(<MockComponent />);
  const button = screen.getByRole("button", {
    name: "Press me to focus on the main button",
  });

  await user.click(button);

  expect(screen.getByRole("button", { name: "Main Button" })).toHaveFocus();
});

test("should focus the toggle button when the focusToggleButton on the ref handle is invoked", async () => {
  const user = userEvent.setup();
  render(<MockComponent />);
  const button = screen.getByRole("button", {
    name: "Press me to focus on the toggle button",
  });

  await user.click(button);

  expect(screen.getByRole("button", { name: "Show more" })).toHaveFocus();
});

test("should have correct default aria-label when no prop passed", () => {
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByLabelText("Show more")).toBeInTheDocument();
});

test("should render custom aria-label when 'aria-label' prop is passed", () => {
  render(
    <SplitButton text="Main" aria-label="Show more options">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByLabelText("Show more options")).toBeInTheDocument();
});

test("should render with custom aria-label set via 'locale'", () => {
  render(
    <I18nProvider
      locale={{ splitButton: { ariaLabel: () => "Show more options" } }}
    >
      <SplitButton text="Main">
        <Button>Single Button</Button>
      </SplitButton>
    </I18nProvider>,
  );

  expect(screen.getByLabelText("Show more options")).toBeInTheDocument();
});

test("should render with the correct data attributes on container", () => {
  render(
    <SplitButton text="Main" data-element="bar" data-role="baz">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const splitButton = screen.getByTestId("baz");
  expect(splitButton).toHaveAttribute("data-component", "split-button");
  expect(splitButton).toHaveAttribute("data-element", "bar");
  expect(splitButton).toHaveAttribute("data-role", "baz");
});

test("should render with the correct data attributes on the main button", () => {
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const mainButton = screen.getByRole("button", { name: "Main" });
  expect(mainButton).toHaveAttribute("data-component", "button");
  expect(mainButton).toHaveAttribute("data-element", "main-button");
});

test("should render with correct data attributes on the toggle button element", () => {
  render(
    <SplitButton text="Main" data-element="bar" data-role="baz">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });

  expect(toggle).toHaveAttribute("data-element", "toggle-button");
});

test("should render with custom id when 'id' prop is passed", () => {
  render(
    <SplitButton text="Main" id="custom-id">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Main" })).toHaveAttribute(
    "id",
    "custom-id",
  );
});

test("should render with custom class when 'className' prop is passed", () => {
  render(
    <SplitButton text="Main" className="custom-class">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Main" })).toHaveClass(
    "custom-class",
  );
});

test("should render with disabled state when 'disabled' prop is passed", () => {
  render(
    <SplitButton text="Main" disabled>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Main" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Show more" })).toBeDisabled();
});

test("should render non-Carbon Button children", async () => {
  const user = userEvent.setup();
  const spanElement = <span>span-element</span>;
  render(<SplitButton text="Main">{spanElement}</SplitButton>);

  await user.click(screen.getByRole("button", { name: "Show more" }));
  expect(await screen.findByText("span-element")).toBeVisible();
});

test("should render with the correct styles when 'buttonType' prop is 'primary' and not disabled", () => {
  render(
    <SplitButton text="Main" buttonType="primary">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Show more" })).toHaveStyle({
    position: "relative",
  });
});

test("should not render the child buttons when a click event detected on toggle button and 'disabled' prop set", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" disabled>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));
  const childButton = screen.queryByRole("button", { name: "Single Button" });

  expect(childButton).not.toBeInTheDocument();
});

test("should render the child buttons when a 'Enter' keydown event detected", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  expect(toggle).toHaveFocus();
  await user.keyboard("{Enter}");
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();
});

test("should render the child buttons when a ' ' (space) keydown event detected", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );
  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard(" ");
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();
});

test("should render the child buttons when a 'ArrowDown' keydown event detected", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard("{arrowDown}");
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();
});

test("should not render the child buttons when a keydown event detected with unrelated key and toggle button is focused", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = await screen.findByRole("button", { name: "Show more" });
  toggle.focus();
  expect(toggle).toHaveFocus();
  await user.keyboard("{a}");
  const child = screen.queryByRole("button", { name: "Single Button" });

  expect(child).not.toBeInTheDocument();
});

test("should not render the child buttons when a 'Enter' keydown event detected and main button is focused", async () => {
  const user = userEvent.setup();
  const onKeyDownMock = jest.fn();
  render(
    <SplitButton text="Main" onKeyDown={onKeyDownMock}>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const main = await screen.findByRole("button", { name: "Main" });
  await user.tab();

  expect(main).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(onKeyDownMock).toHaveBeenCalled();
  expect(
    screen.queryByRole("button", { name: "Single Button" }),
  ).not.toBeInTheDocument();
});

test("should not render the child buttons when a 'Space' keydown event detected and main button is focused", async () => {
  const user = userEvent.setup();
  const onKeyDownMock = jest.fn();
  render(
    <SplitButton text="Main" onKeyDown={onKeyDownMock}>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const main = await screen.findByRole("button", { name: "Main" });
  await user.tab();

  expect(main).toHaveFocus();
  await user.keyboard("{space}");
  expect(onKeyDownMock).toHaveBeenCalled();
  expect(
    screen.queryByRole("button", { name: "Single Button" }),
  ).not.toBeInTheDocument();
});

test("should not render the child buttons when main button is clicked", async () => {
  const user = userEvent.setup();
  const onClickMock = jest.fn();
  render(
    <SplitButton text="Main" onClick={onClickMock}>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const main = await screen.findByRole("button", { name: "Main" });
  await user.click(main);

  expect(onClickMock).toHaveBeenCalled();
  expect(
    screen.queryByRole("button", { name: "Single Button" }),
  ).not.toBeInTheDocument();
});

test("should not call the `onClick` handle when main button is clicked whilst disabled", async () => {
  const user = userEvent.setup();
  const onClickMock = jest.fn();
  render(
    <SplitButton text="Main" onClick={onClickMock} disabled>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main" }));

  expect(onClickMock).not.toHaveBeenCalled();
});

test("closes additional buttons popup when a click occurs outside the component", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);
  const childButton = screen.getByRole("button", { name: "Single Button" });

  expect(childButton).toBeVisible();
  await user.click(document.body);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("should hide the additional buttons when the list is open and 'Enter' key is pressed on the toggle button", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard("{Enter}");
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();
  await user.keyboard("{Enter}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when 'Space' key is pressed on the toggle button", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(childButton).toBeVisible();

  await user.keyboard(" ");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when Escape is pressed and focus is within the popup", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const button1 = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(button1).toBeVisible();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when Escape is pressed and focus is not within the popup", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = await screen.findByRole("button", { name: "Show more" });
  await user.click(toggle);

  const button1 = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(button1).toBeVisible();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("calls child's onClick callback and closes additional buttons popup when a child button is clicked", async () => {
  const user = userEvent.setup();
  const onClickMock = jest.fn();
  const onClickOnChildMock = jest.fn();
  render(
    <SplitButton text="Main" onClick={onClickMock}>
      <Button onClick={onClickOnChildMock}>Child Button</Button>
    </SplitButton>,
  );

  const toggle = await screen.findByRole("button", { name: "Show more" });
  await user.click(toggle);
  const child = await screen.findByRole("button", { name: "Child Button" });

  await user.click(child);

  expect(onClickOnChildMock).toHaveBeenCalled();
  expect(onClickMock).not.toHaveBeenCalled();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when the main button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  const main = screen.getByRole("button", { name: "Main" });
  await user.click(toggle);
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();

  await user.click(main);

  expect(childButton).not.toBeVisible();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when the toggle button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();

  await user.click(toggle);

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when focus is lost from it", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(childButton).toBeVisible();

  // Tab out of the menu
  await user.tab();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when a custom adaptive sidebar blur event is dispatched", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const childButton = screen.queryByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toBeVisible();

  await act(async () => {
    document.dispatchEvent(
      new CustomEvent("adaptiveSidebarModalFocusIn", {
        bubbles: true,
        detail: { source: "adaptiveSidebarModal" },
      }),
    );
  });

  expect(childButton).not.toBeVisible();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();

  jest.useRealTimers();
});

test("can navigate through additional buttons via down key presses", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button2 = await screen.findByRole("button", {
    name: "Extra Button 2",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  // Focus automatically moves to button1 when menu opens via click
  expect(button1).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button2).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button3).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button3).toHaveFocus();
});

test("can navigate through additional buttons via up key presses but stop on first button", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  await user.keyboard("{arrowDown}");
  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button2 = await screen.findByRole("button", {
    name: "Extra Button 2",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.keyboard("{arrowDown}");
  await user.keyboard("{end}");
  expect(button3).toHaveFocus();
  await user.keyboard("{arrowUp}");
  expect(button2).toHaveFocus();
  await user.keyboard("{arrowUp}");
  expect(button1).toHaveFocus();
  await user.keyboard("{arrowUp}");
  expect(button1).toHaveFocus();
});

test("focuses last child button when End key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  // Focus automatically moves to button1 when menu opens
  expect(button1).toHaveFocus();
  await user.keyboard("{end}");
  expect(button3).toHaveFocus();
});

test("focuses first child button when Home key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Extra Button 1</Button>
      <Button>Extra Button 2</Button>
      <Button>Extra Button 3</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));

  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  // Focus automatically moves to button1 when menu opens
  expect(button1).toHaveFocus();
  await user.keyboard("{End}");
  expect(button3).toHaveFocus();

  await user.keyboard("{Home}");
  expect(button1).toHaveFocus();
});

test("renders backdrop when opened inside FlatTable and closes the menu when backdrop is clicked", async () => {
  const user = userEvent.setup();

  render(
    <FlatTable>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>
            <SplitButton text="Main">
              <Button>Single Button</Button>
            </SplitButton>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));

  const backdrop = screen.getByTestId("popup-backdrop");
  const submenuButton = screen.getByRole("button", { name: "Single Button" });

  expect(backdrop).toBeVisible();

  await user.click(backdrop);
  expect(submenuButton).not.toBeInTheDocument();
});

test("should apply secondary background color to toggle button when isWhite is true and button is displayed", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" buttonType="secondary" isWhite>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  expect(toggle).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-active)",
    {
      modifier: "&:not(:disabled)",
    },
  );
  expect(toggle).toHaveStyleRule(
    "border-color",
    "var(--button-typical-secondary-bg-active)",
    {
      modifier: "&:not(:disabled)",
    },
  );
});

test("should apply primary background color to toggle button when isWhite is false and button is displayed", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" buttonType="primary">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  expect(toggle).toHaveStyleRule(
    "background-color",
    "var(--button-typical-primary-bg-active)",
    {
      modifier: "&:not(:disabled)",
    },
  );
  expect(toggle).toHaveStyleRule(
    "border-color",
    "var(--button-typical-primary-bg-active)",
    {
      modifier: "&:not(:disabled)",
    },
  );
});
