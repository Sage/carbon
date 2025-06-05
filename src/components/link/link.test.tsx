/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "./link.component";

describe("Link component", () => {
  test("renders with text and calls `onClick` when clicked", async () => {
    const onClick = jest.fn();
    render(
      <Link onClick={onClick} hasContent={false}>
        Click me
      </Link>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalled();
  });

  test("renders as <a> with href, rel and target", () => {
    render(
      <Link
        href="https://example.com"
        rel="noopener"
        target="_blank"
        hasContent={false}
      >
        Go
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("rel", "noopener");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders disabled button when `onClick` is provided and `disabled` is true", async () => {
    const onClick = jest.fn();
    render(
      <Link onClick={onClick} disabled hasContent={false}>
        Don't click
      </Link>,
    );
    const button = screen.getByRole("button", { name: "Don't click" });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("calls both `onKeyDown` and `onClick` when Enter is pressed", async () => {
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <Link
        href="#"
        onKeyDown={onKeyDown}
        onClick={onClick}
        aria-label="Back"
        hasContent={false}
      />,
    );
    const link = screen.getByRole("link", { name: "Back" });
    act(() => link.focus());
    await user.keyboard("{Enter}");
    expect(onKeyDown).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  test("renders button when no href is provided but onClick is", () => {
    render(
      <Link onClick={() => {}} hasContent={false}>
        Click
      </Link>,
    );
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  test("renders icon with correct type", () => {
    render(
      <Link href="#" icon="home" hasContent={false}>
        Home
      </Link>,
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
        hasContent={false}
      />,
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link href="#" ref={ref} hasContent={false}>
        Ref Link
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  test("supports ref as callback", () => {
    const ref = jest.fn();
    render(
      <Link href="#" ref={ref} hasContent={false}>
        Ref Callback
      </Link>,
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLAnchorElement));
  });
});
