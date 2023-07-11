import React from "react";
import { mount } from "enzyme";
import FlatTableCheckbox, {
  FlatTableCheckboxProps,
} from "./flat-table-checkbox.component";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import guid from "../../../__internal__/utils/helpers/guid";
import { Checkbox } from "../../checkbox";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

const render = ({
  asTh,
  ...rest
}: FlatTableCheckboxProps & { asTh?: boolean }) => {
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
  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = render({ "data-role": "test" });

      expect(
        wrapper.find(StyledFlatTableCheckbox).props()["data-role"]
      ).toEqual("test");
    });
  });

  describe("event propagation", () => {
    it("is stopped when clicked", () => {
      const stopPropagation = jest.fn();
      const wrapper = render({ onClick: () => {} });
      wrapper
        .find(Checkbox)
        ?.props()
        .onClick?.(({
          stopPropagation,
        } as unknown) as React.MouseEvent<HTMLInputElement>);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
    });

    it("is stopped on keydown and key is not ArrowDown or ArrowUp", () => {
      const stopPropagation = jest.fn();
      const wrapper = render({});
      wrapper
        .find(Checkbox)
        ?.props()
        .onKeyDown?.(({
          key: "a",
          stopPropagation,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
    });

    it.each(["ArrowDown", "ArrowUp"])(
      "is not stopped when key is %s",
      (key) => {
        const stopPropagation = jest.fn();
        const wrapper = render({});
        wrapper
          .find(Checkbox)
          ?.props()
          ?.onKeyDown?.(({
            key,
            stopPropagation,
          } as unknown) as React.KeyboardEvent<HTMLInputElement>);
        expect(stopPropagation).not.toHaveBeenCalled();
      }
    );
  });

  describe("onClick handler", () => {
    it("does nothing if onClick is not provided - coverage filler", () => {
      const wrapper = render({});
      wrapper
        .find(Checkbox)
        ?.props()
        .onClick?.(({
          stopPropagation: () => {},
        } as unknown) as React.MouseEvent<HTMLInputElement>);
    });
  });

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

  describe("data tags", () => {
    it("has the expected attributes applied to the elements", () => {
      const wrapper = render({ "data-element": "foo", "data-role": "bar" });

      rootTagTest(
        wrapper.find(StyledFlatTableCheckbox),
        "flat-table-checkbox",
        "foo",
        "bar"
      );
    });
  });
});
