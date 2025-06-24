import { render, screen } from "@testing-library/react";
import React from "react";

import BaseLink from "./base-link.component";

test("renders as a link if `href` is provided", () => {
  render(<BaseLink href="#">This is a link</BaseLink>);
  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("This is a link");
});

test("renders as a button if `onClick` is provided and `href` is not provided", () => {
  render(
    <BaseLink onClick={() => {}}>
      This is also a link, but renders as a button
    </BaseLink>,
  );
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent(
    "This is also a link, but renders as a button",
  );
});

test("renders with the correct aria attributes", () => {
  render(
    <BaseLink
      href="#"
      ariaLabel="This is a link with aria-label"
      aria-describedby="description-id"
    >
      Link with aria attributes
    </BaseLink>,
  );
  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveAttribute(
    "aria-label",
    "This is a link with aria-label",
  );
  expect(linkElement).toHaveAttribute("aria-describedby", "description-id");
});

[true, false].forEach((removeAriaLabelOnIcon) => {
  test(`renders the icon on the left when "iconAlign" is provided and "removeAriaLabelOnIcon" is ${removeAriaLabelOnIcon}`, () => {
    render(
      <BaseLink
        href="#"
        icon="info"
        iconAlign="left"
        ariaLabel="Link with icon"
        removeAriaLabelOnIcon={removeAriaLabelOnIcon}
      >
        Link with icon
      </BaseLink>,
    );
    const anchorElement = screen.getByRole("link");
    expect(anchorElement).toBeInTheDocument();
    const { firstChild, lastChild } = anchorElement;

    expect(firstChild).toHaveAttribute("data-component", "icon");
    expect(lastChild).toHaveTextContent("Link with icon");
  });
});

[true, false].forEach((removeAriaLabelOnIcon) => {
  test(`renders the icon on the right when "iconAlign" is provided and "removeAriaLabelOnIcon" is ${removeAriaLabelOnIcon}`, () => {
    render(
      <BaseLink
        href="#"
        icon="info"
        iconAlign="right"
        ariaLabel="Link with icon"
        removeAriaLabelOnIcon={removeAriaLabelOnIcon}
      >
        Link with icon
      </BaseLink>,
    );
    const anchorElement = screen.getByRole("link");
    expect(anchorElement).toBeInTheDocument();
    const { firstChild, lastChild } = anchorElement;

    expect(firstChild).toHaveTextContent("Link with icon");
    expect(lastChild).toHaveAttribute("data-component", "icon");
  });
});
