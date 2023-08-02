import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import Password, { PasswordProps } from "./password.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { HiddenAriaLive } from "./password.style";
import StyledButtonMinor from "../button-minor/button-minor.style";
import Label from "../../__internal__/label";
import Textbox from "../textbox";
import ButtonMinor from "../button-minor";
import guid from "../../__internal__/utils/helpers/guid";
import StyledInput from "../../__internal__/input/input.style";

const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

function renderPasswordInput(props: PasswordProps) {
  return mount(<Password {...props} />);
}

describe("Password Input", () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;

  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: () => {},
    },
  };

  describe("when rendered", () => {
    it("should have the Textbox component as it's child", () => {
      wrapper = renderPasswordInput({});
      expect(wrapper.find(Textbox)).toHaveLength(1);
    });
    it("should have the ButtonMinor component as it's child", () => {
      wrapper = renderPasswordInput({});
      expect(wrapper.find(ButtonMinor)).toHaveLength(1);
    });
    it("renders with the expected border radius styling on input", () => {
      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius050)",
        },
        mount(<Password />).find(StyledInput)
      );
    });
  });

  describe("required", () => {
    beforeAll(() => {
      wrapper = renderPasswordInput({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      input = wrapper.find("input").at(0);
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label).at(0);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("disabled", () => {
    beforeAll(() => {
      wrapper = renderPasswordInput({ label: "disabled", disabled: true });
    });

    it("the disabled prop is passed to the input", () => {
      input = wrapper.find("input").at(0);
      expect(input.prop("disabled")).toBe(true);
    });

    it("when the disabled is passed to the input, focus is prevented", () => {
      input = wrapper.find("input").at(0);
      expect(input.getDOMNode()).not.toHaveFocus();
    });

    it("the disabled prop is passed to ButtonMinor", () => {
      const button = wrapper.find(StyledButtonMinor);
      expect(button.prop("disabled")).toBe(true);
    });

    it("when 'forceObscurity' is 'true', ButtonMinor is disabled", () => {
      wrapper = renderPasswordInput({ forceObscurity: true });
      const button = wrapper.find(StyledButtonMinor);
      expect(button.prop("disabled")).toBe(true);
    });

    it("when the disabled prop is passed to ButtonMinor, focus is prevented", () => {
      input = wrapper.find("input").at(0);
      expect(input.getDOMNode()).not.toHaveFocus();
    });
  });

  describe("password prop checks", () => {
    beforeAll(() => {
      wrapper = renderPasswordInput({});
    });

    it("default input type is 'password'", () => {
      expect(wrapper.find("input").at(0).prop("type")).toBe("password");
    });

    it("when 'forceObscurity' is 'true' input type is 'password'", () => {
      wrapper = renderPasswordInput({ forceObscurity: true });
      expect(wrapper.find("input").at(0).prop("type")).toBe("password");
    });

    it("input type should change from 'password' to 'text' on click", () => {
      wrapper = renderPasswordInput({});
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      wrapper.update();
      expect(wrapper.find("input").at(0).prop("type")).toBe("text");
    });

    it("autoComplete attribute is 'off'", () => {
      expect(wrapper.find("input").at(0).prop("autoComplete")).toBe("off");
    });

    it("input id should equal value of 'id' prop when passed", () => {
      wrapper = renderPasswordInput({ id: "foo" });
      expect(wrapper.find("input").at(0).prop("id")).toBe("foo");
    });

    it("input id should be a generated guid when 'id' prop is undefined", () => {
      wrapper = renderPasswordInput({ id: "" });
      expect(wrapper.find("input").at(0).prop("id")).toBe(mockedGuid);
    });
  });

  describe("buttonMinor prop checks", () => {
    it("aria-controls attribute is correct", () => {
      wrapper = renderPasswordInput({ id: "foo" });
      expect(wrapper.find(StyledButtonMinor).prop("aria-controls")).toBe("foo");
    });

    it("buttonType attribute is correct", () => {
      expect(wrapper.find(StyledButtonMinor).prop("buttonType")).toBe(
        "tertiary"
      );
    });

    it("iconPosition attribute is correct", () => {
      expect(wrapper.find(StyledButtonMinor).prop("iconPosition")).toBe(
        "before"
      );
    });

    it("size attribute is correct", () => {
      expect(wrapper.find(StyledButtonMinor).prop("size")).toBe("small");
    });

    it("default label text should be 'Show'", () => {
      expect(wrapper.find(StyledButtonMinor).text()).toBe("Show");
    });

    it("label text should change from 'Show' to 'Hide' onClick", () => {
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      expect(wrapper.find(StyledButtonMinor).text()).toBe("Hide");
    });

    it("default aria-label text should be 'Show password'", () => {
      expect(wrapper.find(StyledButtonMinor).prop("aria-label")).toBe(
        "Show password"
      );
    });

    it("aria-label text should change from 'Show Password' to 'Hide password' onClick", () => {
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      expect(wrapper.find(StyledButtonMinor).prop("aria-label")).toBe(
        "Hide password"
      );
    });

    it("default iconType should be 'view'", () => {
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      expect(wrapper.find(StyledButtonMinor).prop("iconType")).toBe("view");
    });

    it("iconType should change from 'show' to 'hide' onClick", () => {
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      expect(wrapper.find(StyledButtonMinor).prop("iconType")).toBe("hide");
    });
  });

  describe("buttonMinor styling checks", () => {
    it("default styling should be correct", () => {
      wrapper = wrapper.find(StyledButtonMinor);
      assertStyleMatch(
        {
          background: "transparent",
          color: "var(--colorsActionMinor500)",
        },
        wrapper
      );
    });

    it("styling should be correct onHover", () => {
      wrapper = wrapper.find(StyledButtonMinor);
      assertStyleMatch(
        {
          background: "transparent",
          color: "var(--colorsActionMinor500)",
        },
        wrapper,
        { modifier: ":hover" }
      );
    });
  });

  describe("aria-live region checks", () => {
    it("default aria-live region text should be correct", () => {
      wrapper = renderPasswordInput({});
      expect(wrapper.find(HiddenAriaLive).text()).toBe(
        "Your Password is currently hidden."
      );
    });

    it("aria-live region text should be correct onChange", () => {
      act(() => {
        wrapper.find(StyledButtonMinor).simulate("click", mockEvent);
      });
      expect(wrapper.find(HiddenAriaLive).text()).toBe(
        "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so."
      );
    });

    it("aria-live region should be visually hidden", () => {
      assertStyleMatch(
        {
          border: "0",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0",
          position: "absolute",
          width: "1px",
        },
        wrapper.find(HiddenAriaLive)
      );
    });
  });
});
