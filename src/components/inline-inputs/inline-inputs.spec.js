import React from "react";
import { shallow, mount } from "enzyme";
import Label from "../../__internal__/label";
import Textbox from "../textbox";
import InlineInputs from "./inline-inputs.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import {
  StyledContentContainer,
  StyledInlineInput,
} from "./inline-inputs.style";
import InputPresentation from "../../__internal__/input/input-presentation.style";

describe("Inline Inputs", () => {
  let wrapper;

  describe("when a className prop is passed in", () => {
    it("renders with main class", () => {
      const customClass = "my-custom-class";
      wrapper = render({ className: customClass });
      expect([customClass].every((c) => wrapper.hasClass(c))).toBeTruthy();
    });
  });

  describe("when a label prop is passed in", () => {
    const labelText = "Test Label";

    beforeEach(() => {
      wrapper = render({ label: labelText }, mount);
    });

    it("contains a label with a text specified in that prop", () => {
      const label = wrapper.find(Label);
      expect(label.props().children).toEqual(labelText);
    });

    it("then the label should have specific styles", () => {
      assertStyleMatch(
        {
          paddingRight: "16px",
          flex: "0 0 auto",
        },
        wrapper,
        { modifier: `${StyledLabelContainer}` }
      );
    });
  });

  describe("when a label prop is not passed in", () => {
    beforeEach(() => {
      wrapper = render();
    });

    it("does not contain a label", () => {
      const label = wrapper.find(Label);

      expect(label.exists()).toBe(false);
    });
  });

  describe("when the default theme is set", () => {
    const labelText = "Test Label";

    beforeEach(() => {
      wrapper = render({ label: labelText }, mount);
    });

    it("then all inputs should have 1px width", () => {
      assertStyleMatch(
        {
          width: "1px",
        },
        wrapper,
        { modifier: "input" }
      );
    });
  });

  describe("when a gutter prop is set to none", () => {
    const gutterValue = "none";

    beforeEach(() => {
      wrapper = render({ gutter: gutterValue }, mount);
    });

    it("then the borderLeft css property of the adjacent input should be set to none", () => {
      assertStyleMatch(
        {
          borderLeft: "none",
        },
        wrapper.find(StyledContentContainer),
        {
          modifier: `${StyledInlineInput} + ${StyledInlineInput} ${InputPresentation}`,
        }
      );
    });
  });

  describe("when a labelWidth prop is passed in", () => {
    const labelWidth = 30;

    beforeEach(() => {
      wrapper = render({ labelWidth }, mount);
    });

    it("then the label should have percentage width of this prop value", () => {
      assertStyleMatch(
        {
          flex: `0 0 ${labelWidth}%`,
        },
        wrapper,
        { modifier: `${StyledLabelContainer}` }
      );
    });
  });

  describe("when the inputWidth prop is not passed in", () => {
    beforeEach(() => {
      wrapper = render({}, mount);
    });

    it("then the inline input container should have it's flex property set to 1", () => {
      assertStyleMatch(
        {
          flex: "1",
        },
        wrapper.find(StyledContentContainer)
      );
    });
  });

  describe("when the inputWidth prop is passed in", () => {
    const inputWidth = 70;

    beforeEach(() => {
      wrapper = render({ inputWidth }, mount);
    });

    it("then the inline input container should have percentage width of this prop value", () => {
      assertStyleMatch(
        {
          flex: `0 0 ${inputWidth}%`,
        },
        wrapper.find(StyledContentContainer)
      );
    });
  });

  describe("children", () => {
    beforeEach(() => {
      wrapper = render();
    });

    describe("when their are multiple children", () => {
      it("renders its children", () => {
        expect(wrapper.find(Textbox).length).toEqual(2);
      });
    });

    describe("when there is one child", () => {
      beforeEach(() => {
        wrapper.setProps({ children: <Textbox /> });
      });

      it("renders the child", () => {
        expect(wrapper.find(Textbox).length).toEqual(1);
      });
    });
  });
});

function render(props = {}, renderer = shallow) {
  return renderer(
    <InlineInputs {...props}>
      <Textbox />
      <Textbox />
    </InlineInputs>
  );
}
