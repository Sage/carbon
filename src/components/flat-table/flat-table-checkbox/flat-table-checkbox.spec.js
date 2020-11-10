import React from "react";
import TestRenderer from "react-test-renderer";
import FlatTableCheckbox from "./flat-table-checkbox.component";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import guid from "../../../utils/helpers/guid";
import { Checkbox } from "../../../__experimental__/components/checkbox";

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

describe("FlatTableCheckbox", () => {
  describe('the "as" prop is not passed in', () => {
    it('renders to match the expected styling for a "td" element', () => {
      expect(
        TestRenderer.create(<FlatTableCheckbox />).toJSON()
      ).toMatchSnapshot();
    });

    it('has the correct "data-element" when rendered as a "td"', () => {
      expect(
        TestRenderer.create(<FlatTableCheckbox />).root.findByType(
          StyledFlatTableCheckbox
        ).props["data-element"]
      ).toEqual("flat-table-checkbox-cell");
    });
  });

  describe('"th" is passed in via the "as" prop', () => {
    it('renders to match the expected styling for a "th" element when it is passed via the "as" prop', () => {
      expect(
        TestRenderer.create(<FlatTableCheckbox as="th" />).toJSON()
      ).toMatchSnapshot();
    });

    it('renders to match the expected styling for a "th" element', () => {
      expect(
        TestRenderer.create(<FlatTableCheckbox as="th" />).root.findByType(
          StyledFlatTableCheckbox
        ).props["data-element"]
      ).toEqual("flat-table-checkbox-header");
    });
  });

  describe('"click" event', () => {
    it('calls "stopPropagation" when the "Checkbox" is clicked', () => {
      const mockClick = jest.fn();
      const wrapper = TestRenderer.create(<FlatTableCheckbox />);
      wrapper.root
        .findByType(Checkbox)
        .props.onClick({ stopPropagation: mockClick });
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
