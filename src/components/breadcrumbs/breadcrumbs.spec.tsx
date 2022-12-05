import React from "react";
import { shallow } from "enzyme";
import Breadcrumbs from "./breadcrumbs.component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (renderer: any = shallow) => {
  return renderer(<Breadcrumbs />);
};

describe("Breadcrumbs", () => {
  describe("Renders", () => {});
});
