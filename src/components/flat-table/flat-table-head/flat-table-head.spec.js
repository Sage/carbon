import React from "react";
import { mount } from "enzyme";

import FlatTableHead from "./flat-table-head.component";
import StyledFlatTableHead from "./flat-table-head.style";
import { FlatTable, FlatTableRow, FlatTableHeader } from "../index";

describe("FlatTableHead", () => {
  describe("when a data prop is added", () => {
    it("should be added to the root element when a single child", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead data-role="test">
            <FlatTableRow>
              <FlatTableHeader>Children</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
        </FlatTable>
      );
      expect(wrapper.find(StyledFlatTableHead).props()["data-role"]).toEqual(
        "test"
      );
    });

    it("should be added to the root element when multiple children", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead data-role="test">
            <FlatTableRow>
              <FlatTableHeader>Children</FlatTableHeader>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableHeader>Children</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
        </FlatTable>
      );

      expect(wrapper.find(StyledFlatTableHead).props()["data-role"]).toEqual(
        "test"
      );
    });
  });
});
