import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MD5 from "crypto-js/md5";
import Logger from "../../__internal__/utils/logger";
import Portrait from ".";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";
import CarbonProvider from "../carbon-provider";

testStyledSystemMarginRTL(
  (props) => <Portrait data-role="portrait-wrapper" {...props} />,
  () => screen.getByTestId("portrait-wrapper"),
);

test("renders with a default individual icon", () => {
  render(<Portrait />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveAttribute("type", "individual");
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

test("renders with a gravatar image, if a valid email is passed via the `gravatar` prop", () => {
  const email = "chris.barber@sage.com";
  const hash = MD5(email);
  const src = `https://www.gravatar.com/avatar/${hash}?s=40&d=404`;

  render(<Portrait gravatar={email} />);

  const img = screen.getByRole("img");
  expect(img).toBeVisible();
  expect(img).toHaveAttribute("src", src);
});

test("logs a deprecation warning once when the `gravatar` prop is passed, and a gravatar loads", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(
    <>
      <Portrait gravatar="chris.barber@sage.com" />
      <Portrait gravatar="chris.barber@sage.com" />
    </>,
  );

  const portraits = screen.getAllByRole("img");

  portraits.forEach((portrait) => {
    fireEvent.load(portrait);
  });

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `gravatar` prop has been deprecated and will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockRestore();
});

test("if a valid gravatar email is not found and an onError event is triggered, the default individual icon is rendered", async () => {
  const email = "invalid.email@1973";
  const hash = MD5(email);
  const src = `https://www.gravatar.com/avatar/${hash}?s=40&d=404`;
  render(<Portrait gravatar={email} />);

  const img = screen.getByRole("img");
  expect(img).toBeVisible();
  expect(img).toHaveAttribute("src", src);

  fireEvent.error(img);

  await waitFor(() => expect(screen.getByTestId("icon")).toBeVisible());
  await waitFor(() =>
    expect(screen.getByTestId("icon")).toHaveAttribute("type", "individual"),
  );
});

test("renders with a custom image, if a valid src is passed via the `src` prop", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Portrait src={src} />);

  const img = screen.getByRole("img");
  expect(img).toBeVisible();
  expect(img).toHaveAttribute("src", src);
});

test("if a valid src is not found and an onError event is triggered, the default individual icon is rendered", async () => {
  const src = "not-a-url";
  render(<Portrait src={src} />);

  const img = screen.getByRole("img");
  expect(img).toBeVisible();
  expect(img).toHaveAttribute("src", src);

  fireEvent.error(img);

  await waitFor(() => expect(screen.getByTestId("icon")).toBeVisible());
  await waitFor(() =>
    expect(screen.getByTestId("icon")).toHaveAttribute("type", "individual"),
  );
});

test("when both the `gravatar` and `src` props are passed simultaneously, an invariant violation is thrown", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  const email = "chris.barber@sage.com";

  expect(() => render(<Portrait src={src} gravatar={email} />)).toThrow(
    "The `src` prop cannot be used in conjunction with the `gravatar` prop." +
      " Please use one or the other.",
  );

  consoleSpy.mockRestore();
});

test("allows the alt attribute to be set, via the `alt` prop", () => {
  const src = "https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg";
  render(<Portrait src={src} alt="custom-alt" />);

  const alt = screen.getByAltText("custom-alt");
  expect(alt).toBeVisible();
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

test("if a consumer opts out to rounded corners, the `Portrait` shape is a square", () => {
  render(
    <CarbonProvider roundedCornersOptOut>
      <Portrait data-role="portrait" />
    </CarbonProvider>,
  );

  const portrait = screen.getByTestId("portrait");
  expect(portrait).toHaveAttribute("shape", "square");
  expect(portrait).toHaveStyle("border-radius: 0px");
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
