Feature: Accessibility tests -> Test directory
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    Given I open basic Test "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
    Examples:
      | component           | data-component      |
      | Anchornavigation    | anchor-navigation   |
      | Button Toggle Group | button-toggle-group |
      | duellingpicklist    | duelling-picklist   |