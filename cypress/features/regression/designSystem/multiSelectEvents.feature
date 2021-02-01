Feature: Design System Multi Select component
  I want to check Design System Multi Select component events

  Background: Open Design System Multi Select component page
    Given I open "Design System Select multiselect" component page "default story"

  @positive
  Scenario: Check the onChange events after typed string into the input
    Given clear all actions in Actions Tab
      And I focus default Select input
    When I type "A" into default input
    Then onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onClick, onFocus events after clicking on the input
    Given clear all actions in Actions Tab
    When I click on default Select input
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
    When I focus default Select input
      And I click onto default select using "downarrow" key
      And I wait 500
    Then onOpen action was called in Actions Tab
      And onFocus action was called in Actions Tab
      And onKeyDown action was called in Actions Tab

  @positive
  Scenario: Check the onBlur event
    Given clear all actions in Actions Tab
      And I focus default Select input
    When I click on Select label
    Then onBlur action was called in Actions Tab

  @positive
  Scenario: Close Multi Select list using Esc keyboard
    Given I click on dropdown button in iframe
    When I hit ESC key
    Then multi Select list is closed in iframe