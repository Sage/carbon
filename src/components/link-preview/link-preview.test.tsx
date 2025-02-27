import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkPreview from "./link-preview.component";

test("renders with a placeholder image and four loading preview's", () => {
  render(<LinkPreview />);
  const placeholderImage = screen.getByTestId("link preview image placeholder");
  const previews = screen.getAllByTestId("preview-placeholder");

  expect(placeholderImage).toBeVisible();
  expect(previews).toHaveLength(4);

  previews.forEach((preview) => {
    expect(preview).toBeVisible();
  });
});

test("renders with an anchor root element and href when the `url` prop is passed", () => {
  render(<LinkPreview url="foo" />);
  const linkPreviewWrapper = screen.getByRole("link");

  expect(linkPreviewWrapper).toHaveAttribute("href", "foo");
  expect(linkPreviewWrapper).toBeVisible();
});

test("renders with visible link text, via the `url` prop", () => {
  render(<LinkPreview url="foo" />);
  const linkText = screen.getByText("foo");

  expect(linkText).toBeVisible();
});

test("renders with the schema removed in the visible link text, via the `url` prop if a schema is present", () => {
  render(<LinkPreview url="https://foo" />);
  const linkText = screen.getByText("foo");

  expect(linkText).toBeVisible();
});

test('renders with a div root element, when the `as` prop is passed as "div"', () => {
  render(<LinkPreview data-role="link-preview" as="div" />);
  const linkPreviewWrapper = screen.getByTestId("link-preview");

  expect(linkPreviewWrapper.tagName).toBe("DIV");
});

test("renders with a custom title, via the `title` prop", () => {
  render(<LinkPreview url="foo" title="bar" />);
  const title = screen.getByText("bar");

  expect(title).toBeVisible();
});

test("renders with a custom description, via the `description` prop", () => {
  render(<LinkPreview url="foo" description="bar" />);
  const description = screen.getByText("bar");

  expect(description).toBeVisible();
});

test("renders with a custom image and alt text via the `image` object prop", () => {
  render(
    <LinkPreview
      url="foo"
      image={{
        url: "https://irs.www.warnerbros.com/keyart-jpeg/heat_keyart.jpg",
        alt: "Heat 1995",
      }}
    />,
  );
  const image = screen.getByRole("img", { name: "Heat 1995" });

  expect(image).toBeVisible();
});

test('renders with default alt text "Link preview image" when no `alt` is provided via the `image` object prop', () => {
  render(
    <LinkPreview
      url="foo"
      image={{
        url: "https://irs.www.warnerbros.com/keyart-jpeg/heat_keyart.jpg",
      }}
    />,
  );
  const image = screen.getByRole("img", { name: "Link preview image" });

  expect(image).toBeVisible();
});

test("renders a close icon when the `onClose` callback is passed", () => {
  render(<LinkPreview as="div" onClose={() => {}} />);

  const closeButton = screen.getByRole("button", {
    name: "link preview close button",
  });
  expect(closeButton).toBeVisible();
});

test("should call the `onClose` callback when the close icon is clicked", async () => {
  const onCloseMock = jest.fn();
  render(<LinkPreview as="div" onClose={onCloseMock} />);

  const user = userEvent.setup();
  const closeButton = screen.getByRole("button", {
    name: "link preview close button",
  });
  await user.click(closeButton);

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test("renders with four loading preview's when the `isLoading` prop is true", () => {
  render(<LinkPreview isLoading />);
  const previews = screen.getAllByTestId("preview-placeholder");

  expect(previews).toHaveLength(4);

  previews.forEach((preview) => {
    expect(preview).toBeVisible();
  });
});

test("renders with provided data- attributes", () => {
  render(<LinkPreview data-element="bar" data-role="baz" />);

  const linkPreviewWrapper = screen.getByTestId("baz");

  expect(linkPreviewWrapper).toHaveAttribute("data-element", "bar");
});
