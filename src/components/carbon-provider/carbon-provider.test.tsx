import React from "react";
import { render, screen } from "@testing-library/react";
import CarbonProvider from "../carbon-provider";
import Button from "../button";

describe("The CabronProvider component", () => {
  test("renders with aria-hidden false if no ariaHidden prop is specified", () => {
    render(
      <CarbonProvider>
        <Button buttonType="primary">Button</Button>
      </CarbonProvider>
    );

    const button = screen.getByRole("button", {
      name: "Button",
    });

    // eslint-disable-next-line testing-library/no-node-access
    const parent = button.closest("div");

    expect(parent).toHaveAttribute("aria-hidden", "false");
  });

  test("renders with aria-hidden true if ariaHidden prop is specified as true", () => {
    render(
      <CarbonProvider ariaHidden="true">
        <Button buttonType="primary">Button</Button>
      </CarbonProvider>
    );

    const button = screen.getByText("Button");

    // eslint-disable-next-line testing-library/no-node-access
    const parent = button.closest("div");

    expect(parent).toHaveAttribute("aria-hidden", "true");
  });
});
