import React from "react";
import TestRenderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";

import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../../__spec_helper__/test-utils";
import Loader from "../../loader/loader.component";
import SwitchSlider, { SwitchSliderProps } from "./switch-slider.component";
import SwitchSliderPanel from "./switch-slider-panel.style";
import { ThemeObject } from "../../../style/themes/base";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import StyledSwitchSlider from "./switch-slider.style";

function render(props?: Partial<SwitchSliderProps>) {
  return TestRenderer.create(<SwitchSlider {...props} />);
}

function renderWithTheme(
  props: Partial<SwitchSliderProps>,
  theme?: string | Partial<ThemeObject>,
  renderer = TestRenderer.create
) {
  return renderer(
    <ThemeProvider theme={theme}>
      <SwitchSlider {...props} />
    </ThemeProvider>
  );
}

describe("SwitchSlider", () => {
  describe("base theme", () => {
    it("renders as expected", () => {
      expect(render()).toMatchSnapshot();
    });

    describe("Panel content", () => {
      describe("default", () => {
        const panels = render().root.findAllByType(SwitchSliderPanel);

        it('renders the text "OFF" in the panel', () => {
          expect(panels[0].props.children).toBe("OFF");
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });

      describe("when checked=true", () => {
        const panels = render({ checked: true }).root.findAllByType(
          SwitchSliderPanel
        );

        it('renders the text "ON" in the panel', () => {
          expect(panels[0].props.children).toBe("ON");
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });

      describe("when loading=true", () => {
        const panels = render({ loading: true }).root.findAllByType(
          SwitchSliderPanel
        );

        it("renders a Loader in the first panel", () => {
          expect(panels[0].props.children.type).toBe(Loader);
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });
    });

    describe("when checked=true", () => {
      const wrapper = render({ checked: true }).toJSON();

      it("applies the correct base styles", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsActionMinor500)",
          },
          wrapper
        );
      });

      it("applies the correct ::before styles", () => {
        assertStyleMatch(
          {
            transform: "translateX(36px)",
          },
          wrapper,
          { modifier: "::before" }
        );
      });
    });

    describe("when disabled=true", () => {
      const wrapper = render({ disabled: true }).toJSON();

      it("applies the correct base styles", () => {
        assertStyleMatch(
          {
            borderColor: "var(--colorsActionDisabled600)",
          },
          wrapper
        );
      });

      it("applies the correct ::before styles", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsActionDisabled600)",
          },
          wrapper,
          { modifier: "::before" }
        );
      });

      it("applies the correct SwitchSliderPanel styles", () => {
        assertStyleMatch(
          {
            color: "var(--colorsUtilityYin030)",
          },
          wrapper,
          {
            modifier: `${SwitchSliderPanel}`,
          }
        );
      });
    });

    describe("when checked=true && disabled=true", () => {
      const wrapper = render({ checked: true, disabled: true }).toJSON();

      it("applies the correct SwitchSliderPanel styles", () => {
        assertStyleMatch(
          {
            color: "var(--colorsUtilityYin030)",
          },
          wrapper,
          {
            modifier: `${SwitchSliderPanel}`,
          }
        );
      });
    });

    describe("when size=large", () => {
      describe("default", () => {
        const wrapper = render({ size: "large" }).toJSON();

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              height: "32px",
              width: "32px",
            },
            wrapper,
            { modifier: "::before" }
          );
        });
      });

      describe("and checked=true", () => {
        const wrapper = render({ checked: true, size: "large" }).toJSON();

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              transform: "translateX(38px)",
            },
            wrapper,
            { modifier: "::before" }
          );
        });
      });
    });
  });

  describe.each(carbonThemesJestTable)(
    "when the theme is set to %s",
    (themeName, theme) => {
      describe("default", () => {
        const wrapper = renderWithTheme({}, theme).toJSON();

        it("applies the correct base styles", () => {
          assertStyleMatch(
            {
              borderColor: "var(--colorsActionMinor400)",
            },
            wrapper
          );
        });

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsActionMinor400)",
            },
            wrapper,
            { modifier: "::before" }
          );
        });
      });

      describe("and checked=true", () => {
        const wrapper = renderWithTheme({ checked: true }, theme).toJSON();

        it("applies the correct base styles", () => {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsActionMinor500)",
            },
            wrapper
          );
        });
      });

      describe("and disabled=true", () => {
        const wrapper = renderWithTheme({ disabled: true }, theme).toJSON();

        it("applies the correct base styles", () => {
          assertStyleMatch(
            {
              borderColor: "var(--colorsActionDisabled600)",
            },
            wrapper
          );
        });

        it("applies the correct SwitchSliderPanel styles", () => {
          assertStyleMatch(
            {
              color: "var(--colorsUtilityYin030)",
            },
            wrapper,
            {
              modifier: `${SwitchSliderPanel}`,
            }
          );
        });
      });

      describe("when checked=true && disabled=true", () => {
        const wrapper = renderWithTheme(
          { checked: true, disabled: true },
          theme
        ).toJSON();

        it("applies the correct base styles", () => {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsActionDisabled500)",
            },
            wrapper
          );
        });

        it("applies the correct SwitchSliderPanel styles", () => {
          assertStyleMatch(
            {
              color: "var(--colorsUtilityYin030)",
            },
            wrapper,
            {
              modifier: `${SwitchSliderPanel}`,
            }
          );
        });
      });
    }
  );

  describe("rounded corners", () => {
    it.each<SwitchSliderProps["size"]>(["small", "large"])(
      "has the expected border radius styling when size is %s",
      (size) => {
        const wrapper = render({ size }).toJSON();
        assertStyleMatch(
          {
            borderRadius: "var(--borderRadius400)",
          },
          wrapper
        );
      }
    );

    it.each<SwitchSliderProps["size"]>(["small", "large"])(
      "has the expected border radius styling when size is %s and roundedCornersOptOut is true",
      (size) => {
        const wrapper = mount(
          <CarbonProvider roundedCornersOptOut>
            <SwitchSlider size={size} />
          </CarbonProvider>
        );
        assertStyleMatch(
          {
            borderRadius: size === "large" ? "30px" : "90px",
          },
          wrapper.find(StyledSwitchSlider)
        );
      }
    );
  });
});
