import i18n from "i18next";
import moment from "moment";
import MockDate from "mockdate";
import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import DayPicker from "react-day-picker";

import I18next from "../../../__spec_helper__/I18next";
import Portal from "../../../components/portal/portal";
import DatePicker from "./date-picker.component";
import StyledDayPicker from "./day-picker.style";

const inputElement = {
  value: "12-12-2012",
  getBoundingClientRect: () => ({ left: 0, bottom: 0 }),
};
const firstDate = "2019-02-02";
const secondDate = "2019-02-08";
const invalidDate = "2019-02-";
const noDate = "";
const currentDate = moment().toDate();

jest.mock("../../../components/portal/portal", () => {
  const React = require("react"); // eslint-disable-line no-shadow, global-require
  const PropTypes = require("prop-types"); // eslint-disable-line global-require

  const MockPortal = ({ children }) => {
    return <div data-element="mock-portal">{children}</div>;
  };

  MockPortal.propTypes = {
    children: PropTypes.node,
  };

  return MockPortal;
});

describe("DatePicker", () => {
  let wrapper;

  describe('when rendered with an "inputElement" prop', () => {
    beforeEach(() => {
      wrapper = render(
        { selectedDate: currentDate, inputElement, inputDate: firstDate },
        mount
      );
    });

    it('by default should render a "DayPicker" component inside a "Portal"', () => {
      expect(wrapper.find(Portal).find(DayPicker).exists()).toBe(true);
    });

    it('should not render a "Portal" when disablePortal prop is passed', () => {
      wrapper.setProps({ disablePortal: true });
      expect(wrapper.find(Portal).exists()).toBe(false);
    });
  });

  describe('when rendered with "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render(
        { inputElement, minDate: firstDate, inputDate: firstDate },
        mount
      );
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
      wrapper = render(
        { inputElement, minDate: invalidDate, inputDate: invalidDate },
        mount
      );
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an empty array`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual([]);
    });
  });

  describe('when rendered with blank "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render(
        { inputElement, minDate: noDate, inputDate: noDate },
        mount
      );
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing a null value`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(null);
    });
  });

  describe('when rendered with "maxDate" prop', () => {
    beforeEach(() => {
      wrapper = render(
        { inputElement, maxDate: secondDate, inputDate: firstDate },
        mount
      );
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
          inputElement,
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
          inputElement,
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
      wrapper = render({ inputElement, inputDate: firstDate }, mount);
      jest.resetAllMocks();
    });
    describe("and provided date is valid", () => {
      it('then "showMonth" method on the "DayPicker" should have been called with the same date', () => {
        const dayPicker = wrapper.find(DayPicker).instance();
        const showMonthSpy = spyOn(dayPicker, "showMonth");
        act(() => {
          wrapper.setProps({ inputDate: secondDate });
          global.innerWidth = 100;
          global.innerHeight = 100;

          // Trigger the window resize event.
          global.dispatchEvent(new Event("resize"));
        });

        expect(showMonthSpy).toHaveBeenCalledWith(new Date(secondDate));
      });
    });

    describe("and provided date is invalid", () => {
      it('then "showMonth" method on the "DayPicker" should have been called with previous valid date', () => {
        const dayPicker = wrapper.find(DayPicker).instance();
        const showMonthSpy = spyOn(dayPicker, "showMonth");
        act(() => {
          wrapper.setProps({ inputDate: "12/42/3213" });
          global.innerWidth = 100;
          global.innerHeight = 100;

          // Trigger the window resize event.
          global.dispatchEvent(new Event("resize"));
        });

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
    const locale = i18n.language;

    beforeAll(() => {
      i18n.changeLanguage("fr");
    });

    afterAll(() => {
      i18n.changeLanguage(locale);
    });

    describe("translation", () => {
      it("renders properly", () => {
        const wrapper = render(
          {
            inputElement,
            inputDate: firstDate,
            selectedDate: new Date("2019-04-01"),
          },
          TestRenderer.create
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

const RenderWrapper = (props) => (
  <I18next>
    <DatePicker {...props} />
  </I18next>
);

function render(props, renderer = shallow) {
  return renderer(<RenderWrapper {...props} />);
}

function renderStyledDayPicker(props) {
  return TestRenderer.create(<StyledDayPicker {...props} />);
}
