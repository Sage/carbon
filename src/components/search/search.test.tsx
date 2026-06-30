import React, { useRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one" },
            { value: "two", label: "two" },
          ],
        },
      ]}
    />,
  );

  expect(screen.getAllByRole("listbox")[0]).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(3);
  expect(screen.getByRole("combobox", { name: "Search" })).toBeVisible();
});

test("sets the highlighted option as selected when navigating with keyboard", async () => {
  const user = userEvent.setup();

  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one" },
            { value: "two", label: "two" },
          ],
        },
      ]}
    />,
  );

  screen.getByRole("combobox", { name: "Search" }).focus();
  await user.keyboard("{ArrowDown}");

  expect(screen.getByRole("option", { name: "one" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("moves highlight to next item when ArrowDown is pressed repeatedly", async () => {
  const user = userEvent.setup();

  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one" },
            { value: "two", label: "two" },
          ],
        },
      ]}
    />,
  );

  screen.getByRole("combobox", { name: "Search" }).focus();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");

  expect(screen.getByRole("option", { name: "two" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("supports ArrowUp, Home and End keyboard highlight navigation", async () => {
  const user = userEvent.setup();

  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one" },
            { value: "two", label: "two" },
          ],
        },
      ]}
    />,
  );

  screen.getByRole("combobox", { name: "Search" }).focus();

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("option", { name: "two" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await user.keyboard("{ArrowUp}");
  expect(screen.getByRole("option", { name: "one" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await user.keyboard("{End}");
  expect(screen.getByRole("option", { name: "two" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await user.keyboard("{Home}");
  expect(screen.getByRole("option", { name: "one" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("clears highlighted item when highlighted value is no longer in enabled items", async () => {
  const user = userEvent.setup();

  const { rerender } = render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one" },
            { value: "two", label: "two", disabled: true },
          ],
        },
      ]}
    />,
  );

  screen.getByRole("combobox", { name: "Search" }).focus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("option", { name: "one" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  rerender(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "three", label: "three" },
            { value: "two", label: "two", disabled: true },
          ],
        },
      ]}
    />,
  );

  expect(screen.getByRole("option", { name: "three" })).toHaveAttribute(
    "aria-selected",
    "false",
  );
});

test("provides the popover assistive hint as the combobox description", () => {
  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "one", label: "one" }],
        },
      ]}
    />,
  );

  expect(
    screen.getByRole("combobox", { name: "Search" }),
  ).toHaveAccessibleDescription(
    "When search suggestions are available use up and down arrows to browse results and enter to select. Touch device users, explore by touch or with swipe gestures.",
  );
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
      <Search value="" open onChange={jest.fn()} />
    </MenuContext.Provider>,
  );

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Search" })).toBeVisible();
});

test("renders subtext for listData items that include a subtext property", () => {
  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [
            { value: "one", label: "one", subtext: "extra detail" },
            { value: "two", label: "two" },
          ],
        },
      ]}
    />,
  );

  expect(screen.getByText("extra detail")).toBeVisible();
});

test("renders listData items across multiple groups", () => {
  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Recent",
          items: [{ value: "one", label: "one" }],
        },
        {
          heading: "Favourites",
          items: [{ value: "two", label: "two" }],
        },
      ]}
    />,
  );

  expect(screen.getAllByRole("option")).toHaveLength(4);
});

test("calls `onListItemSelect` with the item value when an item is clicked", async () => {
  const user = userEvent.setup();
  const onListItemSelect = jest.fn();
  const onClose = jest.fn();

  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      onListItemSelect={onListItemSelect}
      onClose={onClose}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "item-value", label: "item label" }],
        },
      ]}
    />,
  );

  await user.click(screen.getByRole("option", { name: "item label" }));

  expect(onListItemSelect).toHaveBeenCalledWith("item-value");
  expect(onClose).toHaveBeenCalledWith(undefined, "item-value");
});

test("renders popover when `inputWidth` is set", () => {
  render(
    <Search
      value=""
      open
      inputWidth={50}
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "one", label: "one" }],
        },
      ]}
    />,
  );

  expect(screen.getAllByRole("listbox")[0]).toBeVisible();
});

test("uses `label` as the accessible name for the popover listbox", () => {
  render(
    <Search
      value=""
      label="Search results"
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "one", label: "one" }],
        },
      ]}
    />,
  );

  expect(screen.getByRole("listbox", { name: "Search results" })).toBeVisible();
});

test("announces query-too-short guidance using the default min query length", () => {
  render(<Search value="te" open={false} onChange={jest.fn()} listData={[]} />);

  expect(
    screen
      .getAllByRole("status")
      .some((status) =>
        status.textContent?.includes(
          "Type at least 3 characters to see results",
        ),
      ),
  ).toBe(true);
});

test("announces available results when query length meets minimum", () => {
  render(
    <Search
      value="term"
      minQueryLength={2}
      open
      onChange={jest.fn()}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "one", label: "one" }],
        },
      ]}
    />,
  );

  expect(
    screen
      .getAllByRole("status")
      .some((status) => status.textContent?.includes("1 result is available.")),
  ).toBe(true);
});

test("announces when there are no search results", () => {
  render(
    <Search
      value="term"
      minQueryLength={2}
      open
      onChange={jest.fn()}
      listData={[]}
    />,
  );

  expect(
    screen
      .getAllByRole("status")
      .some((status) => status.textContent?.includes("No results found")),
  ).toBe(true);
});

test("calls `onClose` when Escape is pressed", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  render(
    <Search
      value=""
      open
      onChange={jest.fn()}
      onClose={onClose}
      listData={[
        {
          heading: "Heading",
          items: [{ value: "one", label: "one" }],
        },
      ]}
    />,
  );

  screen.getByRole("combobox", { name: "Search" }).focus();
  await user.keyboard("{Escape}");

  expect(onClose).toHaveBeenCalledTimes(1);
});
