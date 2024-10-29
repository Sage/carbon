import React from "react";
import { screen } from "@testing-library/react";
import RequiredFieldsIndicator from ".";
import { testStyledSystemMarginRTL } from "../../../__spec_helper__/__internal__/test-utils";

describe("RequiredFieldsIndicator", () => {
  testStyledSystemMarginRTL(
    (props) => (
      <RequiredFieldsIndicator data-role="required-fields" {...props}>
        children
      </RequiredFieldsIndicator>
    ),
    () => screen.getByTestId("required-fields"),
  );
});
