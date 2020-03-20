Feature: Icon component
  I want to change Icon component properties

  Background: Open Icon component page classic
    Given I open "Icon" component page classic

  @positive
  Scenario Outline: Change background theme to <bgTheme>
    When I select bgTheme to "<bgTheme>"
    Then background color is set to "<color>"
    Examples:
      | bgTheme     | color             |
      | error       | rgb(199, 56, 79)  |
      | help        | rgb(255, 171, 0)  |
      | info        | rgb(21, 115, 230) |
      | maintenance | rgb(255, 125, 0)  |
      | new         | rgb(102, 51, 153) |
      | success     | rgb(80, 184, 72)  |
      | warning     | rgb(255, 125, 0)  |
      | default     | rgb(51, 92, 109)  |

  @positive
  Scenario Outline: Change background size to <bgSize>
    Given I select bgTheme to "default"
    When I select bgSize to "<bgSize>"
    Then Icon height is set to "<height>"
    Examples:
      | bgSize | height |
      | small  | 24px   |
      | medium | 32px   |
      | large  | 40px   |

  @positive
  Scenario Outline: Change background shape to <bgShape>
    Given I select bgTheme to "default"
    When I select bgShape to "<bgShape>"
    Then radius is set to "<radius>"
    Examples:
      | bgShape      | radius |
      | circle       | 50%    |
      | rounded-rect | 20%    |
      | square       | 0%     |

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