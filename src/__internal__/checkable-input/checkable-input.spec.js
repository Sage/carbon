import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import { css } from "styled-components";

import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CheckableInput from ".";
import FieldHelpStyle from "../field-help/field-help.style";
import { FieldLineStyle } from "../form-field/form-field.style";
import Label from "../label";
import FieldHelp from "../field-help";
import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import LabelStyle, { StyledLabelContainer } from "../label/label.style";
import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
} from "./checkable-input.style";
import StyledHelp from "../../components/help/help.style";
import baseTheme from "../../style/themes/base";
import guid from "../utils/helpers/guid";

jest.mock("../utils/helpers/guid");
const mockedGuid = "guid-12345";
guid.mockImplementation(() => "guid-12345");

function render(props) {
  return TestRenderer.create(<StyledCheckableInputWrapper {...props} />);
}

describe("CheckableInput", () => {
  function mountInput(props) {
    return mount(
      <CheckableInput type="text" value="" onChange={() => null} {...props} />
    );
  }

  describe("helpId", () => {
    describe("when label and labelHelp props are present", () => {
      it("passes an appropriate helpId property to Help component", () => {
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
    it("it does not set the aria-labelledby prop on the hidden input", () => {
      const labelWrapper = mountInput({
        id: "foo",
      }).find(HiddenCheckableInputStyle);

      expect(labelWrapper.prop("aria-labelledby")).toBe(undefined);
    });
  });

  describe("aria", () => {
    describe("when ariaLabelledBy is present", () => {
      it("it overrides the labelId value on the hidden input", () => {
        const labelWrapper = mountInput({
          id: "foo",
          label: "bar",
          ariaLabelledBy: "override-bar",
        }).find(HiddenCheckableInputStyle);

        expect(labelWrapper.prop("aria-labelledby")).toBe("override-bar");
      });
    });
    describe("when id", () => {
      describe("is present", () => {
        const commonProps = {
          label: "bar",
          id: "foo",
        };

        describe.each(["info", "warning", "error", "labelHelp"])(
          "and %s are present",
          (validationType) => {
            const hiddenCheckableInputStyle = mountInput({
              ...commonProps,
              [validationType]: "test",
            }).find(HiddenCheckableInputStyle);

            expect(hiddenCheckableInputStyle.prop("aria-describedby")).toBe(
              "foo-help"
            );
          }
        );

        describe("and fieldHelp props are present", () => {
          it("should render a valid 'aria-describedby'", () => {
            const hiddenCheckableInputStyle = mountInput({
              ...commonProps,
              fieldHelp: "baz",
            });

            expect(
              hiddenCheckableInputStyle
                .find(HiddenCheckableInputStyle)
                .prop("aria-describedby")
            ).toBe("foo-field-help");
          });

          describe.each(["info", "warning", "error"])(
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
              ).toBe("foo-field-help foo-help");
            }
          );
        });
      });

      describe("is not present", () => {
        const commonProps = {
          label: "bar",
        };
        describe("and fieldHelp props are present", () => {
          it("should render a valid 'aria-describedby'", () => {
            const hiddenCheckableInputStyle = mountInput({
              ...commonProps,
              fieldHelp: "baz",
            });

            expect(
              hiddenCheckableInputStyle
                .find(HiddenCheckableInputStyle)
                .prop("aria-describedby")
            ).toBe(`${mockedGuid}-field-help`);
          });

          describe.each(["info", "warning", "error"])(
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
              ).toBe(`${mockedGuid}-field-help ${mockedGuid}-help`);
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
});
