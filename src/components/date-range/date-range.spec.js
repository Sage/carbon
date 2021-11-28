import React from "react";
import { shallow, mount } from "enzyme";
import MockDate from "mockdate";
import DateRange from "./date-range.component";
import Textbox from "../textbox/textbox.component";
import DateInput, { BaseDateInput } from "../date";
import DatePicker from "../date/date-picker.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledDateRange from "./date-range.style";
import StyledDateInput from "../date/date.style";
import Tooltip from "../tooltip";

jest.useFakeTimers();

describe("DateRange", () => {
  let wrapper;
  let startInput;
  let endInput;
  let customOnChange;
  let customOnBlur;

  beforeEach(() => {
    customOnChange = jest.fn();
    customOnBlur = jest.fn();

    wrapper = renderDateRange(
      {
        onChange: customOnChange,
        onBlur: customOnBlur,
        value: ["2016-10-10", "2016-11-11"],
        "data-element": "bar",
        "data-role": "baz",
        name: "foo",
        id: "bar",
      },
      mount
    );
    startInput = wrapper.find(BaseDateInput).at(0);
    endInput = wrapper.find(BaseDateInput).at(1);
  });

  testStyledSystemMargin((props) => (
    <DateRange value={["2016-10-10", "2016-11-11"]} {...props} />
  ));

  describe("onChange", () => {
    describe("when the start date changes", () => {
      it("calls the passed in onChange function", () => {
        wrapper
          .find(BaseDateInput)
          .at(0)
          .find("input")
          .findWhere((n) => n.props().type !== "hidden")
          .simulate("change", { target: { value: "2016-10-15" } });
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
    });

    describe("when the end date changes", () => {
      it("calls the passed in onChange function", () => {
        wrapper
          .find(BaseDateInput)
          .at(1)
          .find("input")
          .findWhere((n) => n.props().type !== "hidden")
          .simulate("change", { target: { value: "2016-11-16" } });

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

      describe("when no onChange prop is passed in", () => {
        it("it does not call the passed in onChange function", () => {
          wrapper.setProps({ onChange: undefined });
          wrapper
            .find(BaseDateInput)
            .at(0)
            .find("input")
            .findWhere((n) => n.props().type !== "hidden")
            .simulate("change", { target: { value: "2016-11-16" } });
        });
      });

      describe("when no onBlur prop is passed in", () => {
        it("it does not call the passed in onChange function", () => {
          wrapper.setProps({ onBlur: undefined });
          wrapper.find(DateInput).first().props().onBlur();
        });
      });
    });

    describe("when the user interacts with a date input", () => {
      it("does not fire an onBlur event when the startDate is focused", () => {
        wrapper.find(DateInput).first().props().onFocus();
        wrapper.find(DateInput).first().props().onBlur();
        expect(customOnBlur).not.toHaveBeenCalled();
      });

      it("does not fire an onBlur event when the endDate is focused", () => {
        wrapper.find(DateInput).last().props().onFocus();
        wrapper.find(DateInput).last().props().onBlur();
        expect(customOnBlur).not.toHaveBeenCalled();
      });
    });

    describe("when the user updates the startDate textbox", () => {
      it("calls the passed in onBlur function", () => {
        wrapper
          .find(BaseDateInput)
          .at(0)
          .find("input")
          .findWhere((n) => n.props().type !== "hidden")
          .simulate("blur", { target: { value: "2016-10-15" } });
        jest.runAllTimers();
        expect(customOnBlur).toHaveBeenCalled();
      });
    });

    describe("when the user updates the endDate textbox", () => {
      it("calls the passed in onBlur function", () => {
        wrapper
          .find(BaseDateInput)
          .at(1)
          .find("input")
          .findWhere((n) => n.props().type !== "hidden")
          .simulate("blur", { target: { value: "2016-10-15" } });
        jest.runAllTimers();
        expect(customOnBlur).toHaveBeenCalled();
      });
    });
  });

  describe("startValue", () => {
    it("sets the value prop on the first input", () => {
      expect(wrapper.find(DateInput).first().prop("value")).toEqual(
        "2016-10-10"
      );
    });
  });

  describe("endValue", () => {
    it("sets the value prop on the last input", () => {
      expect(wrapper.find(DateInput).last().prop("value")).toEqual(
        "2016-11-11"
      );
    });
  });

  describe("focusStart", () => {
    it("closes the other datepicker", () => {
      simulateFocusOnInput(wrapper.find(DateInput).last());
      expect(
        wrapper.update().find(DateInput).last().find(DatePicker).exists()
      ).toBeTruthy();

      wrapper.find(DateInput).first().props().onFocus();
      expect(
        wrapper.update().find(DateInput).last().find(DatePicker).exists()
      ).toBeFalsy();
    });
  });

  describe("endDate", () => {
    it("closes the other datepicker", () => {
      simulateFocusOnInput(wrapper.find(DateInput).first());
      expect(
        wrapper.update().find(DateInput).first().find(DatePicker).exists()
      ).toBeTruthy();

      wrapper.find(DateInput).last().props().onFocus();
      expect(
        wrapper.update().find(DateInput).first().find(DatePicker).exists()
      ).toBeFalsy();
    });
  });

  describe("render", () => {
    beforeEach(() => {
      customOnChange = jest.fn();
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          startDateProps: { label: "From" },
          endDateProps: { label: "To" },
        },
        mount
      );

      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
    });

    it("renders 2 date components", () => {
      expect(wrapper.find(BaseDateInput).length).toEqual(2);
    });

    it("renders optional labels inline", () => {
      expect(startInput.props().label).toEqual("From");
      expect(endInput.props().label).toEqual("To");
    });
  });

  describe("start and end date props", () => {
    it("dates are enabled by default", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          value: ["2016-10-10", "2016-11-11"],
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().disabled).toBeUndefined();
      expect(endInput.props().disabled).toBeUndefined();
    });

    it("dates can be disabled by passing startDateProps and endDateProps to DateRange", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          startDateProps: { disabled: true },
          endDateProps: { disabled: true },
          value: [],
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().disabled).toEqual(true);
      expect(endInput.props().disabled).toEqual(true);
    });

    it("Date values can be set via startDateProps and endDateProps", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          startDateProps: { value: "2016-10-10" },
          endDateProps: { value: "2016-11-11" },
          value: [],
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual("2016-10-10");
      expect(endInput.props().value).toEqual("2016-11-11");
    });

    it("value prop is retained for backward compatibility", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          value: ["2015-10-10", "2015-11-11"],
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual("2015-10-10");
      expect(endInput.props().value).toEqual("2015-11-11");
    });

    it("value prop is overriden by startDateProps.value and endDateProps.value", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          startDateProps: { value: "2016-10-10" },
          endDateProps: { value: "2016-11-11" },
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual("2016-10-10");
      expect(endInput.props().value).toEqual("2016-11-11");
    });

    it("supports value update dynamically at runtime", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          value: ["2012-12-12", "2012-12-13"],
        },
        mount
      );
      wrapper.setProps({ value: ["2016-10-10", "2016-11-11"] });
      wrapper.update();
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual("2016-10-10");
      expect(endInput.props().value).toEqual("2016-11-11");
    });

    it("supports value update dynamically at runtime and defaults to today if new value is undefined", () => {
      MockDate.set("2020-01-21");
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          value: ["2012-12-12", "2012-12-13"],
        },
        mount
      );
      wrapper.setProps({ value: [] });
      wrapper.update();
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().value).toEqual("2020-01-21");
      expect(endInput.props().value).toEqual("2020-01-21");
    });

    it("class names can be added to dates by passing startDateProps and endDateProps to DateRange", () => {
      wrapper = renderDateRange(
        {
          onChange: customOnChange,
          startDateProps: { className: "custom-start-class" },
          endDateProps: { className: "custom-end-class" },
        },
        mount
      );
      startInput = wrapper.find(BaseDateInput).at(0);
      endInput = wrapper.find(BaseDateInput).at(1);
      expect(startInput.props().className).toEqual("custom-start-class");
      expect(endInput.props().className).toEqual("custom-end-class");
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
      wrapper = renderDateRange({ onChange: customOnChange }, shallow);

      it(`include 'data-element="start-date"'`, () => {
        expect(
          wrapper.find('DateInput[data-element="start-date"]').exists()
        ).toBeTruthy();
      });

      it(`include 'data-element="start-date"'`, () => {
        expect(
          wrapper.find('DateInput[data-element="end-date"]').exists()
        ).toBeTruthy();
      });
    });
  });
});

describe("DateRange Uncontrolled behaviour", () => {
  const mockedTodayDate = "2019-04-01";

  beforeAll(() => {
    MockDate.set(mockedTodayDate);
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("renders the correct default value when defaultValue prop passed", () => {
    const defaultValue = ["2019-02-01", "2019-02-02"];
    const wrapper = renderDateRange({ value: undefined, defaultValue }, mount);

    expect(wrapper.find(Textbox).at(0).prop("rawValue")).toBe(defaultValue[0]);
    expect(wrapper.find(Textbox).at(1).prop("rawValue")).toBe(defaultValue[1]);
  });

  it("input values of both Date Inputs defaults to today date if none provided", () => {
    const wrapper = renderDateRange({ value: undefined }, mount);
    expect(wrapper.find(Textbox).at(0).prop("rawValue")).toBe(mockedTodayDate);
    expect(wrapper.find(Textbox).at(1).prop("rawValue")).toBe(mockedTodayDate);
  });

  it("input values of both Date Inputs defaults to empty date if none provided and allowEmptyValue is passed to endDate and startDate", () => {
    const wrapper = renderDateRange(
      {
        value: ["", ""],
        startDateProps: {
          allowEmptyValue: true,
        },
        endDateProps: {
          allowEmptyValue: true,
        },
      },
      mount
    );
    expect(wrapper.find(Textbox).at(0).prop("rawValue")).toBe("");
    expect(wrapper.find(Textbox).at(1).prop("rawValue")).toBe("");
  });
});

describe("StyledDateRange", () => {
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
      const { position } = renderDateRange(
        { startError: "message", tooltipPosition: "top" },
        mount
      )
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });

    it("overrides the default value when icon is on label", () => {
      const { position } = renderDateRange(
        {
          startLabel: "start",
          endLabel: "end",
          validationOnLabel: true,
          startError: "message",
          tooltipPosition: "top",
        },
        mount
      )
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });
  });
});

function renderDateRange(props, renderer = shallow) {
  return renderer(
    <DateRange value={["2016-10-10", "2016-11-11"]} {...props} />
  );
}

function simulateFocusOnInput(container) {
  const input = container
    .find("input")
    .findWhere((n) => n.props().type !== "hidden");

  input.simulate("focus");
}
