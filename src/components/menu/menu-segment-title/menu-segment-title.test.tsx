import React from "react";
import { render, screen } from "@testing-library/react";

import MenuSegmentTitle from "./menu-segment-title.component";
import Logger from "../../../__internal__/utils/logger";
import { Menu } from "..";
import menuConfigVariants from "../menu.config";
import MenuFullScreen from "../menu-full-screen";

test("logs error if not used within Menu", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(
    <MenuSegmentTitle text="foo">
      <li>bar</li>
    </MenuSegmentTitle>,
  );

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("renders the `title` as a level 2 heading by default and renders its children in the wrapper", () => {
  render(
    <Menu>
      <MenuSegmentTitle text="Title">
        <li>Item</li>
      </MenuSegmentTitle>
    </Menu>,
  );

  expect(
    screen.getByRole("heading", { level: 2, name: "Title" }),
  ).toBeVisible();
  expect(screen.getByTestId("menu-segment-children")).toContainElement(
    screen.getByText("Item"),
  );
});

test("renders the `title` with the heading level set by the `as` prop", () => {
  render(
    <Menu>
      <MenuSegmentTitle as="h3" text="Title" />
    </Menu>,
  );

  expect(
    screen.getByRole("heading", { level: 3, name: "Title" }),
  ).toBeVisible();
});

test("applies the provided data- attributes to the title", () => {
  render(
    <Menu>
      <MenuSegmentTitle text="Title" data-element="bar" data-role="baz" />
    </Menu>,
  );

  const title = screen.getByRole("heading", { level: 2, name: "Title" });
  expect(title).toHaveAttribute("data-element", "bar");
  expect(title).toHaveAttribute("data-role", "baz");
});

test("applies the provided data- attributes to the segment children wrapper", () => {
  render(
    <Menu>
      <MenuSegmentTitle
        text="Title"
        segmentWrapperProps={{
          "data-role": "segment-children",
          "data-element": "segment-children-element",
        }}
      >
        <li>Item</li>
      </MenuSegmentTitle>
    </Menu>,
  );

  const wrapper = screen.getByTestId("segment-children");
  expect(wrapper).toHaveAttribute("data-element", "segment-children-element");
  expect(wrapper).toContainElement(screen.getByText("Item"));
});

// coverage
test("renders with expected styles when inside a fullscreen menu", () => {
  render(
    <Menu>
      <MenuFullScreen onClose={() => {}} isOpen>
        <MenuSegmentTitle text="Title">
          <li>Item</li>
        </MenuSegmentTitle>
      </MenuFullScreen>
    </Menu>,
  );

  expect(screen.getByRole("heading", { level: 2, name: "Title" })).toHaveStyle({
    backgroundColor: menuConfigVariants.white.background,
  });
});

// coverage
test("renders with expected styles when `variant` is 'alternate'", () => {
  render(
    <Menu>
      <MenuSegmentTitle text="Title" variant="alternate">
        <li>Item</li>
      </MenuSegmentTitle>
    </Menu>,
  );

  expect(screen.getByRole("heading", { level: 2, name: "Title" })).toHaveStyle({
    backgroundColor: menuConfigVariants.white.alternate,
  });
});
