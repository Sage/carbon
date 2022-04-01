import React from "react";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledSimpleColorInput from "./simple-color-input.style";
import StyledColorSampleBox from "../color-sample-box/color-sample-box.style";

describe("SimpleColorInput", () => {
  it("applies white box shadow and gold color border when focused", () => {
    assertStyleMatch(
      {
        border: "2px solid var(--colorsSemanticFocus500)",
        boxShadow:
          "inset 0px 0px 0px var(--borderWidth200) var(--colorsUtilityYang100)",
      },
      mount(<StyledSimpleColorInput />),
      { modifier: `:focus + ${StyledColorSampleBox}` }
    );
  });
});
