Feature: Design System Select component
  I want to change Design System Select component properties

  Background: Open Design System Select component page
    Given I open Design Systems basic "Select" component docs page

  @positive
  Scenario Outline: Open Select list using <key>
    Given I click onto controlled select using "<key>" key
    Then "second" simple Select list is opened
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Open Select list by mouse click on text input
    When I click on Select input
    Then "second" simple Select list is opened

  @positive
  Scenario: Close Select list using Tab keyboard
    Given I focus select input
    When I press "Tab" onto focused element
    Then "second" simple Select list is closed

  @positive
  Scenario: Close Select list using Esc keyboard
    Given I click on Select input
    When I hit ESC key
    Then "second" simple Select list is closed

  @positive
  Scenario: Close Select list by clicking out of component
    Given I click on "second" dropdown button
    When I click out of controlled input
    Then "second" simple Select list is closed

  @positive
  Scenario: Choose option from Select list by mouse clicking
    Given I click on Select input
    When I select value "Amber"
    Then Design system Select input has "Amber" value
      And "second" simple Select list is closed

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
    Then "second" simple Select list is opened
      And "<position>" option on the list is highlighted
      And Design system Select input has "<value>" value
    Examples:
      | key       | position | value  |
      | downarrow | first    | Amber  |
      | uparrow   | eleventh | Yellow |