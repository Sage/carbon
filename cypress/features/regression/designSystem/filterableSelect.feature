Feature: Design System Filterable Select component
  I want to change Design System Filterable Select component properties

  @positive
  Scenario: Filter by typed character
    Given I open "Design System Select filterable" component page "controlled" in no iframe
    When I type "A" into input
    Then "first" option on Select list is "Amber"
      And "first" option on the list is highlighted
      And  "second" option on Select list is "Black"
      And  "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Filterable Select list is not open using keyboard <key>
    Given I open "Design System Select filterable" component page "controlled" in no iframe
      And I focus select input
    When I click onto controlled select using "<key>" key
    Then "filterable" Select list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Filterable Select list is not open when has a focus
    Given I open "Design System Select filterable" component page "controlled" in no iframe
    When I focus select input
    Then "filterable" Select list is closed

  @positive
  Scenario: Filterable Select list is not opened by clicking mouse on the text input
    Given I open "Design System Select filterable" component page "controlled" in no iframe
    When I click on Select input
    Then "filterable" Select list is closed

  @positive
  Scenario: Open Filterable Select list by clicking mouse on the dropdown button
    Given I open "Design System Select filterable" component page "controlled" in no iframe
    When I click on dropdown button
    Then "filterable" Select list is opened

  @positive
  Scenario: Close Filterable Select list by clicking out of component
    Given I open "Design System Select filterable" component page "controlled" in no iframe
      And I click on dropdown button
    When I click onto root in Test directory in no iFrame
    Then "filterable" Select list is closed

  @positive
  Scenario: Close Filterable Select list by double clicking mouse on the dropdown button
    Given I open "Design System Select filterable" component page "controlled" in no iframe
      And I click on dropdown button
    When I click on dropdown button
    Then "filterable" Select list is closed

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I open "Design System Select filterable" component page "controlled" in no iframe
      And I type "Amber" into input
    When I click on "first" option on Select list
    Then Design system Select input has "Amber" value
      And "filterable" Select list is closed

  @positive
  Scenario: Selecting the action button opens up a dialog box
    Given I open "Design System Select filterable" component page "with_action_button" in no iframe
    When I click on dropdown button
      And I click onto "Add a New Element" button
    Then Dialog is visible

  @positive
  Scenario: Lazy loading is visible after open the Filterable Select
    Given I open "Design System Select filterable" component page "with_is_loading_prop" in no iframe
    When I click on dropdown button
    Then Lazy loading is visible

  @positive
  Scenario: Lazy loading is visible after open and scroll to the botton of the Filterable Select
    Given I open "Design System Select filterable" component page "with infinite scroll" in no iframe
      And I click on dropdown button
      And Lazy loading is visible
      And I wait 2500
    When I scroll to the "bottom" of Select List
    Then Lazy loading is visible
      And Select list "Lazy Loaded A1" option is visible

  @positive
  Scenario: Full list options is visible when value is set and select is opened again
    Given I open "Design System Select filterable" component page "default story" in no iframe
      And I type "A" into simple select input in noIframe
      And option list has 3 elements
      And visible options on Select list are "Amber", "Black", "Orange"
      And I click on "first" option on Select list
    When I click on dropdown button
    Then option list has 11 elements
      And visible options on Select list are "Amber", "Black", "Blue"