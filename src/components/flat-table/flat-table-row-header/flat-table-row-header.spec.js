import React from "react";
import { mount } from "enzyme";

import StyledFlatTableRowHeader from "./flat-table-row-header.style";
import FlatTableRowHeader from "./flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../../__spec_helper__/test-utils";
import StyledIcon from "../../icon/icon.style";

describe("FlatTableRowHeader", () => {
  testStyledSystemSpacing(
    (props) => <FlatTableRowHeader {...props} />,
    { py: "10px", px: 3 },
    null,
    { modifier: "&&& > div" }
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
      { modifier: "&&& > div" }
    );
  });

  describe("when expandable prop is true", () => {
    it("should render an arrow icon", () => {
      const wrapper = mount(<FlatTableRowHeader expandable />);

      expect(wrapper.find(StyledIcon).exists()).toEqual(true);
    });

    describe("and onClick prop is set", () => {
      it("should call the onClick function when it is clicked", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <FlatTableRowHeader expandable onClick={onClickFn} />
        );

        wrapper.find(StyledFlatTableRowHeader).props().onClick();

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and onKeyDown prop is set", () => {
      it("should call the onKeyDown function when a key is pressed", () => {
        const onKeyDownFn = jest.fn();
        const wrapper = mount(
          <FlatTableRowHeader expandable onKeyDown={onKeyDownFn} />
        );

        wrapper.find(StyledFlatTableRowHeader).props().onKeyDown();

        expect(onKeyDownFn).toHaveBeenCalled();
      });
    });
  });
});
