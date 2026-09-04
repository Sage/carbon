import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  ExpandableTableComponent,
  SelectableTableComponent,
  SortableTableComponent,
  StickyHeaderFooterTableComponent,
  TableComponent,
  ZebraStripedTableComponent,
} from "./components-test.pw";

test.describe("Table accessibility tests", () => {
  test("should pass accessibility tests for a basic table", async ({
    mount,
    page,
  }) => {
    await mount(<TableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a zebra striped table", async ({
    mount,
    page,
  }) => {
    await mount(<ZebraStripedTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a sticky header and footer table", async ({
    mount,
    page,
  }) => {
    await mount(<StickyHeaderFooterTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a selectable table", async ({
    mount,
    page,
  }) => {
    await mount(<SelectableTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for an expandable table", async ({
    mount,
    page,
  }) => {
    await mount(<ExpandableTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a sortable table", async ({
    mount,
    page,
  }) => {
    await mount(<SortableTableComponent />);

    await checkAccessibility(page);
  });
});
