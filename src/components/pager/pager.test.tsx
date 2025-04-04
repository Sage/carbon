import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pager from "./pager.component";
import I18nProvider from "../i18n-provider";
import { frFR } from "../../locales";
import mockDOMRect from "../../__spec_helper__/mock-dom-rect";

const { getBoundingClientRect } = Element.prototype;

beforeAll(() => {
  // need to mock getBoundingClientRect so that all options are rendered in the select list in js-dom
  mockDOMRect(200, 200, "select-list-scrollable-container");
});

afterAll(() => {
  Element.prototype.getBoundingClientRect = getBoundingClientRect;
});

test("the total records number is set to 0 by default", () => {
  render(<Pager onPagination={() => {}} />);
  expect(screen.getByText("0 items")).toBeInTheDocument();
});

test("the `pageSize` prop, when passed as a number, sets the value of the page size select", () => {
  render(<Pager pageSize={10} showPageSizeSelection onPagination={() => {}} />);
  expect(screen.getByRole("combobox", { name: "Show" })).toHaveValue("10");
});

test("the `pageSize` prop, when passed as a string, sets the value of the page size select", () => {
  render(<Pager pageSize="10" showPageSizeSelection onPagination={() => {}} />);
  expect(screen.getByRole("combobox", { name: "Show" })).toHaveValue("10");
});

test("the `next` and `last` buttons are disabled when on the last page", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      totalRecords={100}
      pageSize={10}
      currentPage={10}
      onPagination={onPagination}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Next" }));
  await user.click(screen.getByRole("button", { name: "Last" }));
  expect(onPagination).not.toHaveBeenCalled();
});

test("the `previous` and `first` buttons are disabled when on the first page", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(
    <Pager
      totalRecords={100}
      pageSize={10}
      currentPage={1}
      onPagination={onPagination}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Previous" }));
  await user.click(screen.getByRole("button", { name: "First" }));
  expect(onPagination).not.toHaveBeenCalled();
});

test("no buttons are rendered if there is only 1 page", () => {
  render(<Pager totalRecords={10} pageSize={10} onPagination={() => {}} />);
  expect(screen.queryAllByRole("button").length).toBe(0);
});

test("the 'First' and 'Last' navigation buttons are not rendered if there are only two pages", () => {
  render(<Pager totalRecords={20} pageSize={10} onPagination={() => {}} />);

  const allButtons = screen.queryAllByRole("button");
  expect(allButtons.length).toBe(2);
  expect(allButtons[0]).toHaveTextContent("Previous");
  expect(allButtons[1]).toHaveTextContent("Next");
});

test("the `previous` and `first` buttons are hidden when on the first page if the `hideDisabledElements` prop is `true`", () => {
  render(
    <Pager
      hideDisabledElements
      totalRecords={100}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
    />,
  );

  // note: can't easily use getByRole("button") for these assertions because the buttons are disabled and
  // that appears to make them have an empty accessible name. So it's easiest to use getByText to get the
  // specific buttons required
  expect(screen.getByText("Previous")).not.toBeVisible();
  expect(screen.getByText("First")).not.toBeVisible();
});

test("the `next` and `last` buttons are hidden when on the last page if the `hideDisabledElements` prop is `true`", () => {
  render(
    <Pager
      hideDisabledElements
      totalRecords={100}
      pageSize={10}
      currentPage={10}
      onPagination={() => {}}
    />,
  );

  // note: can't easily use getByRole("button") for these assertions because the buttons are disabled and
  // that appears to make them have an empty accessible name. So it's easiest to use getByText to get the
  // specific buttons required
  expect(screen.getByText("Next")).not.toBeVisible();
  expect(screen.getByText("Last")).not.toBeVisible();
});

test("all buttons are visible if the `hideDisabledElements` prop is `true` and not on the first or last page", () => {
  render(
    <Pager
      hideDisabledElements
      totalRecords={100}
      pageSize={10}
      currentPage={3}
      onPagination={() => {}}
    />,
  );

  expect(screen.getByRole("button", { name: "First" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Previous" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Next" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Last" })).toBeVisible();
});

test("when the `interactivePageNumber` prop is false, no input is rendered for the page number", () => {
  render(<Pager interactivePageNumber={false} onPagination={() => {}} />);

  expect(
    screen.queryByRole("textbox", { name: "Page" }),
  ).not.toBeInTheDocument();
});

test.each([1, 5, 10])(
  "when the `interactivePageNumber` prop is false, the pager nav label is rendered with correct inner text",
  (pageIndex) => {
    render(
      <Pager
        interactivePageNumber={false}
        currentPage={pageIndex}
        totalRecords={100}
        pageSize={10}
        onPagination={() => {}}
      />,
    );

    expect(screen.getByTestId("current-page-label")).toHaveTextContent(
      `Page ${pageIndex} of 10`,
    );
  },
);

test("the `onFirst` callback prop is called when the user clicks the `First` button", async () => {
  const user = userEvent.setup();
  const onFirst = jest.fn();
  render(
    <Pager
      onFirst={onFirst}
      currentPage={10}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "First" }));
  expect(onFirst).toHaveBeenCalledTimes(1);
});

test("the `onPrevious` callback prop is called when the user clicks the `Previous` button", async () => {
  const user = userEvent.setup();
  const onPrevious = jest.fn();
  render(
    <Pager
      onPrevious={onPrevious}
      currentPage={10}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Previous" }));
  expect(onPrevious).toHaveBeenCalledTimes(1);
});

test("the `onNext` callback prop is called when the user clicks the `Next` button", async () => {
  const user = userEvent.setup();
  const onNext = jest.fn();
  render(
    <Pager
      onNext={onNext}
      currentPage={1}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Next" }));
  expect(onNext).toHaveBeenCalledTimes(1);
});

test("the `onLast` callback prop is called when the user clicks the `Last` button", async () => {
  const user = userEvent.setup();
  const onLast = jest.fn();
  render(
    <Pager
      onLast={onLast}
      currentPage={1}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Last" }));
  expect(onLast).toHaveBeenCalledTimes(1);
});

test("when the `pageSize` prop updates, the value of the page-size select is updated accordingly", () => {
  const { rerender } = render(
    <Pager
      currentPage={1}
      totalRecords={100}
      pageSize={10}
      showPageSizeSelection
      onPagination={() => {}}
    />,
  );
  expect(screen.getByRole("combobox", { name: "Show" })).toHaveValue("10");

  rerender(
    <Pager
      currentPage={1}
      totalRecords={100}
      pageSize={25}
      showPageSizeSelection
      onPagination={() => {}}
    />,
  );
  expect(screen.getByRole("combobox", { name: "Show" })).toHaveValue("25");
});

test("if a page number is entered that is greater than the number of pages, it reverts to the last page when Enter is pressed", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={1}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.type(screen.getByRole("textbox", { name: "Page" }), "1234");
  await user.keyboard("{Enter}");
  expect(screen.getByRole("textbox", { name: "Page" })).toHaveValue("10");
});

test("if a page number is entered that is less than 1, it reverts to the first page when Enter is pressed", async () => {
  const user = userEvent.setup();
  render(
    <Pager
      currentPage={1}
      totalRecords={100}
      pageSize={10}
      onPagination={() => {}}
    />,
  );

  await user.type(screen.getByRole("textbox", { name: "Page" }), "-1234");
  await user.keyboard("{Enter}");
  expect(screen.getByRole("textbox", { name: "Page" })).toHaveValue("1");
});

test("the current page is set to 1 if not specified by the `currentPage` prop", () => {
  render(<Pager totalRecords={100} pageSize={10} onPagination={() => {}} />);

  expect(screen.getByRole("textbox", { name: "Page" })).toHaveValue("1");
});

test("the total number of records is set to 1 if the `totalRecords` prop is an invalid value", () => {
  render(<Pager totalRecords={-100} pageSize={10} onPagination={() => {}} />);

  expect(screen.getByText("of 1")).toBeVisible();
});

test("the page size select is not shown by default", () => {
  render(<Pager onPagination={() => {}} />);

  expect(
    screen.queryByRole("combobox", { name: "Show" }),
  ).not.toBeInTheDocument();
});

test("the page size select is shown when `showPageSizeSelection` is true", () => {
  render(<Pager showPageSizeSelection onPagination={() => {}} />);

  // the actual select input has opacity 0 so doesn't pass a toBeVisible check.
  // So instead we'll assert it's in the document (which correct accessible name, ie label), and
  // check that the "select text" element is visible
  expect(screen.getByRole("combobox", { name: "Show" })).toBeInTheDocument();
  expect(screen.getByTestId("select-text")).toBeVisible();
});

test("the text before the page size select is not shown when the `showPageSizeLabelBefore` prop is false", () => {
  render(
    <Pager
      showPageSizeSelection
      showPageSizeLabelBefore={false}
      onPagination={() => {}}
    />,
  );

  expect(screen.queryByText("Show")).not.toBeInTheDocument();
});

test("the text after the page size select is not shown when the `showPageSizeLabelAfter` prop is false", () => {
  render(
    <Pager
      showPageSizeSelection
      showPageSizeLabelAfter={false}
      onPagination={() => {}}
    />,
  );

  expect(screen.queryByText("items")).not.toBeInTheDocument();
});

test("does not render the total number of records 'showTotalRecords' is false", () => {
  render(
    <Pager
      showTotalRecords={false}
      totalRecords={100}
      onPagination={() => {}}
    />,
  );

  expect(screen.queryByText("100 items")).not.toBeInTheDocument();
});

test.each([
  [true, false, "Show"],
  [false, true, "items"],
])(
  "when `showPageSizeLabelBefore` is %s and `showPageSizeLabelAfter` is %s, the text that is present is used as the select's label, and no aria-label is added",
  (showPageSizeLabelBefore, showPageSizeLabelAfter, labelText) => {
    render(
      <Pager
        showPageSizeSelection
        showPageSizeLabelBefore={showPageSizeLabelBefore}
        showPageSizeLabelAfter={showPageSizeLabelAfter}
        onPagination={() => {}}
      />,
    );

    const pageSizeSelect = screen.getByRole("combobox");

    expect(pageSizeSelect).toHaveAccessibleName(labelText);
    expect(pageSizeSelect).not.toHaveAttribute("aria-label");
  },
);

test("when both `showPageSizeLabelBefore` and `showPageSizeLabelAfter` are false, the select has an accessible name of 'show' via an aria-label", () => {
  render(
    <Pager
      showPageSizeSelection
      showPageSizeLabelBefore={false}
      showPageSizeLabelAfter={false}
      onPagination={() => {}}
    />,
  );

  const pageSizeSelect = screen.getByRole("combobox");

  expect(pageSizeSelect).toHaveAccessibleName("Show");
  expect(pageSizeSelect).toHaveAttribute("aria-label", "Show");
});

test.each([
  ["Next", "6"],
  ["Previous", "4"],
  ["First", "1"],
  ["Last", "10"],
])(
  "clicking the %s button updates the current page correctly",
  async (buttonName, pageResult) => {
    const user = userEvent.setup();
    render(
      <Pager
        currentPage={5}
        pageSize={10}
        totalRecords={100}
        onPagination={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: buttonName }));
    expect(screen.getByRole("textbox", { name: "Page" })).toHaveValue(
      pageResult,
    );
  },
);

test("renders the `show` text correctly in the French locale", () => {
  render(
    <I18nProvider locale={frFR}>
      <Pager showPageSizeSelection onPagination={() => {}} />
    </I18nProvider>,
  );

  expect(screen.queryByText("Show")).not.toBeInTheDocument();
  expect(screen.getByText("Afficher")).toBeVisible();
  expect(screen.getByRole("combobox")).toHaveAccessibleName("Afficher");
});

test("renders the items count correctly in the French locale", () => {
  render(
    <I18nProvider locale={frFR}>
      <Pager totalRecords={100} onPagination={() => {}} />
    </I18nProvider>,
  );

  expect(screen.queryByText("100 items")).not.toBeInTheDocument();
  expect(screen.getByText("100 éléments")).toBeInTheDocument();
});

test("the `onPagination` callback prop should be called with appropriate values when a page size option is clicked", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(<Pager onPagination={onPagination} showPageSizeSelection />);

  await user.click(screen.getByTestId("select-text"));
  await user.click(screen.getByRole("option", { name: "25" }));

  expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");

  // added for coverage of onBlur handler, doesn't actually test anything useful
  await user.tab();
  expect(onPagination).toHaveBeenCalledTimes(1);
});

test("the `onPagination` callback prop should be called with appropriate values when a page size option is selected with the `Enter`", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(<Pager onPagination={onPagination} showPageSizeSelection />);

  await user.click(screen.getByTestId("select-text"));
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Enter}");

  expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
});

test("the `onPagination` callback prop should not be called when a key other than `Enter` is used on an option", async () => {
  const user = userEvent.setup();
  const onPagination = jest.fn();
  render(<Pager onPagination={onPagination} showPageSizeSelection />);

  await user.click(screen.getByTestId("select-text"));
  await user.keyboard("{ArrowDown}");
  await user.keyboard("a");

  expect(onPagination).not.toHaveBeenCalled();
});

test("renders with provided data- attributes", () => {
  render(<Pager data-element="bar" data-role="baz" onPagination={() => {}} />);

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// for coverage - "alternate" styles are covered by Playwright tests
test("renders with correct styles when `variant` is `alternate`", () => {
  render(
    <Pager data-role="pager" variant="alternate" onPagination={() => {}} />,
  );

  expect(screen.getByTestId("pager")).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor040)",
  );
});

// coverage for `smallScreenBreakpoint` prop - tested in chromatic
describe("when smallScreenBreakpoint is set", () => {
  it("renders with correct styles when viewport size is small and `showTotalRecords` is false", () => {
    render(
      <Pager
        data-role="pager"
        smallScreenBreakpoint="500px"
        showTotalRecords={false}
        onPagination={() => {}}
      />,
    );

    expect(screen.getByTestId("pager")).toHaveStyleRule(
      "grid-template-columns",
      "1fr",
      { media: "(max-width: 500px)" },
    );
  });

  it("renders with correct styles when viewport size is small and `showPageSizeSelection` is true", () => {
    render(
      <Pager
        data-role="pager"
        smallScreenBreakpoint="500px"
        showPageSizeSelection
        onPagination={() => {}}
      />,
    );

    expect(screen.getByTestId("pager")).toHaveStyleRule(
      "grid-template-columns",
      "1fr 1fr",
      { media: "(max-width: 500px)" },
    );
  });
});
