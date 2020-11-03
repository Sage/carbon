import React from "react";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { shallow, mount } from "enzyme";
import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import StyledSplitButtonChildrenContainer from "../split-button/split-button-children.style";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";
import StyledSplitButton from "../split-button/split-button.style";
import baseTheme from "../../style/themes/base";

describe("MultiActionButton", () => {
  let wrapper;

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        const multiActionButtonSelector =
          '[data-component="multi-action-button"]';
        wrapper = render({
          "data-element": "bar",
          "data-role": "baz",
          text: "Test",
        });

        rootTagTest(
          wrapper.find(multiActionButtonSelector),
          "multi-action-button",
          "bar",
          "baz"
        );
      });
    });

    describe("on internal elements", () => {
      wrapper = render();
      wrapper.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper, ["additional-buttons", "toggle-button"]);
    });
  });

  describe("when rendered", () => {
    it("should match the snapshot", () => {
      expect(render({}, TestRenderer.create)).toMatchSnapshot();
    });

    describe("with the Menu open", () => {
      beforeEach(() => {
        wrapper = render({}, mount);
        const toggleButton = wrapper.find(
          'button[data-element="toggle-button"]'
        );
        toggleButton.simulate("focus");
      });

      it("should have expected colors for the Toggle Button", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.secondary,
            borderColor: baseTheme.colors.secondary,
          },
          wrapper,
          { modifier: `${StyledSplitButton} > ${StyledButton}` }
        );
      });

      it("should have expected border color and margin for the Toggle Button when focused", () => {
        assertStyleMatch(
          {
            borderColor: baseTheme.colors.focus,
            margin: "0 -1px",
          },
          wrapper,
          { modifier: `${StyledSplitButton} > ${StyledButton}:focus` }
        );
      });

      it("should have expected colors for the Button Icon", () => {
        assertStyleMatch(
          {
            color: baseTheme.colors.white,
          },
          wrapper,
          { modifier: `${StyledSplitButton} > ${StyledButton} ${StyledIcon}` }
        );
      });
    });
  });

  describe("the main button", () => {
    it('prevents an Icon being added even when the "iconType" and "iconPosition" props are passed', () => {
      wrapper = render({ iconType: "cross", iconPosition: "before" });
      expect(wrapper.instance().multiActionButtonProps.iconType).toEqual(
        undefined
      );
      expect(wrapper.instance().multiActionButtonProps.iconPosition).toEqual(
        undefined
      );
    });
  });

  describe('with align prop set to "right"', () => {
    beforeEach(() => {
      wrapper = render({ align: "right" }, mount);
    });

    it("child buttons container should be aligned right", () => {
      assertStyleMatch(
        {
          left: "auto",
          right: "0",
        },
        wrapper,
        { modifier: `${StyledSplitButtonChildrenContainer}` }
      );
    });

    it("text inside child buttons should be aligned right", () => {
      assertStyleMatch(
        {
          textAlign: "right",
        },
        wrapper,
        { modifier: `${StyledSplitButtonChildrenContainer} ${StyledButton}` }
      );
    });
  });
});

function render(props, renderer = shallow) {
  return renderer(
    <MultiActionButton text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  );
}
