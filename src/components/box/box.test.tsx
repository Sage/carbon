import React from "react";
import { getGapValue } from "style/utils/box-gap";
import { render, screen } from "@testing-library/react";
import {
  testStyledSystemSpacingRTL,
  testStyledSystemColor,
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  testStyledSystemGrid,
  testStyledSystemPosition,
} from "../../__spec_helper__/__internal__/test-utils";
import Box from "./box.component";

testStyledSystemSpacingRTL(
  (props) => <Box data-role="box" {...props} />,
  () => screen.getByTestId("box")
);
testStyledSystemColor((props) => <Box {...props} />);
testStyledSystemLayout((props) => <Box {...props} />);
testStyledSystemFlexBox((props) => <Box {...props} />);
testStyledSystemGrid((props) => <Box {...props} />);
testStyledSystemPosition((props) => <Box {...props} />);

test("renders Box with 'break-word' overflowWrap style when overflowWrap prop is set to 'break-word'", () => {
  render(<Box overflowWrap="break-word" data-role="box" />);

  const box = screen.getByTestId("box");
  expect(box).toHaveStyle(`overflow-wrap: break-word`);
});

test("sets the styling for 'gap' when it is passed in as a prop", () => {
  render(<Box display="flex" gap="20px" data-role="box" />);

  const box = screen.getByTestId("box");
  const gap = getGapValue("20px");
  expect(box).toHaveStyle(`gap: ${gap}`);
});

test("sets the styling for 'row-gap' when it is passed in as a prop", () => {
  render(<Box display="flex" rowGap="20px" data-role="box" />);

  const box = screen.getByTestId("box");
  const rowGap = getGapValue("20px");
  expect(box).toHaveStyle(`row-gap: ${rowGap}`);
});

test("sets the styling for 'column-gap' when it is passed in as a prop", () => {
  render(<Box display="flex" columnGap="20px" data-role="box" />);

  const box = screen.getByTestId("box");
  const columnGap = getGapValue("20px");
  expect(box).toHaveStyle(`column-gap: ${columnGap}`);
});

it("applies the boxShadow styling correctly when a design token is passed in", () => {
  render(<Box boxShadow="boxShadow100" data-role="box" />);

  const box = screen.getByTestId("box");
  expect(box).toHaveStyle(`box-shadow: var(--boxShadow100)`);
});
