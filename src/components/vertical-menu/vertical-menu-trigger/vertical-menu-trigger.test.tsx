import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";

import sageTheme from "../../../style/themes/sage";
import { VerticalMenuTrigger } from "..";
import { testStyledSystemPaddingRTL } from "../../../__spec_helper__/__internal__/test-utils";

describe("VerticalMenuTrigger", () => {
  testStyledSystemPaddingRTL(
    (props) => (
      <ThemeProvider theme={sageTheme}>
        <VerticalMenuTrigger {...props} onClick={() => {}}>
          Open menu
        </VerticalMenuTrigger>
      </ThemeProvider>
    ),
    () => screen.getByRole("button"),
  );

  it("should render proper height when height prop is passed", () => {
    render(
      <VerticalMenuTrigger height="100px" onClick={() => {}}>
        Open menu
      </VerticalMenuTrigger>,
    );
    expect(screen.getByRole("button")).toHaveStyle({
      minHeight: "100px",
    });
  });

  it("should invoke onClick callback when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <VerticalMenuTrigger onClick={onClick}>Open menu</VerticalMenuTrigger>,
    );

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should have the expected data attributes", () => {
    render(
      <VerticalMenuTrigger
        data-element="foo"
        data-role="bar"
        onClick={() => {}}
      >
        Open Menu
      </VerticalMenuTrigger>,
    );

    const trigger = screen.getByRole("button");

    expect(trigger).toHaveAttribute("data-component", "vertical-menu-trigger");
    expect(trigger).toHaveAttribute("data-element", "foo");
    expect(trigger).toHaveAttribute("data-role", "bar");
  });
});
