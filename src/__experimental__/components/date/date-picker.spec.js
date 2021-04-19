import I18n from "i18n-js";
import moment from "moment";
import MockDate from "mockdate";
import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import DayPicker from "react-day-picker";

import DatePicker from "./date-picker.component";
import StyledDayPicker from "./day-picker.style";
import Popover from "../../../__internal__/popover";
import { noThemeSnapshot } from "../../../__spec_helper__/enzyme-snapshot-helper";

const inputElement = {
  value: "12-12-2012",
  getBoundingClientRect: () => ({ left: 0, bottom: 0 }),
};
const firstDate = "2019-02-02";
const secondDate = "2019-02-08";
const invalidDate = "2019-02-";
const noDate = "";
const currentDate = moment().toDate();

describe("DatePicker", () => {
  let wrapper;

  describe('when rendered with an "inputElement" prop', () => {
    describe("popover", () => {
      it("renders a DayPicker inside of a Popover", () => {
        wrapper = render(
          { selectedDate: currentDate, inputDate: firstDate },
          mount
        );

        expect(wrapper.find(Popover).find(DayPicker).exists()).toBe(true);
      });

      it("should have the correct overhang", () => {
        wrapper = render(
          { selectedDate: currentDate, inputDate: firstDate },
          mount
        );

        expect(
          wrapper.find(Popover).props().modifiers[0].options.offset
        ).toEqual([-11, 5]);
      });

      describe("when size prop is small", () => {
        it("should have the correct overhang", () => {
          wrapper = render(
            { selectedDate: currentDate, inputDate: firstDate, size: "small" },
            mount
          );

          expect(
            wrapper.find(Popover).props().modifiers[0].options.offset
          ).toEqual([-8, 5]);
        });
      });

      describe("when size prop is large", () => {
        wrapper = render(
          { selectedDate: currentDate, inputDate: firstDate, size: "large" },
          mount
        );

        expect(
          wrapper.find(Popover).props().modifiers[0].options.offset
        ).toEqual([-13, 5]);
      });
    });
  });

  describe('when rendered with "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: firstDate, inputDate: firstDate }, mount);
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with "before" property`, () => {
      const disabledDays = [{ before: moment(firstDate).toDate() }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when rendered with invalid "minDate" length prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: invalidDate, inputDate: invalidDate }, mount);
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an empty array`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual([]);
    });
  });

  describe('when rendered with blank "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: noDate, inputDate: noDate }, mount);
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing a null value`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(null);
    });
  });

  describe('when rendered with "maxDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ maxDate: secondDate, inputDate: firstDate }, mount);
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with "after" property`, () => {
      const disabledDays = [{ after: moment(secondDate).toDate() }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when rendered with both "minDate" and "maxDate" props', () => {
    beforeEach(() => {
      wrapper = render(
        {
          minDate: firstDate,
          maxDate: secondDate,
          inputDate: firstDate,
        },
        mount
      );
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with both "before" and "after" properties`, () => {
      const disabledDays = [
        { before: moment(firstDate).toDate() },
        { after: moment(secondDate).toDate() },
      ];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when the "onDayClick" prop have been triggered', () => {
    let handleDateSelectFn;

    beforeEach(() => {
      handleDateSelectFn = jest.fn();
      wrapper = render(
        {
          selectedDate: currentDate,
          handleDateSelect: handleDateSelectFn,
          inputDate: firstDate,
        },
        mount
      );
    });

    describe("without a disabled modifier", () => {
      it('then "handleDaySelect" prop should have been called with the same date', () => {
        act(() => {
          wrapper.setProps({ selectedDate: moment(firstDate).toDate() });
          wrapper.find(DayPicker).prop("onDayClick")(
            moment(firstDate).toDate(),
            {}
          );
        });

        expect(handleDateSelectFn).toHaveBeenCalledWith(
          moment(firstDate).toDate()
        );
      });
    });

    describe("with a disabled modifier", () => {
      it('then "handleDaySelect" prop should not have been called', () => {
        act(() => {
          wrapper.find(DayPicker).prop("onDayClick")(
            moment(firstDate).toDate(),
            { disabled: true }
          );
        });
        expect(handleDateSelectFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "inputDate" prop have been changed to a different date', () => {
    beforeEach(() => {
      wrapper = render({ inputDate: firstDate }, mount);
    });

    describe("and provided date is valid", () => {
      it('then "showMonth" method on the "DayPicker" should have been called with the same date', () => {
        const dayPicker = wrapper.find(DayPicker).instance();
        const showMonthSpy = spyOn(dayPicker, "showMonth");
        act(() => {
          wrapper.setProps({ inputDate: secondDate });
        });

        wrapper.update();

        expect(showMonthSpy).toHaveBeenCalledWith(new Date(secondDate));
      });
    });

    describe("and provided date is invalid", () => {
      it('then "showMonth" method on the "DayPicker" should have been called with previous valid date', () => {
        const dayPicker = wrapper.find(DayPicker).instance();
        const showMonthSpy = spyOn(dayPicker, "showMonth");
        act(() => {
          wrapper.setProps({ inputDate: "12/42/3213" });
        });

        wrapper.update();

        expect(showMonthSpy).toHaveBeenCalledWith(new Date(firstDate));
      });
    });
  });
});

describe("StyledDayPicker", () => {
  beforeAll(() => {
    MockDate.set("4/3/2019");
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("renders presentational div and context provider for its children", () => {
    expect(renderStyledDayPicker({ value: "2019-04-01" })).toMatchSnapshot();
  });

  describe("i18n", () => {
    const { locale } = I18n;
    beforeAll(() => {
      I18n.locale = "fr";
    });

    afterAll(() => {
      I18n.locale = locale;
    });

    describe("translation", () => {
      it("renders properly", () => {
        const wrapper = render({
          inputDate: firstDate,
          selectedDate: new Date("2019-04-01"),
        });
        expect(noThemeSnapshot(wrapper)).toMatchSnapshot();
      });
    });
  });
});

function render(props, renderer = shallow) {
  return renderer(<DatePicker inputElement={inputElement} {...props} />);
}

function renderStyledDayPicker(props) {
  return TestRenderer.create(<StyledDayPicker {...props} />);
}
