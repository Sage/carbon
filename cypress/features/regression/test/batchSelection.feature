Feature: Batch selection component
  I want to change Batch selection component properties

  Background: Open Batch selection component page
    Given I open basic Test "Batch selection" component page

  @positive
  Scenario Outline: Batch selection component is rendered properly
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Test "Batch selection" component page
    Then Batch selection component is rendered properly
      And Batch selection <index> button is rendered properly with proper "<icon>" icon
    Examples:
      | index | icon |
      | 0     | csv  |
      | 1     | bin  |
      | 2     | pdf  |

  @positive
  Scenario: Disable Batch selection component
    When I check disabled checkbox
    Then Batch selection component is disabled

  @positive
  Scenario: Hide Batch selection component
    When I check hidden checkbox
    Then Batch selection component is hidden

  @positive
  Scenario Outline: Set selectedCount Batch selection component to <selectedCount>
    When I set selectedCount to "<selectedCount>"
    Then Batch selection component selectedCount is set to "<selectedCount>"
    Examples:
      | selectedCount |
      | 0             |
      | 10            |
      | 100           |

  @positive
  Scenario Outline: Set Batch selection colorTheme to <colorTheme>
    When I select colorTheme to "<colorTheme>"
    Then Batch selection component colorTheme "<colorTheme>" is set to "<color>"
    Examples:
      | colorTheme  | color              |
      | dark        | rgb(0, 51, 73)     |
      | white       | rgba(0, 0, 0, 0)   |
      | light       | rgb(178, 193, 200) |
      | transparent | rgba(0, 0, 0, 0)   |

  @positive
  Scenario Outline: I focus inner element for Batch selection component
    When I focus Batch selection <buttonIndex> button
    Then Batch selection component <buttonIndex> button is focused
    Examples:
      | buttonIndex |
      | 0           |
      | 1           |
      | 2           |