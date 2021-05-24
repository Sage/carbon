import React from "react";
import { mount } from "enzyme";
import FlatTableHeader from "./flat-table-header.component";
import StyledFlatTableHeader from "./flat-table-header.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("FlatTableHeader", () => {
  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <FlatTableHeader width={40} />
          </tr>
        </thead>
      </table>
    );
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableHeader)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableHeader),
      { modifier: "&&& > div" }
    );
  });

  describe('with the "alternativeBgColor" prop set', () => {
    it('it overrides the header "background-color"', () => {
      const wrapper = mount(<FlatTableHeader alternativeBgColor />);

      assertStyleMatch(
        {
          backgroundColor: "#1A475B",
        },
        wrapper.find(StyledFlatTableHeader),
        { modifier: "&&&" }
      );
    });
  });
});
