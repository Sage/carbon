import React from "react";
import { mount } from "enzyme";
import withFilter, { FilteredComponentProps } from "./with-filter.hoc";
import Option from "../option";
import OptionRow from "../option-row/option-row.component";

const FilterableList = withFilter(({ children }: FilteredComponentProps) => (
  <ul data-element="select-list">{children}</ul>
));

function renderFilteredOptions(
  props: FilteredComponentProps,
  renderer = mount
) {
  return renderer(
    <FilterableList {...props}>
      <Option text="red" id="0" value="0" />
      <Option text="blue" id="1" value="1" />
      <Option text="green" id="2" value="2" />
      <Option text="black" id="3" value="3" />
      <Option text="purple" id="4" value="4" />
      <Option text="brown" id="5" value="5" />
    </FilterableList>
  );
}

const FilterableTable = withFilter(({ children }: FilteredComponentProps) => (
  <table>
    <tbody data-element="select-list">{children}</tbody>
  </table>
));

function renderFilteredOptionRows(
  props: FilteredComponentProps,
  renderer = mount
) {
  return renderer(
    <FilterableTable multiColumn {...props}>
      <OptionRow text="amber" id="0" value="0">
        <td>
          <span>Amber</span>
        </td>
        <td>
          <span>Light</span>
        </td>
      </OptionRow>
      <OptionRow text="blue" id="1" value="1">
        <td>Blue</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="green" id="2" value="2">
        <td>Green</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="black" id="3" value="3">
        <td>Black</td>
        <td>Dark</td>
      </OptionRow>
      <OptionRow text="purple" id="4" value="4">
        <td>Purple</td>
        <td>Dark</td>
      </OptionRow>
      <OptionRow text="brown" id="5" value="5">
        <td>Brown</td>
        <td>Dark</td>
      </OptionRow>
    </FilterableTable>
  );
}

function renderOtherChildren(props: FilteredComponentProps, renderer = mount) {
  return renderer(
    <FilterableList {...props}>
      <Option text="amber" value="amber" />
      <Option text="blue" value="blue" />
      <Option text="green" value="green" />
      <Option text="black" value="black" />
      <Option text="purple" value="purple" />
      <Option text="brown" value="brown" />
    </FilterableList>
  );
}

describe("withFilter", () => {
  describe('when the "filterText" prop is specified', () => {
    describe('and the "text" prop in one of the option contains the "filterText"', () => {
      it.each([
        [renderFilteredOptions, "green"],
        [renderFilteredOptionRows, "GreenLight"],
      ])("then only that option should be rendered", (renderer, text) => {
        const wrapper = renderer({ filterText: "gre" });
        const element = renderer === renderFilteredOptions ? "ul" : "tbody";

        expect(
          wrapper.find(`${element}[data-element="select-list"]`).children()
        ).toHaveLength(1);
        expect(
          wrapper
            .find(`${element}[data-element="select-list"]`)
            .children()
            .text()
        ).toBe(text);
      });
    });

    describe('and the "text" prop in multiple options contains the "filterText"', () => {
      it.each([
        [renderFilteredOptions, ["blue", "black"]],
        [renderFilteredOptionRows, ["BlueLight", "BlackDark"]],
      ])("then only these options should be rendered", (renderer, texts) => {
        const wrapper = renderer({ filterText: "bl" });
        const element = renderer === renderFilteredOptions ? "ul" : "tbody";

        expect(
          wrapper.find(`${element}[data-element="select-list"]`).children()
        ).toHaveLength(2);
        expect(
          wrapper
            .find(`${element}[data-element="select-list"]`)
            .children()
            .at(0)
            .text()
        ).toBe(texts[0]);
        expect(
          wrapper
            .find(`${element}[data-element="select-list"]`)
            .children()
            .at(1)
            .text()
        ).toBe(texts[1]);
      });
    });

    describe('and the "text" prop in every option does not contain the "filterText"', () => {
      it.each([renderFilteredOptions, renderFilteredOptionRows])(
        'then the "No results" message should be displayed',
        (renderer) => {
          const filterText = "xyz";
          const wrapper = renderer({ filterText });
          const element = renderer === renderFilteredOptions ? "ul" : "tbody";

          const children = wrapper
            .find(`${element}[data-element="select-list"]`)
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
            const element = renderer === renderFilteredOptions ? "ul" : "tbody";

            const children = wrapper
              .find(`${element}[data-element="select-list"]`)
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
        const element = renderer === renderFilteredOptions ? "ul" : "tbody";

        expect(
          wrapper.find(`${element}[data-element="select-list"]`).children()
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
