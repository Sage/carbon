import React from "react";
import { render, screen } from "@testing-library/react";
import {
  testStyledSystemMargin,
  testStyledSystemLayout,
  testStyledSystemBackground,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";
import Image from "./image.component";

testStyledSystemMargin(
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
testStyledSystemPadding(
  (props) => <Image data-role="image" {...props} />,
  () => screen.getByTestId("image"),
);

test("renders", () => {
  render(<Image data-role="image" />);

  expect(screen.getByTestId("image")).toBeVisible();
});

test("renders with provided data- attributes", () => {
  render(<Image data-role="foo" data-element="bar" />);

  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
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

test("sets an empty 'alt' attribute when the 'decorative' prop is true", () => {
  render(
    <Image
      data-role="image"
      src="https://upload.wikimedia.org/wikipedia/en/6/6c/Heatposter.jpg"
      decorative
    />,
  );

  expect(screen.getByTestId("image")).toHaveAttribute("alt", "");
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
