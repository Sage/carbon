Feature: Design System Filterable Select component
  I want to change Design System Filterable Select component properties

  Background: Open Design System Filterable Select component page
    Given I open Design Systems basic "Select filterable" component docs page

  @positive
  Scenario: Filter by typed character
    When I type "A" into input
    Then "first" option on Select list is "Amber"
      And "first" option on the list is highlighted
      And  "second" option on Select list is "Black"
      And  "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Filterable Select list is not open using keyboard <key>
    Given I focus select input
    When I click onto controlled select using "<key>" key
    Then "second" "filterable" Select list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Filterable Select list is not open when has a focus
    When I focus select input
    Then "second" "filterable" Select list is closed

  @positive
  Scenario: Filterable Select list is not opened by clicking mouse on the text input
    When I click on Select input
    Then "second" "filterable" Select list is closed

  @positive
  Scenario: Open Filterable Select list by clicking mouse on the dropdown button
    When I click on "second" dropdown button
    Then "second" "filterable" Select list is opened

  @positive
  Scenario: Close Filterable Select list by clicking out of component
    Given I click on "second" dropdown button
    When I click out of controlled input
    Then "second" "filterable" Select list is closed

  @positive
  Scenario: Close Filterable Select list by double clicking mouse on the dropdown button
    Given I click on "second" dropdown button
    When I click on "second" dropdown button
    Then "second" "filterable" Select list is closed

  @positive
  Scenario: Close Filterable Select list using Esc keyboard
    Given I click on "second" dropdown button
    When I hit ESC key
    Then "second" "filterable" Select list is closed

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I type "Amber" into input
    When I click on "first" option on Select list
    Then Design system Select input has "Amber" value
      And "second" "filterable" Select list is closed