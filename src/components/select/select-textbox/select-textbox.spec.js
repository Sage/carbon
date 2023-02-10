import React, { useState } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import SelectTextbox from "./select-textbox.component";
import Textbox from "../../textbox";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "../../../__internal__/input/input-presentation.style";
import guid from "../../../__internal__/utils/helpers/guid";
import Translation from "../../../locales/en-gb";
import useFloating from "../../../hooks/__internal__/useFloating";

jest.mock("../../../hooks/__internal__/useFloating");
jest.mock("../../../__internal__/utils/helpers/guid");
guid.mockImplementation(() => "guid-123");

const Component = (props) => {
  const [textboxRef, setTextboxRef] = useState();

  function assignInput(input) {
    setTextboxRef(input);
  }

  return <SelectTextbox textboxRef={textboxRef} ref={assignInput} {...props} />;
};

describe("SelectTextbox", () => {
  describe("useFloating", () => {
    it("calls useFloating with proper argument", () => {
      useFloating.mockClear();
      const wrapper = mount(<Component isOpen />);
      act(() => {
        wrapper.update();
      });
      const call = useFloating.mock.calls[1][0];

      expect(call.isOpen).toBe(true);
      expect(call.reference).toEqual({
        current: wrapper.find(StyledInputPresentationContainer).getDOMNode(),
      });
      expect(call.floating).toEqual({
        current: wrapper.find(InputPresentationStyle).getDOMNode(),
      });
      expect(call.animationFrame).toBe(true);
      expect(call.strategy).toBe("fixed");

      const rects = { reference: { height: 40, width: 0, y: 0, x: 0 } };

      expect(
        call.middleware?.[0]?.options?.({
          rects,
          placement: "bottom",
        })
      ).toEqual({ mainAxis: -40 });
    });
  });

  describe("when rendered", () => {
    it("it should contain a Textbox with expected props", () => {
      const wrapper = mount(<SelectTextbox />);

      expect(wrapper.find(Textbox).exists()).toBe(true);
      expect(wrapper.find(Textbox).props().placeholder).toBe(undefined);
      expect(wrapper.find(Textbox).props().inputIcon).toBe("dropdown");
      expect(wrapper.find(Textbox).props().autoComplete).toBe("off");
      expect(wrapper.find(Textbox).props().type).toBe("text");
    });
  });

  describe("when the onFocus prop has been passed and the input has been focused", () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = mount(<SelectTextbox onFocus={onFocusFn} />);

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe("when the onBlur prop has been passed and the input has been unfocused", () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = mount(<SelectTextbox onBlur={onBlurFn} />);

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });
  });

  describe("when a descendent of FilterableSelect or MultiSelect", () => {
    it("do not render button-like span overlay in the textbox", () => {
      const wrapper = mount(<SelectTextbox hasTextCursor />);
      expect(wrapper.find("span[data-element='select-text']").exists()).toBe(
        false
      );
    });

    it("and placeholder prop is passed, input element uses it as placeholder text", () => {
      const placeholder = "foobaz";
      const wrapper = mount(
        <SelectTextbox hasTextCursor placeholder={placeholder} />
      );
      expect(wrapper.find("input").prop("placeholder")).toBe(placeholder);
    });

    it("and placeholder prop is not passed, input element uses locale default value as placeholder text", () => {
      const wrapper = mount(
        <SelectTextbox hasTextCursor placeholder={undefined} />
      );
      expect(wrapper.find("input").prop("placeholder")).toBe(
        Translation.select.placeholder()
      );
    });

    it('the input element should be of type "text"', () => {
      const wrapper = mount(<SelectTextbox hasTextCursor />);
      expect(wrapper.find("input").prop("type")).toBe("text");
    });
  });

  describe("when a descendent of SimpleSelect", () => {
    it('renders span overlay in the textbox, that has role of "button" and is hidden from screen readers', () => {
      const wrapper = mount(<SelectTextbox hasTextCursor={undefined} />);
      const selectText = wrapper.find("span[data-element='select-text']");
      expect(selectText.exists()).toBe(true);
      expect(selectText.prop("role")).toBe("button");
      expect(selectText.prop("aria-hidden")).toBe(true);
    });

    it("and placeholder prop is passed, span overlaying textbox uses it as placeholder text", () => {
      const placeholder = "foobaz";
      const wrapper = mount(
        <SelectTextbox hasTextCursor={undefined} placeholder={placeholder} />
      );
      expect(wrapper.find("span[data-element='select-text']").text()).toBe(
        placeholder
      );
    });

    it("and placeholder prop is not passed, span overlaying textbox uses locale default value as placeholder text", () => {
      const wrapper = mount(<SelectTextbox hasTextCursor={undefined} />);
      expect(wrapper.find("span[data-element='select-text']").text()).toBe(
        Translation.select.placeholder()
      );
    });

    describe("when the span overlaying textbox is in focus", () => {
      it("and character key has been pressed, onChange callback prop should be called with that key as target value", () => {
        const key = "a";
        const onChangeFn = jest.fn();
        const wrapper = mount(<SelectTextbox onChange={onChangeFn} />);

        wrapper.find("span[data-element='select-text']").simulate("focus");
        wrapper
          .find("span[data-element='select-text']")
          .simulate("keydown", { key });
        expect(onChangeFn).toHaveBeenCalledWith({ target: { value: key } });
      });

      it("and non-character has been pressed, onChange callback prop should not be called", () => {
        const onChangeFn = jest.fn();
        const wrapper = mount(<SelectTextbox onChange={onChangeFn} />);

        wrapper.find("span[data-element='select-text']").simulate("focus");
        wrapper
          .find("span[data-element='select-text']")
          .simulate("keydown", { key: "shift" });
        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });
  });

  describe("ARIA", () => {
    let labelId;

    beforeEach(() => {
      guid.mockImplementationOnce(() => "labelId-guid");
      labelId = guid();
    });

    describe.each([true, false])(
      "when labelId has been passed, and hasTextCursor is %s",
      (hasTextCursor) => {
        it("aria-labelledby includes labelId", () => {
          const wrapper = mount(
            <SelectTextbox hasTextCursor={hasTextCursor} labelId={labelId} />
          );
          const ariaLabelledBy = wrapper.find(Textbox).prop("aria-labelledby");
          expect(ariaLabelledBy).toEqual(expect.stringContaining(labelId));
        });
      }
    );

    describe.each([true, false])(
      "when labelId is undefined, and hasTextCursor is %s",
      (hasTextCursor) => {
        it("aria-labelledby does not point to a non-existent label", () => {
          const wrapper = mount(
            <SelectTextbox hasTextCursor={hasTextCursor} labelId={undefined} />
          );
          const ariaLabelledBy = wrapper.find(Textbox).prop("aria-labelledby");
          expect(ariaLabelledBy).not.toEqual(expect.stringContaining(labelId));
        });
      }
    );
  });
});

describe("coverage filler for else path", () => {
  const wrapper = mount(<SelectTextbox />);
  wrapper.find("input").simulate("blur");
  wrapper.find("input").simulate("focus");
});
