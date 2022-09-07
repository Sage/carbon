Feature: Multi Select component
  I want to change Multi Select component properties

  @positive
  Scenario: Multi Select list is not open when has a focus
    Given I open "Select multiselect" component page "controlled"
    When I click on controlled Select input
    Then "Multiselect" list is closed

  @positive
  Scenario Outline: Multi Select list is not open using keyboard <key>
    Given I open "Select multiselect" component page "controlled"
      And I click on controlled Select input
    When I click onto controlled select using "<key>" key
    Then "Multiselect" list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Multi Select list is not opened by clicking mouse in the text input
    Given I open "Select multiselect" component page "controlled"
    When I click on controlled Select input
    Then "Multiselect" list is closed

  @positive
  Scenario: Open Multi Select list by clicking mouse on the dropdown button
    Given I open "Select multiselect" component page "controlled"
    When I click on dropdown button
    Then "Multiselect" list is open

  @positive
  Scenario: Close Multi Select list by double clicking mouse on the dropdown button
    Given I open "Select multiselect" component page "controlled"
      And I click on dropdown button
    When I click on dropdown button
    Then "Multiselect" list is closed

  @positive
  Scenario: Close Multi Select list by clicking out of component
    Given I open "Select multiselect" component page "controlled"
      And I click on dropdown button
    When I click onto root in Test directory
    Then "Multiselect" list is closed

  @positive
  Scenario: Open on focus multi Select component is opened when has a focus
    Given I open "Select multiselect" component page "open on focus"
    When I focus on controlled Select input
    Then "Multiselect" list is open

  @positive
  Scenario: Open on focus Multi Select list by clicking mouse on the dropdown button
    Given I open "Select multiselect" component page "open on focus"
    When I click on dropdown button
    Then "Multiselect" list is open

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I open "Select multiselect" component page "controlled"
      And I click on dropdown button
    When I click on "first" option on Select list
    Then Multi select input has "Amber" pill
      And "Multiselect" list is open

  @positive
  Scenario: Filter by typed character
    Given I open "Select multiselect" component page "controlled"
    When I type "A" into input
    Then "Multiselect" list is open
      And "first" option on Select list is "Amber"
      And "first" option on the list is hovered over
      And "second" option on Select list is "Black"
      And "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Open multi select list using arrow key
    Given I open "Select multiselect" component page "controlled"
      And I click on controlled Select input
      And I click onto controlled select using "<key>" key
    Then "Multiselect" list is open
      And Multi select input has not any value
      And "<position>" option on the list is highlighted
    Examples:
      | key       | position |
      | downarrow | first    |
      | uparrow   | eleventh |

  @positive
  Scenario Outline: Verify options can be accessed by keyboard
    Given I open "Select multiselect" component page "controlled"
      And I focus on controlled Select input
      And I click onto controlled select using "<key>" key
      And I click onto controlled select using "<key>" key
      And I click onto controlled select using "<key>" key
    Then "Multiselect" list is open
      And Multi select input has not any value
      And "<position>" option on the list is highlighted
    Examples:
      | key       | position |
      | downarrow | third    |
      | uparrow   | ninth    |

  @positive
  Scenario: Verify the inner context of Select Multiple component
    Given I open "Select multiselect" component page "controlled"
    When Type "Amber" text into multi select input and select the value
      And Type "Black" text into multi select input and select the value
      And Type "Green" text into multi select input and select the value
    Then Multi select "first" pill has "Amber" value
      And Multi select "second" pill has "Black" value
      And Multi select "third" pill has "Green" value

  @positive
  Scenario: Verify that the value prop is respected even with custom onChange logic
    Given I open "Select multiselect test" component page "default"
    When Type "Two" text into multi select input and select the value
      And Type "Three" text into multi select input and select the value
      And Type "Four" text into multi select input and select the value
    Then Multi select "first" pill has "Two" value
      And Multi select "second" pill has "Three" value
      And Multi select input has 2 values

  @positive
  Scenario: Lazy loading is visible after open the Multi Select
    Given I open "Select multiselect" component page "with is loading prop"
    When I click on dropdown button
    Then Lazy loading is visible

  @positive
  Scenario: Check that Multi Select has multiColumns in option list
    Given I open "Select multiselect" component page "with multiple columns"
    When I click on dropdown button
    Then "Multiselect" list is open
      And Option list has multiColumns header
      And Option list has multiColumns body

  @positive
  Scenario: The matching string is indicated with bold and underline
    Given I open "Select multiselect" component page "with multiple columns"
    When I type "Do" into select input
    Then The matching string "Do" is underline and bolded

  @positive
  Scenario: Check the onChange events after typed string into the input
    Given I open "Select multiselect" component page "default story"
      And I click on controlled Select input
    When I type "A" into default input
    Then onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onClick, onFocus events after clicking on the input
    Given I open "Select multiselect" component page "default story"
    When I click on controlled Select input
    Then onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the dropdown button
    Given I open "Select multiselect" component page "default story"
    When I click on dropdown button
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after clicking arrow
    Given I open "Select multiselect" component page "default story"
    When I click on controlled Select input
      And I click onto controlled select using "downarrow" key
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onBlur event
    Given I open "Select multiselect" component page "default story"
      And I click on controlled Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Multi Select list using Esc keyboard
    Given I open "Select multiselect" component page "default story"
      And I click on dropdown button
    When I hit ESC key
    Then "Multiselect" list is closed

  @positive
  Scenario: Check the onFilterChange events after typed string into the input
    Given I open "Select multiselect" component page "default story"
      And I click on controlled Select input
    When I type "b" into default input
    Then onFilterChange action was called in Actions Tab