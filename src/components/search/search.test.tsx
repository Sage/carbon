import React, { useRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
} from "../../__internal__/popover-menu";
import Icon from "../icon";

import MenuContext from "../menu/__internal__/menu.context";
import Search, { SearchHandle } from "./search.component";

const StatefulSearch = ({
  triggerOnClear,
  onClick,
  id,
  name,
}: {
  triggerOnClear?: boolean;
  onClick?: (event: {
    target: { id?: string; name?: string; value: string };
  }) => void;
  id?: string;
  name?: string;
}) => {
  const [value, setValue] = useState("start");

  return (
    <Search
      value={value}
      triggerOnClear={triggerOnClear}
      onClick={onClick}
      id={id}
      name={name}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

test("uses default locale text for input and button accessible names", () => {
  render(<Search value="" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox", { name: "Search" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Search" })).toBeVisible();
});

test("uses label for input accessible name", () => {
  render(<Search value="" label="foo" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox", { name: "foo" })).toBeVisible();
});

test("aria-label takes precedence over label", () => {
  render(<Search value="" label="foo" aria-label="bar" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox", { name: "bar" })).toBeVisible();
});

test("`searchButtonAriaLabel` overrides button accessible name", () => {
  render(<Search value="" searchButtonAriaLabel="foo" onChange={jest.fn()} />);

  expect(screen.getByRole("button", { name: "foo" })).toBeVisible();
});

test("adds inverse class to the search root when `inverse` is true", () => {
  render(<Search inverse value="" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox")).toHaveClass("search", "inverse");
});

test("adds inverse class to the search root when `variant` is `dark`", () => {
  render(<Search variant="dark" value="" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox")).toHaveClass("search", "inverse");
});

test("adds error class to the search root when `error` is present", () => {
  render(<Search error value="" onChange={jest.fn()} />);

  expect(screen.getByRole("searchbox")).toHaveClass("search", "error");
});

test("maps `searchWidth` to `inputWidth` when `inputWidth` is not provided", () => {
  render(<Search value="" searchWidth="42" onChange={jest.fn()} />);

  const inputWrapper = screen.getByTestId("input-wrapper");

  expect(inputWrapper).toHaveStyleRule("width", "42%");
});

test("prefers `inputWidth` over `searchWidth` when both are provided", () => {
  render(
    <Search value="" inputWidth={30} searchWidth="55" onChange={jest.fn()} />,
  );

  const inputWrapper = screen.getByTestId("input-wrapper");

  expect(inputWrapper).toHaveStyleRule("width", "30%");
});

test("falls back to default width when `searchWidth` is not numeric", () => {
  render(<Search value="" searchWidth="foo" onChange={jest.fn()} />);

  const inputWrapper = screen.getByTestId("input-wrapper");

  expect(inputWrapper).toHaveStyleRule("width", "100%");
});

test("forwards click payload from search button", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <Search
      id="search-id"
      name="search-name"
      value="foo"
      onClick={onClick}
      onChange={jest.fn()}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Search" }));

  expect(onClick).toHaveBeenCalledWith({
    target: { id: "search-id", name: "search-name", value: "foo" },
  });
});

test("supports programmatic focus through ref handle", async () => {
  const user = userEvent.setup();

  const SearchWithRefHandle = () => {
    const ref = useRef<SearchHandle>(null);

    return (
      <>
        <button type="button" onClick={() => ref.current?.focus()}>
          focus
        </button>
        <Search ref={ref} value="" onChange={jest.fn()} />
      </>
    );
  };

  render(<SearchWithRefHandle />);
  await user.click(screen.getByRole("button", { name: "focus" }));

  expect(screen.getByRole("searchbox", { name: "Search" })).toHaveFocus();
});

test("supports programmatic focus through ref handle inside Menu context", async () => {
  const user = userEvent.setup();

  const SearchWithRefHandleInMenu = () => {
    const ref = useRef<SearchHandle>(null);

    return (
      <>
        <button type="button" onClick={() => ref.current?.focus()}>
          focus
        </button>
        <MenuContext.Provider value={{ inMenu: true }}>
          <Search ref={ref} value="" onChange={jest.fn()} />
        </MenuContext.Provider>
      </>
    );
  };

  render(<SearchWithRefHandleInMenu />);
  await user.click(screen.getByRole("button", { name: "focus" }));

  expect(screen.getByRole("textbox", { name: "Search" })).toHaveFocus();
});

test("supports programmatic button focus through ref handle", async () => {
  const user = userEvent.setup();

  const SearchWithButtonFocus = () => {
    const ref = useRef<SearchHandle>(null);

    return (
      <>
        <button type="button" onClick={() => ref.current?.focusButton()}>
          focus-button
        </button>
        <Search ref={ref} value="" onChange={jest.fn()} />
      </>
    );
  };

  render(<SearchWithButtonFocus />);
  await user.click(screen.getByRole("button", { name: "focus-button" }));

  expect(screen.getByRole("button", { name: "Search" })).toHaveFocus();
});

test("triggers onClick when native search clear event occurs with empty value", () => {
  const onClick = jest.fn();

  render(
    <StatefulSearch
      triggerOnClear
      onClick={onClick}
      id="search-id"
      name="search-name"
    />,
  );

  const input = screen.getByRole("searchbox", { name: "Search" });
  fireEvent.change(input, { target: { value: "" } });
  fireEvent(input, new Event("search", { bubbles: true }));

  expect(onClick).toHaveBeenCalledWith({
    target: { id: "search-id", name: "search-name", value: "" },
  });
});

test("does not trigger onClick for native search event when value is not empty", () => {
  const onClick = jest.fn();

  render(
    <Search
      value="foo"
      triggerOnClear
      onClick={onClick}
      onChange={jest.fn()}
    />,
  );

  fireEvent(
    screen.getByRole("searchbox", { name: "Search" }),
    new Event("search", { bubbles: true }),
  );

  expect(onClick).not.toHaveBeenCalled();
});

test("does not trigger onClick for native search event fired by pressing Enter on an empty value", () => {
  const onClick = jest.fn();

  render(
    <StatefulSearch
      triggerOnClear
      onClick={onClick}
      id="search-id"
      name="search-name"
    />,
  );

  const input = screen.getByRole("searchbox", { name: "Search" });
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.keyDown(input, { key: "Enter" });
  fireEvent(input, new Event("search", { bubbles: true }));

  expect(onClick).not.toHaveBeenCalled();
});

test("triggers onClick for native search clear event after Enter was pressed previously", () => {
  const onClick = jest.fn();

  render(
    <StatefulSearch
      triggerOnClear
      onClick={onClick}
      id="search-id"
      name="search-name"
    />,
  );

  const input = screen.getByRole("searchbox", { name: "Search" });
  fireEvent.change(input, { target: { value: "" } });

  fireEvent.keyDown(input, { key: "Enter" });
  fireEvent(input, new Event("search", { bubbles: true }));
  expect(onClick).not.toHaveBeenCalled();

  fireEvent(input, new Event("search", { bubbles: true }));

  expect(onClick).toHaveBeenCalledWith({
    target: { id: "search-id", name: "search-name", value: "" },
  });
});

test("does not wire native clear handling when `triggerOnClear` is false", () => {
  const onClick = jest.fn();

  render(
    <Search
      value=""
      triggerOnClear={false}
      onClick={onClick}
      onChange={jest.fn()}
    />,
  );

  const input = screen.getByRole("searchbox", { name: "Search" });
  fireEvent.change(input, { target: { value: "" } });
  fireEvent(input, new Event("search", { bubbles: true }));

  expect(onClick).not.toHaveBeenCalled();
});

test("renders popover menu content when `open` is true", () => {
  render(
    <Search value="" open onChange={jest.fn()}>
      <MenuItem id="item-1">
        <MenuItemLeading>
          <Icon type="home" />
        </MenuItemLeading>
        <MenuItemLabel prefix="Item: ">1</MenuItemLabel>
        <MenuItemSubtext>Subtext</MenuItemSubtext>
      </MenuItem>
      <MenuItemDivider />
      <MenuItemHeading text="Heading">
        <MenuItem id="item-2">
          <MenuItemLabel>Item 2</MenuItemLabel>
        </MenuItem>
      </MenuItemHeading>
    </Search>,
  );

  expect(screen.getAllByRole("listbox")[0]).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(3);
  expect(screen.getByRole("searchbox", { name: "Search" })).toBeVisible();
});

test("renders legacy Search search component when rendered inside Menu context", () => {
  const onClick = jest.fn();

  render(
    <MenuContext.Provider value={{ inMenu: true }}>
      <Search value="" triggerOnClear onClick={onClick} onChange={jest.fn()} />
    </MenuContext.Provider>,
  );

  expect(screen.getByRole("textbox", { name: "Search" })).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "Search" }),
  ).not.toBeInTheDocument();
});

test("does not render popover menu when `open` is true inside Menu context", () => {
  render(
    <MenuContext.Provider value={{ inMenu: true }}>
      <Search value="" open onChange={jest.fn()}>
        <span>Result 1</span>
      </Search>
    </MenuContext.Provider>,
  );

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Search" })).toBeVisible();
});
