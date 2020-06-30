Feature: Accessibility tests -> Test directory
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open basic Test "<component>" component page in noIframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           | data-component      |
      | Anchornavigation    | anchor-navigation   |
      | Button Toggle Group | button-toggle-group |
      | duellingpicklist    | duelling-picklist   |