import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import FlexTileDivider from "./flex-tile-divider.component";

test("hr element has aria-hidden attribute set to true", () => {
  render(<FlexTileDivider />);
  expect(screen.getByTestId("hr")).toHaveAttribute("aria-hidden", "true");
});
