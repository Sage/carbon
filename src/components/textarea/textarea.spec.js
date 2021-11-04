import React from "react";
import { mount, shallow } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import CharacterCount from "../../__internal__/character-count";
import Textarea from ".";
import baseTheme from "../../style/themes/base";
import InputPresentation from "../../__internal__/input/input-presentation.component";
import { Input } from "../../__internal__/input";
import Label from "../../__internal__/label";
import ValidationIcon from "../../__internal__/validations/validation-icon.component";
import guid from "../../__internal__/utils/helpers/guid";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";

jest.mock("../../__internal__/utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

describe("Textarea", () => {
  let wrapper;

  testStyledSystemMargin((props) => <Textarea {...props} />);
  describe("when textarea is rendered with default props", () => {
    let textarea;

    beforeAll(() => {
      wrapper = renderTextarea();
      textarea = wrapper.find("textarea").instance();
    });

    it("the height of the textarea should remain unchanged", () => {
      const expectedScrollHeight = 500;
      const originalHeight = "50px";

      textarea.style.height = originalHeight;
      jest
        .spyOn(textarea, "scrollHeight", "get")
        .mockImplementation(() => expectedScrollHeight);
      window.dispatchEvent(new Event("resize"));
      expect(textarea.style.height).toEqual(originalHeight);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  const validationTypes = ["error", "warning", "info"];

  describe.each(validationTypes)(
    "when %s validation prop is string",
    (validationProp) => {
      it("renders a validation icon on the input", () => {
        wrapper = renderTextarea({
          children: "mock content",
          [validationProp]: "Message",
        });
        expect(
          wrapper.find(InputPresentation).find(ValidationIcon).exists()
        ).toBe(true);
      });

      it("overrides the tooltip position when the input and a value is passed in via tooltipPosition", () => {
        wrapper = renderTextarea({
          children: "mock content",
          label: "Label",
          [validationProp]: "Message",
          tooltipPosition: "bottom",
        });
        expect(
          wrapper.find(InputPresentation).find(Tooltip).props().position
        ).toEqual("bottom");
      });

      it("renders a validation icon on the label if validationOnLabel passed as true", () => {
        wrapper = renderTextarea({
          children: "mock content",
          label: "Label",
          [validationProp]: "Message",
          validationOnLabel: true,
        });
        expect(wrapper.find(Label).find(ValidationIcon).exists()).toBe(true);
      });

      it("overrides the tooltip position when on the label and a value is passed in via tooltipPosition", () => {
        wrapper = renderTextarea({
          children: "mock content",
          label: "Label",
          [validationProp]: "Message",
          validationOnLabel: true,
          tooltipPosition: "bottom",
        });
        expect(
          wrapper.find(Label).find(ValidationIcon).find(Tooltip).props()
            .position
        ).toEqual("bottom");
      });
    }
  );

  describe.each(validationTypes)(
    "when %s validation prop is true boolean",
    (validationProp) => {
      it("does not render any validation icon", () => {
        wrapper = renderTextarea({
          children: "mock content",
          [validationProp]: true,
        });
        expect(wrapper.find(ValidationIcon).exists()).toBe(false);
      });
    }
  );

  describe("helpAriaLabel", () => {
    it("should set the aria-label on the Help component", () => {
      const text = "foo";
      wrapper = renderTextarea(
        { label: "foo", labelHelp: text, helpAriaLabel: text },
        mount
      );
      const help = wrapper.find(StyledHelp);

      expect(help.prop("aria-label")).toEqual(text);
    });
  });

  describe('when the "expandable" prop is set to "true"', () => {
    let textarea, textareaInstance;

    beforeEach(() => {
      wrapper = renderTextarea({ expandable: true });
      textarea = wrapper.find("textarea");
      textareaInstance = textarea.instance();
    });

    it("then on window resize the height of the textarea should be the same as it's scrollHeight", () => {
      const expectedScrollHeight = 500;

      jest
        .spyOn(textareaInstance, "scrollHeight", "get")
        .mockImplementation(() => expectedScrollHeight);
      window.dispatchEvent(new Event("resize"));
      expect(textareaInstance.style.height).toEqual(
        `${expectedScrollHeight}px`
      );
    });

    it("then on component update the height of the textarea should be the same as it's scrollHeight", () => {
      const expectedScrollHeight = 500;

      jest
        .spyOn(textareaInstance, "scrollHeight", "get")
        .mockImplementation(() => expectedScrollHeight);
      wrapper.setProps({ value: "abc" });
      expect(textareaInstance.style.height).toEqual(
        `${expectedScrollHeight}px`
      );
    });
  });

  describe("when rendered", () => {
    beforeEach(() => {
      wrapper = renderTextarea();
    });

    it("should have a textarea element as it's child", () => {
      expect(wrapper.find("textarea").exists()).toBe(true);
    });

    it("should have not a CharacterCount as it's child", () => {
      expect(wrapper.find(CharacterCount).exists()).toBe(false);
    });

    it("should only have a placeholder if not disabled", () => {
      wrapper = renderTextarea({ placeholder: "foo", disabled: true });
      expect(wrapper.find(Input).props().placeholder).toEqual("");
    });

    describe("and when characterLimit prop is defined", () => {
      beforeEach(() => {
        wrapper.setProps({ characterLimit: "5" });
      });

      it("should have a CharacterCount as it's child", () => {
        expect(wrapper.find(CharacterCount).exists()).toBe(true);
      });

      describe("and when warnOverLimit prop is true and a limit is over", () => {
        it("should be styled for warn over limit", () => {
          wrapper.setProps({
            warnOverLimit: true,
            value: "abcdefg",
            onChange: jest.fn(),
          });
          assertStyleMatch(
            {
              color: baseTheme.colors.error,
            },
            wrapper.find(CharacterCount)
          );
        });
      });
    });
  });

  it("has a label that is linked to the TextArea", () => {
    wrapper = renderTextarea({ label: "This is a Text Area" });

    const labelHtmlFor = wrapper.find(Label).prop("htmlFor");
    const textAreaId = wrapper.find(Input).prop("id");
    expect(labelHtmlFor).toEqual(textAreaId);
  });

  describe("when labelInline prop is set", () => {
    it("then the input label should accommodate for input internal padding", () => {
      wrapper = renderTextarea({ label: "foo", labelInline: true });

      assertStyleMatch(
        {
          paddingTop: "6px",
          alignItems: "flex-start",
        },
        wrapper,
        { modifier: `${StyledLabelContainer}` }
      );
    });
  });

  describe("when inputWidth is passed", () => {
    it("should be passed to InputPresentation", () => {
      wrapper = renderTextarea({ inputWidth: 30 });
      expect(wrapper.find(InputPresentation).props().inputWidth).toBe(30);
    });
  });

  describe("when inputWidth is not passed", () => {
    it("inputWidth passed to InputPresentation should equal to 100 - labelWIdth", () => {
      wrapper = renderTextarea({ labelWidth: 45 });
      expect(wrapper.find(InputPresentation).props().inputWidth).toBe(55);
    });
  });
});

describe("componentWillUnmount", () => {
  beforeEach(() => {
    spyOn(window, "removeEventListener");
  });

  describe("when textarea can be expanded", () => {
    const tmpWrapper = mount(
      <Textarea
        value="foo"
        name="textarea"
        onChange={jest.fn()}
        label="Label"
        expandable
        cols={10}
        rows={10}
        characterLimit="100"
      />
    );

    it("removes the event listener from the window", () => {
      tmpWrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith(
        "resize",
        jasmine.any(Function)
      );
    });
  });

  describe("when textarea cannot be expanded", () => {
    const tmpWrapper = shallow(
      <Textarea
        id="Dummy Area"
        name="textarea"
        value="foo"
        onChange={jest.fn()}
        label="Label"
        cols={10}
        rows={10}
      />
    );

    it("does not remove event listener from the window", () => {
      tmpWrapper.unmount();
      expect(window.removeEventListener).not.toHaveBeenCalled();
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = renderTextarea({ required: true, label: "required" }, mount);
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("textarea");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });
});

function renderTextarea(props, renderer = mount) {
  return renderer(<Textarea name="textarea" {...props} />);
}
