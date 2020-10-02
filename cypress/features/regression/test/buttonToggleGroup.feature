Feature: Button Toggle Group component
  I want to test Button Toggle Group properties

  @positive
  Scenario Outline: Verify the onChange event for a Button Toggle Group <buttonName> button
    Given I open "Button Toggle Group" component page "basic"
      And clear all actions in Actions Tab
    When I click on Button Toggle Group "<buttonName>"
    Then onChange action was called in Actions Tab
    Examples:
      | buttonName |
      | Foo        |
      | Bar        |
      | Baz        |