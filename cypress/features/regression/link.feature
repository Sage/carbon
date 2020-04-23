Feature: Link component
  I want to change Link component properties

  Background: Open Link component default page
    Given I open "Link" component page

  @positive
  Scenario Outline: Change Link children to <children>
    When I set children to "<children>"
    Then children on preview is "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Disable Link component
    When I disable Link component
    Then Link is disabled

  @positive
  Scenario: Disable and enable Link component
    Given I disable Link component
    When I enable Link component
    Then Link is enabled

  @positive
  Scenario Outline: Change Link href to <href>
    When I set href to "<href>"
    Then Link on preview href is set to "<href>"
    Examples:
      | href                    |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change link component icon align position to <iconAlign>
    Given I select icon to "add"
    When I select iconAlign to "<iconAlign>"
      And I wait 500
    # wait because method below is based of changing DOM elements order
    Then icon align is set to "<iconAlign>"
    Examples:
      | iconAlign |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change tooltip align to <tooltipAlign>
    Given I select icon to "add"
      And I set tooltipMessage to "sample message"
    When I select tooltipAlign to "<tooltipAlign>"
      And I select tooltipPosition to "bottom"
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
  Scenario Outline: Change tooltip tooltipPosition to <tooltipPosition>
    Given I select icon to "add"
      And I set tooltipMessage to "sample message"
    When I select tooltipPosition to "<tooltipPosition>"
      And I select tooltipAlign to "center"
      And I hover mouse onto icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | right           |
      | left            |
      | bottom          |
      | top             |
      | right           |

  @positive
  Scenario: Check tabbable and focus the link componenent
    Given I uncheck tabbable checkbox
    When I check tabbable checkbox
    Then Link is tabbable
      And I hit Tab key 2 times
      And Link component is focused

  @positive
  Scenario: Uncheck tabbable
    When I uncheck tabbable checkbox
    Then Link is not tabbable
      And I hit Tab key 2 times
      And Link component is not focused

  @positive
  Scenario: Change type of icon for a Link component to feedback
    When I select icon to "feedback"
    Then icon on link componenent preview is "feedback"