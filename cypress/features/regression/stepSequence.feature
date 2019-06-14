Feature: Step Sequence component
  I want to change Step Sequence component properties

  Background: Open Step Sequence component page
    Given I open "Step Sequence" component page

  @positive
  Scenario Outline: I set orientation to <orientation>
    When I select orientation to "<orientation>"
    Then orientation is set to "<orientation>"
    Examples:
      | orientation |
      | vertical    |
      | horizontal  |