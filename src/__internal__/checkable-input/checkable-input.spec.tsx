import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CheckableInput, { CheckableInputProps } from ".";
import FieldHelpStyle from "../field-help/field-help.style";
import { FieldLineStyle } from "../form-field/form-field.style";
import Label from "../label";
import FieldHelp from "../field-help";
import FormField from "../form-field";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import LabelStyle, { StyledLabelContainer } from "../label/label.style";
import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
  StyledCheckableInputWrapperProps,
} from "./checkable-input.style";
import StyledHelp from "../../components/help/help.style";
import guid from "../utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

function render(props?: StyledCheckableInputWrapperProps) {
  return TestRenderer.create(<StyledCheckableInputWrapper {...props} />);
}

describe("CheckableInput", () => {
  function mountInput(props?: Partial<CheckableInputProps>) {
    return mount(
      <CheckableInput type="text" value="" onChange={() => null} {...props} />
    );
  }

  describe("labelId", () => {
    describe("when label and labelHelp props are present", () => {
      it("passes an appropriate id property to Label component", () => {
        const labelWrapper = mountInput({
          id: "foo",
          label: "bar",
          labelHelp: "baz",
        })
          .find(Label)
          .find("label");

        expect(labelWrapper.prop("id")).toBe("foo-label");
      });
    });
  });

  describe("when id and fieldHelp props are present", () => {
    it("returns an appropriate fieldHelpId property", () => {
      const wrapper = mountInput({
        id: "foo",
        fieldHelp: "baz",
      });
      expect(wrapper.find(FieldHelp).prop("id")).toBe("foo-field-help");
    });
  });

  describe("when label prop is not present", () => {
    it("does not set the aria-labelledby prop on the hidden input", () => {
      const labelWrapper = mountInput({
        id: "foo",
      }).find(HiddenCheckableInputStyle);

      expect(labelWrapper.prop("aria-labelledby")).toBe(undefined);
    });
  });

  describe("aria attributes", () => {
    describe("when ariaLabelledBy is present", () => {
      it("overrides the labelId value on the hidden input", () => {
        const labelWrapper = mountInput({
          id: "foo",
          label: "bar",
          ariaLabelledBy: "override-bar",
        }).find(HiddenCheckableInputStyle);

        expect(labelWrapper.prop("aria-labelledby")).toBe("override-bar");
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

        describe.each(["info", "warning", "error"])(
          "and %s are present",
          (validationType) => {
            const wrapper = mountInput({
              ...commonProps,
              [validationType]: "test",
            });

            it('should render a valid "aria-describedby"', () => {
              expect(
                wrapper.find(HiddenCheckableInputStyle).prop("aria-describedby")
              ).toBe(`${id}-validation`);
            });

            it("should pass validationIconId prop to FormField", () => {
              expect(wrapper.find(FormField).prop("validationIconId")).toBe(
                `${id}-validation`
              );
            });
          }
        );

        describe("and fieldHelp props are present", () => {
          it("should render a valid 'aria-describedby'", () => {
            const wrapper = mountInput({
              ...commonProps,
              fieldHelp: "baz",
            });

            expect(
              wrapper.find(HiddenCheckableInputStyle).prop("aria-describedby")
            ).toBe(`${id}-field-help`);
          });

          it("should pass fieldHelpId to FormField", () => {
            const wrapper = mountInput({
              ...commonProps,
              fieldHelp: "baz",
            });

            expect(wrapper.find(FormField).prop("fieldHelpId")).toBe(
              `${id}-field-help`
            );
          });

          it.each(["info", "warning", "error"])(
            "and %s is present too",
            (validationType) => {
              const hiddenCheckableInputStyle = mountInput({
                ...commonProps,
                fieldHelp: "baz",
                [validationType]: "test",
              });

              expect(
                hiddenCheckableInputStyle
                  .find(HiddenCheckableInputStyle)
                  .prop("aria-describedby")
              ).toBe(`${id}-field-help ${id}-validation`);
            }
          );
        });
      });
    });
  });
});

describe("StyledCheckableInputWrapper", () => {
  const states = ["focus", "hover"];

  describe("default", () => {
    const wrapper = render().toJSON();

    it("applies the correct FormField styles", () => {
      assertStyleMatch(
        {
          display: "flex",
        },
        wrapper,
        {
          modifier: `${FieldLineStyle}`,
        }
      );
    });

    it("applies the correct Label styles", () => {
      assertStyleMatch(
        {
          width: "auto",
        },
        wrapper,
        {
          modifier: `${StyledLabelContainer}`,
        }
      );
    });

    it("applies the correct base Help styles", () => {
      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin065)",
          verticalAlign: "middle",
        },
        wrapper,
        {
          modifier: `${StyledLabelContainer} ${StyledHelp}`,
        }
      );
    });

    it.each(states)("applies the correct Help %s styles", (state) => {
      assertStyleMatch({ color: "var(--colorsUtilityYin090)" }, wrapper, {
        modifier: `${StyledLabelContainer} ${StyledHelp}:${state}`,
      });
    });
  });

  describe("when disabled = true", () => {
    const wrapper = render({ disabled: true }).toJSON();

    it.each(states)("applies the correct Label %s styles", (state) => {
      assertStyleMatch(
        {
          outline: "none",
          cursor: "not-allowed",
        },
        wrapper,
        {
          modifier: `${LabelStyle}:${state}`,
        }
      );
    });

    it.each(states)(
      "applies the correct HiddenCheckableInput %s styles",
      (state) => {
        assertStyleMatch(
          {
            outline: "none",
            cursor: "not-allowed",
          },
          wrapper,
          {
            modifier: `${HiddenCheckableInputStyle}:${state}`,
          }
        );
      }
    );
  });

  describe("when fieldHelpInline === true", () => {
    it("applies the correct Label styles", () => {
      const wrapper = render({ fieldHelpInline: true }).toJSON();

      assertStyleMatch(
        {
          flexGrow: "0",
          flexBasis: "auto",
          paddingLeft: "0",
          width: "auto",
        },
        wrapper,
        {
          modifier: `${FieldHelpStyle}`,
        }
      );
    });
  });

  describe("when setting a custom inputWidth", () => {
    describe("default", () => {
      const wrapper = render({ inputWidth: 50 }).toJSON();

      it("renders the correct CheckableInput styles", () => {
        assertStyleMatch(
          {
            width: "50% !important",
          },
          wrapper,
          {
            modifier: `${StyledCheckableInput}`,
          }
        );
      });
    });
  });

  describe("when setting a custom labelWidth", () => {
    it("renders the correct Label styles", () => {
      const wrapper = render({ labelWidth: 50 }).toJSON();

      assertStyleMatch(
        {
          width: "50% !important",
        },
        wrapper,
        {
          modifier: `${StyledLabelContainer}`,
        }
      );
    });
  });
});
