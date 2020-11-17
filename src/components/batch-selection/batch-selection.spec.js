import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import BatchSelection from ".";
import Icon from "../icon";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";
import StyledIconButton from "../icon-button/icon-button.style";
import { baseTheme } from "../../style/themes";

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
          backgroundColor: baseTheme.colors.slate,
          color: baseTheme.colors.white,
        },
        wrapper
      );
    });

    it("should have expected Icon color", () => {
      assertStyleMatch(
        {
          color: baseTheme.colors.white,
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
          backgroundColor: baseTheme.batchSelection.lightTheme,
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
          backgroundColor: baseTheme.white,
          boxShadow:
            "0 5px 5px 0 rgba(0,20,29,0.2),0 10px 10px 0 rgba(0,20,29,0.1)",
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
          color: baseTheme.disabled.disabled,
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
          color: baseTheme.icon.disabled,
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
