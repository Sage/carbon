Feature: Advanced Color Picker component
  I want to test Advanced Color Picker component

  Background: Open Advanced Color Picker component page
    Given I open basic Test "Advanced Color Picker" component page in noIframe
      And I open Advanced Color Picker in noIFrame


  @positive
  Scenario Outline: <key> moves selection
    When I press "<key>" onto focused element
    Then Simple Color <index> element was picked up in noIframe
    Examples:
      | key        | index |
      | leftarrow  | 6     |
      | rightarrow | 8     |
      | uparrow    | 2     |

  @positive
  Scenario: Down arrow moves selection down
    Given I press "uparrow" onto focused element
    When I press "downarrow" onto focused element
    Then Simple Color 7 element was picked up in noIframe