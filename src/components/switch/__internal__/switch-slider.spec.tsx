import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/__internal__/test-utils";
import Loader from "../../loader/loader.component";
import SwitchSlider, { SwitchSliderProps } from "./switch-slider.component";
import SwitchSliderPanel from "./switch-slider-panel.style";
import { ThemeObject } from "../../../style/themes/base";
import { sageTheme } from "../../../style/themes";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import StyledSwitchSlider from "./switch-slider.style";

function render(props?: Partial<SwitchSliderProps>) {
  return mount(<SwitchSlider {...props} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });
}

function renderWithTheme(
  props: Partial<SwitchSliderProps>,
  theme?: string | Partial<ThemeObject>
) {
  return mount(
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
        const panels = render().find(SwitchSliderPanel);

        it('renders the text "OFF" in the panel', () => {
          expect(panels.props().children).toBe("OFF");
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });

      describe("when checked=true", () => {
        const panels = render({ checked: true }).find(SwitchSliderPanel);

        it('renders the text "ON" in the panel', () => {
          expect(panels.props().children).toBe("ON");
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });

      describe("when loading=true", () => {
        const panels = render({ loading: true }).find(SwitchSliderPanel);

        it("renders a Loader in the first panel", () => {
          expect(panels.props().children.type).toBe(Loader);
        });

        it("renders only one panel", () => {
          expect(panels.length).toBe(1);
        });
      });
    });

    describe("when checked=true", () => {
      const wrapper = render({ checked: true }).find(StyledSwitchSlider);

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
            marginLeft: "calc( 100% - var(--spacing300) )",
          },
          wrapper,
          { modifier: "::before" }
        );
      });
    });

    describe("when disabled=true", () => {
      const wrapper = render({ disabled: true }).find(StyledSwitchSlider);

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
      const wrapper = render({ checked: true, disabled: true }).find(
        StyledSwitchSlider
      );

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
        const wrapper = render({ size: "large" }).find(StyledSwitchSlider);

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              height: "var(--spacing400)",
              width: "var(--spacing400)",
            },
            wrapper,
            { modifier: "::before" }
          );
        });
      });

      describe("and checked=true", () => {
        const wrapper = render({ checked: true, size: "large" }).find(
          StyledSwitchSlider
        );

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              marginLeft: "calc( 100% - var(--spacing500) )",
            },
            wrapper,
            { modifier: "::before" }
          );
        });
      });
    });
  });

  describe("when the theme is set to sageTheme", () => {
    describe("default", () => {
      const wrapper = renderWithTheme({}, sageTheme).find(StyledSwitchSlider);

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
      const wrapper = renderWithTheme({ checked: true }, sageTheme).find(
        StyledSwitchSlider
      );

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
      const wrapper = renderWithTheme({ disabled: true }, sageTheme).find(
        StyledSwitchSlider
      );

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
        sageTheme
      ).find(StyledSwitchSlider);

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
  });

  describe("rounded corners", () => {
    it.each<SwitchSliderProps["size"]>(["small", "large"])(
      "has the expected border radius styling when size is %s",
      (size) => {
        const wrapper = render({ size }).find(StyledSwitchSlider);
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
