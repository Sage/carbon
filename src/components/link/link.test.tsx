/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "./link.component";

describe("Link component", () => {
  test("renders with text and calls `onClick` when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Link onClick={onClick}>Click me</Link>);

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  test("renders as <a> with href, rel and target", () => {
    render(
      <Link href="https://example.com" rel="noopener" target="_blank">
        Go
      </Link>
    );

    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("rel", "noopener");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders disabled button when `onClick` is provided and `disabled` is true", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Link onClick={onClick} disabled>
        Don't click
      </Link>
    );

    const button = screen.getByRole("button", { name: "Don't click" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("calls both `onKeyDown` and `onClick` when Enter is pressed", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const onKeyDown = jest.fn();

    render(
      <Link
        href="#"
        aria-label="Back"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Back
      </Link>
    );

    const link = screen.getByRole("link", { name: "Back" });

    await act(async () => {
      link.focus();
    });

    await user.keyboard("{Enter}");

    expect(onKeyDown).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  test("renders button when no href is provided but onClick is", () => {
    render(<Link onClick={() => {}}>Click</Link>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  test("renders icon with correct type", () => {
    render(
      <Link href="#" icon="home">
        Home
      </Link>
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("type", "home");
  });

  test("icon does not have aria-label when `removeAriaLabelOnIcon` is true", () => {
    render(
      <Link
        onClick={() => {}}
        icon="home"
        aria-label="Home"
        removeAriaLabelOnIcon
      />
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link href="#" ref={ref}>
        Ref Link
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  test("supports ref as callback", () => {
    const ref = jest.fn();
    render(
      <Link href="#" ref={ref}>
        Ref Callback
      </Link>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));
  });
});
