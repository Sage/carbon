import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import ReadOnlyEditor from "./read-only-rte.component";
import { COMPONENT_PREFIX } from "./constants";

test("should render read-only editor with plain text", () => {
  render(<ReadOnlyEditor value="Hello, World!" />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});

test("should wrap plain-text links with anchors in the editor", () => {
  render(
    <ReadOnlyEditor value="Hello, World! www.bbc.co.uk http://www.google.com https://www.sage.com" />,
  );
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
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
  render(<ReadOnlyEditor value={json} />);
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
