import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pages, { PagesProps } from "./pages.component";
import Page from "./page";
import Button from "../button";
import Heading from "../heading";

const PagesExample = ({
  initialIndex = 0,
  ...props
}: Partial<PagesProps> & { initialIndex?: number }) => {
  const [pageIndex, setPageIndex] = useState(initialIndex);
  const moveToNextPage = () => setPageIndex(pageIndex + 1);
  const moveToPreviousPage = () => setPageIndex(pageIndex - 1);

  return (
    <Pages pageIndex={pageIndex} {...props}>
      <Page
        title={
          <Heading
            data-element="firstHeader"
            title="My First Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        <Button onClick={moveToNextPage}>Go to second page</Button>
      </Page>
      <Page
        title={
          <Heading
            data-element="secondHeader"
            title="My Second Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        Second page
      </Page>
      <Page
        title={
          <Heading
            data-element="thirdHeader"
            title="My Third Page"
            backLink={moveToPreviousPage}
          />
        }
      >
        Third page
        <Button onClick={moveToNextPage}>Go to next page</Button>
      </Page>
    </Pages>
  );
};

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test.each([
  ["fade", "carousel-transition-fade"],
  ["slide", "slide-next"],
])(
  "should render correct animation when the `transition` prop is `%s`",
  async (transition, expected) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PagesExample transition={transition} />);

    await user.click(screen.getByRole("button", { name: "Go to second page" }));
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("visible-page")).toHaveClass(
      `${expected}-enter-done`,
    );
  },
);

test("when the `pageIndex` prop is greater than the number of `Page` children, the first page is rendered", () => {
  render(
    <Pages pageIndex={100}>
      <Page title={<Heading title="Page 1" />}>First Page</Page>
      <Page title={<Heading title="Page 2" />}>Second Page</Page>
      <Page title={<Heading title="Page 3" />}>Third Page</Page>
    </Pages>,
  );

  expect(screen.getByRole("heading")).toHaveTextContent("Page 1");
  expect(screen.getByTestId("visible-page")).toHaveTextContent("First Page");
});

test("when the `pageIndex` prop is changed to `undefined`, the currently-rendered page does not change", () => {
  const ExampleComponent = ({ pageIndex }: Pick<PagesProps, "pageIndex">) => (
    <Pages pageIndex={pageIndex}>
      <Page title={<Heading title="Page 1" />}>First Page</Page>
      <Page title={<Heading title="Page 2" />}>Second Page</Page>
      <Page title={<Heading title="Page 3" />}>Third Page</Page>
    </Pages>
  );
  const { rerender } = render(<ExampleComponent pageIndex={1} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Page 2");

  rerender(<ExampleComponent pageIndex={undefined} />);
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading")).toHaveTextContent("Page 2");
});

test("navigating to the next page should render the expected content", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PagesExample />);

  await user.click(screen.getByRole("button", { name: "Go to second page" }));
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading", { name: "My Second Page" })).toBeVisible();
});

test("navigating to the previous page should render the expected content", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PagesExample initialIndex={1} />);
  expect(screen.getByRole("heading")).toHaveTextContent("My Second Page");

  await user.click(screen.getByRole("button", { name: "Back" }));
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading", { name: "My First Page" })).toBeVisible();
});

test("navigating to the previous page should render the last page when currently on the first page", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PagesExample />);

  await user.click(screen.getByRole("button", { name: "Back" }));
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading", { name: "My Third Page" })).toBeVisible();
});

test("navigating to the next page should render the first page when currently on the last page", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PagesExample initialIndex={2} />);
  expect(screen.getByRole("heading")).toHaveTextContent("My Third Page");

  await user.click(screen.getByRole("button", { name: "Go to next page" }));
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading", { name: "My First Page" })).toBeVisible();
});

test("component renders correctly with no title prop passed", () => {
  render(
    <Pages pageIndex={0}>
      <Page>First Page</Page>
    </Pages>,
  );

  expect(screen.getByTestId("visible-page")).toHaveTextContent("First Page");
});

test("when attempting to navigate pages and there is only one page, it should not change the rendered content", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const WithSinglePage = () => {
    const [pageIndex, setPageIndex] = useState(0);

    return (
      <Pages pageIndex={pageIndex}>
        <Page title={<Heading title="Page 1" />}>
          <Button onClick={() => setPageIndex((prev) => prev - 1)}>
            Previous
          </Button>
          <Button onClick={() => setPageIndex((prev) => prev + 1)}>Next</Button>
        </Page>
      </Pages>
    );
  };
  render(<WithSinglePage />);

  await user.click(screen.getByRole("button", { name: "Previous" }));

  expect(screen.getByRole("heading")).toHaveTextContent("Page 1");

  await user.click(screen.getByRole("button", { name: "Next" }));

  expect(screen.getByRole("heading")).toHaveTextContent("Page 1");
});

test("accepts `data-element` and `data-role` tags via props, and has the expected `data-component` tag", () => {
  render(
    <Pages data-element="bar" data-role="baz">
      <Page title="Foo">Bar</Page>
    </Pages>,
  );

  const pagesWrapper = screen.getByTestId("baz");
  expect(pagesWrapper).toHaveAttribute("data-component", "pages");
  expect(pagesWrapper).toHaveAttribute("data-element", "bar");
});

test("the visible `Page` component has the `data-element` attribute set to `visible-page`", () => {
  render(
    <Pages>
      <Page title="Foo">Bar</Page>
    </Pages>,
  );

  const page = screen.getByTestId("visible-page");
  expect(page).toBeVisible();
  expect(page).toHaveAttribute("data-element", "visible-page");
});
