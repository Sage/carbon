import React from "react";
import { mount, ReactWrapper, ShallowWrapper } from "enzyme";

import BatchSelection, { BatchSelectionProps } from ".";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

import Icon from "../icon";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";
import StyledIconButton from "../icon-button/icon-button.style";

function renderBatchSelection(
  props: Omit<BatchSelectionProps, "children">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any = mount
) {
  return renderer(
    <BatchSelection {...props}>
      <IconButton onClick={() => {}}>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>
  );
}

describe("BatchSelection component", () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  describe('when the colorTheme is "dark"', () => {
    beforeEach(() => {
      wrapper = renderBatchSelection({ selectedCount: 3, colorTheme: "dark" });
    });

    it("should have expected styles", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor500)",
          color: "var(--colorsUtilityYang100)",
          borderRadius: "var(--borderRadius100)",
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
          borderRadius: "var(--borderRadius100)",
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
          borderRadius: "var(--borderRadius100)",
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
