import React from "react";
import RequiredFieldsIndicator from ".";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

describe("RequiredFieldsIndicator", () => {
  testStyledSystemMargin((props) => (
    <RequiredFieldsIndicator {...props}>children</RequiredFieldsIndicator>
  ));
});
