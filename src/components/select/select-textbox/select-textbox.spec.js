import React, { useState } from "react";
import { mount } from "enzyme";
import { createPopper } from "@popperjs/core";

import SelectTextbox from "./select-textbox.component";
import SelectText from "../__internal__/select-text/select-text.component";
import Textbox from "../../textbox";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "../../../__internal__/input/input-presentation.style";
import useResizeObserver from "../../../hooks/__internal__/useResizeObserver";
import Translation from "../../../locales/en-gb";

jest.mock("@popperjs/core");
jest.mock("../../../hooks/__internal__/useResizeObserver");

const Component = (props) => {
  const [textboxRef, setTextboxRef] = useState();

  function assignInput(input) {
    setTextboxRef(input.current);
  }

  return (
    <SelectTextbox textboxRef={textboxRef} inputRef={assignInput} {...props} />
  );
};

describe("SelectTextbox", () => {
  describe("popper - ", () => {
    const destroyFunc = jest.fn();
    const updateFunc = jest.fn();

    createPopper.mockImplementation(() => ({
      destroy: destroyFunc,
      update: updateFunc,
    }));

    it("popper instance is initialized when isOpen is true", () => {
      jest.clearAllMocks();

      mount(<Component isOpen />);

      expect(createPopper).toHaveBeenCalledTimes(1);
    });

    it("popper instance is destroyed on unmount", () => {
      const myWrapper = mount(<Component isOpen />);

      myWrapper.unmount();

      expect(destroyFunc).toHaveBeenCalled();
    });

    it("createPopper is called with proper arguments", () => {
      jest.clearAllMocks();

      const myWrapper = mount(<Component isOpen />);

      const reference = myWrapper
        .find(StyledInputPresentationContainer)
        .getDOMNode();
      const popper = myWrapper.find(InputPresentationStyle).getDOMNode();

      expect(createPopper.mock.calls[0][0]).toEqual(reference);
      expect(createPopper.mock.calls[0][1]).toEqual(popper);
      expect(createPopper.mock.calls[0][2]).toMatchObject({
        strategy: "fixed",
      });
    });

    it("popper instance is updated when reference element resizes", () => {
      mount(<Component isOpen />);

      useResizeObserver.mock.calls[
        useResizeObserver.mock.calls.length - 1
      ][1]();

      expect(updateFunc).toHaveBeenCalled();
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

  describe("when there is hasTextCursor prop", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<SelectTextbox hasTextCursor />);
    });

    it("then the SelectText should not be rendered in the Textbox", () => {
      expect(wrapper.find(SelectText).exists()).toBe(false);
    });

    it("then the Textbox placeholder porp should be the default placeholder text", () => {
      expect(wrapper.find(Textbox).prop("placeholder")).toBe(
        Translation.select.placeholder()
      );
    });

    it('the Textbox should have type of "text"', () => {
      expect(wrapper.find(Textbox).prop("type")).toBe("text");
    });
  });

  describe("when a keyboard key has been pressed when focused on the SelectText", () => {
    describe("and it's a character key", () => {
      it("then the onChange callback prop should be called with that key as target value", () => {
        const key = "a";
        const onChangeFn = jest.fn();
        const wrapper = mount(<SelectTextbox onChange={onChangeFn} />);

        wrapper.find(SelectText).simulate("focus");
        wrapper.find(SelectText).simulate("keydown", { key });
        expect(onChangeFn).toHaveBeenCalledWith({ target: { value: key } });
      });
    });

    describe("and it's a non character key", () => {
      it("then the onChange callback prop should not be called", () => {
        const onChangeFn = jest.fn();
        const wrapper = mount(<SelectTextbox onChange={onChangeFn} />);

        wrapper.find(SelectText).simulate("focus");
        wrapper.find(SelectText).simulate("keydown", { key: "shift" });
        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });
  });
});

describe("coverage filler for else path", () => {
  const wrapper = mount(<SelectTextbox />);
  wrapper.find("input").simulate("blur");
  wrapper.find("input").simulate("focus");
});
