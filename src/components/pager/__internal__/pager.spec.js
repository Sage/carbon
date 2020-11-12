import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import I18n from "i18n-js";
import guid from "../../../utils/helpers/guid";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import baseTheme from "../../../style/themes/base";
import mintTheme from "../../../style/themes/mint";
import Pager from "./pager.component";
import Select from "../../select/simple-select/simple-select.component";
import SelectList from "../../select/select-list/select-list.component";
import { StyledPagerLinkStyles } from "./pager.style";
import NumberInput from "../../../__experimental__/components/number";

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const pageSizeSelectionOptions = [
  { id: "10", name: 10 },
  { id: "25", name: 25 },
  { id: "50", name: 50 },
  { id: "100", name: 100 },
];

function render(props, renderType = mount) {
  return renderType(
    <ThemeProvider theme={props.theme || baseTheme}>
      <Pager {...props} />
    </ThemeProvider>
  );
}

describe("Pager", () => {
  const props = {
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    showPageSizeSelection: true,
    pageSizeSelectionOptions,
  };

  describe("Navigate correctly on link click", () => {
    let onPagination, onNext, onPrevious, onFirst, onLast;

    beforeEach(() => {
      onPagination = jest.fn();
      onNext = jest.fn();
      onPrevious = jest.fn();
      onFirst = jest.fn();
      onLast = jest.fn();
    });

    const getWrapper = (otherProps) =>
      render(
        {
          ...props,
          onNext,
          onPrevious,
          onFirst,
          onLast,
          onPagination,
          ...otherProps,
        },
        mount
      );

    it("disables the next and last link if on last page", () => {
      const wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const last = navLinks.last();
      const next = navLinks.at(2);
      last.simulate("click");
      next.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("disables the prev and first link if on first page", () => {
      const wrapper = getWrapper({ currentPage: 1 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      first.simulate("click");
      prev.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("disables navigation if theres only one page", () => {
      const wrapper = getWrapper({ currentPage: 1, totalRecords: 5 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      const next = navLinks.at(2);
      const last = navLinks.last();
      first.simulate("click");
      prev.simulate("click");
      next.simulate("click");
      last.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("changes page correctly on clicking first link", () => {
      const wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const first = navLinks.first();
      first.simulate("click");
      expect(onFirst).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking prev link", () => {
      const wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const prev = navLinks.at(1);
      prev.simulate("click");
      expect(onPrevious).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking next link", () => {
      const wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const next = navLinks.at(2);
      next.simulate("click");
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("next link is disabled on when on last page", () => {
      const wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const next = navLinks.at(2);
      assertStyleMatch(
        {
          cursor: "not-allowed",
        },
        next
      );
    });

    it("changes page correctly on clicking last link", () => {
      const wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const last = navLinks.last();
      last.simulate("click");
      expect(onLast).toHaveBeenCalledTimes(1);
    });
  });

  describe("when invalid totalRecords", () => {
    it("defaults currentPage to last page given its on last page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: 100,
          currentPage: 10,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { which: 13, target: { value: -100 } });
      expect(input.prop("value")).toBe("10");
    });

    it("defaults currentPage to 1 given currentPage is not last page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: 100,
          currentPage: 1,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { which: 13, target: { value: -100 } });
      expect(input.prop("value")).toBe("1");
    });

    it("defaults currentPage to first page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: -100,
          currentPage: 10,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      expect(input.prop("value")).toBe("1");
    });
  });

  it("updates correctly if new current page value is higher than page count", () => {
    const wrapper = render({ ...props, currentPage: 10 }, mount);
    const input = wrapper.find(NumberInput).find("input");
    input.simulate("keyup", { which: 13, target: { value: 200 } });
    expect(input.prop("value")).toBe("10");
  });

  it("renders the Pager without pageSizeSelection", () => {
    const wrapper = render(
      {
        totalRecords: 100,
        pageSize: 10,
        showPageSizeSelection: false,
        onPagination: () => true,
      },
      TestRenderer.create
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the Pager correctly with the Mint Theme", () => {
    const wrapper = render(
      { ...props, theme: mintTheme, onPagination: () => true },
      TestRenderer.create
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe("callbacks work as expected", () => {
    let wrapper, onNext, onFirst, onPrevious, onLast, callbacks;

    beforeEach(() => {
      onNext = jest.fn();
      onFirst = jest.fn();
      onPrevious = jest.fn();
      onLast = jest.fn();

      wrapper = render({
        ...props,
        pageSize: 10,
        currentPage: 5,
        onNext,
        onFirst,
        onLast,
        onPrevious,
      });

      callbacks = {
        next: onNext,
        previous: onPrevious,
        first: onFirst,
        last: onLast,
      };
    });

    it.each([["next"], ["previous"], ["first"], ["last"]])(
      "calls %s callback",
      (call) => {
        const navLinks = wrapper.find(StyledPagerLinkStyles);
        const element = navLinks.find(
          `[data-element="pager-link-${call}"] button`
        );
        element.simulate("click");
        expect(callbacks[call]).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe("when onNext, onFirst, onPrevious, onLast are not provided", () => {
    it.each([
      ["next", "6"],
      ["previous", "4"],
      ["first", "1"],
      ["last", "10"],
    ])(
      "it triggers on click event without %s callback",
      (call, currentPage) => {
        const wrapper = render({
          ...props,
          pageSize: 10,
          currentPage: 5,
          totalRecords: 100,
        });
        const pager = wrapper.find(Pager);
        const navLinks = pager.find(StyledPagerLinkStyles);
        const element = navLinks.find(
          `[data-element="pager-link-${call}"] button`
        );
        element.simulate("click");
        expect(
          wrapper.find('[data-element="current-page"]').first().prop("value")
        ).toBe(currentPage);
      }
    );
  });

  describe("i18n", () => {
    const { translations } = I18n;
    const { locale } = I18n.locale;
    beforeAll(() => {
      I18n.translations = {
        ...translations,
        fr: {
          ...translations.fr,
          pager: {
            show: "Spectacle",
            records: {
              one: "article",
              zero: "articles",
              other: "articles",
            },
          },
        },
      };
    });

    afterAll(() => {
      I18n.translations = translations;
      I18n.locale = locale;
    });

    const getShow = (wrapper) =>
      wrapper.find("div[data-component='simple-select']").getDOMNode()
        .parentElement.firstChild.textContent;
    const getRecords = (wrapper) =>
      wrapper.find("div[data-component='simple-select']").getDOMNode()
        .parentElement.lastChild.textContent;
    const getTotalRecords = (wrapper) =>
      wrapper.getDOMNode().lastChild.textContent;

    describe("default", () => {
      it("show", () => {
        const wrapper = render({ ...props });
        expect(getShow(wrapper)).toBe("Show");
      });

      it("records", () => {
        expect(getRecords(render({ ...props, pageSize: 100 }))).toBe("items");
        expect(getRecords(render({ ...props, pageSize: 1 }))).toBe("item");
        expect(getRecords(render({ ...props, pageSize: 0 }))).toBe("items");
      });

      it("total records", () => {
        expect(getTotalRecords(render({ ...props, totalRecords: 100 }))).toBe(
          "100 items"
        );
        expect(getTotalRecords(render({ ...props, totalRecords: 1 }))).toBe(
          "1 item"
        );
        expect(getTotalRecords(render({ ...props, totalRecords: 0 }))).toBe(
          "0 items"
        );
      });
    });

    describe("fr", () => {
      beforeAll(() => {
        I18n.locale = "fr";
      });

      it("show", () => {
        const wrapper = render({ ...props });
        expect(getShow(wrapper)).toBe("Spectacle");
      });

      it("records", () => {
        expect(getRecords(render({ ...props, pageSize: "100" }))).toBe(
          "articles"
        );
        expect(getRecords(render({ ...props, pageSize: "1" }))).toBe("article");
        expect(getRecords(render({ ...props, pageSize: "0" }))).toBe(
          "articles"
        );
      });

      it("total records", () => {
        expect(getTotalRecords(render({ ...props, totalRecords: 100 }))).toBe(
          "100 articles"
        );
        expect(getTotalRecords(render({ ...props, totalRecords: 1 }))).toBe(
          "1 article"
        );
        expect(getTotalRecords(render({ ...props, totalRecords: 0 }))).toBe(
          "0 articles"
        );
      });
    });
  });

  describe("DLS theme", () => {
    describe("Pager styling", () => {
      it("matches the expected style", () => {
        const wrapper = render({ ...props }, mount);

        assertStyleMatch(
          {
            padding: "0px 24px",
            fontSize: "13px",
            backgroundColor: baseTheme.table.zebra,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: "0",
          },
          wrapper
        );
      });
    });

    describe("Size Selector", () => {
      it("navigates correctly on page size update", () => {
        const onPagination = jest.fn();
        const wrapper = render(
          {
            ...props,
            currentPage: 4,
            onPagination,
          },
          mount
        );
        const selectOptions = {
          value: 25,
          text: "25",
        };

        act(() => {
          wrapper.find(Select).find("input").simulate("click");
        });
        wrapper.find(Select).update();
        expect(wrapper.find(Select).find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(Select).find(SelectList).prop("onSelect")(selectOptions);
        });
        expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
      });
    });
  });
});
