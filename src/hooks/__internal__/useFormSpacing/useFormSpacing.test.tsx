import React from "react";
import styled from "styled-components";
import { margin } from "styled-system";
import { render, screen } from "@testing-library/react";
import useFormSpacing from ".";
import FormSpacingProvider from "../../../__internal__/form-spacing-provider";

const StyledDiv = styled.div`
  ${margin}
`;

const MockComponent = (props: Record<string, unknown>) => {
  const marginProps = useFormSpacing(props);
  return <StyledDiv {...marginProps}>foo</StyledDiv>;
};

test("applies the form spacing when no custom value exists", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "10px",
    marginTop: "0px",
  });
});

test("applies the form spacing when custom values exist that don't override top or bottom margin", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent mx="10px" />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "10px",
    marginTop: "0px",
    marginLeft: "10px",
    marginRight: "10px",
  });
});

test("does not apply the form spacing when custom `my` value exists", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent my="5px" />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "5px",
    marginTop: "5px",
  });
});

test("does not apply the form spacing when custom `m` exists", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent m="5px" />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "5px",
    marginTop: "5px",
  });
});

test("does not apply the form spacing for top margin when custom `mt` value exists", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent mt="5px" />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "10px",
    marginTop: "5px",
  });
});

test("does not apply the form spacing for bottom margin when custom `mb` value exists", () => {
  render(
    <FormSpacingProvider marginBottom="10px">
      <MockComponent mb="5px" />
    </FormSpacingProvider>,
  );

  expect(screen.getByText("foo")).toHaveStyle({
    marginBottom: "5px",
    marginTop: "0px",
  });
});
