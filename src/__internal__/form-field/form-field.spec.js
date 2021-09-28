import React from "react";
import { shallow, mount } from "enzyme";

import FormField from ".";
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

function render(props, renderer = shallow) {
  return renderer(
    <FormField id="formField" {...props}>
      <input />
    </FormField>
  );
}

function renderWithContext(props) {
  return mount(
    <TabContext.Provider value={{ setError, setWarning, setInfo }}>
      <FormField id="formField" {...props}>
        <input />
      </FormField>
    </TabContext.Provider>
  );
}

describe("FormField", () => {
  describe("with mb prop set", () => {
    it("should set the correct bottom margin", () => {
      const wrapper = render({ mb: 5 }, mount);

      assertStyleMatch(
        {
          marginBottom: "40px",
        },
        wrapper,
        { modifier: "&&&" }
      );
    });
  });

  describe("with a label", () => {
    it("renders the label component above the childen", () => {
      expect(
        render({
          label: "Name",
          labelAlign: "left",
          labelHelp: "Help me!",
          labelInline: true,
          labelWidth: 20,
          size: "small",
          helpId: "test-help-id",
        }).children()
      ).toMatchSnapshot();
    });

    it("passes the id to the Label htmlFor prop", () => {
      const comp = render({
        id: "foo",
        name: "foo",
        label: "Name",
      });
      expect(comp.find(Label).props().htmlFor).toEqual("foo");
    });

    it("passes the helpId to the Label id prop", () => {
      const helpId = "test-help-id";
      expect(
        render({ helpId, label: "test label" }).find(Label).prop("helpId")
      ).toBe(helpId);
    });

    describe("when adaptiveLabelBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass labelInline to its children", () => {
          const wrapper = render(
            {
              label: "Name",
              labelInline: true,
              fieldHelp: "Help",
              adaptiveLabelBreakpoint: 1000,
            },
            mount
          );

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
          const wrapper = render(
            {
              label: "Name",
              labelInline: true,
              fieldHelp: "Help",
              adaptiveLabelBreakpoint: 1000,
            },
            mount
          );

          expect(wrapper.find(FieldLineStyle).props().inline).toEqual(false);
          expect(wrapper.find(Label).props().inline).toEqual(false);
          expect(wrapper.find(FieldHelp).props().labelInline).toEqual(false);
        });
      });
    });
  });

  describe("with fieldHelp", () => {
    describe("default", () => {
      it("renders the FieldHelp component below the childen", () => {
        expect(
          render({
            fieldHelp: "Help me!",
            labelInline: true,
            labelWidth: 20,
          }).children()
        ).toMatchSnapshot();
      });
    });

    describe("and fieldHelpInline=true", () => {
      it("renders the FieldHelp component below the childen", () => {
        expect(
          render({
            fieldHelp: "Help me!",
            fieldHelpInline: true,
            labelInline: true,
            labelWidth: 20,
          }).children()
        ).toMatchSnapshot();
      });
    });

    it("passes the fieldHelpId to the FieldHelp id prop", () => {
      const fieldHelpId = "test-help-id";
      expect(
        render({ fieldHelpId, fieldHelp: "test label" })
          .find(FieldHelp)
          .prop("id")
      ).toBe(fieldHelpId);
    });

    describe("with TabContext", () => {
      it('calls "setError" when has "error" is true', () => {
        renderWithContext({ error: true, id: "foo" });
        expect(setError).toHaveBeenCalledWith("foo", true);
      });

      it('calls "setWarning" when has "warning" is true', () => {
        renderWithContext({ warning: true, id: "foo" });
        expect(setWarning).toHaveBeenCalledWith("foo", true);
      });

      it('calls "setInfo" when has "info" is true', () => {
        renderWithContext({ info: true, id: "foo" });
        expect(setInfo).toHaveBeenCalledWith("foo", true);
      });
    });
  });

  it.each(["error", "warning", "info"])(
    "validates the %s prop to throw an error if disabled is set as well",
    (validation) => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      renderWithContext({ disabled: true, id: "foo", [validation]: true });
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        `Warning: Failed prop type: Prop \`${validation}\` cannot ` +
          "be used in conjunction with `disabled`. Use `readOnly` if you require users to see validations with a " +
          "non-interactive field\n    in FormField"
      );
      global.console.error.mockReset();
    }
  );
});
