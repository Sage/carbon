import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import DayPicker from "react-day-picker";
import DateRange, { DateRangeProps } from "./date-range.component";
import DateInput, { DateInputProps } from "../date";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import StyledDateRange from "./date-range.style";
import StyledDateInput from "../date/date.style";
import Tooltip from "../tooltip";
import { FieldLineStyle } from "../../__internal__/form-field/form-field.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import StyledLabel, {
  StyledLabelContainer,
} from "../../__internal__/label/label.style";
import { InputName } from "./date-range.context";

const initialValues = ["10/10/2016", "11/11/2016"];
const updatedValues = ["12/12/2012", "13/12/2012"];
const datePickerWidths = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

function renderDateRange(props: Partial<DateRangeProps> = {}) {
  return mount(
    <DateRange value={initialValues} onChange={() => {}} {...props} />,
    {
      attachTo: document.getElementById("enzymeContainer"),
    }
  );
}

function simulateFocusOnInput(
  container: ReactWrapper | null,
  dateId: InputName
) {
  const input = container?.find("input").at(dateId === "start" ? 0 : 1);

  input?.simulate("focus");
}

function simulateBlurOnInput(
  container: ReactWrapper | null,
  dateId: InputName
) {
  const input = container?.find("input").at(dateId === "start" ? 0 : 1);

  act(() => {
    input?.simulate("blur");
  });
}

describe("DateRange", () => {
  let wrapper: ReactWrapper;
  let customOnChange: jest.Mock;
  let customOnBlur: jest.Mock;

  beforeEach(() => {
    customOnChange = jest.fn();
    customOnBlur = jest.fn();

    wrapper = renderDateRange({
      onChange: customOnChange,
      onBlur: customOnBlur,
      value: initialValues,
      "data-element": "bar",
      "data-role": "baz",
      name: "foo",
      id: "bar",
    });
  });

  afterEach(() => {
    if (wrapper?.exists()) {
      wrapper?.unmount();
    }
  });

  testStyledSystemMargin((props) => (
    <DateRange value={initialValues} onChange={() => {}} {...props} />
  ));

  describe("onChange", () => {
    describe("when the start date changes", () => {
      it("calls the passed in onChange function", () => {
        wrapper
          .find(DateInput)
          .at(0)
          .find("input")
          .simulate("change", { target: { value: "15/10/2016" } });

        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "15/10/2016", rawValue: "2016-10-15" },
              { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
            ],
          },
        });
      });

      describe("and startDateProps.allowEmptyValue is true", () => {
        it("emits the rawValue as an empty string", () => {
          wrapper.setProps({
            startDateProps: { allowEmptyValue: true },
            value: ["", initialValues[1]],
          });
          simulateBlurOnInput(wrapper, "start");
          expect(customOnBlur).toHaveBeenCalledWith({
            target: {
              id: "bar",
              name: "foo",
              value: [
                { formattedValue: "", rawValue: "" },
                { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
              ],
            },
          });
        });
      });

      it("sets the raw value to null if an invalid date string is passed", () => {
        wrapper
          .find(DateInput)
          .at(0)
          .find("input")
          .simulate("change", { target: { value: "foo" } });

        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "foo", rawValue: null },
              { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
            ],
          },
        });
      });
    });

    describe("when the end date changes", () => {
      it("calls the passed in onChange function", () => {
        wrapper
          .find(DateInput)
          .at(1)
          .find("input")
          .simulate("change", { target: { value: "16/11/2016" } });

        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
              { formattedValue: "16/11/2016", rawValue: "2016-11-16" },
            ],
          },
        });
      });

      describe("and endDateProps.allowEmptyValue is true", () => {
        it("emits the rawValue as an empty string", () => {
          wrapper.setProps({
            endDateProps: { allowEmptyValue: true },
            value: [initialValues[0], ""],
          });
          simulateBlurOnInput(wrapper, "end");

          expect(customOnBlur).toHaveBeenCalledWith({
            target: {
              id: "bar",
              name: "foo",
              value: [
                { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
                { formattedValue: "", rawValue: "" },
              ],
            },
          });
        });
      });

      describe("when no onBlur prop is passed in", () => {
        it("does not call the passed in onChange function", () => {
          wrapper.setProps({ onBlur: undefined });
          wrapper
            .find(DateInput)
            .first()
            ?.props()
            ?.onBlur?.({
              target: {
                value: {
                  formattedValue: "22/12/2020",
                  rawValue: "2020-12-22",
                },
              },
            });
        });
      });

      it("sets the raw value to null if an invalid date string is passed", () => {
        wrapper
          .find(DateInput)
          .at(1)
          .find("input")
          .simulate("change", { target: { value: "foo" } });

        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
              { formattedValue: "foo", rawValue: null },
            ],
          },
        });
      });
    });

    describe("when the user interacts with a date input", () => {
      it("does not fire an onBlur event when focus moves from start to end input", () => {
        wrapper.find(DateInput).first().find("input").simulate("focus");
        wrapper.update().find(DateInput).last().find("input").simulate("focus");
        expect(customOnBlur).not.toHaveBeenCalled();
      });

      it("does not fire an onBlur event when focus moves from end to start input", () => {
        wrapper.find(DateInput).last().find("input").simulate("focus");
        wrapper
          .update()
          .find(DateInput)
          .first()
          .find("input")
          .simulate("focus");
        expect(customOnBlur).not.toHaveBeenCalled();
      });
    });

    describe("when the user updates the startDate textbox", () => {
      it("calls the passed in onBlur function with formatted date string and ISO raw value", () => {
        const updatedValue = "15/10/2016";
        const updatedISO = "2016-10-15";
        wrapper
          .find(DateInput)
          .at(0)
          .find("input")
          .simulate("change", { target: { value: updatedValue } });

        wrapper.find(DateInput).at(0).find("input").simulate("blur");

        expect(customOnBlur).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: updatedValue, rawValue: updatedISO },
              { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
            ],
          },
        });
      });

      it("calls the passed in onBlur function with current unformatted input string and null raw value", () => {
        const updatedValue = "foo";
        const updatedISO = null;
        wrapper
          .find(DateInput)
          .at(0)
          .find("input")
          .simulate("change", { target: { value: updatedValue } });

        wrapper.find(DateInput).at(0).find("input").simulate("blur");

        expect(customOnBlur).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: updatedValue, rawValue: updatedISO },
              { formattedValue: "11/11/2016", rawValue: "2016-11-11" },
            ],
          },
        });
      });
    });

    describe("when the user updates the endDate textbox", () => {
      it("calls the passed in onBlur function", () => {
        const updatedValue = "15/10/2016";
        const updatedISO = "2016-10-15";
        wrapper
          .find(DateInput)
          .at(1)
          .find("input")
          .simulate("change", { target: { value: updatedValue } });

        wrapper.find(DateInput).at(1).find("input").simulate("blur");

        expect(customOnBlur).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
              { formattedValue: updatedValue, rawValue: updatedISO },
            ],
          },
        });
      });

      it("calls the passed in onBlur function with current unformatted input string and null raw value", () => {
        const updatedValue = "foo";
        const updatedISO = null;
        wrapper
          .find(DateInput)
          .at(1)
          .find("input")
          .simulate("change", { target: { value: updatedValue } });

        wrapper.find(DateInput).at(1).find("input").simulate("blur");

        expect(customOnBlur).toHaveBeenCalledWith({
          target: {
            id: "bar",
            name: "foo",
            value: [
              { formattedValue: "10/10/2016", rawValue: "2016-10-10" },
              { formattedValue: updatedValue, rawValue: updatedISO },
            ],
          },
        });
      });
    });

    describe("when allowEmptyValue props are true for both inputs and initial values are empty", () => {
      it("emits the rawValue as an empty string", () => {
        wrapper = renderDateRange({
          value: ["", ""],
          onChange: customOnChange,
          startDateProps: { allowEmptyValue: true },
          endDateProps: { allowEmptyValue: true },
        });

        wrapper
          .update()
          .find(DateInput)
          .at(0)
          .find("input")
          .simulate("change", { target: { value: "" } });

        simulateBlurOnInput(wrapper, "start");

        expect(customOnChange).toHaveBeenCalledWith({
          target: {
            value: [
              { formattedValue: "", rawValue: "" },
              { formattedValue: "", rawValue: "" },
            ],
          },
        });
      });
    });
  });

  describe("blocking blur", () => {
    let container: HTMLElement | null;
    const tabKey = new KeyboardEvent("keydown", { key: "Tab" });
    const shiftTabKey = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
    });
    const randomKey = new KeyboardEvent("keydown", { key: " " });

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      customOnChange = jest.fn();
      customOnBlur = jest.fn();

      wrapper = renderDateRange({
        onChange: customOnChange,
        onBlur: customOnBlur,
        value: initialValues,
        name: "foo",
        id: "bar",
      });
    });

    afterEach(() => {
      customOnBlur.mockClear();

      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    describe("when the first input is focused", () => {
      it("prevents the onBlur callback from being called when tab key press detected", () => {
        act(() => {
          simulateFocusOnInput(wrapper, "start");
        });
        wrapper.update();
        act(() => {
          wrapper?.find(DateInput)?.at(0)?.prop("onKeyDown")?.(
            (tabKey as unknown) as React.KeyboardEvent<HTMLInputElement>
          );
        });
        wrapper.update();
        simulateBlurOnInput(wrapper, "start");

        expect(customOnBlur).not.toHaveBeenCalled();
      });

      it("allows the onBlur callback to be called when tab and shift key press detected", () => {
        act(() => {
          simulateFocusOnInput(wrapper, "start");
        });
        wrapper.update();
        act(() => {
          wrapper
            ?.find(DateInput)
            ?.at(0)
            ?.props()
            .onKeyDown?.(
              (shiftTabKey as unknown) as React.KeyboardEvent<HTMLInputElement>
            );
        });
        wrapper.update();
        simulateBlurOnInput(wrapper, "start");

        expect(customOnBlur).toHaveBeenCalled();
      });

      it("allows the onBlur callback to be called when random key press detected", () => {
        act(() => {
          simulateFocusOnInput(wrapper, "start");
        });
        wrapper.update();
        act(() => {
          wrapper?.find(DateInput)?.at(0)?.prop("onKeyDown")?.(
            (randomKey as unknown) as React.KeyboardEvent<HTMLInputElement>
          );
        }); // for coverage
        wrapper.update();
        simulateBlurOnInput(wrapper, "start");

        expect(customOnBlur).toHaveBeenCalled();
      });
    });

    describe("when the last input is focused", () => {
      it("allows the onBlur callback to be called when tab key press detected", () => {
        act(() => {
          simulateFocusOnInput(wrapper, "end");
        });
        wrapper.update();
        act(() => {
          wrapper?.find(DateInput)?.at(1)?.prop("onKeyDown")?.(
            (tabKey as unknown) as React.KeyboardEvent<HTMLInputElement>
          );
        });
        wrapper.update();
        simulateBlurOnInput(wrapper, "end");

        expect(customOnBlur).toHaveBeenCalled();
      });

      it("prevents the onBlur callback from being called when tab and shift key press detected", () => {
        act(() => {
          simulateFocusOnInput(wrapper, "end");
        });
        wrapper.update();
        act(() => {
          wrapper?.find(DateInput)?.at(1)?.prop("onKeyDown")?.(
            (shiftTabKey as unknown) as React.KeyboardEvent<HTMLInputElement>
          );
        });
        wrapper.update();
        simulateBlurOnInput(wrapper, "end");

        expect(customOnBlur).not.toHaveBeenCalled();
      });
    });
  });

  describe("startValue", () => {
    it("sets the value prop on the first input", () => {
      expect(wrapper.find(DateInput).first().prop("value")).toEqual(
        "10/10/2016"
      );
    });
  });

  describe("endValue", () => {
    it("sets the value prop on the last input", () => {
      expect(wrapper.find(DateInput).last().prop("value")).toEqual(
        "11/11/2016"
      );
    });
  });

  describe("focusing the start input", () => {
    it("closes the other datepicker", () => {
      simulateFocusOnInput(wrapper, "end");
      expect(
        wrapper.update().find(DateInput).last().find(DayPicker).exists()
      ).toBeTruthy();

      simulateFocusOnInput(wrapper, "start");

      expect(
        wrapper.update().find(DateInput).last().find(DayPicker).exists()
      ).toBeFalsy();
    });
  });

  describe("focusing the end input", () => {
    it("closes the other datepicker", () => {
      simulateFocusOnInput(wrapper, "start");
      expect(
        wrapper.update().find(DateInput).first().find(DayPicker).exists()
      ).toBeTruthy();

      simulateFocusOnInput(wrapper, "end");
      expect(
        wrapper.update().find(DateInput).first().find(DayPicker).exists()
      ).toBeFalsy();
    });
  });

  describe("render", () => {
    beforeEach(() => {
      customOnChange = jest.fn();
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { label: "From" },
        endDateProps: { label: "To" },
      });
    });

    it("renders 2 date components", () => {
      expect(wrapper.find(DateInput).length).toEqual(2);
    });

    it("renders optional labels inline", () => {
      expect(wrapper.find(DateInput).at(0).props().label).toEqual("From");
      expect(wrapper.find(DateInput).at(1).props().label).toEqual("To");
    });
  });

  describe("start and end date props", () => {
    it("dates are enabled by default", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: initialValues,
      });

      expect(wrapper.find(DateInput).at(0).props().disabled).toBeUndefined();
      expect(wrapper.find(DateInput).at(1).props().disabled).toBeUndefined();
    });

    it("dates can be disabled by passing startDateProps and endDateProps to DateRange", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { disabled: true },
        endDateProps: { disabled: true },
        value: initialValues,
      });

      expect(wrapper.find(DateInput).at(0).props().disabled).toEqual(true);
      expect(wrapper.find(DateInput).at(1).props().disabled).toEqual(true);
    });

    it("date values can be set via startDateProps and endDateProps", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { value: "2016-10-10" },
        endDateProps: { value: "2016-11-11" },
        value: ["", ""],
      });

      expect(wrapper.find(DateInput).at(0).props().value).toEqual("2016-10-10");
      expect(wrapper.find(DateInput).at(1).props().value).toEqual("2016-11-11");
    });

    it("value prop is retained for backward compatibility", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: ["2015-10-10", "2015-11-11"],
      });

      expect(wrapper.find(DateInput).at(0).props().value).toEqual("10/10/2015");
      expect(wrapper.find(DateInput).at(1).props().value).toEqual("11/11/2015");
    });

    it("value prop is overriden by startDateProps.value and endDateProps.value", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { value: initialValues[0] },
        endDateProps: { value: initialValues[1] },
      });

      expect(wrapper.find(DateInput).at(0).props().value).toEqual("10/10/2016");
      expect(wrapper.find(DateInput).at(1).props().value).toEqual("11/11/2016");
    });

    it("supports value update dynamically at runtime", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: initialValues,
      });
      wrapper.setProps({ value: updatedValues });
      wrapper.update();

      expect(wrapper.find(DateInput).at(0).props().value).toEqual("12/12/2012");
      expect(wrapper.find(DateInput).at(1).props().value).toEqual("13/12/2012");
    });

    it("supports value update dynamically at runtime to empty values", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        value: initialValues,
      });
      wrapper.setProps({ value: ["", ""] });
      wrapper.update();

      expect(wrapper.find(DateInput).at(0).props().value).toEqual("");
      expect(wrapper.find(DateInput).at(1).props().value).toEqual("");
    });

    it("class names can be added to dates by passing startDateProps and endDateProps to DateRange", () => {
      wrapper = renderDateRange({
        onChange: customOnChange,
        startDateProps: { className: "custom-start-class" },
        endDateProps: { className: "custom-end-class" },
      });

      expect(wrapper.find(DateInput).at(0).props().className).toEqual(
        "custom-start-class"
      );
      expect(wrapper.find(DateInput).at(1).props().className).toEqual(
        "custom-end-class"
      );
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper.childAt(0), "date-range", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      customOnChange = jest.fn();
      wrapper = renderDateRange({ onChange: customOnChange });

      it(`include 'data-element="start-date"'`, () => {
        expect(
          wrapper.find('DateInput[data-element="start-date"]').exists()
        ).toBeTruthy();
      });

      it(`include 'data-element="end-date"'`, () => {
        expect(
          wrapper.find('DateInput[data-element="end-date"]').exists()
        ).toBeTruthy();
      });
    });
  });

  describe("ref props", () => {
    describe("startRef", () => {
      it("accepts as a ref object", () => {
        const ref = { current: null };
        wrapper = renderDateRange({ startRef: ref });

        expect(ref.current).toBe(wrapper.find("input").at(0).getDOMNode());
      });

      it("accepts as a ref callback", () => {
        const ref = jest.fn();
        wrapper = renderDateRange({ startRef: ref });

        expect(ref).toHaveBeenCalledWith(
          wrapper.find("input").at(0).getDOMNode()
        );
      });

      it("sets ref to empty after unmount", () => {
        const ref = { current: null };
        wrapper = renderDateRange({ startRef: ref });

        wrapper.unmount();

        expect(ref.current).toBe(null);
      });
    });

    describe("endRef", () => {
      it("accepts as a ref object", () => {
        const ref = { current: null };
        wrapper = renderDateRange({ endRef: ref });

        expect(ref.current).toBe(wrapper.find("input").at(1).getDOMNode());
      });

      it("accepts as a ref callback", () => {
        const ref = jest.fn();
        wrapper = renderDateRange({ endRef: ref });

        expect(ref).toHaveBeenCalledWith(
          wrapper.find("input").at(1).getDOMNode()
        );
      });

      it("sets ref to empty after unmount", () => {
        const ref = { current: null };
        wrapper = renderDateRange({ endRef: ref });

        wrapper.unmount();

        expect(ref.current).toBe(null);
      });
    });
  });
});

describe("StyledDateRange", () => {
  it("render Date inputs with spacing between each other", () => {
    const wrapper = renderDateRange({});
    assertStyleMatch({ marginRight: "var(--spacing300)" }, wrapper, {
      modifier: `& ${StyledDateInput}:first-of-type`,
    });
  });

  it("renders Date inputs correctly when the labels are inline", () => {
    const wrapper = mount(
      <StyledDateRange labelsInline>
        <StyledDateInput />
      </StyledDateRange>
    );

    assertStyleMatch({ verticalAlign: "top" }, wrapper, {
      modifier: `& ${StyledDateInput}`,
    });
  });

  it("renders Date inputs correctly when the labels are not inline", () => {
    const wrapper = mount(
      <StyledDateRange>
        <StyledDateInput />
      </StyledDateRange>
    );

    assertStyleMatch({ verticalAlign: "bottom" }, wrapper, {
      modifier: `& ${StyledDateInput}`,
    });
  });

  describe("tooltipPosition", () => {
    it("overrides the default value when icon is on input", () => {
      const { position } = renderDateRange({
        startError: "message",
        tooltipPosition: "top",
      })
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });

    it("overrides the default value when icon is on label", () => {
      const { position } = renderDateRange({
        startLabel: "start",
        endLabel: "end",
        validationOnLabel: true,
        startError: "message",
        tooltipPosition: "top",
      })
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });
  });

  describe("validation layout", () => {
    it.each<DateInputProps["size"]>(["small", "medium", "large"])(
      "sets the maxWidth of the %s Date input wrappers to the expected value",
      (size) => {
        const maxWidth =
          datePickerWidths[size as keyof typeof datePickerWidths];

        const dateInputs = mount(
          <DateRange
            value={["", ""]}
            onChange={() => {}}
            startDateProps={{ size }}
            endDateProps={{ size }}
          />
        ).find(DateInput);

        dateInputs.forEach((dateInput) => {
          assertStyleMatch({ maxWidth }, dateInput, {
            modifier: `${FieldLineStyle}`,
          });
          assertStyleMatch({ overflowWrap: "anywhere" }, dateInput, {
            modifier: `${StyledValidationMessage}`,
          });
          assertStyleMatch({ overflowWrap: "anywhere" }, dateInput, {
            modifier: `${StyledLabel}`,
          });
        });
      }
    );
  });

  it("should set the required attribute on both inputs when prop is true", () => {
    const dateInputs = mount(
      <DateRange value={["", ""]} onChange={() => {}} required />
    ).find("input");

    expect(dateInputs.first().getDOMNode()).toHaveAttribute("required", "");
    expect(dateInputs.last().getDOMNode()).toHaveAttribute("required", "");
  });

  it("should set the required styling on both input labels when prop is true", () => {
    const labels = mount(
      <DateRange
        value={["", ""]}
        onChange={() => {}}
        required
        startLabel="Start"
        endLabel="End"
      />
    ).find(StyledLabel);

    assertStyleMatch(
      {
        content: '"*"',
        color: "var(--colorsSemanticNegative500)",
        fontWeight: "var(--fontWeights700)",
        marginLeft: "var(--spacing050)",
      },
      labels.first(),
      { modifier: "::after" }
    );

    assertStyleMatch(
      {
        content: '"*"',
        color: "var(--colorsSemanticNegative500)",
        fontWeight: "var(--fontWeights700)",
        marginLeft: "var(--spacing050)",
      },
      labels.last(),
      { modifier: "::after" }
    );
  });

  it("should set the isOptional styling on both input labels when prop is true", () => {
    const labels = mount(
      <DateRange
        value={["", ""]}
        onChange={() => {}}
        isOptional
        startLabel="Start"
        endLabel="End"
      />
    ).find(StyledLabelContainer);

    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      labels.first(),
      { modifier: "::after" }
    );

    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      labels.last(),
      { modifier: "::after" }
    );
  });

  describe("tags", () => {
    it("has the expected data attributes", () => {
      const wrapper = mount(
        <DateRange
          value={["", ""]}
          onChange={() => {}}
          data-element="bar"
          data-role="baz"
        />
      ).find(StyledDateRange);
      rootTagTest(wrapper, "date-range", "bar", "baz");
    });
  });
});
