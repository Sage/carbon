Feature: Pages component
  I want to test Pages component

  Background: Open Pages component iframe
    Given I open "Pages" component iframe

  @positive
  Scenario: Open first page
    When I open no iFrame component preview
    Then My First Page is visible

  @positive
  Scenario: Open and close first page
    When I open no iFrame component preview
      And I close page
    Then My First Page is not visible
      And My Second Page is not visible

  @positive
  Scenario: Open next page
    When I open no iFrame component preview
      And I go to next page
    Then My Second Page is visible

  @positive
  Scenario: Open and close next page
    When I open no iFrame component preview
      And I go to next page
      And I close page
    Then My First Page is not visible
      And My Second Page is not visible

  @positive
  Scenario: Go back to first page
    When I open no iFrame component preview
      And I go to next page
      And I go to previous page
    Then My First Page is visible

