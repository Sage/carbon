Feature: Link component
  I want to change Link component properties

  Background: Open Link component page
    Given I open "Link" component page

  @positive
  Scenario Outline: Change Link children to <children>
    When I set children to "<children>"
    Then children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario: Disable Link component
    When I disable Link component
    Then Link is disabled

  @positive
  Scenario: Disable and enable Link component
    When I disable Link component
      And I enable Link component
    Then Link is enabled

  @positive
  Scenario Outline: Change Link href to <href>
    When I set href to "<href>"
    Then Link on preview href is set to "<href>"
    Examples:
      | href                     |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

@positive
  Scenario Outline: Change link component icon align position
    When I select icon to "add"
      And I select iconAlign to "<iconAlign>"
    Then icon align is set to "<iconAlign>"
    Examples:
      | iconAlign |
      | left      |
      | right     |
     
  @positive
  Scenario Outline: Change tooltip align
    When I select icon to "add"
      And I set tooltipMessage to "sample message"
      And I select tooltipAlign to "<tooltipAlign>"
      And I hover mouse onto icon
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign |
      | left         |
      | right        |
      | top          |
      | bottom       |
      | center       |

  @positive
  Scenario Outline: Change tooltip position
    When I select icon to "add"
      And I set tooltipMessage to "sample message"
      And I select tooltipPosition to "<tooltipPosition>"
      And I hover mouse onto icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | left            |
      | right           |
      | top             |
      | bottom          |

  @positive
  Scenario: Check tabbable and focus the link componenent
    When I check tabbable checkbox
    Then Link is tabbable
      And I hit Tab key
      And I hit Tab key
      And Link component is focused

  @positive
  Scenario: Uncheck tabbable
    When I check tabbable checkbox
      And I uncheck tabbable checkbox
    Then Link is not tabbable
      And I hit Tab key
      And I hit Tab key
      And Link component is not focused