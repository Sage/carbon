import React from "react";
import { mount } from "enzyme";

import FlatTableHead from "./flat-table-head.component";
import StyledFlatTableHead from "./flat-table-head.style";
import FlatTable from "../flat-table.component";

describe("FlatTableHead", () => {
  describe("when a data prop is added", () => {
    it("should be added to the root element when a single child", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead data-role="test">
            <tr>
              <th>Children</th>
            </tr>
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
            <tr>
              <th>Children</th>
            </tr>
            <tr>
              <th>Children</th>
            </tr>
          </FlatTableHead>
        </FlatTable>
      );

      expect(wrapper.find(StyledFlatTableHead).props()["data-role"]).toEqual(
        "test"
      );
    });
  });
});
