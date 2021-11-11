Feature: Anchor Navigation component
  I want to test Anchor Navigation component properties

  Background: Open Anchor Navigation component page
    Given I open "Test AnchorNavigation" component page "in full screen dialog"
      And I open component preview

  @positive
  Scenario Outline: Press on <tab> tab and scroll to the <index> anchor navigation
    When I click onto "<tab>" tab
      And I wait 1000
    Then "<index>" anchor navigation section is visible
    Examples:
      | tab                                  | index          |
      | First                                | First section  |
      | Second                               | Second section |
      | Third                                | Third section  |
      | Navigation item with very long label | Fourth section |
      | Fifth                                | Fifth section  |

  @positive
  Scenario Outline: Scroll <index> and verify that proper <index> anchor navigation row is visible
    Given I click onto "<tab>" tab
    When I scroll window to the "<index>" position
    Then "<index>" anchor navigation section is visible
    Examples:
      | tab    | index         |
      | Fifth  | First section |
      | First  | Fifth section |
