Feature: Design System Select filterable component
  I want to check Design System Select filterable component events

  Background: Open Design System Select filterable component page
    Given I open "Design System Select filterable" component page "basic"

  @positive
  Scenario: Check the onChange events after typed string into the input
    Given clear all actions in Actions Tab
      And I focus basic Select input
    When I type "A" into basic input
    Then onChange action was called in Actions Tab

  @positive
  Scenario: Check the onClick, onFocus events after clicking on the input
    Given clear all actions in Actions Tab
    When I click on basic Select input
    Then onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onOpen, onClick, onFocus after clicking on the dropdown button
    Given clear all actions in Actions Tab
    When I click on dropdown button in iframe
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onClick action was called in Actions Tab

  @positive
  Scenario: Check the onKeyDown event after clicking arrow
    Given clear all actions in Actions Tab
    When I focus basic Select input
      And I click onto basic select using "downarrow" key
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onBlur event
    Given clear all actions in Actions Tab
      And I focus basic Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Filterable Select list using Esc keyboard
    Given I click on dropdown button in iframe
    When I hit ESC key
    Then "filterable" Select list is closed in iframe