import { render, screen } from "@testing-library/react";
import React from "react";
import GlobalHeader, { GlobalHeaderProps } from "./global-header.component";

function renderer(props?: GlobalHeaderProps) {
  return render(<GlobalHeader {...props}>foobar</GlobalHeader>);
}

describe("Global Header", () => {
  it("should be visible with correct accessible name", () => {
    renderer();
    expect(screen.getByRole("navigation")).toHaveAccessibleName(
      "Global Header"
    );
  });

  it("should be visible with correct styling", () => {
    renderer();
    expect(screen.getByRole("navigation")).toHaveStyle({
      backgroundColor: "var(--colorsComponentsMenuWinterStandard500)",
      color: "var(--colorsComponentsMenuYang100)",
      position: "fixed",
    });
  });

  it("should have correct z-index", () => {
    renderer();
    expect(screen.getByRole("navigation")).toHaveStyle("z-index: 2999");
  });

  describe("when logo prop is passed", () => {
    it("and logo is an img element, logo is visible with correct alt text", () => {
      const logo = <img src="foobar" alt="Carbon logo" />;
      renderer({ logo });
      expect(screen.getByAltText("Carbon logo")).toBeInTheDocument();
    });

    it("and logo is a svg element, logo is visible with correct accessible name", () => {
      const logo = <svg aria-label="Carbon logo" data-role="carbon-logo" />;
      renderer({ logo });
      expect(screen.getByTestId("carbon-logo")).toHaveAccessibleName(
        "Carbon logo"
      );
    });
  });
});
