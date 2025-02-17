import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

import Portrait from ".";

testStyledSystemMargin(
  (props) => <Portrait data-role="portrait-wrapper" {...props} />,
  () => screen.getByTestId("portrait-wrapper"),
);

test("renders with provided data- attributes", () => {
  render(<Portrait data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});

test("renders with a default individual icon", () => {
  render(<Portrait />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "individual");
});

test("renders with a dark background", () => {
  render(<Portrait data-role="portrait" darkBackground />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "individual");

  const container = screen.getByTestId("portrait");
  expect(container).toHaveStyle("background-color: var(--colorsUtilityYin090)");
  expect(container).toHaveStyleRule("color", "var(--colorsUtilityReadOnly600)");
});

test("renders with a custom icon, if a valid icon is provided via the `iconType` prop", () => {
  render(<Portrait iconType="bin" />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "bin");
});

test("renders with initials, if the `initials` prop is provided", () => {
  render(<Portrait initials="NM" />);

  expect(screen.getByText("NM")).toBeVisible();
});

test("renders a custom image with the correct src and alt attributes", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Portrait src={src} alt="Movie poster of Heat" />);

  const image = screen.getByAltText("Movie poster of Heat");
  expect(image).toHaveAttribute("src", src);
});

test("renders a decorative image, when src prop is provided but alt is not", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Portrait src={src} />);

  const decorativeImg = screen.getByAltText("");
  expect(decorativeImg).toBeVisible();
});

test("if a valid src is not found and an onError event is triggered, the default individual icon is rendered", async () => {
  const src = "not-a-url";
  render(<Portrait src={src} alt="foobar" />);

  const image = screen.getByAltText("foobar");
  expect(image).toBeVisible();
  expect(image).toHaveAttribute("src", src);

  fireEvent.error(image);

  await waitFor(() => expect(screen.getByTestId("icon")).toBeVisible());
  await waitFor(() =>
    expect(screen.getByTestId("icon")).toHaveAttribute("type", "individual"),
  );
});

test("renders with a square shape, if the `shape` prop is value is `square`", () => {
  render(<Portrait data-role="portrait" shape="square" />);

  const portrait = screen.getByTestId("portrait");
  expect(portrait).toHaveAttribute("shape", "square");
  expect(portrait).toHaveStyle("border-radius: 0px");
});

test("renders with a circle shape, if the `shape` prop is value is `circle`", () => {
  render(<Portrait data-role="portrait" shape="circle" />);

  const portrait = screen.getByTestId("portrait");
  expect(portrait).toHaveAttribute("shape", "circle");
  expect(portrait).toHaveStyle("border-radius: var(--borderRadiusCircle)");
});

test("renders a tooltip, populated with a custom value that is passed to the 'tooltipMessage' prop", async () => {
  render(<Portrait data-role="portrait" tooltipMessage="foo" />);

  const user = userEvent.setup();
  const portrait = screen.getByTestId("portrait");
  await user.hover(portrait);
  const tooltip = await screen.findByText("foo");

  expect(tooltip).toBeVisible();
});

test("allows a tooltip to be shown via the `tooltipIsVisible` prop", () => {
  render(<Portrait tooltipMessage="foo" tooltipIsVisible />);

  const tooltip = screen.getByText("foo");
  expect(tooltip).toBeVisible();
});

test("allows a custom tooltip id to be set via the `tooltipId` prop", () => {
  render(
    <Portrait
      data-role="portrait"
      tooltipMessage="foo"
      tooltipIsVisible
      tooltipId="foo"
    />,
  );

  const tooltip = screen.getByText("foo");
  expect(tooltip).toHaveAttribute("id", "foo");
});

test("allows a custom onClick function to be passed via the `onClick` prop", async () => {
  const mockFunction = jest.fn();
  render(<Portrait data-role="portrait" onClick={mockFunction} />);

  const user = userEvent.setup();
  const portrait = screen.getByTestId("portrait");
  await user.click(portrait);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

describe("custom background colours", () => {
  it("renders with the correct colours when a dark colour is provided", () => {
    render(<Portrait data-role="portrait" backgroundColor="#000000" />);

    const icon = screen.getByTestId("icon");
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "individual");

    const container = screen.getByTestId("portrait");
    expect(container).toHaveStyle("background-color: #000000");
    expect(container).toHaveStyleRule("color", "#FFFFFF");
  });

  it("renders with the correct colours when a light colour is provided", () => {
    render(<Portrait data-role="portrait" backgroundColor="#FFFFFF" />);

    const icon = screen.getByTestId("icon");
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "individual");

    const container = screen.getByTestId("portrait");
    expect(container).toHaveStyle("background-color: #FFFFFF");
    expect(container).toHaveStyleRule("color", "var(--colorsUtilityYin090)");
  });

  [
    { value: "#A3CAF0", label: "blue" },
    { value: "#FD9BA3", label: "pink" },
    { value: "#B4AEEA", label: "purple" },
    { value: "#ECE6AF", label: "goldenrod" },
    { value: "#EBAEDE", label: "orchid" },
    { value: "#EBC7AE", label: "desert" },
    { value: "#AEECEB", label: "turquoise" },
    { value: "#AEECD6", label: "mint" },
  ].forEach(({ value, label }) => {
    it(`renders with the correct colours when the background colour is set to ${label}`, () => {
      render(<Portrait data-role="portrait" backgroundColor={value} />);

      const icon = screen.getByTestId("icon");
      expect(icon).toBeVisible();
      expect(icon).toHaveAttribute("type", "individual");

      const container = screen.getByTestId("portrait");
      expect(container).toHaveStyle(`background-color: ${value}`);
    });
  });

  [
    { value: "#A3CAF0", label: "blue" },
    { value: "#FD9BA3", label: "pink" },
    { value: "#B4AEEA", label: "purple" },
    { value: "#ECE6AF", label: "goldenrod" },
    { value: "#EBAEDE", label: "orchid" },
    { value: "#EBC7AE", label: "desert" },
    { value: "#AEECEB", label: "turquoise" },
    { value: "#AEECD6", label: "mint" },
  ].forEach(({ value, label }) => {
    it(`renders with the correct colours when the foreground colour is set to ${label}`, () => {
      render(<Portrait data-role="portrait" foregroundColor={value} />);

      const icon = screen.getByTestId("icon");
      expect(icon).toBeVisible();
      expect(icon).toHaveAttribute("type", "individual");

      const container = screen.getByTestId("portrait");
      expect(container).toHaveStyle(`color: ${value}`);
    });
  });

  it("renders with the correct foreground colour when provided in conjunction with a background colour", () => {
    render(
      <Portrait
        data-role="portrait"
        backgroundColor="#000000"
        foregroundColor="#A0FFAF"
      />,
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "individual");

    const container = screen.getByTestId("portrait");
    expect(container).toHaveStyle("background-color: #000000");
    expect(container).toHaveStyleRule("color", "#A0FFAF");
  });

  it("overrides the colours set by the `darkBackground` prop if the custom colour props are set", () => {
    render(
      <Portrait
        data-role="portrait"
        darkBackground
        backgroundColor="#000000"
        foregroundColor="#A0FFAF"
      />,
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "individual");

    const container = screen.getByTestId("portrait");
    expect(container).toHaveStyle("background-color: #000000");
    expect(container).toHaveStyleRule("color", "#A0FFAF");
  });

  it("supports design tokens being used for the `backgroundColor` and `forefroundColor` props", () => {
    render(
      <Portrait
        data-role="portrait"
        darkBackground
        backgroundColor="var(--colorsUtilityYin090)"
        foregroundColor="var(--colorsLogo)"
      />,
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("type", "individual");

    const container = screen.getByTestId("portrait");
    expect(container).toHaveStyle(
      "background-color: var(--colorsUtilityYin090)",
    );
    expect(container).toHaveStyleRule("color", "var(--colorsLogo)");
  });
});
