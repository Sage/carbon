import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import BatchSelection from ".";
import Icon from "../icon";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";
import StyledIconButton from "../icon-button/icon-button.style";

describe("BatchSelection component", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = renderBatchSelection({ selectedCount: 3 }, TestRenderer.create);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the colorTheme is "dark"', () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, colorTheme: "dark" });
    });

    it("should have expected styles", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor500)",
          color: "var(--colorsUtilityYang100)",
        },
        wrapper
      );
    });

    it("should have expected Icon color", () => {
      assertStyleMatch(
        {
          color: "var(--colorsActionMajorYang100)",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );
    });
  });

  describe('when the colorTheme is "light"', () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, colorTheme: "light" });
    });

    it("should have expected background color", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor150)",
        },
        wrapper
      );
    });
  });

  describe('when the colorTheme is "white"', () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, colorTheme: "white" });
    });

    it("should have expected background color and shadow", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityYang100)",
          boxShadow: "var(--boxShadow100)",
        },
        wrapper
      );
    });
  });

  describe("when the disabled prop is set to true", () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, disabled: true });
    });

    it("should have expected styles", () => {
      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin030)",
          cursor: "not-allowed",
        },
        wrapper
      );
    });

    it("then IconButton should have expected styles", () => {
      assertStyleMatch(
        {
          background: "transparent",
          pointerEvents: "none",
        },
        wrapper,
        { modifier: `${StyledIconButton}` }
      );
    });

    it("then IconButton should have expected Icon color", () => {
      assertStyleMatch(
        {
          color: "var(--colorsActionMajorYin030)",
        },
        wrapper,
        { modifier: `${StyledIconButton} ${StyledIcon}` }
      );
    });
  });

  describe("when the hidden prop is set to true", () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, hidden: true });
    });

    it("should have opacity set to 0", () => {
      assertStyleMatch({ opacity: "0" }, wrapper);
    });
  });
});

function renderBatchSelection(props = {}, renderer = mount) {
  return renderer(
    <BatchSelection {...props}>
      <IconButton onAction={() => {}}>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>
  );
}
