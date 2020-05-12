Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario: Component Drawer - Design Systems - uncontrolled story
    Given I open design systems uncontrolled Drawer component page
    When I open Accessibility Tab
    Then "Drawer" component has no violations in Accessibility section
