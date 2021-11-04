import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";

import NumeralDate from "./numeral-date.component";
import Textbox from "../textbox";
import { StyledNumeralDate, StyledDateField } from "./numeral-date.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import FormField from "../../__internal__/form-field";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import Label from "../../__internal__/label";
import StyledHelp from "../help/help.style";

describe("NumeralDate", () => {
  let wrapper;
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onKeyDown = jest.fn();
  const defaultProps = {
    defaultValue: { dd: "30" },
    onBlur,
    onChange,
    onKeyDown,
    id: "numeralDate_id",
    name: "numeralDate_name",
  };
  jest.useFakeTimers();

  const renderWrapper = (props) => {
    return mount(<NumeralDate {...defaultProps} {...props} />);
  };

  testStyledSystemMargin(
    (props) => <NumeralDate {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  describe("propTypes", () => {
    it("does not allow an incorrect dateFormat prop", () => {
      spyOn(global.console, "error");
      renderWrapper({ dateFormat: ["xx"] });
      const expected =
        "Forbidden prop `dateFormat` supplied to `NumeralDate`. " +
        "Only one of these date formats is allowed: " +
        "['dd', 'mm', 'yyyy'], " +
        "['mm', 'dd', 'yyyy'], " +
        "['dd', 'mm'], " +
        "['mm', 'dd'], " +
        "['mm', 'yyyy']";

      // eslint-disable-next-line no-console
      const actual = console.error.calls.argsFor(0)[0];
      expect(actual).toMatch(expected);
    });

    it("does not throw an error if no dateFormat is passed", () => {
      spyOn(global.console, "error");
      renderWrapper();

      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe("invariant", () => {
    beforeEach(() => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      global.console.error.mockReset();
    });

    it("throws when component changes from uncontrolled to controlled", () => {
      wrapper = renderWrapper({ value: undefined });
      expect(() => {
        wrapper.setProps({ value: { dd: "02" } });
      }).toThrow(
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
          "Decide between using a controlled or uncontrolled input element for the lifetime of the component"
      );
    });

    it("throws when component changes from controlled to uncontrolled", () => {
      wrapper = renderWrapper({ value: { dd: "02" } });
      expect(() => {
        wrapper.setProps({ value: undefined });
      }).toThrow(
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
          "Decide between using a controlled or uncontrolled input element for the lifetime of the component"
      );
    });
  });

  describe("styles", () => {
    it("renders the component wrapped with FormField component with proper props passed on", () => {
      const formFieldProps = {
        label: "Label",
        id: "id",
        error: "Error",
        warning: "Warning",
        info: "Info",
        labelInline: true,
        labelWidth: 30,
        labelAlign: "right",
        labelHelp: "label help",
        fieldHelp: "field help",
      };

      wrapper = renderWrapper({
        validationOnLabel: true,
        ...formFieldProps,
      });

      expect(wrapper.find(FormField).first().props()).toMatchObject({
        ...formFieldProps,
        useValidationIcon: true,
      });
    });

    it("matches the expected styles", () => {
      assertStyleMatch(
        {
          display: "inline-flex",
          border: "1px solid transparent",
          height: "40px",
          fontSize: "14px",
          fontWeight: "400",
          paddingBottom: "2px",
          paddingTop: "1px",
        },
        renderWrapper().find(StyledNumeralDate)
      );
    });

    it("applies the expected styling when last input has a validation icon", () => {
      wrapper = renderWrapper({
        value: { dd: "03", mm: "03" },
        dateFormat: ["dd", "mm"],
        error: "Error",
      });

      assertStyleMatch(
        {
          width: "78px",
        },
        wrapper.find(StyledDateField).at(1),
        { modifier: `${StyledInputPresentation}` }
      );
    });

    it("applies the expected styling when input is a year input", () => {
      wrapper = renderWrapper({
        value: { dd: "03", mm: "03", yyyy: "2000" },
        dateFormat: ["dd", "mm", "yyyy"],
      });

      assertStyleMatch(
        {
          width: "78px",
        },
        wrapper.find(StyledDateField).at(2),
        { modifier: `${StyledInputPresentation}` }
      );
    });
  });

  describe("validations", () => {
    it("renders validation icon only on last input when validationOnLabel prop is passed as false", () => {
      wrapper = renderWrapper({
        value: { dd: "03", mm: "03", yyyy: "2000" },
        dateFormat: ["dd", "mm", "yyyy"],
        validationOnLabel: false,
        error: "Error",
        warning: "Warning",
        info: "Info",
      });
      expect(wrapper.find(Textbox).at(0).props()).toMatchObject({
        error: true,
        warning: true,
        info: true,
      });
      expect(wrapper.find(Textbox).at(1).props()).toMatchObject({
        error: true,
        warning: true,
        info: true,
      });
      expect(wrapper.find(Textbox).at(2).props()).toMatchObject({
        error: "Error",
        warning: "Warning",
        info: "Info",
      });
    });
    describe.each([
      ["enableInternalError", "error"],
      ["enableInternalWarning", "warning"],
    ])("internal %s", (internalValidationProp, validationType) => {
      it.each([
        ["", true],
        ["0", false],
        ["1", true],
        ["31", true],
        ["32", false],
        ["33", false],
      ])(
        "renders internal validation when day field is blurred and has incorrect value",
        (value, isValid) => {
          wrapper = renderWrapper({
            dateFormat: ["dd"],
            defaultValue: null,
            [internalValidationProp]: true,
          });
          const input = wrapper.find("input");
          input.simulate("change", { target: { value } });
          wrapper.update();
          input.simulate("blur");
          jest.runAllTimers();
          wrapper.update();
          expect(wrapper.find(Textbox).at(0).props()[validationType]).toBe(
            isValid ? "" : "Day should be a number within a 1-31 range.\n"
          );
        }
      );

      it.each([
        ["", true],
        ["0", false],
        ["1", true],
        ["12", true],
        ["13", false],
        ["14", false],
      ])(
        "renders internal validation when month field is blurred and has incorrect value",
        (value, isValid) => {
          wrapper = renderWrapper({
            defaultValue: null,
            dateFormat: ["dd", "mm"],
            [internalValidationProp]: true,
          });
          const input = wrapper.find("input").at(1);
          input.simulate("change", { target: { value } });
          input.simulate("blur");
          jest.runAllTimers();
          wrapper.update();
          expect(wrapper.find(Textbox).at(1).props()[validationType]).toBe(
            isValid ? "" : "Month should be a number within a 1-12 range.\n"
          );
        }
      );

      it.each([
        ["", true],
        ["1798", false],
        ["1799", false],
        ["1800", true],
        ["2200", true],
        ["2201", false],
        ["2202", false],
      ])(
        "renders internal validation when year field is blurred and has incorrect value",
        (value, isValid) => {
          wrapper = renderWrapper({
            defaultValue: null,
            dateFormat: ["dd", "mm", "yyyy"],
            [internalValidationProp]: true,
          });
          const input = wrapper.find("input").at(2);
          input.simulate("change", { target: { value } });
          input.simulate("blur");
          jest.runAllTimers();
          wrapper.update();
          expect(wrapper.find(Textbox).at(2).props()[validationType]).toBe(
            isValid ? "" : "Year should be a number within a 1800-2200 range.\n"
          );
        }
      );

      it("renders multiline internal validation when all fields are blurred with incorrect values", () => {
        wrapper = renderWrapper({
          defaultValue: null,
          dateFormat: ["dd", "mm", "yyyy"],
          [internalValidationProp]: true,
        });
        const dayInput = wrapper.find("input").at(0);
        dayInput.simulate("change", { target: { value: "0" } });
        dayInput.simulate("blur");
        const monthInput = wrapper.find("input").at(1);
        monthInput.simulate("change", { target: { value: "0" } });
        monthInput.simulate("blur");
        const yearInput = wrapper.find("input").at(2);
        yearInput.simulate("change", { target: { value: "0" } });
        yearInput.simulate("blur");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(Textbox).at(2).props()[validationType]).toBe(
          "Day should be a number within a 1-31 range.\n" +
            "Month should be a number within a 1-12 range.\n" +
            "Year should be a number within a 1800-2200 range.\n"
        );
      });
    });
  });

  it("has proper default dateFormat prop", () => {
    wrapper = renderWrapper({ dateFormat: undefined });
    expect(wrapper.find(Textbox).at(0).props().placeholder).toEqual("dd");
    expect(wrapper.find(Textbox).at(1).props().placeholder).toEqual("mm");
    expect(wrapper.find(Textbox).at(2).props().placeholder).toEqual("yyyy");
  });

  describe("Clicking off the component", () => {
    it("calls onBlur if prop is passed", () => {
      wrapper = renderWrapper({ defaultValue: undefined, dateFormat: ["dd"] });
      const input = wrapper.find("input");
      input.simulate("blur");
      jest.runAllTimers();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe("supports being a controlled component", () => {
    it("calls onChange prop with proper argument", () => {
      wrapper = renderWrapper({ name: "Name", id: "Id", dateFormat: ["dd"] });
      const input = wrapper.find("input");
      act(() => {
        input.simulate("change", { target: { value: "45" } });
      });
      expect(onChange).toHaveBeenCalledWith({
        target: {
          value: {
            dd: "45",
          },
          name: "Name",
          id: "Id",
        },
      });
    });

    it("passes value prop to the input", () => {
      wrapper = renderWrapper({
        defaultValue: undefined,
        value: { dd: "30" },
        dateFormat: ["dd"],
      });
      const input = wrapper.find("input");
      expect(input.props().value).toEqual("30");
    });

    it("passes empty string to the input if value is not provided", () => {
      wrapper = renderWrapper({
        defaultValue: undefined,
        value: undefined,
        dateFormat: ["dd"],
      });
      const input = wrapper.find("input");
      expect(input.props().value).toEqual("");
    });
  });

  describe("supports being a uncontrolled component", () => {
    it("accepts a default value", () => {
      wrapper = renderWrapper({ dateFormat: ["dd"] });
      const input = wrapper.find("input");
      expect(input.props().value).toEqual("30");
    });

    it("passes empty string to the input if defaultValue is not provided", () => {
      wrapper = renderWrapper({ defaultValue: undefined, dateFormat: ["dd"] });
      const input = wrapper.find("input");
      expect(input.props().value).toEqual("");
    });
  });

  describe("Valid characters", () => {
    beforeEach(() => {
      wrapper = renderWrapper({ dateFormat: ["dd"] });
    });

    afterEach(() => jest.clearAllMocks());

    it("allows numeric key presses", () => {
      const input = wrapper.find("input");
      const event = { key: "1", which: 49, preventDefault: jest.fn() };
      act(() => {
        input.simulate("keypress", event);
      });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it.each([
      ["a", 65],
      ["/", 191],
    ])("does not allow non-numeric characters", (key) => {
      const input = wrapper.find("input");
      const event = { key: key[0], which: key[1], preventDefault: jest.fn() };
      act(() => {
        input.simulate("keypress", event);
      });
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("does not allow partial date value to be too long", () => {
      const input = wrapper.find("input");
      const event = {
        target: {
          value: "123",
        },
        preventDefault: jest.fn(),
      };
      act(() => {
        input.simulate("change", event);
      });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapperWithTags = shallow(
        <NumeralDate
          dateFormat={["dd", "mm", "yyyy"]}
          value={{ dd: "12", mm: "", yyyy: "" }}
        />
      );
      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapperWithTags.find(StyledNumeralDate), "numeral-date");
      });
    });
  });

  describe("required", () => {
    beforeAll(() => {
      wrapper = renderWrapper({
        label: "required",
        required: true,
        dateFormat: ["dd", "mm", "yyyy"],
      });
    });

    it("the required prop is passed to the inputs", () => {
      const inputs = wrapper.find("input");
      inputs.forEach((input) => {
        expect(input.prop("required")).toBe(true);
      });
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("helpAriaLabel", () => {
    it("should set the aria-label on the Help component", () => {
      const text = "foo";

      const { "aria-label": ariaLabel } = mount(
        <NumeralDate
          value={{ dd: "02" }}
          label={text}
          labelHelp={text}
          helpAriaLabel={text}
        />
      )
        .find(StyledHelp)
        .props();

      expect(ariaLabel).toEqual(text);
    });
  });
});
