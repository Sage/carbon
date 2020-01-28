Feature: Sidebar With Button component
  I want to check Sidebar With Button component properties

  Background: Open Sidebar With Button component page
    Given I open "Sidebar" component page with button
      And I open component preview

  @positive
  Scenario: Open Sidebar With Button
    # When I open component preview
    Then Sidebar component is visible

  @positive
  Scenario: Close Sidebar With Button by closeIcon
    # Given I open component preview
    When I close Sidebar
    Then Sidebar component is not visible