import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Label from "../../__internal__/label";
import Textbox from "../textbox";
import { Checkbox } from "../checkbox";
import InlineInputs, { InlineInputsProps } from "./inline-inputs.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import {
  StyledContentContainer,
  StyledInlineInput,
} from "./inline-inputs.style";
import InputPresentation from "../../__internal__/input/input-presentation.style";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
const mockedGuid = "guid-12345";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(guid as jest.MockedFunction<any>).mockImplementation(() => mockedGuid);

function render(props: InlineInputsProps = {}) {
  return mount(
    <InlineInputs {...props}>
      <Textbox />
      <Textbox />
      <Checkbox />
    </InlineInputs>
  );
}

describe("Inline Inputs", () => {
  let wrapper: ReactWrapper;

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
      wrapper = render({ label: labelText });
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

    it("sets the aria-labelledby prop on the inputs", () => {
      wrapper
        .find("input")
        .forEach((input) =>
          expect(input.prop("aria-labelledby")).toEqual(mockedGuid)
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

    it("does not set the aria-labelledby prop on the inputs", () => {
      wrapper
        .find("input")
        .forEach((input) =>
          expect(input.prop("aria-labelledby")).toEqual(undefined)
        );
    });
  });

  describe("when the default theme is set", () => {
    const labelText = "Test Label";

    beforeEach(() => {
      wrapper = render({ label: labelText });
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
      wrapper = render({ gutter: gutterValue });
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
      wrapper = render({ labelWidth });
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
      wrapper = render({});
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
      wrapper = render({ inputWidth });
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

    it("renders multiple children", () => {
      expect(wrapper.find(Textbox).length).toEqual(2);
    });

    it("renders a single child", () => {
      wrapper.setProps({ children: <Textbox /> });
      expect(wrapper.find(Textbox).length).toEqual(1);
    });

    it("renders when no children are passed", () => {
      expect(
        mount(<InlineInputs />)
          .find(StyledContentContainer)
          .prop("children")
      ).toBe(null);
    });
  });
});
