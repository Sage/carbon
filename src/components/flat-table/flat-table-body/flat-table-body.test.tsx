import React from "react";
import { render, screen } from "@testing-library/react";

import FlatTableBody from "./flat-table-body.component";

test("should render the expected data- attributes", () => {
  render(
    <table>
      <FlatTableBody
        data-role="ft-body-data-role"
        data-element="ft-body-data-element"
      >
        <tr>
          <td>foo</td>
        </tr>
      </FlatTableBody>
    </table>,
  );
  const ftBody = screen.getByRole("rowgroup");

  expect(ftBody).toHaveAttribute("data-component", "flat-table-body");
  expect(ftBody).toHaveAttribute("data-element", "ft-body-data-element");
  expect(ftBody).toHaveAttribute("data-role", "ft-body-data-role");
});
