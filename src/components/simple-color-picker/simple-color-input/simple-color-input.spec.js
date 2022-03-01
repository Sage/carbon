import React from "react";
import TestRenderer from "react-test-renderer";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledSimpleColorInput from "./simple-color-input.style";
import StyledColorSampleBox from "../color-sample-box/color-sample-box.style";

function render(props) {
  return TestRenderer.create(<StyledSimpleColorInput {...props} />);
}

describe("SimpleColorInput", () => {
  let wrapper;

  describe("when focused", () => {
    it("applies white box shadow and gold color border", () => {
      wrapper = render();
      assertStyleMatch(
        {
          border: "2px solid var(--colorsSemanticFocus500)",
          boxShadow:
            "inset 0px 0px 0px var(--borderWidth200) var(--colorsActionMajorYang100)",
        },
        wrapper.toJSON(),
        { modifier: `:focus + ${StyledColorSampleBox}` }
      );
    });
  });
});
