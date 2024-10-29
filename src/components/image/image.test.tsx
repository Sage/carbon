import React from "react";
import { render, screen } from "@testing-library/react";
import {
  testStyledSystemMarginRTL,
  testStyledSystemLayout,
  testStyledSystemBackground,
  testStyledSystemPaddingRTL,
} from "../../__spec_helper__/__internal__/test-utils";
import Image from "./image.component";

testStyledSystemMarginRTL(
  (props) => <Image data-role="image" {...props} />,
  () => screen.getByTestId("image"),
);
testStyledSystemLayout(
  (props) => <Image data-role="image" {...props} />,
  () => screen.getByTestId("image"),
);
testStyledSystemBackground(
  (props) => <Image data-role="image" {...props} />,
  () => screen.getByTestId("image"),
);
testStyledSystemPaddingRTL(
  (props) => <Image data-role="image" {...props} />,
  () => screen.getByTestId("image"),
);

test("renders", () => {
  render(<Image data-role="image" />);

  expect(screen.getByTestId("image")).toBeVisible();
});

test("renders with the 'src' prop", () => {
  render(
    <Image
      data-role="image"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
      alt="Heat poster"
    />,
  );

  expect(screen.getByRole("img")).toBeVisible();
});

test("renders with the 'src' and 'decorative' props", () => {
  render(
    <Image
      data-role="image"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
      alt=""
      decorative
    />,
  );

  expect(screen.getByRole("img")).toBeVisible();
});

test("renders with children", () => {
  render(<Image>Children</Image>);

  const children = screen.getByText("Children");
  expect(children).toBeVisible();
});

test("does not render, as an invariant is fired due to children being passed as well as the 'src' prop", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
        alt="Heat poster"
      >
        Children
      </Image>,
    ),
  ).toThrow(
    "The 'Image' component renders as an 'img' element when the 'src' prop is used and therefore does not accept children.",
  );

  consoleSpy.mockRestore();
});

test("does not render, as an invariant is fired due to the 'src' prop being passed without an 'alt' prop", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <Image src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg" />,
    ),
  ).toThrow(
    "Please use the 'decorative' prop if the 'alt' text should be an empty value or provide an 'alt' string when rendering the 'Image' component as an 'img' element.",
  );

  consoleSpy.mockRestore();
});

test("does not render, as an invariant is fired due to the 'src' prop being passed and an empty string being passed to the 'alt' prop (the decorative prop must be passed)", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
        alt=""
      />,
    ),
  ).toThrow(
    "Please use the 'decorative' prop if the 'alt' text should be an empty value or provide an 'alt' string when rendering the 'Image' component as an 'img' element.",
  );

  consoleSpy.mockRestore();
});

test("sets the 'alt' attribute correctly when a custom value is passed to the 'alt' prop", () => {
  render(
    <Image
      data-role="image"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
      alt="Heat poster"
    />,
  );

  expect(screen.getByRole("img")).toHaveAccessibleName("Heat poster");
});

test("sets the 'hidden' attribute correctly when the 'hidden' prop is true", () => {
  render(
    <Image
      data-role="image"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
      alt="Heat poster"
      hidden
    />,
  );

  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
