import React from "react";
import { render, screen } from "@testing-library/react";
import {
  testStyledMargin,
  testStyledPadding,
} from "__spec_helper__/__internal__/test-utils";
import DipsBox from "./dips-box.component";

describe("DipsBox", () => {
  it("renders without crashing", () => {
    render(<DipsBox data-role="dips-box" />);
    expect(screen.getByTestId("dips-box")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <DipsBox>
        <div>Test Child</div>
      </DipsBox>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  testStyledPadding(
    (props) => <DipsBox data-role="box" {...props} />,
    () => screen.getByTestId("box"),
  );

  testStyledMargin(
    (props) => <DipsBox data-role="box" {...props} />,
    () => screen.getByTestId("box"),
  );
});
