Feature: Anchor Navigation component
  I want to change Anchor Navigation component properties

  Background: Open Anchor Navigation component page
    Given I open in full screen Test "AnchorNavigation" component page in noIframe
      And I open component preview in noIFrame

  @positive
  Scenario Outline: Press on <tab> tab and scroll to the the <index> anchor navigation
    When I click onto "<tab>" tab
      And I wait 250
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