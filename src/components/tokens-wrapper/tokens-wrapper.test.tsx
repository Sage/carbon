import React from "react";

import { render, screen } from "@testing-library/react";
import TokensWrapper from "./tokens-wrapper.component";

describe("TokensWrapper", () => {
  it("renders children correctly", () => {
    render(
      <TokensWrapper>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies the tokens correctly", () => {
    render(
      <TokensWrapper>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByTestId("tokens-wrapper")).toMatchSnapshot();
  });

  it("has correct default height", () => {
    render(
      <TokensWrapper>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByTestId("tokens-wrapper")).toHaveStyle("height: auto");
  });

  it("sets height correctly when prop is provided", () => {
    render(
      <TokensWrapper height="100px">
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByTestId("tokens-wrapper")).toHaveStyle("height: 100px");
  });
});
