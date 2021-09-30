Feature: Select component
  I want to change Select component properties

  @positive
  Scenario Outline: Open Select list using <key>
    Given I open "Select" component page "controlled"
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Open Select list by mouse click on text input
    Given I open "Select" component page "controlled"
    When I click on Select input
    Then "simple" Select list is opened

  @positive
  Scenario: Close Select list using Tab keyboard
    Given I open "Select" component page "controlled"
      And I focus select input
    When I press Tab onto focused element
    Then "simple" Select list is closed

  @positive
  Scenario: Close Select list by clicking out of component
    Given I open "Select" component page "controlled"
      And I click on dropdown button
    When I click onto root in Test directory
    Then "simple" Select list is closed

  @positive
  Scenario: Choose option from Select list by mouse clicking
    Given I open "Select" component page "controlled"
      And I click on Select input
    When I select value "Amber"
    Then Select input has "Amber" value
      And "simple" Select list is closed

  @positive
  Scenario Outline: Choose <selectedValue> option from Select list by typing <selectableValue> value in input
    Given I open "Select" component page "controlled"
      And I click on Select input
    When I type "<selectableValue>" into input
    Then Select input has "<selectedValue>" value
      And "<position>" option on the list is hovered over
    Examples:
      | selectableValue | selectedValue | position |
      | Amb             | Amber         | first    |
      | Bla             | Black         | second   |

  @positive
  Scenario Outline: Open select list using arrow key
    Given I open "Select" component page "controlled"
      And I focus select input
    When I click onto controlled select using "<key>" key
    Then "simple" Select list is opened
    Examples:
      | key       | position | value  |
      | downarrow | first    | Amber  |
      | uparrow   | eleventh | Yellow |

  @positive
  Scenario: Lazy loading is visible after open the Simple Select
    Given I open "Select" component page "with is loading prop"
    When I click on Select input with lazy loading
    Then Lazy loading is visible

  @positive
  Scenario: Lazy loading is visible after open and scroll to the botton of the Simple Select
    Given I open "Select" component page "with infinite scroll"
      And I click on dropdown button
      And Lazy loading is visible
      And I wait 2500
    When I scroll to the "bottom" of Select List
    Then Lazy loading is visible
      And Select list "Lazy Loaded A1" option is visible

  @positive
  Scenario: Check that using an object as a value displays the correct options
    Given I open "Select" component page "with object as value"
    When I click on dropdown button
    Then visible options on Select list are "Amber", "Black", "Blue"

  @positive
  Scenario: Check that options can be selected and displayed correctly when using an object as a value
    Given I open "Select" component page "with object as value"
      And I click on dropdown button
    When I click on "first" option on Select list
    Then Select input has "Amber" value

  @positive
  Scenario: Check that Select has multiColumns in option list
    Given I open "Select" component page "with multiple columns"
    When I click on dropdown button
    Then "simple" Select list is opened
      And Option list has multiColumns header
      And Option list has multiColumns body

  @positive
  Scenario Outline: Show Select list is at the <position> in <size> viewport
    Given I open default "Select Test" component with "simpleSelect" json from "commonComponents" using "<size>" object name
      And I have a <size> viewport
    When I click on default Select input
    Then "simple" Select list is visible at the <position>
    Examples:
      | position | size  |
      | bottom   | large |
      | top      | small |

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the input
    Given I open "Select" component page "default story"
    When I click on default Select input
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onChange event by clicking mouse on the select list option
    Given I open "Select" component page "default story"
      And I click on default Select input
    When I click on "first" option on Select list
    Then onChange action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after clicking arrow
    Given I open "Select" component page "default story"
      And I focus default Select input
    When I click onto default select using "downarrow" key
      And I wait 500
    Then onKeyDown action was called in Actions Tab
      And onFocus action was called in Actions Tab

  @positive
  Scenario Outline: Check the onKeyDown event after press <key>
    Given I open "Select" component page "default story"
      And I focus default Select input
    When I click onto default select using "<key>" key
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onKeyDown action was called in Actions Tab
      And onFocus action was called in Actions Tab
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Check the onBlur event
    Given I open "Select" component page "default story"
      And I focus default Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Select list using Esc keyboard
    Given I open "Select" component page "default story"
      And I click on default Select input
    When I hit ESC key
    Then "simple" Select list is closed