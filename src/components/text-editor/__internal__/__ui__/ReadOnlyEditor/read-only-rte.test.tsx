import { render, screen } from "@testing-library/react";
import React from "react";

import ReadOnlyEditor from "./read-only-rte.component";
import { COMPONENT_PREFIX } from "../../__utils__/constants";

test("should render read-only editor with plain text", () => {
  render(<ReadOnlyEditor initialValue="Hello, World!" />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});

test("should render read-only editor as an article", () => {
  render(<ReadOnlyEditor initialValue="Hello, World!" />);

  const readOnlyEditor = screen.getByRole("article");

  expect(readOnlyEditor).toBeVisible();
  expect(readOnlyEditor).toHaveTextContent("Hello, World!");
});

test("should wrap plain-text links with anchors in the editor", () => {
  const sampleHTML = `<pre spellcheck="false"><span style="font-weight: 400; font-size: 14px; line-height: 21px;">Hello, World! </span><a href="www.bbc.co.uk" rel="noreferrer"><span style="white-space: pre-wrap;">www.bbc.co.uk</span></a><span style="white-space: pre-wrap;"> </span><a href="http://www.google.com"><span style="white-space: pre-wrap;">http://www.google.com</span></a><span style="white-space: pre-wrap;"> </span><a href="https://www.sage.com"><span style="white-space: pre-wrap;">https://www.sage.com</span></a></pre>`;
  render(<ReadOnlyEditor initialValue={sampleHTML} />);
  expect(
    screen.getByText("Hello, World!", { exact: false }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "www.bbc.co.uk" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "http://www.google.com" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "https://www.sage.com" }),
  ).toBeInTheDocument();
});

test("should render read-only editor with HTML", () => {
  const html = `<p>
    <a href="https://www.bbc.co.uk">www.bbc.co.uk</a>
    <p>This is a paragraph</p>
  </p>`;
  render(<ReadOnlyEditor initialValue={html} />);
  expect(
    screen.getByRole("link", { name: "www.bbc.co.uk" }),
  ).toBeInTheDocument();
  expect(screen.getByText("This is a paragraph")).toBeInTheDocument();
});

test("should render read-only editor with JSON", () => {
  const json = JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "www.bbc.co.uk",
                  type: "text",
                  version: 1,
                },
              ],

              format: "",
              indent: 0,
              type: "autolink",
              version: 1,
              rel: null,
              target: null,
              title: null,
              url: "https://www.bbc.co.uk",
              isUnlinked: false,
            },
          ],

          format: "",
          indent: 0,
          type: "code",
          version: 1,
        },
      ],

      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });
  render(<ReadOnlyEditor initialValue={json} />);
  expect(
    screen.getByRole("link", { name: "www.bbc.co.uk" }),
  ).toBeInTheDocument();
});

test("should render read-only editor with default value if no content provided", () => {
  render(<ReadOnlyEditor />);
  const editor = screen.getByTestId(
    `${COMPONENT_PREFIX}-readonly-content-editor`,
  );
  expect(editor).toBeInTheDocument();
  expect(editor).toHaveTextContent("");
});
