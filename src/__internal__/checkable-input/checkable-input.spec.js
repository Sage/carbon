import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import "jest-styled-components";
import { css } from "styled-components";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CheckableInput from ".";
import FieldHelpStyle from "../../__experimental__/components/field-help/field-help.style";
import { FieldLineStyle } from "../../__experimental__/components/form-field/form-field.style";
import Label from "../../__experimental__/components/label";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import LabelStyle, {
  StyledLabelContainer,
} from "../../__experimental__/components/label/label.style";
import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
} from "./checkable-input.style";
import StyledHelp from "../../components/help/help.style";
import baseTheme from "../../style/themes/base";

function render(props) {
  return TestRenderer.create(<StyledCheckableInputWrapper {...props} />);
}

describe("CheckableInput", () => {
  function mountInput(props) {
    return mount(
      <CheckableInput
        inputType="text"
        inputValue=""
        onChange={() => null}
        {...props}
      />
    );
  }

  describe("helpId", () => {
    describe("when label and labelHelp props are present", () => {
      it("returns an appropriate helpId property", () => {
        const labelWrapper = mountInput({
          inputId: "foo",
          label: "bar",
          labelHelp: "baz",
        })
          .find(Label)
          .find("label");

        expect(labelWrapper.prop("id")).toBe("foo-label");
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
          modifier: css`
            ${FieldLineStyle}
          `,
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
          modifier: css`
            ${StyledLabelContainer}
          `,
        }
      );
    });

    it("applies the correct base Help styles", () => {
      assertStyleMatch(
        {
          color: baseTheme.help.color,
          verticalAlign: "middle",
        },
        wrapper,
        {
          modifier: css`
            ${`${StyledLabelContainer} ${StyledHelp}`}
          `,
        }
      );
    });

    it.each(states)("applies the correct Help %s styles", (state) => {
      assertStyleMatch({ color: baseTheme.text.color }, wrapper, {
        modifier: css`
          ${`${StyledLabelContainer} ${StyledHelp}:${state}`}
        `,
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
          modifier: css`
            ${`${LabelStyle}:${state}`}
          `,
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
            modifier: css`
              ${`${HiddenCheckableInputStyle}:${state}`}
            `,
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
          modifier: css`
            ${FieldHelpStyle}
          `,
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
            modifier: css`
              ${StyledCheckableInput}
            `,
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
          modifier: css`
            ${StyledLabelContainer}
          `,
        }
      );
    });
  });

  describe("when setting ml", () => {
    it("renders the correct left margin", () => {
      const wrapper = render({ ml: "50%" }).toJSON();

      assertStyleMatch(
        {
          marginLeft: "50%",
        },
        wrapper
      );
    });
  });
});
