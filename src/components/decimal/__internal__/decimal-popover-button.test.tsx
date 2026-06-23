import React from "react";
import { render, screen } from "@testing-library/react";
import DecimalPopoverButton from "./decimal-popover-button.component";

describe("DecimalPopoverButton", () => {
  it("focuses the underlying button when focus() is called on the ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <DecimalPopoverButton
        ref={ref}
        aria-label="decimal popover trigger"
        aria-haspopup={"dialog"}
        aria-expanded={false}
        onClick={() => {}}
      />,
    );

    ref.current?.focus();

    expect(
      screen.getByRole("button", { name: "decimal popover trigger" }),
    ).toHaveFocus();
  });
});
