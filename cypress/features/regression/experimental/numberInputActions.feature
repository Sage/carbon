Feature: Experimental Number Input component
  I want to check Experimental Number Input component properties

  Background: Open Experimental Number Input component page
    Given I open "Experimental Number Input" component page "default"

  @positive
  Scenario: Enable onChangeDeferred action
    Given I check Enable onChangeDeferred Action property
      And clear all actions in Actions Tab
    When I input 1 into NumberInput component
      And I wait 1000
    Then onChangeDeferred action was called in Actions Tab

  @positive
  Scenario: Disable onChangeDeferred action
    Given clear all actions in Actions Tab
    When I input 1 into NumberInput component
    Then onChange action was called in Actions Tab

  @positive
  Scenario Outline: Enable onKeyDown action uses <key>
    Given I check Enable onKeyDown Action property
      And clear all actions in Actions Tab
    When I press keyboard "<key>" keys into NumberInput input component
    Then onKeyDown action was called in Actions Tab
    Examples:
      | key        |
      | downarrow  |
      | leftarrow  |
      | rightarrow |
      | uparrow    |

  @positive
  Scenario Outline: Enable onChangeDeferred action and check deferTimeout set to <deferTimeout>
    Given I check Enable onChangeDeferred Action property
      And I set deferTimeout to "<deferTimeout>"
      And clear all actions in Actions Tab
    When I input 1 into NumberInput component
      And onChange action was called in Actions Tab
      And I wait <deferTimeout>
    Then onChangeDeferred action was called in Actions Tab
    Examples:
      | deferTimeout |
      | 1000         |
      | 5000         |
      | 10000        |