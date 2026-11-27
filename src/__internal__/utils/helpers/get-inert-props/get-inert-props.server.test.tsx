import React from "react";
import { renderToString } from "react-dom/server";
import getInertProps from ".";

test("renders inert on the server using a boolean attribute's HTML representation", () => {
  expect(renderToString(<button {...getInertProps(true)}>Action</button>)).toBe(
    '<button inert="">Action</button>',
  );
});

test("omits inert on the server when disabled", () => {
  expect(
    renderToString(<button {...getInertProps(false)}>Action</button>),
  ).toBe("<button>Action</button>");
});
