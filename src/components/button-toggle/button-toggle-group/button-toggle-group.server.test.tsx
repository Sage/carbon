import React from "react";
import { renderToString } from "react-dom/server";

import { ButtonToggle, ButtonToggleGroup } from "..";

test("renders on the server using the passive isomorphic effect", () => {
  const view = renderToString(
    <ButtonToggleGroup
      id="button-toggle-group-id"
      onChange={() => {}}
      value="foo"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
    </ButtonToggleGroup>,
  );

  expect(view).toContain('data-component="button-toggle-group"');
  expect(view).toContain('data-component="button-toggle"');
});
