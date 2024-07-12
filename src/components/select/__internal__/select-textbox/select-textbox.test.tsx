import React from "react";
import { render, screen } from "@testing-library/react";
import SelectTextbox from ".";

describe("when hasTextCursor prop is false", () => {
  it("renders formattedValue in an overlay instead of the combobox", () => {
    render(
      <SelectTextbox
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foo");
    expect(screen.getByText("foo")).toBeInTheDocument();
  });

  it("displays the placeholder text in an overlay when the combobox has no value", () => {
    render(
      <SelectTextbox
        placeholder="foobaz"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("combobox")).not.toHaveTextContent("foobaz");
    expect(screen.getByText("foobaz")).toBeInTheDocument();
  });

  it("hides the combobox overlay from assistive technologies", () => {
    render(
      <SelectTextbox
        formattedValue="You can't see me"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("truncates the displayed text of the selected option with ellipsis", () => {
    render(
      <SelectTextbox
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("foo")).toHaveStyle({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
  });

  it("applies correct styles when disabled", () => {
    render(
      <SelectTextbox
        disabled
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "not-allowed",
      color: "var(--colorsUtilityYin030)",
      textShadow: "none",
    });
  });

  it("applies correct styles when read-only", () => {
    render(
      <SelectTextbox
        readOnly
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      cursor: "default",
      color: "var(--colorsUtilityYin065)",
      textShadow: "none",
    });
  });

  it("applies correct styles when transparent", () => {
    render(
      <SelectTextbox
        transparent
        formattedValue="foo"
        hasTextCursor={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId("select-text")).toHaveStyle({
      textAlign: "right",
      fontWeight: "900",
    });
  });
});
