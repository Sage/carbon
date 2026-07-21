import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pager from ".";
import { setupSelectMocks } from "../select";

beforeAll(() => {
  setupSelectMocks();
});

test("`next` and `last` buttons are not visible when on the last page", async () => {
  render(<Pager onPagination={() => {}} totalRecords={100} currentPage={10} />);

  expect(
    screen.queryByRole("button", { name: "Go to next page" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Go to last page" }),
  ).not.toBeInTheDocument();
});

test("`previous` and `first` buttons are not visible when on the first page", async () => {
  render(<Pager onPagination={() => {}} totalRecords={100} currentPage={1} />);

  expect(
    screen.queryByRole("button", { name: "Go to previous page" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Go to first page" }),
  ).not.toBeInTheDocument();
});

test("does not render navigation buttons or current page input when there is only 1 page", () => {
  render(<Pager onPagination={() => {}} totalRecords={1} />);

  expect(screen.queryAllByRole("button").length).toBe(0);
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByText("1 of 1 pages")).toBeVisible();
});

test("does not render current page input if `interactivePageNumber` is false", () => {
  render(
    <Pager
      onPagination={() => {}}
      totalRecords={100}
      currentPage={1}
      interactivePageNumber={false}
    />,
  );

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByText("1 of 10 pages")).toBeVisible();
});

test("calls the `onFirst` callback when the `First` button is clicked", async () => {
  const user = userEvent.setup();
  const onFirst = jest.fn();
  render(
    <Pager
      onPagination={() => {}}
      onFirst={onFirst}
      currentPage={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to first page" }));
  expect(onFirst).toHaveBeenCalledTimes(1);
});

test("calls the `onPrevious` callback when the `Previous` button is clicked", async () => {
  const user = userEvent.setup();
  const onPrevious = jest.fn();
  render(
    <Pager
      onPagination={() => {}}
      onPrevious={onPrevious}
      currentPage={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to previous page" }));
  expect(onPrevious).toHaveBeenCalledTimes(1);
});

test("calls the `onNext` callback when the `Next` button is clicked", async () => {
  const user = userEvent.setup();
  const onNext = jest.fn();
  render(
    <Pager
      onPagination={() => {}}
      onNext={onNext}
      currentPage={1}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to next page" }));
  expect(onNext).toHaveBeenCalledTimes(1);
});

test("calls the `onLast` callback when the `Last` button is clicked", async () => {
  const user = userEvent.setup();
  const onLast = jest.fn();
  render(
    <Pager
      onPagination={() => {}}
      onLast={onLast}
      currentPage={1}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to last page" }));
  expect(onLast).toHaveBeenCalledTimes(1);
});

test("the total number of records is set to 1 if the `totalRecords` prop is an invalid value", () => {
  render(<Pager totalRecords={-100} pageSize={10} onPagination={() => {}} />);

  expect(screen.getByText("1 of 1 pages")).toBeVisible();
});

test("sets the current page to the last available page when `currentPage` is larger than the total", () => {
  render(
    <Pager
      onPagination={() => {}}
      currentPage={10}
      totalRecords={15}
      pageSize={10}
    />,
  );

  expect(screen.getByRole("textbox", { name: "Page 2" })).toHaveValue("2");
});

test("the page size select is not shown by default", () => {
  render(<Pager onPagination={() => {}} />);

  expect(
    screen.queryByRole("combobox", { name: "Items per page" }),
  ).not.toBeInTheDocument();
});

test("renders the page size select when `showPageSizeSelection` prop is true", () => {
  render(<Pager showPageSizeSelection onPagination={() => {}} />);

  expect(
    screen.getByRole("combobox", { name: "Items per page" }),
  ).toBeInTheDocument();
});

test("sets the correct page size when the `pageSize` is passed as a number", () => {
  render(
    <Pager
      onPagination={() => {}}
      totalRecords={100}
      showPageSizeSelection
      pageSize={25}
    />,
  );

  expect(screen.getByRole("combobox", { name: "Items per page" })).toHaveValue(
    "25",
  );
});

test("sets the correct page size when the `pageSize` is passed as a string", () => {
  render(
    <Pager
      onPagination={() => {}}
      totalRecords={100}
      showPageSizeSelection
      pageSize="25"
    />,
  );

  expect(screen.getByRole("combobox", { name: "Items per page" })).toHaveValue(
    "25",
  );
});

test("clicking the `Next` button sets the current page to the next page", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={9}
      pageSize={10}
      totalRecords={100}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to next page" }));

  expect(screen.getByRole("textbox", { name: "Page 10" })).toHaveValue("10");
});

test("clicking the `Previous` button sets the current page to the previous page", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={5}
      pageSize={10}
      totalRecords={100}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to previous page" }));

  expect(screen.getByRole("textbox", { name: "Page 4" })).toHaveValue("4");
});

test("clicking the `First` button sets the current page to the first page", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={5}
      pageSize={10}
      totalRecords={100}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to first page" }));

  expect(screen.getByRole("textbox", { name: "Page 1" })).toHaveValue("1");
});

test("clicking the `Last` button sets the current page to the last page", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={5}
      pageSize={10}
      totalRecords={100}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to last page" }));

  expect(screen.getByRole("textbox", { name: "Page 10" })).toHaveValue("10");
});

test("does not render `First` and `Last` buttons when `showFirstAndLastButtons` is false", () => {
  render(
    <Pager
      currentPage={5}
      totalRecords={100}
      showFirstAndLastButtons={false}
      onPagination={() => {}}
    />,
  );

  expect(
    screen.queryByRole("button", { name: "Go to first page" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Go to last page" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Go to previous page" }),
  ).toBeVisible();
  expect(screen.getByRole("button", { name: "Go to next page" })).toBeVisible();
});

test("calls `onPagination` with `first` origin when the `First` button is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={2}
      pageSize={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to first page" }));

  expect(onPagination).toHaveBeenCalledWith(1, 10, "first");
});

test("calls `onPagination` with `previous` origin when the `Previous` button is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={2}
      pageSize={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to previous page" }));

  expect(onPagination).toHaveBeenCalledWith(1, 10, "previous");
});

test("calls `onPagination` with `next` origin when the `Next` button is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to next page" }));

  expect(onPagination).toHaveBeenCalledWith(6, 10, "next");
});

test("calls `onPagination` with `last` origin when the `Last` button is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={1}
      pageSize={10}
      totalRecords={100}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Go to last page" }));

  expect(onPagination).toHaveBeenCalledWith(10, 10, "last");
});

test("calls `onPagination` when a page size option is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(<Pager onPagination={onPagination} showPageSizeSelection />);

  await user.click(screen.getByRole("combobox", { name: "Items per page" }));
  await user.click(screen.getByRole("option", { name: "25" }));

  expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
});

test("calls `onPagination` when Enter is pressed in the page size select", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(<Pager onPagination={onPagination} showPageSizeSelection />);

  await user.click(screen.getByRole("combobox", { name: "Items per page" }));
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Enter}");

  expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
});

test("resets page size select to the previous value when selection is not completed", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager onPagination={onPagination} showPageSizeSelection pageSize={10} />,
  );

  const select = screen.getByRole("combobox", { name: "Items per page" });

  await user.click(select);
  await user.keyboard("{ArrowDown}");
  await user.tab();

  expect(onPagination).not.toHaveBeenCalled();
  expect(select).toHaveValue("10");
});

test("resets current page input to the previous value when a non-numeric value is submitted", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  const currentPageInput = screen.getByRole("textbox", { name: "Page 5" });
  await user.clear(currentPageInput);
  await user.type(currentPageInput, "invalid");
  await user.tab();

  expect(currentPageInput).toHaveValue("5");
  expect(onPagination).not.toHaveBeenCalled();
});

test("sets current page input to 1 when a value below 1 is submitted", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  const currentPageInput = screen.getByRole("textbox", { name: "Page 5" });
  await user.clear(currentPageInput);
  await user.type(currentPageInput, "0");
  await user.tab();

  expect(currentPageInput).toHaveValue("1");
  expect(onPagination).toHaveBeenCalledWith(1, 10, "input");
});

test("sets current page input to the last page when a value above total pages is submitted", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  const currentPageInput = screen.getByRole("textbox", { name: "Page 5" });
  await user.clear(currentPageInput);
  await user.type(currentPageInput, "99");
  await user.tab();

  expect(currentPageInput).toHaveValue("10");
  expect(onPagination).toHaveBeenCalledWith(10, 10, "input");
});

test("calls `onPagination` when a valid page is submitted on blur", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  const currentPageInput = screen.getByRole("textbox", { name: "Page 5" });
  await user.clear(currentPageInput);
  await user.type(currentPageInput, "7");
  await user.tab();

  expect(currentPageInput).toHaveValue("7");
  expect(onPagination).toHaveBeenCalledWith(7, 10, "input");
});

test("calls `onPagination` when a valid page is submitted on Enter key press", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      onPagination={onPagination}
      currentPage={5}
      pageSize={10}
      totalRecords={100}
    />,
  );

  const currentPageInput = screen.getByRole("textbox", { name: "Page 5" });
  await user.clear(currentPageInput);
  await user.type(currentPageInput, "8{enter}");

  expect(currentPageInput).toHaveValue("8");
  expect(onPagination).toHaveBeenCalledWith(8, 10, "input");
});

test("sets a custom accessible label for the pagination navigation landmark", () => {
  render(
    <Pager
      onPagination={() => {}}
      totalRecords={100}
      aria-label="Custom Pager Label"
    />,
  );

  expect(
    screen.getByRole("navigation", { name: "Custom Pager Label" }),
  ).toBeInTheDocument();
});

test("renders with provided data- attributes", () => {
  render(<Pager data-element="bar" data-role="baz" onPagination={() => {}} />);

  expect(screen.getByRole("navigation")).toHaveAttribute("data-element", "bar");
  expect(screen.getByRole("navigation")).toHaveAttribute("data-role", "baz");
});

// coverage
test("renders with expected styles when `variant` is 'alternate'", () => {
  render(<Pager onPagination={() => {}} variant="alternate" />);

  expect(screen.getByRole("navigation")).toHaveStyleRule("border", "none");
});
