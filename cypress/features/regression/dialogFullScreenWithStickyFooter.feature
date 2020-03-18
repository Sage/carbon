Feature: Dialog Full Screen component
  I want to change Dialog Full Screen component properties

  Background: Open Dialog Full Screen component page
    Given I open "Dialog Full Screen" component page with sticky footer

  @positive
  Scenario: Verify that stickyFormFooter is visible
    When I open component preview
    Then Dialog Full Screen stickyFormFooter is visible