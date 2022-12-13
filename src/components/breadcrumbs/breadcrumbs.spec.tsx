import React from "react";
import Breadcrumbs from "./breadcrumbs.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { noThemeSnapshot } from "../../__spec_helper__/enzyme-snapshot-helper";
import TestRenderer from "react-test-renderer";
import BreadcrumbsWrapper from "./breadcrumbs.component";
import BreadcrumbsContainer from "./breadcrumbs.component";
import Crumb from "./breadcrumbs.component";

function render(props = {}, renderer: any = typeof shallow) {
  return renderer(<Breadcrumbs {...props}/>);
}

describe("Breadcrumbs", () => {
  it("renders as expected", () => {
    expect(
      noThemeSnapshot(shallow(<BreadcrumbsWrapper/>))
    ).toMatchSnapshot();
  });
});





