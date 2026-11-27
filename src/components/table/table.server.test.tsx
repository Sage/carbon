import React from "react";
import { renderToString } from "react-dom/server";

import Table from "./table.component";
import TableHead from "./table-head";
import TableBody from "./table-body";
import TableRow from "./table-row";
import TableCell from "./table-cell";

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

test("server-rendered collapsed subrows carry an inert attribute", () => {
  const view = renderToString(
    <Table>
      <TableBody>
        <TableRow
          id="parent"
          subRows={
            <TableRow id="child">
              <TableCell>Child</TableCell>
            </TableRow>
          }
        >
          <TableCell>Parent</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
  const childRowTag = view.match(/<tr[^>]*id="child"[^>]*>/)?.[0];
  expect(childRowTag).toContain('inert=""');
});
