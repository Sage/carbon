import React from "react";
import { mount } from "enzyme";
import StyledFlatTableRowHeader from "./flat-table-row-header.style";
import FlatTableRowHeader from "./flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../../__spec_helper__/test-utils";

describe("FlatTableRowHeader", () => {
  testStyledSystemSpacing(
    (props) => <FlatTableRowHeader {...props} />,
    { py: "10px", px: 3 },
    null,
    { modifier: " > div" }
  );

  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(<FlatTableRowHeader width={40} />);
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader),
      { modifier: " > div" }
    );
  });
});
