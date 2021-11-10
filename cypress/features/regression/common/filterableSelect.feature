Feature: Filterable Select component
  I want to change Filterable Select component properties

  @positive
  Scenario: Filter by typed character
    Given I open "Select filterable" component page "controlled"
    When I type "A" into input
    Then "first" option on Select list is "Amber"
      And "first" option on the list is hovered over
      And  "second" option on Select list is "Black"
      And  "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Filterable Select list is not open using keyboard <key>
    Given I open "Select filterable" component page "controlled"
      And I focus select input
    When I click onto controlled select using "<key>" key
    Then "filterable" Select list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Filterable Select list is not open when has a focus
    Given I open "Select filterable" component page "controlled"
    When I focus select input
    Then "filterable" Select list is closed

  @positive
  Scenario: Filterable Select list is not opened by clicking mouse on the text input
    Given I open "Select filterable" component page "controlled"
    When I click on Select input
    Then "filterable" Select list is closed

  @positive
  Scenario: Open Filterable Select list by clicking mouse on the dropdown button
    Given I open "Select filterable" component page "controlled"
    When I click on dropdown button
    Then "filterable" Select list is opened

  @positive
  Scenario: Close Filterable Select list by clicking out of component
    Given I open "Select filterable" component page "controlled"
      And I click on dropdown button
    When I click onto root in Test directory
    Then "filterable" Select list is closed

  @positive
  Scenario: Close Filterable Select list by double clicking mouse on the dropdown button
    Given I open "Select filterable" component page "controlled"
      And I click on dropdown button
    When I click on dropdown button
    Then "filterable" Select list is closed

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I open "Select filterable" component page "controlled"
      And I type "Amber" into input
    When I click on "first" option on Select list
    Then Select input has "Amber" value
      And "filterable" Select list is closed

  @positive
  Scenario: Selecting the action button opens up a dialog box
    Given I open "Select filterable" component page "with action button"
    When I click on dropdown button
      And I click onto "Add a New Element" button
    Then Dialog is visible

  @positive
  Scenario: Lazy loading is visible after open the Filterable Select
    Given I open "Select filterable" component page "with is loading prop"
    When I click on dropdown button
    Then Lazy loading is visible

  @positive
  Scenario: Lazy loading is visible after open and scroll to the botton of the Filterable Select
    Given I open "Select filterable" component page "with infinite scroll"
      And I click on dropdown button
      And Lazy loading is visible
      And I wait 2500
    When I scroll to the "bottom" of Select List
    Then Lazy loading is visible
      And Select list "Lazy Loaded A1" option is visible

  @positive
  Scenario: Full list options is visible when value is set and select is opened again
    Given I open "Select filterable" component page "default story"
      And I type "A" into default input
      And option list has 3 elements
      And visible options on Select list are "Amber", "Black", "Orange"
      And I click on "first" option on Select list
    When I click on dropdown button
    Then option list has 11 elements
      And visible options on Select list are "Amber", "Black", "Blue"

  @positive
  Scenario: Select dropdown list is visible when click on it with openOnFocus attr is set to true
    Given I open "Select filterable" component page "open on focus"
    When I click openOnFocus Select input
    Then "filterable" Select list is opened

  @positive
  Scenario: Select dropdown list is visible when focus on it with openOnFocus attr is set to true
    Given I open "Select filterable" component page "open on focus"
    When I focus openOnFocus Select input
    Then "filterable" Select list is opened

  @positive
  Scenario: Check that Filterable Select has multiColumns in option list
    Given I open "Select filterable" component page "with multiple columns"
    When I click on dropdown button
    Then "filterable" Select list is opened
      And Option list has multiColumns header
      And Option list has multiColumns body

  @positive
  Scenario: The matching string is indicated with bold and underline
    Given I open "Select filterable" component page "with multiple columns"
    When I type "Do" into select input
    Then The matching string "Do" is underline and bolded

  @positive
  Scenario: Check the onChange events after typed string into the input
    Given I open "Select filterable" component page "default story"
      And I focus default Select input
    When I type "A" into default input
    Then onChange action was called in Actions Tab

  @positive
  Scenario: Check the onClick, onFocus events after clicking on the input
    Given I open "Select filterable" component page "default story"
    When I click on default Select input
    Then onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the dropdown button
    Given I open "Select filterable" component page "default story"
    When I click on dropdown button
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after clicking arrow
    Given I open "Select filterable" component page "default story"
    When I focus default Select input
      And I click onto default select using "downarrow" key
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onBlur event
    Given I open "Select filterable" component page "default story"
      And I focus default Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Filterable Select list using Esc keyboard
    Given I open "Select filterable" component page "default story"
      And I click on dropdown button
    When I hit ESC key
    Then "filterable" Select list is closed

  @positive
  Scenario: Check the onFilterChange events after typed string into the input
    Given I open "Select filterable" component page "default story"
      And I focus default Select input
    When I type "b" into default input
    Then onFilterChange action was called in Actions Tab