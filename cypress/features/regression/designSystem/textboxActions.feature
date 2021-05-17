Feature: Design System Textbox component - actions
  I want to change Design System Textbox component actions

  Background: Open Textbox component page
    Given I open "Design System Textbox Test" component page "default"

  @positive
  Scenario: Check iconOnClick event
    Given I select inputIcon to "add"
      And clear all actions in Actions Tab
    When I click on icon inside of Textbox
    Then iconOnClick action was called in Actions Tab

  @positive
  Scenario: Check onClick event
    Given clear all actions in Actions Tab
    When I click on Textbox
    Then onClick action was called in Actions Tab
      And Textbox input has golden border on focus