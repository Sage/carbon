import React from "react";
import { mount } from "enzyme";

import { StyledFlatTableCell } from "./flat-table-cell.style";
import FlatTableRowCell from "./flat-table-cell.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("FlatTableRowCell", () => {
  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <FlatTableRowCell width={40} />
          </tr>
        </tbody>
      </table>
    );
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
      wrapper = mount(
        <table>
          <tbody>
            <tr>
              <FlatTableRowCell truncate>Foo</FlatTableRowCell>
            </tr>
          </tbody>
        </table>
      );
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
          <table>
            <tbody>
              <tr>
                <FlatTableRowCell truncate title="Bar">
                  Foo
                </FlatTableRowCell>
              </tr>
            </tbody>
          </table>
        );
        expect(wrapper.find("div").props().title).toEqual("Bar");
      });
    });
  });
});
