import BREADCRUMBS from "./locators";

// component preview locators
export const breadcrumbsComponent = () => cy.get(BREADCRUMBS);
export const crumb = (index) =>
  breadcrumbsComponent().find("ol").find("li").eq(index);
