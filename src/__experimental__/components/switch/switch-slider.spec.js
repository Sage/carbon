import React from "react";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { css, ThemeProvider } from "styled-components";
import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../../__spec_helper__/test-utils";
import Loader from "../../../components/loader/loader.component";
import SwitchSlider from "./switch-slider.component";
import SwitchSliderPanel from "./switch-slider-panel.style";
import { baseTheme } from "../../../style/themes";

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
            backgroundColor: baseTheme.colors.primary,
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
            backgroundColor: baseTheme.disabled.background,
          },
          wrapper
        );
      });

      it("applies the correct ::before styles", () => {
        assertStyleMatch(
          {
            opacity: "0.8",
          },
          wrapper,
          { modifier: "::before" }
        );
      });

      it("applies the correct SwitchSliderPanel styles", () => {
        assertStyleMatch(
          {
            color: baseTheme.disabled.disabled,
          },
          wrapper,
          {
            modifier: css`
              ${SwitchSliderPanel}
            `,
          }
        );
      });
    });

    describe("when checked=true && disabled=true", () => {
      const wrapper = render({ checked: true, disabled: true }).toJSON();

      it("applies the correct SwitchSliderPanel styles", () => {
        assertStyleMatch(
          {
            color: baseTheme.colors.white,
          },
          wrapper,
          {
            modifier: css`
              ${SwitchSliderPanel}
            `,
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
              height: "36px",
              width: "36px",
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
              backgroundColor: theme.switch.off,
            },
            wrapper
          );
        });

        it("applies the correct ::before styles", () => {
          assertStyleMatch(
            {
              backgroundColor: theme.colors.white,
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
              backgroundColor: theme.colors.primary,
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
              backgroundColor: theme.disabled.background,
            },
            wrapper
          );
        });

        it("applies the correct SwitchSliderPanel styles", () => {
          assertStyleMatch(
            {
              color: theme.disabled.disabled,
            },
            wrapper,
            {
              modifier: css`
                ${SwitchSliderPanel}
              `,
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
              backgroundColor: theme.colors.disabled,
            },
            wrapper
          );
        });

        it("applies the correct SwitchSliderPanel styles", () => {
          assertStyleMatch(
            {
              color: theme.colors.white,
            },
            wrapper,
            {
              modifier: css`
                ${SwitchSliderPanel}
              `,
            }
          );
        });
      });
    }
  );
});

function render(props) {
  return TestRenderer.create(<SwitchSlider {...props} />);
}

function renderWithTheme(props, theme, renderer = TestRenderer.create) {
  return renderer(
    <ThemeProvider theme={theme}>
      <SwitchSlider {...props} />
    </ThemeProvider>
  );
}
