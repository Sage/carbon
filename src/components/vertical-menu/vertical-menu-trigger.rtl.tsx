import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import { VerticalMenuTrigger } from ".";
import { testStyledSystemPadding } from "../../__spec_helper__/test-utils";
import { StyledVerticalMenuItem } from "./vertical-menu.style";

describe("VerticalMenuTrigger", () => {
  testStyledSystemPadding(
    (props) => (
      <ThemeProvider theme={mintTheme}>
        <VerticalMenuTrigger {...props} onClick={() => {}}>
          Open menu
        </VerticalMenuTrigger>
      </ThemeProvider>
    ),
    undefined,
    (component) => component.find(StyledVerticalMenuItem)
  );

  it("should render proper height when height prop is passed", () => {
    render(
      <VerticalMenuTrigger height="100px" onClick={() => {}}>
        Open menu
      </VerticalMenuTrigger>
    );
    expect(screen.getByRole("button")).toHaveStyle({
      minHeight: "100px",
    });
  });

  it("should invoke onClick callback when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <VerticalMenuTrigger onClick={onClick}>Open menu</VerticalMenuTrigger>
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
      </VerticalMenuTrigger>
    );

    const trigger = screen.getByRole("button");

    expect(trigger.getAttribute("data-component")).toEqual(
      "vertical-menu-trigger"
    );
    expect(trigger.getAttribute("data-element")).toEqual("foo");
    expect(trigger.getAttribute("data-role")).toEqual("bar");
  });
});
