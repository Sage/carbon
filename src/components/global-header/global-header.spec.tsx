import React from "react";
import { render, screen } from "@testing-library/react";
import { assertStyleMatch } from "__spec_helper__/test-utils";
import GlobalHeader, { GlobalHeaderProps } from "./global-header.component";

const GLOBAL_HEADER = "global-header";
const LABEL = "Global Header";
const CARBON_LOGO = "Carbon logo";

function renderComponent(props?: GlobalHeaderProps) {
  return render(
    <GlobalHeader data-testid={GLOBAL_HEADER} {...props}>
      foobar
    </GlobalHeader>
  );
}

describe("Global Header", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("should render with correct `data-component` tag", () => {
    expect(screen.getByTestId(GLOBAL_HEADER)).toBeTruthy();
  });

  it("should render with correct `aria-label`", () => {
    expect(screen.getByLabelText(LABEL)).toBeTruthy();
  });

  it("should render with correct styling", () => {
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsComponentsMenuWinterStandard500)",
        color: "var(--colorsComponentsMenuYang100)",
        position: "fixed",
      },
      screen.getByTestId(GLOBAL_HEADER)
    );
  });

  it("should have correct z-index", () => {
    expect(screen.getByTestId(GLOBAL_HEADER)).toHaveStyleRule(
      "z-index",
      "2999"
    );
  });

  describe("when logo prop is passed", () => {
    let logo = <img src="foobar" alt="Carbon logo" />;

    beforeEach(() => {
      renderComponent({ logo });
    });

    it("should render logo wrapper with correct `data-element` tag", async () => {
      const logoElement = await screen.findByAltText(CARBON_LOGO);
      const logoWrapper = logoElement.closest("div");
      expect(logoElement).toBeTruthy();
      expect(logoWrapper?.getAttribute("data-element")).toMatch(
        "global-header-logo-wrapper"
      );
    });

    it("and logo is a svg element, render logo correctly", () => {
      logo = <svg aria-label="Carbon logo" />;
      renderComponent({ logo });
      expect(screen.getByLabelText(CARBON_LOGO)).toBeTruthy();
    });
  });
});
