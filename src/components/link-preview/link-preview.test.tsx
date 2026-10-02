import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkPreview from "./link-preview.component";

test("renders as an anchor using the `url` as its href when a `url` is provided", () => {
  render(<LinkPreview url="https://foo" />);

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("data-component", "link-preview");
  expect(link).toHaveAttribute("href", "https://foo");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("renders the `url` as visible link text", () => {
  render(<LinkPreview url="foo" />);

  expect(screen.getByText("foo")).toBeVisible();
});

test("removes the scheme from the visible link text when the `url` includes one", () => {
  render(<LinkPreview url="https://foo" />);

  expect(screen.getByText("foo")).toBeVisible();
});

test("renders as a div with no link when no `url` is provided", () => {
  render(<LinkPreview data-role="link-preview" />);

  const wrapper = screen.getByTestId("link-preview");
  expect(wrapper.tagName).toBe("DIV");
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test('renders as a div with an "article" role and a child link when `as` is "div"', () => {
  render(<LinkPreview as="div" url="https://foo" />);

  const wrapper = screen.getByRole("article");
  expect(wrapper.tagName).toBe("DIV");

  const link = screen.getByRole("link", { name: "foo" });
  expect(link).toHaveAttribute("href", "https://foo");
});

test("renders the `title`", () => {
  render(<LinkPreview url="foo" title="bar" />);

  expect(screen.getByText("bar")).toBeVisible();
});

test("renders the `description`", () => {
  render(<LinkPreview url="foo" description="bar" />);

  expect(screen.getByText("bar")).toBeVisible();
});

test("renders the `image` with its `alt` text", () => {
  render(
    <LinkPreview url="foo" image={{ url: "/foo.png", alt: "Carbon logo" }} />,
  );

  expect(screen.getByRole("img", { name: "Carbon logo" })).toBeVisible();
});

test("renders the `image` as decorative when no `alt` is provided", () => {
  render(<LinkPreview url="foo" image={{ url: "/foo.png" }} />);

  const image = screen.getByRole("presentation", { hidden: true });
  expect(image).toHaveAttribute("src", "/foo.png");
  expect(image).toHaveAttribute("alt", "");
  expect(image).toHaveAttribute("aria-hidden", "true");
});

test("renders a placeholder instead of an image when no `image` is provided", () => {
  render(<LinkPreview url="foo" />);

  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("presentation", { hidden: true }),
  ).not.toBeInTheDocument();
});

test("renders four loading placeholders when `isLoading` is true", () => {
  render(<LinkPreview url="foo" isLoading />);

  expect(screen.getAllByTestId("preview-placeholder")).toHaveLength(4);
});

test('renders three loading placeholders when `isLoading` is true and `size` is "small"', () => {
  render(<LinkPreview url="foo" isLoading size="small" />);

  expect(screen.getAllByTestId("preview-placeholder")).toHaveLength(3);
});

test.each(["small", "medium", "large"] as const)(
  'renders a close button when `onClose` is set, `as` is "div" and `size` is "%s"',
  (size) => {
    render(<LinkPreview as="div" url="foo" size={size} onClose={() => {}} />);

    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  },
);

test('does not render a close button when `onClose` is set but `as` is not "div"', () => {
  render(<LinkPreview url="foo" onClose={() => {}} />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("calls the `onClose` callback with the `url` when the close button is clicked", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(<LinkPreview as="div" url="foo" onClose={onClose} />);

  await user.click(screen.getByRole("button", { name: "Close" }));

  expect(onClose).toHaveBeenCalledWith("foo");
});

test("renders with provided data- attributes", () => {
  render(<LinkPreview data-element="bar" data-role="baz" />);

  const wrapper = screen.getByTestId("baz");
  expect(wrapper).toHaveAttribute("data-element", "bar");
});
