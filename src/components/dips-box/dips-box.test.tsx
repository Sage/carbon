import React from "react";
import { render, screen } from "@testing-library/react";
import {
  testStyledFlexBox,
  testStyledLayout,
  testStyledMargin,
  testStyledPadding,
} from "../../__spec_helper__/__internal__/test-utils";
import DipsBox from "./dips-box.component";
import CarbonProvider from "../carbon-provider";

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
    (props) => (
      <CarbonProvider>
        <DipsBox data-role="box" {...props} />
      </CarbonProvider>
    ),
    () => screen.getByTestId("box"),
  );

  testStyledMargin(
    (props) => (
      <CarbonProvider>
        <DipsBox data-role="box" {...props} />
      </CarbonProvider>
    ),
    () => screen.getByTestId("box"),
  );

  testStyledFlexBox(
    (props) => (
      <CarbonProvider>
        <DipsBox data-role="box" {...props} />
      </CarbonProvider>
    ),
    () => screen.getByTestId("box"),
  );

  // Layout props are not fully supported so only test those that are.
  testStyledLayout(
    (props) => (
      <CarbonProvider>
        <DipsBox data-role="box" {...props} />
      </CarbonProvider>
    ),
    () => screen.getByTestId("box"),
  );
});
