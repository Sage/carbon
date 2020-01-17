Feature: Button as a sibling classic component
  I want to check Button as a sibling classic component properties

  Background: Open Button as a sibling component page classic
    Given I open "Button" classic component for classic story as sibling in no iframe

  @positive
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button as a sibling height is "<height>" and width is "<width>"
    Examples:
      | size   | height | width       |
      | small  | 25px   | 107.90625px |
      | medium | 31px   | 138.4375px  |
      | large  | 43px   | 142.4375px  |

  @positive
  Scenario Outline: Set Button theme to <theme> and as to primary
    When I select theme to "<theme>"
      And I select as to "primary"
    Then Button as a sibling background color is "<background-color>"
      And Button as a sibling font color is "<font-color>"
    Examples:
      | theme        | background-color   | font-color          |
      | blue         | rgb(37, 91, 199)   | rgb(255, 255, 255)  |
      | grey         | rgb(51, 92, 109)   | rgb(255, 255, 255)  |
      | magenta      | rgb(237, 28, 95)   | rgb(255, 255, 255)  |
      | magenta-dull | rgb(202, 42, 96)   | rgb(255, 255, 255)  |
      | red          | rgb(199, 56, 79)   | rgb(255, 255, 255)  |
      | white        | rgb(255, 255, 255) | rgba(0, 0, 0, 0.85) |

  @positive
  Scenario Outline: Set Button theme to <theme> and as to secondary
    When I select theme to "<theme>"
      And I select as to "secondary"
    Then Button as a sibling font color is "<font-color>"
      And Button as a sibling background color is "rgba(0, 0, 0, 0)"
    Examples:
      | theme        | font-color         |
      | blue         | rgb(37, 91, 199)   |
      | grey         | rgb(51, 92, 109)   |
      | magenta      | rgb(237, 28, 95)   |
      | magenta-dull | rgb(202, 42, 96)   |
      | red          | rgb(199, 56, 79)   |
      | white        | rgb(255, 255, 255) |

  @negative
  Scenario: I set space character to Button subtext
    When I select size to "large"
      # I use space character below
      And I set subtext to " "
    Then Button as a sibling subtext on preview is " "

  @positive
  Scenario: I set component size to large but I leave Button subtext empty
    When I select size to "large"
    # And I leave Button subtext empty
    Then Button subtext on preview is ""