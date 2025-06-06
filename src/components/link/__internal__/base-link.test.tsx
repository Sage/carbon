import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import BaseLink from "./base-link.component";

describe("BaseLink", () => {
  it("renders an anchor element when `href` is provided", () => {
    render(<BaseLink href="https://example.com">Anchor</BaseLink>);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor).toHaveTextContent("Anchor");
  });

  it("renders a button element when `href` is not provided", () => {
    render(<BaseLink>Button</BaseLink>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Button");
  });

  it("applies custom className and data attributes", () => {
    render(
      <BaseLink
        href="#"
        className="custom-class"
        data-role="test-role"
        data-element="test-element"
      >
        Custom
      </BaseLink>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveClass("custom-class");
    expect(anchor).toHaveAttribute("data-role", "test-role");
    expect(anchor).toHaveAttribute("data-element", "test-element");
  });

  it("forwards ref to anchor element", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <BaseLink href="https://test.com" ref={ref}>
        Ref Link
      </BaseLink>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<BaseLink ref={ref}>Ref Button</BaseLink>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies inline style", () => {
    render(
      <BaseLink href="#" style={{ color: "red" }}>
        Styled
      </BaseLink>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveStyle({ color: "red" });
  });

  it("applies tabIndex when specified", () => {
    render(
      <BaseLink href="#" tabIndex={-1}>
        TabIndex
      </BaseLink>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("tabindex", "-1");
  });
});