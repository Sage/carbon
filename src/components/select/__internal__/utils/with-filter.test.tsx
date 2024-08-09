import React from "react";
import { render, screen } from "@testing-library/react";
import withFilter, { FilteredComponentProps } from "./with-filter.hoc";
import Option from "../../option";
import OptionRow from "../../option-row";

const FilterableTable = (props: FilteredComponentProps) => {
  const Wrapper = withFilter(({ children }) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  ));
  return (
    <Wrapper multiColumn {...props}>
      <OptionRow text="green" id="1" value="1">
        <td>Green</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="black" id="2" value="2">
        <td>Black</td>
        <td>Dark</td>
      </OptionRow>
      <OptionRow text="blue" id="3" value="3">
        <td>Blue</td>
        <td>Light</td>
      </OptionRow>
      <OptionRow text="brown" id="4" value="4">
        <td>Brown</td>
        <td>Dark</td>
      </OptionRow>
    </Wrapper>
  );
};

const FilterableList = (props: FilteredComponentProps) => {
  const Wrapper = withFilter(({ children }) => <ul>{children}</ul>);
  return (
    <Wrapper {...props}>
      <Option text="green" id="1" value="1" />
      <Option text="black" id="2" value="2" />
      <Option text="blue" id="3" value="3" />
      <Option text="brown" id="4" value="4" />
    </Wrapper>
  );
};

test("renders correct option that matches the filterText prop", () => {
  render(<FilterableList filterText="gre" />);
  const green = screen.getByRole("option");

  expect(green).toHaveTextContent(/green/i);
  expect(green).toBeVisible();
});

test("renders correct option row that matches the filterText prop", () => {
  render(<FilterableTable filterText="gre" />);
  const green = screen.getByRole("option");

  expect(green).toHaveTextContent(/GreenLight/i);
  expect(green).toBeVisible();
});

test("renders correct options when filterText prop has multiple matches", () => {
  render(<FilterableList filterText="bl" />);

  expect(screen.getByRole("option", { name: /bl ack/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /bl ue/i })).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(2);
});

test("renders correct option rows when filterText prop has multiple matches", () => {
  render(<FilterableTable filterText="bl" />);

  expect(screen.getByRole("option", { name: /Bl ack Dark/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /Bl ue Light/i })).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(2);
});

test("renders 'No results' message when no options match the filterText prop", () => {
  render(<FilterableList filterText="xyz" />);

  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText('No results for "xyz"')).toBeVisible();
});

test("renders 'No results' message when no option rows match the filterText prop", () => {
  render(<FilterableTable filterText="xyz" />);

  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText('No results for "xyz"')).toBeVisible();
});

test("renders custom no results message when no options match filterText and noResultsMessage prop is provided", () => {
  render(<FilterableList filterText="xyz" noResultsMessage="custom message" />);

  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText("custom message")).toBeVisible();
});

test("renders custom no results message when no option rows match filterText and noResultsMessage prop is provided", () => {
  render(
    <FilterableTable filterText="xyz" noResultsMessage="custom message" />,
  );

  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText("custom message")).toBeVisible();
});

test("renders all options when filterText prop is an empty string", () => {
  render(<FilterableList filterText="" />);

  expect(screen.getByRole("option", { name: /green/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /black/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /blue/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /brown/i })).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(4);
});

test("renders all option rows when filterText prop is an empty string", () => {
  render(<FilterableTable />);

  expect(screen.getByRole("option", { name: /Green Light/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /Black Dark/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /Blue Light/i })).toBeVisible();
  expect(screen.getByRole("option", { name: /Brown Dark/i })).toBeVisible();
  expect(screen.getAllByRole("option")).toHaveLength(4);
});

test("renders 'No results' message regardless if there are no Option or OptionRow components found", () => {
  const WithNoOptions = (props: FilteredComponentProps) => {
    const Wrapper = withFilter(({ children }) => <ul>{children}</ul>);
    return (
      <Wrapper {...props}>
        <li>amber</li>
        <li>blue</li>
        <li>green</li>
      </Wrapper>
    );
  };
  render(<WithNoOptions filterText="green" />);

  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText('No results for "green"')).toBeVisible();
});

test("renders correct option row that matches the filterText prop, even when it has complex markup", () => {
  const WithComplexOptions = () => {
    const Wrapper = withFilter(({ children }) => (
      <table>
        <tbody>{children}</tbody>
      </table>
    ));
    return (
      <Wrapper multiColumn filterText="gre">
        <OptionRow text="green" id="1" value="1">
          <td>
            <span>Green</span>
          </td>
          <td>Light</td>
        </OptionRow>
        <OptionRow text="red" id="2" value="2">
          <td>
            <span>Red</span>
          </td>
          <td>Dark</td>
        </OptionRow>
      </Wrapper>
    );
  };
  render(<WithComplexOptions />);

  expect(screen.getByRole("option")).toHaveTextContent("GreenLight");
});
