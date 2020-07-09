Feature: Dialog component with sticky footer
  I want to check visibility of Dialog component with sticky footer

  Background: Open Dialog component with sticky footer page
    Given I open "Dialog" component page with sticky footer
      And I open component preview

  @positive
  Scenario: Verify that stickyFormFooter is visible
    # commented because of BDD default scenario Given - When - Then
    #  When I open component preview
    Then Dialog stickyFormFooter is visible

  @positive
  Scenario: Verify default story color
    # commented because of BDD default scenario Given - When - Then
    #  When I open component preview
    Then footer buttons have color "rgb(0, 129, 93)" and has 2 px border