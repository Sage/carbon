import React from "react";
import { render, screen } from "@testing-library/react";
import NextBox from "./next-box.component";

describe("NextBox", () => {
  it("renders without crashing", () => {
    render(<NextBox data-role="next-box" />);
    expect(screen.getByTestId("next-box")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <NextBox>
        <div>Test Child</div>
      </NextBox>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies spacing props", () => {
    render(<NextBox data-role="box" m={8} px="-4px" />);

    expect(screen.getByTestId("box")).toHaveStyle({
      margin: "8px",
      paddingLeft: "-4px",
      paddingRight: "-4px",
    });
  });
});
