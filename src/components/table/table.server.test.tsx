import React from "react";
import { renderToString } from "react-dom/server";

import Table from "./table.component";
import TableHead from "./table-head";
import TableBody from "./table-body";

test("renders on the server using the passive isomorphic effect", () => {
  const view = renderToString(
    <Table maxWidth="480px">
      <TableHead>
        <tr>
          <th>Header</th>
        </tr>
      </TableHead>
      <TableBody>
        <tr>
          <td>Row one</td>
        </tr>
      </TableBody>
    </Table>,
  );

  expect(view).toContain('data-component="table"');
  expect(view).toContain('data-element="table-scroll-container"');
  expect(view).not.toContain('tabindex="0"');
});
