import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SplitButton, { SplitButtonHandle } from "./split-button.component";
import Button from "../button";
import { SizeOptions } from "../button/button.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import I18nProvider from "../i18n-provider";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "guid-12345");

type SizeConfig = {
  fontSize: string;
  minHeight: string;
  paddingLeft: string;
  paddingRight: string;
};

const buildSizeConfig = (size: SizeOptions): SizeConfig => {
  if (size === "small") {
    return {
      minHeight: "32px",
      paddingLeft: "var(--spacing200)",
      paddingRight: "var(--spacing200)",
      fontSize: "var(--fontSizes100)",
    };
  }

  if (size === "large") {
    return {
      minHeight: "48px",
      paddingLeft: "var(--spacing400)",
      paddingRight: "var(--spacing400)",
      fontSize: "var(--fontSizes200)",
    };
  }

  return {
    minHeight: "40px",
    paddingLeft: "var(--spacing300)",
    paddingRight: "var(--spacing300)",
    fontSize: "var(--fontSizes100)",
  };
};

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

test("should render with the correct styles when 'size' is 'small''", async () => {
  const { fontSize, minHeight, paddingLeft, paddingRight } =
    buildSizeConfig("small");
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" size="small">
      <Button size="small">Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  const mainButton = screen.getByRole("button", { name: "Main" });

  expect(mainButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });

  await user.click(toggle);
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });
});

test("should render with the correct styles when 'size' is 'medium''", async () => {
  const { fontSize, minHeight, paddingLeft, paddingRight } =
    buildSizeConfig("medium");
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" size="medium">
      <Button size="medium">Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  const mainButton = screen.getByRole("button", { name: "Main" });

  expect(mainButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });

  await user.click(toggle);
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });
});

test("should render with the correct styles when 'size' is 'large''", async () => {
  const { fontSize, minHeight, paddingLeft, paddingRight } =
    buildSizeConfig("large");
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" size="large">
      <Button size="large">Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  const mainButton = screen.getByRole("button", { name: "Main" });

  expect(mainButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });

  await user.click(toggle);
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(childButton).toHaveStyle({
    fontSize,
    minHeight,
    paddingLeft,
    paddingRight,
  });
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

test("should render with correct data attributes on the additional button element container", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" data-element="bar" data-role="baz">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);
  const additionalButtons = await screen.findByRole("list");

  expect(additionalButtons).toHaveAttribute(
    "data-element",
    "additional-buttons",
  );
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

test("should render with the correct styles when 'buttonType' prop is 'primary' and disabled", () => {
  render(
    <SplitButton text="Main" buttonType="primary" disabled>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  expect(screen.getByRole("button", { name: "Show more" })).not.toHaveStyle({
    position: "relative",
  });
});

test("should render additional button text with align set to 'left'", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" align="left">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(childButton).toHaveStyle({ textAlign: "left" });
});

test("should render additional button text with align set to 'right'", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" align="right">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));
  const childButton = await screen.findByRole("button", {
    name: "Single Button",
  });
  expect(childButton).toHaveStyle({ textAlign: "right" });
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

test("should render the child buttons when a 'Enter' keydown event detected and toggle button is focused", async () => {
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
  expect(toggle).toHaveFocus();
});

test("should render the child buttons when a ' ' (space) keydown event detected and toggle button is focused", async () => {
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
  expect(toggle).toHaveFocus();
});

test("should render the child buttons when a 'ArrowDown' keydown event detected and toggle button is focused", async () => {
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
  expect(toggle).toHaveFocus();
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

test("should hide the additional buttons when a click event detected outside the component", async () => {
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

test("should hide the additional buttons when the list is open and 'Space' key is pressed on the toggle button", async () => {
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
  await user.keyboard(" ");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("should hide the additional buttons when a 'Escape' keydown event detected and focus is within component", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard("{arrowDown}");

  const button1 = await screen.findByRole("button", {
    name: "Single Button",
  });

  expect(button1).toBeVisible();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("should hide the additional buttons when a 'Escape' keydown event detected and focus is not within component", async () => {
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

test("should call the relevant 'onClick' callback and hide the additional buttons when a child button is clicked", async () => {
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

test("should hide the additional buttons when the main button is clicked", async () => {
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

  expect(childButton).not.toBeInTheDocument();
});

test("should hide the additional buttons when the list is open the toggle button is clicked", async () => {
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

test("should support navigating the additional buttons via down arrow key but stop on last button", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
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
  expect(button1).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button2).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button3).toHaveFocus();
  await user.keyboard("{arrowDown}");
  expect(button3).toHaveFocus();
});

test("should support navigating the additional buttons via up arrow key but stop on first button", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
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
  toggle.focus();
  await user.keyboard("{arrowDown}");
  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.tab();
  expect(button1).toHaveFocus();
  await user.keyboard("{end}");
  expect(button3).toHaveFocus();
});

test("focuses last child button when Control and ArrowDown key are pressed together", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Extra Button 1</Button>
      <Button>Extra Button 2</Button>
      <Button>Extra Button 3</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));

  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.tab();
  await user.keyboard("{Control>}{ArrowDown}{/Control}");

  expect(button3).toHaveFocus();
});

test("focuses last child button when Meta and ArrowDown key are pressed together", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button>Extra Button 1</Button>
      <Button>Extra Button 2</Button>
      <Button>Extra Button 3</Button>
    </SplitButton>,
  );

  await user.click(screen.getByRole("button", { name: "Show more" }));

  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.tab();
  await user.keyboard("{Meta>}{ArrowDown}{/Meta}");

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

  await user.tab();
  await user.keyboard("{End}");
  expect(button3).toHaveFocus();

  await user.keyboard("{Home}");
  expect(button1).toHaveFocus();
});

test("focuses first child button when Control and ArrowUp key are pressed together", async () => {
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

  await user.tab();
  await user.keyboard("{End}");

  expect(button3).toHaveFocus();

  await user.keyboard("{Control>}{ArrowUp}{/Control}");

  expect(button1).toHaveFocus();
});

test("focuses first child button when Meta and ArrowUp key are pressed together", async () => {
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

  await user.tab();
  await user.keyboard("{End}");

  expect(button3).toHaveFocus();

  await user.keyboard("{Meta>}{ArrowUp}{/Meta}");

  expect(button1).toHaveFocus();
});

test("should support navigating the additional buttons via tab key", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard("{Enter}");
  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button2 = await screen.findByRole("button", {
    name: "Extra Button 2",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.tab();
  expect(button1).toHaveFocus();
  await user.tab();
  expect(button2).toHaveFocus();
  await user.tab();
  expect(button3).toHaveFocus();
});

test("should support navigating the additional buttons via shift+tab key, hide the list when pressed on first button and refocus toggle", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main">
      <Button key="testKey1">Extra Button 1</Button>
      <Button key="testKey2">Extra Button 2</Button>
      <Button key="testKey3">Extra Button 3</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  toggle.focus();
  await user.keyboard("{Enter}");
  const button1 = await screen.findByRole("button", {
    name: "Extra Button 1",
  });
  const button2 = await screen.findByRole("button", {
    name: "Extra Button 2",
  });
  const button3 = await screen.findByRole("button", {
    name: "Extra Button 3",
  });

  await user.tab();
  expect(button1).toHaveFocus();
  await user.keyboard("{end}");
  expect(button3).toHaveFocus();
  await user.tab({ shift: true });
  expect(button2).toHaveFocus();
  await user.tab({ shift: true });
  expect(button1).toHaveFocus();
  await user.tab({ shift: true });

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(toggle).toHaveFocus();
});

test("should render white variant", async () => {
  render(
    <SplitButton text="Main" isWhite>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const mainButton = screen.getByRole("button", { name: "Main" });

  expect(mainButton).toHaveStyleRule(
    "border-color",
    "var(--colorsActionMajorYang100)",
  );
});

test("should render disabled white variant", () => {
  render(
    <SplitButton text="Main" isWhite disabled>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const mainButton = screen.getByRole("button", { name: "Main" });

  expect(mainButton).toHaveStyleRule("border-color", "#4B4B4B");
});

test("should have the correct colors when the toggle button is clicked in the white variant", async () => {
  const user = userEvent.setup();
  render(
    <SplitButton text="Main" isWhite>
      <Button>Single Button</Button>
    </SplitButton>,
  );

  const toggle = screen.getByRole("button", { name: "Show more" });
  await user.click(toggle);

  expect(toggle).toHaveStyleRule(
    "background",
    "var(--colorsActionMajorYang100)",
    {
      modifier: ":hover",
    },
  );
  expect(toggle).toHaveStyleRule("color", "var(--colorsUtilityYin100)", {
    modifier: ":hover",
  });
});
