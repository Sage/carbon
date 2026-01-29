import React from "react";
import { render, screen } from "@testing-library/react";
import styled from "styled-components";

import TokensWrapper from "./tokens-wrapper.component";
import Portal from "../portal";

const PortalChild = styled.div`
  background-color: var(--badge-bg-default);
`;

describe("TokensWrapper", () => {
  it("renders children correctly", () => {
    render(
      <TokensWrapper>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
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

  it("provides tokens in scope of Portals", () => {
    render(
      <TokensWrapper>
        <Portal>
          <PortalChild>Portal Child</PortalChild>
        </Portal>
      </TokensWrapper>,
    );

    expect(screen.getByText("Portal Child")).toHaveStyleRule(
      "background-color",
      "var(--badge-bg-default)",
    );
  });
});
