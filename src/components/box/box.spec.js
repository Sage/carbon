import React from "react";

import {
  testStyledSystemSpacing,
  testStyledSystemColor,
  testStyledSystemLayout,
  testStyledSystemFlexBox,
} from "../../__spec_helper__/test-utils";
import Box from "./box.component";

describe("Box", () => {
  testStyledSystemSpacing((props) => <Box {...props} />);
  testStyledSystemColor((props) => <Box {...props} />);
  testStyledSystemLayout((props) => <Box {...props} />);
  testStyledSystemFlexBox((props) => <Box {...props} />);
});
