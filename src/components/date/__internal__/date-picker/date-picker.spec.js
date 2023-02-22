import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import DayPicker from "react-day-picker";
import { utcToZonedTime } from "date-fns-tz";
import {
  // eslint-disable-next-line import/named
  de as deLocale,
  // eslint-disable-next-line import/named
  es as esLocale,
  // eslint-disable-next-line import/named
  enCA as enCALocale,
  // eslint-disable-next-line import/named
  enGB as enGBLocale,
  // eslint-disable-next-line import/named
  enZA as enZALocale,
  // eslint-disable-next-line import/named
  fr as frLocale,
  // eslint-disable-next-line import/named
  frCA as frCALocale,
  // eslint-disable-next-line import/named
  enUS as enUSLocale,
} from "../../../../locales/date-fns-locales";

import DatePicker from "./date-picker.component";
import StyledDayPicker from "./day-picker.style";
import Popover from "../../../../__internal__/popover";
import I18nProvider from "../../../i18n-provider";
import Weekday from "../weekday/weekday.component";

const timeZone = "Europe/London";

const getZonedDate = (date) => utcToZonedTime(new Date(date), timeZone);

const firstDate = "2019-02-02";
const secondDate = "2019-02-08";
const invalidDate = "2019-02-";
const noDate = "";
const currentDate = new Date(Date.now());

describe("DatePicker", () => {
  let wrapper;

  describe('when rendered with an "inputElement" prop', () => {
    describe("popover", () => {
      it("renders a DayPicker inside of a Popover", () => {
        wrapper = render({ selectedDays: currentDate });

        expect(wrapper.find(Popover).find(DayPicker).exists()).toBe(true);
      });

      it("should have the correct overhang", () => {
        wrapper = render({ selectedDays: currentDate });

        expect(wrapper.find(Popover).props().middleware[0]).toMatchObject({
          name: "offset",
          options: 3,
        });
      });
    });
  });

  describe('when rendered with "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: firstDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with "before" property`, () => {
      const disabledDays = [{ before: getZonedDate(firstDate) }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when rendered with invalid "minDate" length prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: invalidDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an empty array`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual([]);
    });
  });

  describe('when rendered with blank "minDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ minDate: noDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing a null value`, () => {
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(null);
    });
  });

  describe('when rendered with "maxDate" prop', () => {
    beforeEach(() => {
      wrapper = render({ maxDate: secondDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with "after" property`, () => {
      const disabledDays = [{ after: getZonedDate(secondDate) }];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when rendered with both "minDate" and "maxDate" props', () => {
    beforeEach(() => {
      wrapper = render({ minDate: firstDate, maxDate: secondDate });
    });

    it(`should pass to the "DayPicker" component the "disabledDays"
        prop containing an object with both "before" and "after" properties`, () => {
      const disabledDays = [
        { before: getZonedDate(firstDate) },
        { after: getZonedDate(secondDate) },
      ];
      expect(wrapper.find(DayPicker).props().disabledDays).toEqual(
        disabledDays
      );
    });
  });

  describe('when the "onDayClick" prop have been triggered', () => {
    let onDayClickFn;

    beforeEach(() => {
      onDayClickFn = jest.fn();
      wrapper = render({ selectedDays: currentDate, onDayClick: onDayClickFn });
    });

    describe("without a disabled modifier", () => {
      it('then "onDayClick" prop should have been called with the same date and event target composition', () => {
        const date = new Date(firstDate);
        act(() => {
          wrapper.find(DayPicker).prop("onDayClick")(date, {}, { target: {} });
        });

        expect(onDayClickFn).toHaveBeenCalledWith(date, {
          target: { id: "bar", name: "foo" },
        });
      });
    });

    describe("with a disabled modifier", () => {
      it('then "onDayClick" prop should not have been called', () => {
        const date = new Date(firstDate);
        act(() => {
          wrapper.find(DayPicker).prop("onDayClick")(
            date,
            { disabled: true },
            { target: {} }
          );
        });
        expect(onDayClickFn).not.toHaveBeenCalled();
      });
    });
  });
});

describe("StyledDayPicker", () => {
  it("renders presentational div and context provider for its children", () => {
    expect(TestRenderer.create(<StyledDayPicker />)).toMatchSnapshot();
  });

  describe("i18n", () => {
    let wrapper;
    const translations = {
      "en-GB": enGBLocale,
      "de-DE": deLocale,
      es: esLocale,
      "en-ZA": enZALocale,
      "fr-FR": frLocale,
      "fr-CA": frCALocale,
      "en-US": enUSLocale,
      "en-CA": enCALocale,
    };

    const buildLocale = (l) => ({
      locale: () => l,
      date: { dateFnsLocale: () => translations[l] },
    });

    const weekdays = (l) => {
      const array =
        translations[l].options.weekStartsOn === 0
          ? [0, 1, 2, 3, 4, 5, 6]
          : [1, 2, 3, 4, 5, 6, 0];

      return array.reduce((acc, d) => {
        if (!acc.long) acc.long = [];
        if (!acc.short) acc.short = [];

        acc.long.push(translations[l].localize.day(d));
        acc.short.push(
          translations[l].localize
            .day(d, { width: "abbreviated" })
            .substring(0, 3)
        );

        return acc;
      }, {});
    };

    const monthsArray = (l) =>
      Array.from({ length: 12 }).map((_, i) => {
        const month = translations[l].localize.month(i);
        return month[0].toUpperCase() + month.slice(1);
      });

    beforeEach(() => {
      wrapper = renderI18n({
        selectedDays: new Date("2019-04-01"),
      });
    });

    describe.each([
      "en-GB",
      "de-DE",
      "es",
      "en-ZA",
      "fr-FR",
      "fr-CA",
      "en-US",
      "en-CA",
    ])("%s locale", (locale) => {
      it("renders properly", () => {
        expect(wrapper.find(DayPicker).props().locale).toBe("en-GB");
        wrapper.setProps({
          locale: buildLocale(locale),
        });
        expect(wrapper.find(DayPicker).props().locale).toBe(locale);
      });

      it("sets the correct translations for weekdays", () => {
        wrapper = renderI18n({
          selectedDays: new Date("2019-04-01"),
          locale: buildLocale(locale),
        });

        const weekdayElements = wrapper
          .find(DatePicker)
          .find(Weekday)
          .find("abbr");
        const days = weekdays(locale);

        weekdayElements.forEach((el, i) => {
          const { title, children } = el.props();
          const { long, short } = days;

          expect(title).toEqual(long[i]);
          expect(children).toEqual(
            locale === "de-DE" ? long[i].substring(0, 2) : short[i]
          );
        });
      });

      it("passes the correct translations for months to DayPicker", () => {
        wrapper = renderI18n({
          selectedDays: new Date("2019-04-01"),
          locale: buildLocale(locale),
        });

        const { months } = wrapper.find(DayPicker).props();
        expect(
          monthsArray(locale).every((month, i) => month === months[i])
        ).toEqual(true);
      });
    });
  });

  it("does not render the picker if open prop is false", () => {
    expect(render({ open: false }).find(StyledDayPicker).exists()).toBeFalsy();
  });
});

const MockComponent = (props) => {
  const ref = React.useRef();
  const Input = () => (
    <div ref={ref}>
      <input name="foo" id="bar" />
    </div>
  );
  return (
    <>
      <Input />
      <DatePicker inputElement={ref} {...props} />
    </>
  );
};

function renderI18n({ locale, ...props }) {
  return mount(
    <I18nProvider locale={locale}>
      <MockComponent open {...props} />
    </I18nProvider>
  );
}

function render(props, params) {
  return mount(<MockComponent open {...props} />, params);
}
