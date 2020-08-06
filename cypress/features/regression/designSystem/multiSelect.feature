Feature: Design System Multi Select component
  I want to change Design System Multi Select component properties

  Background: Open Design System Multi Select component page
    Given I open Design Systems basic "Select multiselect" component docs page

  @positive
  Scenario: Multi Select list is not open when has a focus
    When I focus select input
    Then "second" multi Select list is closed

  @positive
  Scenario Outline: Multi Select list is not open using keyboard <key>
    Given I focus select input
    When I click onto controlled select using "<key>" key
    Then "second" multi Select list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Close Multi Select list using Esc keyboard
    Given I click on "second" dropdown button
    When I hit ESC key
    Then "second" multi Select list is closed

  @positive
  Scenario: Multi Select list is not opened by clicking mouse in the text input
    When I click on Select input
    Then "second" multi Select list is closed

  @positive
  Scenario: Open Multi Select list by clicking mouse on the dropdown button
    When I click on "second" dropdown button
    Then "second" multi Select list is opened

  @positive
  Scenario: Close Multi Select list by double clicking mouse on the dropdown button
    Given I click on "second" dropdown button
    When I click on "second" dropdown button
    Then "second" multi Select list is closed

  @positive
  Scenario: Close Multi Select list by clicking out of component
    Given I click on "second" dropdown button
    When I click out of controlled input
    Then "second" multi Select list is closed

  @positive
  Scenario: Open on focus multi Select component is opened when has a focus
    When I focus openOnFocus Select input
    Then "third" multi Select list is opened

  @positive
  Scenario: Open on focus Multi Select list by clicking mouse on the dropdown button
    When I click on "third" dropdown button
    Then "third" multi Select list is opened

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I click on "second" dropdown button
    When I click on "first" option on Select list
    Then Multi select input has "Amber" pill
      And "second" multi Select list is opened

  @positive
  Scenario: Filter by typed character
    When I type "A" into input
    Then "second" multi Select list is opened
      And "first" option on Select list is "Amber"
      And "first" option on the list is highlighted
      And "second" option on Select list is "Black"
      And "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Open multi select list using arrow key
    Given I focus select input
      And I click onto controlled select using "<key>" key
    When I click onto controlled select using "<key>" key
    Then "second" multi Select list is opened
      And Multi select input has not any value
    Examples:
      | key       | position |
      | downarrow | first    |
      | uparrow   | eleventh |

  @positive
  Scenario: Verify the inner context of Select Multiple component
    When Type "Amber" text into multi select input and select the value
      And Type "Black" text into multi select input and select the value
      And Type "Green" text into multi select input and select the value
    Then Multi select "first" pill has "Amber" value
      And Multi select "second" pill has "Black" value
      And Multi select "third" pill has "Green" value