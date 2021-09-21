import React, { useRef } from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";

import baseTheme from "../../style/themes/base";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import Form from "./form.component";
import {
  StyledLeftButtons,
  StyledRightButtons,
  StyledFormFooter,
  StyledForm,
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
import { FieldsetStyle } from "../fieldset/fieldset.style";
import StyledSearch from "../search/search.style";

jest.mock("lodash/debounce", () => jest.fn((fn) => fn));
jest.mock("../../hooks/__internal__/useResizeObserver");

describe("Form", () => {
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(<Form />);
  });

  testStyledSystemSpacing((props) => <Form {...props} />);

  it("allows custom classes to be added to the Form", () => {
    wrapper.setProps({ className: "foo" });
    expect(wrapper.find(StyledForm).hasClass("foo")).toBeTruthy();
  });

  it("cleans up event listeners after unmounting", () => {
    wrapper.update();
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    wrapper.unmount();

    expect(
      removeEventListenerSpy.mock.calls.filter(
        (call) => call[0] === "scroll" || call[0] === "resize"
      )
    ).toHaveLength(2);
  });

  describe("when search used in Form component", () => {
    it("should have no addition margin-bottom", () => {
      wrapper = mount(<StyledForm />);

      assertStyleMatch(
        {
          marginBottom: "0px",
        },
        wrapper,
        { modifier: `${StyledSearch} ${StyledFormField}` }
      );
    });
  });

  describe("when height prop is set", () => {
    it("sets the correct height onto StyledForm", () => {
      wrapper = mount(<StyledForm height="100px" />);

      assertStyleMatch(
        {
          height: "100px",
        },
        wrapper.find(StyledForm)
      );
    });
  });

  describe("When `fieldSpacing` applied", () => {
    wrapper = mount(<StyledForm />);

    it("as default", () => {
      assertStyleMatch(
        {
          marginTop: "0",
          marginBottom: "24px",
        },
        wrapper,
        {
          modifier: `
            ${FieldsetStyle}
          `,
        }
      );
    });

    it("as custom value", () => {
      wrapper = mount(<StyledForm fieldSpacing={2} />);
      assertStyleMatch(
        {
          marginTop: "0",
          marginBottom: "16px",
        },
        wrapper,
        {
          modifier: `
            ${FieldsetStyle}
          `,
        }
      );
    });
  });

  describe("when stickyFooter prop is true", () => {
    const dispatchScrollEvent = () => {
      act(() => {
        jest.runAllTimers();
        window.dispatchEvent(new Event("scroll"));
      });
    };
    const assertThatFooterIsSticky = () => {
      wrapper.update();
      expect(wrapper.find(StyledFormFooter).hasClass("sticky")).toBe(true);
      assertStyleMatch(
        {
          paddingBottom: "88px",
        },
        wrapper.find(StyledForm)
      );

      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.white,
          boxShadow: "0 -4px 12px 0 rgba(0,0,0,0.05)",
          boxSizing: "border-box",
          padding: "16px 32px",
          bottom: "0",
          left: "0",
          position: "fixed",
          width: "100%",
        },
        wrapper.find(StyledFormFooter)
      );
    };

    const assertThatFooterIsNotSticky = () => {
      wrapper.update();
      assertStyleMatch(
        {
          backgroundColor: undefined,
          boxShadow: undefined,
          boxSizing: undefined,
          padding: undefined,
          bottom: undefined,
          left: undefined,
          position: undefined,
          width: undefined,
          zIndex: undefined,
        },
        wrapper.find(StyledFormFooter)
      );
    };

    describe("without container", () => {
      beforeEach(() => {
        wrapper = mount(<Form stickyFooter />);
        window.innerHeight = 1000;
      });

      afterEach(() => {
        window.innerHeight = 768;
      });

      it("renders footer with sticky styles if form bottom is below the window", () => {
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1051,
          }));

        dispatchScrollEvent();
        assertThatFooterIsSticky();
      });

      it("renders form footer without sticky styles if form bottom is above the bottom of window", () => {
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            top: 100,
            bottom: 900,
          }));

        dispatchScrollEvent();
        assertThatFooterIsNotSticky();
      });

      it("does not change stickyFooter state if it does not need to change", () => {
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1100,
          }));

        dispatchScrollEvent();
        assertThatFooterIsSticky();

        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1101,
          }));

        dispatchScrollEvent();
        assertThatFooterIsSticky();
      });

      it("render stickyFooter with sticky rules on resize if form bottom is above the bottom of window", () => {
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1051,
          }));

        act(() => {
          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });

        assertThatFooterIsSticky();
      });

      it("renders form footer without sticky styles on resize if form bottom is above the bottom of window", () => {
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            top: 100,
            bottom: 900,
          }));

        act(() => {
          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });

        assertThatFooterIsNotSticky();
      });
    });

    describe("with custom container", () => {
      const Component = () => {
        const ref = useRef();
        return (
          <div id="test-container" ref={ref}>
            <Form stickyFooter dialogRef={ref}>
              <span>form content</span>
            </Form>
          </div>
        );
      };

      beforeEach(() => {
        wrapper = mount(<Component />);
      });

      it("renders footer with sticky styles if form bottom is below the container", () => {
        const containerNode = wrapper.find("#test-container").getDOMNode();
        jest
          .spyOn(containerNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1000,
          }));
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1050,
          }));

        dispatchScrollEvent();
        assertThatFooterIsSticky();
      });

      it("renders form footer without sticky styles if form bottom is above the bottom of window", () => {
        const containerNode = wrapper.find("#test-container").getDOMNode();
        jest
          .spyOn(containerNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1100,
          }));
        const formNode = wrapper.find(StyledForm).getDOMNode();
        jest
          .spyOn(formNode, "getBoundingClientRect")
          .mockImplementation(() => ({
            bottom: 1050,
          }));

        dispatchScrollEvent();
        assertThatFooterIsNotSticky();
      });
    });

    describe("when stickyFooter is provided and it is used in Sidebar", () => {
      it("should render correct styles", () => {
        wrapper = mount(<StyledForm stickyFooter isInSidebar />);

        assertStyleMatch(
          {
            position: "static !important",
          },
          wrapper
        );

        assertStyleMatch(
          {
            position: "absolute",
          },
          wrapper,
          { modifier: `${StyledFormFooter}` }
        );
      });
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
      wrapper.setProps({ buttonAlignment: "right" });
      assertStyleMatch(
        {
          justifyContent: "flex-end",
        },
        wrapper.find(StyledFormFooter)
      );
    });

    it("form summary has proper background when errorCount or warningCount are passed", () => {
      wrapper.setProps({ warningCount: 1 });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.form.invalid,
        },
        wrapper.find(StyledFormSummary)
      );
      wrapper.setProps({ errorCount: 1 });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.form.invalid,
        },
        wrapper.find(StyledFormSummary)
      );
    });
  });

  describe("FormSummary", () => {
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
            color: baseTheme.colors.error,
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
            color: baseTheme.colors.warning,
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
            color: baseTheme.colors.error,
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
            color: baseTheme.colors.warning,
          },
          warningSummary
        );
      });
    });

    describe("when either errorCount or warningCount or both are set on Form", () => {
      it.each([
        [1, 0, "There is", "1 error", null, null],
        [2, 0, "There are", "2 errors", null, null],
        [0, 1, null, null, "There is", "1 warning"],
        [0, 2, null, null, "There are", "2 warnings"],
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
          const warningPosition = errorCount ? 1 : 0;
          if (errorCount) {
            expect(wrapper.find(StyledMessagePrefix).at(0).text()).toBe(
              errPrefix
            );
            expect(wrapper.find(StyledInternalSummary).at(0).text()).toBe(
              errMessage
            );
          }
          if (warningCount) {
            expect(
              wrapper.find(StyledMessagePrefix).at(warningPosition).text()
            ).toBe(warnPrefix);
            expect(
              wrapper.find(StyledInternalSummary).at(warningPosition).text()
            ).toBe(warnMessage);
          }
        }
      );

      it("when there are no errors and warnings", () => {
        wrapper.setProps({ errorCount: 0, warningCount: 0 });

        expect(wrapper.find(StyledInternalSummary).exists()).toBe(false);
      });
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
});
