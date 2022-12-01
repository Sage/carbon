import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import CharacterCount from "../../__internal__/character-count";
import Textarea, { TextareaProps } from ".";
import InputPresentation from "../../__internal__/input/input-presentation.component";
import { Input } from "../../__internal__/input";
import FormField from "../../__internal__/form-field";
import Label from "../../__internal__/label";
import ValidationIcon from "../../__internal__/validations/validation-icon.component";
import guid from "../../__internal__/utils/helpers/guid";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import StyledTextarea from "./textarea.style";

jest.mock("../../__internal__/utils/helpers/guid");
const mockedGuid = "guid-12345";
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

function renderTextarea(props?: TextareaProps, renderer = mount) {
  return renderer(<Textarea name="textarea" {...props} />);
}

describe("Textarea", () => {
  let wrapper: ReactWrapper;

  testStyledSystemMargin((props) => <Textarea {...props} />);
  describe("when textarea is rendered with default props", () => {
    let textarea: HTMLInputElement;

    beforeAll(() => {
      wrapper = renderTextarea();
      textarea = wrapper.find("textarea").getDOMNode();
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

  describe("when value prop set initially", () => {
    it("should display the correct value", () => {
      wrapper = renderTextarea({
        value: "Initial content",
      });

      expect(wrapper.find(Input).text()).toEqual("Initial content");
    });
  });

  it.each([
    {
      inputIcon: "search",
    },
    {
      error: "error",
    },
    {
      warning: "warning",
    },
    {
      info: "info",
    },
  ] as const)(
    "pass hasIcon to InputPresentation when an icon is present inside",
    (props) => {
      wrapper = renderTextarea({
        children: "mock content",
        ...props,
      });
      expect(wrapper.find(StyledTextarea).props().hasIcon).toBe(true);
    }
  );

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

  describe("aria attributes", () => {
    describe("label help", () => {
      it("passes the expected values to the help component", () => {
        const text = "foo";
        wrapper = mount(
          <Textarea
            value=""
            label={text}
            labelHelp={text}
            helpAriaLabel={text}
          />
        );

        expect(wrapper.find(StyledHelp).prop("aria-label")).toEqual(text);
      });
    });

    describe("when id", () => {
      describe.each([
        ["is present", true, "foo"],
        ["is not present", false, mockedGuid],
      ])("%s", (_, isPresent, id) => {
        const commonProps = {
          label: "bar",
          ...(isPresent && { id: "foo" }),
        };

        describe("and label is present", () => {
          it("passes aria-labelledby", () => {
            wrapper = mount(<Textarea {...commonProps} />);
            expect(wrapper.find(Input).prop("aria-labelledby")).toBe(
              `${id}-label`
            );
          });
        });

        describe.each(["info", "warning", "error"])(
          "and %s are present",
          (validationType) => {
            const textarea = mount(
              <Textarea {...commonProps} {...{ [validationType]: "test" }} />
            );

            it('should render a valid "aria-describedby"', () => {
              expect(textarea.find(Input).prop("aria-describedby")).toBe(
                `${id}-validation-icon`
              );
            });
          }
        );

        describe("and fieldHelp props are present", () => {
          it("should render a valid 'aria-describedby'", () => {
            const textarea = mount(
              <Textarea {...commonProps} fieldHelp="baz" />
            );

            expect(textarea.find(Input).prop("aria-describedby")).toBe(
              `${id}-field-help`
            );
          });

          it("should pass fieldHelpId to FormField", () => {
            const textarea = mount(
              <Textarea {...commonProps} fieldHelp="baz" />
            );
            expect(textarea.find(FormField).prop("fieldHelpId")).toBe(
              `${id}-field-help`
            );
          });

          describe.each(["info", "warning", "error"])(
            "and %s is present too",
            (validationType) => {
              const textarea = mount(
                <Textarea
                  {...commonProps}
                  fieldHelp="baz"
                  {...{ [validationType]: "test" }}
                />
              );

              it('should render a valid "aria-describedby"', () => {
                expect(textarea.find(Input).prop("aria-describedby")).toBe(
                  `${id}-field-help ${id}-validation-icon`
                );
              });
            }
          );
        });
      });
    });
  });

  describe('when the "expandable" prop is set to "true"', () => {
    let textarea: HTMLInputElement;

    beforeEach(() => {
      wrapper = renderTextarea({ expandable: true });
      textarea = wrapper.find("textarea").getDOMNode();
    });

    it("then on window resize the height of the textarea should be the same as it's scrollHeight", () => {
      const expectedScrollHeight = 500;

      jest
        .spyOn(textarea, "scrollHeight", "get")
        .mockImplementation(() => expectedScrollHeight);
      window.dispatchEvent(new Event("resize"));
      expect(textarea.style.height).toEqual(`${expectedScrollHeight}px`);
    });

    it("then on component update the height of the textarea should be the same as it's scrollHeight", () => {
      const expectedScrollHeight = 500;

      jest
        .spyOn(textarea, "scrollHeight", "get")
        .mockImplementation(() => expectedScrollHeight);
      wrapper.setProps({ value: "abc" });
      expect(textarea.style.height).toEqual(`${expectedScrollHeight}px`);
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
        wrapper.setProps({ characterLimit: 5 });
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
              color: "var(--colorsSemanticNegative500)",
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
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    removeEventListenerSpy.mockRestore();
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
        characterLimit={100}
      />
    );

    it("removes the event listener from the window", () => {
      tmpWrapper.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
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
      expect(
        removeEventListenerSpy.mock.calls.filter((call) => call[0] === "resize")
      ).toHaveLength(0);
    });
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

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

  describe("new validations", () => {
    const renderWithNewValidations = ({ error, warning }: TextareaProps) =>
      mount(
        <CarbonProvider validationRedesignOptIn>
          <Textarea
            labelHelp="Example hint text"
            error={error}
            warning={warning}
            labelAlign="left"
            labelInline
            labelWidth={100}
          />
        </CarbonProvider>
      );

    describe("label width and align props", () => {
      it("default to undefined", () => {
        const wrapper = renderWithNewValidations({});
        const { labelAlign, labelInline, reverse, labelWidth } = wrapper
          .find(FormField)
          .props();

        expect(labelAlign).toEqual(undefined);
        expect(labelInline).toEqual(undefined);
        expect(reverse).toEqual(undefined);
        expect(labelWidth).toEqual(undefined);
      });
    });

    describe("hint/ labelHelp", () => {
      it("is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({});
        expect(wrapper.find(StyledHintText).text()).toEqual(
          "Example hint text"
        );
      });

      it("applies the expected styling", () => {
        const wrapper = renderWithNewValidations({});

        assertStyleMatch(
          {
            fontSize: "14px",
            marginTop: "0px",
            marginBottom: "8px",
            color: "var(--colorsUtilityYin055)",
          },
          wrapper.find(StyledHintText)
        );
      });
    });

    describe("new validation design", () => {
      it("error message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ error: "error" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });

      it("warning message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ warning: "warning" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });
    });
  });
});
