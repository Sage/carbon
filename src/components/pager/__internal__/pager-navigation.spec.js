import React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";
import PagerNavigation from "./pager-navigation.component";
import { StyledPagerLinkStyles } from "./pager.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledInputPresentation from "../../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../../__experimental__/components/input/input.style";

const pageSizeSelectionOptions = [
  { id: "10", name: 10 },
  { id: "25", name: 25 },
  { id: "50", name: 50 },
];

function render(props, renderType = shallow) {
  props.setCurrentThemeName = () => {};
  return renderType(<PagerNavigation {...props} />);
}

describe("Pager Navigation", () => {
  const props = {
    currentPage: 1,
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    pageCount: 10,
    showPageSizeSelection: true,
    pageSizeSelectionOptions,
  };

  it("renders the Pager Navigation correctly with the Mint Theme", () => {
    const wrapper = render(
      {
        ...props,
        onPagination: () => true,
      },
      mount
    );

    assertStyleMatch(
      {
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
      },
      wrapper.find(PagerNavigation)
    );

    assertStyleMatch(
      {
        padding: "0",
        margin: "8px 4px 0 4px",
        lineHeight: "26px",
        minHeight: "24px",
      },
      wrapper.find(PagerNavigation),
      {
        modifier: `&& ${StyledInputPresentation}`,
      }
    );

    assertStyleMatch(
      {
        textAlign: "center",
        height: "24px",
      },
      wrapper.find(PagerNavigation),
      {
        modifier: `&& ${StyledInputPresentation} ${StyledInput}`,
      }
    );
  });

  describe("onClick", () => {
    it("does not trigger if link is disabled", () => {
      const onLast = jest.fn();
      const wrapper = render(
        {
          onPagination: () => true,
          pageSize: 10,
          showPageSizeSelection: true,
          pageSizeSelectionOptions,
          currentPage: 1,
          pageCount: 1,
          totalRecords: 1,
          onLast,
        },
        mount
      );
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const last = navLinks.last();
      last.simulate("click");
      expect(onLast).toBeCalledTimes(0);
    });
  });

  describe("Current Page Input", () => {
    it("updates correctly on change", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 10,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: 2 } });
      expect(setCurrentPage).toHaveBeenCalledWith(2);
    });

    it("updates correctly on keypress (enter)", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { which: 13, target: { value: 6 } });
      expect(setCurrentPage).toHaveBeenCalledWith(6);
    });

    it("does not update correctly on keypress (not enter)", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { which: 2, target: { value: 6 } });
      expect(setCurrentPage).not.toHaveBeenCalled();
    });

    it("updates correctly if new value is NaN", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { which: 13, target: { value: "asdfghjk" } });
      expect(setCurrentPage).toHaveBeenCalledWith(1);
    });
  });
});
