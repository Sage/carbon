import React from "react";
import { test, expect } from "../../__spec_helper__/base-test";

import Foo from "./foo.component";

test.describe("Foo", () => {
  test("test with prop 1", async ({ mount, page }) => {
    await mount(<Foo prop1>FOOOO</Foo>);

    await expect(page.getByText("FOOOO")).toHaveCount(0);
  });

  test("test with no prop1", async ({ mount, page }) => {
    await mount(<Foo>FOOOO</Foo>);

    const foo = page.getByText("FOOOO");

    await expect(foo).toHaveText("FOOOO");
    await foo.click();
  });
});
