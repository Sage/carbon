import React from "react";
import { mount } from "enzyme";
import FormField, { FormFieldProps } from "./form-field.component";
import FieldHelp from "../field-help";
import { FieldLineStyle } from "./form-field.style";
import Label from "../label";
import { TabContext } from "../../components/tabs/tab";
import {
  assertStyleMatch,
  mockMatchMedia,
} from "../../__spec_helper__/test-utils";

const setError = jest.fn();
const setWarning = jest.fn();
const setInfo = jest.fn();

function render(formFieldProps: FormFieldProps) {
  return mount(
    <FormField {...formFieldProps}>
      <input id={formFieldProps.id} />
    </FormField>
  );
}

function renderWithTabContext(formFieldProps: FormFieldProps) {
  return mount(
    <TabContext.Provider value={{ setError, setWarning, setInfo }}>
      <FormField {...formFieldProps}>
        <input id={formFieldProps.id} />
      </FormField>
    </TabContext.Provider>
  );
}

describe("FormField", () => {
  it("with the mb prop set, correct bottom margin should be set", () => {
    const wrapper = render({ id: "mock-input", mb: 5 });

    assertStyleMatch(
      {
        marginBottom: "var(--spacing500)",
      },
      wrapper.find(FormField),
      { modifier: "&&&" }
    );
  });

  describe("with a label", () => {
    it("renders label alongside children", () => {
      const wrapper = render({
        id: "mock-input",
        label: "Name",
        labelAlign: "left",
        labelWidth: 20,
      });

      expect(wrapper.find("label[data-element='label']").exists()).toBe(true);
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it.each([
      [false, "block"],
      [true, "flex"],
    ])(
      "when labelInline prop is %s, make container of input and label a %s container",
      (labelInline, display) => {
        const wrapper = render({
          id: "mock-input",
          label: "Name",
          labelInline,
          labelAlign: "left",
          labelWidth: 20,
        });

        assertStyleMatch(
          {
            display,
          },
          wrapper.find(FieldLineStyle)
        );
      }
    );

    it("renders label with htmlFor prop that is the id of the input", () => {
      const id = "foo";
      const wrapper = render({
        id,
        label: "Name",
      });
      expect(wrapper.find(`input[id='${id}']`).exists()).toBe(true);
      expect(wrapper.find(`label[htmlFor='${id}']`).exists()).toBe(true);
    });

    it("passes the tooltipId to the Label id prop", () => {
      const tooltipId = "test-help-id";
      expect(
        render({ id: "mock-input", tooltipId, label: "test label" })
          .find(Label)
          .prop("tooltipId")
      ).toBe(tooltipId);
    });

    describe("when validationRedesignOptIn is true", () => {
      it("does not set the validation props on the Label", () => {
        const wrapper = render({
          id: "mock-input",
          label: "test label",
          error: true,
          warning: true,
          info: true,
          validationRedesignOptIn: true,
        });
        const { error, warning, info } = wrapper.find(Label).props();

        expect(error).toEqual(false);
        expect(warning).toEqual(false);
        expect(info).toEqual(false);
      });
    });

    describe("when adaptiveLabelBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass labelInline to its children", () => {
          const wrapper = render({
            id: "mock-input",
            label: "Name",
            labelInline: true,
            fieldHelp: "Help",
            adaptiveLabelBreakpoint: 1000,
          });

          expect(wrapper.find(FieldLineStyle).props().inline).toEqual(true);
          expect(wrapper.find(Label).props().inline).toEqual(true);
          expect(wrapper.find(FieldHelp).props().labelInline).toEqual(true);
        });
      });

      describe("when screen smaller than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(false);
        });

        it("should pass labelInline to its children", () => {
          const wrapper = render({
            id: "mock-input",
            label: "Name",
            labelInline: true,
            fieldHelp: "Help",
            adaptiveLabelBreakpoint: 1000,
          });

          expect(wrapper.find(FieldLineStyle).props().inline).toEqual(false);
          expect(wrapper.find(Label).props().inline).toEqual(false);
          expect(wrapper.find(FieldHelp).props().labelInline).toEqual(false);
        });
      });
    });
  });

  describe("with fieldHelp", () => {
    const fieldHelpId = "mock-id";
    const fieldHelp = "Help me!";

    it("renders field help element with correct id", () => {
      const wrapper = render({
        id: "mock-input",
        fieldHelpId,
        fieldHelp,
        labelWidth: 20,
      });
      expect(wrapper.find(`[id='${fieldHelpId}']`).exists()).toBe(true);
    });

    it("when fieldHelpInline and labelInline props are true, field help is rendered inline with input", () => {
      const wrapper = render({
        id: "mock-input",
        fieldHelpId,
        fieldHelp,
        labelWidth: 20,
        fieldHelpInline: true,
        labelInline: true,
      });
      assertStyleMatch({ display: "flex" }, wrapper.find(FieldLineStyle));
      expect(wrapper.find(FieldLineStyle).find(FieldHelp).exists()).toBe(true);
    });

    it("when fieldHelpInline prop is false and labelInline is true, field help is not rendered inline with input", () => {
      const wrapper = render({
        id: "mock-input",
        fieldHelpId,
        fieldHelp,
        labelWidth: 20,
        fieldHelpInline: false,
        labelInline: true,
      });
      assertStyleMatch({ display: "flex" }, wrapper.find(FieldLineStyle));
      expect(wrapper.find(FieldLineStyle).find(FieldHelp).exists()).toBe(false);
    });
  });

  describe("with TabContext", () => {
    it('calls "setError" when has "error" is true', () => {
      renderWithTabContext({ id: "foo", error: true });
      expect(setError).toHaveBeenCalledWith("foo", true);
    });

    it('calls "setWarning" when has "warning" is true', () => {
      renderWithTabContext({ id: "foo", warning: true });
      expect(setWarning).toHaveBeenCalledWith("foo", true);
    });

    it('calls "setInfo" when has "info" is true', () => {
      renderWithTabContext({ id: "foo", info: true });
      expect(setInfo).toHaveBeenCalledWith("foo", true);
    });
  });

  it.each(["error", "warning", "info"])(
    "validates the %s prop to throw an error if disabled is set as well",
    (validation) => {
      // Even though error is caught, it is still printed to console so mock console.error
      // to avoid this. See https://github.com/facebook/jest/issues/5785 for details
      const consoleSpy = jest.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      const error =
        `Prop \`${validation}\` cannot be used in conjunction with \`disabled\`. ` +
        "Use `readOnly` if you require users to see validations with a non-interactive field";

      expect(() =>
        renderWithTabContext({
          id: "mock-input",
          disabled: true,
          [validation]: true,
        })
      ).toThrow(error);

      consoleSpy.mockRestore();
    }
  );
});
