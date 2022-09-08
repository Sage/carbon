import React from "react";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";

import Pod from "./pod.component";
import Icon from "../icon";
import {
  StyledBlock,
  StyledEditAction,
  StyledActionsContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledDeleteButton,
  StyledUndoButton,
} from "./pod.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

describe("Pod", () => {
  let instance;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pod />);
  });

  testStyledSystemMargin((props) => <Pod {...props} />);

  describe("podHeader", () => {
    it("is not rendered if title prop not passed", () => {
      expect(wrapper.find(StyledHeader).exists()).toBeFalsy();
    });

    it.each(specialCharacters)("renders title when title is %s", (title) => {
      wrapper.setProps({ title });
      expect(wrapper.find(StyledTitle).props().children).toEqual(title);
    });

    it.each(specialCharacters)(
      "renders subtitle when subtitle is %s",
      (subtitle) => {
        wrapper.setProps({ title: "Title", subtitle });
        expect(wrapper.find(StyledSubtitle).props().children).toEqual(subtitle);
      }
    );
  });

  describe("podFooter", () => {
    it.each(specialCharacters)(
      "renders footer when footer prop is %s",
      (footer) => {
        wrapper.setProps({ footer });
        expect(wrapper.find(StyledFooter).props().children).toEqual(footer);
      }
    );

    it("does not render footer when footer prop is not passed", () => {
      expect(wrapper.find(StyledFooter).exists()).toEqual(false);
    });
  });

  describe("delete action button", () => {
    it("renders delete action button when onDelete prop is passed", () => {
      wrapper.setProps({ onDelete: () => {} });
      expect(wrapper.find(StyledDeleteButton).exists()).toEqual(true);
    });

    it("does not render delete action button when onDelete prop is not passed", () => {
      expect(wrapper.find(StyledDeleteButton).exists()).toEqual(false);
    });

    it("onDelete prop function gets invoked by clicking delete action button", () => {
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find("button").simulate("click");
      expect(onDelete).toHaveBeenCalled();
    });

    it("onDelete prop function gets invoked by pressing enter key", () => {
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find("button").simulate("keydown", { key: "Enter" });
      expect(onDelete).toHaveBeenCalled();
    });

    it("onEdit prop function is not invoked by pressing non-enter key", () => {
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find("button").simulate("keydown", { key: "a" });
      expect(onDelete).not.toHaveBeenCalled();
    });

    describe.each([
      [
        "mouse is hovered over the element",
        "mouseenter",
        "mouseleave",
        "isHovered",
      ],
      ["the element is focused", "focus", "blur", "isFocused"],
    ])("and %s", (description, eventType, nextEventType, propName) => {
      beforeEach(() => {
        wrapper.setProps({ onDelete: jest.fn() });
      });

      it(`then the element should have the ${propName} prop set to true`, () => {
        wrapper.find(StyledDeleteButton).simulate(eventType);
        expect(wrapper.find(StyledDeleteButton).prop(propName)).toBe(true);
      });

      describe(`and then ${nextEventType} is triggered`, () => {
        it(`then the element should have the ${propName} prop set to false`, () => {
          wrapper.find(StyledDeleteButton).simulate(eventType);
          expect(wrapper.find(StyledDeleteButton).prop(propName)).toBe(true);
          wrapper.find(StyledDeleteButton).simulate(nextEventType);
          expect(wrapper.find(StyledDeleteButton).prop(propName)).toBe(false);
        });
      });
    });
  });

  describe("undo action button", () => {
    it("renders undo action button when onUndo and softDelete props are passed", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      expect(wrapper.find(StyledUndoButton).exists()).toEqual(true);
    });

    it("does not render delete action button when onDelete prop is not passed", () => {
      expect(wrapper.find(StyledUndoButton).exists()).toEqual(false);
    });

    it("onDelete prop function gets invoked by clicking delete action button", () => {
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find("button").simulate("click");
      expect(onUndo).toHaveBeenCalled();
    });

    it("onDelete prop function gets invoked by pressing enter key", () => {
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find("button").simulate("keydown", { key: "Enter" });
      expect(onUndo).toHaveBeenCalled();
    });

    it("onEdit prop function is not invoked by pressing non-enter key", () => {
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find("button").simulate("keydown", { key: "a" });
      expect(onUndo).not.toHaveBeenCalled();
    });

    describe.each([
      [
        "mouse is hovered over the element",
        "mouseenter",
        "mouseleave",
        "isHovered",
      ],
      ["the element is focused", "focus", "blur", "isFocused"],
    ])("and %s", (description, eventType, nextEventType, propName) => {
      beforeEach(() => {
        wrapper.setProps({
          onUndo: jest.fn(),
          softDelete: true,
        });
      });

      it(`then the element should have the ${propName} prop set to true`, () => {
        wrapper.find(StyledUndoButton).simulate(eventType);
        expect(wrapper.find(StyledUndoButton).prop(propName)).toBe(true);
      });

      describe(`and then ${nextEventType} is triggered`, () => {
        it(`then the element should have the ${propName} prop set to false`, () => {
          wrapper.find(StyledUndoButton).simulate(eventType);
          expect(wrapper.find(StyledUndoButton).prop(propName)).toBe(true);
          wrapper.find(StyledUndoButton).simulate(nextEventType);
          expect(wrapper.find(StyledUndoButton).prop(propName)).toBe(false);
        });
      });
    });
  });

  describe("edit action button", () => {
    it("renders edit action button when onEdit prop is passed", () => {
      wrapper.setProps({ onEdit: () => {} });
      expect(wrapper.find(StyledEditAction).exists()).toEqual(true);
    });

    it("does not render edit action button when onEdit prop is not passed", () => {
      expect(wrapper.find(StyledEditAction).exists()).toEqual(false);
    });

    it("edit action button has a `href` prop if onEdit is a string", () => {
      wrapper.setProps({ onEdit: "someString" });
      expect(wrapper.find(StyledEditAction).props().href).toEqual("someString");
    });

    it("if onEdit prop is an object then it is spread on edit action button as props", () => {
      const onEdit = {
        baz: "baz",
        foo: "foo",
      };
      wrapper.setProps({ onEdit });
      expect(wrapper.find(StyledEditAction).props()).toMatchObject(onEdit);
    });

    it("if onEdit prop is a function it gets invoked by clicking edit action button container", () => {
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find('[data-element="edit-container"]').simulate("click");
      expect(onEdit).toHaveBeenCalled();
    });

    it("if onEdit prop is a function it gets invoked by pressing enter key", () => {
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper
        .find('[data-element="edit-container"]')
        .simulate("keydown", { key: "Enter" });
      expect(onEdit).toHaveBeenCalled();
    });

    it("if onEdit prop is a function it is not invoked by pressing non-enter key", () => {
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper
        .find('[data-element="edit-container"]')
        .simulate("keydown", { key: "a" });
      expect(onEdit).not.toHaveBeenCalled();
    });
  });

  describe("podContent", () => {
    describe("when onEdit prop has been set", () => {
      describe.each([
        [true, false],
        [false, true],
        [true, true],
      ])(
        "and triggerEditOnContent prop = %s displayEditButtonOnHover = %s",
        (displayEditButtonOnHover, triggerEditOnContent) => {
          describe.each([
            [
              "mouse is hovered over the element and then hovered out",
              "mouseenter",
              "mouseleave",
            ],
            ["the element is focused and then blurred", "focus", "blur"],
          ])("and %s", (description, eventType, nextEventType) => {
            const onEdit = jest.fn();
            let editContainer;

            beforeEach(() => {
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
                variant: "tertiary",
              });
              editContainer = wrapper.find('[data-element="edit-container"]');
            });

            it(`then the content should have proper background on ${eventType}`, () => {
              editContainer.simulate(eventType);
              assertStyleMatch(
                {
                  backgroundColor: "var(--colorsActionMajor600)",
                },
                wrapper.find(StyledBlock)
              );
            });

            it(`then the content should have proper background on ${nextEventType}`, () => {
              editContainer.simulate(nextEventType);
              assertStyleMatch(
                {
                  backgroundColor: "var(--colorsUtilityMajor040)",
                },
                wrapper.find(StyledBlock)
              );
            });
          });

          describe("and onEdit prop is a function", () => {
            it("it gets invoked by clicking on the pod content", () => {
              const event = { preventDefault: () => {} };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onClick(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it("it gets invoked by pressing enter key", () => {
              const event = {
                preventDefault: () => {},
                key: "Enter",
                type: "keydown",
              };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it("it is not invoked by pressing non-enter key", () => {
              const event = {
                preventDefault: () => {},
                key: "a",
                type: "keydown",
              };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).not.toHaveBeenCalled();
            });
          });
          describe("and onEdit prop is not a function", () => {
            it("pod content does not have onClick and onKeyDown events", () => {
              wrapper.setProps({ onEdit: {} });
              expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
              expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(
                undefined
              );
            });
          });
        }
      );
    });

    describe("when onEdit prop has not been set", () => {
      it("pod content has no events assigned", () => {
        expect(wrapper.find(StyledBlock).props().onMouseEnter).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onMouseLeave).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onFocus).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onBlur).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(undefined);
      });
    });
  });

  describe("render", () => {
    it.each(specialCharacters)(
      "renders children correctly when text %s is passed as a child",
      (text) => {
        wrapper.setProps({ children: text });
        expect(wrapper.find(StyledPod).text()).toEqual(text);
      }
    );

    it("applies all props to the pod", () => {
      const someRandomProps = {
        prop1: "value1",
        prop2: "value2",
      };

      instance = shallow(<Pod {...someRandomProps} />);
      expect(instance.find(StyledPod).props()).toMatchObject(someRandomProps);
    });

    it("does not apply title prop to containing elements", () => {
      instance = shallow(<Pod title="some-title" />);
      expect(wrapper.is("[title]")).toBe(false);
    });
  });

  describe("if border prop is set to false", () => {
    it("renders proper box shadow in the StyleBlock", () => {
      wrapper = mount(<Pod border={false} />);
      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.find(StyledBlock)
      );
      wrapper.unmount();
    });
  });

  describe("if internal edit button is enabled", () => {
    it("renders the Pod with relative position", () => {
      wrapper = mount(<Pod internalEditButton />);
      assertStyleMatch({ position: "relative" }, wrapper);
      wrapper.unmount();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const tagWrapper = shallow(<Pod data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(tagWrapper, "pod", "bar", "baz");
      });
    });

    describe("on internal elements - include correct component, element and role data tags", () => {
      const tagWrapper = shallow(
        <Pod
          footer="footer"
          onEdit={() => {}}
          subtitle="subtitle"
          title="title"
        />
      );

      elementsTagTest(tagWrapper.find(StyledEditAction), ["edit"]);
      elementsTagTest(tagWrapper, ["footer", "subtitle", "title"]);
    });
  });
});

describe("ActionButtons", () => {
  const commonActionButtonAssertions = ({ renderer, modifier }) => {
    let wrapper;

    describe("when isHovered prop is set", () => {
      it("should match expected styles", () => {
        wrapper = renderer({ isHovered: true }, TestRenderer.create);
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });

    describe.each([
      ["primary", "var(--colorsActionMajorYang100)"],
      ["secondary", "var(--colorsActionMinor050)"],
      ["tertiary", "var(--colorsActionMinor100)"],
      ["transparent", "var(--colorsActionMajorTransparent)"],
      ["tile", "var(--colorsActionMajorYang100)"],
    ])("when the variant prop is set to %s", (variant, expectedValue) => {
      it("should have expected backgroundColor", () => {
        wrapper = renderer({ variant });
        assertStyleMatch(
          {
            backgroundColor: expectedValue,
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when noBorder prop is set", () => {
      it("should not render the border", () => {
        wrapper = renderer({ noBorder: true });
        assertStyleMatch(
          {
            border: "none",
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when displayOnlyOnHover prop is set", () => {
      it("should not be dislayed", () => {
        wrapper = renderer({ displayOnlyOnHover: true });
        assertStyleMatch(
          {
            display: "none",
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when isFocused and internalEditButton props are set", () => {
      it("should match expected styles", () => {
        wrapper = renderer({
          isFocused: true,
          internalEditButton: true,
        });
        assertStyleMatch(
          {
            border: "none",
            background: "var(--colorsActionMajorTransparent)",
          },
          wrapper,
          {
            modifier,
          }
        );
      });

      describe("without contentTriggersEdit prop", () => {
        it("should have expected outline and border", () => {
          wrapper = renderer({
            isFocused: true,
            internalEditButton: true,
          });
          assertStyleMatch(
            {
              outline: "3px solid var(--colorsSemanticFocus500)",
              border: "none",
            },
            wrapper,
            {
              modifier,
            }
          );
        });
      });
    });
  };

  describe("StyledEditAction", () => {
    commonActionButtonAssertions({
      renderer: renderEditAction,
      modifier: `&& > a`,
    });

    let wrapper;
    describe("when displayOnlyOnHover prop is set", () => {
      describe.each(["isHovered", "isFocused"])(
        "with the %s prop set",
        (prop) => {
          it("should have undefined display style", () => {
            wrapper = renderEditAction({
              displayOnlyOnHover: true,
              [prop]: true,
            });
            assertStyleMatch(
              {
                display: undefined,
              },
              wrapper,
              {
                modifier: `&& > a`,
              }
            );
          });
        }
      );
    });
  });

  describe("StyledDeleteButton", () => {
    commonActionButtonAssertions({
      renderer: renderDeleteAction,
      modifier: "&&",
    });
  });

  describe("StyledUndoButton", () => {
    commonActionButtonAssertions({
      renderer: renderUndoAction,
      modifier: "&&",
    });

    let wrapper;
    describe.each(["isHovered", "isFocused"])(
      "with the %s prop set",
      (prop) => {
        it("should have undefined display style", () => {
          wrapper = renderUndoAction({
            displayOnlyOnHover: true,
            [prop]: true,
          });
          assertStyleMatch(
            {
              display: undefined,
            },
            wrapper,
            {
              modifier: `&&`,
            }
          );
        });
      }
    );
  });
});

describe("StyledPod", () => {
  it("sets correct height when height prop value is a number", () => {
    const wrapper = mount(<Pod height={400}>Content</Pod>);

    assertStyleMatch(
      {
        height: "400px",
      },
      wrapper.find(StyledPod)
    );
  });

  it("sets correct height when height prop value is a string", () => {
    const wrapper = mount(<Pod height="100%">Content</Pod>);

    assertStyleMatch(
      {
        height: "100%",
      },
      wrapper.find(StyledPod)
    );
  });
});

describe("StyledBlock", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledBlock({}, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe.each([
    ["primary", "var(--colorsUtilityYang100)"],
    ["secondary", "var(--colorsUtilityMajor025)"],
    ["tertiary", "var(--colorsUtilityMajor040)"],
    ["transparent", "var(--colorsUtilityMajorTransparent)"],
    ["tile", "var(--colorsUtilityYang100)"],
  ])("when the variant prop is set to %s", (variant, expectedValue) => {
    it("should have expected backgroundColor", () => {
      wrapper = renderStyledBlock({ variant });
      assertStyleMatch(
        {
          backgroundColor: expectedValue,
        },
        wrapper
      );
    });
  });

  describe("when hasButtons prop is set", () => {
    it("should have the width style set to auto", () => {
      wrapper = renderStyledBlock({ hasButtons: true });
      assertStyleMatch(
        {
          width: "auto",
        },
        wrapper
      );
    });

    describe.each(["fullWidth", "internalEditButton"])(
      "with the %s prop set",
      (prop) => {
        it("should have the width style set to 100%", () => {
          wrapper = renderStyledBlock({ [prop]: true });
          assertStyleMatch(
            {
              width: "100%",
            },
            wrapper
          );
        });
      }
    );
  });

  describe("when variant prop is set to tile", () => {
    it("should match expected styles", () => {
      wrapper = renderStyledBlock({ variant: "tile" });
      assertStyleMatch(
        {
          boxShadow: "0 2px 3px 0 rgba(2,18,36,0.2)",
        },
        wrapper
      );
    });
  });

  describe("when noBorder prop is set", () => {
    it("should not render the border", () => {
      wrapper = renderStyledBlock({ noBorder: true });
      assertStyleMatch(
        {
          border: "none",
        },
        wrapper
      );
    });
  });

  describe("when softDelete prop is set", () => {
    it("should render block with no border", () => {
      wrapper = renderStyledBlock({ softDelete: true });

      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.find(StyledBlock)
      );
    });
  });

  describe.each(["isHovered", "isFocused"])("when the %s prop set", (prop) => {
    it("should have undefined display style", () => {
      wrapper = renderStyledBlock({ [prop]: true });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor075)",
        },
        wrapper
      );
    });

    describe("with internalEditButton prop set and variant set to tile", () => {
      it("should have undefined display style", () => {
        wrapper = renderStyledBlock({
          [prop]: true,
          internalEditButton: true,
          variant: "tile",
        });
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajorTransparent)",
          },
          wrapper
        );
      });
    });
  });

  describe("when the isFocused prop is set", () => {
    describe("with the noBorder prop set", () => {
      it("should have no padding", () => {
        wrapper = renderStyledBlock({ isFocused: true, noBorder: true });
        assertStyleMatch(
          {
            padding: undefined,
          },
          wrapper
        );
      });
    });
    describe("with the internalEditButton prop set", () => {
      describe("without contentTriggersEdit prop", () => {
        it("should have expected border and no outline", () => {
          wrapper = renderStyledBlock({
            isFocused: true,
            internalEditButton: true,
          });
          assertStyleMatch(
            {
              outline: undefined,
              border: "1px solid var(--colorsUtilityMajor100)",
            },
            wrapper
          );
        });
      });

      describe("with contentTriggersEdit prop", () => {
        it("should have expected outline and no border", () => {
          wrapper = renderStyledBlock({
            isFocused: true,
            internalEditButton: true,
            contentTriggersEdit: true,
          });
          assertStyleMatch(
            {
              outline: "3px solid var(--colorsSemanticFocus500)",
              border: "none",
            },
            wrapper
          );
        });
      });
    });
  });
});

describe("StyledFooter", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledFooter({}, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe("when variant prop is set to tile", () => {
    it("should have expected border top style", () => {
      wrapper = renderStyledFooter({ variant: "tile" });
      assertStyleMatch(
        {
          borderTop: `1px solid var(--colorsUtilityMajor100)`,
        },
        wrapper
      );
    });
  });

  describe("when size prop is set", () => {
    it("should have expected padding", () => {
      wrapper = renderStyledFooter({ size: "medium" });
      assertStyleMatch(
        {
          padding: "8px 16px",
        },
        wrapper
      );
    });
  });

  describe("when softDelete prop is set", () => {
    it("should have expected padding", () => {
      wrapper = renderStyledFooter({ softDelete: true });
      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin055)",
        },
        wrapper
      );
    });
  });
});

describe("StyledHeader", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledHeader({});
    assertStyleMatch(
      {
        marginBottom: "24px",
      },
      wrapper
    );
  });

  describe("when the internalEditButton prop is set and alignTitle prop is set to right", () => {
    it("should have expected margin right style dependent on the size prop", () => {
      wrapper = renderStyledHeader({
        internalEditButton: true,
        alignTitle: "right",
        size: "medium",
      });
      assertStyleMatch(
        {
          marginRight: "30px",
        },
        wrapper
      );
    });
  });
});

describe("StyledActionsContainer", () => {
  describe("when internalEditButton prop is set", () => {
    it("should have expected styles", () => {
      const wrapper = TestRenderer.create(
        <StyledActionsContainer internalEditButton />
      );
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});

function renderEditAction(props = {}, renderer = mount) {
  return renderer(<StyledEditAction {...props} />);
}

function renderDeleteAction(props = {}, renderer = mount) {
  return renderer(
    <StyledDeleteButton onAction={() => {}} {...props}>
      <Icon type="delete" />
    </StyledDeleteButton>
  );
}

function renderUndoAction(props = {}, renderer = mount) {
  return renderer(
    <StyledUndoButton onAction={() => {}} {...props}>
      <Icon type="undo" />
    </StyledUndoButton>
  );
}

function renderStyledBlock(props = {}, renderer = mount) {
  return renderer(<StyledBlock {...props} />);
}

function renderStyledFooter(props = {}, renderer = mount) {
  return renderer(<StyledFooter {...props} />);
}

function renderStyledHeader(props = {}, renderer = mount) {
  return renderer(<StyledHeader {...props} />);
}
