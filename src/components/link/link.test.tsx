import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Link from "./link.component";
import { Menu } from "../menu";

import Logger from "../../__internal__/utils/logger";

test("logs a deprecation warning when 'disabled 'prop is used", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Link href="foo.com" disabled />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'disabled' prop in Link is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("logs a deprecation warning when isDarkBackground prop is used", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Link href="foo.com" isDarkBackground />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("logs a deprecation warning when 'default' variant name is used", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Link href="foo.com" variant="default" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The value 'default' for the variant prop is deprecated and will soon be removed. Please use value 'typical' instead.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("logs a deprecation warning when 'neutral' variant name is used", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(<Link href="foo.com" variant="neutral" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The value 'neutral' for the variant prop is deprecated and will soon be removed. Please use value 'subtle' instead.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test("logs a deprecation warning when tooltip props are used", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <Link href="foo.com" tooltipMessage="message" tooltipPosition="top" />,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'tooltipMessage' prop in Link is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'tooltipPosition' prop in Link is deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(2);

  loggerSpy.mockRestore();
});

test("should render `Skip to main content` text inside of Link when `isSkipLink` prop is provided", () => {
  render(<Link href="#test" isSkipLink />);

  expect(screen.getByText("Skip to main content")).toBeInTheDocument();
});

test("should call the onClick function clicked", async () => {
  const spy = jest.fn();
  render(<Link onClick={spy}>Test Content</Link>);

  const linkElement = screen.getByText("Test Content");
  await userEvent.click(linkElement);

  expect(spy).toHaveBeenCalled();
});

test("when component receives a `target` prop it should render an `<a>` element with target attribute", () => {
  const target = "_blank";
  render(<Link target={target} />);

  const linkElement = screen.getByTestId("link-anchor");

  expect(linkElement).toHaveAttribute("target", target);
});

test("when component received a `rel` prop it should render an `<a>` element with rel attribute", () => {
  const rel = "alternate";

  render(<Link rel={rel} />);

  const linkElement = screen.getByTestId("link-anchor");

  expect(linkElement).toHaveAttribute("rel", rel);
});

test("when component receives a `href` prop it should render an `<a>` element with href attribute", () => {
  const href = "https://www.google.com";
  render(<Link href={href} />);

  const linkElement = screen.getByRole("link");

  expect(linkElement).toHaveAttribute("href", href);
});

test("when component receives the `download` prop, and the component renders as a `<a>` it should render with the download attribute", () => {
  render(<Link href="#test" download />);

  const linkElement = screen.getByRole("link");

  expect(linkElement).toHaveAttribute("download", "");
});

test("when component receives the `download` prop, and the component renders as a `<button>` it should not render with the download attribute", () => {
  render(<Link onClick={() => {}} download />);

  const buttonElement = screen.getByRole("button");

  expect(buttonElement).not.toHaveAttribute("download", "");
});

test("should render an `Icon` correctly with the `basket` value", () => {
  render(
    <Link href="#test" icon="basket">
      Test Content
    </Link>,
  );

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveAttribute("type", "basket");
  expect(iconElement).toBeVisible();
});

describe("when the `onKeyDown` event is triggered", () => {
  it("should call onKeyDown callback, when provided and link is triggered via the Enter key", async () => {
    const onClickFn = jest.fn();
    const onKeyDownFn = jest.fn();
    const user = userEvent.setup();
    render(<Link onKeyDown={onKeyDownFn} onClick={onClickFn} href="#" />);

    const linkElement = screen.getByTestId("link-anchor");
    act(() => {
      linkElement.focus();
    });
    await user.keyboard("{Enter}");

    expect(onKeyDownFn).toHaveBeenCalled();
  });

  it("should fire `onKeyDown`  when a key is pressed but no `onClick` prop is passed", async () => {
    const onKeyDownFn = jest.fn();
    const user = userEvent.setup();
    render(<Link onKeyDown={onKeyDownFn} href="#" />);

    const linkElement = screen.getByTestId("link-anchor");
    act(() => {
      linkElement.focus();
    });
    await user.keyboard("{Enter}");

    expect(onKeyDownFn).toHaveBeenCalled();
  });

  it("should not fire `onClick` when a key is pressed but no `onClick` prop is passed", async () => {
    const onClickFn = jest.fn();
    const onKeyDownFn = jest.fn();
    const user = userEvent.setup();
    render(<Link onKeyDown={onKeyDownFn} href="#" />);

    const linkElement = screen.getByTestId("link-anchor");
    act(() => {
      linkElement.focus();
    });
    await user.keyboard("{Enter}");

    expect(onKeyDownFn).toHaveBeenCalled();
    expect(onClickFn).not.toHaveBeenCalled();
  });
});

test("component should render a button element when `onClick` prop is passed", () => {
  render(<Link onClick={() => {}} />);

  const buttonElement = screen.getByRole("button");

  expect(buttonElement).toBeInTheDocument();
});

test("when rendered as an `<a>` element, it should set the expected aria attributes", () => {
  render(<Link aria-label="test" />);

  const linkElement = screen.getByTestId("link-anchor");

  expect(linkElement).toHaveAccessibleName("test");
});

test("when rendered as a `button` element, it should set the aria attributes on the button", () => {
  render(<Link onClick={() => {}} aria-label="test" />);

  const buttonElement = screen.getByRole("button");

  expect(buttonElement).toHaveAccessibleName("test");
});

test("when `removeAriaLabelOnIcon` is true, it should set aria-label as undefined on the icon", () => {
  render(
    <Link
      onClick={() => null}
      icon="home"
      aria-label="test"
      removeAriaLabelOnIcon
    />,
  );

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).not.toHaveAttribute("aria-label");
});

test("renders with custom data tags", () => {
  render(<Link data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});

test("should display an underline for all states when the `underline` prop is `always`", async () => {
  const user = userEvent.setup();
  render(
    <Link href="foo.com" underline="always">
      Test Content
    </Link>,
  );
  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveStyle("text-decoration: underline");

  await user.hover(linkElement);
  expect(linkElement).toHaveStyle("text-decoration: underline");
});

test("should not display an underline for all states when the `underline` prop is `never`", async () => {
  const user = userEvent.setup();
  render(
    <Link href="foo.com" underline="never">
      Test Content
    </Link>,
  );
  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveStyle("text-decoration: none");

  await user.hover(linkElement);
  expect(linkElement).toHaveStyle("text-decoration: none");
});

// Coverage
test("renders with expected font when `bold` is true", () => {
  render(
    <Link href="foo.com" data-role="link" bold>
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-lined-medium-m)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected font when `linkSize` is `large`", () => {
  render(
    <Link href="foo.com" data-role="link" linkSize="large">
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-l)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected font when `bold` is true and `linkSize` is `large`", () => {
  render(
    <Link href="foo.com" data-role="link" bold linkSize="large">
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-lined-medium-l)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected styling when `variant` is `negative`", () => {
  render(
    <Link href="foo.com" data-role="link" variant="negative">
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "color",
    "var(--link-destructive-label-default)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected styling when `variant` is `subtle`", () => {
  render(
    <Link href="foo.com" data-role="link" variant="subtle">
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "color",
    "var(--link-subtle-label-default)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected styling when `variant` is `typical` and `inverse` is true", () => {
  render(
    <Link href="foo.com" data-role="link" variant="typical" inverse>
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "color",
    "var(--link-typical-inverse-label-default)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected styling when `variant` is `negative` and inverse is true", () => {
  render(
    <Link href="foo.com" data-role="link" variant="negative" inverse>
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "color",
    "var(--link-destructive-inverse-label-default)",
    { modifier: "> a" },
  );
});

// Coverage
test("renders with expected styling when `variant` is `subtle` and `inverse` is true", () => {
  render(
    <Link href="foo.com" data-role="link" variant="subtle" inverse>
      Test Content
    </Link>,
  );

  const linkElement = screen.getByTestId("link");

  expect(linkElement).toHaveStyleRule(
    "color",
    "var(--link-subtle-inverse-label-default)",
    { modifier: "> a" },
  );
});

// Coverage
test("when inside a menu, link element has display inline-block", () => {
  render(
    <Menu menuType="light">
      <Link href="foo.com" />
    </Menu>,
  );

  const linkElement = screen.getByRole("link");

  expect(linkElement).toHaveStyle(`display: inline-block`);
});

test("accepts ref as a ref object", () => {
  const mockRef = { current: null };
  render(<Link href="#" ref={mockRef} />);

  const link = screen.getByRole("link");

  expect(mockRef.current).toBe(link);
});

test("accepts ref as a ref callback", () => {
  const mockRef = jest.fn();
  render(<Link href="#" ref={mockRef} />);

  const link = screen.getByRole("link");

  expect(mockRef).toHaveBeenCalledWith(link);
});

test("sets ref to empty after unmount", () => {
  const mockRef = { current: null };
  const { unmount } = render(<Link />);

  unmount();

  expect(mockRef.current).toBe(null);
});
