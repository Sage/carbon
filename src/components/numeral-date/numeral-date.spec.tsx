import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import { act } from "react-dom/test-utils";

import NumeralDate, {
  NumeralDateProps,
  ValidDateFormat,
} from "./numeral-date.component";
import Textbox from "../textbox";
import Typography from "../typography";
import { StyledNumeralDate } from "./numeral-date.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import FormField from "../../__internal__/form-field";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import Label from "../../__internal__/label";
import StyledHelp from "../help/help.style";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const ddmmMessage =
  "Day should be a number within a 1-31 range.\n" +
  "Month should be a number within a 1-12 range.\n";

const ddmmyyyyMessage =
  "Day should be a number within a 1-31 range.\n" +
  "Month should be a number within a 1-12 range.\n" +
  "Year should be a number within a 1800-2200 range.\n";

type ValidationType = "error" | "warning" | "info";

describe("NumeralDate", () => {
  let wrapper: ReactWrapper;
  const onBlur = jest.fn();
  const onChange = jest.fn();

  const defaultProps: NumeralDateProps = {
    defaultValue: { dd: "30", mm: "01", yyyy: "2000" },
    onBlur,
    onChange,
    id: "numeralDate_id",
    name: "numeralDate_name",
  };
  jest.useFakeTimers();

  const renderWrapper = (props: NumeralDateProps = {}) => {
    return mount(<NumeralDate {...defaultProps} {...props} />);
  };

  const renderNewValidationsWrapper = (props: NumeralDateProps) => {
    return mount(
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate {...defaultProps} {...props} />
      </CarbonProvider>
    );
  };

  testStyledSystemMargin(
    (props) => <NumeralDate {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  beforeEach(() => {
    onBlur.mockReset();
    onChange.mockReset();
  });

  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  describe("Deprecation warning for uncontrolled", () => {
    beforeEach(() => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
    });

    afterEach(() => {
      loggerSpy.mockRestore();
    });

    afterAll(() => {
      loggerSpy.mockClear();
    });

    it("should display deprecation warning once", () => {
      renderWrapper({});

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Numeral Date` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("propTypes", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockReset();
    });

    it("does not allow an incorrect dateFormat prop", () => {
      const expected =
        "Forbidden prop dateFormat supplied to NumeralDate. " +
        "Only one of these date formats is allowed: " +
        "['dd', 'mm', 'yyyy'], ['mm', 'dd', 'yyyy'], ['yyyy', 'mm', 'dd'], ['dd', 'mm'], ['mm', 'dd'], ['mm', 'yyyy']";

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:next-line testing incorrect date format
      expect(() => renderWrapper({ dateFormat: ["xx"] })).toThrow(expected);

      consoleSpy.mockRestore();
    });

    it("does not throw an error if no dateFormat is passed", () => {
      renderWrapper();

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe("invariant", () => {
    let consoleSpy: jest.SpyInstance;
    beforeEach(() => {
      consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockReset();
    });

    it("throws when component changes from uncontrolled to controlled", () => {
      wrapper = renderWrapper({ value: undefined });
      expect(() => {
        wrapper.setProps({ value: { dd: "02", mm: "01", yyyy: "2020" } });
      }).toThrow(
        "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
          "Decide between using a controlled or uncontrolled input element for the lifetime of the component"
      );
    });

    it("throws when component changes from controlled to uncontrolled", () => {
      wrapper = renderWrapper({ value: { dd: "02", mm: "01", yyyy: "2020" } });
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
      const formFieldProps: NumeralDateProps = {
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
          fontSize: "14px",
          fontWeight: "400",
        },
        renderWrapper().find(StyledNumeralDate)
      );
    });
  });

  describe("validations", () => {
    describe("when validations are passed as string", () => {
      beforeEach(() => {
        wrapper = renderWrapper({
          value: { dd: "03", mm: "03", yyyy: "2000" },
          dateFormat: ["dd", "mm", "yyyy"],
          validationOnLabel: false,
          error: "Error",
          warning: "Warning",
          info: "Info",
        });
      });

      it.each([0, 1])(
        "passes validation as boolean when the textbox is not last",
        (textboxIndex) => {
          expect(wrapper.find(Textbox).at(textboxIndex).props()).toMatchObject({
            error: true,
            warning: true,
            info: true,
          });
        }
      );

      it("passes validation strings to the last textbox", () => {
        expect(wrapper.find(Textbox).at(2).props()).toMatchObject({
          error: "Error",
          warning: "Warning",
          info: "Info",
        });
      });
    });

    describe.each<[string, ValidationType]>([
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
        "renders internal validation when day field is blurred and has incorrect value (%s)",
        (value, isValid) => {
          wrapper = renderWrapper({
            defaultValue: undefined,
            [internalValidationProp]: true,
          });

          const dayInput = wrapper.find("input").at(0);

          dayInput.simulate("change", { target: { value } });
          wrapper.update();
          dayInput.simulate("blur");
          jest.runAllTimers();
          wrapper.update();

          const dateTextboxes = wrapper.find(Textbox);

          expect(
            dateTextboxes.at(dateTextboxes.length - 1).props()[validationType]
          ).toBe(
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
        "renders internal validation when month field is blurred and has incorrect value (%s)",
        (value, isValid) => {
          wrapper = renderWrapper({
            defaultValue: undefined,
            [internalValidationProp]: true,
          });

          const monthInput = wrapper.find("input").at(1);

          monthInput.simulate("change", { target: { value } });
          monthInput.simulate("blur");
          jest.runAllTimers();
          wrapper.update();

          const dateTextboxes = wrapper.find(Textbox);

          expect(
            dateTextboxes.at(dateTextboxes.length - 1).props()[validationType]
          ).toBe(
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
        "renders internal validation when year field is blurred and has incorrect value (%o)",
        (value, isValid) => {
          wrapper = renderWrapper({
            defaultValue: undefined,
            [internalValidationProp]: true,
          });
          const input = wrapper.find("input").at(2);
          input.simulate("change", { target: { value } });
          input.simulate("blur");
          jest.runAllTimers();
          wrapper.update();

          const dateTextboxes = wrapper.find(Textbox);
          expect(
            dateTextboxes.at(dateTextboxes.length - 1).props()[validationType]
          ).toBe(
            isValid ? "" : "Year should be a number within a 1800-2200 range.\n"
          );
        }
      );

      describe.each<[ValidDateFormat, string]>([
        [["dd", "mm"], ddmmMessage],
        [["dd", "mm", "yyyy"], ddmmyyyyMessage],
      ])(
        "when the format is set to %o and values are changed to be invalid",
        (dateFormat, expectedMessage) => {
          it("multiline internal validation matching the format should be rendered", () => {
            wrapper = renderWrapper({
              dateFormat,
              defaultValue: undefined,
              [internalValidationProp]: true,
            });
            const dayInput = wrapper.find("input").at(0);
            dayInput.simulate("change", { target: { value: "0" } });
            dayInput.simulate("blur");
            const monthInput = wrapper.find("input").at(1);
            monthInput.simulate("change", { target: { value: "0" } });
            monthInput.simulate("blur");

            if (dateFormat?.length === 3) {
              const yearInput = wrapper.find("input").at(2);
              yearInput.simulate("change", { target: { value: "0" } });
              yearInput.simulate("blur");
            }

            jest.runAllTimers();
            wrapper.update();

            const dateTextboxes = wrapper.find(Textbox);

            expect(
              dateTextboxes.at(dateTextboxes.length - 1).props()[validationType]
            ).toBe(expectedMessage);
          });
        }
      );
    });
  });

  it("has proper default dateFormat prop", () => {
    wrapper = renderWrapper({ dateFormat: undefined });

    expect(wrapper.find(Typography).at(0).text()).toBe("Day");
    expect(wrapper.find(Typography).at(1).text()).toBe("Month");
    expect(wrapper.find(Typography).at(2).text()).toBe("Year");
  });

  describe("Clicking off the component", () => {
    it("calls onBlur if prop is passed", () => {
      wrapper = renderWrapper({ defaultValue: undefined });
      const input = wrapper.find("input").at(0);
      input.simulate("blur");
      jest.runAllTimers();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe("supports being a controlled component", () => {
    it("calls onChange prop with proper argument", () => {
      wrapper = renderWrapper({ name: "Name", id: "Id" });
      const input = wrapper.find("input").at(0);
      act(() => {
        input.simulate("change", { target: { value: "45" } });
      });
      expect(onChange).toHaveBeenCalledWith({
        target: {
          value: {
            dd: "45",
            mm: "01",
            yyyy: "2000",
          },
          name: "Name",
          id: "Id",
        },
      });
    });

    it("passes value prop to the input", () => {
      wrapper = renderWrapper({
        defaultValue: undefined,
        value: { dd: "30", mm: "", yyyy: "" },
      });
      const input = wrapper.find("input").at(0);
      expect(input.props().value).toEqual("30");
    });

    it("passes empty string to the input if value is not provided", () => {
      wrapper = renderWrapper({
        defaultValue: undefined,
        value: undefined,
      });
      const input = wrapper.find("input").at(0);
      expect(input.props().value).toEqual("");
    });
  });

  describe("supports being a uncontrolled component", () => {
    it("accepts a default value", () => {
      wrapper = renderWrapper({});
      const input = wrapper.find("input").at(0);
      expect(input.props().value).toEqual("30");
    });

    it("passes empty string to the input if defaultValue is not provided", () => {
      wrapper = renderWrapper({ defaultValue: undefined });
      const input = wrapper.find("input").at(0);
      expect(input.props().value).toEqual("");
    });
  });

  describe("Valid characters", () => {
    const preventDefaultMock = jest.fn();

    beforeEach(() => {
      wrapper = renderWrapper({});
    });

    afterEach(() => {
      preventDefaultMock.mockClear();
      onChange.mockClear();
    });

    it("allows numeric key presses", () => {
      const input = wrapper.find("input").at(0);
      const event = { key: "1", preventDefault: preventDefaultMock };
      act(() => {
        input.simulate("keydown", event);
      });
      expect(preventDefaultMock).not.toHaveBeenCalled();
    });

    it.each([["a"], ["/"]])("does not allow non-numeric characters", (key) => {
      const input = wrapper.find("input").at(0);
      const event = { key: key[0], preventDefault: preventDefaultMock };
      act(() => {
        input.simulate("keydown", event);
      });
      expect(preventDefaultMock).toHaveBeenCalled();
    });

    it("does not allow partial date value to be too long", () => {
      const input = wrapper.find("input").at(0);
      const event = {
        target: {
          value: "123",
        },
        preventDefault: preventDefaultMock,
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
        <NumeralDate value={{ dd: "12", mm: "", yyyy: "" }} />
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
          value={{ dd: "02", mm: "", yyyy: "" }}
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

  describe("new validation design", () => {
    it("hint text is visible and tooltip is not rendered when the labelHelp prop is passed", () => {
      wrapper = renderNewValidationsWrapper({
        labelHelp: "Example hint text",
      });
      expect(wrapper.find(StyledHintText).text()).toEqual("Example hint text");
      expect(wrapper.find(StyledHelp).exists()).toEqual(false);
    });

    describe("on error", () => {
      it("error message is visible", () => {
        wrapper = renderNewValidationsWrapper({ error: "error" });
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });

      it("should only have one ErrorBorder", () => {
        wrapper = renderNewValidationsWrapper({ error: "error" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(ErrorBorder).length).toEqual(1);
      });
    });

    describe("on warning", () => {
      it("warning message is visible", () => {
        wrapper = renderNewValidationsWrapper({ warning: "warning" });
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });

      it("should only have one ErrorBorder", () => {
        wrapper = renderNewValidationsWrapper({ warning: "warning" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(ErrorBorder).length).toEqual(1);
      });
    });
  });

  describe("ref props", () => {
    describe("dayRef", () => {
      it("accepts as a ref object", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          dayRef: ref,
        });

        expect(ref.current).toBe(wrapper.find("input").at(0).getDOMNode());
      });

      it("accepts as a ref callback", () => {
        const ref = jest.fn();
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          dayRef: ref,
        });

        expect(ref).toHaveBeenCalledWith(
          wrapper.find("input").at(0).getDOMNode()
        );
      });

      it("sets ref to empty after unmount", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          dayRef: ref,
        });

        wrapper.unmount();

        expect(ref.current).toBe(null);
      });
    });

    describe("monthRef", () => {
      it("accepts as a ref object", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          monthRef: ref,
        });

        expect(ref.current).toBe(wrapper.find("input").at(1).getDOMNode());
      });

      it("accepts as a ref callback", () => {
        const ref = jest.fn();
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          monthRef: ref,
        });

        expect(ref).toHaveBeenCalledWith(
          wrapper.find("input").at(1).getDOMNode()
        );
      });

      it("sets ref to empty after unmount", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          monthRef: ref,
        });

        wrapper.unmount();

        expect(ref.current).toBe(null);
      });
    });

    describe("yearRef", () => {
      it("accepts as a ref object", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          yearRef: ref,
        });

        expect(ref.current).toBe(wrapper.find("input").at(2).getDOMNode());
      });

      it("accepts as a ref callback", () => {
        const ref = jest.fn();
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          yearRef: ref,
        });

        expect(ref).toHaveBeenCalledWith(
          wrapper.find("input").at(2).getDOMNode()
        );
      });

      it("sets ref to empty after unmount", () => {
        const ref = { current: null };
        wrapper = renderWrapper({
          dateFormat: ["dd", "mm", "yyyy"],
          yearRef: ref,
        });

        wrapper.unmount();

        expect(ref.current).toBe(null);
      });
    });
  });
});
