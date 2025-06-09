import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { BaseLink } from "./base-link.component";

describe("BaseLink", () => {
  it("renders an anchor element when `href` is provided", () => {
    render(<BaseLink href="https://example.com">Anchor</BaseLink>);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor).toHaveTextContent("Anchor");
  });

  it("renders a button element when `href` is not provided", () => {
    render(<BaseLink onClick={() => { }}>Button</BaseLink>);
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
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveClass("custom-class");
    expect(anchor).toHaveAttribute("data-role", "test-role");
    expect(anchor).toHaveAttribute("data-element", "test-element");
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<BaseLink ref={ref} onClick={() => { }}>Ref Button</BaseLink>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies tabIndex when specified", () => {
    render(
      <BaseLink href="#" tabIndex={-1}>
        TabIndex
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("tabindex", "-1");
  });
});
