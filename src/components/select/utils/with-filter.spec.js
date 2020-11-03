import React from "react";
import { mount } from "enzyme";
import withFilter from "./with-filter.hoc";

describe("withFilter", () => {
  describe('when the "filterText" prop is specified', () => {
    describe('and the "text" prop in one of the option contains the "filterText"', () => {
      it("then only that option should be rendered", () => {
        const wrapper = renderFilteredList({ filterText: "gre" });

        expect(
          wrapper.find('ul[data-element="select-list"]').children()
        ).toHaveLength(1);
        expect(
          wrapper.find('ul[data-element="select-list"]').children().text()
        ).toBe("green");
      });
    });

    describe('and the "text" prop in multiple options contains the "filterText"', () => {
      it("then only these options should be rendered", () => {
        const wrapper = renderFilteredList({ filterText: "bl" });

        expect(
          wrapper.find('ul[data-element="select-list"]').children()
        ).toHaveLength(2);
        expect(
          wrapper.find('ul[data-element="select-list"]').children().at(0).text()
        ).toBe("blue");
        expect(
          wrapper.find('ul[data-element="select-list"]').children().at(1).text()
        ).toBe("black");
      });
    });

    describe('and the "text" prop in every option does not contain the "filterText"', () => {
      it('then the "No results" message should be displayed', () => {
        const filterText = "xyz";
        const wrapper = renderFilteredList({ filterText });
        const children = wrapper
          .find('ul[data-element="select-list"]')
          .children();

        expect(children).toHaveLength(1);
        expect(children.at(0).text()).toBe(`No results for "${filterText}"`);
      });

      describe("when a custom message has been specified in noResultsMessage prop", () => {
        it("then that message should be displayed", () => {
          const customMessage = "custom message";
          const wrapper = renderFilteredList({
            filterText: "xyz",
            noResultsMessage: customMessage,
          });
          const children = wrapper
            .find('ul[data-element="select-list"]')
            .children();

          expect(children).toHaveLength(1);
          expect(children.at(0).text()).toBe(customMessage);
        });
      });
    });
  });

  describe('when the "filterText" prop is not specified', () => {
    it("then all options should be rendered", () => {
      const wrapper = renderFilteredList({ filterText: "" });

      expect(
        wrapper.find('ul[data-element="select-list"]').children()
      ).toHaveLength(6);
    });
  });
});

// eslint-disable-next-line react/prop-types
const ListComponent = ({ children }) => {
  return <ul data-element="select-list">{children}</ul>;
};

const FilteredListComponent = withFilter(ListComponent);

function renderFilteredList(props, renderer = mount) {
  return renderer(
    <FilteredListComponent {...props}>
      <li text="amber" />
      <li text="blue" />
      <li text="green" />
      <li text="black" />
      <li text="purple" />
      <li text="brown" />
    </FilteredListComponent>
  );
}
