import React from "react";
import { mount } from "enzyme";
import withFilter from "./with-filter.hoc";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";

describe("withFilter", () => {
  describe('when the "filterText" prop is specified', () => {
    describe('and the "text" prop in one of the option contains the "filterText"', () => {
      it.each([
        [renderFilteredOptions, "green"],
        [renderFilteredOptionRows, "GreenLight"],
      ])("then only that option should be rendered", (renderer, text) => {
        const wrapper = renderer({ filterText: "gre" });

        expect(
          wrapper.find('ul[data-element="select-list"]').children()
        ).toHaveLength(1);
        expect(
          wrapper.find('ul[data-element="select-list"]').children().text()
        ).toBe(text);
      });
    });

    describe('and the "text" prop in multiple options contains the "filterText"', () => {
      it.each([
        [renderFilteredOptions, ["blue", "black"]],
        [renderFilteredOptionRows, ["BlueLight", "BlackDark"]],
      ])("then only these options should be rendered", (renderer, texts) => {
        const wrapper = renderer({ filterText: "bl" });

        expect(
          wrapper.find('ul[data-element="select-list"]').children()
        ).toHaveLength(2);
        expect(
          wrapper.find('ul[data-element="select-list"]').children().at(0).text()
        ).toBe(texts[0]);
        expect(
          wrapper.find('ul[data-element="select-list"]').children().at(1).text()
        ).toBe(texts[1]);
      });
    });

    describe('and the "text" prop in every option does not contain the "filterText"', () => {
      it.each([renderFilteredOptions, renderFilteredOptionRows])(
        'then the "No results" message should be displayed',
        (renderer) => {
          const filterText = "xyz";
          const wrapper = renderer({ filterText });
          const children = wrapper
            .find('ul[data-element="select-list"]')
            .children();

          expect(children).toHaveLength(1);
          expect(children.at(0).text()).toBe(`No results for "${filterText}"`);
        }
      );

      describe("when a custom message has been specified in noResultsMessage prop", () => {
        it.each([renderFilteredOptions, renderFilteredOptionRows])(
          "then that message should be displayed",
          (renderer) => {
            const customMessage = "custom message";
            const wrapper = renderer({
              filterText: "xyz",
              noResultsMessage: customMessage,
            });
            const children = wrapper
              .find('ul[data-element="select-list"]')
              .children();

            expect(children).toHaveLength(1);
            expect(children.at(0).text()).toBe(customMessage);
          }
        );
      });
    });
  });

  describe('when the "filterText" prop is not specified', () => {
    it.each([renderFilteredOptions, renderFilteredOptionRows])(
      "then all options should be rendered",
      (renderer) => {
        const wrapper = renderer({ filterText: "" });

        expect(
          wrapper.find('ul[data-element="select-list"]').children()
        ).toHaveLength(6);
      }
    );
  });

  describe('when the "filterText" prop is specified and children are not Option/OptionRow', () => {
    it('then the "No results" message should be displayed', () => {
      const filterText = "filterText";
      const wrapper = renderOtherChildren({ filterText });
      const children = wrapper
        .find('ul[data-element="select-list"]')
        .children();

      expect(children).toHaveLength(1);
      expect(children.at(0).text()).toBe(`No results for "${filterText}"`);
    });
  });
});

// eslint-disable-next-line react/prop-types
const ListComponent = ({ children }) => {
  return <ul data-element="select-list">{children}</ul>;
};

const FilteredListComponent = withFilter(ListComponent);

function renderFilteredOptions(props, renderer = mount) {
  return renderer(
    <FilteredListComponent {...props}>
      <Option />
      <Option text="blue" />
      <Option text="green" />
      <Option text="black" />
      <Option text="purple" />
      <Option text="brown" />
    </FilteredListComponent>
  );
}

function renderFilteredOptionRows(props, renderer = mount) {
  return renderer(
    <FilteredListComponent multiColumn {...props}>
      <OptionRow text="amber">
        <td>
          <div />
        </td>
        <td>
          <div />
        </td>
      </OptionRow>
      <OptionRow text="blue">
        <td>Blue</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="green">
        <td>Green</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="black">
        <td>Black</td>
        <td>Dark</td>
      </OptionRow>
      <OptionRow text="purple">
        <td>Purple</td>
        <td>Dark</td>
      </OptionRow>
      <OptionRow text="brown">
        <td>Brown</td>
        <td>Dark</td>
      </OptionRow>
    </FilteredListComponent>
  );
}

function renderOtherChildren(props, renderer = mount) {
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
