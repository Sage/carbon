import React, { useRef } from "react";
import { mount, shallow, ReactWrapper, ShallowWrapper } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemSpacing,
  testStyledSystemPadding,
} from "../../__spec_helper__/__internal__/test-utils";
import Form, { FormProps } from "./form.component";
import {
  StyledLeftButtons,
  StyledRightButtons,
  StyledFormFooter,
  StyledForm,
  StyledFormContent,
  StyledFullWidthButtons,
} from "./form.style";
import FormSummary from "./__internal__/form-summary.component";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import {
  StyledFormSummary,
  StyledInternalSummary,
  StyledMessagePrefix,
} from "./__internal__/form-summary.style";
import Icon from "../icon";
import Button from "../button";
import Fieldset from "../fieldset";
import { FieldsetStyle } from "../fieldset/fieldset.style";
import StyledSearch from "../search/search.style";
import Textarea from "../textarea";
import Textbox from "../textbox";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import StyledTextarea from "../textarea/textarea.style";
import Dialog from "../dialog";
import { formSpacing } from "./form.config";
import StyledButton from "../button/button.style";
import { StyledFieldset } from "../../__internal__/fieldset/fieldset.style";
import { Select, Option } from "../select";
import StyledSelect from "../select/select.style";
import InlineInputs from "../inline-inputs";
import StyledInlineInputs from "../inline-inputs/inline-inputs.style";

jest.mock("../../hooks/__internal__/useResizeObserver");

describe("Form", () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(<Form />);
  });

  testStyledSystemSpacing((props) => <Form {...props} />);

  it("allows custom classes to be added to the Form", () => {
    wrapper.setProps({ className: "foo" });
    expect(wrapper.find(StyledForm).hasClass("foo")).toBeTruthy();
  });

  it("does not render the StyledFormFooter container by default", () => {
    expect(wrapper.find(StyledFormFooter).exists()).toBeFalsy();
  });

  describe("when search used in Form component", () => {
    it.each([
      ["Search", StyledSearch],
      ["Textarea", StyledTextarea],
    ])(
      "should have no addition margin-bottom on form field when %s rendered",
      (_, sc) => {
        wrapper = mount(<StyledForm fieldSpacing={0} />);

        assertStyleMatch(
          {
            marginBottom: "var(--spacing000)",
          },
          wrapper,
          { modifier: `${sc} ${StyledFormField}` }
        );
      }
    );
  });

  describe("when height prop is set", () => {
    it("sets the correct height onto StyledForm", () => {
      wrapper = mount(<StyledForm height="100px" fieldSpacing={0} />);

      assertStyleMatch(
        {
          height: "100px",
        },
        wrapper.find(StyledForm)
      );
    });
  });

  describe.each<FormProps["fieldSpacing"]>([undefined, 0, 1, 2, 3, 4, 5, 6, 7])(
    "When %s is passed to `fieldSpacing` prop",
    (spacing) => {
      it("applies the expected margin to the children inputs if they do not have custom values passed", () => {
        wrapper = mount(
          <Form fieldSpacing={spacing}>
            <Textbox onChange={() => {}} />
            <Textarea characterLimit={50} onChange={() => {}} />
            <RadioButtonGroup name="bar" onChange={() => {}}>
              <RadioButton value="1" />
            </RadioButtonGroup>
            <Select>
              <Option value="1" text="text" />
            </Select>
            <Fieldset>
              <Textbox onChange={() => {}} />
              <Select>
                <Option value="1" text="text" />
              </Select>
            </Fieldset>
            <InlineInputs>
              <Textbox onChange={() => {}} />
              <Textbox onChange={() => {}} />
              <Textbox onChange={() => {}} />
            </InlineInputs>
          </Form>
        );

        const result = {
          marginBottom: formSpacing[spacing === undefined ? 3 : spacing],
          marginTop: "var(--spacing000)",
        };

        assertStyleMatch(result, wrapper.find(Textbox).find(StyledFormField), {
          modifier: "&&&",
        });

        assertStyleMatch(result, wrapper.find(StyledTextarea));

        assertStyleMatch(
          result,
          wrapper.find(RadioButtonGroup).find(StyledFieldset)
        );

        assertStyleMatch(result, wrapper.find(StyledSelect));

        // does not apply form spacing to the composed input as well
        assertStyleMatch(
          { marginBottom: "var(--spacing000)", marginTop: "var(--spacing000)" },
          wrapper.find(StyledSelect).find(StyledFormField),
          { modifier: "&&&" }
        );

        assertStyleMatch(result, wrapper.find(FieldsetStyle));

        // does not apply form spacing to the composed input as well
        assertStyleMatch(
          { marginBottom: undefined },
          wrapper.find(FieldsetStyle).find(StyledSelect)
        );

        assertStyleMatch(result, wrapper.find(StyledInlineInputs));
      });

      it("does not apply margin to the children inputs if they have custom values passed", () => {
        wrapper = mount(
          <Form fieldSpacing={spacing}>
            <Textbox my={1} onChange={() => {}} />
            <Textarea characterLimit={50} my={1} onChange={() => {}} />
            <Button my={1}>Foo</Button>
            <RadioButtonGroup name="bar" my={1} onChange={() => {}}>
              <RadioButton value="1" />
            </RadioButtonGroup>
            <Select my={1}>
              <Option value="1" text="text" />
            </Select>
            <Fieldset my={1}>
              <Textbox onChange={() => {}} />
              <Select>
                <Option value="1" text="text" />
              </Select>
            </Fieldset>
            <InlineInputs my={1}>
              <Textbox onChange={() => {}} />
              <Textbox onChange={() => {}} />
              <Textbox onChange={() => {}} />
            </InlineInputs>
          </Form>
        );

        const result = {
          marginBottom: "var(--spacing100)",
          marginTop: "var(--spacing100)",
        };

        assertStyleMatch(result, wrapper.find(Textbox).find(StyledFormField), {
          modifier: "&&&",
        });

        assertStyleMatch(result, wrapper.find(StyledTextarea));

        assertStyleMatch(result, wrapper.find(StyledButton));

        assertStyleMatch(
          result,
          wrapper.find(RadioButtonGroup).find(StyledFieldset)
        );

        assertStyleMatch(result, wrapper.find(StyledSelect));

        assertStyleMatch(result, wrapper.find(FieldsetStyle));

        assertStyleMatch(result, wrapper.find(StyledInlineInputs));
      });
    }
  );

  describe("when stickyFooter prop is true", () => {
    const assertThatFooterIsSticky = () => {
      wrapper.update();
      expect(wrapper.find(StyledFormFooter).hasClass("sticky")).toBe(true);

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityYang100)",
          boxShadow: "0 -4px 12px 0 rgba(0,0,0,0.05)",
          boxSizing: "border-box",
          padding: "16px 32px",
          width: "100%",
          zIndex: "1000",
          position: "sticky",
          bottom: "0",
        },
        wrapper.find(StyledFormFooter)
      );

      assertStyleMatch(
        {
          overflowY: "inherit",
          flex: "1",
        },
        wrapper.find(StyledFormContent)
      );

      assertStyleMatch(
        {
          display: "flex",
          flexDirection: "column",
          position: "relative",
        },
        wrapper.find(StyledForm)
      );
    };

    it("when not rendered in a container, render footer with sticky styles", () => {
      wrapper = mount(
        <Form
          stickyFooter
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        />
      );

      assertThatFooterIsSticky();
    });

    it("when rendered in a container, render footer with sticky styles", () => {
      const Component = () => {
        const ref = useRef<HTMLDivElement>(null);
        return (
          <div id="test-container" ref={ref}>
            <Form
              stickyFooter
              saveButton={
                <Button buttonType="primary" type="submit">
                  Save
                </Button>
              }
            >
              <span>form content</span>
            </Form>
          </div>
        );
      };

      wrapper = mount(<Component />);
      assertThatFooterIsSticky();
    });

    it("when inside a modal-like component and form content overflows the expected styling is applied", () => {
      wrapper = mount(
        <Dialog open disableAutoFocus>
          <Form
            height="200px"
            stickyFooter
            saveButton={<Button>Submit</Button>}
          >
            <div style={{ height: 300 }}>Content</div>
          </Form>
        </Dialog>
      );

      expect(wrapper.find("[data-element='form-content']")).toHaveStyleRule(
        "overflow-y",
        "auto"
      );

      expect(wrapper.find(StyledForm)).toHaveStyleRule(
        "max-height",
        "calc(100vh - 216px)"
      );
    });
  });

  describe("form buttons", () => {
    const saveButton = <Button id="mySaveButton">Save</Button>;
    const leftSideButtons = (
      <>
        <Button id="myLeftButton1">Left1</Button>
        <Button id="myLeftButton2">Left2</Button>
      </>
    );
    const rightSideButtons = (
      <>
        <Button id="myRightButton1">Right1</Button>
        <Button id="myRightButton2">Right2</Button>
      </>
    );

    beforeEach(() => {
      wrapper = shallow(
        <Form
          leftSideButtons={leftSideButtons}
          saveButton={saveButton}
          rightSideButtons={rightSideButtons}
        />
      );
    });

    it("renders buttons passed as the leftSideButtons prop", () => {
      expect(
        wrapper.find(StyledFormFooter).childAt(0).is(StyledLeftButtons)
      ).toBe(true);
      expect(
        wrapper.find(StyledLeftButtons).find(Button).at(0).props().id
      ).toBe("myLeftButton1");
      expect(
        wrapper.find(StyledLeftButtons).find(Button).at(1).props().id
      ).toBe("myLeftButton2");
    });

    it("renders button passed as the saveButton prop wrapped by the Form Summary", () => {
      expect(wrapper.find(StyledFormFooter).childAt(1).is(FormSummary)).toBe(
        true
      );
      expect(
        wrapper.find(StyledFormFooter).find(FormSummary).find(Button).props().id
      ).toBe("mySaveButton");
    });

    it("renders buttons passed as the rightSideButtons prop", () => {
      expect(
        wrapper.find(StyledFormFooter).childAt(2).is(StyledRightButtons)
      ).toBe(true);
      expect(
        wrapper.find(StyledRightButtons).find(Button).at(0).props().id
      ).toBe("myRightButton1");
      expect(
        wrapper.find(StyledRightButtons).find(Button).at(1).props().id
      ).toBe("myRightButton2");
    });
  });

  describe("styles", () => {
    it('applies flex-grow: 1 to right side buttons when buttonAlignment prop is "left"', () => {
      wrapper.setProps({ buttonAlignment: "left", rightSideButtons: <div /> });
      assertStyleMatch(
        {
          flexGrow: "1",
        },
        wrapper.find(StyledRightButtons)
      );
    });

    it('applies flex-grow: 1 to left side buttons when buttonAlignment prop is "right"', () => {
      wrapper.setProps({ buttonAlignment: "right", leftSideButtons: <div /> });
      assertStyleMatch(
        {
          flexGrow: "1",
        },
        wrapper.find(StyledLeftButtons)
      );
    });

    it('align all buttons to right when buttonAlignment prop is "right"', () => {
      wrapper.setProps({
        buttonAlignment: "right",
        saveButton: (
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        ),
      });
      assertStyleMatch(
        {
          justifyContent: "flex-end",
        },
        wrapper.find(StyledFormFooter)
      );
    });

    it("form summary has proper background when errorCount or warningCount are passed", () => {
      wrapper.setProps({
        warningCount: 1,
        saveButton: (
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        ),
      });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor025)",
        },
        wrapper.find(StyledFormSummary)
      );
      wrapper.setProps({ errorCount: 1 });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor025)",
        },
        wrapper.find(StyledFormSummary)
      );
    });
  });

  describe("FormSummary", () => {
    beforeEach(() => {
      wrapper = mount(
        <Form
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        />
      );
    });

    it("renders save button with FormSummary", () => {
      const saveButton = <Button id="mySaveButton">Save</Button>;

      wrapper.setProps({ saveButton });
      expect(wrapper.find(FormSummary).find(Button).props().id).toBe(
        "mySaveButton"
      );
    });

    describe("when errorCount prop is set on Form", () => {
      it("renders error summary with properly colored icon and text", () => {
        wrapper.setProps({ errorCount: 1 });
        const errorSummary = wrapper.find('[data-element="errors"]');
        expect(errorSummary.find(Icon).props().type).toBe("error");
        expect(wrapper.find(StyledMessagePrefix).text()).toBe("There is");
        expect(errorSummary.find("span").at(1).text()).toBe("1 error");

        assertStyleMatch(
          {
            color: "var(--colorsSemanticNegative600)",
          },
          errorSummary
        );
      });
    });

    describe("when warningCount prop is set on Form", () => {
      it("renders warning summary with properly colored icon and text", () => {
        wrapper.setProps({ warningCount: 1 });
        const warningSummary = wrapper.find('[data-element="warnings"]');
        expect(warningSummary.find(Icon).props().type).toBe("warning");
        expect(wrapper.find(StyledMessagePrefix).text()).toBe("There is");
        expect(warningSummary.find("span").at(1).text()).toBe("1 warning");

        assertStyleMatch(
          {
            color: "var(--colorsSemanticCaution650)",
          },
          warningSummary
        );
      });
    });

    describe("when both warningCount and errorCount prop is set on Form", () => {
      it("renders error summary with properly colored icon and text as first element", () => {
        wrapper.setProps({ warningCount: 1, errorCount: 1 });
        const errorSummary = wrapper.find(StyledInternalSummary).at(0);
        expect(errorSummary.find(Icon).props().type).toBe("error");

        assertStyleMatch(
          {
            color: "var(--colorsSemanticNegative600)",
          },
          errorSummary
        );
      });

      it("renders warning summary with properly colored icon and text as second element", () => {
        wrapper.setProps({ warningCount: 1, errorCount: 1 });
        const warningSummary = wrapper.find(StyledInternalSummary).at(1);
        expect(warningSummary.find(Icon).props().type).toBe("warning");

        assertStyleMatch(
          {
            color: "var(--colorsSemanticCaution650)",
          },
          warningSummary
        );
      });
    });

    describe("when both errorCount and warningCount are set", () => {
      it.each([
        [1, 1, "There are", "1 error", "and", "1 warning"],
        [2, 1, "There are", "2 errors", "and", "1 warning"],
        [2, 2, "There are", "2 errors", "and", "2 warnings"],
      ])(
        "properly pluralized translation of error and warning messages is rendered",
        (
          errorCount,
          warningCount,
          errPrefix,
          errMessage,
          warnPrefix,
          warnMessage
          // eslint-disable-next-line max-params
        ) => {
          wrapper.setProps({ errorCount, warningCount });

          expect(wrapper.find(StyledMessagePrefix).at(0).text()).toBe(
            errPrefix
          );

          expect(wrapper.find(StyledInternalSummary).at(0).text()).toBe(
            errMessage
          );

          expect(wrapper.find(StyledMessagePrefix).at(1).text()).toBe(
            warnPrefix
          );

          expect(wrapper.find(StyledInternalSummary).at(1).text()).toBe(
            warnMessage
          );
        }
      );
    });

    describe("when errorCount is set but not warningCount", () => {
      it.each([
        [1, "There is", "1 error"],
        [2, "There are", "2 errors"],
      ])(
        "properly pluralized translation of error and messages is rendered",
        (errorCount, errPrefix, errMessage) => {
          wrapper.setProps({ errorCount });

          expect(wrapper.find(StyledMessagePrefix).text()).toBe(errPrefix);

          expect(wrapper.find(StyledInternalSummary).text()).toBe(errMessage);
        }
      );
    });

    describe("when warningCount is set but not errorCount", () => {
      it.each([
        [1, "There is", "1 warning"],
        [2, "There are", "2 warnings"],
      ])(
        "properly pluralized translation of error and warning messages is rendered",
        (warningCount, warnPrefix, warnMessage) => {
          wrapper.setProps({ warningCount });

          expect(wrapper.find(StyledMessagePrefix).text()).toBe(warnPrefix);

          expect(wrapper.find(StyledInternalSummary).text()).toBe(warnMessage);
        }
      );
    });

    it("when there are no errors and warnings", () => {
      wrapper.setProps({ errorCount: 0, warningCount: 0 });

      expect(wrapper.find(StyledInternalSummary).exists()).toBe(false);
    });
  });

  describe("tags", () => {
    const tagWrapper = mount(
      <Form
        data-element="bar"
        data-role="baz"
        saveButton={<div />}
        errorCount={1}
        warningCount={1}
      />
    );

    it("include correct component, element and role data tags on form element", () => {
      const rootNode = tagWrapper.find("form");
      expect(rootNode.prop("data-component")).toEqual("form");
      expect(rootNode.prop("data-element")).toEqual("bar");
      expect(rootNode.prop("data-role")).toEqual("baz");
    });

    it("include correct data-element tags on elements", () => {
      expect(tagWrapper.find(StyledFormFooter).prop("data-element")).toBe(
        "form-footer"
      );
      expect(tagWrapper.find(StyledFormSummary).prop("data-element")).toBe(
        "form-summary"
      );
      expect(
        tagWrapper.find(StyledInternalSummary).at(0).prop("data-element")
      ).toBe("errors");
      expect(
        tagWrapper.find(StyledInternalSummary).at(1).prop("data-element")
      ).toBe("warnings");
    });
  });

  it("sets novalidate on the form", () => {
    expect(wrapper.find("form").prop("noValidate")).toBe(true);
    wrapper.setProps({ noValidate: false });
    expect(wrapper.find("form").prop("noValidate")).toBe(false);
  });

  describe("Form with fullWidthButtons", () => {
    beforeEach(() => {
      wrapper = mount(
        <Form
          stickyFooter
          fullWidthButtons
          leftSideButtons={
            <Button fullWidth buttonType="primary">
              cancel
            </Button>
          }
          rightSideButtons={
            <Button fullWidth buttonType="primary">
              Foo
            </Button>
          }
          saveButton={
            <Button fullWidth buttonType="primary" type="submit">
              Save
            </Button>
          }
          errorCount={2}
          warningCount={3}
        />
      );
    });

    it("applies the correct styles to FormFooter", () => {
      assertStyleMatch(
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          backgroundColor: `var(--colorsUtilityYang100)`,
          boxSizing: "border-box",
          padding: "16px 32px",
          width: "100%",
          zIndex: "1000",
          position: "sticky",
          bottom: "0",
        },
        wrapper.find(StyledFormFooter)
      );
    });

    it("applies the correct styles to StyledLeftButtons", () => {
      assertStyleMatch(
        {
          marginRight: "0px",
        },
        wrapper.find(StyledLeftButtons)
      );
    });

    it("applies the correct styles to StyledRightButtons", () => {
      assertStyleMatch(
        {
          marginLeft: "0px",
        },
        wrapper.find(StyledRightButtons)
      );
    });

    it("applies the correct styles to saveButtons", () => {
      assertStyleMatch(
        {
          width: "100%",
          display: "flex",
        },
        wrapper.find(StyledFullWidthButtons)
      );
    });

    it("applies the correct styles to Form Summary", () => {
      assertStyleMatch(
        {
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "flex-start",
        },
        wrapper.find(StyledFormSummary)
      );
    });

    it("can be used without a stickyFooter", () => {
      wrapper = mount(
        <Form
          fullWidthButtons
          stickyFooter={false}
          saveButton={
            <Button fullWidth buttonType="primary" type="submit">
              Save
            </Button>
          }
          errorCount={2}
          warningCount={3}
        />
      );
      expect(wrapper.find(StyledFormFooter).props().stickyFooter).toEqual(
        false
      );
    });
  });

  describe("footerPadding", () => {
    testStyledSystemPadding(
      (props) => (
        <Form
          saveButton={<button type="submit">foo</button>}
          footerPadding={props}
        />
      ),
      undefined,
      (component) => component.find(StyledFormFooter)
    );

    it("sets the 'padded' class on the footer", () => {
      const footer = mount(
        <Form
          saveButton={<button type="submit">Save</button>}
          footerPadding={{ p: 0 }}
        />
      ).find(StyledFormFooter);

      expect(footer.hasClass("padded")).toBe(true);
    });
  });
});
