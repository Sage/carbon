import React from "react";
import { mount } from "enzyme";
import {
  testStyledSystemSpacing,
  testStyledSystemColor,
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  assertStyleMatch,
} from "../../__spec_helper__/test-utils";
import Box, { boxColors } from "./box.component";

describe("Box", () => {
  testStyledSystemSpacing((props) => <Box {...props} />);
  testStyledSystemColor((props) => <Box {...props} />);
  testStyledSystemLayout((props) => <Box {...props} />);
  testStyledSystemFlexBox((props) => <Box {...props} />);

  it.each(["break-word", "anywhere"])(
    "overflowWrap sets the expected style on the wrapper",
    (overflowValue) => {
      const wrapper = mount(<Box overflowWrap={overflowValue} />);

      assertStyleMatch(
        {
          overflowWrap: overflowValue,
        },
        wrapper
      );
    }
  );

  it.each(["light", "dark"])(
    "has styles applied when scrollVariant is set to %s",
    (scrollVariant) => {
      const wrapper = mount(<Box scrollVariant={scrollVariant} />);

      assertStyleMatch(
        {
          width: "8px",
        },
        wrapper,
        { modifier: "::-webkit-scrollbar" }
      );

      assertStyleMatch(
        {
          backgroundColor: boxColors[scrollVariant].track,
        },
        wrapper,
        { modifier: "::-webkit-scrollbar-track" }
      );

      assertStyleMatch(
        {
          backgroundColor: boxColors[scrollVariant].thumb,
        },
        wrapper,
        { modifier: "::-webkit-scrollbar-thumb" }
      );
    }
  );
});
