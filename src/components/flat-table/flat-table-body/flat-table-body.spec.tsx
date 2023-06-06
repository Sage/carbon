import React from "react";
import { mount } from "enzyme";

import FlatTableBody from "./flat-table-body.component";
import FlatTable from "../flat-table.component";

function renderComponent(props = {}) {
  return mount(
    <FlatTable>
      <FlatTableBody {...props}>
        <tr />
      </FlatTableBody>
    </FlatTable>
  );
}

describe("FlatTableBody", () => {
  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = renderComponent({ "data-role": "test" });

      expect(wrapper.find("tbody").prop("data-role")).toEqual("test");
    });
  });
});
