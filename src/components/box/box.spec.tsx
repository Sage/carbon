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
import Box, {
  OverflowWrap,
  ScrollVariant,
  BoxSizing,
  AllowedNumericalValues,
  Gap,
} from "./box.component";
import boxConfig from "./box.config";

const GAP_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as AllowedNumericalValues[];

const getGapValue = (gap: number | string) =>
  typeof gap === "number" ? `var(--spacing${gap}00)` : gap;

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

  it.each<Gap>([...GAP_VALUES, "20px", "20%", "20px 20%"])(
    "has styles applied when gap is set to %s",
    (gapValue) => {
      const wrapper = mount(<Box display="flex" gap={gapValue} />);
      const gap = getGapValue(gapValue);
      assertStyleMatch({ gap }, wrapper);
    }
  );

  it.each<Gap>([...GAP_VALUES, "20px", "20%"])(
    "has styles applied when row-gap is set to %s",
    (gapValue) => {
      const wrapper = mount(<Box display="flex" rowGap={gapValue} />);
      const rowGap = getGapValue(gapValue);
      assertStyleMatch({ rowGap }, wrapper);
    }
  );

  it.each<Gap>([...GAP_VALUES, "20px", "20%"])(
    "has styles applied when column-gap is set to %s",
    (gapValue) => {
      const wrapper = mount(<Box display="flex" columnGap={gapValue} />);
      const columnGap = getGapValue(gapValue);
      assertStyleMatch({ columnGap }, wrapper);
    }
  );

  it("has styles applied when boxShadow is set", () => {
    const wrapper = mount(<Box boxShadow="boxShadow100" />);
    assertStyleMatch(
      {
        boxShadow: "var(--boxShadow100)",
      },
      wrapper
    );
  });
});
