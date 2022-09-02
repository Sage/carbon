import React from "react";
import { mount } from "enzyme";
import {
  testStyledSystemSpacing,
  testStyledSystemColor,
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  testStyledSystemPosition,
  assertStyleMatch,
} from "../../__spec_helper__/test-utils";
import Box, { OverflowWrap, ScrollVariant, BoxSizing } from "./box.component";
import boxConfig from "./box.config";

describe("Box", () => {
  testStyledSystemSpacing((props) => <Box {...props} />);
  testStyledSystemColor((props) => <Box {...props} />);
  testStyledSystemLayout((props) => <Box {...props} />);
  testStyledSystemFlexBox((props) => <Box {...props} />);
  testStyledSystemPosition((props) => <Box {...props} />);

  it.each<OverflowWrap>(["break-word", "anywhere"])(
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

  it.each<ScrollVariant>(["light", "dark"])(
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
          backgroundColor: boxConfig[scrollVariant].track,
        },
        wrapper,
        { modifier: "::-webkit-scrollbar-track" }
      );

      assertStyleMatch(
        {
          backgroundColor: boxConfig[scrollVariant].thumb,
        },
        wrapper,
        { modifier: "::-webkit-scrollbar-thumb" }
      );
    }
  );

  it.each<BoxSizing>(["content-box", "border-box"])(
    "has styles applied when boxSizing is set to %s",
    (boxSizing) => {
      const wrapper = mount(<Box boxSizing={boxSizing} />);

      assertStyleMatch({ boxSizing }, wrapper);
    }
  );
});
