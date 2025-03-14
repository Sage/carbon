import React from "react";
import { screen } from "@testing-library/react";
import Dl from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import {
  render,
  testStyledSystemSpacing,
} from "../../__spec_helper__/__internal__/test-utils";

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

// Required for coverage
test("when `asSingleColumn` is true, the expected styling is applied to the Dl element", () => {
  render(
    <Dl data-role="dl" asSingleColumn>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
    </Dl>,
  );

  expect(screen.getByTestId("dl")).toHaveStyle("line-height: 21px");
});
