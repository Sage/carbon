Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable component page
    Given I open basic Test "Flat Table" component page

  @positive
  Scenario: Click event
    Given I check hasClickableRows checkbox
      And clear all actions in Actions Tab
    When I click on 2 body row
    Then click action was called in Actions Tab

  @positive
  Scenario: Click event after pressing Enter key
    Given I check hasClickableRows checkbox
      And clear all actions in Actions Tab
    When press Enter key on the row element
    Then click action was called in Actions Tab