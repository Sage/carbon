Feature: Icon component
  I want to change Heading component properties

  Background: Open Icon component page
    Given I open "Icon" component page

  @positive
  Scenario Outline: Change background theme to <bgTheme>
    When I select bgTheme to "<bgTheme>"
    Then bgTheme is set to "<bgTheme>"
    Examples:
      | bgTheme     |
      | error       |
      | help        |
      | info        |
      | maintenance |
      | new         |
      | success     |
      | warning     |
      | default     |

  @positive
  Scenario Outline: Change background shape to <bgShape>
    When I select bgShape to "<bgShape>"
    Then bgShape is set to "<bgShape>"
    Examples:
      | bgShape      |
      | circle       |
      | rounded-rect |
      | square       |

  @positive
  Scenario Outline: Change tooltip message to <tooltipMessage>
    When I set tooltipMessage to "<tooltipMessage>"
      And I hover mouse onto icon
    Then tooltipPreview on preview is set to "<tooltipMessage>"
    Examples:
      | tooltipMessage          |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change tooltip position to <tooltipPosition>
    Given I set tooltipMessage to "sample message"
    When I select tooltipPosition to "<tooltipPosition>"
      And I select tooltipAlign to "center"
      And I hover mouse onto icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | left            |
      | right           |
      | top             |
      | bottom          |

  @positive
  Scenario Outline: Change tooltip align to <tooltipAlign>
    Given I set tooltipMessage to "sample message"
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