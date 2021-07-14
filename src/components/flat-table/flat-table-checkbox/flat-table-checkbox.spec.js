import React from "react";
import { mount } from "enzyme";
import FlatTableCheckbox from "./flat-table-checkbox.component";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import guid from "../../../utils/helpers/guid";
import { Checkbox } from "../../../__experimental__/components/checkbox";

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const render = ({ asTh, ...rest }) => {
  return mount(
    <table>
      {asTh && (
        <thead>
          <tr>
            <FlatTableCheckbox as="th" {...rest} />
          </tr>
        </thead>
      )}
      {!asTh && (
        <tbody>
          <tr>
            <FlatTableCheckbox {...rest} />
          </tr>
        </tbody>
      )}
    </table>
  );
};

describe("FlatTableCheckbox", () => {
  describe('the "as" prop is not passed in', () => {
    it('renders to match the expected styling for a "td" element', () => {
      expect(render({}).find("td").exists()).toBeTruthy();
    });

    it('has the correct "data-element" when rendered as a "td"', () => {
      expect(
        render({}).find(StyledFlatTableCheckbox).prop("data-element")
      ).toEqual("flat-table-checkbox-cell");
    });
  });

  describe('"th" is passed in via the "as" prop', () => {
    it('renders to match the expected styling for a "th" element when it is passed via the "as" prop', () => {
      expect(render({ asTh: true }).find("th").exists()).toBeTruthy();
    });

    it('renders to match the expected styling for a "th" element', () => {
      expect(
        render({ asTh: true })
          .find(StyledFlatTableCheckbox)
          .prop("data-element")
      ).toEqual("flat-table-checkbox-header");
    });
  });

  describe("when selectable prop is false", () => {
    it("should not render the checkbox", () => {
      const wrapper = render({ selectable: false });

      expect(wrapper.find(Checkbox).exists()).toEqual(false);
    });
  });
});
