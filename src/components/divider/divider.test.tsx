import React from "react";
import { render, screen } from "@testing-library/react";
import {
  mockMatchMedia,
  testStyledSystemSpacing,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";

import { Menu } from "../menu";
import Divider from ".";

testStyledSystemSpacing(
  (props) => <Divider {...props} />,
  () => screen.getByTestId("divider"),
);

testStyledSystemMargin(
  (props) => <Divider type="horizontal" {...props} />,
  () => screen.getByTestId("divider"),
);

describe("When type is set to 'vertical'", () => {
  test("should render with the default padding when no padding props are passed", () => {
    render(<Divider />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyleRule("padding", "var(--spacing300)");
  });

  test("should apply the expected height when `height` prop is passed a value of `100`", () => {
    render(<Divider height={200} />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyle("height: 200px");
  });

  test("should apply the expected height when `height` prop is passed a string value", () => {
    render(<Divider height="100px" />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyle("height: 100px");
  });

  test("should apply the expected height when `h` prop is passed a value of `100`", () => {
    render(<Divider h={200} />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyle("height: 200px");
  });

  test("should apply the expected height when `h` prop is passed a string value", () => {
    render(<Divider h="100px" />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyle("height: 100px");
  });

  test("should apply the expected styling when `displayInline` prop is true", () => {
    render(<Divider displayInline />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveStyle("display: inline");
  });

  test("should not apply the styling when `displayInline` prop is false", () => {
    render(<Divider />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).not.toHaveStyle("display: inline");
  });

  test("should render as an `li` element with `aria-hidden` when inside a Menu", () => {
    render(
      <Menu>
        <Divider />
      </Menu>,
    );
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement.tagName).toEqual("LI");
    expect(dividerElement).toHaveAttribute("aria-hidden", "true");
  });

  test("should allow the `aria-hidden` attribute to be set when not in a menu", () => {
    render(<Divider aria-hidden />);
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveAttribute("aria-hidden", "true");
  });

  test("should not allow the `aria-hidden` attribute to be overridden when in a menu", () => {
    render(
      <Menu>
        <Divider aria-hidden={false} />
      </Menu>,
    );
    const dividerElement = screen.getByTestId("divider");

    expect(dividerElement).toHaveAttribute("aria-hidden", "true");
  });

  test("should render with provided data- attributes", () => {
    render(<Divider data-role="bar" data-element="baz" />);

    expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "baz");
  });

  test("should render the 'typical' variant with the corect color", () => {
    render(<Divider h={200} variant="typical" inverse={false} />);
    const dividerContentElement = screen.getByTestId("divider-content");

    expect(dividerContentElement).toHaveStyleRule(
      "border-left",
      "1px solid #A0A0A0",
    );
  });

  test("should render the 'typical' variant with the corect color when the 'inverse' prop is set", () => {
    render(<Divider h={200} variant="typical" inverse />);
    const dividerContentElement = screen.getByTestId("divider-content");

    expect(dividerContentElement).toHaveStyleRule(
      "border-left",
      "1px solid #505050",
    );
  });

  test("should render the 'prominent' variant with the corect color", () => {
    render(<Divider h={200} variant="prominent" inverse={false} />);
    const dividerContentElement = screen.getByTestId("divider-content");

    expect(dividerContentElement).toHaveStyleRule(
      "border-left",
      "1px solid #7C7C7C",
    );
  });

  test("should render the 'prominent' variant with the corect color when the 'inverse' prop is set", () => {
    render(<Divider h={200} variant="prominent" inverse />);
    const dividerContentElement = screen.getByTestId("divider-content");

    expect(dividerContentElement).toHaveStyleRule(
      "border-left",
      "1px solid #6F6F6F",
    );
  });
});

describe("When type is set to 'horizontal'", () => {
  test("should render with default margin when no margin props are passed", () => {
    render(<Divider type="horizontal" />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyleRule("margin-top", "var(--spacing300)");
    expect(hr).toHaveStyleRule("margin-bottom", "var(--spacing300)");
  });

  test("should render with the correct background-color when the 'inverse' prop is set", () => {
    render(<Divider type="horizontal" inverse />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyleRule("background-color", "#505050");
  });

  test("should apply the expected margin top", () => {
    render(<Divider type="horizontal" mt={7} />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyleRule("margin-top", "var(--spacing700)");
  });

  test("should apply the expected margin bottom", () => {
    render(<Divider type="horizontal" mb={7} />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyleRule("margin-bottom", "var(--spacing700)");
  });

  test("should apply the expected margin left", () => {
    render(<Divider type="horizontal" ml="100px" />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyle({ marginLeft: "100px" });
  });

  test("should apply the expected margin right", () => {
    render(<Divider type="horizontal" mr="100px" />);
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyle({ marginRight: "100px" });
  });

  test("when adaptiveMxBreakpoint prop is set and when screen bigger than breakpoint it should pass the correct margin styles", () => {
    mockMatchMedia(true);
    render(
      <Divider
        type="horizontal"
        ml="10%"
        mr="20%"
        adaptiveMxBreakpoint={1000}
      />,
    );
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyle({ marginLeft: "10%", marginRight: "20%" });
  });

  test("when adaptiveMxBreakpoint prop is set and when screen smaller than breakpoint it should pass the correct margin styles", () => {
    mockMatchMedia(false);
    render(
      <Divider
        type="horizontal"
        ml="10%"
        mr="20%"
        adaptiveMxBreakpoint={1000}
      />,
    );
    const hr = screen.getByTestId("divider");

    expect(hr).toHaveStyleRule("margin-left", "var(--spacing000)");
    expect(hr).toHaveStyleRule("margin-right", "var(--spacing000)");
  });

  test("should apply the 'aria-hidden' attribute when the `aria-hidden` prop is true", () => {
    render(<Divider type="horizontal" data-role="hr" aria-hidden={true} />);
    const hr = screen.getByTestId("hr");

    expect(hr).toHaveAttribute("aria-hidden", "true");
  });
});
