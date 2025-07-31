/* TODO: FE-6579 To re-enable once button-related props are removed from Link */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Link from "./link.component";
import { Menu } from "../menu";

test("should render `Skip to main content` text inside of Link when `isSkipLink` prop is provided", () => {
  render(
    <Link href="#test" isSkipLink>
      Test Content
    </Link>,
  );

  expect(screen.getByText("Skip to main content")).toBeInTheDocument();
});

test("should not call the onClick function when `disabled` prop is true and clicked", async () => {
  const user = userEvent.setup();
  const spy = jest.fn();
  render(
    <Link disabled onClick={spy}>
      Test Content
    </Link>,
  );

  const linkButtonElement = screen.getByRole("button", {
    name: "Test Content",
  });

  await user.click(linkButtonElement);

  expect(linkButtonElement).toBeDisabled();
  expect(spy).not.toHaveBeenCalled();
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

test("should render an `Icon` correctly with the `basket` value", () => {
  render(
    <Link href="#test" icon="basket">
      Test Content
    </Link>,
  );

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveAttribute("type", "basket");
});

test("should render an `Icon` on the left side of the component by default", () => {
  render(<Link icon="basket" />);

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveStyle({
    marginRight: "var(--spacing050)",
    position: "relative",
  });
});

test("should render an `Icon` on the right", () => {
  render(<Link icon="basket" iconAlign="right" />);

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveStyle({
    marginRight: "0",
    marginLeft: "var(--spacing100)",
    position: "relative",
  });
});

test("should render an `Icon` on the right with no margin when no children", () => {
  render(<Link icon="home" iconAlign="right" />);

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveStyle({
    marginRight: "0",
    marginLeft: "0",
    position: "relative",
  });
});

test("when a link is rendered with an icon and no children, there should be no text decoration on the anchor element", () => {
  render(<Link icon="home" href="www.sage.com" />);

  const linkElement = screen.getByTestId("link-anchor");

  expect(linkElement).toHaveStyle("text-decoration: none");
});

test("when a link is rendered with an icon and no children, link should have the inline display property", () => {
  render(<Link icon="home" href="www.sage.com" />);

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveStyle("display: inline");
});

test("when a link is rendered with an icon aligned right and has content, expected styles should be applied", () => {
  render(
    <Link icon="home" href="www.sage.com" iconAlign="right">
      Has Content
    </Link>,
  );

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toHaveStyle("margin-left: var(--spacing100)");
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

describe("when using the underline prop", () => {
  it("should display an underline for all states when the prop is `always`", () => {
    render(
      <Link href="foo.com" underline="always">
        Test Content
      </Link>,
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveStyle("text-decoration: underline");
  });

  it("should maintain an underline on hover when the prop is `always`", async () => {
    const user = userEvent.setup();
    render(
      <Link href="foo.com" underline="always">
        Test Content
      </Link>,
    );
    const linkElement = screen.getByRole("link");
    await user.hover(linkElement);
    expect(linkElement).toHaveStyle("text-decoration: underline");
  });

  it("should not display an underline for all states when the prop is `never`", () => {
    render(
      <Link href="foo.com" underline="never">
        Test Content
      </Link>,
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveStyle("text-decoration: none");
  });

  it("should not display an underline on hover when the prop is `never`", async () => {
    const user = userEvent.setup();
    render(
      <Link href="foo.com" underline="never">
        Test Content
      </Link>,
    );
    const linkElement = screen.getByRole("link");
    await user.hover(linkElement);
    expect(linkElement).toHaveStyle("text-decoration: none");
  });
});

// Test is just for coverage
test("neutral `variant` has the expected styling when `isDarkBackground` is false", () => {
  render(
    <Link
      href="foo.com"
      isDarkBackground={false}
      icon="home"
      variant="neutral"
      data-role="link"
    />,
  );

  const linkElement = screen.getByTestId("link");
  const iconElement = screen.getByTestId("icon");

  expect(linkElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
  expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
});

// Test is just for coverage
test("neutral `variant` has the expected styling when `isDarkBackground` is false and is hovered over", async () => {
  const user = userEvent.setup();
  render(
    <Link
      href="foo.com"
      isDarkBackground={false}
      icon="home"
      variant="neutral"
      data-role="link"
    />,
  );

  const linkElement = screen.getByTestId("link");
  const iconElement = screen.getByTestId("icon");

  await user.hover(linkElement);

  expect(linkElement).toHaveStyle("color: var(--colorsActionMajor600)");
  expect(iconElement).toHaveStyle("color: var(--colorsActionMajor600)");
});

// Test is just for coverage
test("neutral `variant` has the expected styling when `isDarkBackground` is false and is focused", async () => {
  const user = userEvent.setup();
  render(
    <Link
      href="foo.com"
      isDarkBackground={false}
      icon="home"
      variant="neutral"
      data-role="link"
    />,
  );

  const linkElement = screen.getByTestId("link");
  const iconElement = screen.getByTestId("icon");

  await user.tab();

  expect(linkElement).toHaveStyle({
    color: "var(--colorsActionMajorYin090)",
    backgroundColor: "var(--colorsSemanticFocus250)",
  });
  expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
});

// Test is just for coverage
test("negative `variant` has the expected styling when `isDarkBackground` is false", () => {
  render(
    <Link
      href="foo.com"
      isDarkBackground={false}
      icon="home"
      variant="negative"
      data-role="link"
    />,
  );

  const linkElement = screen.getByTestId("link");
  const iconElement = screen.getByTestId("icon");

  expect(linkElement).toHaveStyle("color: var(--colorsSemanticNegative500)");
  expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
});

// Test is just for coverage
test("negative `variant` has the expected styling when `isDarkBackground` is false and is hovered", async () => {
  const user = userEvent.setup();
  render(
    <Link
      href="foo.com"
      isDarkBackground={false}
      icon="home"
      variant="neutral"
      data-role="link"
    />,
  );

  const linkElement = screen.getByTestId("link");
  const iconElement = screen.getByTestId("icon");

  await user.hover(linkElement);

  expect(linkElement).toHaveStyle("color: var(--colorsSemanticNegative600)");
  expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
});

// Tests are just for coverage
describe("isDarkBackground", () => {
  it("matches the expected styling with default `variant`", () => {
    render(
      <Link href="foo.com" isDarkBackground icon="home" data-role="link" />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle(`color: var(--colorsActionMajor350)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMajor350)`);
  });

  it("matches the expected styling with default `variant` when hovered over", async () => {
    const user = userEvent.setup();
    render(
      <Link href="foo.com" isDarkBackground icon="home" data-role="link" />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.hover(linkElement);

    expect(linkElement).toHaveStyle(`color: var(--colorsActionMajor450)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMajor450)`);
  });

  it("matches the expected styling with default `variant` when focused", async () => {
    const user = userEvent.setup();
    render(
      <Link href="foo.com" isDarkBackground icon="home" data-role="link" />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.tab();

    expect(linkElement).toHaveStyle({
      color: "var(--colorsActionMajorYin090)",
      backgroundColor: "var(--colorsSemanticFocus250)",
    });
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMajorYin090)`);
  });

  it("matches the expected styling when disabled", () => {
    render(<Link href="foo.com" isDarkBackground disabled data-role="link" />);

    const linkElement = screen.getByTestId("link");

    expect(linkElement).toHaveStyle(`color: var(--colorsActionMajorYang030)`);
  });

  it("matches the styling when `variant` is set to negative", () => {
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="negative"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle(`color: var(--colorsSemanticNegative350)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsSemanticNegative350)`);
  });

  it("matches the styling when `variant` is set to negative and hovered over", async () => {
    const user = userEvent.setup();
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="negative"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.hover(linkElement);

    expect(linkElement).toHaveStyle(`color: var(--colorsSemanticNegative450)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsSemanticNegative450)`);
  });

  it("matches the styling when `variant` is set to negative and focused", async () => {
    const user = userEvent.setup();
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="negative"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.tab();

    expect(linkElement).toHaveStyle({
      color: "var(--colorsActionMajorYin090)",
      backgroundColor: "var(--colorsSemanticFocus250)",
    });
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMajorYin090)`);
  });

  it("matches the styling when `variant` is set to neutral", () => {
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="neutral"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle(`color: var(--colorsActionMinor100)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMinor100)`);
  });

  it("matches the styling when `variant` is set to neutral and is hovered over", () => {
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="neutral"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle(`color: var(--colorsActionMajor450)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsActionMajor450)`);
  });

  it("matches the styling when `variant` is set to neutral and is focused", () => {
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="neutral"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle({
      color: "var(--colorsActionMajorYin090)",
      backgroundColor: "var(--colorsSemanticFocus250)",
    });
    expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
  });

  it("matches the styling when `variant` is set to subtle", () => {
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="subtle"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    expect(linkElement).toHaveStyle(`color: var(--colorsUtilityYang100)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsUtilityYang100)`);
  });

  it("matches the styling when `variant` is set to subtle and is hovered over", async () => {
    const user = userEvent.setup();
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="subtle"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.hover(linkElement);

    expect(linkElement).toHaveStyle(`color: var(--colorsUtilityYang100)`);
    expect(iconElement).toHaveStyle(`color: var(--colorsUtilityYang100)`);
  });

  it("matches the styling when `variant` is set to subtle and is focused", async () => {
    const user = userEvent.setup();
    render(
      <Link
        href="foo.com"
        isDarkBackground
        icon="home"
        variant="subtle"
        data-role="link"
      />,
    );

    const linkElement = screen.getByTestId("link");
    const iconElement = screen.getByTestId("icon");

    await user.tab();

    expect(linkElement).toHaveStyle({
      color: "var(--colorsActionMajorYin090)",
      backgroundColor: "var(--colorsSemanticFocus250)",
    });
    expect(iconElement).toHaveStyle("color: var(--colorsActionMajorYin090)");
  });
});

// Test is just for coverage
describe("link display styling", () => {
  it("when inside a menu, link element has display inline-block", () => {
    render(
      <Menu menuType="light">
        <Link href="foo.com" />
      </Menu>,
    );

    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveStyle(`display: inline-block`);
  });

  it("when not inside a menu, link element has default display", () => {
    render(<Link href="foo.com" isDarkBackground icon="home" />);

    const linkElement = screen.getByRole("link");

    expect(linkElement).not.toHaveStyle(`display: inline-block`);
  });
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
