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

  describe("modeOverride prop", () => {
    it("applies light mode when modeOverride is 'light'", () => {
      render(
        <TokensWrapper modeOverride="light" modeSupportOptIn>
          <div>Light Mode Child</div>
        </TokensWrapper>,
      );

      const wrapper = screen.getByTestId("tokens-wrapper");
      expect(wrapper).toHaveClass("carbon-light-mode");
      expect(wrapper).toHaveAttribute("data-carbon-theme", "light");
    });

    it("applies dark mode when modeOverride is 'dark'", () => {
      render(
        <TokensWrapper modeOverride="dark" modeSupportOptIn>
          <div>Dark Mode Child</div>
        </TokensWrapper>,
      );

      const wrapper = screen.getByTestId("tokens-wrapper");
      expect(wrapper).toHaveClass("carbon-dark-mode");
      expect(wrapper).toHaveAttribute("data-carbon-theme", "dark");
    });

    it("applies mode classes when modeOverride is 'auto'", () => {
      render(
        <TokensWrapper modeOverride="auto" modeSupportOptIn>
          <div>Auto Mode Child</div>
        </TokensWrapper>,
      );

      const wrapper = screen.getByTestId("tokens-wrapper");
      expect(wrapper).toHaveClass("carbon-light-mode");
      expect(wrapper).not.toHaveClass("carbon-dark-mode");
      expect(wrapper).toHaveAttribute("data-carbon-theme", "light");
    });

    it("does not apply any mode classes when modeSupportOptIn is false", () => {
      render(
        <TokensWrapper modeOverride="light" modeSupportOptIn={false}>
          <div>No Mode Child</div>
        </TokensWrapper>,
      );

      const wrapper = screen.getByTestId("tokens-wrapper");
      expect(wrapper).not.toHaveClass("carbon-light-mode");
      expect(wrapper).not.toHaveClass("carbon-dark-mode");
      expect(wrapper).not.toHaveAttribute("data-carbon-theme");
    });
  });

  it("does not set the data-tokens-wrapper-id attribute when overrides are not provided", () => {
    render(
      <TokensWrapper>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    expect(screen.getByTestId("tokens-wrapper")).not.toHaveAttribute(
      "data-tokens-wrapper-id",
    );
  });

  it("sets the data-tokens-wrapper-id attribute when overrides are provided", () => {
    render(
      <TokensWrapper overrides={{ light: { primaryBrand: "#000000" } }}>
        <div>Test Child</div>
      </TokensWrapper>,
    );

    const wrapper = screen.getByTestId("tokens-wrapper");
    expect(wrapper).toHaveAttribute("data-tokens-wrapper-id");
  });
});
