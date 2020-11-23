Feature: Design System Select component
  I want to change Design System Select component properties

  Background: Open Design System Select component page
    Given I open "Design System Select" component page "controlled" in no iframe

  @positive
  Scenario Outline: Open Select list using <key>
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Open Select list by mouse click on text input
    When I click on Select input
    Then "simple" Select list is opened

  @positive
  Scenario: Close Select list using Tab keyboard
    Given I focus select input
    When I press "Tab" onto focused element
    Then "simple" Select list is closed

  @positive
  Scenario: Close Select list by clicking out of component
    Given I click on dropdown button
    When I click onto root in Test directory in no iFrame
    Then "simple" Select list is closed

  @positive
  Scenario: Choose option from Select list by mouse clicking
    Given I click on Select input
    When I select value "Amber"
    Then Design system Select input has "Amber" value
      And "simple" Select list is closed

  @positive
  Scenario Outline: Choose <selectedValue> option from Select list by typing <selectableValue> value in input
    Given I click on Select input
    When I type "<selectableValue>" into input
    Then Design system Select input has "<selectedValue>" value
      And "<position>" option on the list is highlighted
    Examples:
      | selectableValue | selectedValue | position |
      | Amb             | Amber         | first    |
      | Bla             | Black         | second   |

  @positive
  Scenario Outline: Open select list using arrow key
    Given I focus select input
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key       | position | value  |
      | downarrow | first    | Amber  |
      | uparrow   | eleventh | Yellow |