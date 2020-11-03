import React from "react";
import FlatTableCell from "./flat-table-cell.component";
import { testStyledSystemSpacing } from "../../../__spec_helper__/test-utils";

describe("FlatTableCell", () => {
  testStyledSystemSpacing(
    (props) => <FlatTableCell {...props} />,
    { py: "10px", px: 3 },
    null,
    { modifier: " > div" }
  );
});
