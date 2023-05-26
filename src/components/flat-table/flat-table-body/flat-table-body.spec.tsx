import React from "react";
import { mount } from "enzyme";

import FlatTableBody from "./flat-table-body.component";
import FlatTable from "../flat-table.component";
import Logger from "../../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

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
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = renderComponent({ "data-role": "test" });

      expect(wrapper.find("tbody").prop("data-role")).toEqual("test");
    });
  });
});
