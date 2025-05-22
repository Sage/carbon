import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BaseLink from "./base-link.component";

describe("BaseLink", () => {
  it("renders an anchor when `href` is provided", () => {
    render(<BaseLink href="https://example.com">Visit</BaseLink>);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });

  it("renders a button when `onClick` is provided and no `href`", () => {
    render(<BaseLink onClick={() => {}}>Click Me</BaseLink>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies `aria-label` when provided", () => {
    render(<BaseLink ariaLabel="accessible" href="#" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "accessible");
  });

  it("renders children inside StyledContent", () => {
    render(<BaseLink href="#">Child Text</BaseLink>);
    expect(screen.getByText("Child Text")).toBeInTheDocument();
  });

  it("renders icon on left by default", () => {
    render(<BaseLink href="#" icon="home" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders icon on right when `iconAlign='right'`", () => {
    render(<BaseLink href="#" icon="home" iconAlign="right" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("omits `aria-label` from icon when `removeAriaLabelOnIcon` is true", () => {
    render(
      <BaseLink href="#" icon="home" ariaLabel="label" removeAriaLabelOnIcon />,
    );
    const icon = screen.getByTestId("icon");
    expect(icon).not.toHaveAttribute("aria-label");
  });

  it("applies `data-element` attribute", () => {
    render(<BaseLink href="#" data-element="custom-link" />);
    const anchor = screen.getByTestId("link-anchor");
    expect(anchor).toHaveAttribute("data-element", "link");
  });

  it("forwards ref as object", () => {
    const ref = { current: null };
    render(<BaseLink href="#" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("forwards ref as callback", () => {
    const mockRef = jest.fn();
    render(<BaseLink href="#" ref={mockRef} />);
    expect(mockRef).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it("calls `onClick` when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<BaseLink onClick={handleClick}>Click</BaseLink>);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not call `onClick` when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <BaseLink onClick={handleClick} disabled>
        Disabled
      </BaseLink>,
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders skip link label when `isSkipLink` is true", () => {
    render(<BaseLink href="#main" isSkipLink />);
    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });
});
