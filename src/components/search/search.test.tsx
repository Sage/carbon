import React, { useRef } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search, { SearchHandle } from "./search.component";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";
import I18nProvider from "../i18n-provider";

jest.mock("../../__internal__/utils/logger");

testStyledSystemMargin(
  (props) => <Search value="" {...props} />,
  () => screen.getByTestId("search"),
);

test("a deprecation warning should be displayed once if the component is uncontrolled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Search defaultValue="foo" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Search` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
  );

  expect(loggerSpy).toHaveBeenCalledTimes(1);
});

test("the search input has a default accessible name of `search`", () => {
  render(<Search defaultValue="" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleName("search");
});

test("the `aria-label` prop passes a custom accessible name to the search input", () => {
  render(<Search defaultValue="" aria-label="foobar" />);

  expect(screen.getByRole("textbox")).toHaveAccessibleName("foobar");
});

test("when the `searchButton` prop is `true`, a button with search icon is shown, and no icon appears in the textbox", () => {
  render(<Search searchButton value="" />);

  const searchButton = screen.getByRole("button", { name: "search button" });
  expect(searchButton).toBeVisible();
  expect(within(searchButton).getByTestId("icon")).toHaveAttribute(
    "type",
    "search",
  );
  expect(
    within(screen.getByTestId("input-presentation-container")).queryByTestId(
      "icon",
    ),
  ).not.toBeInTheDocument();
});

test("when the `searchButton` prop is a string value, a button with search icon is shown, and no icon appears in the textbox", () => {
  render(<Search searchButton="custom search button" value="" />);

  const searchButton = screen.getByRole("button", { name: "search button" });
  expect(searchButton).toBeVisible();
  expect(searchButton).toHaveTextContent("custom search button");
  expect(within(searchButton).getByTestId("icon")).toHaveAttribute(
    "type",
    "search",
  );
  expect(
    within(screen.getByTestId("input-presentation-container")).queryByTestId(
      "icon",
    ),
  ).not.toBeInTheDocument();
});

test("when the `searchButton` prop is not passed, no button with is shown, and an icon is rendered in the textbox", () => {
  render(<Search value="" />);

  expect(
    screen.queryByRole("button", { name: "search button" }),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByTestId("input-presentation-container")).getByTestId(
      "icon",
    ),
  ).toHaveAttribute("type", "search");
});

test("the search button text can be overridden via the locale context", () => {
  render(
    <I18nProvider
      locale={{ search: { searchButtonText: () => "text override" } }}
    >
      <Search searchButton value="" />
    </I18nProvider>,
  );

  expect(screen.getByRole("button")).toHaveTextContent("text override");
});

test("the search button has a default accessible name of `search button`", () => {
  render(<Search defaultValue="" searchButton />);

  expect(screen.getByRole("button")).toHaveAccessibleName("search button");
});

test("the `searchButtonAriaLabel` prop passes a custom accessible name to the search button", () => {
  render(
    <Search
      defaultValue=""
      searchButton
      searchButtonAriaLabel="foobar button"
    />,
  );

  expect(screen.getByRole("button")).toHaveAccessibleName("foobar button");
});

test("the `onClick` callback prop is not called when the input is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Search value="" onClick={onClick} />);

  await user.click(screen.getByRole("textbox"));
  expect(onClick).not.toHaveBeenCalled();
});

test("when the input is focused, the `onFocus` callback prop is called", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(<Search value="" onFocus={onFocus} />);

  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("when the input is blurred, the `onBlur` callback prop is called", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(<Search value="" onBlur={onBlur} />);

  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("when a key is pressed, the `onKeyDown` callback prop is called", async () => {
  const user = userEvent.setup();
  const onKeyDown = jest.fn();
  render(<Search value="" onKeyDown={onKeyDown} />);

  await user.type(screen.getByRole("textbox"), "a");
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test("when the cross icon is clicked, the input value is cleared", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Search defaultValue="foo" onChange={onChange} name="bar" id="baz" />);

  await user.click(screen.getByTestId("input-icon-toggle"));

  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ target: { value: "", name: "bar", id: "baz" } }),
  );
});

test("when the cross icon is clicked, and the `triggerOnClear` props is passed, the `onClick` callback prop is called", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Search
      defaultValue="foo"
      searchButton
      triggerOnClear
      onClick={onClick}
      name="bar"
      id="baz"
    />,
  );
  await user.click(screen.getByTestId("input-icon-toggle"));

  expect(onClick).toHaveBeenCalledWith({
    target: {
      name: "bar",
      id: "baz",
      value: "",
    },
  });
});

test("when the cross icon is clicked, and the `triggerOnClear` props is not passed, the `onClick` callback prop is not called", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Search
      defaultValue="foo"
      searchButton
      onClick={onClick}
      name="bar"
      id="baz"
    />,
  );
  await user.click(screen.getByTestId("input-icon-toggle"));

  expect(onClick).not.toHaveBeenCalled();
});

test("when the component is uncontrolled, the input takes its initial value from the `defaultValue` prop", () => {
  render(<Search defaultValue="Bar" />);

  expect(screen.getByRole("textbox")).toHaveValue("Bar");
});

test("when the component is controlled, the input takes its value from the `value` prop", () => {
  render(<Search value="Bar" />);

  expect(screen.getByRole("textbox")).toHaveValue("Bar");
});

test("when the input value changes, the `onChange` callback prop is called", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Search defaultValue="" onChange={onChange} />);

  await user.type(screen.getByRole("textbox"), "a");
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "a" }),
    }),
  );
});

test("when the component is controlled, the `onClick` callback prop is called with the values in the input when the search button is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Search
      value="FooBar"
      id="Search"
      name="Search"
      onClick={onClick}
      searchButton
    />,
  );

  await user.click(screen.getByRole("button", { name: "search button" }));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith(
    expect.objectContaining({
      target: { value: "FooBar", id: "Search", name: "Search" },
    }),
  );
});

test("when the component is uncontrolled, the `onClick` callback prop is called with the values in the input when the search button is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Search
      defaultValue="FooBar"
      id="Search"
      name="Search"
      onClick={onClick}
      searchButton
    />,
  );

  await user.click(screen.getByRole("button", { name: "search button" }));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith(
    expect.objectContaining({
      target: { value: "FooBar", id: "Search", name: "Search" },
    }),
  );
});

test("the component's wrapper element has the appropriate `data-component` tag", () => {
  render(<Search value="" />);

  expect(screen.getByTestId("search")).toHaveAttribute(
    "data-component",
    "search",
  );
});

test("do not render remove button when the input is empty", () => {
  render(<Search value="" />);

  expect(screen.queryByTestId("input-icon-toggle")).not.toBeInTheDocument();
});

test("render remove button when the input is not empty", () => {
  render(<Search value="foo" />);

  expect(screen.getByTestId("input-icon-toggle")).toBeVisible();
});

test("remove button can be reached via keyboard when present", async () => {
  const user = userEvent.setup();
  render(<Search value="foo" />);

  act(() => {
    screen.getByRole("textbox").focus();
  });
  await user.tab();

  expect(screen.getByTestId("input-icon-toggle")).toHaveFocus();
});

test("when a character key is pressed, propagation of the event to parent elements is prevented", async () => {
  const user = userEvent.setup();
  const outerOnKeyDown = jest.fn();
  render(
    <button type="button" aria-label="foo" onKeyDown={outerOnKeyDown}>
      <Search defaultValue="" />
    </button>,
  );

  await user.type(screen.getByRole("textbox"), "a");
  expect(outerOnKeyDown).not.toHaveBeenCalled();
});

test("when a number key is pressed, propagation of the event to parent elements is prevented", async () => {
  const user = userEvent.setup();
  const outerOnKeyDown = jest.fn();
  render(
    <button type="button" aria-label="foo" onKeyDown={outerOnKeyDown}>
      <Search defaultValue="" />
    </button>,
  );

  await user.type(screen.getByRole("textbox"), "2");
  expect(outerOnKeyDown).not.toHaveBeenCalled();
});

test("when a non-alphanumeric key is pressed, propagation of the event to parent elements is not prevented", async () => {
  const user = userEvent.setup();
  const outerOnKeyDown = jest.fn();
  render(
    <button type="button" aria-label="foo" onKeyDown={outerOnKeyDown}>
      <Search defaultValue="" />
    </button>,
  );

  await user.type(screen.getByRole("textbox"), "{Tab}");
  expect(outerOnKeyDown).toHaveBeenCalledWith(
    expect.objectContaining({ key: "Tab" }),
  );
});

test("the input can be programmatically focused using a ref", async () => {
  const RefExample = () => {
    const ref = useRef<SearchHandle>(null);

    return (
      <div>
        <button type="button" onClick={() => ref.current?.focus()}>
          Focus input
        </button>
        <Search value="foo" onChange={() => {}} ref={ref} />
      </div>
    );
  };

  const user = userEvent.setup();
  render(<RefExample />);

  await user.click(screen.getByRole("button", { name: "Focus input" }));

  expect(screen.getByRole("textbox")).toHaveFocus();
});

// for coverage - dark variant styles are tested in Playwright
test("should render the bottom border when variant is dark, the input is not focused and has a value", () => {
  render(<Search variant="dark" value="search" />);

  expect(screen.getByTestId("search")).toHaveStyle({
    "background-color": "transparent",
  });
  expect(screen.getByTestId("search")).toHaveStyleRule(
    "border-bottom",
    "var(--spacing025) solid var(--colorsUtilityYang080)",
  );
});

// for coverage - `searchWidth` prop is tested in Playwright
test("applies the correct width specified by the user", () => {
  render(<Search searchWidth="400px" defaultValue="" />);

  expect(screen.getByTestId("search")).toHaveStyle({
    display: "inline-flex",
    "font-weight": "500",
    width: "400px",
  });
  expect(screen.getByTestId("search")).toHaveStyleRule(
    "border-bottom",
    "var(--spacing025) solid var(--colorsUtilityMajor300)",
  );
  expect(screen.getByTestId("search")).toHaveStyleRule(
    "font-size",
    "var(--fontSize100)",
  );
});

// for coverage - `maxWidth` prop is tested in Playwright
test("applies the correct maxWidth specified by the user", () => {
  render(<Search maxWidth="67%" defaultValue="" />);

  expect(screen.getByTestId("search")).toHaveStyle({
    "max-width": "67%",
  });
});
