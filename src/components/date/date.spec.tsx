import React, { useState } from "react";
import { ReactWrapper, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import parse from "date-fns/fp/parse";
import {
  de as deLocale,
  es as esLocale,
  enCA as enCALocale,
  enGB as enGBLocale,
  enZA as enZALocale,
  fr as frLocale,
  frCA as frCALocale,
  enUS as enUSLocale,
} from "date-fns/locale";
import DayPicker from "react-day-picker";
import {
  testStyledSystemMargin,
  assertStyleMatch,
} from "../../__spec_helper__/test-utils";
import DateInput, { DateInputProps } from "./date.component";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import DatePicker from "./__internal__/date-picker";
import StyledDayPicker from "./__internal__/date-picker/day-picker.style";
import Textbox from "../textbox";
import StyledDateInput from "./date.style";
import I18nProvider from "../i18n-provider";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import ValidationIcon, {
  ValidationProps,
} from "../../__internal__/validations";
import DateRangeContext from "../date-range/date-range.context";
import StyledButton from "./__internal__/navbar/button.style";
import StyledLabel, {
  StyledLabelContainer,
} from "../../__internal__/label/label.style";

const ariaLabels = {
  nextMonthButton: () => "foo",
  previousMonthButton: () => "foo",
};
const locales = {
  "en-GB": {
    locale: () => "en-GB",
    date: { ariaLabels, dateFnsLocale: () => enGBLocale },
    separator: "/",
  },
  de: {
    locale: () => "de",
    date: { ariaLabels, dateFnsLocale: () => deLocale },
    separator: ".",
  },
  es: {
    locale: () => "es",
    date: { ariaLabels, dateFnsLocale: () => esLocale },
    separator: "/",
  },
  "en-ZA": {
    locale: () => "en-ZA",
    date: { ariaLabels, dateFnsLocale: () => enZALocale },
    separator: "/",
  },
  "fr-FR": {
    locale: () => "fr-FR",
    date: { ariaLabels, dateFnsLocale: () => frLocale },
    separator: "/",
  },
  "fr-CA": {
    locale: () => "fr-CA",
    date: { ariaLabels, dateFnsLocale: () => frCALocale },
    separator: "/",
  },
  "en-US": {
    locale: () => "en-US",
    date: { ariaLabels, dateFnsLocale: () => enUSLocale },
    separator: "/",
  },
  "en-CA": {
    locale: () => "en-CA",
    date: { ariaLabels, dateFnsLocale: () => enCALocale },
    separator: "/",
  },
};

function render(props = {}) {
  return mount(<DateInput value="" onChange={() => {}} {...props} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });
}

function simulateFocusOnInput(wrapper: ReactWrapper) {
  const input = wrapper.find("input");

  act(() => {
    input.simulate("focus");
  });
}

function simulateBlurOnInput(wrapper: ReactWrapper) {
  const input = wrapper.find("input");

  act(() => {
    input.simulate("blur");
  });
}

function simulateClickOnInput(wrapper: ReactWrapper) {
  const input = wrapper.find("input");
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  act(() => {
    input.simulate("click", mockEvent);
  });
}

function simulateMouseDownOnInput(wrapper: ReactWrapper) {
  const input = wrapper.find("input");
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  act(() => {
    input.simulate("mousedown", mockEvent);
  });
}

function simulateMouseDownOnPicker(wrapper: ReactWrapper) {
  const input = wrapper.find(StyledDayPicker);
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  act(() => {
    input
      .getDOMNode()
      .dispatchEvent(
        new MouseEvent("mousedown", { ...mockEvent, bubbles: true })
      );
  });
}

function simulateOnKeyUp(
  wrapper: ReactWrapper,
  key: string,
  shiftKey?: boolean
) {
  const keyUpParams = { key, shiftKey };
  const input = wrapper.find("input");

  act(() => {
    input.simulate("keyUp", keyUpParams);
  });
}

function simulateOnKeyDown(
  wrapper: ReactWrapper,
  key: string,
  shiftKey?: boolean
) {
  const keyDownParams = { key, shiftKey };
  const input = wrapper.find("input");

  act(() => {
    input.simulate("keyDown", keyDownParams);
  });
}

function simulateClickOnInputIcon(wrapper: ReactWrapper) {
  const input = wrapper.find(InputIconToggle);
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  act(() => {
    input.simulate("click", mockEvent);
  });
}

function simulateMouseDownOnInputIcon(wrapper: ReactWrapper) {
  const input = wrapper.find(InputIconToggle);
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  act(() => {
    input.simulate("mousedown", mockEvent);
  });
}

function getValidInputValues(values: string[]) {
  return values.reduce(
    (arr: string[], formatString: string) => [
      ...arr,
      ...["", ".", ",", "-", "/"].map((char) =>
        formatString.replace(/ /g, char)
      ),
    ],
    []
  );
}

type SizesAndWidths = [DateInputProps["size"], DateInputProps["width"]][];

interface MockComponentProps {
  refToBeForwarded?: jest.Mock | { current: null | HTMLInputElement };
  eventValues?: (value: {
    formattedValue: string;
    rawValue: string | null;
  }) => void | jest.Mock;
}

describe("Date", () => {
  let container: HTMLDivElement | null;
  let wrapper: ReactWrapper;
  let onFocusFn: jest.Mock;

  const MockComponent = ({
    allowEmptyValue,
    eventValues = () => {},
    refToBeForwarded,
    ...rest
  }: Partial<DateInputProps> & MockComponentProps) => {
    const [val, setVal] = useState(allowEmptyValue ? "" : "02/02/2022");

    return (
      <DateInput
        value={rest.value || val}
        onChange={(ev) => {
          setVal(ev.target.value.formattedValue);
          eventValues(ev.target.value);
        }}
        onFocus={onFocusFn}
        onBlur={(ev) => {
          eventValues(ev.target.value);
        }}
        allowEmptyValue={allowEmptyValue}
        name="Foo"
        id="Bar"
        ref={refToBeForwarded}
      />
    );
  };

  testStyledSystemMargin((props) => (
    <DateInput onChange={jest.fn} value="" {...props} />
  ));

  describe("when the size pop is set", () => {
    describe.each([
      ["small", "120px"],
      ["medium", "135px"],
      ["large", "140px"],
    ] as SizesAndWidths)("to %s", (size, expectedValue) => {
      it("then the width attribute of StyledInputPresentation should match expected value", () => {
        assertStyleMatch(
          { width: expectedValue },
          mount(<StyledDateInput size={size} />),
          { modifier: `& ${StyledInputPresentation}` }
        );
      });

      describe("with the inputWidth prop set", () => {
        it("then the width attribute of StyledInputPresentation should be undefined", () => {
          assertStyleMatch(
            { width: undefined },
            mount(<StyledDateInput size={size} inputWidth={50} />),
            { modifier: `& ${StyledInputPresentation}` }
          );
        });
      });

      describe("with the maxWidth prop set", () => {
        it("then the width attribute of StyledInputPresentation should be undefined", () => {
          assertStyleMatch(
            { width: undefined },
            mount(<StyledDateInput size={size} maxWidth="300px" />),
            { modifier: `& ${StyledInputPresentation}` }
          );
        });
      });
    });
  });

  describe("refs", () => {
    it("accepts ref as a ref object", () => {
      const ref = { current: null };
      wrapper = mount(<MockComponent refToBeForwarded={ref} />);

      expect(ref.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = mount(<MockComponent refToBeForwarded={ref} />);

      expect(ref).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = mount(<MockComponent refToBeForwarded={ref} />);

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });

  describe("autoFocus", () => {
    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
      wrapper.unmount();
    });

    it("the component's input should be focused and picker should exist when prop is true", () => {
      wrapper = render({ autoFocus: true });
      const input = wrapper.find("input");
      const focusedElement = document.activeElement;

      expect(input.getDOMNode()).toBe(focusedElement);
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
    });

    it("the component's input should not be focused and picker should not exist when prop is falsy", () => {
      wrapper = render({});
      const input = wrapper.find("input");
      const focusedElement = document.activeElement;

      expect(input.getDOMNode()).not.toBe(focusedElement);
      expect(wrapper.update().find(DayPicker).exists()).not.toBe(true);
    });
  });

  describe("when the focus event is triggered on the input", () => {
    beforeEach(() => {
      onFocusFn = jest.fn();
    });

    it("then onFocus prop should have been called and the picker should exist", () => {
      wrapper = render({ onFocus: onFocusFn });
      simulateFocusOnInput(wrapper);
      expect(onFocusFn).toHaveBeenCalled();
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);

      simulateBlurOnInput(wrapper); // for coverage
    });

    it.each(["disabled", "readOnly"])(
      "the onFocus prop should not be called and the picker should not exist if the %s prop is true",
      (param) => {
        wrapper = render({ onFocus: onFocusFn, [param]: true });

        simulateFocusOnInput(wrapper);
        expect(onFocusFn).not.toHaveBeenCalled();
        expect(wrapper.update().find(DayPicker).exists()).not.toBe(true);
      }
    );
  });

  describe("when the blur event is triggered on the input", () => {
    let onBlurFn: jest.Mock;
    let onChangeFn: jest.Mock;

    beforeEach(() => {
      onBlurFn = jest.fn();
      onChangeFn = jest.fn();
    });

    describe("and the input value matches an allowed format", () => {
      it("then onBlur and onChange props should have been called", () => {
        wrapper = render({
          onChange: onChangeFn,
          onBlur: onBlurFn,
          value: "010121",
        });
        simulateBlurOnInput(wrapper);

        expect(onBlurFn).toHaveBeenCalled();
        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe("and the input value does not match an allowed format", () => {
      it("then onBlur should have been called but onChange should not have been called", () => {
        wrapper = render({
          onChange: onChangeFn,
          onBlur: onBlurFn,
          value: "foo",
        });
        simulateBlurOnInput(wrapper);

        expect(onBlurFn).toHaveBeenCalled();
        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });

    describe("and the component's initial value has not been updated", () => {
      it("then onBlur should have been called but onChange should not have been called", () => {
        wrapper = render({
          onChange: onChangeFn,
          onBlur: onBlurFn,
          value: "2012-12-12",
        });
        simulateBlurOnInput(wrapper);

        expect(onBlurFn).toHaveBeenCalled();
        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });

    it.each(["disabled", "readOnly"])(
      "the onBlur and onChange props should not have been called if the %s prop is true",
      (param) => {
        wrapper = render({
          onChange: onChangeFn,
          onBlur: onBlurFn,
          [param]: true,
        });
        simulateBlurOnInput(wrapper);
        expect(onBlurFn).not.toHaveBeenCalled();
        expect(onChangeFn).not.toHaveBeenCalled();
      }
    );

    it("does not call onBlur when the input is click and DateRangeContext is detected", () => {
      wrapper = mount(
        <DateRangeContext.Provider
          value={{
            inputRefMap: {
              start: { isBlurBlocked: { current: false }, setOpen: null },
              end: { isBlurBlocked: { current: false }, setOpen: null },
            },
            setInputRefMap: jest.fn(),
          }}
        >
          <DateInput
            value="2012-12-12"
            onChange={onChangeFn || jest.fn}
            onBlur={onBlurFn || jest.fn}
          />
        </DateRangeContext.Provider>
      );
      simulateMouseDownOnInput(wrapper);
      simulateBlurOnInput(wrapper);
      expect(onBlurFn).not.toHaveBeenCalled();
    });

    describe("when year value is only two digits", () => {
      it("emits rawValue as the expected ISO string when year is `69`", () => {
        const eventValuesFn = jest.fn();
        wrapper = mount(
          <MockComponent eventValues={eventValuesFn} value="12.12.69" />
        );
        simulateBlurOnInput(wrapper);
        expect(eventValuesFn).toBeCalledWith({
          formattedValue: "12/12/1969",
          rawValue: "1969-12-12",
        });
      });

      it("emits rawValue as the expected ISO string when year is `20`", () => {
        const eventValuesFn = jest.fn();
        wrapper = mount(
          <MockComponent eventValues={eventValuesFn} value="12.12.20" />
        );
        simulateBlurOnInput(wrapper);
        expect(eventValuesFn).toBeCalledWith({
          formattedValue: "12/12/2020",
          rawValue: "2020-12-12",
        });
      });
    });
  });

  describe('when the "keyUp" event is triggered on the input', () => {
    beforeEach(() => {
      wrapper = render();
      simulateFocusOnInput(wrapper);
    });

    it('the "DatePicker" should close when the "Escape" key is pressed', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      act(() => {
        simulateOnKeyUp(wrapper, "Escape");
      });
      expect(wrapper.update().find(DayPicker).exists()).toBe(false);
    });
  });

  describe('when the "keyDown" event is triggered on the input', () => {
    beforeEach(() => {
      wrapper = render();
      simulateFocusOnInput(wrapper);
    });

    describe("and `onKeyDown` prop is passed", () => {
      it("then the `onKeyDown` prop should be invoked", () => {
        const onKeyDown = jest.fn();
        wrapper.setProps({ onKeyDown });
        simulateOnKeyDown(wrapper, "F6");
        expect(onKeyDown).toHaveBeenCalled();
      });
    });

    it('the "DatePicker" should remain open and the previous month navigation button should be focused when the "Tab" key is pressed', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      simulateOnKeyDown(wrapper, "Tab");
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      expect(wrapper.find(StyledButton).first()).toBeFocused();
    });

    it('the "DatePicker" should remain open and the previous month navigation button should be focused when the "Tab" key is pressed and disablePortal set', () => {
      wrapper = render({ disablePortal: true });
      simulateFocusOnInput(wrapper);

      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      simulateOnKeyDown(wrapper, "Tab");
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      expect(wrapper.find(StyledButton).first()).toBeFocused();
    });

    it('the "DatePicker" should close when the "Shift" and "Tab" keys are pressed', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      act(() => {
        simulateOnKeyDown(wrapper, "Tab", true);
      });
      expect(wrapper.update().find(DayPicker).exists()).toBe(false);
    });

    it('the "DatePicker" should not be closed when a key other than "Tab" or "Escape" is pressed', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      simulateOnKeyDown(wrapper, "Enter");
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
    });
  });

  describe('when the "keyUp" event is triggered on the picker', () => {
    beforeEach(() => {
      wrapper = render();
      simulateFocusOnInput(wrapper);
    });

    it('should close the picker when "Escape" key is pressed and focus is in picker', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      simulateOnKeyDown(wrapper, "Tab");
      expect(wrapper.find(StyledButton).first()).toBeFocused();
      act(() => {
        wrapper.find(StyledDayPicker).simulate("keyup", { key: "Escape" });
      });
      expect(wrapper.update().find(DayPicker).exists()).toBe(false);
    });
  });

  describe('when the "keyDown" event is triggered on the picker', () => {
    beforeEach(() => {
      wrapper = render();
      simulateFocusOnInput(wrapper);
    });

    it('should close the picker when "Shift" + "Tab" keys are pressed and focus is on previous month button', () => {
      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      simulateOnKeyDown(wrapper, "Tab");
      act(() => {
        wrapper
          .find(StyledDayPicker)
          .simulate("keydown", { key: "Tab", shiftKey: true });
      });
      expect(wrapper.update().find(DayPicker).exists()).toBe(false);
    });

    it("should close the picker when Tab pressed and day element focused", () => {
      const picker = wrapper.update().find(DayPicker);
      expect(picker.exists()).toBe(true);
      act(() => {
        picker
          ?.props()
          ?.onDayKeyDown?.(new Date(), { today: false, outside: false }, {
            key: "Tab",
            preventDefault: () => {},
          } as React.KeyboardEvent<HTMLDivElement>);
      });
      expect(wrapper.update().find(DayPicker).exists()).toBe(false);
    });
  });

  describe("when a mousedown or click event is triggered", () => {
    let onClickFn: jest.Mock;
    beforeEach(() => {
      onClickFn = jest.fn();
    });

    describe("on the input", () => {
      it("then the onClick callback should be called if one is passed", () => {
        wrapper = render({ onClick: onClickFn });
        simulateClickOnInput(wrapper);
        expect(onClickFn).toHaveBeenCalled();
      });

      it("then the onClick callback should not be called if one is not passed", () => {
        wrapper = render();
        simulateClickOnInput(wrapper);
        expect(onClickFn).not.toHaveBeenCalled();
      });

      it("then the 'DatePicker' should open on first click and further clicks should not close the picker", () => {
        wrapper = render();
        simulateMouseDownOnInput(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
        simulateMouseDownOnInput(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      });

      it.each(["disabled", "readOnly"])(
        "then the 'DatePicker' should not open if the %s prop is true",
        (param) => {
          wrapper = render({ [param]: true });
          simulateMouseDownOnInput(wrapper);
          expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        }
      );

      it.each(["disabled", "readOnly"])(
        "then the 'DatePicker' should not open and onClick should not be called if the %s prop is true",
        (param) => {
          wrapper = render({ [param]: true, onClick: onClickFn });
          simulateClickOnInput(wrapper);
          expect(onClickFn).not.toHaveBeenCalled();
          expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        }
      );
    });

    describe("on the input icon", () => {
      it("then the onClick callback should be called if one is passed", () => {
        wrapper = render({ onClick: onClickFn });
        simulateClickOnInputIcon(wrapper);
        expect(onClickFn).toHaveBeenCalled();
      });

      it("does not call the onBlur prop", () => {
        const onBlurFn = jest.fn();
        wrapper = render({ onBlur: onBlurFn });
        simulateClickOnInputIcon(wrapper);
        expect(onBlurFn).not.toHaveBeenCalled();
        simulateClickOnInputIcon(wrapper);
        expect(onBlurFn).not.toHaveBeenCalled();
      });

      it("then the 'DatePicker' should toggle open or closed", () => {
        wrapper = render();
        simulateMouseDownOnInputIcon(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
        simulateMouseDownOnInputIcon(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        simulateMouseDownOnInputIcon(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
        simulateFocusOnInput(wrapper);
      });

      it.each(["disabled", "readOnly"])(
        "then the 'DatePicker' should not open and onClick should not be called if the %s prop is true",
        (param) => {
          wrapper = render({ [param]: true, onClick: onClickFn });
          simulateClickOnInput(wrapper);
          expect(onClickFn).not.toHaveBeenCalled();
          expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        }
      );
    });

    describe("outside of the component", () => {
      it("the 'DatePicker' should close if it is open", () => {
        wrapper = render();
        simulateFocusOnInput(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);

        act(() => {
          document.dispatchEvent(
            new MouseEvent("mousedown", { bubbles: true })
          );
        });

        expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        wrapper.unmount();
      });
    });

    describe("on the picker container", () => {
      it("does not trigger blur", () => {
        const onBlurFn = jest.fn();
        wrapper = render({ onBlur: onBlurFn });
        simulateMouseDownOnInput(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
        simulateMouseDownOnPicker(wrapper);
        wrapper.update();
        simulateBlurOnInput(wrapper);
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });

    describe("within the component", () => {
      it("the 'DatePicker' should remain open", () => {
        wrapper = render();
        simulateFocusOnInput(wrapper);
        expect(wrapper.update().find(DayPicker).exists()).toBe(true);

        act(() => {
          wrapper
            .find(StyledInputPresentation)
            .getDOMNode()
            .dispatchEvent(new CustomEvent("mousedown", { bubbles: true }));
        });

        expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      });
    });
  });

  describe("initial value as ISO format", () => {
    describe.each(
      (Object.keys(locales) as (keyof typeof locales)[]).filter(
        (l) => !["en-CA", "en-US"].includes(l)
      )
    )("for non-NA locale %s", (localeKey) => {
      it("formats to the expected", () => {
        wrapper = mount(
          <I18nProvider locale={locales[localeKey]}>
            <DateInput value="2012-03-01" onChange={jest.fn} />
          </I18nProvider>
        );
        const output = localeKey === "de" ? "01.03.2012" : "01/03/2012";

        expect(wrapper.find("input").prop("value")).toEqual(output);
      });
    });

    describe.each(
      (Object.keys(locales) as (keyof typeof locales)[]).filter((l) =>
        ["en-CA", "en-US"].includes(l)
      )
    )("for NA locale %s", (localeKey) => {
      it("formats to the expected", () => {
        wrapper = mount(
          <I18nProvider locale={locales[localeKey]}>
            <DateInput value="2012-03-01" onChange={jest.fn} />
          </I18nProvider>
        );
        const output = "03/01/2012";

        expect(wrapper.find("input").prop("value")).toEqual(output);
      });
    });
  });

  describe("when the input value changes", () => {
    beforeEach(() => {
      onFocusFn = jest.fn();
    });

    describe.each([
      "321",
      "42/13",
      "0.0/21",
      "01/01/-22",
      "12/42/3213",
      "foo",
      "1/01.11",
      "29/02/2019",
      "31/04/2019",
    ])("with the DatePicker open and a invalid date of %s", (mockValue) => {
      it("should pass no value to the DatePicker", () => {
        wrapper = mount(<MockComponent />);
        simulateFocusOnInput(wrapper);
        expect(wrapper.update().find(DatePicker).props().selectedDays).toEqual(
          new Date("02/02/2022")
        );

        wrapper
          .find("input")
          .simulate("change", { target: { value: mockValue } });
        expect(wrapper.update().find(DatePicker).props().selectedDays).toBe(
          undefined
        );
      });
    });

    describe('when the "onDayClick" prop is called on the opened "DatePicker"', () => {
      const mockDate = parse(new Date(), "dd/MM/yy", "01/01/21");
      const mockDayModifiers = { today: undefined, outside: undefined };
      const mockEvent = { target: {} } as React.MouseEvent<HTMLDivElement>;

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        wrapper = mount(<MockComponent />);
        simulateFocusOnInput(wrapper);
        act(() => {
          wrapper
            .update()
            .find(DatePicker)
            .props()
            .onDayClick?.(mockDate, mockEvent);
        });
      });

      afterEach(() => {
        onFocusFn?.mockClear();

        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;

        wrapper.unmount();
      });

      it("should return focus to the date input and close the DatePicker", () => {
        expect(wrapper.update().find(DayPicker).exists()).toBe(false);
        expect(onFocusFn).toHaveBeenCalled();
      });

      it("should update the input element to reflect the passed date", () => {
        expect(wrapper.update().find("input").prop("value")).toBe("01/01/2021");
      });

      it("should call onChange with the expected event target composition", () => {
        const onChangeFn = jest.fn();

        wrapper = render({ onChange: onChangeFn, name: "foo", id: "bar" });
        simulateFocusOnInput(wrapper);
        onChangeFn.mockClear();
        act(() => {
          wrapper
            .update()
            .find(DayPicker)
            .props()
            .onDayClick?.(mockDate, mockDayModifiers, mockEvent);
        });

        expect(onChangeFn).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              id: "bar",
              name: "foo",
              value: {
                formattedValue: "01/01/2021",
                rawValue: "2021-01-01",
              },
            },
          })
        );
      });

      describe("when the disabled modifier is set", () => {
        let onChangeFn: jest.Mock;

        beforeEach(() => {
          onChangeFn = jest.fn();
          onFocusFn = jest.fn();
          wrapper = render({ onChange: onChangeFn, onFocus: onFocusFn });
          simulateFocusOnInput(wrapper);
          onChangeFn.mockClear();
          onFocusFn.mockClear();
          act(() => {
            wrapper
              .update()
              .find(DayPicker)
              .props()
              .onDayClick?.(
                mockDate,
                { ...mockDayModifiers, disabled: true },
                mockEvent
              );
          });
        });

        it("does not call onChange, focus the input or close the picker", () => {
          expect(onChangeFn).not.toHaveBeenCalled();
          expect(onFocusFn).not.toHaveBeenCalled();
          expect(wrapper.update().find(DayPicker).exists()).toBe(true);
        });
      });
    });

    describe.each(Object.keys(locales) as (keyof typeof locales)[])(
      "when the locale is %s",
      (localeKey) => {
        const values = [
          "01 01 2021",
          "1 01 2021",
          "01 1 2021",
          "1 1 2021",
          "1 1 21",
          "01 1 21",
          "1 01 21",
          "01 01 21",
        ];

        const validValues = getValidInputValues(values);

        beforeEach(() => {
          wrapper = mount(
            <I18nProvider locale={locales[localeKey]}>
              <MockComponent />
            </I18nProvider>
          );
        });

        it.each(validValues)(
          "updates the input value from %s to the expected format on blur",
          (value) => {
            wrapper.find("input").simulate("change", { target: { value } });
            expect(wrapper.update().find("input").prop("value")).toEqual(value);
            simulateBlurOnInput(wrapper);
            const { separator } = locales[localeKey as keyof typeof locales];
            const expectedValue = `01${separator}01${separator}2021`;

            expect(wrapper.update().find("input").prop("value")).toEqual(
              expectedValue
            );
          }
        );

        it.each([
          "1170",
          "01180",
          "10190",
          "010199",
          "1.1.70",
          "01/1/80",
          "1-01-90",
          "01,01,99",
        ])("adds the expected years when the value is %s", (value) => {
          wrapper.find("input").simulate("change", { target: { value } });
          expect(wrapper.update().find("input").prop("value")).toEqual(value);
          simulateBlurOnInput(wrapper);
          const { separator } = locales[localeKey as keyof typeof locales];
          const expectedValue = `01${separator}01${separator}19${value.substring(
            value.length - 2,
            value.length
          )}`;

          expect(wrapper.update().find("input").prop("value")).toEqual(
            expectedValue
          );
        });

        describe("when the day value is greater than 28 and month is not February", () => {
          it("parses the date as expected", () => {
            const value = ["en-US", "en-CA"].includes(localeKey)
              ? "01/31/2021"
              : "31/01/2021";
            const result = localeKey === "de" ? "31.01.2021" : value;
            wrapper.find("input").simulate("change", { target: { value } });
            expect(wrapper.update().find("input").prop("value")).toEqual(value);
            simulateBlurOnInput(wrapper);

            expect(wrapper.update().find("input").prop("value")).toEqual(
              result
            );
          });
        });

        describe("when it is a leap year, the day value is 29 and month is February", () => {
          it.each(["2012", "2016", "2020", "2024"])(
            "parses the date as expected",
            (year) => {
              const value = ["en-US", "en-CA"].includes(localeKey)
                ? `02/29/${year}`
                : `29/02/${year}`;
              const result = localeKey === "de" ? `29.02.${year}` : value;
              wrapper.find("input").simulate("change", { target: { value } });
              expect(wrapper.update().find("input").prop("value")).toEqual(
                value
              );
              simulateBlurOnInput(wrapper);

              expect(wrapper.update().find("input").prop("value")).toEqual(
                result
              );
            }
          );
        });
      }
    );
  });

  describe("when allowEmptyValue prop is set", () => {
    it("emits rawValue as an empty string onBlur", () => {
      const eventValuesFn = jest.fn();
      wrapper = mount(
        <MockComponent eventValues={eventValuesFn} allowEmptyValue />
      );

      simulateBlurOnInput(wrapper);
      expect(eventValuesFn).toBeCalledWith({
        formattedValue: "",
        rawValue: "",
      });
    });
  });

  describe("when allowEmptyValue prop is set and initial value is an empty string", () => {
    it("returns an undefined value for selectedDays in DatePicker", () => {
      wrapper = render({ allowEmptyValue: true });

      expect(wrapper.find(DatePicker).prop("selectedDays")).toEqual(undefined);
    });

    it("returns an empty string value in the Date component", () => {
      wrapper = render({ allowEmptyValue: true });

      expect(wrapper.find("input").prop("value")).toEqual("");
    });
  });

  describe("tooltipPosition", () => {
    it("overrides the default position when validation is on input", () => {
      const { position } = render({ error: "message", tooltipPosition: "top" })
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });

    it("overrides the default position when validation is on label", () => {
      const { position } = render({
        label: "foo",
        validationOnLabel: true,
        error: "message",
        tooltipPosition: "top",
      })
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });
  });

  describe("label help", () => {
    it("passes the expected values to the help component", () => {
      const text = "foo";
      const { "aria-label": ariaLabel } = render({
        label: text,
        labelHelp: text,
        helpAriaLabel: text,
      })
        .find(StyledHelp)
        .props();

      expect(ariaLabel).toEqual(text);
    });
  });

  describe("validation", () => {
    it.each<keyof ValidationProps>(["error", "warning", "info"])(
      "renders the icon inside the textbox if %s is passed a string value",
      (validation) => {
        wrapper = render({ [validation]: "foo" });
        const validationIcon = wrapper.find(Textbox).find(ValidationIcon);
        const { [validation]: validationProp } = validationIcon.props();

        expect(validationIcon.exists()).toBe(true);
        expect(validationProp).toEqual("foo");
      }
    );

    it.each<keyof ValidationProps>(["error", "warning", "info"])(
      "renders the icon on the label and applies border if %s if string value and validationOnLabel",
      (validation) => {
        wrapper = render({ [validation]: "foo" });
        const validationIcon = wrapper.find(ValidationIcon);
        const { [validation]: validationProp } = validationIcon.props();

        expect(validationIcon.exists()).toBe(true);

        const matchedStyle = {
          error: "var(--colorsSemanticNegative500) !important",
          warning: "var(--colorsSemanticCaution500) !important",
          info: "var(--colorsSemanticInfo500) !important",
        };

        assertStyleMatch(
          {
            borderColor: matchedStyle[validation],
          },
          wrapper.find(StyledInputPresentation)
        );
        expect(validationProp).toEqual("foo");
        expect(wrapper.find(Textbox).props().inputIcon).toBe("calendar");
      }
    );

    it.each<keyof ValidationProps>(["error", "warning", "info"])(
      "does not render the icon if %s is passed a boolean value",
      (validation) => {
        wrapper = render({ [validation]: true });
        const validationIcon = wrapper.find(ValidationIcon);

        const matchedStyle = {
          error: "var(--colorsSemanticNegative500) !important",
          warning: "var(--colorsSemanticCaution500) !important",
          info: "var(--colorsSemanticInfo500) !important",
        };

        expect(validationIcon.exists()).toBe(false);
        expect(wrapper.find(Textbox).props().inputIcon).toBe("calendar");
        assertStyleMatch(
          {
            borderColor: matchedStyle[validation],
          },
          wrapper.find(StyledInputPresentation)
        );
      }
    );
  });

  describe("disablePortal", () => {
    it("renders DatePicker as a direct children of StyledDateInput by default", () => {
      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;
      wrapper = render();
      act(() => {
        wrapper.find(InputIconToggle).props().onMouseDown?.(mockEvent);
      });

      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
    });
  });

  describe("datepicker container", () => {
    it("should be the InputPresentationStyle element", () => {
      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;
      wrapper = render();
      act(() => {
        wrapper.find(InputIconToggle).props().onMouseDown?.(mockEvent);
      });

      expect(wrapper.update().find(DayPicker).exists()).toBe(true);
      expect(wrapper.find(DatePicker).props().inputElement.current).toBe(
        wrapper.find(StyledInputPresentation).getDOMNode()
      );
    });
  });

  it("should set the required attribute on the input when prop is true", () => {
    expect(
      render({ label: "required", required: true }).find("input").getDOMNode()
    ).toHaveAttribute("required", "");
  });

  it("should add an asterisk after the label text when required prop is true", () => {
    assertStyleMatch(
      {
        content: '"*"',
        color: "var(--colorsSemanticNegative500)",
        fontWeight: "var(--fontWeights700)",
        marginLeft: "var(--spacing050)",
      },
      render({ label: "required", required: true }).find(StyledLabel),
      { modifier: "::after" }
    );
  });

  it("should add optional styling after the label text when isOptional prop is true", () => {
    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      render({ label: "isOptional", isOptional: true }).find(
        StyledLabelContainer
      ),
      { modifier: "::after" }
    );
  });
});
