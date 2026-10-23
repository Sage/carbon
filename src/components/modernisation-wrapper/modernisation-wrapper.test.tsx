import React from "react";
import { render, screen } from "@testing-library/react";
import modernisationTokens from "@sage/design-tokens-fusion/json/modernisation.json";
import ModernisationWrapper from ".";

describe.each(["inline", "stylesheet"] as const)(
  "ModernisationWrapper (%s)",
  (injectionMethod) => {
    it("applies package overrides as kebab-case CSS variables on the wrapper", () => {
      render(
        <ModernisationWrapper
          injectionMethod={injectionMethod}
          aria-label="modern"
        >
          Content
        </ModernisationWrapper>,
      );

      const wrapper = screen.getByLabelText("modern");
      expect(wrapper.tagName).toBe("DIV");
      expect(wrapper).toHaveTextContent("Content");
      const expectedTokens = {
        "--page-bg-default": modernisationTokens.pageBgDefault,
        "--nav-primary-bg-default": modernisationTokens.navPrimaryBgDefault,
        "--button-typical-toggle-bg-default":
          modernisationTokens.buttonTypicalToggleBgDefault,
        "--container-standard-border-default":
          modernisationTokens.containerStandardBorderDefault,
      };
      Object.entries(expectedTokens).forEach(([property, value]) => {
        expect(getComputedStyle(wrapper).getPropertyValue(property)).toBe(
          value,
        );
      });
      expect(wrapper).not.toHaveAttribute("injectionMethod");
    });

    it("forwards the div ref, attributes and consumer styles", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ModernisationWrapper
          ref={ref}
          injectionMethod={injectionMethod}
          aria-label="modern"
          className="consumer-class"
          style={{ padding: "12px" }}
        />,
      );

      expect(ref.current).toBe(screen.getByLabelText("modern"));
      expect(ref.current).toHaveClass("consumer-class");
      expect(ref.current).toHaveStyle({ padding: "12px" });
    });

    it("leaves sibling elements without modernisation overrides", () => {
      render(
        <>
          <div aria-label="base" />
          <ModernisationWrapper
            injectionMethod={injectionMethod}
            aria-label="modern"
          />
        </>,
      );

      const base = screen.getByLabelText("base");
      expect(base.style.getPropertyValue("--page-bg-default")).toBe("");
      expect(base).not.toHaveStyleRule("--page-bg-default");
    });
  },
);

it("defaults to inline variables with kebab-case names and unresolved references", () => {
  render(<ModernisationWrapper aria-label="modern" />);

  expect(
    screen.getByLabelText("modern").style.getPropertyValue("--page-bg-default"),
  ).toBe("var(--mode-color-generic-surface-trace)");
});
