import React from "react";
import TestRenderer from "react-test-renderer";

import { ThemeObject } from "../../../style/themes/base";
import { sageTheme } from "../../../style/themes";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledLoader from "../../loader/loader.style";
import StyledLoaderSquare from "../../loader/loader-square.style";
import SwitchSliderPanel, {
  SwitchSliderPanelProps,
} from "./switch-slider-panel.style";

function render(
  props?: SwitchSliderPanelProps & { theme?: string | Partial<ThemeObject> }
) {
  return TestRenderer.create(<SwitchSliderPanel {...props} />);
}

describe("SwitchSliderPanel", () => {
  describe("base theme", () => {
    it("renders as expected", () => {
      expect(render()).toMatchSnapshot();
    });

    describe("when loading === true", () => {
      it("applies the correct Loader styles", () => {
        assertStyleMatch(
          {
            width: "100%",
            height: "100%",
          },
          render({ isLoading: true }).toJSON(),
          {
            modifier: `${StyledLoader}`,
          }
        );
      });

      it("applies the correct LoaderSquare styles", () => {
        assertStyleMatch(
          {
            width: "var(--sizing200)",
            height: "var(--sizing200)",
          },
          render({ isLoading: true, size: "large" }).toJSON(),
          {
            modifier: `${StyledLoader} ${StyledLoaderSquare}`,
          }
        );
      });
    });
  });

  describe("when the theme is set to sageTheme", () => {
    const wrapper = render({ theme: sageTheme }).toJSON();

    it("applies the correct base styles", () => {
      assertStyleMatch(
        {
          color: "var(--colorsActionMinorYang100)",
        },
        wrapper
      );
    });

    it("applies the correct off panel styles", () => {
      assertStyleMatch(
        {
          color: "var(--colorsActionMinor500)",
        },
        wrapper,
        { modifier: '[type="off"]' }
      );
    });
  });
});
