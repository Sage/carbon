import React from "react";
import { render, screen } from "@testing-library/react";
import FlexTileDivider from "./flex-tile-divider.component";

test("hr element has aria-hidden attribute set to true", () => {
  render(<FlexTileDivider />);
  expect(screen.getByTestId("hr")).toHaveAttribute("aria-hidden", "true");
});
