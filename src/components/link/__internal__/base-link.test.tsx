import React, { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BaseLink } from "./base-link.component";

describe("BaseLink", () => {
  it("forwards ref to anchor element", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <BaseLink ref={ref} href="https://example.com">
        Ref Anchor
      </BaseLink>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("applies customStyles to wrapper", () => {
    const customStyles = `
      background-color: red;
      padding: 10px;
    `;
    render(
      <BaseLink href="#" customStyles={customStyles}>
        Custom Styled
      </BaseLink>,
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("handles onClick event for anchor", () => {
    const handleClick = jest.fn();
    render(
      <BaseLink href="#" onClick={handleClick}>
        Click Me
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    anchor.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("handles onClick event for button", () => {
    const handleClick = jest.fn();
    render(<BaseLink onClick={handleClick}>Click Me</BaseLink>);
    const button = screen.getByRole("button");
    button.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("handles onKeyDown event using getByRole", () => {
    const handleKeyDown = jest.fn();

    render(
      <BaseLink href="#test" onKeyDown={handleKeyDown}>
        Test Link
      </BaseLink>,
    );

    const anchor = screen.getByRole("link");

    fireEvent.keyDown(anchor, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("handles onMouseDown event", () => {
    const handleMouseDown = jest.fn();
    render(
      <BaseLink href="#" onMouseDown={handleMouseDown}>
        Mouse Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    anchor.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handleMouseDown).toHaveBeenCalled();
  });

  it("handles onFocus event", () => {
    const handleFocus = jest.fn();
    render(
      <BaseLink href="#" onFocus={handleFocus}>
        Focus Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    anchor.focus();
    expect(handleFocus).toHaveBeenCalled();
  });

  it("handles onBlur event", () => {
    const handleBlur = jest.fn();
    render(
      <BaseLink href="#" onBlur={handleBlur}>
        Blur Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    anchor.focus();
    anchor.blur();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("applies rel attribute", () => {
    render(
      <BaseLink href="#" rel="noopener">
        Rel Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("rel", "noopener");
  });

  it("applies target attribute", () => {
    render(
      <BaseLink href="#" target="_blank">
        Target Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("target", "_blank");
  });

  it("applies aria-label attribute", () => {
    render(
      <BaseLink href="#" ariaLabel="Custom Label">
        Aria Test
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("aria-label", "Custom Label");
  });

  it("uses default data-testid when not provided", () => {
    render(<BaseLink href="#">Default TestId</BaseLink>);
    const anchor = screen.getByTestId("link-anchor");
    expect(anchor).toBeInTheDocument();
  });

  it("uses default data-role when not provided", () => {
    render(<BaseLink href="#">Default Role</BaseLink>);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("data-role", "link-anchor");
  });

  it("converts crumb data-role to link-anchor", () => {
    render(
      <BaseLink href="#" data-role="crumb">
        Crumb Role
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("data-role", "link-anchor");
  });

  it("uses custom data-role when provided", () => {
    render(
      <BaseLink href="#" data-role="custom-role">
        Custom Role
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("data-role", "custom-role");
  });

  it("renders as button when onClick is provided without href", () => {
    render(<BaseLink onClick={() => {}}>Button Mode</BaseLink>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders as anchor when both onClick and href are provided", () => {
    render(
      <BaseLink onClick={() => {}} href="#test">
        Anchor Mode
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "#test");
  });

  it("renders as anchor when only href is provided", () => {
    render(<BaseLink href="#test">Anchor Only</BaseLink>);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "#test");
  });

  it("handles null ref for anchor", () => {
    render(
      <BaseLink ref={null} href="#">
        Null Ref Anchor
      </BaseLink>,
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
  });

  it("handles null ref for button", () => {
    render(
      <BaseLink ref={null} onClick={() => {}}>
        Null Ref Button
      </BaseLink>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles function ref for anchor", () => {
    const refCallback = jest.fn();
    render(
      <BaseLink ref={refCallback} href="#">
        Function Ref Anchor
      </BaseLink>,
    );
    expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));
  });

  it("handles function ref for button", () => {
    const refCallback = jest.fn();
    render(
      <BaseLink ref={refCallback} onClick={() => {}}>
        Function Ref Button
      </BaseLink>,
    );
    expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has correct displayName", () => {
    expect(BaseLink.displayName).toBe("BaseLink");
  });
});
