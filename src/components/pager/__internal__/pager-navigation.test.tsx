import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import PagerNavigation from "./pager-navigation.component";

test("the `onFirst` callback prop is not called on click if the link is disabled due to being on the first page", async () => {
  const user = userEvent.setup();
  const onFirst = jest.fn();
  render(
    <PagerNavigation
      currentPage={1}
      onFirst={onFirst}
      pageSize={10}
      pageCount={10}
      setCurrentPage={() => {}}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "First" }));
  expect(onFirst).not.toHaveBeenCalled();
});

test("the `setCurrentPage` callback prop is called with the values a user enters in the current page input", async () => {
  const user = userEvent.setup();
  const setCurrentPage = jest.fn();
  render(
    <PagerNavigation
      currentPage={1}
      setCurrentPage={setCurrentPage}
      pageSize={10}
      pageCount={10}
      onPagination={() => {}}
    />,
  );

  await user.type(screen.getByRole("textbox", { name: "Page" }), "2");
  expect(setCurrentPage).toHaveBeenCalledTimes(1);
  expect(setCurrentPage).toHaveBeenCalledWith(2);
  // for coverage
  await user.keyboard("{Enter}");
  expect(setCurrentPage).toHaveBeenCalledTimes(2);
});

test("the `setCurrentPage` callback prop is not called when a non-numeric value is entered in the current page input", async () => {
  const user = userEvent.setup();
  const setCurrentPage = jest.fn();
  render(
    <PagerNavigation
      currentPage={1}
      setCurrentPage={setCurrentPage}
      pageSize={10}
      pageCount={10}
      onPagination={() => {}}
    />,
  );

  await user.type(screen.getByRole("textbox", { name: "Page" }), "a");
  expect(setCurrentPage).not.toHaveBeenCalled();
});

test("if there are 0 pages, the `setCurrentPage` callback is called with 0 on blur", async () => {
  const user = userEvent.setup();
  const setCurrentPage = jest.fn();
  render(
    <PagerNavigation
      currentPage={1}
      setCurrentPage={setCurrentPage}
      pageSize={10}
      pageCount={0}
      onPagination={() => {}}
    />,
  );

  await user.type(screen.getByRole("textbox", { name: "Page" }), "2");
  await user.tab();
  expect(setCurrentPage).toHaveBeenCalledWith(0);
});

test("when the `showPageCount` prop is false, the page count input is not rendered", () => {
  render(
    <PagerNavigation
      showPageCount={false}
      currentPage={1}
      setCurrentPage={() => {}}
      pageSize={10}
      pageCount={10}
      onPagination={() => {}}
    />,
  );

  expect(
    screen.queryByRole("textbox", { name: "Page" }),
  ).not.toBeInTheDocument();
});

test("when the `showFirstAndLastButtons` prop is false, neither the `first` or `last` button are shown", () => {
  render(
    <PagerNavigation
      showFirstAndLastButtons={false}
      currentPage={1}
      setCurrentPage={() => {}}
      pageSize={10}
      pageCount={10}
      onPagination={() => {}}
    />,
  );

  expect(
    screen.queryByRole("button", { name: "First" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Last" }),
  ).not.toBeInTheDocument();
});

test("when the `showPreviousAndNextButtons` prop is false, neither the `previous` or `next` button are shown", () => {
  render(
    <PagerNavigation
      showPreviousAndNextButtons={false}
      currentPage={1}
      setCurrentPage={() => {}}
      pageSize={10}
      pageCount={10}
      onPagination={() => {}}
    />,
  );

  expect(
    screen.queryByRole("button", { name: "Previous" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Next" }),
  ).not.toBeInTheDocument();
});
