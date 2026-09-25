import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Dl from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";
import { CHARACTERS } from "../../../playwright/support/constants";
import { StyledDlPair } from "./definition-list.style";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

testStyledSystemSpacing(
  (props) => (
    <Dl data-role="dl" {...props}>
      <Dt>Description</Dt>
      <Dd>This is a test</Dd>
    </Dl>
  ),
  () => screen.getByTestId("dl"),
);

test("should render with provided data- attributes", () => {
  render(
    <Dl data-element="dl-element" data-role="dl-role">
      <Dt data-element="dt-element" data-role="dt-role">
        Title
      </Dt>
      <Dd data-element="dd-element" data-role="dd-role">
        Description
      </Dd>
    </Dl>,
  );

  expect(screen.getByTestId("dl-role")).toHaveAttribute(
    "data-element",
    "dl-element",
  );
  expect(screen.getByTestId("dt-role")).toHaveAttribute(
    "data-element",
    "dt-element",
  );
  expect(screen.getByTestId("dd-role")).toHaveAttribute(
    "data-element",
    "dd-element",
  );
});

test("allows Dt margin props to override the default margin reset", () => {
  render(
    <Dl>
      <Dt data-role="dt" mb={2}>
        Term
      </Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  expect(screen.getByTestId("dt")).toHaveStyleRule(
    "margin-bottom",
    "var(--spacing200)",
  );
});

test("allows Dd margin props to override the default margin reset", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd data-role="dd" mb={2}>
        Description
      </Dd>
    </Dl>,
  );

  expect(screen.getByTestId("dd")).toHaveStyleRule("margin-bottom", "8px");
});

test("component should render correctly if composed with a React Fragment", () => {
  render(
    <Dl>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
      <>
        <Dt>Title inside of React Fragment</Dt>
        <Dd>Description inside of React Fragment</Dd>
      </>
    </Dl>,
  );

  const dtElements = screen.getAllByTestId("dt");
  const ddElements = screen.getAllByTestId("dd");

  expect(dtElements).toHaveLength(2);
  expect(dtElements[0]).toHaveTextContent("Title");
  expect(dtElements[1]).toHaveTextContent("Title inside of React Fragment");

  expect(ddElements).toHaveLength(2);
  expect(ddElements[0]).toHaveTextContent("Description");
  expect(ddElements[1]).toHaveTextContent(
    "Description inside of React Fragment",
  );
});

test("component should render the correct amount of list items with conditionally rendered children and with inline definitions", () => {
  render(
    <Dl>
      {true && (
        <>
          <Dt>First</Dt>
          <Dd>1st Description</Dd>
        </>
      )}
      {false && (
        <>
          <Dt>Second</Dt>
          <Dd>2nd Description</Dd>
        </>
      )}
      {true && (
        <>
          <Dt>Third</Dt>
          <Dd>3rd Description</Dd>
        </>
      )}
    </Dl>,
  );

  const dtElements = screen.getAllByTestId("dt");
  const ddElements = screen.getAllByTestId("dd");

  expect(dtElements).toHaveLength(2);
  expect(dtElements[0]).toHaveTextContent("First");
  expect(dtElements[1]).toHaveTextContent("Third");

  expect(ddElements).toHaveLength(2);
  expect(ddElements[0]).toHaveTextContent("1st Description");
  expect(ddElements[1]).toHaveTextContent("3rd Description");
});

test("when mapping from an object, the component should render the correct amount of list items with conditionally rendered children", () => {
  const definitions = [
    {
      definition: "First",
      description: "1st Description",
    },
    undefined,
    {
      definition: "Third",
      description: "3rd Description",
    },
  ];

  render(
    <Dl>
      {definitions.map(
        (content) =>
          content && (
            <React.Fragment key={content.definition}>
              <Dt>{content.definition}</Dt>
              <Dd>{content.description}</Dd>
            </React.Fragment>
          ),
      )}
    </Dl>,
  );

  const dtElements = screen.getAllByTestId("dt");
  const ddElements = screen.getAllByTestId("dd");

  expect(dtElements).toHaveLength(2);
  expect(dtElements[0]).toHaveTextContent("First");
  expect(dtElements[1]).toHaveTextContent("Third");

  expect(ddElements).toHaveLength(2);
  expect(ddElements[0]).toHaveTextContent("1st Description");
  expect(ddElements[1]).toHaveTextContent("3rd Description");
});

test("preserves stateful descriptions when a keyed pair is prepended", () => {
  const StatefulDescription = ({ label }: { label: string }) => {
    const [value, setValue] = React.useState(label);

    return (
      <input
        aria-label={label}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  };

  const DefinitionList = ({ showFirst }: { showFirst: boolean }) => (
    <Dl>
      {showFirst && (
        <React.Fragment key="first">
          <Dt>First</Dt>
          <Dd>
            <StatefulDescription label="first" />
          </Dd>
        </React.Fragment>
      )}
      <React.Fragment key="second">
        <Dt>Second</Dt>
        <Dd>
          <StatefulDescription label="second" />
        </Dd>
      </React.Fragment>
    </Dl>
  );

  const { rerender } = render(<DefinitionList showFirst={false} />);

  fireEvent.change(screen.getByRole("textbox", { name: "second" }), {
    target: { value: "updated" },
  });

  rerender(<DefinitionList showFirst />);

  expect(screen.getByRole("textbox", { name: "first" })).toHaveValue("first");
  expect(screen.getByRole("textbox", { name: "second" })).toHaveValue(
    "updated",
  );
});

// Required for coverage
test("groups terms and their descriptions into semantic definition pairs", () => {
  render(
    <Dl data-role="dl">
      <Dt>Title</Dt>
      <Dd>Description</Dd>
      <Dd>Additional description</Dd>
      <Dt>Second title</Dt>
      <Dd>Second description</Dd>
    </Dl>,
  );

  const pairs = screen.getAllByTestId("dl-pair");

  expect(pairs).toHaveLength(2);
  expect(within(pairs[0]).getAllByTestId("dt")).toHaveLength(1);
  expect(within(pairs[0]).getAllByTestId("dd")).toHaveLength(2);
  expect(within(pairs[1]).getAllByTestId("dt")).toHaveLength(1);
  expect(within(pairs[1]).getAllByTestId("dd")).toHaveLength(1);
});

// Required for coverage
test("treats a description with no preceding term as a standalone item, rather than grouping it into a pair", () => {
  render(
    <Dl>
      <Dd>Orphan description</Dd>
      <Dt>Term</Dt>
      <Dd>Paired description</Dd>
    </Dl>,
  );

  const pairs = screen.getAllByTestId("dl-pair");
  const ddElements = screen.getAllByTestId("dd");

  expect(pairs).toHaveLength(1);
  expect(ddElements).toHaveLength(2);
  expect(ddElements[0]).toHaveTextContent("Orphan description");
  expect(within(pairs[0]).getByTestId("dd")).toHaveTextContent(
    "Paired description",
  );
});

// Required for coverage
test("renders a non-list child as a standalone item and closes any pair left open before it", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <span>Stray content</span>
    </Dl>,
  );

  const pairs = screen.getAllByTestId("dl-pair");

  expect(pairs).toHaveLength(1);
  expect(screen.getByText("Stray content")).toBeInTheDocument();
});

// Required for coverage
test("falls back to the array index as the key for a stray non-element child", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      Stray text content
    </Dl>,
  );

  expect(screen.getByText("Stray text content")).toBeInTheDocument();
});

test("applies the selected top and bottom pair padding and dividers", () => {
  render(
    <Dl data-role="dl" divider spacing="small">
      <Dt>First</Dt>
      <Dd>Description</Dd>
      <Dt>Second</Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  const pairs = screen.getAllByTestId("dl-pair");

  expect(pairs[0]).toHaveStyleRule(
    "padding-bottom",
    "var(--global-space-comp-xs)",
  );
  expect(pairs[0]).toHaveStyleRule(
    "padding-top",
    "var(--global-space-comp-xs)",
  );
  expect(pairs[0]).toHaveStyleRule(
    "border-bottom",
    "1px solid var(--container-standard-border-default)",
  );

  expect(pairs[1]).toHaveStyleRule(
    "padding-bottom",
    "var(--global-space-comp-xs)",
  );
  expect(pairs[1]).not.toHaveStyleRule(
    "border-bottom",
    "1px solid var(--container-standard-border-default)",
  );
});

// Required for coverage: `spacing` is not passed down when `StyledDlPair` is used outside `Dl`, which always defaults it
test("falls back to medium spacing when no spacing prop is provided to StyledDlPair", () => {
  render(<StyledDlPair data-role="dl-pair" w={50} />);

  const pair = screen.getByTestId("dl-pair");

  expect(pair).toHaveStyleRule("padding-bottom", "var(--global-space-comp-m)");
  expect(pair).toHaveStyleRule("padding-top", "var(--global-space-comp-m)");
});

test("renders the provided rightChildren content next to the description", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd rightChildren={<span>Right children content</span>}>Description</Dd>
    </Dl>,
  );

  expect(screen.getByTestId("dd-right-children")).toHaveTextContent(
    "Right children content",
  );
});

test("does not render a right children element when none is provided", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  expect(screen.queryByTestId("dd-right-children")).not.toBeInTheDocument();
});

test("supports block-level description content", () => {
  render(
    <Dl>
      <Dt>Term</Dt>
      <Dd>
        <div data-role="block-description">Description</div>
      </Dd>
    </Dl>,
  );

  const dd = screen.getByTestId("dd");
  const content = within(dd).getByTestId("block-description");

  expect(dd).toContainElement(content);
});

test("supports multiple Dd elements under one Dt, each with their own rightChildren", () => {
  render(
    <Dl data-role="dl">
      <Dt>Term</Dt>
      <Dd rightChildren={<span>First right children</span>}>
        First description
      </Dd>
      <Dd rightChildren={<span>Second right children</span>}>
        Second description
      </Dd>
    </Dl>,
  );

  const ddElements = screen.getAllByTestId("dd");
  const rightChildrenElements = screen.getAllByTestId("dd-right-children");

  expect(rightChildrenElements).toHaveLength(2);
  expect(within(ddElements[0]).getByText("First right children")).toBeVisible();
  expect(
    within(ddElements[1]).getByText("Second right children"),
  ).toBeVisible();
});

test("uses the vertical layout and left-aligns terms by default", () => {
  render(
    <Dl data-role="dl" asSingleColumn>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  const pair = screen.getByTestId("dl-pair");
  const term = screen.getByTestId("dt");

  expect(pair).toHaveStyleRule("display", "block");
  expect(term).toHaveStyleRule("text-align", "left");
});

test("uses a horizontal grid and honours explicit term alignment", () => {
  render(
    <Dl data-role="dl" dtTextAlign="center" w={40}>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  const pair = screen.getByTestId("dl-pair");
  const term = screen.getByTestId("dt");

  expect(pair).toHaveStyleRule("grid-template-columns", "40% minmax(0,1fr)");
  expect(term).toHaveStyleRule("text-align", "center");
});

specialCharacters.forEach((text) => {
  test("should render Dt and Dd with special characters", () => {
    render(
      <Dl>
        <Dt data-role="dt-role">{text}</Dt>
        <Dd data-role="dd-role">{text}</Dd>
      </Dl>,
    );

    expect(screen.getByTestId("dt-role")).toHaveTextContent(text);
    expect(screen.getByTestId("dd-role")).toHaveTextContent(text);
  });
});
