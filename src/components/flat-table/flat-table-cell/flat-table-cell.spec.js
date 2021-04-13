import React from "react";
import { mount } from "enzyme";

import { StyledFlatTableCell } from "./flat-table-cell.style";
import FlatTableRowCell from "./flat-table-cell.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("FlatTableRowCell", () => {
  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(<FlatTableRowCell width={40} />);
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableCell)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableCell),
      { modifier: "&&& > div" }
    );
  });

  describe("when truncate prop is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<FlatTableRowCell truncate>Foo</FlatTableRowCell>);
    });

    it("should apply expected styling", () => {
      assertStyleMatch(
        {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
        wrapper.find(StyledFlatTableCell),
        { modifier: "&&& > div" }
      );
    });

    it("should set the title if children is string", () => {
      expect(wrapper.find("div").props().title).toEqual("Foo");
    });

    describe("and title prop is set", () => {
      it("should override the default behaviour", () => {
        wrapper = mount(
          <FlatTableRowCell truncate title="Bar">
            Foo
          </FlatTableRowCell>
        );
        expect(wrapper.find("div").props().title).toEqual("Bar");
      });
    });
  });
});
