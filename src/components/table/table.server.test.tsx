import React from "react";
import { renderToString } from "react-dom/server";

import Table from "./table.component";

test("renders on the server using the passive isomorphic effect", () => {
  const view = renderToString(
    <Table maxWidth="480px">
      <tbody>
        <tr>
          <td>Row one</td>
        </tr>
      </tbody>
    </Table>,
  );

  expect(view).toContain('data-component="table"');
  expect(view).toContain('data-element="table-scroll-container"');
  expect(view).not.toContain('tabindex="0"');
});
