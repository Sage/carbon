/* eslint-disable no-promise-executor-return */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Accordion } from ".";

import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/__internal__/useResizeObserver");
jest.mock("../../hooks/useMediaQuery");

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  mockUseMediaQuery.mockReturnValue(true);
});

test("renders with expected `data-` attributes on the root element", () => {
  render(
    <Accordion
      title="Title"
      data-element="accordion-element"
      data-role="accordion-role"
    >
      child content
    </Accordion>,
  );
  const rootElement = screen.getByTestId("accordion-role");

  expect(rootElement).toHaveAttribute("data-component", "accordion");
  expect(rootElement).toHaveAttribute("data-element", "accordion-element");
});

test("should render `title` as a React element", () => {
  render(<Accordion title={<div id="customTitle">Title content</div>} />);

  expect(screen.getByText("Title content")).toBeVisible();
  expect(screen.getByText("Title content")).toHaveAttribute(
    "id",
    "customTitle",
  );
});

test("mounts expanded when `expanded` prop is passed as `true`", () => {
  render(
    <Accordion expanded title="Title">
      child content
    </Accordion>,
  );

  const details = screen.getByTestId("accordion-details");
  expect(details).toHaveAttribute("open");
});

test("mounts collapsed when `expanded` prop is passed as false", () => {
  render(
    <Accordion expanded={false} title="Title">
      child content
    </Accordion>,
  );
  const details = screen.getByTestId("accordion-details");
  expect(details).not.toHaveAttribute("open");
});

test("fires the provided `onChange` prop when the header area is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Accordion onChange={onChange} expanded={false} title="Title" />);

  const header = screen.getByText("Title");
  await user.click(header);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ target: header }),
    true,
  );
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "fires the provided `onChange` prop when the %s key is pressed with the header area focused",
  async (keyName, key) => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Accordion onChange={onChange} expanded={false} title="Title" />);

    const header = screen.getByTestId("accordion-details");
    header.focus();
    await user.keyboard(key);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: header }),
      true,
    );
  },
);

test("toggles the expansion state when the header area is clicked and the `expanded` prop is not passed", async () => {
  const user = userEvent.setup();
  render(<Accordion title="Title">child content</Accordion>);

  const header = screen.getByText("Title");
  const details = screen.getByTestId("accordion-details");

  expect(details).not.toHaveAttribute("open");
  await user.click(header);

  expect(details).toHaveAttribute("open");

  await user.click(header);

  expect(details).not.toHaveAttribute("open");
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "toggles the expansion state when the %s key is pressed with the header area focused and the `expanded` prop is not passed",
  async (keyName, key) => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);

    const details = screen.getByTestId("accordion-details");

    expect(details).not.toHaveAttribute("open");

    details.focus();
    await user.keyboard(key);

    expect(details).toHaveAttribute("open");

    details.focus();
    await user.keyboard(key);

    expect(details).not.toHaveAttribute("open");
  },
);

test("does not toggle the expansion state when keys other than enter or space are pressed when the header area is focused", async () => {
  const user = userEvent.setup();
  render(<Accordion title="Title">child content</Accordion>);
  const header = screen.getByText("Title");

  const details = screen.getByTestId("accordion-details");
  expect(details).not.toHaveAttribute("open");

  header.focus();
  await user.keyboard("a");

  expect(details).not.toHaveAttribute("open");
});

test("adds a subtitle when `subTitle` prop is set and `size` is large (default)", () => {
  render(<Accordion title="Title" subTitle="a subtitle" />);

  expect(screen.getByText("a subtitle")).toBeVisible();
});

test("does not add a subtitle when `subTitle` prop is set and `size` is small", () => {
  render(<Accordion title="Title" subTitle="a subtitle" size="small" />);

  expect(screen.queryByText("a subtitle")).not.toBeInTheDocument();
});

test("should display the `title` when closed and the `openTitle` props are provided", () => {
  render(<Accordion title="Title" openTitle="Less info" />);

  expect(screen.getByText("Title")).toBeInTheDocument();
});

test("should display the `openTitle` when open and the `openTitle` props are provided", () => {
  render(<Accordion title="Title" expanded openTitle="Less info" />);

  expect(screen.getByText("Less info")).toBeInTheDocument();
});

test("should display the `openTitle` when open and the `openTitle` and `title` props are provided", () => {
  render(
    <Accordion title={<h4>Title in H4</h4>} expanded openTitle="Less info" />,
  );

  expect(screen.getByText("Less info")).toBeInTheDocument();
});

test("should display the `title` when open and `title` prop is provided as a React node", () => {
  render(<Accordion title={<h4>Title in H4</h4>} expanded />);

  expect(screen.getByText("Title in H4")).toBeInTheDocument();
});

test("should display the `title` when open if the `openTitle` prop is not provided", () => {
  render(<Accordion title="Title" expanded />);

  expect(screen.getByText("Title")).toBeInTheDocument();
});

// coverage only - border styles tested in Playwright
test("has no border when `borders` prop is 'none'", () => {
  render(
    <Accordion title="Title" borders="none" data-role="accordion-container" />,
  );

  expect(screen.getByTestId("accordion-container")).toHaveStyleRule(
    "border",
    "none",
  );
});

// coverage - validation icons are tested in Chromatic
test("renders the validation icon when a message is provided", () => {
  render(<Accordion title="Title" error="error" />);

  expect(screen.getByTestId("icon-error")).toBeVisible();
});

// coverage
test("applies expected styles when expanded when the variant is `subtle`", () => {
  render(<Accordion variant="subtle" expanded title="Title" />);

  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "margin-top",
    "var(--spacing200)",
  );
  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "margin-left",
    "var(--spacing150)",
  );
  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "padding",
    "var(--spacing100) var(--spacing200) var(--spacing300)",
  );
  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "border-left",
    "2px solid var(--colorsUtilityMajor100)",
  );
});

// coverage - disableContentPadding is tested in Chromatic
test("renders content without paddings if `disableCustomPadding` is applied", () => {
  render(<Accordion title="Title" disableContentPadding />);

  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "padding-top",
    "0",
  );
  expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
    "padding-bottom",
    "0",
  );
});

test("renders a small accordion with the correct spacing values applied", () => {
  render(<Accordion title="Title" size="small" />);

  expect(screen.getByTestId("accordion-summary-title-wrapper")).toHaveStyleRule(
    "padding",
    "var(--spacing200)",
  );
});

test("respects reduced motion", async () => {
  const user = userEvent.setup();
  mockUseMediaQuery.mockReturnValue(false);

  render(<Accordion title="Title" />);

  const expansionIcon = screen.getByTestId("accordion-marker");

  expect(expansionIcon).toHaveStyle("transition: rotate 0 ease-in;");

  const header = screen.getByText("Title");
  await user.click(header);

  expect(expansionIcon).toHaveStyleRule("transition: rotate 0 ease-out;");
});
