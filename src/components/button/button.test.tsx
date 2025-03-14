import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button.component";
import { render } from "../../__spec_helper__/__internal__/test-utils";

test("renders with text children", () => {
  render(<Button>foo</Button>);

  const button = screen.getByRole("button", {
    name: "foo",
  });

  expect(button).toBeVisible();
});

test("renders with text children and an icon, when the 'iconType' prop is also passed", () => {
  render(<Button iconType="bin">foo</Button>);

  const button = screen.getByRole("button", {
    name: "foo",
  });
  const icon = screen.getByTestId("icon");

  expect(button).toBeVisible();
  expect(icon).toBeVisible();
});

test("renders with just an icon when only the 'iconType' prop is passed", () => {
  render(<Button iconType="bin" />);

  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");

  expect(button).toHaveTextContent("");
  expect(icon).toBeVisible();
});

test("renders with the 'iconType's prop value as the 'aria-label' attribute if the 'aria-label' prop is not previously passed, and only the 'iconType' prop is passed", () => {
  render(<Button iconType="bin" />);

  const button = screen.getByRole("button", { name: "bin" });

  expect(button).toHaveAttribute("aria-label", "bin");
});

test("renders with a 'subtext' element when the 'size' prop is 'large' and text children is passed", () => {
  render(<Button size="large">foo</Button>);

  const subtext = screen.getByTestId("subtext");
  expect(subtext).toBeVisible();
});

test("does not render, as an invariant is fired due to no text children or 'iconType' prop being defined", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => render(<Button />)).toThrow(
    "Either prop `iconType` must be defined or this node must have children.",
  );

  consoleSpy.mockRestore();
});

test("does not render, as an invariant is fired when the 'size' prop is 'small' and the 'subtext' prop is passed", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <Button subtext="bar" size="small">
        foo
      </Button>,
    ),
  ).toThrow("subtext prop has no effect unless the button is large");

  consoleSpy.mockRestore();
});

test("does not render, as an invariant is fired when the 'size' prop is 'medium' and the 'subtext' prop is passed", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <Button subtext="bar" size="medium">
        foo
      </Button>,
    ),
  ).toThrow("subtext prop has no effect unless the button is large");

  consoleSpy.mockRestore();
});

test("sets the 'aria-label' attribute correctly when a custom value is passed to the 'aria-label' prop", () => {
  render(<Button aria-label="foo">bar</Button>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveAccessibleName("foo");
});

test("sets the 'aria-labelledby' attribute correctly when a custom value is passed to the 'aria-labelledby' prop", () => {
  render(
    <>
      <span id="foo">this labels the button</span>
      <Button aria-labelledby="foo">bar</Button>
    </>,
  );

  const button = screen.getByRole("button", { name: "this labels the button" });

  expect(button).toHaveAccessibleName("this labels the button");
});

test("sets the 'aria-describedby' attribute correctly when a custom value is passed to the 'aria-describedby' prop", () => {
  render(
    <>
      <span id="foo">this describes the button</span>
      <Button aria-describedby="foo">bar</Button>
    </>,
  );

  const button = screen.getByRole("button", { name: "bar" });

  expect(button).toHaveAccessibleDescription("this describes the button");
});

/* Styling test for coverage */
test("sets the correct icon colour when 'gradient-white' is passed to the 'buttonType' prop", () => {
  render(
    <Button aria-label="button" buttonType="gradient-white" iconType="bin">
      foo
    </Button>,
  );

  const icon = screen.getByTestId("icon");

  expect(icon).toHaveStyle("color: --colorsActionMinorYin090");
});

/* Styling test for coverage */
test("sets the correct icon colour when 'gradient-grey' is passed to the 'buttonType' prop", () => {
  render(
    <Button aria-label="button" buttonType="gradient-grey" iconType="bin">
      foo
    </Button>,
  );

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveStyle("color: --colorsActionMinorYin090");
});

/* Styling test for coverage */
test("sets the correct height when 'services' is passed to the 'buttonType' prop", () => {
  render(
    <Button aria-label="button" iconType="services" size="large">
      foo
    </Button>,
  );

  const icon = screen.getByTestId("icon");
  expect(icon).toHaveStyle("height: 6px");
});

/* Styling test for coverage */
test("sets the correct dimensions when button is icon only and 'size' is 'small'", () => {
  render(<Button size="small" iconType="bin" />);

  const button = screen.getByRole("button");

  expect(button).toHaveStyle({
    width: "32px",
    minHeight: "32px",
  });
});

/* Styling test for coverage */
test("sets the correct dimensions when button is icon only and 'size' is 'large'", () => {
  render(<Button size="large" iconType="bin" />);

  const button = screen.getByRole("button");

  expect(button).toHaveStyle({
    width: "48px",
    minHeight: "48px",
  });
});

test("sets the 'name' attribute correctly when a custom value is passed to the 'name' prop", () => {
  render(<Button name="foo">bar</Button>);

  const button = screen.getByRole("button", { name: "bar" });

  expect(button).toHaveAttribute("name", "foo");
});

test("sets the 'disabled' attribute correctly when the 'disabled' prop is set to 'true'", () => {
  render(<Button disabled>bar</Button>);

  const button = screen.getByRole("button", { name: "bar" });

  expect(button).toBeDisabled();
});

/* Styling test for coverage */
test("sets the correct styling attributes when the 'destructive' and 'disabled' props are 'true'", () => {
  render(
    <Button destructive disabled>
      foo
    </Button>,
  );

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("color: var(--colorsActionMajorYin030)");
  expect(button).toHaveStyleRule(
    "background-color: var(--colorsActionMajorYin030)",
  );
  expect(button).toHaveStyleRule("background: var(--colorsActionDisabled500)");
});

/* Styling test for coverage */
test("renders with the correct white-space when the 'noWrap' prop is 'true'", () => {
  render(<Button noWrap>foo</Button>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyle("white-space: nowrap");
});

/** Styling tests for `isWhite` prop coverage */
describe("when the `isWhite` prop is passed", () => {
  it("renders a secondary button with white text and a white border", () => {
    render(<Button isWhite>foo</Button>);

    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "var(--colorsActionMajorYang100)");
    expect(button).toHaveStyleRule(
      "border-color",
      "var(--colorsActionMajorYang100)",
    );
  });

  it("renders a disabled secondary button if the `disabled` prop is set", () => {
    render(
      <Button isWhite disabled>
        foo
      </Button>,
    );

    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "#4B4B4B");
    expect(button).toHaveStyleRule("border-color", "#4B4B4B");
  });

  it("renders a destructive secondary button if the `destructive` prop is set", () => {
    render(
      <Button isWhite destructive>
        foo
      </Button>,
    );

    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "var(--colorsSemanticNegative450)");
    expect(button).toHaveStyleRule(
      "border-color",
      "var(--colorsSemanticNegative450)",
    );
  });

  it("renders a disabled secondary button if the `disabled` and `destructive` props are set", () => {
    render(
      <Button isWhite disabled destructive>
        foo
      </Button>,
    );

    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "#4B4B4B");
    expect(button).toHaveStyleRule("border-color", "#4B4B4B");
  });

  it("renders with expected styling if the button type is 'primary'", () => {
    render(
      <Button buttonType="primary" isWhite>
        foo
      </Button>,
    );
    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "var(--colorsActionMajorYang100)");
    expect(button).toHaveStyleRule("background", "var(--colorsActionMajor500)");
    expect(button).toHaveStyleRule("border-color", "transparent");
  });

  it("renders with expected styling if the button type is 'tertiary'", () => {
    render(
      <Button buttonType="tertiary" isWhite>
        foo
      </Button>,
    );
    const button = screen.getByRole("button", { name: "foo" });

    expect(button).toHaveStyleRule("color", "var(--colorsActionMajor500)");
    expect(button).toHaveStyleRule("background", "transparent");
    expect(button).toHaveStyleRule("border-color", "transparent");
  });
});

test("renders an anchor element when a custom value is passed to the 'href' prop", () => {
  render(<Button href="https://www.warnerbros.com/movies/heat">bar</Button>);

  const button = screen.getByRole("link", { name: "bar" });

  expect(button).toBeVisible();
});

test("sets the 'target' attribute correctly when a custom value is passed to the 'target' prop", () => {
  render(
    <Button href="https://www.warnerbros.com/movies/heat" target="_blank">
      bar
    </Button>,
  );

  const button = screen.getByRole("link", { name: "bar" });

  expect(button).toHaveAttribute("target", "_blank");
});

test("sets the 'rel' attribute correctly when a custom value is passed to the 'rel' prop", () => {
  render(
    <Button
      href="https://www.warnerbros.com/movies/heat"
      rel="noopener noreferrer"
    >
      bar
    </Button>,
  );

  const button = screen.getByRole("link", { name: "bar" });

  expect(button).toHaveAttribute("rel", "noopener noreferrer");
});

test("renders a tooltip, populated with a custom value that is passed to the 'iconTooltipMessage' prop", async () => {
  render(<Button iconType="bin" iconTooltipMessage="foo" />);

  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: "bin" });
  await user.hover(button);
  const tooltip = await screen.findByText("foo");

  expect(tooltip).toBeInTheDocument();
});

test("sets the 'id' attribute correctly when a custom value is passed to the 'id' prop", () => {
  render(<Button id="foo">bar</Button>);

  const button = screen.getByRole("button", { name: "bar" });

  expect(button).toHaveAttribute("id", "foo");
});

test("sets the text content of the 'subtext' element when the 'size' prop is 'large' and the 'subtext' prop is passed", () => {
  render(
    <Button size="large" subtext="some context about the foo">
      foo
    </Button>,
  );

  const subtext = screen.getByText("some context about the foo");

  expect(subtext).toBeVisible();
});

test("calls onClick when an 'href' is passed and the space key is pressed", async () => {
  const user = userEvent.setup();
  const clickMock = jest.fn();
  render(
    <Button
      onClick={(ev) => {
        ev.preventDefault();
        clickMock(ev);
      }}
      href="https://www.warnerbros.com/movies/heat"
    >
      bar
    </Button>,
  );

  const button = screen.getByRole("link", { name: "bar" });
  button.focus();
  await user.keyboard(" ");

  expect(clickMock).toHaveBeenCalledTimes(1);
});

test("does not call onClick when a 'href' is passed and any other key is pressed", async () => {
  const user = userEvent.setup();
  const clickMock = jest.fn();
  render(
    <Button
      onClick={(ev) => {
        ev.preventDefault();
        clickMock(ev);
      }}
      href="https://www.warnerbros.com/movies/heat"
    >
      bar
    </Button>,
  );

  const button = screen.getByRole("link", { name: "bar" });
  button.focus();
  await user.keyboard("{ArrowRight}");

  expect(clickMock).not.toHaveBeenCalled();
});

test("accepts ref as a ref object", () => {
  const mockRef = { current: null };
  render(<Button ref={mockRef}>bar</Button>);

  const button = screen.getByRole("button", { name: "bar" });

  expect(mockRef.current).toBe(button);
});

test("accepts ref as a ref callback", () => {
  const mockRef = jest.fn();
  render(<Button ref={mockRef}>bar</Button>);

  const button = screen.getByRole("button", { name: "bar" });

  expect(mockRef).toHaveBeenCalledWith(button);
});

test("sets ref to empty after unmount", () => {
  const mockRef = { current: null };
  const { unmount } = render(<Button>bar</Button>);

  unmount();

  expect(mockRef.current).toBe(null);
});
