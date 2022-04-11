Feature: Select component
  I want to change Select component properties

  @positive
  Scenario Outline: Open Select list using <key>
    Given I open "Select" component page "controlled"
    When I press the "<key>" key, when focused on the input
    Then "SimpleSelect" list is open
    Examples:
      | key   |
      | Space |

  @positive
  Scenario: Open Select list by mouse click on text input
    Given I open "Select" component page "controlled"
    When I click on Select text
    Then "SimpleSelect" list is open

  @positive
  Scenario: Close Select list using Tab keyboard
    Given I open "Select" component page "controlled"
      And I click on Select text
    When I press the "Tab" key, when focused on the input
    Then "SimpleSelect" list is closed

  @positive
  Scenario: Close Select list by clicking out of component
    Given I open "Select" component page "controlled"
      And I click on dropdown button
    When I click onto root in Test directory
    Then "SimpleSelect" list is closed

  @positive
  Scenario: Click on an option from Select list
    Given I open "Select" component page "controlled"
      And I click on Select text
    When I select the "Amber" Option
    Then Select input has "Amber" value
      And "SimpleSelect" list is closed

  @positive
  Scenario Outline: Open select list using arrow key
    Given I open "Select" component page "controlled"
      And I click on Select text
    When I press the "<key>" key, when focused on the input
    Then "SimpleSelect" list is open
    Examples:
      | key       | position | value  |
      | downarrow | first    | Amber  |
      | uparrow   | eleventh | Yellow |
      | pagedown  | fourth   | Brown  |
      | pageup    | eighth   | Purple |

  @positive
  Scenario: An Option that is more than one line is rendered correctly
    Given I open "Select Test" component page "default"
    When I click on dropdown button
      And I scroll to the "bottom" of Select List
    Then Select list "Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night" option is visible
      And Select list "Pink" option is visible
      And Select list "Red" option is visible
      And Select list "Yellow" option is visible

  @positive
  Scenario: Lazy loading is visible after open the Simple Select
    Given I open "Select" component page "with is loading prop"
    When I click on Select text
    Then Lazy loading is visible

  @positive
  Scenario: Lazy loading is visible after open and scroll to the bottom of the Simple Select
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
    Then "SimpleSelect" list is open
      And Option list has multiColumns header
      And Option list has multiColumns body

  @positive
  Scenario Outline: Show Select list is at the <position> in <size> viewport
    Given I open default "Select Test" component with "simpleSelect" json from "commonComponents" using "<size>" object name
      And I have a <size> viewport
    When I click on Select text
    Then "simple" Select list is visible at the <position>
    Examples:
      | position | size  |
      | bottom   | large |
      | top      | small |

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the Select Textbox
    Given I open "Select Test" component page "default"
    When I click on Select text
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onChange event by clicking mouse on the select list option
    Given I open "Select Test" component page "default"      
      And I click on Select text
    When I click on "first" option on Select list
    Then onChange action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after pressing the downarrow key
    Given I open "Select Test" component page "default"
      And I click on Select text
    When I press the "downarrow" key, when focused on the input
      And I wait 500
    Then onKeyDown action was called in Actions Tab
      And onFocus action was called in Actions Tab

  @positive
  Scenario Outline: Check the onKeyDown event after press <key>
    Given I open "Select Test" component page "default"
      And I click on Select text
    When I press the "<key>" key, when focused on the input
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
    Given I open "Select Test" component page "default"
      And I click on Select text
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Select list using Esc keyboard
    Given I open "Select" component page "default story"
      And I click on Select text
    When I hit ESC key
    Then "SimpleSelect" list is closed