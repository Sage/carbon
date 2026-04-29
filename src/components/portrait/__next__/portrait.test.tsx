import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

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
  expect(portrait).toHaveStyle(
    "border-radius: var(--global-radius-container-m);",
  );
});

test("renders with a circle shape, if the `shape` prop is value is `circle`", () => {
  render(<Portrait data-role="portrait" shape="circle" />);

  const portrait = screen.getByTestId("portrait");
  expect(portrait).toHaveAttribute("shape", "circle");
  expect(portrait).toHaveStyle(
    "border-radius: var(--global-radius-container-circle);",
  );
});

test("allows a custom onClick function to be passed via the `onClick` prop", async () => {
  const mockFunction = jest.fn();
  render(<Portrait data-role="portrait" onClick={mockFunction} />);

  const user = userEvent.setup();
  const portrait = screen.getByTestId("portrait");
  await user.click(portrait);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
