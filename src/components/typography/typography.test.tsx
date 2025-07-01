import React from "react";
import { render, screen } from "@testing-library/react";
import Typography, { List, ListItem } from ".";

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
    fontSize: "40px",
    lineHeight: "50px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h1'", () => {
  render(<Typography variant="h1">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "30px",
    lineHeight: "37.5px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h2'", () => {
  render(<Typography variant="h2">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
  });
});

test("should render with expected styles when variant is 'h3'", () => {
  render(<Typography variant="h3">Test</Typography>);

  expect(screen.getByText("Test")).toHaveStyle({
    fontSize: "21px",
    lineHeight: "26.25px",
    fontWeight: "700",
    textTransform: "none",
    textDecoration: "none",
    margin: "0",
    padding: "0 0 16px 0",
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
    fontSize: "21px",
    lineHeight: "26.25px",
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

describe("Styled System Spacing", () => {
  test("should apply margin when m prop is provided", () => {
    render(<Typography m="10px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ margin: "10px" });
  });

  test("should apply marginLeft when ml prop is provided", () => {
    render(<Typography ml="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ marginLeft: "5px" });
  });

  test("should apply marginRight when mr prop is provided", () => {
    render(<Typography mr="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ marginRight: "5px" });
  });

  test("should apply marginTop when mt prop is provided", () => {
    render(<Typography mt="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ marginTop: "5px" });
  });

  test("should apply marginBottom when mb prop is provided", () => {
    render(<Typography mb="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ marginBottom: "5px" });
  });

  test("should apply horizontal margins when mx prop is provided", () => {
    render(<Typography mx="8px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({
      marginLeft: "8px",
      marginRight: "8px",
    });
  });

  test("should apply vertical margins when my prop is provided", () => {
    render(<Typography my="8px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({
      marginTop: "8px",
      marginBottom: "8px",
    });
  });

  test("should apply padding when p prop is provided", () => {
    render(<Typography p="10px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ padding: "10px" });
  });

  test("should apply paddingLeft when pl prop is provided", () => {
    render(<Typography pl="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ paddingLeft: "5px" });
  });

  test("should apply paddingRight when pr prop is provided", () => {
    render(<Typography pr="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ paddingRight: "5px" });
  });

  test("should apply paddingTop when pt prop is provided", () => {
    render(<Typography pt="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ paddingTop: "5px" });
  });

  test("should apply paddingBottom when pb prop is provided", () => {
    render(<Typography pb="5px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({ paddingBottom: "5px" });
  });

  test("should apply horizontal padding when px prop is provided", () => {
    render(<Typography px="8px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({
      paddingLeft: "8px",
      paddingRight: "8px",
    });
  });

  test("should apply vertical padding when py prop is provided", () => {
    render(<Typography py="8px">Test</Typography>);
    expect(screen.getByText("Test")).toHaveStyle({
      paddingTop: "8px",
      paddingBottom: "8px",
    });
  });
});

describe("Lists", () => {
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

  test("passes the variant of `List` to the child `ListItem` elements", () => {
    render(
      <List variant="big">
        <ListItem data-role="list-item-1">List Item 1</ListItem>
        <ListItem data-role="list-item-2">List Item 2</ListItem>
        <ListItem data-role="list-item-3">List Item 3</ListItem>
      </List>,
    );

    ["list-item-1", "list-item-2", "list-item-3"].forEach((role) => {
      expect(screen.getByTestId(role)).toHaveStyle({
        "font-style": "normal",
        "font-size": "16px",
        "font-weight": "400",
        "line-height": "24px",
      });
    });
  });
});
