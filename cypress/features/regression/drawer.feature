Feature: Drawer component
  I want to test Drawer component

  Background: Open Drawer component page
    Given I open design systems uncontrolled "Drawer" component page

  @positive
  Scenario: Expanding Drawer
    When I click on Drawer arrow 1 time
    Then sidebar should have class open
      And toggle icon switched orientation to open
      And sidebar text is visible

  @positive
  Scenario: Collapsing Drawer
    When I click on Drawer arrow 2 times
    Then sidebar should have class closed
      And toggle icon switched orientation to closed
      And sidebar text is not visible

  @positive
  Scenario Outline: Set animationDuration to <animationDuration>
    Given I set animationDuration to "<animationDuration>"
    When I click on Drawer arrow 1 time
    Then animationDuration is set to "<cssAnimationDuration>"
    Examples:
      | animationDuration | cssAnimationDuration |
      | 500ms             | 0.5s                 |
      | 100ms             | 0.1s                 |
      | 0.5s              | 0.5s                 |
      | 0.1s              | 0.1s                 |

  @positive
  Scenario Outline: Set expandedWidth to <expandedWidth>
    Given I set expandedWidth to "<expandedWidth>"
    When I click on Drawer arrow 1 time
    Then expandedWidth is set to "<cssWidth>"
    Examples:
      | expandedWidth | cssWidth    |
      | 10%           | 114.59375px |
      | 50%           | 573px       |
      | 100px         | 100px       |
      | 500px         | 500px       |
