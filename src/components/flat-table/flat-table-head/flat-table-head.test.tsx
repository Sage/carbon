import React from "react";
import { render, screen } from "@testing-library/react";

import FlatTableHead from "./flat-table-head.component";

test("should render with the expected data- attributes", () => {
  render(
    <table>
      <FlatTableHead
        data-role="ft-head-data-role"
        data-element="ft-head-data-element"
      >
        <tr>
          <th>foo</th>
        </tr>
      </FlatTableHead>
    </table>,
  );
  const ftHead = screen.getByRole("rowgroup");

  expect(ftHead).toHaveAttribute("data-component", "flat-table-head");
  expect(ftHead).toHaveAttribute("data-element", "ft-head-data-element");
  expect(ftHead).toHaveAttribute("data-role", "ft-head-data-role");
});
