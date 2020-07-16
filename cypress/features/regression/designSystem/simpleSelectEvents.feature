Feature: Design System Simple Select component
  I want to check Design System Simple Select component events

  Background: Open Design System Simple Select component page
    Given I open design systems basic "Select" component page

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the input
    Given clear all actions in Actions Tab
    When I click on basic Select input
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onChange event by clicking mouse on the select list option
    Given I click on basic Select input
      And clear all actions in Actions Tab
    When I click on "first" option on Select list
    Then onChange action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after clicking arrow
    Given clear all actions in Actions Tab
    When I focus basic Select input
      And I click onto basic select using "downarrow" key
      And I wait 500
    Then onKeyDown action was called in Actions Tab
      And onFocus action was called in Actions Tab

  @positive
  Scenario Outline: Check the onKeyDown event after press <key>
    Given clear all actions in Actions Tab
    When I focus basic Select input
      And I click onto basic select using "<key>" key
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
    Given clear all actions in Actions Tab
      And I focus basic Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab