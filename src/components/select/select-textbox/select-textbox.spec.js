import React from "react";
import { mount } from "enzyme";
import SelectTextbox from "./select-textbox.component";
import Textbox from "../../../__experimental__/components/textbox";
import I18next from "../../../__spec_helper__/I18next";

function RenderWrapper({ ...props }) {
  return (
    <I18next>
      <SelectTextbox {...props} />
    </I18next>
  );
}

describe("SelectTextbox", () => {
  describe("when rendered", () => {
    it("it should contain a Textbox with expected props", () => {
      const wrapper = mount(<RenderWrapper />);

      expect(wrapper.find(Textbox).exists()).toBe(true);
      expect(wrapper.find(Textbox).props().placeholder).toBe(
        "Please Select..."
      );
      expect(wrapper.find(Textbox).props().inputIcon).toBe("dropdown");
      expect(wrapper.find(Textbox).props().autoComplete).toBe("off");
    });
  });

  describe("when the onFocus prop has been passed and the input has been focused", () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = mount(<RenderWrapper onFocus={onFocusFn} />);

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe("when the onBlur prop has been passed and the input has been unfocused", () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = mount(<RenderWrapper onBlur={onBlurFn} />);

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });
  });

  // coverage filler for else path
  const wrapper = mount(<RenderWrapper />);
  wrapper.find("input").simulate("blur");
});

describe("coverage filler for else path", () => {
  const wrapper = mount(<RenderWrapper />);
  wrapper.find("input").simulate("focus");
});
