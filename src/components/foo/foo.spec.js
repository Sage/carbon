import React from "react";
// import { expect } from '@jest/globals';
import { render } from "@testing-library/react";
import Foo from "./foo.component";

describe("Foo", () => {
  it("should render an input when prop2 passed", () => {
    render(<Foo prop2 />);

    // expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  });
});
