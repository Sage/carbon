import React from "react";
import { render, screen } from "@testing-library/react";
import Typography, { List, ListItem } from ".";
import { testStyledSystemSpacingRTL } from "../../__spec_helper__/__internal__/test-utils";

test("should render with variant as 'p' by default", () => {
  render(<Typography>Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0 0 16px",
  });
});

test("should render with expected styles when variant is 'h1-large'", () => {
  render(<Typography variant="h1-large">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h1'", () => {
  render(<Typography variant="h1">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h2'", () => {
  render(<Typography variant="h2">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "22px",
    lineHeight: "27.5px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h3'", () => {
  render(<Typography variant="h3">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "20px",
    lineHeight: "25px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h4'", () => {
  render(<Typography variant="h4">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "18px",
    lineHeight: "22.5px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h5'", () => {
  render(<Typography variant="h5">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'segment-header'", () => {
  render(<Typography variant="segment-header">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "20px",
    lineHeight: "25px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'segment-header-small'", () => {
  render(<Typography variant="segment-header-small">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "18px",
    lineHeight: "22.5px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'segment-subheader'", () => {
  render(<Typography variant="segment-subheader">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'segment-subheader-alt'", () => {
  render(<Typography variant="segment-subheader-alt">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "500",
    textTransform: "uppercase",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'span'", () => {
  render(<Typography variant="span">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'small'", () => {
  render(<Typography variant="small">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'big'", () => {
  render(<Typography variant="big">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'sup'", () => {
  render(<Typography variant="sup">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    verticalAlign: "super",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'sub'", () => {
  render(<Typography variant="sub">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: "400",
    textTransform: "none",
    textDecoration: "none",
    verticalAlign: "sub",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'strong'", () => {
  render(<Typography variant="strong">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'b'", () => {
  render(<Typography variant="b">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'em'", () => {
  render(<Typography variant="em">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "underline",
    margin: "0",
  });
});

test("should render with expected styles when 'truncate' is true", () => {
  render(<Typography truncate>Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  });
});

test("should render with visuallyHidden styles when 'screenReaderOnly' is true", () => {
  render(<Typography screenReaderOnly>Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    border: "0",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
  });
});

test("should override 'display' property when passed", () => {
  render(
    <Typography variant="b" display="block">
      Test
    </Typography>,
  );

  expect(screen.getByText("Test")).toHaveStyle({ display: "block" });
});

test("should render List with variant as 'ul' by default and listStyleType set to 'square", () => {
  render(
    <List>
      <ListItem>List Item 1</ListItem>
      <ListItem>List Item 2</ListItem>
      <ListItem>List Item 3</ListItem>
    </List>,
  );

  expect(screen.getByRole("list")).toHaveStyle({ listStyleType: "square" });
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("should render List with variant set to 'ol' and listStyleType set to 'decimal", () => {
  render(
    <List as="ol">
      <ListItem>List Item 1</ListItem>
      <ListItem>List Item 2</ListItem>
      <ListItem>List Item 3</ListItem>
    </List>,
  );

  expect(screen.getByRole("list")).toHaveStyle({ listStyleType: "decimal" });
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

testStyledSystemSpacingRTL(
  (props) => <Typography {...props}>Test</Typography>,
  () => screen.getByText("Test"),
);
