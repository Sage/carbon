import React from "react";
import TestRenderer from "react-test-renderer";
import { css } from "styled-components";

import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../../__spec_helper__/test-utils";
import StyledLoader from "../../loader/loader.style";
import StyledLoaderSquare from "../../loader/loader-square.style";
import SwitchSliderPanel from "./switch-slider-panel.style";

function render(props) {
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
            modifier: css`
              ${StyledLoader}
            `,
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
            modifier: css`
              ${StyledLoader} ${StyledLoaderSquare}
            `,
          }
        );
      });
    });
  });

  describe.each(carbonThemesJestTable)(
    "when the theme is set to %s",
    (theme) => {
      const wrapper = render({ theme }).toJSON();

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
    }
  );
});
