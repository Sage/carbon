import { render, screen } from "@testing-library/react";
import React from "react";

import ReadOnlyEditor from "./read-only-rte.component";
import { componentPrefix } from "../constants";

test("should render read-only editor with plain text", () => {
  render(<ReadOnlyEditor value="Hello, World!" />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});

test("should render read-only editor with HTML", () => {
  const html = `<p>
    <a href="https://www.bbc.co.uk">www.bbc.co.uk</a>
    <p>This is a paragraph</p>
  </p>`;
  render(<ReadOnlyEditor value={html} />);
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
              direction: "ltr",
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
          direction: "ltr",
          format: "",
          indent: 0,
          type: "code",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });
  const jsonContent = JSON.stringify(json);
  render(<ReadOnlyEditor value={jsonContent} />);
  expect(
    screen.getByRole("link", { name: "www.bbc.co.uk" }),
  ).toBeInTheDocument();
});

test("should render read-only editor with default value if no content provided", () => {
  render(<ReadOnlyEditor />);
  const editor = screen.getByTestId(
    `${componentPrefix}-readonly-content-editor`,
  );
  expect(editor).toBeInTheDocument();
  expect(editor).toHaveTextContent("");
});
