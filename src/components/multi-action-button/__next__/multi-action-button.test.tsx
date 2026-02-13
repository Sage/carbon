import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiActionButton, { MultiActionButtonHandle } from ".";
import Button from "../../button";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

test("should render with provided 'text'", () => {
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toBeVisible();
});

test("should render with provided 'subtext' when 'size' is 'large'", () => {
  render(
    <MultiActionButton text="Main Button" subtext="Subtext" size="large">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByText("Subtext")).toBeVisible();
});

test("should render when children are non-Carbon Button children", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <span>First</span>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  expect(screen.getByText("First")).toBeVisible();
});

test("should render with provided 'data-' tags", () => {
  render(
    <MultiActionButton text="Main Button" data-element="foo" data-role="bar">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "foo");
});

test("should render with provided 'id'", () => {
  render(
    <MultiActionButton text="Main Button" id="test">
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toHaveAttribute(
    "id",
    "test",
  );
});

test("should call 'onClick' when the main button is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button" onClick={onClick}>
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should focus the main button when the focusMainButton on the ref handle is invoked", async () => {
  const MockComponent = () => {
    const multiActionButtonHandle = React.useRef<MultiActionButtonHandle>(null);
    return (
      <div>
        <MultiActionButton ref={multiActionButtonHandle} text="Main Button">
          <span>First</span>
        </MultiActionButton>
        ,
        <Button
          onClick={() => multiActionButtonHandle.current?.focusMainButton()}
        >
          Press me to focus on MultiActionButton
        </Button>
      </div>
    );
  };

  const user = userEvent.setup();
  render(<MockComponent />);
  const button = screen.getByRole("button", {
    name: "Press me to focus on MultiActionButton",
  });

  await user.click(button);

  expect(screen.getByRole("button", { name: "Main Button" })).toHaveFocus();
});

test("should open additional buttons when the main button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
      <Button>Second</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  const button = screen.getByRole("button", { name: "First" });

  expect(button).toBeVisible();
});

test("closes additional buttons popup when the toggle button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  expect(screen.getByRole("button", { name: "First" })).toBeVisible();

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("closes additional buttons popup when a child button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  await user.click(screen.getByRole("button", { name: "First" }));

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("closes additional buttons popup when a click occurs outside the component", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  await user.click(document.body);

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("closes additional buttons popup when focus is lost from it", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  const childButton = await screen.findByRole("button", { name: "First" });
  expect(childButton).toBeVisible();

  await user.tab();
  expect(childButton).toHaveFocus();

  await user.tab({ shift: true });
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("closes additional buttons popup when a custom adaptive sidebar blur event is dispatched", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));

  const button = screen.queryByRole("button", { name: "First" });

  expect(button).toBeVisible();

  await act(async () => {
    document.dispatchEvent(
      new CustomEvent("adaptiveSidebarModalFocusIn", {
        bubbles: true,
        detail: { source: "adaptiveSidebarModal" },
      }),
    );
  });

  expect(button).not.toBeVisible();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();

  jest.useRealTimers();
});

test("closes additional buttons popup when Escape key is pressed", async () => {
  const user = userEvent.setup();
  render(
    <MultiActionButton text="Main Button">
      <Button>First</Button>
    </MultiActionButton>,
  );

  await user.click(screen.getByRole("button", { name: "Main Button" }));
  expect(screen.getByRole("button", { name: "First" })).toBeVisible();

  await user.keyboard("{Escape}");

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
});

test("should render main button as disabled when 'disabled' prop is true", () => {
  render(
    <MultiActionButton text="Main Button" disabled>
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByRole("button", { name: "Main Button" })).toBeDisabled();
});

test("should render with expected styles when 'width' prop is set", () => {
  render(
    <MultiActionButton
      text="Main Button"
      width="50%"
      data-role="multi-action-button"
    >
      <Button>First</Button>
    </MultiActionButton>,
  );

  expect(screen.getByTestId("multi-action-button")).toHaveStyle({
    width: "50%",
  });
  expect(screen.getByRole("button", { name: "Main Button" })).toHaveStyle({
    width: "100%",
    justifyContent: "space-between",
  });
});

testStyledSystemMargin(
  (props) => (
    <MultiActionButton data-role="multi-action-button" text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  ),
  () => screen.getByTestId("multi-action-button"),
);
